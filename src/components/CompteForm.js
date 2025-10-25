import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
  // Initialisation de l'état pour stocker les données du formulaire
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    axios.post(`${API_BASE_URL}/comptes`, compte, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        alert('Compte ajouté avec succès');
        // Réinitialiser le formulaire
        setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
        // Rafraîchir la page pour voir le nouveau compte
        window.location.reload();
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du compte:', error);
        alert('Erreur lors de l\'ajout du compte. Vérifiez que le serveur est en cours d\'exécution sur le port 8082.');
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Ajouter un Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Solde</label>
            <input 
              type="number" 
              name="solde" 
              className="form-control" 
              value={compte.solde}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date de Création</label>
            <input 
              type="date" 
              name="dateCreation" 
              className="form-control" 
              value={compte.dateCreation}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select 
              name="type" 
              className="form-select" 
              value={compte.type}
              onChange={handleChange}
              required
            >
              <option value="COURANT">Courant</option>
              <option value="EPARGNE">Épargne</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default CompteForm;
