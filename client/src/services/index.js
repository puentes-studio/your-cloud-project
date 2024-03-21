export const registerUserService = async ({user_name, email, password}) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_name, email, password})
    });


    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }
};






export const loginUserService = async ({email, password}) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });


    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;  

};


export const uploadFileService = async (data, token) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/files`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: data,
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;  
};

export const getFoldersAndFiles = async (token) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    console.log("API Response:", json);

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;  
};

export const getFilesInFolder = async (token, carpeta_selecionada) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/folder/${carpeta_selecionada}}`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;  
};

export const deleteFile = async (token, fileId) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/file/${fileId}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};