import React, { useEffect, useState } from 'react';
import {Button, Tooltip, Avatar, Typography, Result} from 'antd';
import './Header.css';
import {Link} from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import { getHeader, logout } from '../Services/userService';

const Header = (props) => {
    const [header, setHeader] = useState({Logged:0});

    useEffect(()=>{
        getHeader("_none_")
            .then(res => {
                console.log(res)
                setHeader(res);
            })
    },[]);

    const onLogout = async () => {
        await logout().then(
            res => console.log(res)
        )
        window.location.href = "/"
    }

    return (
        <header className = "header">
            <img src="https://i.ibb.co/k3rqzWb/Petpal-logo.png" alt="Petpal-logo" border="0" width={200}/>
            {
                header.Logged ? 
                    <span className = "header-btns">
                        <Button className = "header-btn" type = 'primary' danger onClick = {onLogout}>Log out</Button>
                        <Avatar style = {{marginRight:"8px"}} src = {header.avatar}/>
                        <Typography.Text strong>{header.username}</Typography.Text>
                    </span>
                :
                    <span className = "header-btns">
                        <Tooltip title = "Post now!">
                            <Button danger shape="circle" icon={<FormOutlined />} href = "/post"/>
                        </Tooltip>
                        <Link className = "header-btn" to = "/login">Log in</Link>
                        <Button className = "header-btn" type = 'primary' href = "/register">Sign up</Button>
                    </span>
            }
        </header>
    );
};

export default Header;
