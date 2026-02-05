import axios from "axios"

const BASE = "http://localhost:8081/matricula/api/v1.0/estudiantes";
const authHeader = (token) => (
    {
        headers: { Authorization: `Bearer ${token}` },
    });

const consultarTodos = async (token) => {
    const data = await axios.get(BASE, authHeader(token));
    console.log(data);
    return data.data;
}

const consultarPorId = async (id, token) => {
    const { data } = await axios.get(`${BASE}/${id}`, authHeader(token));
    console.log(data);
    return data;
}

const guardar = async (body, token) => {

    /*const objeto = {
        nombre: 'Marielena',
        apellido: 'Gonzalez'
    }*/

    const { data } = await axios.post(BASE, body, authHeader(token));
    console.log(data);
    return data;
}

const actualizar = async (id, body, token) => {
    const { data } = await axios.put(`${BASE}/${id}`, body, authHeader(token));
    console.log(data);
    return data;
}

const actualizarParcial = async (id, body, token) => {
    const { data } = await axios.patch(`${BASE}/${id}`, body, authHeader(token));
    console.log(data);
    return data;
}

const borrar = async (id, token) => {
    const { data } = await axios.delete(`${BASE}/${id}`, authHeader(token));
    return data;
}




export const consultarTodosFachada = async (token) => {
    return await consultarTodos(token);
}

export const consultarPorIdFachada = async (id, token) => {
    return await consultarPorId(id, token);
}

export const guardarFachada = async (body, token) => {

    return await guardar(body, token);
}

export const actualizarFachada = async (id, body, token) => {
    return await actualizar(id, body, token);
}

export const actualizarParcialFachada = async (id, body, token) => {
    return await actualizarParcial(id, body, token);
}

export const borrarFachada = async (id, token) => {
    return await borrar(id, token);
}

