  import React, { useState } from 'react';
  import { createCleaning } from '../../services/cleaningService';

  const CreateCleaning = () => {
    const [clientName, setClientName] = useState('');
    const [cleanerName, setCleanerName] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [suites, setSuites] = useState('');
    const [propertyId, setPropertyId] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const cleaningData = {
        clientName,
        cleanerName,
        startDateTime,
        endDateTime,
        suites: parseInt(suites),
        propertyId: propertyId,
      };

      try {
        const result = await createCleaning(cleaningData);
        console.log('Agendamento criado com sucesso:', result);
        setErrorMessage('');
      } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        setErrorMessage('Erro ao criar o agendamento.');
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Criar Agendamento de Limpeza</h1>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 text-center p-2 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="clientName" className="block text-gray-700">Nome do Cliente</label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cleanerName" className="block text-gray-700">Nome do Faxineiro</label>
              <input
                type="text"
                id="cleanerName"
                value={cleanerName}
                onChange={(e) => setCleanerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="startDateTime" className="block text-gray-700">Data e Hora de Início</label>
              <input
                type="datetime-local"
                id="startDateTime"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endDateTime" className="block text-gray-700">Data e Hora de Término</label>
              <input
                type="datetime-local"
                id="endDateTime"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="suites" className="block text-gray-700">Número de Suítes</label>
              <input
                type="number"
                id="suites"
                value={suites}
                onChange={(e) => setSuites(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="propertyId" className="block text-gray-700">ID da Propriedade</label>
              <input
                type="number"
                id="propertyId"
                value={propertyId}
                onChange={(e) => setPropertyId(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Criar Agendamento</button>
          </form>
        </div>
      </div>
    );
  };

  export default CreateCleaning;
