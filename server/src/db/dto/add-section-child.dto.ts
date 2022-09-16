/* eslint-disable prettier/prettier */

export class AddSectionChildDto {
    
    sectionId : string;

    sectionChild : {
        sectionChildName : string;
        sectionChildImage : string;
        sectionChildShortDesc : string;
        sectionChildDesc : string;
        sectionChildLinks : string[];
        visible : boolean;
    }
}