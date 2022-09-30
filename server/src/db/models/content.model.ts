/* eslint-disable prettier/prettier */

// import * as mongoose from 'mongoose';
import { Prop,  Schema , SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema } from 'mongoose';

import { Section } from './sections.model'

export type ContentDocument = Content & Document;

@Schema()
export class Content extends Document {
    
    @Prop()
    versionNumber : number;

    @Prop()
    name : string;

    @Prop()
    emailId : string;

    @Prop()
    phoneNumber : number;

    @Prop()
    logoSrc : string;

    @Prop()
    posterSrc : string;

    @Prop()
    posterCaption : string;

    @Prop({
        type : {
            Instagram : { type : String, default: ""},
            LinkedIn : { type : String, default: ""},
            Facebook : { type : String, default: ""},
            Discord : { type : String, default: ""},
        }
    })
    socialMedia : {
        Instagram : string,
        LinkedIn : string,
        Facebook : string ,
        Discord : string,
    }
    
    @Prop()
    themeDetails : string;

    @Prop(({ type: [String] , default : []}))
    sectionSequence : string[];

    @Prop(({ type: [MongooseSchema.Types.ObjectId] , ref : 'Section' , default : []}))
    sections : Section[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);

