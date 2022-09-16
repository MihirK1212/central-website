/* eslint-disable prettier/prettier */

export class AddUserDto {

    userName : string;
    userEmailId : string;

    contentVersion : {
        
        userEmailId : string;
        versionNumber : number;

        userDetails : {
            name : string,
            logo : string,
            socialMedia : {
                Instagram : string,
                LinkedIn : string,
                Facebook : string ,
                Discord : string,
            }
        };

        homePagePoster : {
            src : string,
            caption : string
        };

        contactDetails : {
            email : string,
            phoneNumber : number
        };

        themeDetails : string;
    }
}