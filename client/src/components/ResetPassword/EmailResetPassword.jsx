import React from 'react';
import { PROXY } from '../../actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EmailResetPassword(){
    const [input, setInput] = useState('');

    function sendEmailPass(input){
        axios.post(`${PROXY}/user/emailResetPassword`, input)
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleOnSubmit(e){
        e.preventDefault();
        sendEmailPass()
    }

    return(
        <div className='flex bg-semidark justify-center items-center w-screen h-screen text-white' >
            <div className='flex flex-col items-center bg-opacity-40 min-h-full space-y-4 pt-20 pb-10 pl-8 pr-8'>
                <h1 className='max-w-xs text-center text-3xl mb-6'>Restablecer contraseña</h1>
                <div className='flex flex-col justify-center items-center'>
                    <form className='flex flex-col items-center space-y-6 mb-6' onSubmit={(e) => handleOnSubmit(e)}>
                        <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Introduce tu correo electrónico' type='email' value={input.email} name='email' onChange={(e) => handleChange(e)} required/>
                        <button type='submit' className='btn-secondary btn-colors'>Enviar correo</button>
                    </form>
                    <Link to='/'><button className='items-center btn-secondary btn-colors'>Regresar 🔙</button></Link>
                </div>
            </div>
        </div>
    )
}