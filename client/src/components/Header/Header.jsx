import { Link } from 'react-router-dom'
import { useAuth } from '../../context/sign-in.context';
import logo from '../../assets/logo/logo.png';
import './Header.css';

const Header = () => {
  const { authState } = useAuth();

  return (
    <nav className="nav-bar">
      <Link to={authState.dataLogin.token ? '/user-content' : '/'}>
        <img src={logo} className="logo app" alt="Your Cloud logo" />
      </Link>
    </nav>
  );
};
    
    export default Header