"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./annonces.module.css";
import Image from "next/image";
import { getQuests } from "../services/api";
import Link from "next/link";

export default function Annonces() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        let data = await getQuests();

        if (sessionStorage.getItem("roles").includes("user")) {
          data = data.filter(
            (q) => q.createdBy === sessionStorage.getItem("email")
          );
        }

        setQuests(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Une erreur est survenue lors de la récupération des quêtes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  const filteredQuests = useMemo(() => {
    return quests.filter((quest) =>
      quest.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [quests, searchQuery]);

  if (loading) return <p>Chargement des quêtes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.page}>
      <h1>Liste des Quêtes</h1>

      <input
        type="text"
        placeholder="Rechercher une quête..."
        className={styles.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className={styles.questList}>
        {filteredQuests.length > 0 ? (
          filteredQuests.map((quest) => (
            <Link key={quest.id} href={`/annonces/${quest.id}`}>
              <li className={styles.questItem}>
                <Image
                  // src={quest.image_url}
                  alt={quest.title}
                  width={300}
                  height={200}
                  className={styles.questImage}
                />
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
                <p className={styles.category}>
                  Type de quête : {quest.category}
                </p>
                <p className={styles.category}>Créée par : {quest.createdBy}</p>
              </li>
            </Link>
          ))
        ) : (
          <p>Aucune quête trouvée</p>
        )}
      </ul>
    </div>
  );
}
