import axios from 'axios';
import { WorkingDay, Task } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const plannerApi = {
  // Working Day endpoints
  getTodayWorkingDay: async (): Promise<WorkingDay> => {
    const response = await api.get('/today/');
    return response.data;
  },

  updateTodayWorkingDay: async (data: Partial<WorkingDay>): Promise<WorkingDay> => {
    const response = await api.put('/today/', data);
    return response.data;
  },

  // Task endpoints
  getTodayTasks: async (): Promise<Task[]> => {
    const response = await api.get('/today/tasks/');
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> => {
    const response = await api.post('/today/tasks/', task);
    return response.data;
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}/`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}/`);
  },
};

export default plannerApi;