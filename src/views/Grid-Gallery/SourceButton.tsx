import React from "react";
import OpenInNewIcon from '@material-ui/icons/OpenInNewOutlined';


type SourceButtonProps = {
    source: string,
}
const SourceButton = (props: SourceButtonProps) => {

    return (
        <>
             <a className={"icon-button"} href={props.source} target="_blank" rel="noreferrer noopener"><OpenInNewIcon/></a>
        </>
    );
}

export default SourceButton;
