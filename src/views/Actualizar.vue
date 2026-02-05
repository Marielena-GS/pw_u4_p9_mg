<template>
  <div class="container">
    <div class="card">
      <h2 class="h2">Actualizar Estudiante</h2>

      <div class="grid">
        <div class="field">
          <label>ID *</label>
          <input v-model.number="id" type="number" placeholder="Ej: 10" />
        </div>

        <div class="field">
          <label>Nombre</label>
          <input v-model="body.nombre" placeholder="Ej: Marielena" />
        </div>

        <div class="field">
          <label>Apellido</label>
          <input v-model="body.apellido" placeholder="Ej: González" />
        </div>

        <div class="field">
          <label>Fecha Nacimiento</label>
          <input v-model="body.fechaNacimiento" placeholder="2004-01-01T00:00:00"/>
        </div>

        <div class="field">
          <label>Provincia</label>
          <input v-model="body.provincia" placeholder="Ej: Esmeraldas" />
        </div>

        <div class="field">
          <label>Género</label>
          <select v-model="body.genero">
            <option value="">Seleccione</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-warning" @click="actualizar">Actualizar</button>
        <button class="btn btn-ghost" @click="limpiar">Limpiar</button>
      </div>

      <div v-if="mensaje" class="msg" :class="ok ? 'ok' : 'err'">{{ mensaje }}</div>

      <div v-if="actualizado" class="result">
        <span class="badge">Estudiante actualizado</span>
        <p>
          <b>ID:</b> {{ actualizado.id }} <br />
          <b>Nombre:</b> {{ actualizado.nombre }} <br />
          <b>Apellido:</b> {{ actualizado.apellido }} <br />
          <b>Provincia:</b> {{ actualizado.provincia }} <br />
          <b>Género:</b> {{ actualizado.genero }} <br />
          <b>Fecha:</b> {{ actualizado.fechaNacimiento }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { actualizarFachada } from "@/client/MatriculaClient.js";

export default {
  data() {
    return {
      id: null,
      body: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "2000-01-01T00:00:00",
        provincia: "",
        genero: "",
      },
      actualizado: null,
      mensaje: "",
      ok: true,
    };
  },
  methods: {
    limpiar() {
      this.id = null;
      this.body = {
        nombre: "",
        apellido: "",
        fechaNacimiento: "2000-01-01T00:00:00",
        provincia: "",
        genero: "",
      };
      this.actualizado = null;
      this.mensaje = "";
    },

    async actualizar() {
      if (!this.id) {
        this.ok = false;
        this.mensaje = "Debes ingresar un ID válido";
        return;
      }

      try {
        const resp = await actualizarFachada(this.id, this.body);
        this.actualizado = resp;
        this.ok = true;
        this.mensaje = `Estudiante con ID ${resp.id} actualizado correctamente`;
      } catch (e) {
        this.actualizado = null;
        this.ok = false;
        const status = e?.response?.status;
        this.mensaje =
          status === 404
            ? "No existe un estudiante con ese ID"
            : "Error al actualizar: " +
              (e?.response?.data?.message || e.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.h2 {
  text-align: center;
  margin-bottom: 25px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
}

input,
select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-ghost {
  background: #e5e7eb;
}

.msg {
  margin-top: 15px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.msg.ok {
  background: #dcfce7;
  color: #166534;
}

.msg.err {
  background: #fee2e2;
  color: #991b1b;
}

.result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background: #f9fafb;
}

.badge {
  display: inline-block;
  background: #fde68a;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  margin-bottom: 8px;
}
</style>
