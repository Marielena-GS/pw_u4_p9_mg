<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2>Todos los Estudiantes</h2>
        <button class="btn primary" @click="cargar">Cargar</button>
      </div>

      <p v-if="!Array.isArray(estudiantes) || estudiantes.length === 0" class="hint">
        No hay estudiantes cargados (o la lista está vacía).
      </p>

      <div class="grid" v-else>
        <div class="est-card" v-for="est in estudiantes" :key="est.id">
          <div class="est-head">
            <span class="badge">ID {{ est.id }}</span>
            <span class="name">{{ est.nombre }} {{ est.apellido }}</span>
          </div>

          <div class="form">
            <div class="field">
              <label>Nombre</label>
              <div class="value">{{ est.nombre || "-" }}</div>
            </div>

            <div class="field">
              <label>Apellido</label>
              <div class="value">{{ est.apellido || "-" }}</div>
            </div>

            <div class="field">
              <label>Fecha Nacimiento</label>
              <div class="value">{{ est.fechaNacimiento || "-" }}</div>
            </div>

            <div class="field" v-if="est.genero !== undefined">
              <label>Género</label>
              <div class="value">{{ est.genero || "-" }}</div>
            </div>

            <div class="field" v-if="est.provincia !== undefined">
              <label>Provincia</label>
              <div class="value">{{ est.provincia || "-" }}</div>
            </div>
          </div>

          <!-- Links HATEOAS (si vienen) -->
          <div v-if="est.links && est.links.length" class="links">
            <a
              v-for="(l, idx) in est.links"
              :key="idx"
              :href="l.href"
              target="_blank"
              rel="noreferrer"
              class="link"
              >{{ l.rel }}</a
            >
          </div>
        </div>
      </div>

      <div v-if="mensaje" class="msg" :class="ok ? 'ok' : 'err'">
        {{ mensaje }}
      </div>
    </div>
  </div>
</template>

<script>
import { consultarTodosFachada } from "@/client/MatriculaClient.js";
import { obtenerTokenFachada } from "@/client/Authorization";
export default {
  data() {
    return {
      estudiantes: [],
      mensaje: "",
      ok: true,
    };
  },
  methods: {
    setMsg(ok, text) {
      this.ok = ok;
      this.mensaje = text;
      setTimeout(() => (this.mensaje = ""), 25000);
    },
    async cargar() {
      try {
        const token = await obtenerTokenFachada();
        this.estudiantes = await consultarTodosFachada(token);
        this.setMsg(true, `Cargados: ${this.estudiantes.length} estudiantes`);
      } catch (e) {
        this.setMsg(
          false,
          "Error: " + (e?.response?.data?.message || e.message)
        );
      }
    },
  },
  mounted() {
    this.cargar();
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

h2 {
  margin: 0;
  color: #1f2937;
}

.hint {
  color: #6b7280;
  margin: 10px 0 0;
}

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 800;
  background: #e5e7eb;
}

.btn.primary {
  background: #2563eb;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.est-card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px;
  background: #ffffff;
}

.est-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.badge {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-weight: 800;
  font-size: 12px;
}

.name {
  font-weight: 900;
  color: #111827;
  font-size: 16px;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field label {
  font-size: 12px;
  font-weight: 800;
  color: #6b7280;
}

.value {
  margin-top: 4px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  background: #f9fafb;
  color: #111827;
  font-size: 13px;
}

.links {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.link {
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 12px;
  background: #eef2ff;
  color: #1d4ed8;
  font-weight: 800;
  font-size: 12px;
}

.msg {
  margin-top: 16px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-weight: 700;
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

@media (max-width: 750px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .form {
    grid-template-columns: 1fr;
  }
}
</style>


