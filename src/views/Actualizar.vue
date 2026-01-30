<template>
  <div style="padding: 20px;">
    <h2>Actualizar Estudiante</h2>
    <label>ID: <input v-model="id" type="number"></label><br><br>
    <label>Nombre: <input v-model="nombre"></label><br><br>
    <label>Apellido: <input v-model="apellido"></label><br><br>
    <button @click="actualizar()">Actualizar</button>
    <div v-if="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script>
import { actualizarFachada } from '@/client/MatriculaClient.js';

export default {
  data() {
    return {
      id: '',
      nombre: '',
      apellido: '',
      mensaje: ''
    }
  },
  methods: {
    async actualizar() {
      try {
        await actualizarFachada(this.id, { nombre: this.nombre, apellido: this.apellido });
        this.mensaje = 'Actualizado correctamente';
      } catch (e) {
        this.mensaje = 'Error: ' + e.message;
      }
    }
  }
}
</script>

<style>
</style>