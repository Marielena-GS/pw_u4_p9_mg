<template>
  <div class="about-container">
    <div class="card">
      <h2>Gestión de Estudiantes</h2>
     
      <AboutComponent />
      
    </div>
  </div>
</template>

<script>
import AboutComponent from "@/components/AboutComponent.vue";

export default {
  components: { AboutComponent },
};
</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin: 0;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin: 10px 0 25px 0;
}
</style>
