import { Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import '../public.css'

export default function Navbar({ userProfile, sections, type }) {

    sections = sections.filter(section => section.visible === true)

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    let homeLink = ""
    let routeLink = ""

    if (type == "public") {
        homeLink = "/public/home"
        routeLink = "/public/home/section/"
    }

    else {
        homeLink = "/admin/home"
        routeLink = "/admin/preview/section/"
    }

    const sectionLinksList = (anchor) => (
        <Box
            className='drawer'
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>
                {sections.map(section => (
                    <a className='quick-links' href={routeLink + section._id}  key={section._id}>
                        <ListItem className='quick-links' button key={section.sectionName}>
                            <ListItemText style={{textAlign: 'center'}} primary={section.sectionName} />
                        </ListItem>
                    </a>
                ))}
            </List>


        </Box>
    );



    return (
        <>
            <div className="navbar-wrapper theme-orange container-fluid">
                <div className="container">
                    <div className="row d-flex align-items-center py-1">
                        <a href={homeLink} className="col-1 px-0 col-lg-0 logo-wrapper">
                            <img className="club-logo" src={userProfile.logoSrc} alt="Club Logo" />
                        </a>
                        <div className="container col-11 align-items-right container-fluid links-wrapper" >
                            <div className="col d-flex" style={{ flexDirection: "row-reverse" }}>
                                <a href="#contactus" className='contactUs'>Contact Us</a>
                                <List>
                                    <a className='quick-links' href={homeLink}>
                                                <ListItem className='quick-links' button>
                                                    <ListItemText style={{textAlign: 'center'}} primary={"Home"} />
                                                </ListItem>
                                    </a>
                                    {sections.map(section => (
                                        <a className='quick-links' href={routeLink + section._id}  key={section._id}>
                                            <ListItem className='quick-links' button key={section.sectionName}>
                                                <ListItemText style={{textAlign: 'center'}} primary={section.sectionName} />
                                            </ListItem>
                                        </a>
                                    ))}
                                </List>
                            </div>
                        </div>
                        <div className="col-11 toggleDrawer" >
                            <React.Fragment>
                                <Button onClick={toggleDrawer('right', true)}><MenuIcon color='action' /></Button>
                                <Drawer
                                    className='drawer'
                                    anchor={'right'}
                                    open={state['right']}
                                    onClose={toggleDrawer('right', false)}>

                                    <a className='club-logo-navbar' href={homeLink}>
                                        <img className="club-logo-navbar" src={userProfile.logoSrc} alt="Club Logo" />
                                    </a>

                                    <a href={homeLink} className='quick-links'>Home Lol</a>

                                    {sectionLinksList('right')}

                                    
                                    <a href="#contactus" className='contact'>Contact Us</a>

                                </Drawer>
                            </React.Fragment>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
