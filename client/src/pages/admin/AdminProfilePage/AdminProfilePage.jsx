import React, { useState } from "react";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import { useDispatch , useSelector } from "react-redux";

import "../../../index.css"

import Form from "../../../components/admin/Form/Form";
import Navbar from "../../../components/admin/Navbar/Navbar"
import MobileNavbar from "../../../components/admin/Navbar/MobileNavbar"
import {EditableProfileImage} from "../../../components/admin/EditableProfileImage/EditableProfileImage"

import { updateContentVersion } from "../../../redux/actions/contentVersion";


import "../../../components/admin/Navbar/Navbar.css";
import "../../../components/admin/Navbar/MobileNavbar.css";
import "../../../components/admin/Logo/Logo.css";
import "../../../components/admin/Poster/Poster.css";
import "../../../components/admin/Form/Form.css";


function AdminProfilePage() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const contentVersion = useSelector((state)=> state.contentVersion)


  const [ userProfile , setUserProfile] = useState(contentVersion)

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("Saving user profile ",userProfile)
    dispatch(updateContentVersion(userProfile));
  }

  return (
    <>
      {isMobile ? (
          <MobileNavbar profilePic={userProfile.logoSrc} />
        ) : (
          <>
          <Navbar profilePic={userProfile.logoSrc} />
            <hr></hr>
          </>
        )}

      <Grid container spacing={2} style={{ padding: 20, justifyContent: 'center' }}>
        <Grid item sm={8} xs={12}>
          <EditableProfileImage userProfile={userProfile} setUserProfile={setUserProfile} handleSubmit={handleSubmit} imageAlt={'Club Poster'} type="poster" imageSrc={userProfile.posterSrc} />
        </Grid>

        <Grid item sm={4} xs={12}>
          <EditableProfileImage userProfile={userProfile} setUserProfile={setUserProfile} handleSubmit={handleSubmit} imageAlt={'Club Logo'} type="logo" imageSrc={userProfile.logoSrc} />
        </Grid>

        <Grid item sm={12} xs={12}>
          <Form userProfile={userProfile} setUserProfile={setUserProfile} handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </>
  );
}

export default AdminProfilePage;
