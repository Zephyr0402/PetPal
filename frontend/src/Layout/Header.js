import React, { useEffect, useState } from 'react';
import {Button, Tooltip, Avatar, Typography, Dropdown, Menu, Divider, message, Alert} from 'antd';
import './Header.css';
import {Link, Redirect} from 'react-router-dom';
import { FormOutlined, DownOutlined,InfoCircleTwoTone, CommentOutlined} from '@ant-design/icons';
import { getHeader, getUserInfo, logout } from '../Services/userService';
import {showLoginRequiredModal} from "../Services/modal";

const Header = (props) => {
    const [header, setHeader] = useState({});
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        getHeader()
            .then(async res => {
                if(typeof res.uuid === 'string'){
                    await getUserInfo(res.uuid).
                        then(
                            res => setHeader(res)
                        );

                    setIsLogin(res.uuid !== "" && res.uuid !== undefined);
                }
            })
    },[]);

    const onLogout = async () => {
        await logout().then(
            (res) => message.error({
                content: "Log out successfully. You will be redirected to main page in 1 seconds",
                duration: 1,
                icon: <InfoCircleTwoTone twoToneColor="#52c41a"/>,
                onClose: () => {
                window.location.href = "/";
            }
            })
        )

    }

    const onMenuVisibleChange = () => {
        setOptionsVisible(!optionsVisible);
    }

    var optionsOnNameClick = (
        <Menu>
          <Menu.Item>Logged in as <b>{header.name}</b></Menu.Item>
          <Divider/>
          <Menu.Item key = "profile"><Link to = {{pathname:'/user/'+header.uuid, query : { key:"1" }}}>My Profile</Link></Menu.Item>
          <Menu.Item key="posts"><Link to = {{pathname:'/user/'+header.uuid, query : { key:"2" }}}>My Posts</Link></Menu.Item>
          <Menu.Item key="favorites"><Link to = {{pathname:'/user/'+header.uuid, query : { key:"2.5" }}}>My Wish List</Link></Menu.Item>
          <Menu.Item key="transactions"><Link to = {{pathname:'/user/'+header.uuid, query : { key:"3" }}}>My Transactions</Link></Menu.Item>
          <Divider/>
          <Menu.Item key="logout" danger onClick = {onLogout}>Log out</Menu.Item>
        </Menu>
      );

    return (
        <header className = "header">
            <a href="http://localhost:3000/map">
                <img src="https://i.ibb.co/k3rqzWb/Petpal-logo.png" alt="Petpal-logo" border="0" width={180}/>
            </a>
            {
                header.name === undefined ?
                    <span className = "header-btns">
                        <Tooltip title = "Post now!">
                             <Button danger shape="circle" icon={<FormOutlined />}
                                     onClick={() => isLogin ?
                                         window.location.href="/post":
                                         showLoginRequiredModal("Please login to post new animal")}/>
                        </Tooltip>
                        <Button type = "link" className = "header-btn" href = "/login">Log in</Button>
                        <Button className = "header-btn" type = 'primary' href = "/register">Sign up</Button>
                    </span>
                :
                    <span className = "header-btns">
                        
                        <Tooltip title = "Post now!">
                            <Button danger shape="circle" icon={<FormOutlined />} href = "/post"/>
                        </Tooltip>
                        <Button bo style = {{marginLeft:"1%", marginRight:"1%"}} shape="circle" icon={<CommentOutlined />} href = "/chat/"/>
                        <Dropdown
                        arrow = {true}
                            overlay = {optionsOnNameClick}
                            onVisibleChange = {onMenuVisibleChange}
                            visible = {optionsVisible}
                        >
                            <div>
                                <Avatar style = {{display:'inline-block'}} src = {header.avatar}/><DownOutlined/>
                            </div>
                        </Dropdown>
                    </span>
            }
        </header>
    );
};

export default Header;
