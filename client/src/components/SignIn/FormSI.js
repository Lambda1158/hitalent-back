import React, { useState } from "react";
import { PROXY } from '../../actions';
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { useDispatch } from "react-redux";
import { startFacebookAuth, startGoogleAuth } from '../../actions/auth';
import axios from 'axios';
import { cargarUsuario } from '../../actions/index';
import {useNavigate } from "react-router-dom";

function Form({ onModalClick, onModalChange }){

    let dispatch = useDispatch()
    let navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        username : "",
        password : "",
        mantenerSesion: false
    })

    const [state, setState] = useState({
        type : 'password',
        button : 'mostrar'

  });

function handleOnChange(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    e.preventDefault();
    state.type === "password"
      ? setState({ type: "text", button: "ocultar" })
      : setState({ type: "password", button: "mostrar" });
  }
  
  function handleSession(e) {
    setUserLogin({
      ...userLogin,
      mantenerSesion: !userLogin.mantenerSesion,
    });
  }

  const [modalIsOpen, setIsOpen] = useState(true);

  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  const handleFacebookAuth = () => {
    dispatch(startFacebookAuth());
  };

    async function handleOnSubmit(e){
        e.preventDefault();     
        let respuesta = await axios.post(`${PROXY}/user/loggin/`,userLogin)
        .then(res => res.data)
        switch(respuesta){
            case "Contraseña incorrecta":
                return(alert("Contraseña Incorrecta"))
            case "Email incorrecto":
                return(alert("Email incorrecto"))
            case "Password incorrecto":
                return(alert("Contraseña Erronea"))
            case "Usuario incorrecto":
                return(alert("Usuario incorrecto"))
            default:
                dispatch(cargarUsuario(respuesta))
                setIsOpen(false)
                navigate("/home");
        }
    }

    return(
        <ReactModal 
            isOpen={modalIsOpen}
            onRequestClose={onModalClick}
            contentLabel="Example Modal"
            className=" absolute m-auto max-w-max inset-x-0 top-40 bg-dark border-2 border-white rounded-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-90">
            <div className="flex h-96 items-center flex-col bg-semidark bg-opacity-40 text-white w-96 space-y-4">
                <h2 className="text-3xl my-2 font-semibold">Iniciar sesion</h2>
                <form className="text-center space-y-4" onSubmit={e => handleOnSubmit(e)}>
                    <div className='flex flex-col space-y-4'>
                        <div className='w-full rounded'>
                        <input name="username" 
                        type="text"  
                        placeholder="Usuario / Email" 
                        onChange={e => handleOnChange(e)} 
                        required
                        className="h-8 w-11/12 bg-semidark bg-opacity-0 border-b-2 focus:outline-none placeholder-white"
                        />
                        </div>
                        <div className='w-full rounded'>
                            <input name="password" 
                            type={state.type} 
                            placeholder="Contraseña" 
                            onChange={e => handleOnChange(e)} 
                            required
                            className="h-8 w-4/5 bg-semidark bg-opacity-0 border-b-2 focus:outline-none placeholder-white"
                            />
                            <button className='border-b-2 border-white'onClick={e => handleChange(e)}>
                            { state.type === 'password' ? <Visibility/> : <VisibilityOff/>}
                            </button>
                            <br/>
                              
                        </div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <label>Recuérdame</label>
                        <input className='ml-2' onChange={handleSession} value="" type="checkbox"/>
                        <Link to="/passwordRecovery" className="ml-14">Olvide mi contraseña</Link>
                    </div>
                    <div className='flex'>
                        <button className='btn-custom btn-colors mb-2 mr-2'>Ingresar</button>
                        <button onClick={onModalClick} className="btn-custom btn-colors ml-2">Cancelar</button>
                    </div>
                </form>
                <div className='flex flex-col space-y-4'>
                    <button className='btn-social' onClick={handleGoogleAuth}><img className='w-7 h-7 mr-2' alt='Google logo'  src='http://codes.unidepix.com/img/google.svg'/>Inicia sesión con Google</button>
                    <button className='btn-social' onClick={handleFacebookAuth}><img className='w-7 h-7 mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/>Inicia sesión con Facebook</button>
                </div>
                <div className='flex justify-center content-center items-center m-4'>
                    <p className='text-sm mr-2'>¿No tienes cuenta?</p><button onClick={onModalChange} className='text-1xl font-semibold'>¡Registrate ahora!</button>
                </div>
      </div>
    </ReactModal>
  );
}

export default Form;
