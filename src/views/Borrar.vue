<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2>Borrar Estudiante</h2>
      </div>

      <div class="form">
        <div class="field">
          <label>ID *</label>
          <input v-model.number="id" type="number" placeholder="Ej: 10" />
        </div>
      </div>

      <div class="actions">
        <button class="btn danger" @click="confirmar = true" :disabled="!id">Borrar</button>
        <button class="btn ghost" @click="limpiar">Limpiar</button>
      </div>

      <div v-if="mensaje" class="msg" :class="ok ? 'ok' : 'err'">{{ mensaje }}</div>

      <div v-if="confirmar" class="confirm">
        <p>¿Seguro que deseas borrar el estudiante con ID <b>{{ id }}</b>?</p>
        <div class="confirm-actions">
          <button class="btn danger" @click="borrar">Sí, borrar</button>
          <button class="btn ghost" @click="confirmar = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { borrarFachada } from "@/client/MatriculaClient.js";

export default {
  data() {
    return {
      id: null,
      mensaje: "",
      ok: true,
      confirmar: false,
    };
  },
  methods: {
    limpiar() {
      this.id = null;
      this.mensaje = "";
      this.ok = true;
      this.confirmar = false;
    },

    async borrar() {
      if (!this.id) {
        this.ok = false;
        this.mensaje = "Ingresa un ID válido";
        return;
      }

      try {
        await borrarFachada(this.id);
        this.ok = true;
        this.mensaje = `Estudiante con ID ${this.id} eliminado correctamente`;
        this.confirmar = false;
      } catch (e) {
        this.ok = false;
        this.confirmar = false;

        const status = e?.response?.status;
        this.mensaje =
          status === 404
            ? "No existe un estudiante con ese ID"
            : "Error al borrar: " +
              (e?.response?.data?.message || e.message);
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 30px 16px;
  display: flex;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 560px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.header h2 {
  margin: 0;
  text-align: center;
  color: #991b1b;
}

.form {
  display: flex;
  justify-content: center;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 240px;
}

label {
  font-size: 12px;
  font-weight: 900;
  color: #6b7280;
}

input {
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  outline: none;
  background: #fff;
}

input:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 11px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 900;
  background: #e5e7eb;
  color: #111827;
}

.btn.danger {
  background: #ef4444;
  color: #fff;
}

.btn.ghost {
  background: #e5e7eb;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.msg {
  margin: 14px auto 0;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-weight: 800;
  text-align: center;
  max-width: 420px;
}

.msg.ok {
  background: #dcfce7;
  border-color: #86efac;
  color: #166534;
}

.msg.err {
  background: #fff1f2;
  border-color: #fecaca;
  color: #991b1b;
}

.confirm {
  margin-top: 18px;
  padding: 16px;
  border-radius: 14px;
  background: #fff1f2;
  border: 1px solid #fecaca;
  text-align: center;
}

.confirm-actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 520px) {
  .field {
    width: 100%;
  }
}
</style>
