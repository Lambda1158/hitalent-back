import React, { useEffect, useState } from 'react';
import { PROXY } from '../../actions';
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions';
import {useNavigate } from "react-router-dom";
import NavBar from './BarraNav/NavBar';
import Footer from '../Landing/Footer';

function TalentForm(){

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let usuario = useSelector(state => state.index.user.username);
    let categories = useSelector(state => state.index.categories)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    
    const [file, setFile]=useState(null)
    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "", 
        cost: "", 
        category: ""
    })

    //! VER EL PATH
    const [ventanaModal, setVentanaModal] = useState(false)
    

    function handleOnChange(e){
        if(e.target.name === "image"){
            console.log("IMAGEN",e.target.value)
            setFile(e.target.files[0])
        }
        else{
            setForm({
                ...form,
                [e.target.name] :  e.target.value
            })
        }
    }

    const handleOnSelect = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            category : e.target.value
        })
    }

    let filteredCategories = categories.filter(el => el.title !== form.category)
        
    const onSubmit = (e) => {
        e.preventDefault();
        setVentanaModal(true)
    }
    const changeModal = (e) => {
        e.preventDefault();
        setVentanaModal(!ventanaModal)
    }
    
    function onSubmitForm(e){
        e.preventDefault()
        let fb= new FormData()
        fb.append("username", usuario)
        fb.append("title",form.title)
        fb.append("description",form.description)
        fb.append("duration",form.duration)
        fb.append("cost",form.cost)
        fb.append("image",file)
        fb.append("category",form.category)
        axios({
            method: "post",
            url: `${PROXY}/post`,
            data: fb,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => console.log(res))
        .catch(err => console.log(err));
          alert("Curso creado satisfactoriamente")
          navigate("/home");
    }
    
    return(
        <div className='box-border w-full h-screen'>
            <NavBar/>
            <h1 className="flex justify-center bg-semilight text-dark text-4xl font-semibold py-8" >¡Crea un nuevo curso en base a tu talento!</h1>
            <div className='flex flex-row justify-center bg-semilight py-auto'>
                <div className='flex justify-center bg-semilight text-white'>
                    <form onSubmit={e => onSubmit(e)} className='grid grid-cols-2 gap-x-16 w-auto h-auto bg-semidark p-4 border-white border-2 rounded mb-32' >
                            <div className='flex flex-col space-y-2'>
                            <h1 className='font-semibold text-2xl'>Datos generales</h1>
                            <label className='text-lg'>Nombre del curso:</label>
                            <input 
                            className="w-full text-lg justify-self-center self-center border-2 rounded-md text-white placeholder-white border-white border-opacity-70 text-center bg-dark"
                            onChange={handleOnChange} 
                            type="text" 
                            name="title"  
                            placeholder="Nombre curso" 
                            required
                            />
                            <label class="text-lg" >Descripcion:</label>
                            <textarea 
                                onChange={handleOnChange} 
                                className="resize-none overflow-y-auto justify-self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 text-center p-8"  
                                name="description" 
                                rows="8" cols="25"  
                                placeholder="Ingrese la descripcion del curso" 
                                required
                                />
                        </div>
                    <div>
                        <div className='flex flex-col space-y-2'>
                            <h1 className='text-lg'>Imagenes de tu talento:</h1>
                            <label
                                class="
                                w-full
                                flex flex-col
                                items-center
                                px-4
                                py-2
                                bg-dark
                                rounded-md
                                shadow-md
                                tracking-wide
                                uppercase 
                                border-2
                                cursor-pointer
                                hover:bg-semidark hover:text-white
                                text-light
                                ease-linear
                                transition-all
                                duration-150
                                "
                            >
                            <span>🗂</span>
                            <span class="mt-2 text-base leading-normal">Selecciona una imagen</span>
                            <input className="hidden" 
                                onChange={handleOnChange} 
                                type="file" 
                                name="image"
                                required />
                            </label>
                            <h1 className='text-lg'>Categoría:</h1>
                            <select 
                            className="h-12 w-full pl-2 justify-center bg-dark rounded text-white border-2"
                            onChange={e => handleOnSelect(e)}
                            >
                            <option>Selecciona una categoria</option>
                                {
                                    !categories ? 
                                    <option>Cargando</option> : 
                                    (categories.map(el => {
                                        return(
                                            <option key={el.id}
                                            name="category">
                                            {el.title}
                                            </option>
                                        )
                                    }))
                                }
                            </select>
                        
                        <label className='text-lg'>Duracion:</label>  
                        <input 
                            className="h-8 w-full justify-self-center self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 px-3"
                            onChange={handleOnChange} 
                            type="number" 
                            name="duration"  
                            placeholder="Horas"
                            required
                            />
                        
                        {/* <div className="grid col-start-3 col-end-5 border border-purple">
                            <img src="image(1).png" alt="portada" />
                            <label class="" >Seleccione su imagen:</label>
                            <input 
                            className="bg-dark text-white justify-self-center " 
                            onChange={handleOnChange} 
                            type="file" 
                            name="image"
                            required
                            />
                        </div> */}
                            <h1>Precio:</h1>
                            <input 
                                className=" h-8 border-2 rounded-md border-white border-opacity-70 bg-dark placeholder-white text-white px-3"
                                onChange={handleOnChange} 
                                type="number" 
                                name="cost"  
                                placeholder="Dólares"
                                required
                                />
                        </div>
                        <div className='flex flex-row items-center justify-center space-x-4 my-8'>
                            <button className="btn-primary btn-colors"> Revisar </button>
                            <Link to="/home">
                            <button className="btn-primary btn-colors"> Volver </button>
                            </Link>
                        </div>
                        { !ventanaModal ? console.log("") : 
                        (<ReactModal
                            isOpen={ventanaModal}
                            onRequestClose={changeModal}
                            contentLabel="Example Modal"
                            className=" absolute m-auto w-1/2 inset-x-0 bg-semilight border-2 border-white rounded-lg"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-90"
                        >
                            <div className='flex justify-center items-center text-dark bg-semilight text-4xl font-semibold mt-6'>
                                <h1>Por favor, revisa la información antes de enviarla</h1>
                            </div>
                            <div className='grid grid-cols-2 items-baseline justify-items-end bg-semilight'>
                                <div className='flex flex-col text-2xl font-semibold text-white bg-dark'>
                                    <h1>Título:</h1>
                                    <h1 className='mt-5'>Descripción:</h1>
                                    <h1 className='mt-48'>Categoría:</h1>
                                    <h1 className='mt-4'>Duración:</h1>
                                    <h1 className='mt-4 mb-6'>Precio:</h1>
                                </div>
                                <div className="bg-semilight min-h-screen min-w-full flex justify-center flex-col">
                                    <form onSubmit={e => onSubmitForm(e)} className="flex flex-col bg-dark text-white space-y-6 w-80 ">
                                        <input 
                                            className='bg-dark text-white text-2xl'
                                            onChange={handleOnChange} 
                                            type="text" 
                                            name="title"  
                                            value={form.title}
                                            placeholder="Nombre curso" 
                                        />
                                        <textarea 
                                            onChange={handleOnChange} 
                                            className="bg-dark" 
                                            name="description" 
                                            rows="8" cols="25"  
                                            value={form.description}
                                            placeholder="Ingrese la descripcion del curso" 
                                        />  
                                        <select className='bg-dark text-lg' onChange={e => handleOnSelect(e)}>
                                        {
                                            form.category ? <option>{form.category}</option>
                                            : <option>Selecciona una categoria</option>}
                                        {
                                            !filteredCategories ? 
                                            <option>Cargando</option> : 
                                            (filteredCategories.map(el => {
                                                return(
                                                    <option key={el.id}
                                                    name="category">
                                                    {el.title}
                                                    </option>
                                                )
                                            }))
                                        }
                                        </select>
                                        <input 
                                            className='bg-dark'
                                            onChange={handleOnChange} 
                                            type="number" 
                                            name="duration"  
                                            value={form.duration}
                                            placeholder="Duracion | Horas"
                                        />
                                        <input 
                                            className='bg-dark'
                                            onChange={handleOnChange} 
                                            type="number" 
                                            name="cost"  
                                            value={form.cost}
                                            placeholder="Precio | Dolares"
                                        />
                                        <input 
                                            onChange={handleOnChange} 
                                            className="bg-dark hidden" 
                                            name="image"  
                                            type="file" 
                                            placeholder="Arrastra aqui tus imagenes"
                                            accept="image/*,.pdf"
                                            multiple
                                        />
                                        <div className='bg-semilight flex flex-row justify-center items-center py-2'>
                                            <button className='btn-primary btn-colors mx-2'>Crear curso</button>
                                            <Link to="/home">
                                                <button className='btn-primary btn-colors '>Cancelar</button>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </ReactModal>)
                        }
                    </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default TalentForm;