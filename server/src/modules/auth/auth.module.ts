/* eslint-disable prettier/prettier */

import {Module} from "@nestjs/common"

import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "src/db/models/users.model"

import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
    imports : [
        MongooseModule.forFeature([
            {name : 'User' , schema : UserSchema},
        ])
    ],
    controllers : [AuthController] , 
    providers : [AuthService],
})
export class AuthModule {}