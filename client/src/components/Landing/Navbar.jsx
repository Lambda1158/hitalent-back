import React from "react";
import { Link } from "react-router-dom";


export default function Navbar({ onModalClick, onModaleClick }) {

    return (
        <nav class="bg-semidark place-content-center items-center">
        <div class="flex justify-between">
            <Link to='/'>
            <img src="https://www.vectorlogo.zone/logos/trayio/trayio-ar21.svg" alt="logo hitalent" />
            </Link>
            <div>
                <button onClick={onModalClick} class="m-4 font-semibold">Ingreso</button>
                <button  onClick={onModaleClick} class="m-2 bg-transparent hover:bg-semilight  font-semibold hover:text-black py-2 px-4 border border-dark hover:border-semilight rounded p-0">Registro</button>
            </div>
        </div>
        </nav>
    )
}