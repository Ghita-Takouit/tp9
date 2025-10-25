import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mt-4 mb-4">Gestion de Comptes Bancaires</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <CompteForm />
        </div>
        <div className="col-md-8">
          <CompteList />
        </div>
      </div>
    </div>
  );
}

export default App;
