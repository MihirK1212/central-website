import React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/styles"
import { Box, Card, Grid, IconButton, Typography } from '@material-ui/core';
import { styles } from "../../../variable-css";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const useStyles = makeStyles(styles)

function SectionTree({ currentSectionSequence , handleUp , handleDown , selectedSection, onSelectionChange , handleSaveSectionSequence }) {

    const classes = useStyles()

    const [editMode, setEditMode] = useState(false)


    function handleEdit() {
        setEditMode(!editMode)
        handleSaveSectionSequence()
    }

    const sections = currentSectionSequence.map((section, index) => {

        if(!section || !selectedSection){return null;}

        const isSelected = section._id == selectedSection._id
        const color = isSelected ? 'white' : 'black'

        return (
        <Grid item xs={12} key={index}>
                <Card
                    className={isSelected ? classes.sectionHeaderCardSelected : classes.sectionHeaderCard} onClick={() => onSelectionChange(section._id)}>
                    <Typography onClick={() => onSelectionChange(section._id)} style={{color:color}}> {section.sectionHeader} </Typography>
                    {editMode ? <Box display={'flex'}>
                        {index != 0 ? <IconButton onClick={() => handleUp(index)}><ArrowUpward htmlColor={isSelected ? 'white' : 'black'} /></IconButton> : null}
                        {index != currentSectionSequence.length - 1 ? <IconButton onClick={() => handleDown(index)}><ArrowDownward htmlColor={isSelected ? 'white' : 'black'} /></IconButton> : null}
                    </Box> : null}
                </Card>
            </Grid>
        )
    })

    return (
        <Grid container spacing={1}>
            {sections}
            <Box display={'flex'} width={'100%'} margin={2} justifyContent={'center'}>
                <button className={classes.buttonPrimary} onClick={handleEdit}>{editMode ? 'Save' : 'Edit'}</button>
            </Box>
        </Grid>
    );
}

export default SectionTree;
