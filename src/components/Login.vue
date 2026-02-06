<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="usuario" type="text" placeholder="Usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <br />
    <button v-on:click="login()">Entrar</button>
  </div>
</template>

<script>
import { loginFachada } from '@/client/Authorization';
import router from '@/router';

export default {
  data() {
    return {
      usuario: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        /* Obtengo token REAL desde backend */
        await loginFachada(this.usuario, this.password);

        console.log("Registrado");
        console.log("TOKEN:", localStorage.getItem("token"));

        /* Redirige a la vista protegida */
        router.push("/about");

      } catch (error) {
        console.log("Error de autenticación");
        console.log(error?.response?.data?.message || error.message);
      }
    },
  }
};
</script>
<style>
.login {
  width: 300px;
  margin: 100px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  width: 100%;
  padding: 8px;
  cursor: pointer;
}
</style>