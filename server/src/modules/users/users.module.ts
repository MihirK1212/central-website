/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../db/models/users.model";
import { ContentSchema} from '../../db/models/content.model'

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";


@Module({
    imports : [
        MongooseModule.forFeature([
            {name : 'Content' , schema : ContentSchema},{name : 'User' , schema : UserSchema},
        ])
    ],
    controllers : [UsersController],
    providers : [UsersService],
})
export class UsersModule {}