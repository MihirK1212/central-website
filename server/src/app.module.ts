/* eslint-disable prettier/prettier */
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './modules/content/content.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { UserSchema } from './db/models/users.model';

import { AdminAuthMiddleware } from "src/middleware/adminauth.middleware";


@Module({
  imports: [  ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI) ,
              MongooseModule.forFeature([
                  {name : 'User' , schema : UserSchema},
              ]),
              ContentModule , UsersModule , AuthModule
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AdminAuthMiddleware)
        .forRoutes({ path: 'api/content*', method : RequestMethod.ALL},
                   { path: 'api/users/admin*', method : RequestMethod.ALL},
                   { path: 'api/users/adduser', method : RequestMethod.ALL});
    }
}
