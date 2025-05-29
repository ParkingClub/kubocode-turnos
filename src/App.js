import React, { useState } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState('welcome');
  const [counters, setCounters] = useState({ SG: 0, PT: 0, PG: 0, CR: 0 });
  const services = [
    { label: 'Servicio General', code: 'SG' },
    { label: 'Préstamos', code: 'PT' },
    { label: 'Pagos', code: 'PG' },
    { label: 'Cierre', code: 'CR' }
  ];

  const handleGenerateClick = () => setView('services');
  const handleServiceClick = async (service) => {
    const count = counters[service.code] + 1;
    setCounters(prev => ({ ...prev, [service.code]: count }));
    const ticket = `${service.code}${String(count).padStart(3,'0')}`;
    try {
      await window.electronAPI.printTurno(ticket);
      alert(`Turno impreso: ${ticket}`);
    } catch (e) {
      console.error(e);
      alert('Error al imprimir');
    }
    setView('welcome');
  };

  return (
    <div className="container">
      {view === 'welcome' ? (
        <div className="welcome-screen">
          <h1 className="title">Bienvenido</h1>
          <button className="primary-button" onClick={handleGenerateClick}>Generar turno</button>
        </div>
      ) : (
        <div className="services-screen">
          <h2 className="subtitle">Seleccione su Servicio</h2>
          <div className="services-grid">
            {services.map(s => (
              <button key={s.code} className="service-button" onClick={() => handleServiceClick(s)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;