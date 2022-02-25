import React, { useState } from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Header from "./header";
import AddLink from "./addLink";
import ImageGallery from "./image-gallery";

const Dashboard = (props: any) => {
    const [addedLink, setAddedLink] = useState(false);

    return (
        <>
            <Header/>
            <div className="mb-4"/>
            <Card>
                <Card.Body>
                    <AddLink addedLinkEvent={() => {setAddedLink(!addedLink)}}/>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <ImageGallery addedLink={addedLink}/>
                </Card.Body>
            </Card>

        </>
    );
}

export default Dashboard;