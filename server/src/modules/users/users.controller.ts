/* eslint-disable prettier/prettier */
import { Controller , Post , Get, Patch, Delete, Body, Param} from "@nestjs/common";
import { UsersService } from "./users.service";

import { AddUserDto } from "src/db/dto/add-user.dto";

@Controller('api/users')
export class UsersController {
    
    constructor(private userService : UsersService){}

    @Get()
    async getUsers() {
        return {users : await this.userService.getUsers()}
    }

    @Get(':id')
    async getUser(
        @Param('id') userId : string,
    ) {
        return await this.userService.getUser(userId)
    }

    @Post()
    async addUser(
        @Body() newUserDetails : AddUserDto
    ) { 
        const generatedId = await this.userService.addUser(newUserDetails);
        return {id : generatedId}
    }

    @Patch(':id')
    async publishVersion(
        @Param('id') userId : string,
    ) {
        const generatedId = await this.userService.publishVersion(userId)
        return {id : generatedId}
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') userId : string,
    ) {
        return await this.userService.deleteUser(userId)
    }
}
