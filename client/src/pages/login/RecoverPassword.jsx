import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Recover.css'


const RecoverPassword = () => {

  
    return (
        <div className="recover">
           <Header />

            <p>Introduce your email and you will receive the steps to restart your password</p>

            <form className='recover-form'>
                <input
                className='input-field'
                name="e-mail"
                placeholder="e-mail"
                type="email"
                // value={email}
                // onChange={e => setEmail(e.target.value)}
                />
                <button className='send-btn'>Send</button>
                {/* {error?.error &&
                <p className="error">Se ha producido un error: {error.error}</p>
                } */}
                <p className='margin-p'>
                 Check your email and follow the instructions to re-start your password.
                </p>
                <p>
                 <Link className="go-back-btn" to="/">Start again</Link>
                </p>

                
                
            </form>
           
        </div>
      
    )
  }
  
  export default RecoverPassword
  
  