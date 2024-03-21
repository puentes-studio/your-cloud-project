import { Link } from 'react-router-dom'
import logotype from '../../assets/logo/logotype.png'
import './Home.css'

const Home = () => {
  

  return (
    <div className="home">
       <div className='logo-container'>
        <a href="" >
          <img src={logotype} className="logotype app" alt="Your Cloud logo" />
        </a>

        <p className="upload-and-save">
        Upload and save your files, don't be shy!
      </p>
      <div className='btn-container'>
        <Link to="/login" className="btn-primary login-btn">Login</Link>
        <Link to="/register" className="btn-primary register-btn">Register</Link>
      </div>
      </div>
      
      
      
    </div>
  )
}

export default Home