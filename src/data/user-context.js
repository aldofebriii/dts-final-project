import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    via: 'google' || 'email',
    userLogin: (via, userToken) => {},
    userLogout: (via) => {}
});

export default UserContext;