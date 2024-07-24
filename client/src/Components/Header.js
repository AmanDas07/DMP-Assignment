import { useContext } from "react"
import { userContext } from "../context/context"
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Header = () => {
    const [state, setState] = useContext(userContext);
    const navigate = useNavigate();

    const logoutController = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">User</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-1">

                        {state != null ? (
                            <>

                                <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    {state && state.user && state.user.name}
                                </button>

                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link active" style={{ cursor: "pointer" }} onClick={logoutController}>Logout</a>
                                </li>

                            </>
                        ) : (
                            <>

                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="/register">Register</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="/login">Login</NavLink>
                                </li>


                            </>
                        )}
                    </ul>

                </div>
            </div>
        </nav >


    )
}
export default Header;

/*
  

*/