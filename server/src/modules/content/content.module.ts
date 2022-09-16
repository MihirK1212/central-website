/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { ContentSchema} from '../../db/models/content.model'
import { SectionSchema } from "src/db/models/sections.model";
import { SectionChildSchema } from "src/db/models/sectionchildren.model";

import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";


@Module({
    imports : [
        MongooseModule.forFeature([
            {name : 'Content' , schema : ContentSchema},
            {name : 'Section' , schema : SectionSchema},{name : 'SectionChild' , schema : SectionChildSchema},
        ])
    ],
    controllers : [ContentController],
    providers : [ContentService],
})
export class ContentModule {}