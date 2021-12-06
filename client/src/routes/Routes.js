import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';
import { login } from '../actions/auth';
// import { Private } from './Private';
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import Validate from '../components/Register/Validate';
import Register from '../components/Register/Register';
import TalentForm from '../components/Talents/TalentForm';
import SeeMore from '../components/SeeMore/SeeMore';
import Profile from '../components/Profile/Profile';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import EmailResetPassword from '../components/ResetPassword/EmailResetPassword';


export const Rout = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    },[dispatch, checking, isLoggedIn]);

    if(checking) {
        return <h3>Cargando...</h3>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Landing />} />
                <Route exact path="/ResetPassword" element={<ResetPassword />} />
                {/* <Route exact path="/NewPassword" element={<NewPassword />} /> */}
                <Route path="/createTalent" element={<TalentForm />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/user/confirm/:token' element={<Validate />} />
                <Route exact path='/register' element={<Register />} />
                <Route path='/user/emailresetpassword' element={<EmailResetPassword />} />
                <Route path='/user/resetpassword' element={<ResetPassword />} />
                <Route path='/home' element={<Home
                    // <Route 
                    // element = {(props) =>
                    // isLoggedIn ? <Home /> : <Navigate to='/' />
                    // }
                />
                }
                />
                <Route path="/talent/:id" element={<SeeMore/>} />
                {/* <ProtectedRoute isLoggedIn={isLoggedIn} path='/home' element={<Home />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

