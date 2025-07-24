import React from 'react';

interface CleaningCardProps {
  propertyId: number;
  startTime: string;
  endTime: string;
  googleEventUrl: string;
  clientName: string;
  cleanerName: string;
  suites: number | null;
  status: string;
}

const CleaningCard: React.FC<CleaningCardProps> = ({
  propertyId,
  startTime,
  endTime,
  googleEventUrl,
  clientName,
  cleanerName,
  suites,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'canceled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Propriedade: {propertyId}</h2>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Cliente:</strong> {clientName}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Faxineiro:</strong> {cleanerName}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Data:</strong> {new Date(startTime).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Início:</strong> {new Date(startTime).toLocaleTimeString()} - <strong>Término:</strong> {new Date(endTime).toLocaleTimeString()}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Suítes:</strong> {suites || 'Não especificado'}
      </p>

      <p className={`text-sm font-semibold mb-2 ${getStatusColor(status)}`}>
        <strong>Status:</strong> {status}
      </p>

      <div className="flex space-x-2 mt-2">
        <button className="text-sm text-blue-500 hover:text-blue-700">Foto antes não carregada</button>
        <button className="text-sm text-blue-500 hover:text-blue-700">Foto depois não carregada</button>
      </div>

      <a
        href={googleEventUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 font-semibold mt-4 block"
      >
        Ver no Google Calendar
      </a>
    </div>
  );
};

export default CleaningCard;
