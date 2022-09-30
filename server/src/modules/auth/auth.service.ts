/* eslint-disable prettier/prettier */
import {Injectable , HttpException, HttpStatus} from "@nestjs/common"

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UserDocument } from "src/db/models/users.model";

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    
    constructor (
        @InjectModel('User') private userModel : Model<UserDocument>
    ){}

    async googleLogin(googleLoginData : {emailId : string}) {
        try {
            
            const {emailId} = googleLoginData

            const user = await this.userModel.findOne({userEmailId:emailId}).exec()

            if(!user){
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }

            const payload = {
                userEmailId:user.userEmailId,
                userId : user._id,
                contentVersionId:user.currentVersion,
            }
            const token = jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'7d'});
            const authData = {token : token , userEmailId : user.userEmailId}

            return authData

        } catch (error) {
            console.log(error)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

}