/* eslint-disable prettier/prettier */
import { Controller , Post , Get, Patch, Delete, Body, Param ,Req} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request } from 'express';

import { AddUserDto } from "src/db/dto/add-user.dto";

@Controller('api/users')
export class UsersController {
    
    constructor(private userService : UsersService){}

    @Get('admin/getAll')
    async getUsers() {
        return {users : await this.userService.getUsers()}
    }

    @Get('public/:id')
    async getContentVersioPublic(
        @Param('id') userEmailId : string,
    ) {
        const contentVersion = await this.userService.getContentVersion(userEmailId,"public")
        return {contentVersion : contentVersion }
    }
    
    @Get('admin')
    async getContentVersionAdmin(
        @Req() req: Request
    ) {
        const userEmailId = req.body.userEmailId
        const contentVersion = await this.userService.getContentVersion(userEmailId , "admin")
        return {contentVersion : contentVersion }
    }

    @Post('adduser')
    async addUser(
        @Body() newUserDetails : AddUserDto
    ) { 
        const generatedId = await this.userService.addUser(newUserDetails);
        return {id : generatedId}
    }

    @Patch('admin')
    async publishVersion(
        @Req() req: Request
    ) {
        const generatedId = await this.userService.publishVersion(req.body.userEmailId)
        return {id : generatedId}
    }

    @Delete('admin/:id')
    async deleteUser(
        @Param('id') userId : string,
    ) {
        return await this.userService.deleteUser(userId)
    }
}
