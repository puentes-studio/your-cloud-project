import { useNavigate } from 'react-router-dom'
import logotype from '../../assets/logo/logotype.png'
import './NotFound.css'

const NotFound = () => {

  const navigate = useNavigate();
  

  return (
    <div className="notfound">
       <div className='logo-container'>
        <a href="" >
          <img src={logotype} className="logotype app" alt="Your Cloud logo" />
        </a>

        <p className="notFound">
        Page Not Found...
      </p>
      <div className='btn-container'>
        <a href="#" className="goback-btn" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/user-content");
            }}>Go Back
            </a>
      </div>
      </div>
      
      
      
    </div>
  )
}

export default NotFound