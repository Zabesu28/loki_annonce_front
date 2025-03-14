import axios from 'axios';

export const getQuests = async () => {
  try {
    const token = sessionStorage.getItem('token');

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/annonces`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces :', error);
    throw error;
  }
};

export const getQuestById = async (id) => {


  try {
    const token = sessionStorage.getItem('token');
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/annonces/${id}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }); 

    return response.data;
  } catch (error) {
    console.error("Error fetching quest:", error);
    throw error;
  }
};

export const createQuest = async (questData) => {
  try {
    const token = sessionStorage.getItem('token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/annonces";
    const response = await axios.post(apiUrl, questData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating quest:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/liste-users";
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }); // Utilisation de l'instance axios

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const sendContactEmail = async (emailData) => {
  try {
    const token = sessionStorage.getItem('token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/send-mail";
    const response = await axios.post(apiUrl, emailData, {
      headers: {
        "Content-Type": "application/json",
         'Authorization': `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'inscription :", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    sessionStorage.setItem('token', response.data.token)
    sessionStorage.setItem('name', response.data.name)
    sessionStorage.setItem('email', response.data.email)
    sessionStorage.setItem('roles', response.data.roles)
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la connexion :", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la connexion :", error);
    throw error;
  }
};