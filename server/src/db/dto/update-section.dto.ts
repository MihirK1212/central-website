/* eslint-disable prettier/prettier */

import {SectionChild} from '../models/sectionchildren.model';

export class UpdateSectionDto {

    sectionId : string;
    
    section : {
        sectionName : string;
        sectionHeader : string;
        sectionIcon : string;
        sectionFooter : string;
        sectionDescription : string;
        sectionTheme : string;
        visible : boolean;
        sectionChildSequence : string[];
        sectionContent : SectionChild[];
    }
}