"use client";

import { useState } from "react";
import { registerUser } from "../services/api"; // Fonction à créer dans le backend
import styles from "./inscription.module.css";
import Link from "next/link";

export default function Inscription() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData); // Appel à l'API pour créer l'utilisateur
      if (response.message) {
        setStatus(response.message);
        setFormData({ email: "", name: "", password: "" });
      } else {
        setStatus("Échec de l'inscription");
      }
    } catch (error) {
      setStatus("Erreur lors de l'inscription");
      console.error("Erreur :", error);
    }
  };

  return (
    <div className={styles.inscriptionContainer}>
      <h2>Créer un compte</h2>
      {status && <p className={styles.statusMessage}>{status}</p>}

      <form onSubmit={handleSubmit} className={styles.inscriptionForm}>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Pseudo :</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div>
          <button type="submit">Inscription</button>
          <Link href="/connexion">
            <button className="btn">Se connecter</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
