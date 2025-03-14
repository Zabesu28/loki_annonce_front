"use client";

import { useState } from "react";
import "./create.scss"; // Import du style
import { createQuest } from "../../services/api";

export default function CreateAnnonce() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "chasse", // Valeur par défaut
    image: null,
    emailUser : sessionStorage.getItem("email")
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createQuest(formData);
      setMessage("Annonce créée avec succès !");
      setFormData({
        title: "",
        description: "",
        category: "chasse",
        image: null,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Erreur lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h2>Créer une annonce</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Catégorie</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="chasse">Chasse</option>
            <option value="recolte">Récolte</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer l'annonce"}
        </button>
      </form>
    </div>
  );
}
