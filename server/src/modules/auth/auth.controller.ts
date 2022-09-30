/* eslint-disable prettier/prettier */

import {Controller , Post , Body} from "@nestjs/common"
import {AuthService} from "./auth.service"

@Controller('/api/auth')
export class AuthController {
    
    constructor(
        private authService : AuthService
    ){}

    @Post('googlelogin')
    async googleLogin(
        @Body() googleLoginData : {emailId : string}
    ) {
        const authData  = await this.authService.googleLogin(googleLoginData)
        return {authData : authData}
    }
}
