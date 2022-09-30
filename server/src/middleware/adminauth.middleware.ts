/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware , HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';

import { UserDocument } from "src/db/models/users.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
      
      try{
          // next();
          console.log("Middleware called")
          // console.log("In jwt middleware ",req.headers)
          const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY) as jwt.JwtPayload
      
          const userId = decoded.userId
          const user = await this.userModel.findById(userId).exec()

          if(user._id.toString() === userId){
            req.body.userEmailId = decoded.userEmailId
            req.body.contentVersionId = decoded.contentVersionId
            console.log(req.headers)
            next();
          }
          else
          {
              throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
          }
        }
        catch(error){
              console.log(error)
              throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
  }
}
