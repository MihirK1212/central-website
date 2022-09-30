/* eslint-disable prettier/prettier */

export class UpdateContentVersionDto {
        
    name : string;
    email : string;
    phoneNumber : number;
    
    logoSrc : string;
    
    posterSrc : string;
    posterCaption : string;
    
    socialMedia : {
        Instagram : string,
        LinkedIn : string,
        Facebook : string ,
        Discord : string,
    }
    
    themeDetails : string;

    sectionSequence : string[];
    
}