import React from "react";
import VideoLanding from '../../assets/videolanding.mp4'

export default function Beneficios() {
    return (
        <div class="flex flex-wrap justify-center content-around items-center bg-light h-96 flex-col p-3">
            <h3 class="font-semibold text-2xl">¿Que puedes encontrar?</h3>
            <br/>
            <div class="flex">
                <ul>
                    <li>
                        <h4 class="font-semibold">Lo mejor en cada compra.</h4>
                        Encuentra servicios de la mejor calidad al mejor precio. Sin precio por hora, paga por la experiencia completa.
                    </li>
                    <br/>
                    <li>
                        <h4 class="font-semibold">Encuentra calidad rápidamente.</h4>
                        Busca el talento que quieras, encuentra el correcto para aprenderlo al momento.
                    </li>
                    <br/>
                    <li>
                        <h4 class="font-semibold">Protejemos tus pagos, siempre.</h4>
                        Tus datos estan seguros, puedes comprar todo sin riesgos.
                    </li>
                </ul>
            </div>
            <div class="flex justify-end ">
            <video class="flex h-72 flex-wrap" autoPlay loop muted>
                <source src={VideoLanding} type="video/mp4"/>
            </video>
            </div>
        </div>
    )
}