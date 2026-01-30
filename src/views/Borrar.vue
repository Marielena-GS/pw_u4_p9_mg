<template>
  <div style="padding: 20px;">
    <h2>Borrar Estudiante</h2>
    <label>ID: <input v-model="id" type="number"></label><br><br>
    <button @click="borrar()">Borrar</button>
    <div v-if="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script>
import { borrarFachada } from '@/client/MatriculaClient.js';

export default {
  data() {
    return {
      id: '',
      mensaje: ''
    }
  },
  methods: {
    async borrar() {
      try {
        await borrarFachada(this.id);
        this.mensaje = 'Eliminado correctamente';
      } catch (e) {
        this.mensaje = 'Error: ' + e.message;
      }
    }
  }
}
</script>

<style>
</style>
