import apiClient from './apiClient';

const RESOURCE_UPDATE_EVENT = 'vantalog:resources-updated';

function notifyResourcesUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(RESOURCE_UPDATE_EVENT));
  }
}

/**
 * Resource Service
 * Handles all resource-related API calls (CRUD operations for educational resources)
 */
const resourceService = {
  /**
   * Get all resources with pagination and filters
   * @param {Object} params - { page, size, category, search, sort }
   * @returns {Promise<Object>} - { resources: [], totalPages, totalElements, currentPage }
   */
  getAllResources: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await apiClient.get(`/resources?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get resource by ID
   * @param {string} resourceId - Resource ID
   * @returns {Promise<Object>} - Resource object
   */
  getResourceById: async (resourceId) => {
    try {
      const response = await apiClient.get(`/resources/${resourceId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search resources
   * @param {Object} searchParams - { query, category, type, page, size }
   * @returns {Promise<Object>} - { resources: [], totalPages, totalElements }
   */
  searchResources: async (searchParams) => {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await apiClient.get(`/resources/search?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get resources by category
   * @param {string} category - Category name
   * @param {Object} params - { page, size }
   * @returns {Promise<Object>} - { resources: [], totalPages, totalElements }
   */
  getResourcesByCategory: async (category, params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await apiClient.get(`/resources/category/${category}?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload new resource (Admin only)
   * @param {FormData} resourceData - FormData with resource details and file
   * @returns {Promise<Object>} - { message, resourceId }
   */
  uploadResource: async (resourceData) => {
    try {
      const response = await apiClient.post('/resources', resourceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      notifyResourcesUpdated();
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update resource (Admin only)
   * @param {string} resourceId - Resource ID
   * @param {FormData} resourceData - Updated resource data
   * @returns {Promise<Object>} - { message, resource }
   */
  updateResource: async (resourceId, resourceData) => {
    try {
      const response = await apiClient.put(`/resources/${resourceId}`, resourceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      notifyResourcesUpdated();
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete resource (Admin only)
   * @param {string} resourceId - Resource ID
   * @returns {Promise<Object>} - { message }
   */
  deleteResource: async (resourceId) => {
    try {
      const response = await apiClient.delete(`/resources/${resourceId}`);
      notifyResourcesUpdated();
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download resource file
   * @param {string} resourceId - Resource ID
   * @returns {Promise<Blob>} - File blob
   */
  downloadResource: async (resourceId) => {
    try {
      const response = await apiClient.get(`/resources/${resourceId}/download`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get resource categories
   * @returns {Promise<Array>} - Array of categories
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get('/resources/categories');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get resource statistics (Admin only)
   * @returns {Promise<Object>} - { totalResources, byCategory, recentUploads }
   */
  getResourceStats: async () => {
    try {
      const response = await apiClient.get('/resources/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get featured/recommended resources
   * @param {number} limit - Number of resources to return
   * @returns {Promise<Array>} - Array of featured resources
   */
  getFeaturedResources: async (limit = 6) => {
    try {
      const response = await apiClient.get(`/resources/featured?limit=${limit}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Track resource download/view
   * @param {string} resourceId - Resource ID
   * @returns {Promise<Object>} - { message }
   */
  trackResourceAccess: async (resourceId) => {
    try {
      const response = await apiClient.post(`/resources/${resourceId}/track`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  resourceUpdateEvent: RESOURCE_UPDATE_EVENT,
};

export default resourceService;
