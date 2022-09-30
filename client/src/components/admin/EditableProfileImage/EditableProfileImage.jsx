import React from "react"
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"

import { styles } from "../../../variable-css"

import { UploadImage } from "../UploadImage/UploadImage"

import { uploadImageServer } from "../../../api"

const useStyles = makeStyles(styles)

export const EditableProfileImage = ({ userProfile , setUserProfile , handleSubmit, imageAlt, type, imageSrc }) => {
    const classes = useStyles()

    return (
        <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '2%' }}>
            <Typography className={classes.subheadingBold}>{type.toUpperCase()}</Typography>

            <img
                src={imageSrc}
                alt={imageAlt} height={'60%'} />

            <UploadImage aspectRatio={type === 'logo' ? 1 / 1 : 16 / 9} onChange={(base64EncodedImage) => {
                return new Promise((resolve, reject) => {
                    try {
                        uploadImageServer({
                            img : JSON.stringify({ data: base64EncodedImage })
                        }).then((res)=>{

                            if(type=="poster"){
                                setUserProfile({...userProfile,posterSrc:res.data.imgURL});
                            }
                            else{
                                setUserProfile({...userProfile,logoSrc:res.data.imgURL});
                            }
                            handleSubmit()
                            resolve()
                        }).catch((err)=>{
                            console.log(err)
                            reject()
                        })
                    } catch (err) {
                        console.error(err);
                        reject()
                    }
                })
            }} />
        </Paper>
    )
}
