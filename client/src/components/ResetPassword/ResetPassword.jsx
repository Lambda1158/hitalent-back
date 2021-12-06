import React from 'react';
import { PROXY } from '../../actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword(){

const [input, setInput] = useState({
        password: '',
        password2: ''
})

function reset(){
    resetPassword();
    alert('¡La contraseña ha sido cambiada exitosamente')
    setInput({
        password: '',
        password2: ''
    })
}

function resetPassword(input){
    axios.put(`${PROXY}/user/editPassword`, input)
}

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
}

function passCheck(a, b){
    a === b ? 
    reset() : 
    alert("Las contraseñas deben ser exactamente iguales")
}

function handleOnSubmit(e){
    e.preventDefault();
    passCheck(input.password, input.password2)
}

    return(
        <div className='flex bg-semidark justify-center items-center w-screen h-screen text-white' >
            <div className='flex flex-col items-center bg-opacity-40 min-h-full pt-20 pb-10 pl-8 pr-8'>
                <h1 className='max-w-xs text-center text-3xl mb-10'>Restablecer contraseña</h1>
                <form className='flex flex-col items-center space-y-6 mb-6' onSubmit={(e) => handleOnSubmit(e)}>
                    <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Introduce la nueva contraseña' type='text' value={input.password} name='password' onChange={(e) => handleChange(e)} required/>
                    <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Repite la nueva contraseña' type='text' value={input.password2} name='password2' onChange={(e) => handleChange(e)} required/>
                    <button type='submit' className='items-center btn-tertiary btn-colors'>Restablecer contraseña</button>
                </form>
                <Link to='/'><button className='items-center btn-secondary btn-colors '>Regresar 🔙</button></Link>
            </div>
        </div>
    )
}