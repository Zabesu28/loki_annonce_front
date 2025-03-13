export const getQuests = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "annonces"

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }
  
      const data = await response.json();
      return data;  // Retourne la réponse des quêtes
    } catch (error) {
      console.error('Error fetching quests:', error);
      throw error;
    }
  };

  export const getQuestById = async (id) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${id}`;  // URL avec l'ID pour récupérer une quête spécifique
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch quest');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quest:', error);
      throw error;
    }
  };