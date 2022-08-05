import React, { Fragment, useContext } from "react";
//Components
import HeaderCartButton from "./HeaderCartButton";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../../data/user-context";
//Assets
import mealImage from '../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
    const navigation = useNavigate();
    const ctx = useContext(UserContext);
    const logoutClickHandler = (e) => {
        e.preventDefault();
        ctx.userLogout();
        navigation('/login', {replace: true})
    };

    return <Fragment>
        <header className={classes.header}>
            <Link to='/'><b>React Meals</b></Link>
            <div className={classes.navLink}>
                <li><Link to='/orders'>Orders</Link></li>
                <li><p onClick={logoutClickHandler}>Logout</p></li>
            </div>
            <HeaderCartButton onOpenCloseModal={props.onOpenCloseModal} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt="Table full of delicious food" />
        </div>
    </Fragment>
};

export default Header;