import classes  from './header.module.css';
import classNames from 'classnames/bind';
const Header = () => {
    return(
        <>
        <div className={classNames(classes.header, classes.background)}>
            <p>Countdown Timer Web Application 😊</p>
        </div>
        </>
    );
}

export default Header;