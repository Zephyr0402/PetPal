import {ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";
import {Modal} from 'antd';

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
