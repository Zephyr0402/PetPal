import React, { useEffect, useState } from 'react';
import {Button, Tooltip, Avatar, Typography} from 'antd';
import './Header.css';
import {Link} from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import {LogContext} from './HeaderContext';
import { getHeader } from '../Services/userService';

const Header = (props) => {
    const [header, setHeader] = useState("");

    // useEffect(()=>{
    //     console.log("hello");
    //     getHeader()
    //         .then(res => {
    //             console.log(res);
    //             setHeader(res);
    //         })
    // },[]);

    return (
        <header className = "header">
            <img src="https://i.ibb.co/k3rqzWb/Petpal-logo.png" alt="Petpal-logo" border="0" width={200}/>
            {
                false ? 
                    <span className = "header-btns">
                        <Button className = "header-btn" type = 'primary' danger href = "/logout">Log out</Button>
                        <Avatar style = {{marginRight:"8px"}} src = {header.avatar}/>
                        <Typography.Text strong>{header.name}</Typography.Text>
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