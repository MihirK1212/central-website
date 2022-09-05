/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {SectionChild} from './sectionchildren.model';

@Schema()
export class Section extends Document {
   
    @Prop()
    sectionName : string;

    @Prop()
    sectionHeader : string;

    @Prop()
    sectionIcon : string;

    @Prop()
    sectionFooter : string;

    @Prop()
    sectionDescription : string;

    @Prop()
    sectionTheme : string;

    @Prop()
    visible : boolean;

    @Prop(({ type: [mongoose.Schema.Types.ObjectId] , ref : 'SectionChild'}))
    sectionChildSequence : SectionChild[];

    @Prop({ type: [SectionChild], ref : 'SectionChild' })
    sectionContent : SectionChild[];
}


