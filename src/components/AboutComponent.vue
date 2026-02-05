<template>
  <div>
    <button class="btn primary" @click="consultarAll">Listar Todos</button>

    <div class="bloque">
      <input v-model.number="id" placeholder="ID" />
      <button class="btn" @click="consultarPorId">Consultar Por Id</button>
    </div>

    <div class="bloque form" style="margin:10px 0;">
      <input v-model="body.nombre" placeholder="Nombre" />
      <input v-model="body.apellido" placeholder="Apellido" />
      <input v-model="body.fechaNacimiento" placeholder="YYYY-MM-DDT00:00:00" />

      <!-- botones juntos -->
      <div class="btn-row">
        <button class="btn success" @click="crear">Crear</button>
        <button class="btn warning" @click="actualizar">Actualizar</button>
        <button class="btn info" @click="actualizarParcial">Actualizar Parcial</button>
      </div>
    </div>

    <div class="bloque">
      <input v-model.number="id" placeholder="ID" />
      <button class="btn danger" @click="eliminar">Eliminar</button>
    </div>
  </div>
</template>


<script>
import { obtenerTokenFachada } from "@/client/Authorization.js";
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
        const token = await obtenerTokenFachada();
        const data = await consultarTodosFachada(token); // <-- FIX
        console.log("CONSULTAR TODOS:", data);
      },

      async consultarPorId() {
        if (!this.id) return console.warn("Ingresa un ID");
        const token = await obtenerTokenFachada();
        const data = await consultarPorIdFachada(this.id, token);
        console.log("CONSULTAR POR ID:", data);
      },

      async crear() {
        const token = await obtenerTokenFachada();
        const data = await guardarFachada(this.body, token);
        console.log("CREAR:", data);
      },

      async actualizar() {
        if (!this.id) return console.warn("Ingresa un ID");
        const token = await obtenerTokenFachada();
        const data = await actualizarFachada(this.id, this.body, token);
        console.log("ACTUALIZAR:", data);
      },

      async actualizarParcial() {
        if (!this.id) return console.warn("Ingresa un ID");
        const token = await obtenerTokenFachada();
        const data = await actualizarParcialFachada(this.id, this.body, token);
        console.log("ACTUALIZAR PARCIAL:", data);
      },

      async eliminar() {
        if (!this.id) return console.warn("Ingresa un ID");
        const token = await obtenerTokenFachada();
        await borrarFachada(this.id, token);
        console.log("ELIMINADO ID:", this.id);
      },
    },
};
</script>
<style scoped>
/* contenedor general */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* cada bloque */
.bloque {
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

/* Inputs */
input {
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  outline: none;
  background: #fff;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);
}

/* Botones base */
.btn {
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 800;
  background: #e5e7eb;
  color: #111827;
  transition: transform .08s ease, filter .15s ease;
}

.btn:hover {
  filter: brightness(.96);
}

.btn:active {
  transform: scale(.98);
}

/* Colores */
.primary {
  background: #2563eb;
  color: #fff;
}

.success {
  background: #22c55e;
  color: #fff;
}

.warning {
  background: #f59e0b;
  color: #fff;
}

.info {
  background: #06b6d4;
  color: #fff;
}

.danger {
  background: #ef4444;
  color: #fff;
}

/* fila de botones (crear/actualizar/parcial) */
.btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr;
  gap: 10px;
}

.btn-row .btn {
  width: 100%;
  font-size: 13px;
  padding: 10px;
}

/* responsive */
@media (max-width: 420px) {
  .bloque {
    width: 92vw;
  }

  .btn-row {
    grid-template-columns: 1fr;
  }
}
</style>
