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
import router from '@/router';
export default {
  data() {
    return {
      usuario: "",
      password: "",
    };
  },

  methods: {
    login() {
      /*Mando a obtener el token*/
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJtYXRyaWN1bGEtYXV0aCIsInN1YiI6Ik1hcmllbGVuYSIsImdyb3VwcyI6WyJhZG1pbiJdLCJpYXQiOjE3NzAzMzY1MzUsImV4cCI6MTc3MDM0MDEzNSwianRpIjoiMTM4MTlmOTQtZTJhOS00NjFjLTkxMjYtYmI2Y2E4NTk2YWRhIn0.bYJ6wTQ7zvaOlWdm7HsHNwIBrrPbVnA09EH-aUIEHUQ5ip_aWtxBcUP8hJOMbfj1NbHYbA9x6Ypl_22YaHxJPn5pGt0TnRD-T8G0YSAQoZqfJKyZes63JfxKnejn140EQkKwBmxK7sHMiuKi5dvLiYHIZAnQpbQYHstMKyMi6OTk6MQruB3m7PbLIFMVSKM6yV1f0najeJNn6O1TVYwujNgpM1CrxQxmpwnqgSvfW7gFN92LmOC6Z2F3dVx_gfVcMIrmtwgM7YJyW4oF3OUBwQn6gUlvx2IZ9nZzKZkW2LmNi_QUq4OGigiM2ud9TZXmvp0zOx2XNz73tl9Q93V4kw";

      if (token !== null) {
        localStorage.setItem("token", token);
        localStorage.setItem("estaAutenticado", true);
        console.log("Registrado");
      } else {
        console.log("Error de autenticación");
        console.log("No Registrado");
      }
    },
  },
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