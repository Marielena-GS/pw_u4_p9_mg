import axios from "axios";

const URL = "http://localhost:8082/auth/token";

// claves que ya se usa
const LS_TOKEN = "token";
const LS_AUTH = "estaAutenticado";

// login REAL: pide token al backend con user/password 
export const loginFachada = async (user, password) => {
  const { data } = await axios.get(URL, {
    params: { user, password },
  });

  const token = data?.accessToken;

  if (!token) {
    throw new Error("No se recibió accessToken desde /auth/token");
  }
  console.log("TOKEN GENERADO:", token);

  localStorage.setItem(LS_TOKEN, token);
  localStorage.setItem(LS_AUTH, "true");

  return data;
};

export const obtenerTokenFachada = async () => {
  return localStorage.getItem(LS_TOKEN);
};

export const estaAutenticadoFachada = () => {
  return localStorage.getItem(LS_AUTH) === "true" && !!localStorage.getItem(LS_TOKEN);
};

// logout
export const logoutFachada = async () => {
  localStorage.removeItem(LS_TOKEN);
  localStorage.removeItem(LS_AUTH);
};
