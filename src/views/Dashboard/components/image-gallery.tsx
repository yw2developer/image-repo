import React, { useEffect, useState, useContext } from "react";
import {fbFirestore} from "../../../firebase";
import Gallery from '../../Grid-Gallery/Gallery.js';
import { Grid, TextField, IconButton } from "@material-ui/core";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { ImageContext } from "../../Global/components/ImageProvider";

type ImageObj = {
    primaryKey: string,
    src: string,
    source: string,
    thumbnail: string,
    tags: any,
    updoot: boolean,
    thumbnailCaption?: string,
    timestamp: number
}

type ImageGalleryProps = {
    linkAddedId?: string
}

const ImageGallery = ({ linkAddedId }: ImageGalleryProps) => {
    const [images, setImages] = useState<ImageObj[]>([]);

    const [numPerPage, setNumPerPage] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [showTags, setShowTags] = useState(false);
    const [onlyFavorite, setOnlyFavorite] = useState(false);

    const { deletedPrimaryKey } = useContext(ImageContext);

    const getLeastRecentTimestamp = () => {
        if(images.length > 0) {
            return images[images.length-1].timestamp;
        }
        return -1;
    }

    const parseImageData = (data: any, primaryKey: string): ImageObj => {
        let tags = data.tags.map((tag: string) => {
            return {value: tag, title: tag}
        })
        let imageObj: ImageObj = {
            primaryKey: primaryKey,
            src: data.link,
            thumbnail: data.link,
            tags: tags,
            source: data.source,
            updoot: data.updoot,
            timestamp: data.timestamp
        }
        return imageObj;
    }


    const toggleShowTags = () => {
        setShowTags(!showTags);
    }

    const toggleOnlyFavorites = () => {
        setOnlyFavorite(!onlyFavorite);
    }

    const canGoForward = () => {
        return (pageIndex + 1) * numPerPage < images.length
    }
    const goForward = () => {
        if(canGoForward())
            setPageIndex(pageIndex + 1);
        else {
            const leastRecentTimestamp = getLeastRecentTimestamp();

            fetchMore(leastRecentTimestamp)
            .then((gotMore) => {
                if(gotMore)
                    setPageIndex(pageIndex + 1);
            })
        }
    }

    const canGoBack = () => {
        return pageIndex > 0
    }

    const goBack = () => {
        if(canGoBack())
            setPageIndex(pageIndex - 1);
    }

    const fetchMore = (leastRecentTimestamp: number) => {
        let query = fbFirestore.collection("links").orderBy("timestamp", "desc");
        let newImages: ImageObj[] = []

        if(leastRecentTimestamp !== -1) {
            query = query.startAfter(leastRecentTimestamp)
            newImages = [...images];
        }
        if(onlyFavorite) {
            query = query.where("updoot", "==", true)
        }
        return query.limit(numPerPage).get()
        .then((snapshot) => {
            if(snapshot.size > 0) {
                console.log("Fetch more", snapshot.size)
                snapshot.docs.forEach((doc) => {
                    newImages.push(parseImageData(doc.data(), doc.id));
                })
                setImages(newImages);
                return true;
            }
            setImages(newImages);
            return false;
        })
    }
    const handleSetNumToFetch = (event: any) => {
        let input: number = parseInt(event.target.value);
        if(input != null && typeof input == "number" && input > 0)
            setNumPerPage(input);
    }

    useEffect(() => {
        setImages([])
        setPageIndex(0)
        fetchMore(-1);
    }, [onlyFavorite])

    useEffect(() => {
        if(linkAddedId !== undefined) {
            fbFirestore.collection("links").doc(linkAddedId).get()
            .then((doc) => {
                const newImages = [...images];
                newImages.unshift(parseImageData(doc.data(), doc.id));
                setImages(newImages);
            })
        }
    }, [linkAddedId])

    useEffect(() => {
        if(deletedPrimaryKey !== undefined) {
            const idx = images.findIndex((i) => i.primaryKey === deletedPrimaryKey)
            if(idx >= 0) {
                const newImages = [...images];
                newImages.splice(idx, 1)
                setImages(newImages);
            }
        }
    }, [deletedPrimaryKey])

    return (
        <>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton onClick={toggleOnlyFavorites}>
                                {onlyFavorite && <FavoriteIcon color="primary" />}
                                {!onlyFavorite && <FavoriteBorderIcon color="primary" />}
                            </IconButton>   
                        </Grid>
                        <Grid item>
                            <IconButton onClick={toggleShowTags}>
                                {showTags && <LabelOffIcon color="primary" />}
                                {!showTags && <LabelIcon color="primary" />}
                            </IconButton>   
                        </Grid>
                        <Grid item>
                            <TextField type="number" label="Images per Page" value={numPerPage} onChange={handleSetNumToFetch} variant="outlined" size="small"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Gallery images={images.slice(pageIndex * numPerPage, (pageIndex + 1) * numPerPage)} showTags={showTags} backdropClosesModal={true}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton onClick={goBack}><ArrowBackIcon color="primary" /></IconButton>
                        </Grid>
                        <Grid item>
                            Page {pageIndex + 1}
                        </Grid>
                        <Grid item>
                            <IconButton onClick={goForward}><ArrowForwardIcon color="primary" /></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}


export default ImageGallery;