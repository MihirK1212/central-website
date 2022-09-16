/* eslint-disable prettier/prettier */

import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionChildDocument = SectionChild & Document;

@Schema()
export class SectionChild extends Document {
   
    @Prop()
    sectionChildName : string;

    @Prop()
    sectionChildImage : string;

    @Prop()
    sectionChildShortDesc : string;

    @Prop()
    sectionChildDesc : string;

    @Prop({
        type : [String]
    })
    sectionChildLinks : string[];

    @Prop()
    visible : boolean;
}


export const SectionChildSchema = SchemaFactory.createForClass(SectionChild);