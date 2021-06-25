import React from 'react';

export const LogContext = React.createContext({
    LogName: null,
    setLogName : () => {},
    LogAvatar: null,
    setLogAvatar : () => {}
})