import React, {useEffect, useState} from "react";
import {Col, Form } from "react-bootstrap";
import {fbFirestore} from "../../../firebase";
import matchLink from "../../../models/matchLink";
import DoneIcon from '@material-ui/icons/Done';

interface AddLinkProps {
    addedLinkEvent: () =>  void,
}

const AddLink = ({ addedLinkEvent } : AddLinkProps) => {

    const [linkValue, setLinkValue] =  useState('');
    const [sourceValue, setSourceValue] = useState('');
    const [tagsString, setTagsString] =  useState('');
    const [tagsValue, setTagsValue] = useState<string[]>([]);
    const [urlValue, setURLValue] = useState('');

    const [success, setSuccess] = useState(false);
    const [fadeOut, setFadeOut] = useState("");


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
        .then((result: any) => {
            console.log(result);
            setSuccess(true);
            setLinkValue('');
            setSourceValue('');
            setTagsString('');
            setTagsValue([]);
            setURLValue('');

            addedLinkEvent();

            setTimeout(() => {
                setFadeOut("animated fadeOut");
                setTimeout(() => {
                    setSuccess(false);
                }, 500);
            }, 500);
        })
        .catch((error) => {
            alert(error.message);
        })
    }
    return (
        <>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="linkInput">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="text" placeholder="Add link" value={linkValue} onChange={handleLinkChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="Tags (comma separated)" value={tagsString} onChange={handleTagsChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="urlValue">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" value={urlValue} onChange={handleUrlChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="sourceValue">
                        <Form.Label>Source</Form.Label>
                        <Form.Control type="text" value={sourceValue}  onChange={handleSourceChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="submit">
                    <button type="submit" className="button-border" onClick={addLink}>Add</button>
                    </Form.Group>
                    {success &&
                    <Form.Label className={fadeOut}>
                        <DoneIcon/>
                    </Form.Label>}
                </Form.Row>
            </Form>
            <img className="preview-image" src={urlValue}/>
        </>

    );
}

export default AddLink;