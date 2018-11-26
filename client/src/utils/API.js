import axios from "axios";

export const API = {

  // USER AUTHENTICATION ROUTES
  // Get user info
  getUser: function () {
    return axios.get('/user');
  },
  // Get user info for profile (excludes some data)
  getUserProfileData: function () {
    return axios.get('/user/data');
  },
  // User updates their own info
  updateUserInfo: function (userData) {
    return axios.put('/user/data', userData);
  },
  // New user signup
  signup: function (signupData) {
    return axios.post('/user', signupData);
  },
  // User login
  login: function (loginData) {
    return axios.post('/user/login', loginData);
  },
  // User logout
  logout: function () {
    return axios.post('/user/logout');
  },
  //  Checks current password and returns error message if incorrect, or changes it if correct
  changePassword: function (pwData) {
    return axios.post('/user/change', pwData);
  },



  getTexts: function () {
    return axios.get('/api/text');
  },

  createText: function (textData) {
    return axios.post('/api/text', textData);
  },

  updateText: function (id, textData) {
    return axios.put(`/api/text/${id}`, textData);
  },

  updateTextSubject: function (textId, changeData) {
    return axios.put(`/api/text/subject/${textId}`, changeData);
  },

  deleteText: function (id) {
    return axios.delete(`/api/text/${id}`);
  },


  getProjects: function () {
    return axios.get('/api/project');
  },

  createProject: function (projectData) {
    return axios.post('/api/project', projectData)
  },

  updateProject: function (id, projectData) {
    return axios.put(`/api/project/${id}`, projectData)
  },

  createSubject: function (subjectData) {
    return axios.post('/api/subject', subjectData);
  },

  getSubjects: function () {
    return axios.get('/api/subject');
  },

  getSingleSubject: function (id) {
    return axios.get(`/api/subject/${id}`);
  }
};
