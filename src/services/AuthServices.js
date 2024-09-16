import $api from '../http/axios';
import axios from 'axios';

export default class AuthServices {
  static async login(email, password) {
    return await $api.post('/api/user/login', { email, password });
  }
  static async registration(email, password, name, role) {
    return await $api.post('/api/user/registration', { email, password, name, role });
  }
  static async logout() {
    return $api.post('/api/user/logout');
  }
  static async autoLogin() {
    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, {
      withCredentials: true,
    });
  }
  
  static async forgotPassword(email) {
    return await $api.put('/api/user/forgot-password', { email });
  }
  static async resetPassword(newPass, resetLink) {
    return await $api.put('/api/user/reset-password', { newPass, resetLink });
  }
  static async getGoogleRedirectUrl() {
    return await $api.get('/api/user/auth/google/url');
  }
  static async getGoogleUser() {
    return await $api.get('/api/user/auth/me');
  }
}
