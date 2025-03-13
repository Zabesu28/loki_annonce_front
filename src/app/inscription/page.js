"use client";

import { useState } from 'react';
import { registerUser } from '../services/api';  // Fonction à créer dans le backend
import styles from './inscription.module.css';

export default function Inscription() {
  const [formData, setFormData] = useState({
    email: '',
    pseudo: '',
    password: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);  // Appel à l'API pour créer l'utilisateur
      if (response.success) {
        setStatus('Inscription réussie !');
        setFormData({ email: '', pseudo: '', password: '' });
      } else {
        setStatus('Échec de l\'inscription');
      }
    } catch (error) {
      setStatus('Erreur lors de l\'inscription');
      console.error('Erreur :', error);
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
          name="pseudo"
          value={formData.pseudo}
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

        <button type="submit">Inscription</button>
      </form>
    </div>
  );
}