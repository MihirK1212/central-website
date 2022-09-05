/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

const MONGO_URI = process.env.MONGO_URI

@Module({
  imports: [  ConfigModule.forRoot(), MongooseModule.forRoot(MONGO_URI) ,
              ProductsModule
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
