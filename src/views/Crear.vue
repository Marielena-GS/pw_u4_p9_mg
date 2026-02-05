<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2>Crear Estudiante</h2>
      </div>

      <div class="form">
        <div class="field">
          <label>Nombre</label>
          <input v-model.trim="body.nombre" placeholder="Ej: Marielena" />
        </div>

        <div class="field">
          <label>Apellido</label>
          <input v-model.trim="body.apellido" placeholder="Ej: González" />
        </div>

        <div class="field">
          <label>Fecha Nacimiento (YYYY-MM-DDTHH:mm:ss)</label>
          <input v-model.trim="body.fechaNacimiento" placeholder="2004-01-01T00:00:00" />
          <small class="hint">Ej: 2004-01-01T00:00:00</small>
        </div>

        <div class="field">
          <label>Provincia</label>
          <input v-model.trim="body.provincia" placeholder="Ej: Pichincha" />
        </div>

        <div class="field">
          <label>Género</label>
          <select v-model="body.genero">
            <option disabled value="">Seleccione...</option>
            <option value="F">F</option>
            <option value="M">M</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div class="actions">
        <button class="btn success" @click="crear">Crear</button>
        <button class="btn" @click="limpiar">Limpiar</button>
      </div>

      <div v-if="mensaje" class="msg" :class="ok ? 'ok' : 'err'">{{ mensaje }}</div>

      <div v-if="creado" class="created">
        <div class="est-head">
          <span class="badge">ID {{ creado.id }}</span>
          <span class="name">{{ creado.nombre }} {{ creado.apellido }}</span>
        </div>

        <div class="mini-form">
          <div class="box">
            <label>Fecha</label>
            <div class="value">{{ creado.fechaNacimiento || "-" }}</div>
          </div>
          <div class="box">
            <label>Provincia</label>
            <div class="value">{{ creado.provincia || "-" }}</div>
          </div>
          <div class="box">
            <label>Género</label>
            <div class="value">{{ creado.genero || "-" }}</div>
          </div>
        </div>

        <div v-if="creado.links && creado.links.length" class="links">
          <a v-for="(l, idx) in creado.links" :key="idx" :href="l.href" target="_blank" rel="noreferrer" class="chip">{{
            l.rel }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerTokenFachada } from "@/client/Authorization";
import { guardarFachada } from "@/client/MatriculaClient.js";

export default {
  data() {
    return {
      body: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "2000-01-01T00:00:00",
        provincia: "",
        genero: "",
      },
      creado: null,
      mensaje: "",
      ok: true,
    };
  },
  methods: {
    limpiar() {
      this.body = {
        nombre: "",
        apellido: "",
        fechaNacimiento: "2000-01-01T00:00:00",
        provincia: "",
        genero: "",
      };
      this.creado = null;
      this.mensaje = "";
      this.ok = true;
    },

    validar() {
      if (!this.body.nombre) return "El nombre es obligatorio";
      if (!this.body.apellido) return "El apellido es obligatorio";
      if (!this.body.fechaNacimiento) return "La fechaNacimiento es obligatoria";
      if (!this.body.genero) return "El género es obligatorio";
      if (!this.body.provincia) return "La provincia es obligatoria";
      return null;
    },

    async crear() {
      const error = this.validar();
      if (error) {
        this.ok = false;
        this.mensaje = error;
        return;
      }

      try {
        const token = await obtenerTokenFachada();
        const resp = await guardarFachada(this.body, token);
        this.creado = resp || null;

        this.ok = true;
        this.mensaje = `Creado correctamente (id: ${resp?.id ?? "ok"})`;
      } catch (e) {
        this.creado = null;
        this.ok = false;
        this.mensaje =
          "Error al crear: " + (e?.response?.data?.message || e.message);
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

.form {
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
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
}

.hint {
  color: #6b7280;
  font-size: 12px;
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

.btn.success {
  background: #22c55e;
  color: #fff;
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

/* Resultado */
.created {
  margin-top: 18px;
  border-top: 1px dashed #e5e7eb;
  padding-top: 16px;
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

.name {
  font-weight: 900;
  color: #111827;
  font-size: 18px;
}

.mini-form {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 10px;
  max-width: 780px;
  margin: 0 auto;
}

.box label {
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

@media (max-width: 820px) {
  .form {
    grid-template-columns: 1fr;
  }

  .mini-form {
    grid-template-columns: 1fr;
  }
}
</style>
