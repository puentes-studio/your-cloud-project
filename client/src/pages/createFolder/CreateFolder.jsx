import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import FooterMenu from '../../components/footerMenu/FooterMenu';
import { AutenticacionContext } from '../../context/AutenticationContext';
import './CreateFolder.css';

const CreateFolder = () => {
  const [folderName, setFolderName] = useState('');
  const { token } = useContext(AutenticacionContext);
  const navigate = useNavigate();

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async (e) => { // Usa async para manejar la solicitud
    e.preventDefault();
    
    
    try {

      const response = await fetch(`${import.meta.env.VITE_URL_API}/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ folderName }) // Envía el nombre de la carpeta en el cuerpo de la solicitud
      });

      if (response.ok) {
        console.log('Carpeta creada exitosamente');
        // Puedes redirigir al usuario o realizar otras acciones aquí
        navigate("/user-content");
      } else {
        console.error('Error al crear la carpeta:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la carpeta:', error);
    }
  };


  return (
    <div className="create-folder">
      <Header />

        <p className='p-folder'>Choose a name for the folder</p>

      <form className="folder-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={folderName}
          onChange={handleFolderNameChange}
          placeholder="Folder Name"
          className="input-field"
        />
        <button type="submit" className="create-folder-btn">Create Folder</button>
      </form>

      {/* <Link to='/user-content' className="logout-btn">Go back</Link> */}

      <FooterMenu />
    </div>
  );
}

export default CreateFolder;