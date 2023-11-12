// Componente de Barra de Búsqueda (BarraBusqueda.js)
import React from 'react';
import "./BarraBusqueda.css"


const BarraBusqueda = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    // Aquí puedes realizar acciones relacionadas con la búsqueda
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar documentos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default BarraBusqueda;
