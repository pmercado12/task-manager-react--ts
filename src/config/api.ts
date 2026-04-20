/**
 * Configuración de la URL del API
 * Usa variables de entorno para ambiente dinámico
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  TASKS: `${API_BASE_URL}/tasks`,
};
