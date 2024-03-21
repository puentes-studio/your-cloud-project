import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {registerUserService} from '../../services'
import Header from '../../components/header/Header'
import './Register.css'



const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState ('');
    const [email, setEmail] = useState ('');
    const [password1, setPassword1] = useState ('');
    const [password2, setPassword2] = useState ('');
    const [error, setError] = useState ('');

    const handleForm = async (e) => {
        e.preventDefault();           {/* Este preventDefault evita que se envíe el formulario por http */}
        setError("");

        if(password1 !== password2) {
            setError('Las contraseñas no coinciden')
            return;
        }

        try {
            await registerUserService({user_name: username, email, password: password1});

            //Ir a login si el registro no da error y se hace con éxito
            navigate("/login");

        } catch (error) {
            setError(error.message);

        }
    };

  
    return (
        <div className="register">
            <Header />

            <form className='register-form' onSubmit={handleForm}>

                <input
                className='input-field'
                name="username"
                placeholder="User Name"
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                />


                <input
                className='input-field'
                name="email"
                placeholder="e mail address"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                />


                <input
                className='input-field'
                name="password1"
                placeholder="Password"
                type="password"
                id="password1"
                required
                onChange={(e) => setPassword1(e.target.value)}
                />


                <input
                className='input-field'
                name="password2"
                placeholder="Confirm Password"
                type="password"
                id="password2"
                required
                onChange={(e) => setPassword2(e.target.value)}
                />


                <button className='register-btn2'>Confirm</button>
                {error ? <p>{error}</p> : null} {/* Esta línea permite gestionar cualquier error relacionado con el registro a través del gestor de errores de la API */}

                <p>
                 <Link className="recover-password-link" to="/login">Already have an account?</Link>
                </p>

                
                
            </form>
          
        </div>
      
    )
  }
  
  export default Register