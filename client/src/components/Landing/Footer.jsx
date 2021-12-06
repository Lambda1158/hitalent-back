import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer class="grid grid-cols-3 bg-semidark">
            <div class="grid col-start-1 col-end-2 m-3">
                <img src="https://www.vectorlogo.zone/logos/trayio/trayio-ar21.svg" alt="logo hitalent" />
                <small>
                    En nuestra plataforma puedes conectar con personas que esten interesadas en compartir su talento contigo, podras aprender lo que quieras en solo un click. Deja tu valoracion para que ellos puedan ganar prestigio!
                </small>
            </div>
            <div class="grid col-start-2 col-end-3 m-3">
                <h4 class="font-semibold">Links</h4>
                <ul>
                    <Link to='/home'>
                    <li>Home</li>
                    </Link>
                    <Link to='/faq'>
                    <li>Preguntas frecuentes</li>
                    </Link>
                    <li>Privacy Policy</li>
                    <li>Corporate</li>
                </ul>
            </div>
            <div class="grid col-start-3 col-end-4 m-3">
                <h4 class="font-semibold">Social media</h4>
                <ul class="flex">
                    <li class="m-3"><a href="https://www.facebook.com/"><img class="h-5" src="https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg" alt="facebook-logo" /></a></li>
                    <li class="m-3"><a href="https://www.instagram.com/"><img class="h-5" src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg" alt="instagram-logo" /></a></li>
                    <li class="m-3"><a href="https://www.linkedin.com/"><img class="h-5" src="https://www.vectorlogo.zone/logos/linkedin/linkedin-tile.svg" alt="linkedin-logo"/></a></li>
                </ul>
            </div>
            <article class="grid col-start-2 col-end-3 m-3 font-semibold">
            &copy; 2021 HiTalent. Todos los derechos reservados
            </article>
        </footer>
    )
}