import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles,  Card, CardMedia} from "@material-ui/core";

import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { UploadImage } from "../UploadImage/UploadImage";

import { styles } from "../../../variable-css";

import { deleteSectionChild } from "../../../redux/actions/contentVersions";
import { updateSectionChild } from "../../../redux/actions/contentVersions";
import { sectionChildSeqChange } from "../../../redux/actions/contentVersions";

import { uploadImageServer } from "../../../api";

import { sectionsChildSchema } from "../../../schema";
import SocialModal from "../Modal/SocialModal";



const useStyles = makeStyles(styles)


function SectionChild({ userName, sectionID,  sectionName , sectionChild, sectionChildSequence ,editing}) {
    const classes = useStyles()

    let sectionChildID = sectionChild.sectionChildID
    let sectionChildIndex = sectionChildSequence.findIndex((index)=>(parseInt(index))===sectionChildID)

    console.log("section child index",sectionChildIndex)

    const handleChildSeqChange = (type)=>{
        console.log("Seq change called",type)

        dispatch(sectionChildSeqChange(sectionID,sectionChildID,type))
    }

    const dispatch = useDispatch()

    const handleDelete = () => {
        console.log("delete section child called ",sectionID,sectionChildID)
        dispatch(deleteSectionChild(sectionID, sectionChildID))
    }

    const [formSectionChild, setFormSectionChild] = useState({...sectionChild})

    const [checked, setChecked] = useState(sectionChild.visible);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };


    const handleEdit = async () => {
        console.log("Handle edit called ")
        console.log("Visibility status on edit submit",checked)
        formSectionChild.visible = checked
        console.log("Saving section child ",sectionID,sectionChildID,formSectionChild)
        dispatch(updateSectionChild(sectionID, sectionChildID, formSectionChild))
    };

    const [openModal, setOpenModal] = useState(false);

    console.log("Form section child ",formSectionChild)


    return (
        <div>
            <Card className={classes.sectionChildCard} style={{padding: '20px 40px' , minHeight: '450px', display:'flex' , flexDirection: 'column'}}>
                <span className={classes.subheading2} style={{ marginLeft: '10px' , textDecoration:'none' }}>{sectionChild.sectionChildName}</span>
                <br/>
                <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'row'}}>
                    <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <CardMedia
                        component="img"
                            image={formSectionChild.sectionChildImage}
                            style={{
                                borderRadius: '50%',
                                height : 300,
                                width : 300,
                                margin : 10
                            }}
                            alt={formSectionChild.sectionChildImage}
                        />
                        {
                            editing?
                            <>
                                <UploadImage aspectRatio={16 / 9} onChange={(base64EncodedImage) => {
                                        return new Promise((resolve, reject) => {
                                            uploadImageServer({
                                                method: 'POST',
                                                img: JSON.stringify({ data: base64EncodedImage }),
                                                userName: userName,
                                                dataFor: "editSectionChild",
                                                sectionID: sectionID,
                                                sectionChildID: sectionChildID,
                                                headers: { 'Content-Type': 'application/json' }
                                            }).then((res)=>{
                                                console.log("image upload response",res);
                                                setFormSectionChild({...formSectionChild,sectionChildImage:res.data.imgURL});
                                                handleEdit()
                                                resolve()
                                            }).catch((err)=>{
                                                console.log(err)
                                                reject()
                                            })
                                        })
                                    }} />
                            </>:""
                        }
                    </div>


                    <div className={classes.sectionChildForm}>
                        <form id="form" style={{height:100}}>

                            <TextField
                                required
                                fullWidth
                                id="section-child-name"
                                margin="normal"
                                label={sectionsChildSchema[sectionName].sectionChildName.label}
                                type="text"
                                name="section-child-name"
                                autoComplete="Section Child Name"
                                value={formSectionChild.sectionChildName}
                                onChange={(e) => setFormSectionChild({ ...formSectionChild, sectionChildName: e.target.value })}
                                size="small"
                                disabled={!editing}

                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="section-child-short-desc"
                                label={sectionsChildSchema[sectionName].sectionChildShortDesc.label}
                                type="text"
                                name="section-child-short-desc"
                                autoComplete="Section Child Short Description"

                                value={formSectionChild.sectionChildShortDesc}
                                onChange={(e) => setFormSectionChild({ ...formSectionChild, sectionChildShortDesc: e.target.value })}
                                size="small"
                                disabled={!editing}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                minRows={3}
                                id="section-child-desc"
                                label={sectionsChildSchema[sectionName].sectionChildDesc.label}
                                type="text"
                                name="section-child-desc"
                                autoComplete="Section Child Description"

                                value={formSectionChild.sectionChildDesc}
                                onChange={(e) => setFormSectionChild({ ...formSectionChild, sectionChildDesc: e.target.value })}
                                size="small"
                                disabled={!editing}
                            />
                            {
                                editing &&
                                <Button
                                style={{
                                    marginTop:15,
                                    color: '#3C2117',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => {
                                    setOpenModal(true);
                                }}
                                >
                                    + Add Social Media Links
                                </Button>
                            }

                            {openModal && editing && <SocialModal closeModal={setOpenModal} formSectionChild={formSectionChild} setFormSectionChild={setFormSectionChild}></SocialModal>}
                            <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} disabled={!editing}/>} label="Visible" style={{marginRight:50,marginLeft:100}}/>
                                {
                                    editing?
                                    <>
                                    {
                                        (sectionChildIndex>0)?
                                        <span className="material-icons" style={{cursor:"default"}} onClick={()=>{handleChildSeqChange('UP')}}>keyboard_arrow_up</span>:null
                                    }

                                    {
                                        (sectionChildIndex<(sectionChildSequence.length-1))?
                                        <span className="material-icons" style={{cursor:"default"}} onClick={()=>{handleChildSeqChange('DOWN')}}>keyboard_arrow_down</span>:null
                                    }

                                    <span className="material-icons" style={{marginLeft:50,cursor:"default"}} onClick={handleDelete}>delete</span>
                                    </>:""
                                }

                            </div>

                            {editing?<Button type="button" onClick={handleEdit} className={classes.buttonPrimary} style={{marginTop:15,marginLeft:200}}>Confirm</Button>:""}
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default SectionChild;
