import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserbyId } from '../../actions';
import defaultImage from '../../assets/profile_default.png'

export default function Profile(){
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.index.profile)

    useEffect(() => {
        dispatch(getUserbyId(id));
    },[dispatch, id])


    return(
        <div>
        {!user ? (<h2>Cargando...</h2>) : (
        <div className='flex flex-col items-center py-10 px-8 bg-dark border-2 text-white border-white rounded-lg space-y-6'>
            <div>
                <img className='rounded-full border-4 border-semilight w-72' src={user.image? user.image : defaultImage} alt={user.username}/>
            </div>

            <div className='flex flex-col w-full'>
                <h4 className='text-2xl font-medium italic underline'>{user.fullName}</h4>
                <h5 className='text-xl text-gray'>{user.username}</h5>
            </div>
            {/* <div className='flex items-center w-full h-6 bg-dark border border-white rounded-md'>
                <div className='flex flex-row items-center h-5 w-9/12 bg-purple rounded-md'>
                    <div className='flex justify-center text-xs ml-2 font-medium'>
                        Nivel 5
                    </ div>
                </div>
            </div> */}
            <div>
                <p>Usuario desde: {user.createdAt}</p>
            </div>
            <div className='flex flex-col justify-start space-y-6'>
                <div>
                    <p>{user.country}</p>
                </div>
                <div>
                    <p>{user.id}</p>
                </div>
                <div>
                    <h5 className='font-medium'>Idiomas:</h5>
                    <p>Español 	&#127466;&#127480;, Inglés &#127482;&#127480;, Japonés &#127471;&#127477;</p>
                </div>
                <h5 className='font-medium'>Métodos financieros asociados:</h5>
                <div className='flex'>
                    <button><img className='h-6 bg-semilight rounded border-2 border-semilight mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/card.png'/></button>
                    <button><img className='h-6 bg-semilight rounded border-2 border-semilight mr-2' alt='Paypal logo' src='https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'/></button>
                    <button><img className='h-6 bg-semilight rounded border-2 border-semilight mr-2' alt='MercadoPago logo' src='http://codes.unidepix.com/img/mercadopago.png'/></button>    
                </div>
                    <h5 className='font-medium'>Redes sociales:</h5>
                <div>
                    <button><img className='w-7 h-7 mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/></button>
                    {/* {!user.social ? '' : (<button><img className='w-7 h-7 mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/></button>)} */}
                    <button><img className='w-7 h-7 mr-2' alt='Google logo' src='http://codes.unidepix.com/img/google.svg'/></button>
                </div>
            </div>
        </div>
        )}
        </div>
    )
}