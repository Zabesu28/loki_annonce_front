"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Header.css"; // Assurez-vous d'avoir un fichier CSS
import { logoutUser } from '../services/api';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("token") != null ? true : false);
    if(isLoggedIn){
      setIsAdmin(sessionStorage.getItem("roles").includes("admin") ? true : false);
    }
}, [isLoggedIn]); 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await logoutUser(); 
    if (response) {
      sessionStorage.clear()
      setIsLoggedIn(false);
      setIsAdmin(false);
      router.refresh(); // Recharge la page Next.js de manière optimisée
      router.push('/connexion');
    } 
  } catch (error) {
    console.error('Erreur :', error);
  }
};

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">🏹 Monster Quêtes</Link>
      </div>
      {isLoggedIn ? (<nav className="nav">
        <ul>
          <li><Link href="/annonces">Annonces</Link></li>
          <li><Link href="/annonces/create">Créer une annonce</Link></li>
          {isAdmin ? (<li><Link href="/contact">Contact</Link></li>) : <></>}
        </ul>
      </nav>) : <></>}
      <div className="auth">
        {isLoggedIn ? (
          <button className="btn" onClick={handleSubmit}>Se déconnecter</button>
        ) : (
          <Link href="/connexion"><button className="btn">Se connecter</button></Link>
        )}
      </div>
    </header>
  );
}