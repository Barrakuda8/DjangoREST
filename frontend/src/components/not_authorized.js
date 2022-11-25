import React from 'react';
import {Link} from 'react-router-dom';


const NotAuthorized = () => {
    return (
        <Link to={'/login'}>Please login to see this page</Link>
    )
}

export default NotAuthorized;