import React, { useEffect, useState } from "react";
import {fbFirestore} from "../../../firebase";
import Gallery from '../../Grid-Gallery/Gallery.js';
import {Row, Col, Form}  from 'react-bootstrap';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

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

const ImageGallery = (props: any) => {
    const [images, setImages] = useState<ImageObj[]>([]);
    const [numToFetch, setNumToFetch] = useState(10);
    const [mostRecentTimestamp, setMostRecentTimestamp] = useState(0);
    const [leastRecentTimestamp, setLeastRecentTimestamp] = useState(0);
    const [showTags, setShowTags] = useState(false);
    const [onlyFavorite, setOnlyFavorite] = useState(false);

    useEffect(() => {
        fetchInitial();
    }, [props.addedLink, onlyFavorite]);

    useEffect(() => {
        refetchImages();
    }, [numToFetch]);
    
    const goForward = () => {
        let query = fbFirestore.collection("links").orderBy("timestamp", "desc").where("timestamp", "<", leastRecentTimestamp)
        if(onlyFavorite)
            query = query.where("updoot", "==", true);
        query.limit(numToFetch).get()
        .then(handleLinkEntries)
        .catch((err) => {
            alert(err.message);
        })
    
    }
    const goBack = () => {
        let query = fbFirestore.collection("links").orderBy("timestamp", "asc").where("timestamp", ">", mostRecentTimestamp)
        if(onlyFavorite)
            query = query.where("updoot", "==", true);
        query.limit(numToFetch).get()
        .then(handleLinkEntries)
        .catch((err) => {
            alert(err.message);
        })
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

    const handleLinkEntries = (linkEntries: firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>) => {
        let newImages: ImageObj[] = [];
        linkEntries.forEach((linkEntry) => {
            newImages.push(parseImageData(linkEntry.data(), linkEntry.id));
        });
        newImages.sort((a: ImageObj, b: ImageObj): number => {
            return a.timestamp < b.timestamp ? 1 : -1;
        })
        if(newImages.length > 0)
        {
            setMostRecentTimestamp(newImages[0].timestamp);
            setLeastRecentTimestamp(newImages[newImages.length-1].timestamp);
            setImages(newImages);
        }
    }

    const refetchImages = () => {

        let query = fbFirestore.collection("links").orderBy("timestamp", "desc").where("timestamp", "<=", mostRecentTimestamp)
        if(onlyFavorite)
            query = query.where("updoot", "==", true);
        query.limit(numToFetch).get()
        .then(handleLinkEntries)
        .catch((err) => {
            console.error(err.message);
        })
    }


    const fetchInitial = () => {
        setImages([])
        let query = fbFirestore.collection("links").orderBy("timestamp", "desc");
        if(onlyFavorite)
            query = query.where("updoot", "==", true);
        query.limit(numToFetch).get()
        .then(handleLinkEntries)
        .catch((err) => {
            console.error(err.message);
        })
    }

    const toggleShowTags = () => {
        setShowTags(!showTags);
    }

    const toggleOnlyFavorites = () => {
        setOnlyFavorite(!onlyFavorite);
    }


    const handleSetNumToFetch = (event: any) => {
        let input: number = parseInt(event.target.value);
        if(input != null && typeof input == "number" && input > 0)
            setNumToFetch(input);
    }


    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col md="auto">
                    <button className="button-material" onClick={toggleOnlyFavorites}>
                        {onlyFavorite && <><FavoriteIcon/><span>Only Favourites</span></>}
                        {!onlyFavorite && <><FavoriteBorderIcon/><span>Only Favourites</span></>}
                    </button>   
                </Col>
                <Col md="auto">
                    <button className="button-material" onClick={refetchImages}>
                        Refresh
                    </button>   
                </Col>
                <Col md="auto">
                    <button className="button-material" onClick={toggleShowTags}>
                        {showTags && <><LabelOffIcon/><span>Hide Tags</span></>}
                        {!showTags && <><LabelIcon/><span>Show Tags</span></>}
                    </button>   
                </Col>
                <Col md="auto">
                    <Form.Label>No. Images per Page</Form.Label>
                    <Form.Control type="number" value={numToFetch} onChange={handleSetNumToFetch}/>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-4">
                <Col xs={12}>
                    <Gallery images={images} showTags={showTags} backdropClosesModal={true}/>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-4">
                <Col md="auto">
                    <button className="button-material" onClick={goBack}><ArrowBackIcon/></button>    
                </Col>
                <Col md="auto">
                    <button className="button-material" onClick={goForward}><ArrowForwardIcon/></button>
                </Col>
            </Row>
        </>
    );
}


export default ImageGallery;