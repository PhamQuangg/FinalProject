import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { signin } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState<any>({
        email: '',
        password: '',
    });
    const [labelErr, setLabelErr] = useState<string>('');

    const handelSignin = (event: any) => {
        event.preventDefault();
        if (dataLogin.email.trim() == '' || dataLogin.password.trim() == '') {
            toast.error('vui lòng nhập đầy đủ email  password');
            return;
        }
        signin(dataLogin)
            .then((data) => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/');
            })
            .catch((error) => {
                // toast.error(error?.response?.data?.message);
                setLabelErr(error?.response?.data?.message);
                console.error(error);
            });
    };
    return (
        <div className="" style={{ width: '100vw' }}>
            <Header />

            <div className="form-login">
                <div className="form-wrapper">
                    <form action="#">
                        <h2>Login</h2>
                        <div className="input-field">
                            <input
                                type="text"
                                required
                                value={dataLogin.email}
                                onChange={(e: any) =>
                                    setDataLogin({
                                        ...dataLogin,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <label>Enter your email</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                required
                                value={dataLogin.password}
                                onChange={(e: any) =>
                                    setDataLogin({
                                        ...dataLogin,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <label>Enter your password</label>
                        </div>

                        {labelErr ? (
                            <p
                                style={{
                                    color: '#ee4d2d',
                                    fontSize: 14,
                                }}
                            >
                                {labelErr}
                            </p>
                        ) : (
                            ''
                        )}
                        <button type="submit" onClick={(e) => handelSignin(e)}>
                            Log In
                        </button>
                        <div className="register">
                            <p>
                                Don't have an account ?{' '}
                                <Link to={'/register'} style={{ color: 'red', marginLeft: '5px' }}>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>

                    <div
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    ></div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;