/* eslint-disable prettier/prettier */

import { Prop,  Schema , SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema } from 'mongoose';

import {SectionChild} from './sectionchildren.model';

export type SectionDocument = Section & Document;

@Schema()
export class Section extends Document {
   
    @Prop(({required : true}))
    sectionName : string;

    @Prop(({required : true}))
    sectionHeader : string;

    @Prop(({default : "Section Icon"}))
    sectionIcon : string;

    @Prop(({default : "Section Footer"}))
    sectionFooter : string;

    @Prop(({default : "Section Description"}))
    sectionDescription : string;

    @Prop(({default : "Section Theme"}))
    sectionTheme : string;

    @Prop(({default : true}))
    visible : boolean;

    @Prop(({ type: [String] , default : []}))
    sectionChildSequence : string[];

    @Prop(({ type: [MongooseSchema.Types.ObjectId] , ref : 'SectionChild' , default : []}))
    sectionContent : SectionChild[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);

