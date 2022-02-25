import React from "react";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {fbFirestore} from "../../firebase";


type DeleteButtonProps = {
    primaryKey: string,
}
const DeleteButton = (props: DeleteButtonProps) => {

    const deleteImage = () => {
        if(window.confirm("Are you sure?")) {
            fbFirestore.collection("links").doc(props.primaryKey).delete();
        }
    }

    return (
        <>
             <button className={"icon-button"} onClick={deleteImage}><DeleteIcon/></button>
        </>
    );
}

export default DeleteButton;
