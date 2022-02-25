import React from "react";
import LogoutButton from "../../Global/components/logoutButton";
import {Row, Col, Container}  from 'react-bootstrap';

const Header = () => {
    return (
        <div className="spacer">
            <Row>
                <Col md="auto">
                    <LogoutButton/>
                </Col>
            </Row>

        </div>
    );

}

export default Header;