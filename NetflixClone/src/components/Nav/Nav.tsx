import './Nav.css'
import { useEffect, useState } from 'react';

const Nav = () => {
    const [show, handleShow] = useState(false);

    const navHeaderShow = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else handleShow(false);
        return () => {
            window.removeEventListener("scroll", navHeaderShow);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", navHeaderShow)
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />

            <img className="nav__avatar"
                src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                alt="Netflix Profile Image"
            />
        </div>
    )
}

export default Nav;