/* eslint-disable prettier/prettier */

export class AddSectionDto {

    contentVersionId : string;

    section : {
        sectionName : string;
        sectionHeader : string;
        sectionIcon : string;
        sectionFooter : string;
        sectionDescription : string;
        sectionTheme : string;
        visible : boolean;
    }
}