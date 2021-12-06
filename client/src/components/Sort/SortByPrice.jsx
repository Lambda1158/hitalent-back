import React from "react";
import { sortByPrice } from "../../actions";
import { useDispatch } from 'react-redux'
import { ASCENDENTE, DESCENDENTE, RATING } from "../../const";

export const SortByPrice = () => {
    const dispatch = useDispatch()

    function onChange(e) {
        e.preventDefault()
        dispatch(sortByPrice(e.target.value))
    }

    return (
        <div>
            <label class='font-semibold'>Ordenar por </label>
            <select onChange={onChange}>
                <option value={RATING}>Mas relevante</option>
                <option value={DESCENDENTE}>Mayor precio</option>
                <option value={ASCENDENTE}>Menor precio</option>
            </select>
        </div>
    )
}