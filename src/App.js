import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setrepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setrepositories(response.data);
    })
  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post('repositories',
    {
      url: 'https://github.com/josepholiveira',
      title: `Desafio ${Date.now()}`,
      techs: ['React', 'Node.js'],
    });
    
    setrepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
   await api.delete(`/repositories/${id}`);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key ={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
