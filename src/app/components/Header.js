"use client";

import { useState } from "react";
import Link from "next/link";
import "./Header.css"; // Assurez-vous d'avoir un fichier CSS

export default function Header() {
  const [isLoggedIn] = useState(false); // Simule la connexion

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">🏹 Monster Quêtes</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/annonces">Annonces</Link></li>
          <li><Link href="/profil">Profil</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="auth">
        {isLoggedIn ? (
          <button className="btn">Mon Compte</button>
        ) : (
          <button className="btn">Se connecter</button>
        )}
      </div>
    </header>
  );
}