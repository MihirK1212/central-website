/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Section } from './sections.model'

@Schema()
export class Content extends Document {
   
    @Prop()
    userEmailId : string;

    @Prop()
    versionNumber : number;

    @Prop({
        type : {
            name : {type: String , required:true},
            logo : {type: String , required:true},
            socialMedia : {
                Instagram : { type : String, default: ""},
                LinkedIn : { type : String, default: ""},
                Facebook : { type : String, default: ""},
                Discord : { type : String, default: ""},
            }
        }
    })
    userDetails : {
        name : string,
        logo : string,
        socialMedia : {
            Instagram : string,
            LinkedIn : string,
            Facebook : string ,
            Discord : string,
        }
    }

    @Prop({
        type: {
            src : {type: String , required:true},
            caption : {type: String , required:true},
        }
    })
    homePagePoster : {
        src : string,
        caption : string
    }

    @Prop({
        type: {
            email : {type: String , required:true},
            phoneNumber : {type: Number , required:true},
        }
    })
    contactDetails : {
        email : string,
        phoneNumber : number
    }

    @Prop()
    themeDetails : string;

    @Prop(({ type: [mongoose.Schema.Types.ObjectId] , ref : 'Section'}))
    sectionSequence : Section[];

    @Prop({ type: [Section], default: [] })
    sections : Section[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);

