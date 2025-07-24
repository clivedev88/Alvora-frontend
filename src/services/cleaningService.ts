import axios from 'axios';
import { API_URL } from '../config/config';
interface CleaningData {
  clientName: string;
  cleanerName: string;
  startDateTime: string;
  endDateTime: string;
  suites: number;
  propertyId: number;
}

export const getCleanings = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-cleanings`);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao buscar limpezas: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao buscar limpezas.');
    }
  }
};

export const createCleaning = async (cleaningData: CleaningData) => {
  try {
    const response = await axios.post(`${API_URL}`, cleaningData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao criar agendamento de limpeza: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao criar agendamento.');
    }
  }
};
