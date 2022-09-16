/* eslint-disable prettier/prettier */

export class UpdateContentVersionDto {

    contentVersionId : string;

    contentVersion : {
        
        userDetails : {
            name : string,
            logo : string,
            socialMedia : {
                Instagram : string,
                LinkedIn : string,
                Facebook : string ,
                Discord : string,
            }
        }
    
        homePagePoster : {
            src : string,
            caption : string
        }
    
        contactDetails : {
            email : string,
            phoneNumber : number
        }
    
        themeDetails : string;
    
        sectionSequence : string[];
    }

    
}