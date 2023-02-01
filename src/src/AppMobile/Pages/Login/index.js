import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { FormControl, OutlinedInput, TextField } from '@mui/material';
import validator from 'validator';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styled from '@emotion/styled';


const textFieldStyle = {
    borderRadius: '10px',
    color: 'grey'
}

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        backgroundColor: 'white',

        overflow: 'hidden',
        borderRadius: 4,
        '&:hover': {
            backgroundColor: 'white',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            borderRight: '2px solid  rgb(29,155,240)',
            borderLeft: '2px solid rgb(29,155,240)',
            borderTop: '2px solid  rgb(29,155,240)',
            borderColor: '1px solid rgb(29,155,240)',
        },
    },
}));

function LoginPage() {
    const [hidePassword, setHidePassword] = useState(true);

    const [text, setText] = useState('');
    const [isInNextPhaseOfLogin, setisInNextPhaseOfLogin] = useState(false);
    const [showDoesntExistsSnackbar, setShowDoesntExistsSnackbar] = useState(false);
    const [password, setPassword] = useState('');

    const closeHandler = () => {
        const destroyLoginCookie = async () => {
            try {
                const result = await axios.get('http://localhost:8082/cookies/destroy/login', { withCredentials: true });
                console.log(result);
            } catch (error) {
                
            }
        }
        destroyLoginCookie();
        setisInNextPhaseOfLogin(false);
    }

    const toggler = () => {
        if (hidePassword) setHidePassword(false);
        else setHidePassword(true);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const textHandler = (e) => {
        setText(e.target.value);
    }

    const showDoesntExistsSnackBarHandler = () => {

    }
    const handleDoesntExistsSnackbar = () => {
        setShowDoesntExistsSnackbar(false);
    }

    const getUserInDatabase = async () => {
        try {
            const payload = {};
            if (validator.isEmail(text)) {
                payload.email = text;
            }
            else {
                payload.username = text;
            }
            let response = await axios.post('http://localhost:8082/loggedOut/login', payload, { withCredentials: true });
            if (response) setisInNextPhaseOfLogin(true);
        } catch (error) {
            if (error.response.status === 404) {
                setShowDoesntExistsSnackbar(true);
            }
        }

    }
    const loginHandler = async () => {
        window.open(
            'http://localhost:8082/auth/google', "_self"
        )
    }
    return (

        isInNextPhaseOfLogin
            ? <div id='login-modal-m'>
                <div id='login2-modal-topM'>
                    <div id='login2-modal-leftM'>
                        <div className='login-modal-closeIcon-imgContainer'
                            onClick={closeHandler}
                        >
                            <img
                                src="https://thumbs4.imagebam.com/33/54/cd/MEHU3AO_t.png"
                                alt="close-icon"
                                width="20px"
                                height="20px"
                            />
                        </div>
                        <div className='twitter-bird-container'>
                            <div className='twitter-bird-left' onClick={() => {
                            }}>
                                <img className='twitter-bird' src='https://i.ibb.co/SQZP6HT/twitter-icon.png' width='28.3px' height='23px' />
                            </div>
                            <div className='twitter-bird-right'></div>
                        </div>
                    </div>
                </div>
                <div id='login2-modal-m-heading-container'>
                    <div id='login2-modal-m-heading'>Sign in to twitter</div>
                </div>
                <div id='login2-inputs-container'>
                    <TextField variant="standard" label={'Username'} sx={{ borderRadius: '5px', marginBottom: '25px', backgroundColor: 'rgb(239, 243, 244)', width: '100%' }} disabled={true} value={text} />
                    <RedditTextField
                        fullWidth
                        label="Password"
                        id="password-input"
                        variant="filled"
                        value={password}
                        onChange={passwordHandler}
                        type={hidePassword ? 'password' : 'text'}
                        InputProps={{
                            endAdornment: <img src='https://cdn-icons-png.flaticon.com/512/829/829117.png'
                                width='22px'
                                height='22px'
                                onClick={toggler} />
                        }}
                    />
                </div>
                <div id='login-m-forgot-password'>Forgot password?</div>
                <div id='login-m-btn-container' style={{ backgroundColor: !password.length ? 'rgb(15, 20, 25,0.4)' : 'rgb(15, 20, 25)' }}>Login</div>
            </div>
            : <div id='login-modal-m'>
                <div id='login-modal-topM'>
                    <div id='login-modal-leftM'>
                        <div className='login-modal-closeIcon-imgContainer'
                            onClick={closeHandler}
                        >
                            <img
                                src="https://thumbs4.imagebam.com/33/54/cd/MEHU3AO_t.png"
                                alt="close-icon"
                                width="20px"
                                height="20px"
                            />
                        </div>
                        <div className='twitter-bird-container'>
                            <div className='twitter-bird-left' onClick={() => {
                            }}>
                                <img className='twitter-bird' src='https://i.ibb.co/SQZP6HT/twitter-icon.png' width='28.3px' height='23px' />
                            </div>
                            <div className='twitter-bird-right'></div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div id='login-modal-m-heading'>Sign in to twitter</div>
                <div id='login-modal-googleOptionM'
                    onClick={loginHandler}
                >
                    <div id='login-modal-googleOption-imgContainer'>
                        <img src='https://cdn-icons-png.flaticon.com/512/300/300221.png' />
                    </div>
                    <div className='poppins' id='signInWithGoogleM'
                    >
                        Sign in with Google
                    </div>
                </div>
                <div className='orContainer'>
                    <div className='thinBox'>
                    </div>
                    <div style={{ marginLeft: '10px', marginRight: '10px', fontFamily: 'Poppins' }}>
                        or
                    </div>
                    <div className='thinBox'>
                    </div>
                </div>
                <div className='mt15'>
                    <TextField sx={textFieldStyle} value={text} onChange={textHandler} id="outlined-basic" label="Email or username" variant="outlined" />
                </div>
                <div className='loginBtnsContainer'
                    onClick={getUserInDatabase}
                >
                    <div className='loginNextBtn'>Next</div>
                </div>
                <div className='cancelBtnsContainer'>
                    <div className='cancelBtnContainer'>Cancel</div>
                </div>
                <div id='dontHaveAccountTextContainer'>
                    <div id='dontHaveAccountText'>Don't have an account? <span id='signUpText'>Sign up</span></div>
                </div>
                <Snackbar open={showDoesntExistsSnackbar} autoHideDuration={6000} onClose={handleDoesntExistsSnackbar}>
                    <Alert onClose={handleDoesntExistsSnackbar} severity="error" sx={{ width: '100%' }}>
                        User doesn't exist in the database
                    </Alert>
                </Snackbar>

            </div>


    )
}

export default LoginPage;