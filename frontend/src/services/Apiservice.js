import axios from 'axios';

// Backend API base URL - Update based on your .env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Submit a threat report to backend (MongoDB)
 * POST /api/reports
 * 
 * @param {Object} reportData 
 * @param {string} reportData.wallet - User wallet address
 * @param {string} reportData.category - "Malware" or "Phishing"
 * @param {string} reportData.data - Report content (will be encrypted by backend)
 * @returns {Promise<Object>} { message, reportId, hash }
 */
export const submitReport = async (reportData) => {
  try {
    const { wallet, category, data } = reportData;
    
    if (!wallet || !category || !data) {
      throw new Error('Missing required fields: wallet, category, or data');
    }
    
    if (!['Malware', 'Phishing'].includes(category)) {
      throw new Error('Category must be "Malware" or "Phishing"');
    }
    
    const response = await api.post('/reports', {
      wallet,
      category,
      data
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all reports from backend
 * GET /api/reports
 * 
 * @returns {Promise<Array>} Array of report objects
 */
export const getReports = async () => {
  try {
    const response = await api.get('/reports');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get reports by wallet address (filter client-side)
 * Since your backend doesn't have this endpoint, we'll filter after fetching all
 * 
 * @param {string} walletAddress - Wallet address to filter by
 * @returns {Promise<Array>} Filtered reports
 */
export const getReportsByWallet = async (walletAddress) => {
  try {
    const allReports = await getReports();
    return allReports.filter(report => 
      report.wallet?.toLowerCase() === walletAddress?.toLowerCase()
    );
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Health check for backend API
 * GET /
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(API_BASE_URL.replace('/api', ''));
    return { online: true, message: response.data };
  } catch (error) {
    return { online: false, error: error.message };
  }
};

export default api;