import axios from "axios";

export const API = {

  fetchPublicWorks: function (username) {
    return axios.get(`/user/public/${username}`);
  },

  // USER AUTHENTICATION ROUTES
  // Get user info
  getCurrentUser: function (headers) {
    return axios.get('/user', { ...headers });
  },

  getUserWithProjects: function (headers) {
    return axios.get('/user/projects', { ...headers });
  },

  // User updates their own info
  updateUserInfo: function (userData, headers) {
    return axios.put('/user', userData, { ...headers });
  },

  updateUserOrder: function (order, headers) {
    return axios.put('/user/order', order, { ...headers });
  },
  // New user signup
  signup: function (signupData) {
    return axios.post('/user', signupData);
  },
  // User login
  login: function (loginData) {
    return axios.post('/user/login', loginData);
  },
  //  Checks current password and returns error message if incorrect, or changes it if correct
  changePassword: function (pwData, headers) {
    return axios.post('/user/change', pwData, { ...headers });
  },

  saveImage: function (imageData, headers) {
    return axios.post('/api/image/upload', imageData, { ...headers });
  },

  getImage: function (id, headers) {
    return axios.get(`/api/image/${id}`, { ...headers })
  },

  getImages: function (headers) {
    return axios.get('/api/image/all', { ...headers });
  },

  removeImage: function (id, data, headers) {
    return axios.put(`/api/image/${id}`, data, { ...headers });
  },

  getTexts: function (headers) {
    return axios.get('/api/text');
  },

  createText: function (textData, headers) {
    return axios.post('/api/text', textData, { ...headers });
  },

  updateText: function (id, textData, headers) {
    return axios.put(`/api/text/${id}`, textData, { ...headers });
  },

  updateTextSubject: function (textId, changeData, headers) {
    return axios.put(`/api/text/subject/${textId}`, changeData, { ...headers });
  },

  deleteText: function (id, headers) {
    return axios.delete(`/api/text/${id}`, { ...headers });
  },

  removeTextImage: function (id, data, headers) {
    return axios.put(`/api/text/image/${id}`, data, { ...headers });
  },


  getProjectsWithAll: function (headers) {
    return axios.get('/api/project', { ...headers });
  },

  getSingleProject: function (projectId, headers) {
    return axios.get(`/api/project/${projectId}`, { ...headers });
  },

  getSingleProjectWithAll: function (projectId, headers) {
    return axios.get(`/api/project/all/${projectId}`, { ...headers });
  },

  createProject: function (projectData, headers) {
    return axios.post('/api/project', projectData, { ...headers })
  },

  updateProject: function (id, projectData, headers) {
    return axios.put(`/api/project/${id}`, projectData, { ...headers })
  },

  deleteProject: function (id, headers) {
    return axios.delete(`/api/project/${id}`, { ...headers });
  },

  removeProjectImage: function (id, data, headers) {
    return axios.put(`/api/project/image/${id}`, data, { ...headers });
  },


  getSubjects: function (headers) {
    return axios.get('/api/subject', { ...headers });
  },

  getSingleSubject: function (id, headers) {
    return axios.get(`/api/subject/${id}`, { ...headers });
  },

  createSubject: function (subjectData, headers) {
    return axios.post('/api/subject', subjectData, { ...headers });
  },

  updateSubject: function (id, updateData, headers) {
    return axios.put(`/api/subject/${id}`, updateData, { ...headers });
  },

  deleteSubject: function (id, headers) {
    return axios.delete(`/api/subject/${id}`, { ...headers });
  },

  removeSubjectImage: function (id, data, headers) {
    return axios.put(`/api/subject/image/${id}`, data, { ...headers });
  }
};
