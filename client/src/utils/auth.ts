import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<JwtPayload>(this.getToken()) as JwtPayload;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp ? decodedToken.exp < currentTime : false;
    }
    catch (error) {
      console.error('Error decoding token:', error);
      return true; // Assume expired if there's an error
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('token') || '';
    return token ? token : '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
