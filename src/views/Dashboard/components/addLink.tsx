import React, {useEffect, useState} from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import {fbFirestore} from "../../../firebase";
import matchLink from "../../../models/matchLink";

interface AddLinkProps {
    addedLinkEvent: (id: string) =>  void,
}

const AddLink = ({ addedLinkEvent } : AddLinkProps) => {

    const [linkValue, setLinkValue] =  useState('');
    const [sourceValue, setSourceValue] = useState('');
    const [tagsString, setTagsString] =  useState('');
    const [tagsValue, setTagsValue] = useState<string[]>([]);
    const [urlValue, setURLValue] = useState('');

    const handleLinkChange = (ev: any) => {
        let input = (ev.target as any).value;
        setLinkValue(input);
        if(matchLink(input, process.env.REACT_APP_REDDIT_URL)){
            fetch(input + ".json")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                
                let data: any = res[0].data.children[0].data;

                setURLValue(data.url);

                let newTags: string[] = tagsValue;
                if(newTags[0] == "")
                    newTags.splice(0);
                newTags.push(data.subreddit.toLowerCase());
                if(data.link_flair_text && data.link_flair_text !== ""){
                    let flair = data.link_flair_text;
                    flair = flair.replace(" ", "_");
                    newTags.push(flair);
                }
                console.log(newTags);
                setTagsString(newTags.toString().toLowerCase())
                setTagsValue([...tagsValue, ...newTags]);
                
            })
        }
        if(matchLink(input, process.env.REACT_APP_DANBOORU_URL))
        {
            let headers = new Headers();

            headers.append("Accept", "application/json")
            fetch("https://danbooru.donmai.us/profile.json?login=" + process.env.REACT_APP_DANBOORU_USERNAME + "&api_key=" +  process.env.REACT_APP_DANBOORU_PASSWORD)
            .then((res) => {
                return fetch(input + ".json", {
                    method: 'GET',
                    headers: headers
                })
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res);                

                setSourceValue(input);
                setURLValue(res.large_file_url);

                let newTags: string[] = tagsValue;
                if(newTags[0] == "")
                    newTags.splice(0);

                newTags = [...newTags, res.tag_string.split(" ")];
                setTagsString(newTags.toString().toLowerCase())
                setTagsValue([...tagsValue, ...newTags]);
                
            })
        }
        else
        {
            setSourceValue(input);
            setURLValue(input);
        }
    }

    const handleTagsChange = (ev: any) => {
        let input: string = (ev.target as any).value;
        if(input.indexOf(',') == 0)
            input = input.substr(1);
        input = input.replace(" ", "_");
        setTagsString(input.toLowerCase());
    }

    const handleUrlChange = (ev: any) => {
        let input: string = (ev.target as any).value;
        setURLValue(input);
    }

    const handleSourceChange = (ev: any) => {
        let input: string = (ev.target as any).value;
        setSourceValue(input);
    }

    useEffect(() => {
        let newTags: string[] = tagsString.split(',').map((tag: string) => {
            return tag.trim().toLowerCase();
        })
        setTagsValue(newTags);
    }, [tagsString]);

    const addLink = (e: any) => {
        e.preventDefault();

        fbFirestore.collection("links").add({
            timestamp: Math.floor(Date.now()),
            link: urlValue,
            source: sourceValue,
            updoot: false,
            tags: tagsValue
        })
        .then((result) => {
            setLinkValue('');
            setSourceValue('');
            setTagsString('');
            setTagsValue([]);
            setURLValue('');

            addedLinkEvent(result.id);
        })
        .catch((error) => {
            alert(error.message);
        })
    }
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="Link" placeholder="Add link" value={linkValue} onChange={handleLinkChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="Tags" placeholder="Tags (comma separated)" value={tagsString} onChange={handleTagsChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="Image" value={urlValue} onChange={handleUrlChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="Source" value={sourceValue}  onChange={handleSourceChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="outlined" onClick={addLink}>Add</Button>
                </Grid>
                <Grid item xs={12}>
                    <img className="preview-image" src={urlValue}/>
                </Grid>
            </Grid>
        </>

    );
}

export default AddLink;