  //Token Log in
  const JWT_SECRET = "jwt";
  export const setToken = (token) => localStorage.setItem(JWT_SECRET, token);

  export const getToken = () => {
    return localStorage.getItem(JWT_SECRET);
  };

  export const removeToken = () => {
    return localStorage.removeItem(JWT_SECRET);
  };