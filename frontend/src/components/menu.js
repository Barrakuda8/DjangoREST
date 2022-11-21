import React from 'react';
import {Link} from 'react-router-dom';

const MenuLink = ({link}) => {
    return (
        <Link to={link[1]} class='menu_link'>{link[0]}</Link>
    )
}

const Menu = ({links}) => {
    return (
        <div class='menu_background'>
            <div class='menu_block container'>
                {links.map((link) => <MenuLink link={link} />)}
            </div>
        </div>
    )
}

export default Menu;