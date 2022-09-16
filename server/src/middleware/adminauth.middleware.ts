/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware , HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';
import  jwt from 'jsonwebtoken';

import { UserDocument } from "src/db/models/users.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
    
      console.log('Request in Middleware...');

      try{
          //next()

          console.log("JWT Middleware",req.headers.authorization)
          const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY)
          console.log("Decoded token ",decoded)
      
          const userId = decoded.userId
          const user = await this.userModel.findById(userId).exec()

          if(user._id.toString() === userId){
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
