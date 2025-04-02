export const environment = {
  production: true,
  MasterApi: "http://localhost:5000/api/v1",
  // MasterApi: "https://api.postnew.in/api/v1",
  cookieConfig: {
    secure: true, // True for HTTPS
    sameSite: 'Strict', // Prevents cross-site attacks
    httpOnly: true, // Only set to true if using cookies in backend
    path: '/',
  }
};
