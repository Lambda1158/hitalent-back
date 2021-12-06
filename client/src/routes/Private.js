import { Component } from 'react';
import { Route, Navigate } from 'react-router-dom';

export const Private = ({ isLoggedIn, Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            component = {(props) =>
            isLoggedIn ? <Component {...props} /> : <Navigate to='/login' />
            }
        />
    );
};

