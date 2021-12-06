import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <nav class="bg-semidark">
            <div class="flex justify-between items-center">
                <Link to='/home'>
                <img  src="https://www.vectorlogo.zone/logos/trayio/trayio-ar21.svg" alt="logo hitalent" />
                </Link>
            </div>
        </nav>
    )
}

export default NavBar