<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2>Actualizar Parcial (PATCH)</h2>
      </div>

      <div class="grid">
        <div class="field">
          <label>ID *</label>
          <input v-model.number="id" type="number" placeholder="Ej: 10" />
        </div>

        <div class="field">
          <label>Nombre</label>
          <input v-model="body.nombre" placeholder="Dejar vacío si no cambia" />
        </div>

        <div class="field">
          <label>Apellido</label>
          <input v-model="body.apellido" placeholder="Dejar vacío si no cambia" />
        </div>

        <div class="field">
          <label>Fecha Nacimiento</label>
          <input v-model="body.fechaNacimiento" placeholder="YYYY-MM-DDT00:00:00" />
        </div>

        <div class="field">
          <label>Provincia</label>
          <input v-model="body.provincia" placeholder="Dejar vacío si no cambia" />
        </div>

        <div class="field">
          <label>Género (opcional)</label>
          <select v-model="body.genero">
            <option value="">No cambiar</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div class="actions">
        <button class="btn info" @click="patch">Actualizar Parcial</button>
        <button class="btn ghost" @click="limpiar">Limpiar</button>
      </div>

      <div v-if="mensaje" class="msg" :class="ok ? 'ok' : 'err'">{{ mensaje }}</div>

      <div v-if="actualizado" class="result">
        <span class="badge">Resultado</span>
        <p>
          <b>ID:</b> {{ actualizado.id }} <br />
          <b>Nombre:</b> {{ actualizado.nombre }} <br />
          <b>Apellido:</b> {{ actualizado.apellido }} <br />
          <b>Fecha:</b> {{ actualizado.fechaNacimiento }} <br />
          <b>Provincia:</b> {{ actualizado.provincia }} <br />
          <b>Género:</b> {{ actualizado.genero }}
        </p>

        <div v-if="actualizado.links && actualizado.links.length" class="links">
          <a v-for="(l, idx) in actualizado.links" :key="idx" :href="l.href" target="_blank" rel="noreferrer" class="chip">{{ l.rel }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actualizarParcialFachada } from "@/client/MatriculaClient.js";

export default {
  data() {
    return {
      id: null,
      body: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
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
      this.body = {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        provincia: "",
        genero: "",
      };
      this.actualizado = null;
      this.mensaje = "";
      this.ok = true;
    },

    async patch() {
      if (!this.id) {
        this.ok = false;
        this.mensaje = "Ingresa un ID válido";
        return;
      }

      const payload = {};

      if (this.body.nombre?.trim()) payload.nombre = this.body.nombre.trim();
      if (this.body.apellido?.trim()) payload.apellido = this.body.apellido.trim();
      if (this.body.fechaNacimiento?.trim()) payload.fechaNacimiento = this.body.fechaNacimiento.trim();
      if (this.body.provincia?.trim()) payload.provincia = this.body.provincia.trim();
      if (this.body.genero) payload.genero = this.body.genero;

      if (Object.keys(payload).length === 0) {
        this.ok = false;
        this.mensaje = "Escribe al menos un campo para actualizar";
        return;
      }

      try {
        const resp = await actualizarParcialFachada(this.id, payload);

        this.actualizado = resp || null;

        this.ok = true;
        this.mensaje = "Actualización parcial correcta";
      } catch (e) {
        this.actualizado = null;
        this.ok = false;
        const status = e?.response?.status;
        this.mensaje =
          status === 404
            ? "No existe ese ID (404)"
            : "Error PATCH: " + (e?.response?.data?.message || e.message);
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
  max-width: 860px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.header h2 {
  margin: 0;
  text-align: center;
  color: #1f2937;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  font-weight: 900;
  color: #6b7280;
}

input,
select {
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  outline: none;
  background: #fff;
  font-size: 14px;
}

input:focus,
select:focus {
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.12);
}

.actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 11px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 900;
  background: #e5e7eb;
  color: #111827;
}

.btn.info {
  background: #06b6d4;
  color: #fff;
}

.btn.ghost {
  background: #e5e7eb;
}

.msg {
  margin: 14px auto 0;
  max-width: 640px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-weight: 800;
  text-align: center;
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

.result {
  margin-top: 18px;
  border-top: 1px dashed #e5e7eb;
  padding-top: 16px;
  background: #f9fafb;
  border-radius: 14px;
  padding: 16px;
}

.badge {
  display: inline-block;
  background: #cffafe;
  color: #155e75;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: 900;
}

.links {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.chip {
  text-decoration: none;
  padding: 7px 12px;
  border-radius: 999px;
  background: #eef2ff;
  color: #1d4ed8;
  font-weight: 900;
  font-size: 12px;
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
