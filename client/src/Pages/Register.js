import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { userContext } from '../context/context';

import axios from 'axios';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [state, setState] = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8080/api/Register", {
                name, email, password
            });
            toast.success("User Registered Successfully");
            navigate("/login");
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
                    <h1 className="d-flex justify-content-center align-items-center mt-3 mb-3">Register</h1>
                    <form className="shadow-lg p-3 mb-5 bg-white rounded">

                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Enter Your Name</label>
                            <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" value={name} onChange={(event) => { setName(event.target.value) }} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email Your address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => { setEmail(event.target.value) }} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={!name || !password || !email}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;