import { useReducer } from 'react';
import UserContext from './user-context';
import { googleLogout } from '@react-oauth/google';

const defaultUserState = {
    isLoggedIn: false,
    via: 'google' || 'email',
};

const userReducer = (state, action) => {
    if(action.type === 'LOGIN'){
        if(action.via === 'email'){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userToken', action.token);
        };
        return {
            isLoggedIn: true,
            via: action.via
        }
    };

    if(action.type === 'LOGOUT'){
        if(state.via === 'google'){
            googleLogout();
        };

        if(state.via === 'email'){
            localStorage.clear();
        };

        return {
            isLoggedIn: false,
            via: action.via
        }
    };
}

const UserProvider = (props) => {
    const [auth, dispatchUser] = useReducer(userReducer, defaultUserState);
    const userLoginHandler = (via, userToken) => {
        dispatchUser({type: "LOGIN", via: via, token: userToken});
    };

    const userLogoutHandler = (via) =>{
        dispatchUser({type: "LOGOUT", via: via})
    };

    return <UserContext.Provider value={{
        isLoggedIn: auth.isLoggedIn,
        via: auth.via,
        userLogin: userLoginHandler,
        userLogout: userLogoutHandler
    }}>
        {props.children}
    </UserContext.Provider>
};

export default UserProvider;