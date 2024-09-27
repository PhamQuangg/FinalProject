import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupData } from '../api/auth';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import './Register.css';

const Resigter = () => {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState<any>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [labelErr, setLabelErr] = useState<string>('');

    const handelSignin = (event: any) => {
        event.preventDefault();
        if (
            dataLogin.email.trim() == '' ||
            dataLogin.password.trim() == '' ||
            dataLogin.confirmPassword.trim() == '' ||
            dataLogin.name.trim() == ''
        ) {
            toast.error('vui lòng nhập đầy đủ email, password');
            return;
        }
        signupData(dataLogin)
            .then((data) => {
                console.log(data);
                toast.success('Tạo tài khoản thành công , tự động đăng nhập !');
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/');
            })
            .catch((error) => {
                //toast.error(error?.response?.data?.message);
                setLabelErr(error?.response?.data?.message);
                console.error(error);
            });
    };
    return (
        <div>
            <Header />
            <div className="form-register">
                <div className="form-wrapper">
                    <form action="#">
                        <h2>Register</h2>

                        <div className="input-field">
                            <input
                                type="text"
                                required
                                value={dataLogin.name}
                                onChange={(e: any) =>
                                    setDataLogin({
                                        ...dataLogin,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <label>Enter your name</label>
                        </div>

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

                        <div className="input-field">
                            <input
                                type="text"
                                required
                                value={dataLogin.confirmPassword}
                                onChange={(e: any) =>
                                    setDataLogin({
                                        ...dataLogin,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                            <label>Enter your confirm Password</label>
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
                            Sign Up
                        </button>
                        <div className="register">
                            <p>
                            Already have an account?
                                <Link to={'/login'} style={{ color: 'red', marginLeft: '10px' }}>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Resigter;