<template>
  <header class="topbar">
    <nav class="nav">
      <router-link class="nav__link" to="/">Home</router-link>
      <router-link class="nav__link" to="/about">About</router-link>
      <router-link class="nav__link" to="/todos">Listar Todos</router-link>
      <router-link class="nav__link" to="/por-id">Consultar por ID</router-link>
      <router-link class="nav__link" to="/crear">Guardar</router-link>
      <router-link class="nav__link" to="/actualizar">Actualizar</router-link>
      <router-link class="nav__link" to="/parcial">Actualizar Parcial</router-link>
      <router-link class="nav__link danger" to="/borrar">Borrar</router-link>

      <button v-if="estaAutenticado" class="nav__link danger" @click="logout">
        Cerrar sesión
      </button>
    </nav>
  </header>

  <router-view />
</template>

<script>
import router from "@/router";
import { logoutFachada, estaAutenticadoFachada } from "@/client/Authorization";

export default {
  computed: {
    estaAutenticado() {
      return estaAutenticadoFachada();
    },
  },
  methods: {
    async logout() {
      await logoutFachada();
      console.log("Sesión cerrada");
      router.push("/login");
    },
  },
};
</script>

<style scoped>
.topbar {
  padding: 14px 18px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.nav__link {
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  color: #111827;
  font-weight: 600;
  background: #f9fafb;
}

.nav__link:hover {
  background: #eef2ff;
}

.router-link-exact-active {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

.nav__link.danger {
  border-color: #fecaca;
  background: #fff1f2;
  color: #991b1b;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
