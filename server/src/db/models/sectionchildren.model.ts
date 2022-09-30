/* eslint-disable prettier/prettier */

import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionChildDocument = SectionChild & Document;

@Schema()
export class SectionChild extends Document {
   
    @Prop(({default : "Section Child Name"}))
    sectionChildName : string;

    @Prop(({default : "Section Child Image"}))
    sectionChildImage : string;

    @Prop(({default : "Section Child Short Description"}))
    sectionChildShortDesc : string;

    @Prop(({default : "Section Child Dsecription"}))
    sectionChildDesc : string;

    @Prop({
        type : [String],
        default : []
    })
    sectionChildLinks : string[];

    @Prop(({default : true}))
    visible : boolean;
}


export const SectionChildSchema = SchemaFactory.createForClass(SectionChild);