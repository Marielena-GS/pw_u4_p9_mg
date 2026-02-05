<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2>Consultar Estudiante por ID</h2>
      </div>

      <div class="row">
        <div class="field">
          <label>ID</label>
          <input v-model.number="id" type="number" placeholder="Ej: 4" />
        </div>

        <div class="actions">
          <button class="btn primary" @click="consultar">Consultar</button>
          <button class="btn" @click="limpiar">Limpiar</button>
        </div>
      </div>

      <div v-if="mensaje" class="msg" :class="ok ? 'ok' : 'err'">{{ mensaje }}</div>

      <div v-if="estudiante" class="result">
        <div class="est-head">
          <span class="badge">ID {{ estudiante.id }}</span>
          <span class="name">{{ estudiante.nombre }} {{ estudiante.apellido }}</span>
        </div>

        <div class="form">
          <div class="fieldbox">
            <label>Nombre</label>
            <div class="value">{{ estudiante.nombre || "-" }}</div>
          </div>

          <div class="fieldbox">
            <label>Apellido</label>
            <div class="value">{{ estudiante.apellido || "-" }}</div>
          </div>

          <div class="fieldbox">
            <label>Fecha Nacimiento</label>
            <div class="value">{{ estudiante.fechaNacimiento || "-" }}</div>
          </div>

          <div class="fieldbox" v-if="estudiante.genero !== undefined">
            <label>Género</label>
            <div class="value">{{ estudiante.genero || "-" }}</div>
          </div>

          <div class="fieldbox" v-if="estudiante.provincia !== undefined">
            <label>Provincia</label>
            <div class="value">{{ estudiante.provincia || "-" }}</div>
          </div>
        </div>

        <div class="links" v-if="estudiante.links && estudiante.links.length">
          <a v-for="(l, idx) in estudiante.links" :key="idx" class="chip" :href="l.href" target="_blank"
            rel="noreferrer">{{ l.rel }}</a>
          <button v-if="linkHijos" class="chip-btn" @click="cargarHijos">Ver hijos</button>
        </div>

        <div v-if="hijosCargados" class="hijos">
          <div class="hijos-head">
            <h3>Hijos</h3>
            <button class="btn small" @click="hijos = []; hijosCargados = false">Ocultar</button>
          </div>

          <p v-if="hijos.length === 0" class="hint">
            No hay hijos para este estudiante (o el endpoint devolvió vacío).
          </p>

          <div v-else class="hijos-grid">
            <div v-for="(h, i) in hijos" :key="i" class="hijo-card">
              <div class="hijo-title">
                <span class="badge gray">#{{ i + 1 }}</span>
                <span class="name2">{{ h.nombre || "Sin nombre" }} {{ h.apellido || "" }}</span>
              </div>

              <div class="mini">
                <div><b>ID:</b> {{ h.id ?? "-" }}</div>
                <div><b>Fecha:</b> {{ h.fechaNacimiento ?? "-" }}</div>
                <div v-if="h.genero !== undefined"><b>Género:</b> {{ h.genero || "-" }}</div>
                <div v-if="h.provincia !== undefined"><b>Provincia:</b> {{ h.provincia || "-" }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { consultarPorIdFachada } from "@/client/MatriculaClient.js";
import { obtenerTokenFachada } from "@/client/Authorization";

export default {
  data() {
    return {
      id: null,
      estudiante: null,
      mensaje: "",
      ok: true,
      hijos: [],
      hijosCargados: false,
    };
  },
  computed: {
    linkHijos() {
      if (!this.estudiante?.links) return null;
      return this.estudiante.links.find((l) => l.rel === "hijos") || null;
    },
  },
  methods: {
    limpiar() {
      this.estudiante = null;
      this.hijos = [];
      this.hijosCargados = false;
      this.mensaje = "";
      this.ok = true;
    },

    async consultar() {
      if (!this.id) {
        this.ok = false;
        this.mensaje = "Ingresa un ID válido";
        return;
      }
      try {
        const token = await obtenerTokenFachada();
        const data = await consultarPorIdFachada(this.id, token);
        this.estudiante = data;

        this.hijos = [];
        this.hijosCargados = false;

        this.ok = true;
        this.mensaje = "Consulta exitosa";
      } catch (e) {
        this.estudiante = null;
        this.hijos = [];
        this.hijosCargados = false;

        this.ok = false;
        const status = e?.response?.status;
        this.mensaje =
          status === 404
            ? "No existe ese ID (404)"
            : "Error consultando: " + (e?.response?.data?.message || e.message);
      }
    },

    async cargarHijos() {
      if (!this.linkHijos?.href) return;

      try {
        const token = await obtenerTokenFachada();
        const r = await axios.get(this.linkHijos.href, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.hijosCargados = true;

        this.ok = true;
        this.mensaje = `Hijos cargados: ${this.hijos.length}`;
      } catch (e) {
        this.hijos = [];
        this.hijosCargados = true;

        this.ok = false;
        this.mensaje =
          "Error cargando hijos: " + (e?.response?.data?.message || e.message);
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
  max-width: 980px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.header h2 {
  margin: 0;
  color: #1f2937;
  text-align: center;
}

.row {
  display: flex;
  gap: 12px;
  align-items: end;
  flex-wrap: wrap;
  justify-content: center;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 12px;
  font-weight: 900;
  color: #6b7280;
}

input {
  width: 280px;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  outline: none;
  background: #fff;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.actions {
  display: flex;
  gap: 10px;
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

.btn.primary {
  background: #2563eb;
  color: #fff;
}

.btn.small {
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 12px;
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

/* RESULTADO */
.result {
  margin-top: 18px;
  border-top: 1px dashed #e5e7eb;
  padding-top: 18px;
}

.est-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.badge {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-weight: 900;
  font-size: 12px;
}

.badge.gray {
  background: #f3f4f6;
  color: #374151;
}

.name {
  font-weight: 900;
  color: #111827;
  font-size: 18px;
}

.form {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 10px;
  max-width: 780px;
  margin: 0 auto;
}

.fieldbox label {
  font-size: 12px;
  font-weight: 900;
  color: #6b7280;
}

.value {
  margin-top: 4px;
  padding: 9px 10px;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  background: #f9fafb;
  color: #111827;
  font-size: 13px;
}

/* links */
.links {
  margin-top: 14px;
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

.chip-btn {
  padding: 7px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #ffe4e6;
  color: #9f1239;
  font-weight: 900;
  font-size: 12px;
}

/* HIJOS */
.hijos {
  margin-top: 18px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.hijos-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.hijos-head h3 {
  margin: 0;
  color: #111827;
}

.hint {
  color: #6b7280;
  margin: 10px 0 0;
  text-align: center;
}

.hijos-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 12px;
}

.hijo-card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 14px;
  background: #fff;
}

.hijo-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.name2 {
  font-weight: 900;
  color: #111827;
}

.mini {
  font-size: 13px;
  color: #374151;
  display: grid;
  gap: 4px;
}

@media (max-width: 750px) {
  input {
    width: 92vw;
    max-width: 360px;
  }

  .form {
    grid-template-columns: 1fr;
  }

  .hijos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
