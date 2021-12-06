import { useDispatch } from 'react-redux';
import { startGoogleAuth, startGoogleLogout, startFacebookAuth, startFacebookLogout } from '../../actions/auth';

const Login = () => {
    const dispatch = useDispatch();

    const handleGoogleAuth = () => {
        dispatch(startGoogleAuth());
    }

    const handleLogout = () => {
        dispatch(startGoogleLogout());
        dispatch(startFacebookLogout());
    }

    const handleFacebookAuth = () => {
        dispatch(startFacebookAuth());
    }

    return(
        <div className='flex flex-col space-y-4'>
            <button className='btn-social' onClick={handleGoogleAuth}><img className='w-7 h-7 m-2' alt='Google logo'  src='http://codes.unidepix.com/img/google.svg'/>Inicia sesión con Google</button>
            <button className='btn-social' onClick={handleFacebookAuth}><img className='w-7 h-7 m-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/>Inicia sesión con Facebook</button>
            <button className='btn-custom btn-colors' onClick={handleLogout}>Cerrar sesión</button>
        </div>
    )
}

export default Login;