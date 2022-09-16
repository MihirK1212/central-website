/* eslint-disable prettier/prettier */
import { Injectable , NotFoundException} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ContentDocument } from '../../db/models/content.model'
import { SectionDocument } from "src/db/models/sections.model";
import { SectionChildDocument } from "src/db/models/sectionchildren.model";

import { AddSectionDto } from "src/db/dto/add-section.dto";
import { AddSectionChildDto } from "src/db/dto/add-section-child.dto";
import { UpdateSectionDto } from "src/db/dto/update-section.dto";
import { DeleteSectionDto } from "src/db/dto/delete-section.dto";
import { UpdateContentVersionDto } from "src/db/dto/update-content-version.dto";

@Injectable()
export class ContentService{

    constructor(
        @InjectModel('Content') private contentModel: Model<ContentDocument>,
        @InjectModel('Section') private sectionModel: Model<SectionDocument>,
        @InjectModel('SectionChild') private sectionChildModel: Model<SectionChildDocument>
    ) {}

    async getContentVersions() {

        const contentVersions = await this.contentModel.find().populate({
            path : 'sections',
            populate : {
                path : 'sectionContent'
            }
        }).exec()
        
        return contentVersions as ContentDocument[]
    }

    async getContentVersion(contentId : string) {
        try{
            const contentVersion = await this.contentModel.findById(contentId).populate({
                path : 'sections',
                populate : {
                    path : 'sectionContent'
                }
            }).exec()

            return contentVersion as ContentDocument
        }
        catch{
            throw new NotFoundException('Could not find content version')
        }
    }

    async updateContentVersion(updateContentVersionDetails : UpdateContentVersionDto){

        const contentVersionId = updateContentVersionDetails.contentVersionId
        let updatedContentVersion = updateContentVersionDetails.contentVersion
    
        updatedContentVersion = this.omitNull(updatedContentVersion)

        if(updatedContentVersion.userDetails){
            updatedContentVersion.userDetails = this.omitNull(updatedContentVersion.userDetails)
        }
        if(updatedContentVersion.homePagePoster){
            updatedContentVersion.homePagePoster = this.omitNull(updatedContentVersion.homePagePoster)
        }
        if(updatedContentVersion.contactDetails){
            updatedContentVersion.contactDetails = this.omitNull(updatedContentVersion.contactDetails)
        }
        if(updatedContentVersion.userDetails.socialMedia){
            updatedContentVersion.userDetails.socialMedia = this.omitNull(updatedContentVersion.userDetails.socialMedia)
        }

        console.log(updatedContentVersion)
        
        await this.contentModel.updateOne({_id : contentVersionId} , { '$set': updatedContentVersion })
    }

    async addSection(newSection : AddSectionDto){

        try {
            const newSectionInstance = new this.sectionModel(newSection.section)
            const result = await newSectionInstance.save()

            const contentVersionId = newSection.contentVersionId
            const sectionId = result.id

            await this.contentModel.updateOne(
                { _id: contentVersionId },
                { $push: { sectionSequence  : sectionId.toString() } }
            )

            await this.contentModel.updateOne(
                { _id: contentVersionId },
                { $push: { sections  : sectionId } }
            )

            return sectionId as string

        } 
        
        catch (error) {
            throw new NotFoundException('Could not add new section')
        }
    }

    async updateSection(updateSectionDetails : UpdateSectionDto){
        try {
            const sectionId = updateSectionDetails.sectionId
            const updatedSection   = this.omitNull(updateSectionDetails.section)

            await this.sectionModel.updateOne({_id : sectionId},{...updatedSection})

            return sectionId as string

        } catch (error) {
            throw new NotFoundException('Could not update section')   
        }
    }

    async deleteSection(deleteSectionDetails : DeleteSectionDto){
        try {
            const contentVersionId = deleteSectionDetails.contentVersionId
            const sectionId = deleteSectionDetails.sectionId

            await this.contentModel.updateOne(
                { _id: contentVersionId },
                { $pull: { sectionSequence  : sectionId.toString() } }
            )

            await this.contentModel.updateOne(
                { _id: contentVersionId },
                { $pull: { sections  : sectionId } }
            )

            await this.sectionModel.deleteOne({_id : sectionId})

            return sectionId as string

        } catch (error) {
            throw new NotFoundException('Could not delete section')
        }
    } 

    async addSectionChild(newSectionChild : AddSectionChildDto){

        try {
            const newSectionChildInstance = new this.sectionChildModel(newSectionChild.sectionChild)
            const result = await newSectionChildInstance.save()

            const sectionId = newSectionChild.sectionId
            const sectionChildId = result.id

            await this.sectionModel.updateOne(
                { _id: sectionId },
                { $push: { sectionChildSequence  : sectionChildId.toString() } }
            )

            await this.sectionModel.updateOne(
                { _id: sectionId },
                { $push: { sectionContent : sectionChildId } }
            )

            return sectionChildId as string
        } 
        
        catch (error) {
            throw new NotFoundException('Could not add new section')
        }
    }

    private omitNull(obj : any) : any {
        if(obj === null){return}
        Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete(obj[k]))
        return obj
    }
} 