import { useState, useEffect, useContext } from 'react';
import { getFilesInFolder, getFoldersAndFiles, deleteFile } from '../../services';
import { AutenticacionContext } from '../../context/AutenticationContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CiFolderOn } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
// import { CiFileOn } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import './FileGallery.css'

import { FaFile } from "react-icons/fa";




const FoldersAndFiles = ({carpeta, files, setFiles}) => {
    const [folders, setFolders] = useState([]);
    const [folder, setFolder] = useState();
    const [error, setError] = useState(null);
    const { token } = useContext(AutenticacionContext);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
            let response;
            if(carpeta){
                response = await getFilesInFolder(token, carpeta );
            }else{
                response = await getFoldersAndFiles(token);
            }
          setFolders(response.folders ? response.folders: []);
          setFiles(response.files);
          setFolder(response.folder)
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchData();
  
      // Cleanup function
      return () => {
        // Perform cleanup if needed
      };
    }, [token, carpeta, setFiles]); // Dependencia de efecto: token

    const handleDeleteFile = async (fileId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this file?");
        if (!confirmDelete) {
            return; // Si el usuario cancela, no se realiza la eliminación del archivo
        }
      try {
          await deleteFile(token, fileId);
          const updatedFiles = files.filter(file => file.id !== fileId);
          setFiles(updatedFiles);
      } catch (error) {
          setError(error.message);
      }
  };
  

  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
        <div className="file-gallery-container">
          <h2 className='folder-name'>{folder?.folder_name}</h2>
          
          <div>
            <div className='goback-container'>
            {folder && (
              <>
              <Link  to={`/user-content`} >
              <GoArrowLeft className="goBackButton"/>
              </Link>
              </>
            )
            }  
            </div>
            <div className='container'>
            <div className="file-grid">
              

                {/* Folders */}

                {folders.map(folder => (
                  <div key={folder.id} className="file-item">
                    <CiFolderOn />
                      <Link className="file-name" to={`/user-content?c=${folder.id}`}>
                        <p className='folder-name'>{folder.folder_name}</p>
                      </Link>
                  </div>
                ))}

                {/* ________________________________ */}


                {/* Files */}

                {files.map(file => (
                  <div key={file.id} className="file-item">
                    {/* <CiFileOn className='icon-height'/> */}
                    {/* <FaDownload className="download-icon" /> */}
                    <FaFile className='icon-height' />
                    <MdDeleteForever className="delete-icon" onClick={() => handleDeleteFile(file.id)} />
                      <a className="file-name" href={`${import.meta.env.VITE_URL_API}/${file.user_id}${!carpeta? "" : "/"+carpeta}/${file.file_name}`} target={"_blank"} alt={file.file_name} download={true} rel="noreferrer">{file.file_name}</a>
                        
                  </div>
                ))}
              
          </div>
          </div>
       </div>
        
      </div>
    );
  };

  FoldersAndFiles.propTypes = {
    carpeta: PropTypes.string, // carpeta prop is expected to be a string
    files: PropTypes.array.isRequired, // files prop is expected to be an array and is required
    setFiles: PropTypes.func.isRequired // setFiles prop is expected to be a function and is required
  };
  
  export default FoldersAndFiles;