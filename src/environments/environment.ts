export const environment = {
  production: false,
  // MasterApi: "http://localhost:5000/api/v1",
  MasterApi: "https://api.postnew.in/api/v1",
  cookieConfig: {
    secure: false, // True for HTTPS
    sameSite: 'Strict', // Prevents cross-site attacks
    httpOnly: false, // Only set to true if using cookies in backend
    path: '/',
  }
};
