"use client";

import { useState } from 'react';
import { loginUser } from '../services/api';  // Fonction d'API pour envoyer les données
import styles from './connexion.module.css';

export default function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);  // Envoie des données au backend
      if (response.success) {
        setStatus('Connexion réussie !');
        // Redirection ou stockage du token ici
      } else {
        setStatus('Identifiants incorrects');
      }
    } catch (error) {
      setStatus('Erreur lors de la connexion');
      console.error('Erreur :', error);
    }
  };

  return (
    <div className={styles.connexionContainer}>
      <h2>Se connecter</h2>
      {status && <p className={styles.statusMessage}>{status}</p>}

      <form onSubmit={handleSubmit} className={styles.connexionForm}>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
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

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}