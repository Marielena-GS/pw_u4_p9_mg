<template>
  <div style="padding: 20px;">
    <h2>Todos los Estudiantes</h2>
    <button @click="cargar()">Cargar</button>
    <ul>
      <li v-for="est in estudiantes" :key="est.id">
        ID: {{ est.id }} - {{ est.nombre }} {{ est.apellido }}
      </li>
    </ul>
  </div>
</template>

<script>
import { consultarTodosFachada } from '@/client/MatriculaClient.js';

export default {
  data() {
    return {
      estudiantes: []
    }
  },
  methods: {
    async cargar() {
      try {
        this.estudiantes = await consultarTodosFachada();
      } catch (e) {
        alert('Error: ' + e.message);
      }
    }
  },
  mounted() {
    this.cargar();
  }
}
</script>

<style>
</style>