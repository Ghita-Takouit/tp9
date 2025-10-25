import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
  // Déclaration d'un état pour stocker les comptes
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour charger les comptes
  const loadComptes = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/comptes`, {
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        setComptes(response.data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des comptes:', error);
        setError('Impossible de charger les comptes. Vérifiez que le serveur backend est en cours d\'exécution sur le port 8082.');
        setLoading(false);
      });
  };

  // Fonction pour supprimer un compte
  const deleteCompte = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      axios.delete(`${API_BASE_URL}/comptes/${id}`)
        .then(() => {
          alert('Compte supprimé avec succès');
          loadComptes(); // Recharger la liste
        })
        .catch(error => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du compte');
        });
    }
  };

  // Utilisation de useEffect pour effectuer un appel à l'API dès le chargement
  useEffect(() => {
    loadComptes();
    // Rafraîchir les comptes toutes les 5 secondes
    const interval = setInterval(loadComptes, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
          <button className="btn btn-primary" onClick={loadComptes}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Liste des Comptes</h2>
          <button className="btn btn-sm btn-outline-primary" onClick={loadComptes}>
            <i className="bi bi-arrow-clockwise"></i> Actualiser
          </button>
        </div>
        {comptes.length === 0 ? (
          <p className="text-muted">Aucun compte disponible.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Solde</th>
                  <th>Date de Création</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comptes.map(compte => (
                  <tr key={compte.id}>
                    <td>{compte.id}</td>
                    <td>{compte.solde.toFixed(2)} €</td>
                    <td>{compte.dateCreation}</td>
                    <td>
                      <span className={`badge ${compte.type === 'COURANT' ? 'bg-primary' : 'bg-success'}`}>
                        {compte.type}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteCompte(compte.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompteList;
