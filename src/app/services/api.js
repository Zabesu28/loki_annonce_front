export const getQuests = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/annonces"; // Correction URL
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch quests");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw error;
  }
};

export const getQuestById = async (id) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/annonces/${id}`; // Correction URL avec annonces/
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch quest");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quest:", error);
    throw error;
  }
};

export const createQuest = async (questData) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/annonces"; // URL pour l'ajout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questData),
    });

    if (!response.ok) {
      throw new Error("Failed to create quest");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating quest:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/users"; // URL pour récupérer tous les utilisateurs
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();  // Retourne la liste des utilisateurs
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const sendContactEmail = async (emailData) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/contact"; // URL pour envoyer l'email au back-end

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Failed to send contact email");
    }

    return await response.json();  // Retourne la confirmation de l'envoi de l'email
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + '/register', userData);  // Envoie de la requête POST avec les données utilisateur
    return response.data;  // Retourne les données retournées par l'API (ex: message de succès)
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'inscription :", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/login', credentials);  // Envoie de la requête POST avec les données de connexion
    return response.data;  // Retourne les données retournées par l'API (ex: message de succès ou token)
  } catch (error) {
    console.error("Erreur lors de l'envoi de la connexion :", error);
    throw error;
  }
};