import React, { Fragment } from "react";
//Components
import HeaderCartButton from "./HeaderCartButton";
import { Link } from 'react-router-dom';
//Assets
import mealImage from '../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <Link to='/'><b>React Meals</b></Link>
            <div className={classes.navLink}>
                <li><Link to='/orders'>Orders</Link></li>
                <li><Link to='/logout'>Logout</Link></li>
            </div>
            <HeaderCartButton onOpenCloseModal={props.onOpenCloseModal} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt="Table full of delicious food" />
        </div>
    </Fragment>
};

export default Header;