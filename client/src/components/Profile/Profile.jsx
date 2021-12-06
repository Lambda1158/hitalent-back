import React from 'react';
import Orders from './Orders/Orders';
import User from './User';
import Reviews from './Reviews/Reviews';
import Movements from './Movements/Movements';
import Qas from './QandA/QAs';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function Profile(){

    const user = useSelector((state) => state.index.user)
    console.log("user: ", user)
    return(

        <div className='flex w-full h-screen bg-semilight'>
        {
            user.length === 0 ? (<h1>No estas registrado, no podes acceder al perfil</h1>) : (
            <div className='flex flex-row'>
            <div className='w-96 mx-6 mt-6'>
                <sidebar className='w-1/4'>
                    <User />
                </sidebar>
            </div>
            <div className='flex flex-col mt-6 mx-6 w-3/6 space-y-4'>
                <section className='space-y-4'>
                    <section>
                        <h2 className='text-2xl font-medium pl-4'>Pedidos</h2>
                            <Orders />
                    </section>
                    <section>
                        <h2 className='text-2xl font-medium pl-4'>Reseñas</h2>
                            <Reviews />
                    </section>
                    <section>
                        <h2 className='text-2xl font-medium pl-4'>Movimientos</h2>
                            <Movements />
                    </section>
                    <section>
                        <h2 className='text-2xl font-medium pl-4'>Preguntas</h2>
                            <Qas />
                    </section>
                </section>
                <div className='flex justify-center'>
                    <Link to="/home">
                        <button className="btn-custom btn-colors">Volver</button>
                    </Link>
                </div>
            </div>
            </div>
            ) 
        }
        </div>
    )
}