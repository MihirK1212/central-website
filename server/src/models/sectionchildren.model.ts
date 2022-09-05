/* eslint-disable prettier/prettier */

import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
