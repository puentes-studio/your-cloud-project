import {  useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/sign-in.context';
import Header from '../../components/header/Header';
import FooterMenu from '../../components/footerMenu/FooterMenu';
import FoldersAndFiles from '../../components/fileGallery/FileGallery';
import './UserContent.css';

const UserContent = () => {
  const [files, setFiles] = useState([]);
  const { handleLogout, authState } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [carpeta, setCarpeta] = useState(searchParams.get('c'));

  useEffect(() => {
    setCarpeta(searchParams.get('c'));
  }, [searchParams]);

  return (
    <div className="user-content">
      <Header />
      <h1 className="user-name">{authState.dataLogin.user_name}</h1>
      <a
        href="#"
        className="logout-btn"
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
          navigate('/');
        }}>
        Logout
      </a>

      <FoldersAndFiles carpeta={carpeta} files={files} setFiles={setFiles} />

      <FooterMenu carpeta={carpeta} setFiles={setFiles} />
    </div>
  );
};

export default UserContent;