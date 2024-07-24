import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { userContext } from '../context/context';

import axios from 'axios';

const Login = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [state, setState] = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8080/api/login", {
                email, password
            });

            setState({
                user: data.user,
                token: data.token
            })
            window.localStorage.setItem("auth", JSON.stringify(data));
            toast.success("User Logged in Successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }




    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <ToastContainer position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <h1 className="d-flex justify-content-center align-items-center mt-3 mb-3">Login</h1>
                    <form className="shadow-lg p-3 mb-5 bg-white rounded">

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => { setEmail(event.target.value) }} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        </div>

                        <button type="submit" className="btn btn-danger" onClick={handleSubmit} disabled={!password || !email}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;