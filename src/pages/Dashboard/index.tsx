import React, { useEffect, useState } from 'react';
import { getCleanings } from '../../services/cleaningService';
import { Link } from 'react-router-dom';

interface Cleaning {
  id: string;
  property_id: number;
  client_name: string;
  cleaner_name: string;
  start_time: string;
  end_time: string;
  status: string;
  google_event_url: string;
  suites: number | null;
  before_photo: string | null;  // Campo para foto antes
  after_photo: string | null;   // Campo para foto depois
}

const Dashboard = () => {
  const [cleanings, setCleanings] = useState<Cleaning[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCleanings = async () => {
      try {
        const data = await getCleanings();
        setCleanings(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar limpezas:', error);
        setLoading(false);
      }
    };

    fetchCleanings();
  }, []);

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

  const getPhotoPlaceholder = (photo: string | null) => {
    if (!photo) {
      return (
        <span className="text-gray-500 italic">Sem foto disponível</span>
      );
    }
    return <img src={photo} alt="Foto da limpeza" className="w-full h-32 object-cover rounded-lg" />;
  };

  const sortedCleanings = [...cleanings].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0;
  });

  if (loading) {
    return <p>Carregando limpezas...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Limpezas Agendadas</h1>

      <Link
      to="/create-cleaning"
      className="bg-blue-500 text-white p-2 rounded-md mb-4"
    >
      Agendar Limpeza
    </Link>

      {cleanings.length === 0 ? (
        <p className="mt-4 text-lg text-gray-700">Nenhuma limpeza agendada.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedCleanings.map((cleaning) => (
            <div key={cleaning.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-xl font-semibold">{`Propriedade: ${cleaning.property_id}`}</h2>
              <p className="text-gray-600">{`Cliente: ${cleaning.client_name}`}</p>
              <p className="text-gray-600">{`Faxineiro: ${cleaning.cleaner_name}`}</p>
              <p className="text-gray-600">{`Data: ${new Date(cleaning.start_time).toLocaleDateString()}`}</p>
              <p className="text-gray-600">{`Início: ${new Date(cleaning.start_time).toLocaleTimeString()} - Término: ${new Date(cleaning.end_time).toLocaleTimeString()}`}</p>

              <p className="text-sm font-semibold mb-2">
                <strong>Status:</strong> 
                <span className={getStatusColor(cleaning.status)}>
                  {cleaning.status}
                </span>
              </p>

              <p className="text-gray-600">{`Suítes: ${cleaning.suites || 'Não especificado'}`}</p>

              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col w-full">
                    <strong>Foto Antes:</strong>
                    {getPhotoPlaceholder(cleaning.before_photo)}
                  </div>
                  <div className="flex flex-col w-full mt-2 sm:mt-0">
                    <strong>Foto Depois:</strong>
                    {getPhotoPlaceholder(cleaning.after_photo)}
                  </div>
                </div>
              </div>

              <a
                href={cleaning.google_event_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold mt-4 block"
              >
                Ver no Google Calendar
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
