/* eslint-disable prettier/prettier */
import { Injectable , NotFoundException} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UserDocument } from "src/db/models/users.model";
import { ContentDocument } from '../../db/models/content.model'

import { AddUserDto } from "src/db/dto/add-user.dto";


@Injectable()
export class UsersService{

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Content') private contentModel: Model<ContentDocument>,
    ) {}

    async getUsers() {
        const users = await this.userModel.find().populate('currentVersion').populate('publishedVersion').exec()
        return users as UserDocument[]
    }

    async getContentVersion(userEmailId : string , type : string) {
        try{
            const user = await this.userModel.findOne({userEmailId : userEmailId}).exec()

            const contentVersionId = (type === "admin")?(user.currentVersion):(user.publishedVersion)

            const contentVersion = await this.contentModel.findById(contentVersionId).populate({
                path : 'sections',
                populate : {
                    path : 'sectionContent'
                }
            }).exec()

            return contentVersion as ContentDocument
        }
        catch{
            throw new NotFoundException('Could not find user')
        }
    }

    async addUser(newUserDetails : AddUserDto){
        
        const publishedVersion = {...newUserDetails.contentVersion , versionNumber : 1}
        const currentVersion   = {...newUserDetails.contentVersion , versionNumber : 2}
        
        const publishedVersionInstance = new this.contentModel(publishedVersion)
        const publishResult = await publishedVersionInstance.save()
        const publishedVersionId = publishResult.id

        const currentVersionInstance = new this.contentModel(currentVersion)
        const currentResult = await currentVersionInstance.save()
        const currentVersionId = currentResult.id

        const newUser = {
            userName  : newUserDetails.userName,
            userEmailId : newUserDetails.userEmailId,
            publishedVersion : publishedVersionId,
            currentVersion : currentVersionId
        }

        const newUserInstance = new this.userModel(newUser)
        const result = await newUserInstance.save()

        return result.id as string
    }

    async publishVersion(userEmailId : string){
        const user = await this.userModel.findOne({userEmailId:userEmailId}).populate('currentVersion').populate('publishedVersion').exec()

        const publishedVersion = user.publishedVersion
        
        const currentVersion = user.currentVersion

        const toPublish = {
            versionNumber : 1,
            name : currentVersion.name,
            emailId : currentVersion.emailId,
            phoneNumber : currentVersion.phoneNumber,
            logoSrc : currentVersion.logoSrc,
            posterSrc : currentVersion.posterSrc,
            posterCaption : currentVersion.posterCaption,
            socialMedia : currentVersion.socialMedia,
            themeDetails : currentVersion.themeDetails,
            sectionSequence : currentVersion.sectionSequence,
            sections : currentVersion.sections
        }

        await this.contentModel.updateOne({_id : publishedVersion._id} , { '$set': {...toPublish} })

        return currentVersion as ContentDocument
    }

    async deleteUser(userId : string){
        try {

            await this.userModel.deleteOne({_id : userId})

            return userId as string

        } catch (error) {
            throw new NotFoundException('Could not delete user')
        }
    } 
} 