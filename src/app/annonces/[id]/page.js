'use client';  // Important pour marquer ce composant comme côté client

import { useEffect, useState } from 'react';
import { getQuestById } from '../../services/api'; // Assurez-vous que cette fonction existe
import Image from 'next/image';

export default function AnnonceDetail({ params }) {
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        setError(null);  // Reset l'erreur
        
        // Attendre que `params` soit disponible
        if (params?.id) {
          const questData = await getQuestById(params.id);  // Utiliser l'ID pour récupérer les données de la quête
          setQuest(questData);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Une erreur est survenue lors de la récupération des quêtes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, [params]);  // L'effet se déclenche à chaque changement de `params`

  if (loading) {
    return <div>Chargement...</div>;  // Afficher un message de chargement pendant la récupération des données
  }

  if (error) {
    return <div>{error}</div>;  // Afficher un message d'erreur si la récupération échoue
  }

  if (!quest) {
    return <div>Quête non trouvée</div>;  // Afficher un message si aucune quête n'est trouvée
  }

  return (
    <div>
      <h1>{quest.title}</h1>
      <p>{quest.description}</p>
      <Image src={quest.image} alt={quest.title} />
    </div>
  );
}