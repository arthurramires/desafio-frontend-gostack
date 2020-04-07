import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Desafio ReactJS',
      url: "https://github.com/arthurramires/desafio-frontend-gostack",
      techs: ["React", "Node.js"]
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then((result) => {
      const newRepositorie = repositories.filter(repositorie => repositorie.id !== id); // filtra todos os elementos que não são o que foi excluído
      setRepositories(newRepositorie);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
