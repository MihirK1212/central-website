/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Content } from './content.model'

@Schema()
export class User extends Document {
    @Prop()
    userName : string;

    @Prop()
    userEmailId : string;

    @Prop(({ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }))
    currentVersion : Content;

    @Prop(({ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }))
    publishedVersion : Content;
}

export const UserSchema = SchemaFactory.createForClass(User);

