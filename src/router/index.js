import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodosView from '../views/TodosView.vue'
import BorrarView from '../views/Borrar.vue'
import ActualizarView from '../views/Actualizar.vue'
import CrearView from '../views/Crear.vue'
import PorIdView from '../views/PorId.vue'
import ParcialView from '../views/Parcial.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,

    meta: {
      requiereAutorizacion: true,
      esPublica: false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiereAutorizacion: true,
      esPublica: false
    }
  },
  {
    path: '/todos', name: 'listar_todos',
    component: TodosView,
    meta: {
      requiereAutorizacion: false,
      esPublica: false
    }
  },
  {
    path: '/crear', name: 'guardar', component: CrearView,
    meta: {
      requiereAutorizacion: false,
      esPublica: false
    }
  },
  {
    path: '/por-id', name: 'consultar_por_id', component: PorIdView,
    meta: {
      requiereAutorizacion: false,
      esPublica: false
    }
  },
  {
    path: '/actualizar', name: 'actualizar', component: ActualizarView,
    meta: {
      requiereAutorizacion: true,
      esPublica: false
    }
  },
  {
    path: '/parcial', name: 'actualizar_parcial', component: ParcialView,
    meta: {
      requiereAutorizacion: true,
      esPublica: false
    }
  },
  {
    path: '/borrar', name: 'borrar', component: BorrarView,
    meta: {
      requiereAutorizacion: true,
      esPublica: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*Configuracion del guardián*/

router.beforeEach((to, from, next) => {
  if (to.meta.requiereAutorizacion) {
    const estaAutenticado = localStorage.getItem("estaAutenticado");
    const token = localStorage.getItem("token");

    if (!estaAutenticado || !token) {
      console.log("Redirige al Login");
      next({ name: "login" });
    } else {
      console.log("Autenticado, pasa");
      next();
    }
  } else {
    console.log("Pase libre");
    next();
  }
});


export default router


