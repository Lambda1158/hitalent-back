import React from 'react';
import { PROXY } from '../../actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { startGoogleAuth, startFacebookAuth } from '../../actions/auth';
import ReactModal from 'react-modal';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import axios from 'axios';

export default function Register({ onModaleClick, onModalChange }) {

const dispatch = useDispatch();

const [modalIsOpen, setIsOpen] = useState(true);
const [state, setState] = useState({
    type : 'password',
    button : 'mostrar'
});

const [input, setInput] = useState ({
    name: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    birthdate: ''
});

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
}

function handleOnChange(e){
    e.preventDefault();
    state.type === 'password' ? 
    setState({type : 'text', button: 'ocultar'}) :
    setState({type : 'password', button: 'mostrar'})
}

let regexMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
let regexUsername = /^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
let fecha = input.birthdate.split("-")

function createPass(){
    if(!regexMail.test(input.email)) alert("Ingrese un mail valido")
    else if(!regexUsername.test(input.username)) alert("Usuario: No puede tener _ ni al principio ni al final, no puede tener __ ni _. dentro y debe tener entre 4-16 caracteres")
    else if(!regexPw.test(input.password)) alert("Ingrese una contraseña valida. Debe contener 1 Mayuscula, 1 numero y 8-16 caracteres")
    else if(fecha[0]<1920 || fecha[0]>2018) alert("Ingrese un año valido, entre 1920 y 2018")
    else{
        createUser(input)
        alert('¡El usuario ha sido creado correctamente!')
        setInput({
            name: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            password2: "",
            birthdate: ''
        })
        setIsOpen(false)
    }
}

function createUser(input){
    axios.post(`${PROXY}/user`, input)
}

function passCheck(a, b){
    a === b ? 
    createPass() : 
    alert("Las contraseñas no coinciden")
}

function handleOnSubmit(e){
    e.preventDefault();
    passCheck(input.password, input.password2)
}

const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
}

const handleFacebookAuth = () => {
    dispatch(startFacebookAuth());
}


    return(
        <ReactModal 
            isOpen={modalIsOpen}
            onRequestClose={onModaleClick}
            contentLabel="Example Modal"
            className="absolute m-auto max-w-max inset-x-0.5 top-14 bg-semidark border rounded-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-90">
        <div className='flex justify-around bg-dark items-center w-screen text-white m-auto max-w-max inset-16 border border-dark rounded-lg'>
            <div className='flex flex-col bg-semidark bg-opacity-40 border-white border-2 rounded-lg w-80 p-8'>
                <h2 className='flex text-3xl font-extrabold mb-2'>Registro</h2>
                    <form className='flex flex-col space-y-2 mb-6' onSubmit={(e) => handleOnSubmit(e)}>
                        <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} required/>
                        <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Apellido' type='text' value={input.lastName} name='lastName' onChange={(e) => handleChange(e)} required/>
                        <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Correo electrónico' type='email' value={input.email} name='email' onChange={(e) => handleChange(e)} required/>
                        <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Nombre de usuario' type='text' value={input.username} name='username' onChange={(e) => handleChange(e)} required/>
                        <div className='flex flex-col'>
                            <div className='flex'>
                                <input className='h-4 py-5 border-b-2 bg-semidark w-11/12 bg-opacity-0 border-white outline-none placeholder-white' placeholder='Contraseña' type={state.type} value={input.password} name='password' onChange={(e) => handleChange(e)} required/><button className='border-b-2 border-white'onClick={e => handleOnChange(e)}>{ state.type === 'password' ? <Visibility/> : <VisibilityOff/>}</button>
                            </div>
                            <input className='h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white' placeholder='Repite la contraseña' type={state.type} value={input.password2} name='password2' onChange={(e) => handleChange(e)} required/>
                        </div>
                        <div className='flex flex-col'>
                            <label className='mt-2'>Fecha de Nacimiento</label>
                            <input className='bg-semidark text-center hover:bg-dark transition duration-300 ease-in-out rounded-lg' type='date' value={input.birthdate} name='birthdate' onChange={(e) => handleChange(e)} required/>
                        </div>
                <div className='flex justify-center m-2'>
                    <button className='btn-custom btn-colors' type='submit'>Registrarme</button>
                </div>      
                    </form>
                <div className=''>
                    <button className='btn-social' onClick={handleGoogleAuth}><img className='w-7 h-5 m-2' alt='Google logo'  src='http://codes.unidepix.com/img/google.svg'/>Inicia sesión con Google</button>
                    <button className='btn-social' onClick={handleFacebookAuth}><img className='w-7 h-5 m-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/>Inicia sesión con Facebook</button>
                </div>  
                <div className='flex justify-center content-center items-center m-4'>
                    <p className='text-sm mr-2'>¿Ya tienes cuenta?</p><button onClick={onModalChange} className='text-1xl font-semibold'>Iniciar sesión</button>
                </div>
            </div>
        </div>
            </ReactModal>
    )

}