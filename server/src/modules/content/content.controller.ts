/* eslint-disable prettier/prettier */
import { Controller , Post , Get, Patch, Delete, Body, Param} from "@nestjs/common";
import { ContentService } from "./content.service";

import { AddSectionDto } from "src/db/dto/add-section.dto";
import { AddSectionChildDto } from "src/db/dto/add-section-child.dto";
import { UpdateSectionDto } from "src/db/dto/update-section.dto";
import { DeleteSectionDto } from "src/db/dto/delete-section.dto";
import { UpdateContentVersionDto } from "src/db/dto/update-content-version.dto";

@Controller('api/content')
export class ContentController {
    
    constructor(private contentService : ContentService){}

    @Get()
    async getContentVersions() {
        return {contentVersions : await this.contentService.getContentVersions()}
    }

    @Get(':id')
    async getContentVersion(
        @Param('id') contentId : string,
    ) {
        return await this.contentService.getContentVersion(contentId)
    }

    @Patch()
    async updateContentVersion(
        @Body() updateContentVersionDetails : UpdateContentVersionDto,
    ) {
        return await this.contentService.updateContentVersion(updateContentVersionDetails)
    }
    
    @Post('sections')
    async addSection(
        @Body() newSection : AddSectionDto
    ) {
        const generatedId = await this.contentService.addSection(newSection)
        return {id : generatedId}
    }

    @Patch('sections')
    async updateSection(
        @Body() updateSectionDetails : UpdateSectionDto
    ) {
        const updatedId = await this.contentService.updateSection(updateSectionDetails)
        return {id : updatedId}
    }

    @Delete('sections')
    async deleteSection(
        @Body() deleteSectionDetails : DeleteSectionDto
    ) {
        const deletedId = await this.contentService.deleteSection(deleteSectionDetails)
        return {id : deletedId}
    }

    @Post('sections/sectionChildren')
    async addSectionChild(
        @Body() newSectionChild : AddSectionChildDto
    ) {
        const generatedId = await this.contentService.addSectionChild(newSectionChild)
        return {id : generatedId}
    }
}
