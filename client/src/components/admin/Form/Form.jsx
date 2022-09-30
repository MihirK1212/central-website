import React from "react";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { FormControl, InputLabel,Select,MenuItem } from "@material-ui/core";

import { styles } from "../../../variable-css";




const useStyles = makeStyles(styles)

const FormTextField = ({ fieldName, label, type, autoCompleteHint, userProfile, setUserProfile , editing }) => {
  return (
    <TextField
      variant={'standard'}
      fullWidth
      label={label}
      type={type}
      autoComplete={autoCompleteHint}
      value={userProfile[fieldName]}
      onChange={(e) => {setUserProfile({ ...userProfile, [fieldName]: e.target.value })}} style={{ marginBlock: 10 }}
      disabled={!editing}/>
  )
}

function Form({ userProfile , setUserProfile , handleSubmit}) {

    const [editing,setEditing] = useState(false)


    const submitHelper = (e)=>{

        e.preventDefault();

        if(!editing){
            setEditing(true);
            return;
        }

        setEditing(false);
        handleSubmit();
    }


    const classes = useStyles()

    const handleThemeChange = (e) => {
        setUserProfile({... userProfile,themeDetails : e.target.value})
    }

    return (

        <Paper style={{ padding: 20 }}>

            <Typography align="center" className={classes.subheadingBold}>GENERAL DETAILS</Typography>

            <form onSubmit={submitHelper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormTextField fieldName={'name'} label={'Club Name'} type={'text'} autoCompleteHint={''} userProfile={userProfile} setUserProfile={setUserProfile}  editing={editing}/>
                <FormTextField fieldName={'emailId'} label={'Email'} type={'email'} autoCompleteHint={'email'} userProfile={userProfile} setUserProfile={setUserProfile} editing={editing} />
                <FormTextField fieldName={'phoneNumber'} label={'Phone Number'} type={'tel'} autoCompleteHint={''} userProfile={userProfile} setUserProfile={setUserProfile} editing={editing}/>

                <br/>

                <div className="grid-container">
                    <TextField
                        variant={'standard'}
                        label={'LinkedIn'}
                        type={'url'}
                        autoComplete={''}
                        value={userProfile.socialMedia.LinkedIn}
                        onChange={(e) => setUserProfile({...userProfile,socialMedia:{...userProfile.socialMedia, LinkedIn : e.target.value}})} style={{ marginBlock: 10 }}
                    disabled={!editing}/>

                    <TextField
                        variant={'standard'}
                        label={'Instagram'}
                        type={'url'}
                        autoComplete={''}
                        value={userProfile.socialMedia.Instagram}
                        onChange={(e) => setUserProfile({...userProfile,socialMedia:{...userProfile.socialMedia, Instagram : e.target.value}})} style={{ marginBlock: 10 }}
                    disabled={!editing}/>

                    <TextField
                        variant={'standard'}
                        label={'Facebook'}
                        type={'url'}
                        autoComplete={''}
                        value={userProfile.socialMedia.Facebook}
                        onChange={(e) => setUserProfile({...userProfile,socialMedia:{...userProfile.socialMedia, Facebook : e.target.value}})} style={{ marginBlock: 10 }}
                    disabled={!editing}/>

                    <TextField
                        variant={'standard'}
                        label={'Discord'}
                        type={'url'}
                        autoComplete={''}
                        value={userProfile.socialMedia.Discord}
                        onChange={(e) => setUserProfile({...userProfile,socialMedia:{...userProfile.socialMedia, Discord : e.target.value}})} style={{ marginBlock: 10 }}
                    disabled={!editing}/>
                </div>



                <FormControl fullWidth>
                    <InputLabel variant={'standard'}>Theme</InputLabel>
                    <Select
                        value={userProfile.themeDetails}
                        label="Theme"
                        onChange={handleThemeChange}
                        disabled={!editing}
                        variant={'standard'}>
                        <MenuItem value={'theme-orange'}>Orange</MenuItem>
                        <MenuItem value={'theme-purple'}>Purple</MenuItem>
                        <MenuItem value={'theme-blue'}>Blue</MenuItem>
                        <MenuItem value={'theme-green'}>Green</MenuItem>
                        <MenuItem value={'theme-yellow'}>Yellow</MenuItem>
                        <MenuItem value={'theme-pink'}>Pink</MenuItem>
                    </Select>
                </FormControl>



                <FormTextField fieldName={'posterCaption'} label={'Poster Caption'} type={'text'} autoCompleteHint={''} userProfile={userProfile} setUserProfile={setUserProfile} editing={editing}/>

                {editing?<Button type="submit" className={classes.buttonPrimary}>Confirm</Button>:<Button type="submit" className={classes.buttonPrimary}>Edit</Button>}
            </form >
        </Paper>
    );
}

export default Form;
