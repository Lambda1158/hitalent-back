import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovebyId } from '../../../actions/index';

export default function Movements(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const movement = useSelector((state) => state.index.movement)
    
    useEffect(() => {
        dispatch(getMovebyId(id));
    },[dispatch, id])

    return (
        <div className='flex flex-col items-center bg-dark border-2 text-white border-white rounded-lg w-11/12 py-4'>
            <div className='flex flex-row justify-around bg-dark border border-dark w-11/12 h-auto space-x-6 mb-2'>
                <span>Acción</span><span>Usuario</span><span>Talento</span><span>Fecha</span><span>Monto</span>
            </div>
            <div className='flex flex-row justify-around items-center bg-semidark border border-white w-11/12 h-auto m-1'>
                <span>{movement.type}</span>
                <span>{movement.username}</span>
                <span>{movement.talent}</span>
                <span>{movement.date}</span>
                <span>${movement.amount}</span>
            </div>
        </div>
    )
}