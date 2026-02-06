import axios from "axios";
import { obtenerTokenFachada } from "@/client/Authorization.js";

const BASE = "http://localhost:8081/matricula/api/v1.0/estudiantes";

const authHeader = async () => {
  const token = await obtenerTokenFachada();
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const consultarTodos = async () => {
  const res = await axios.get(BASE, await authHeader());
  return res.data;
};

const consultarPorId = async (id) => {
  const { data } = await axios.get(`${BASE}/${id}`, await authHeader());
  return data;
};

const guardar = async (body) => {
  const { data } = await axios.post(BASE, body, await authHeader());
  return data;
};

const actualizar = async (id, body) => {
  const { data } = await axios.put(`${BASE}/${id}`, body, await authHeader());
  return data;
};

const actualizarParcial = async (id, body) => {
  const { data } = await axios.patch(`${BASE}/${id}`, body, await authHeader());
  return data;
};

const borrar = async (id) => {
  const { data } = await axios.delete(`${BASE}/${id}`, await authHeader());
  return data;
};

// Fachadas (sin token, porque ya lo obtiene solo)
export const consultarTodosFachada = async () => await consultarTodos();
export const consultarPorIdFachada = async (id) => await consultarPorId(id);
export const guardarFachada = async (body) => await guardar(body);
export const actualizarFachada = async (id, body) => await actualizar(id, body);
export const actualizarParcialFachada = async (id, body) => await actualizarParcial(id, body);
export const borrarFachada = async (id) => await borrar(id);
