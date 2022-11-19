import React from 'react';

const MenuLink = ({link}) => {
    return (
        <a class='menu_link' href={link[1]}>{link[0]}</a>
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