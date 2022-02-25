import React, { useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {fbFirestore} from "../../firebase";


type FavoriteButtonProps = {
    primaryKey: string,
    updoot: boolean
}
const FavoriteButton = (props: FavoriteButtonProps) => {

    const [isUpdoot, setIsUpdoot] = useState(props.updoot);
    const updoot = () => {
        fbFirestore.collection("links").doc(props.primaryKey).update({updoot: true})

        //To add timestamp manually
        // fbFirestore.collection("links").doc(props.primaryKey).update({timestamp: Math.floor(Date.now())});
        setIsUpdoot(true);
    }

    const unupdoot = () => {
        fbFirestore.collection("links").doc(props.primaryKey).update({updoot: false})

        //To add timestamp manually
        // fbFirestore.collection("links").doc(props.primaryKey).update({timestamp: Math.floor(Date.now())});
        setIsUpdoot(false);
    }

    return (
        <>
            {(isUpdoot && <button className="icon-button favorite-button" onClick={unupdoot}><FavoriteIcon/></button>) 
            || 
            (!isUpdoot && <button className="icon-button notfavorite-button" onClick={updoot}><FavoriteBorderIcon/></button>)}
        </>
    );
}

export default FavoriteButton;
