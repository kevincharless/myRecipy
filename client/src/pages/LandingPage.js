import Logo from "../assets/img/logo.png";
import Arrow from '../assets/img/arrow.png';
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="index-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="index-sidebar col-lg-4 col-md-5 col-sm-12">
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-12 text-center index-sidebar-heading">
                                    <img className="logo" src={Logo} width="100" alt="logo" />
                                </div>
                                <div className="col-12 index-sidebar-list mt-5">
                                    <ul>
                                        <li>
                                            <img src={Arrow} alt="arrow" />
                                            <Link className="ms-2" to="/home">Homepage</Link>
                                        </li>
                                        <li>
                                            <img src={Arrow} alt="arrow" />
                                            <Link className="ms-2" to="/bookmark">Bookmark</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default LandingPage
