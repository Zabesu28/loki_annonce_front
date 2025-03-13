"use client";  // Assurez-vous d'ajouter cette ligne si vous utilisez useState ou autres hooks React

import { useState, useEffect } from "react";
import styles from "./annonces.module.css"; // Assurez-vous d'avoir des styles appropriés
import Image from 'next/image';
import { getQuests } from '../services/api';
import Link from 'next/link';

export default function Annonces() {
  const [quests, setQuests] = useState([]);  // Liste des quêtes
  const [loading, setLoading] = useState(true);  // Indicateur de chargement
  const [error, setError] = useState(null);

  // Simulation de la récupération des quêtes
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await getQuests(); // Appel à l'API
        setQuests(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Une erreur est survenue lors de la récupération des quêtes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []); // L'effet s'exécute au premier rendu de la page

  if (loading) {
    return <p>Chargement des quêtes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Chargement des quêtes...</p>;
  }

  return (
    <div className={styles.page}>
      <h1>Liste des Quêtes</h1>
      <ul className={styles.questList}>
        {quests.map((quest) => (
          <Link key={quest.id} href={`/annonces/${quest.id}`}>
          <li className={styles.questItem}>
            <Image
              src={quest.image}
              alt={quest.title}
              width={300}   
              height={200}  
              className={styles.questImage}
            />
            <h3>{quest.title}</h3>
            <p>{quest.description}</p>
            <p className={styles.category}>Type de quête : {quest.category}</p>
            <p className={styles.category}>Créée par : {quest.createdBy}</p>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}