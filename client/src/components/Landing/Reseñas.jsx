import React from 'react';
import RESEÑAS from './MOCKUP';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Reseñas(){

    let positivas = RESEÑAS.filter(e=> e.user.calificacion > 1)

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "bg-semilight flex flex-row",
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        centerPadding: "0px"
      };

      return (
          <Slider {...settings}>
                {positivas.map(el => (
                    <div className="bg-semilight"> 
                        <h1 className=" text-center text-dark text-3xl font-semibold py-6">-{el.user.username}</h1>
                        <p className="text-center text-2xl font-light p-8">{el.user.reseña}</p>
                    </div>
                    )
                )}
          </Slider>

      );
    // return(
        // <div>
        //     {positivas.map(el => {
        //         return(
        //             <div className="flex">
        //                 <img className="max-h-64 w-md" alt='Imagenes sobre el curso' src={el.user.curso.imagen}/>
        //                 <div className="flex-row bg-dark text-center w-full">
        //                     <h1 className="text-white text-3xl font-semibold py-6">{el.user.username}</h1>
        //                     <p className="text-2xl font-light  p-8">{el.user.reseña}</p>
        //                 </div>
        //             </div>
        //         )
        //     })}
        // </div>
    // )
}

export default Reseñas;