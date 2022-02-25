import React, { useContext } from "react";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {fbFirestore} from "../../firebase";
import IconButton from "@material-ui/core/IconButton";
import { ImageContext } from "../Global/components/ImageProvider";


type DeleteButtonProps = {
    primaryKey: string,
}
const DeleteButton = (props: DeleteButtonProps) => {
    const { setDeletedPrimaryKey } = useContext(ImageContext);

    const deleteImage = () => {
        if(window.confirm("Are you sure?")) {
            fbFirestore.collection("links").doc(props.primaryKey).delete()
            .then(() => {
                setDeletedPrimaryKey(props.primaryKey)
            })
        }
    }

    return (
        <>
             <IconButton onClick={deleteImage}><DeleteIcon/></IconButton>
        </>
    );
}

export default DeleteButton;
