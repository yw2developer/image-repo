import React, { useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {fbFirestore} from "../../firebase";
import IconButton from "@material-ui/core/IconButton";


type FavoriteButtonProps = {
    primaryKey: string,
    updoot: boolean
}
const FavoriteButton = (props: FavoriteButtonProps) => {
    const [isUpdoot, setIsUpdoot] = useState(props.updoot);

    const updoot = () => {
        fbFirestore.collection("links").doc(props.primaryKey).update({updoot: true})
        setIsUpdoot(true);
    }

    const unupdoot = () => {
        fbFirestore.collection("links").doc(props.primaryKey).update({updoot: false})
        setIsUpdoot(false);
    }

    return (
        <>
            {(isUpdoot && <IconButton onClick={unupdoot}><FavoriteIcon color="primary"/></IconButton>) 
            || 
            (!isUpdoot && <IconButton onClick={updoot}><FavoriteBorderIcon color="primary"/></IconButton>)}
        </>
    );
}

export default FavoriteButton;
