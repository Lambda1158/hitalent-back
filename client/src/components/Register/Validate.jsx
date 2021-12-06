import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserbyToken } from '../../actions/index';
import { useParams, Link } from 'react-router-dom';

export default function Validate(){
    const { token } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserbyToken(token))
    }, [dispatch, token])


    return(
        <div className='flex bg-semidark justify-center items-center w-screen h-screen text-white' >
            <div className='flex flex-col items-center bg-opacity-40 min-h-full pt-20 pb-10 pl-8 pr-8'>
                <h1 className='max-w-xs text-center text-3xl mb-6'>¡Éxito! <br /> Tu correo electrónico ha sido validado</h1>
                <Link to='/home'><button className='items-center btn-secondary btn-colors '>Regresar 🔙</button></Link>
            </div>
        </div>
    )
}