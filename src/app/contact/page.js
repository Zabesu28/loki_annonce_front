'use client';

import { useState, useEffect } from 'react';
import { getUsers, sendContactEmail } from '../services/api';
import styles from './contact.module.css';

export default function ContactUser() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Charger la liste des utilisateurs
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Appel à l'API
        setUsers(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStatus('Une erreur est survenue lors de la récupération des utilisateurs');
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactEmail(formData);
      setStatus('Email envoyé avec succès !');
      setFormData({ recipient: '', subject: '', message: '' });
    } catch (error) {
      setStatus("Échec de l'envoi du mail.");
      console.error('Erreur :', error);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Contacter un utilisateur</h2>
      {status && <p className={styles.statusMessage}>{status}</p>}

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label>Utilisateur :</label>
        <select name="recipient" value={formData.recipient} onChange={handleChange} required>
          <option value="">Sélectionnez un utilisateur</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <label>Objet du mail :</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

        <label>Message :</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}