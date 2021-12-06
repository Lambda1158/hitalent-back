import React from 'react';
import { useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderbyId } from '../../../actions';

export default function Orders(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.index.order)
    
    useEffect(() => {
        dispatch(getOrderbyId(id));
    },[dispatch, id])

    return(
        <div className='flex flex-col justify-center bg-dark border-2 text-white border-white rounded-lg w-11/12 py-4'>
            <div className='flex flex-col items-center py-2'>
                    <section className='flex flex-row justify-around items-center bg-semidark border border-white w-11/12 h-12 m-1'>
                    <span>{order.username}</span>
                    <span>{order.talent}</span>
                    <Link to='/order'><button className='btn-primary btn-colors'>Ver pedido</button></Link>
                    <Link to='/order'><button className='btn-primary btn-colors'>Comunicate</button></Link>
                </section>
            </div>
        </div>
    )
}