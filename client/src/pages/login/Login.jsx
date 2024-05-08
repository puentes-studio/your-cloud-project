import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/sign-in.context';
import Header from '../../components/header/Header';
import './Login.css';

const Login = () => {
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleForm = async (e) => {
    e.preventDefault();
    setError('');
    try {
      handleLogin(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <Header />

      <form className="login-form" onSubmit={handleForm}>
        <input
          className="input-field"
          name="email"
          placeholder="User Email"
          id="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-field"
          name="password"
          placeholder="Password"
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="next-btn" type="submit">
          Login
        </button>
        {error ? <p>{error}</p> : null}

        <p>
          <Link className="recover-password-link" to="/recoverpassword">
            Forgot your password?
          </Link>
        </p>
      </form>
      <div className="creators">
        <h5>Built by</h5>
        <p>
          <Link
            className="build-team"
            to="https://www.linkedin.com/in/ramon-paez-8b63821a2/"
            target="_blank">
            Ramon Paez
          </Link>
          &nbsp;
          <Link
            className="build-team"
            to="https://www.linkedin.com/in/vlad-puentesb/"
            target="_blank">
            Vlad Beltran
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
