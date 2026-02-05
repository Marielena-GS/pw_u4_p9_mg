import axios from "axios"

const URL = "http://localhost:8082/auth/token";
const USER = {
    user: "Marielena",
    password: "123",
    role:"admin"
}

const obtenerToken = async () => {
  const { data } = await axios.post(URL, USER)
  return data
}


export const obtenerTokenFachada = async () => {
    return await obtenerToken();
}


