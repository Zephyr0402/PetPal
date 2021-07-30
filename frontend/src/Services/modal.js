import {ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";
import {Modal, message} from 'antd';

const { confirm } = Modal;

export const showLoginRequiredModal = (text) => {
    confirm({
        title: text,
        icon: <ExclamationCircleOutlined />,
        onOk() {
            window.location.href="/login";
        },
        okText: 'Login',
        cancelText: 'Cancel',
    });
};


export const displaySuccessMessage = (text, duration) => {
    message.success(text, duration);
};


export const displayErrorMessage = (text, duration) => {
    message.error(text, duration);
};
