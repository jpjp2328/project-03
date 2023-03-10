import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark homenavbar">
                <Link className="navbar-brand nav-heading" to="/">PostItMart</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {Auth.loggedIn() ? (
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to='/'> Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`/user/${Auth.getProfile().data.username}`}>{Auth.getProfile().data.username}'s Profile <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={Auth.logout}>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/signup">SignUp</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Navbar