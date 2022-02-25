import React, { useState } from "react";
import { Button, Grid, Slide } from "@material-ui/core"
import AddLink from "./addLink";
import ImageGallery from "./image-gallery";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LogoutButton from "../../Global/components/logoutButton";
import ImageProvider from "../../Global/components/ImageProvider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
            width: "100%",
            overflowX: "hidden"
        },
        hidden: {
            dipslay: "none"
        }
    }),
);

const Dashboard = () => {
    const classes = useStyles();
    const [linkAddedId, setLinkAddedId] = useState<string>();
    const [showGallery, setShowGallery] = useState(true);

    const toggleGallery = () => {
        setShowGallery(!showGallery)
    }
    return (
        <>
            <div className={classes.container}>
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item>
                        <Button variant={showGallery ? "contained" : "outlined"} color="primary" onClick={toggleGallery}>
                            Gallery
                        </Button>
                    </Grid>
                    <Grid item>
                        <LogoutButton />
                    </Grid>
                    <Grid item xs={12}>
                        <Slide in={!showGallery} direction="right" unmountOnExit timeout={0}>
                            <div>
                                <AddLink addedLinkEvent={(id: string) => { setLinkAddedId(id) }} />
                            </div>
                        </Slide>
                        <Slide in={showGallery} direction="left" timeout={0}>
                            <div>
                                <ImageProvider>
                                    <ImageGallery linkAddedId={linkAddedId}/>
                                </ImageProvider>
                            </div>
                        </Slide>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Dashboard;