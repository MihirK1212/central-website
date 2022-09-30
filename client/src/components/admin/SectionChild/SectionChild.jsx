import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles,  Card, CardMedia} from "@material-ui/core";

import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { UploadImage } from "../UploadImage/UploadImage";

import { styles } from "../../../variable-css";

import { deleteSectionChild } from "../../../redux/actions/contentVersion";
import { updateSectionChild } from "../../../redux/actions/contentVersion";
import { changeSectionChildSequence } from "../../../redux/actions/contentVersion";

import { uploadImageServer } from "../../../api";

import { sectionsChildSchema } from "../../../schema";
import SocialModal from "../Modal/SocialModal";


const useStyles = makeStyles(styles)


function SectionChild({ sectionId,  sectionName , sectionChild, sectionChildSequence ,editing}) {

    const classes = useStyles()
    const dispatch = useDispatch()

    let sectionChildId = sectionChild._id
    let sectionChildIndex = sectionChildSequence.findIndex((index)=>index===sectionChildId)

    const [formSectionChild, setFormSectionChild] = useState({...sectionChild})

    const [checked, setChecked] = useState(sectionChild.visible);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const [openModal, setOpenModal] = useState(false);


    const handleChildSeqChange = (type)=>{
        dispatch(changeSectionChildSequence(sectionId,sectionChildId,type))
    }

    const handleUpdateSectionChild = async () => {
        formSectionChild.visible = checked
        dispatch(updateSectionChild(sectionId, sectionChildId, formSectionChild))
    }

    const handleDeleteSectionChild = () => {
        dispatch(deleteSectionChild(sectionId, sectionChildId))
    }

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
                                                img : JSON.stringify({ data: base64EncodedImage })
                                            }).then((res)=>{
                                                setFormSectionChild({...formSectionChild,sectionChildImage:res.data.imgURL});
                                                handleUpdateSectionChild()
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

                                    <span className="material-icons" style={{marginLeft:50,cursor:"default"}} onClick={handleDeleteSectionChild}>delete</span>
                                    </>:""
                                }

                            </div>

                            {editing?<Button type="button" onClick={handleUpdateSectionChild} className={classes.buttonPrimary} style={{marginTop:15,marginLeft:200}}>Confirm</Button>:""}
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default SectionChild;
