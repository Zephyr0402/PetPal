import React, { useEffect, useState } from 'react';
import {Button, Tooltip, Avatar, Typography, Dropdown, Menu, Divider} from 'antd';
import './Header.css';
import {Link, Redirect} from 'react-router-dom';
import { FormOutlined, DownOutlined} from '@ant-design/icons';
import { getHeader, getUserInfo, logout } from '../Services/userService';

const Header = (props) => {
    const [header, setHeader] = useState({});
    const [optionsVisible, setOptionsVisible] = useState(false);

    useEffect(()=>{
        getHeader()
            .then(async res => {
                console.log(res)
                if(typeof res.uuid === 'string'){
                    await getUserInfo().
                        then(
                            res => setHeader(res)
                        )
                    }
                else{
                    console.log(res.message)
                }
            })
    },[]);

    const onOptionClick = (e) => {
        switch (e.key) {
            case "profile":
                return <Redirect to = {{pathname : '/user', state: {id:"1"}}}/>
                break;
        
            case "posts":
                <Redirect to = {{pathname : '/user', state: {id:"2"}}}/>
            break;

            case "transactions":
                <Redirect to = {{pathname : '/user', state: {id:"3"}}}/>
            break;
        }
    }

    var optionsOnNameClick = (
        <Menu onClick = {onOptionClick}>
          <Menu.Item>Logged in as <b>{header.name}</b></Menu.Item>
          <Divider></Divider>
          <Menu.Item key = "profile"><Link to = {{pathname:'/user', state : {key:"1"}}}>My Profile</Link></Menu.Item>
          <Menu.Item key="posts"><Link to = {{pathname:'/user', state : {key:"2"}}}>My Posts</Link></Menu.Item>
          <Menu.Item key="transactions"><Link to = {{pathname:'/user', state : {key:"3"}}}>My Transactions</Link></Menu.Item>
          <Divider></Divider>
          <Menu.Item key="logout" danger>Log out</Menu.Item>
        </Menu>
      );

    const onMenuVisibleChange = () => {
        setOptionsVisible(!optionsVisible);
    }

    const onLogout = async () => {
        await logout().then(
            res => alert(res.message)
        )
        window.location.href = "/";
    }
    console.log("hello");
    return (
        <header className = "header">
            <img src="https://i.ibb.co/k3rqzWb/Petpal-logo.png" alt="Petpal-logo" border="0" width={200}/>
            {
                header.name === undefined ? 
                    <span className = "header-btns">
                        <Tooltip title = "Post now!">
                            <Button danger shape="circle" icon={<FormOutlined />} href = "/post"/>
                        </Tooltip>
                        <Link className = "header-btn" to = "/login">Log in</Link>
                        <Button className = "header-btn" type = 'primary' href = "/register">Sign up</Button>
                    </span>
                :
                    <span className = "header-btns">
                        <Tooltip title = "Post now!">
                            <Button danger shape="circle" icon={<FormOutlined />} href = "/post"/>
                        </Tooltip>
                        <Dropdown
                            overlay = {optionsOnNameClick}
                            onVisibleChange = {onMenuVisibleChange}
                            visible = {optionsVisible}
                        >
                            <div style = {{display:'inline'}}>
                                <Avatar style = {{marginLeft:"8px"}} src = {header.avatar}/><DownOutlined/>
                            </div>
                        </Dropdown>
                    </span>
            }
        </header>
    );
};

export default Header;
