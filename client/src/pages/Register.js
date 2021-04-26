import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signUp } from "../redux/actions/auth";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Register = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const history= useHistory();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(signUp(formData, history))
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid home-start">
                <div className="row">
                    <div className="col-md-2"></div>
                        <div className="col-md-8 auth-box px-5 mb-5">
                        <div className="card">
                            <div className="card-header">
                                <h3>Register</h3>
                            </div>
                            <div className="card-body mt-3 d-flex justify-content-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input onChange={handleChange} type="text" name="username" className="form-control" required autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input onChange={handleChange} type="email" name="email" className="form-control" required autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input onChange={handleChange} type="password" name="password" className="form-control" required autoComplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input onChange={handleChange} type="password" name="confirmPassword" className="form-control" required autoComplete="off" />
                                    </div>
                                    {errorMessage && (
                                        <div className="text-danger">
                                            *{errorMessage}
                                        </div>
                                    )}
                                    <button className="btn" type="submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Register
