import axios from "axios"

const TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJtYXRyaWN1bGEtYXV0aCIsInN1YiI6Ik1hcmllbGVuYSIsImdyb3VwcyI6WyJhZG1pbiJdLCJpYXQiOjE3NzAyNDgzMzUsImV4cCI6MTc3MDI1MTkzNSwianRpIjoiODMyNjMyNDQtYmVlNC00NjY0LWE5YjEtYmI2Y2QxYTEwYzdmIn0.cXE5C881Ltq1V-iIAYYOv28NQ8Za5ELDcTxW8O8TasPOgDJVw3YIMqFDJdxnDUluGs1lbP6KRYBgE0XqyXLDBzSTIiOlm38ZZbmwqx3xwOdfccppGC8xUkSv4JoXYppzdNhtGfIeM9JMGsr_2u34br9zsfLRece-ZlHxFywz0WfsPKdQC2YaEZpq8DZaOpJqXGeeYbd3clK8WFWVQJ9wNPOlzXprUXIbZPiLWe63Rult7IQPoFxWCIMOSZK_Opv5uDbD6xnmzA6jlx_wiJmPtJ5SwzRm6266hBWFT6B4jm_5rX0rIzVJDQO_mz8HQA1YQqNFyTCg620H7lBRBIM34g"; 

const URL="http://localhost:8081/matricula/api/v1.0/estudiantes";

const consultarTodos = async() => {
    const data = await axios.get(`${URL}`,{headers: {Authorization: `Bearer ${TOKEN}`}}).then(r => r.data)
    return data;
}

const consultarPorId = async(id) => {
    const data = await axios.get(`${URL}/${id}`, {headers:{Authorization: `Bearer ${TOKEN}`}}).then(r => r.data)
    return data;
}

const guardar = async(body) => {

    /*const objeto = {
        nombre: 'Marielena',
        apellido: 'Gonzalez'
    }*/

     
    const data = await axios.post(`${URL}`, body, {headers: {Authorization: `Bearer ${TOKEN}`}}).then(r => r.data);
    console.log(data);
    return data;
}

const actualizar = async(id, body) => {
    const data = await axios.put(`${URL}/${id}`, body, {headers: {Authorization: `Bearer ${TOKEN}`}}).then(r => r.data);

    console.log(data);
    return data;
}

const actualizarParcial = async(id, body) => {
    const data = await axios.patch(`${URL}/${id}`, body, {headers: {Authorization: `Bearer ${TOKEN}`}}).then(r => r.data);
    console.log(data);
    return data;
}

const borrar = async(id) => {
   const data = await axios.delete(`${URL}/${id}`, {headers: {Authorization: `Bearer ${TOKEN}`}}).then(r => r.data);
   return data;
}




export const consultarTodosFachada  = async () => {
   return await consultarTodos();
}

export const consultarPorIdFachada  = async (id) => {
    return await consultarPorId(id);
}

export const guardarFachada  = async (body) => {

    return await guardar(body);
}

export const actualizarFachada  = async (id, body) => {
    return await actualizar(id, body);
}

export const actualizarParcialFachada  = async(id, body) => {
    return await actualizarParcial(id, body);
}

export const borrarFachada = async (id) => {
   return await borrar(id);
}

