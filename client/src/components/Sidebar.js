import { useEffect } from 'react';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Avatar from '../assets/img/avatar-default.png';

const Sidebar = ({ setIsActive, user, logout }) => {
    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="col-md-3 home-sidebar">
            <div className="col-12 home-sidebar-list">
                {!user ? (
                    <>
                    <div className="avatar-img text-center mt-5">
                        <img src={Avatar} className="rounded-circle" width="100" alt="logo" />
                    </div>
                    <div className="button-section row text-center">
                        <div className="col-6">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="col-6">
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end my-3">
                        <button onClick={() => setIsActive(true)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-danger">Logout</button>
                    </div>
                    <div className="avatar-img text-center">
                        <img src={Avatar} className="rounded-circle" width="100" alt="avatar" />
                    </div>
                    <div className="logged-info text-center">
                        <p>{user?.result?.name}</p>
                        <span className="text-muted">{user?.result?.email}</span>
                    </div>
                    <div className="button-section row text-center">
                        <div className="col-6">
                            <Link to="/addnew">Add Recipe</Link>
                        </div>
                        <div className="col-6">
                            <Link to="/myrecipe">My Recipe</Link>
                        </div>
                    </div>
                    </>
                )}
                <ul>
                    <li>
                        <i className="fa fa-home"></i>
                        <Link to="/home">Home</Link>
                    </li>
                </ul>  
            </div>
        </div>
    )
}

export default Sidebar
