import axios from "axios"

const URL = "http://localhost:8082/auth/token";
const USER = {
    user: "Marielena",
    password: "123"
}

const obtenerToken = async () => {
  const { data } = await axios.get(URL, {
    params: { user: USER.user, password: USER.password},
  });
  return data.accessToken;
}


export const obtenerTokenFachada = async () => {
    return await obtenerToken();
}


