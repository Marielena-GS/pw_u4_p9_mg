<template>
  <div>
    <button @click="consultarAll">Consultar Todos</button>
    <div style="margin:10px 0;">
      <input v-model.number="id" placeholder="ID" />
      <button @click="consultarPorId">Consultar Por Id</button>
    </div>

    <div style="margin:10px 0;">
      <input v-model="body.nombre" placeholder="Nombre" />
      <input v-model="body.apellido" placeholder="Apellido" />
      <input v-model="body.fechaNacimiento" placeholder="YYYY-MM-DDT00:00:00" />
      <button @click="crear">Crear</button>
      <button @click="actualizar">Actualizar</button>
      <button @click="actualizarParcial">Actualizar Parcial</button>
    </div>

    <div style="margin:10px 0;">
      <input v-model.number="id" placeholder="ID" />
      <button @click="eliminar">Eliminar</button>
    </div>
  </div>
</template>

<script>
import {
  consultarPorIdFachada,
  consultarTodosFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada,
  guardarFachada,
} from "../client/MatriculaClient.js";

export default {

  data() {
    return {
      id: null,
      body: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "2000-01-01T00:00:00",
      },
    };
  },
  methods: {
    async consultarAll() {
      const data = await consultarTodosFachada();
      console.log("CONSULTAR TODOS:", data);
    },

    async consultarPorId() {
      if (!this.id) return console.warn("Ingresa un ID");
      const data = await consultarPorIdFachada(this.id);
      console.log("CONSULTAR POR ID:", data);
    },

    async crear() {
      const data = await guardarFachada(this.body);
      console.log("CREAR:", data);
    },

   
    async actualizar() {
      if (!this.id) return console.warn("Ingresa un ID");
      const data = await actualizarFachada(this.id, this.body);
      console.log("ACTUALIZAR:", data);
    },

    async actualizarParcial() {
      if (!this.id) return console.warn("Ingresa un ID");
      const data = await actualizarParcialFachada(this.id, this.body);
      console.log("ACTUALIZAR PARCIAL:", data);
    },

    async eliminar() {
      if (!this.id) return console.warn("Ingresa un ID");
      await borrarFachada(this.id);
      console.log("ELIMINADO ID:", this.id);
    },
  }
};
</script>
