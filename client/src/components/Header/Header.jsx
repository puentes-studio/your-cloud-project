import { Link } from 'react-router-dom'
import { AutenticacionContext } from '../../context/AutenticationContext'
import { useContext } from 'react'
import logo from '../../assets/logo/logo.png'
import './Header.css'

const Header = () => {

    const { token } = useContext(AutenticacionContext);

    return (
        <nav className="nav-bar">
                <Link to={token ? '/user-content' : '/'}>
                <img src={logo} className="logo app" alt="Your Cloud logo" />
                 </Link>
            </nav>
        )
    }
    
    export default Header