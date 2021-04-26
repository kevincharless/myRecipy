import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";

const Navbar = () => {
    return (
        <div className="container-fluid home-header fixed-top">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to="/">
                            <img className="logo" src={Logo} width="100" alt="logo" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
