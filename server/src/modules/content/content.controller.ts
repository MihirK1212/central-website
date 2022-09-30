/* eslint-disable prettier/prettier */
import { Controller , Post ,Patch, Delete, Body , Req , NotFoundException , Param} from "@nestjs/common";
import { ContentService } from "./content.service";
import { Request } from 'express';

import { AddSectionDto } from "src/db/dto/add-section.dto";
import { AddSectionChildDto } from "src/db/dto/add-section-child.dto";
import { UpdateSectionDto } from "src/db/dto/update-section.dto";
import { UpdateContentVersionDto } from "src/db/dto/update-content-version.dto";

import * as cloudinaryPkg from 'cloudinary'

@Controller('api/content')
export class ContentController {
    
    constructor(
        private contentService : ContentService
    ){}

    @Patch()
    async updateContentVersion(
        @Body() updatedContentVersion : UpdateContentVersionDto,
        @Req() req: Request
    ) {
        return await this.contentService.updateContentVersion(req.body.contentVersionId,updatedContentVersion)
    }
    
    @Post('sections')
    async addSection(
        @Body() newSection : AddSectionDto,
        @Req() req: Request
    ) {
        const generatedSection = await this.contentService.addSection(req.body.contentVersionId,newSection)
        return {generatedSection : generatedSection}
    }

    @Patch('sections')
    async updateSection(
        @Body() updateSectionDetails : UpdateSectionDto
    ) {
        const updatedId = await this.contentService.updateSection(updateSectionDetails)
        return {id : updatedId}
    }

    @Delete('sections/:id')
    async deleteSection(
        @Param('id') sectionId : string,
        @Req() req: Request
    ) {
        const deletedId = await this.contentService.deleteSection(req.body.contentVersionId,sectionId)
        return {id : deletedId}
    }

    @Post('sections/sectionChildren')
    async addSectionChild(
        @Body() newSectionChildDetails : AddSectionChildDto
    ) {
        const generatedSectionChild = await this.contentService.addSectionChild(newSectionChildDetails)
        return {generatedSectionChild : generatedSectionChild}
    }

    @Post('image')
    async uploadImageServer(
        @Body() imgData : any
    ) {
        try {

            const cloudinary = cloudinaryPkg.v2
            cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
            })

            imgData = JSON.parse(imgData.img)
            const imgString = imgData.data
            const uploadResponse = await cloudinary.uploader.upload(imgString);
            const imgURL = uploadResponse.secure_url

            console.log("imgURL generated ",imgURL)
            return {imgURL : imgURL}
        } catch (error) {
            console.log(error)
            throw new NotFoundException('Could not upload image')  
        }
    }
}
