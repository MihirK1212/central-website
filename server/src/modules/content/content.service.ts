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

    async updateContentVersion(contentVersionId:string,updatedContentVersion: UpdateContentVersionDto){

        // console.log("Update content version service ",contentVersionId,updatedContentVersion)

        updatedContentVersion = this.omitNull(updatedContentVersion)
    
        if(updatedContentVersion.socialMedia){
            updatedContentVersion.socialMedia = this.omitNull(updatedContentVersion.socialMedia)
        }
        
        await this.contentModel.updateOne({_id : contentVersionId} , { '$set': updatedContentVersion })
    }

    async addSection(contentVersionId:string,newSection : AddSectionDto){

        try {
            const newSectionInstance = new this.sectionModel(newSection)
            const result = await newSectionInstance.save()

            const sectionId = result.id

            await this.contentModel.updateOne(
                { _id: contentVersionId },
                { $push: { sectionSequence  : sectionId.toString() } }
            )

            await this.contentModel.updateOne(
                { _id: contentVersionId },
                { $push: { sections  : sectionId } }
            )

            const generatedSection = await this.sectionModel.findById(sectionId).exec()

            return generatedSection as SectionDocument

        } 
        
        catch (error) {
            throw new NotFoundException('Could not add new section')
        }
    }

    async updateSection(updateSectionDetails : UpdateSectionDto){
        try {
            const sectionId = updateSectionDetails.sectionId
            const updatedSection   = this.omitNull(updateSectionDetails.section)

            await this.sectionModel.updateOne({_id : sectionId},{ '$set' : updatedSection})

            updatedSection.sectionContent.map(async (sectionChild : SectionChildDocument)=>{
                const sectionChildId = sectionChild._id

                await this.sectionChildModel.updateOne({_id : sectionChildId},{ '$set' : sectionChild})
            })

            return sectionId as string

        } catch (error) {
            throw new NotFoundException('Could not update section')   
        }
    }

    async deleteSection(contentVersionId:string,sectionId:string){
        try {
            console.log("In delete section service")

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

    async addSectionChild(newSectionChildDetails : AddSectionChildDto){

        try {
            const sectionId = newSectionChildDetails.sectionId
            const newSectionChild = newSectionChildDetails.sectionChild

            const newSectionChildInstance = new this.sectionChildModel(newSectionChild)
            const result = await newSectionChildInstance.save()
            const sectionChildId = result.id

            await this.sectionModel.updateOne(
                { _id: sectionId },
                { $push: { sectionChildSequence  : sectionChildId.toString() } }
            )

            await this.sectionModel.updateOne(
                { _id: sectionId },
                { $push: { sectionContent : sectionChildId } }
            )

            const generatedSectionChild = await this.sectionChildModel.findById(sectionChildId).exec()

            return generatedSectionChild as SectionChildDocument
        } 
        
        catch (error) {
            throw new NotFoundException('Could not add new section')
        }
    }

    private omitNull(obj : any) : any {
        if(obj === null){return}
        Object.keys(obj).filter(k => (obj[k] === null)).forEach(k => delete(obj[k]))
        return obj
    }
} 