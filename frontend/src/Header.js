import React from 'react';
import {Button} from 'antd';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <header className = "header">
            <img src="https://i.ibb.co/2P6p00f/Petpal-logo.png" alt="Petpal-logo" border="0" width={200}/>
            <span className = "header-btns">
                <Link className = "header-btn">Log in</Link>
                <Button className = "header-btn" type = 'primary'>Sign up</Button>
            </span>
        </header>
    );
};

export default Header;