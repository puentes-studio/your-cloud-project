import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import {loginUserService} from '../../services'
import Header from '../../components/header/Header'
import { AutenticacionContext } from '../../context/AutenticationContext'
import './Login.css'



const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setToken, setUser} = useContext(AutenticacionContext);

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUserService({email, password})

            console.log(data);

            setToken(data.token);
            setUser(data.user_name); {/*Darle una vuelta a esto */}

            navigate("/user-content");

        } catch (error) {
            setError(error.message);
        }
    };

  
    return (
        <div className="login">
            <Header />
    

            <form className='login-form' onSubmit={handleForm}>


                <input
                className='input-field'
                name="email"
                placeholder="User Email"
                id="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                />


                <input
                className='input-field'
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                />


                <button className='next-btn'>Login</button>
                {error ? <p>{error}</p> : null}


                <p>
                 <Link className="recover-password-link" to="/recoverpassword">Forgot your password?</Link>
                </p>


                </form>
            <div className='creators'>
                    <h5>Built by</h5>
                <p>
                <Link className="build-team" to="https://www.linkedin.com/in/gonzalo-jrr/" target="_blank">Gonzalo Rodriguez</Link>&nbsp;
                <Link className="build-team" to="https://www.linkedin.com/in/scarlettsantanawilliams/" target="_blank">Scarlett Santana</Link>&nbsp;
                <Link className="build-team" to="https://www.linkedin.com" target="_blank">Mohammed El Mangadi</Link>&nbsp;
                <Link className="build-team" to="https://www.linkedin.com/in/vlad-puentesb/" target="_blank">Vlad Beltran</Link>
                </p>
            </div>
        </div>
      
    )
  }
  
  export default Login