/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema } from 'mongoose';

import { Content } from './content.model'

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop()
    userName : string;

    @Prop()
    userEmailId : string;

    @Prop(({ type: MongooseSchema.Types.ObjectId, ref: 'Content' }))
    publishedVersion : Content;

    @Prop(({ type: MongooseSchema.Types.ObjectId, ref: 'Content' }))
    currentVersion : Content;
}

export const UserSchema = SchemaFactory.createForClass(User);

