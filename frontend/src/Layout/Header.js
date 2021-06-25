import React from 'react';
import {Button, Tooltip} from 'antd';
import './Header.css';
import {Link} from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

const Header = (props) => {
    return (
        <header className = "header">
            <img src="https://i.ibb.co/k3rqzWb/Petpal-logo.png" alt="Petpal-logo" border="0" width={200}/>
            <span className = "header-btns">
                <Tooltip title = "Post now!">
                    <Button danger shape="circle" icon={<FormOutlined />} href = "/post"/>
                </Tooltip>
                <Link className = "header-btn" to = "/login">Log in</Link>
                <Button className = "header-btn" type = 'primary' href = "/join">Sign up</Button>
            </span>
        </header>
    );
};

export default Header;
