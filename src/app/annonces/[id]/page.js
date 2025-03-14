"use client"; // Important pour marquer ce composant comme côté client

import { use, useEffect, useState } from "react";
import { getQuestById } from "../../services/api"; // Assurez-vous que cette fonction existe
import Image from "next/image";
import styles from "./id.module.css";

export default function AnnonceDetail({ params }) {
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const routeParams = use(params); // 🔥 Déstructure `params` proprement
  const { id } = routeParams;

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        setError(null); // Reset l'erreur

        if (id) {
          const questData = await getQuestById(id); // Utiliser l'ID pour récupérer les données de la quête
          setQuest(questData);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Une erreur est survenue lors de la récupération des quêtes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, [id]); // L'effet se déclenche à chaque changement de `params`

  if (loading) {
    return <div>Chargement...</div>; // Afficher un message de chargement pendant la récupération des données
  }

  if (error) {
    return <div>{error}</div>; // Afficher un message d'erreur si la récupération échoue
  }

  if (!quest) {
    return <div>Quête non trouvée</div>; // Afficher un message si aucune quête n'est trouvée
  }

  return (
    <div className={styles.annonceContainer}>
      <h1>{quest.title}</h1>
      <p>{quest.description}</p>
      <p className={styles.category}>Type de quête : {quest.category}</p>
      <p className={styles.category}>Créée par : {quest.createdBy}</p>
      <Image
        src={quest.image_url}
        alt={quest.title}
        width={600}
        height={400}
        className={styles.questImage}
      />
    </div>
  );
}
