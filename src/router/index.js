import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodosView from '../views/TodosView.vue'
import BorrarView from '../views/Borrar.vue'
import ActualizarView from '../views/Actualizar.vue'
import CrearView from '../views/Crear.vue'
import PorIdView from '../views/PorId.vue'
import ParcialView from '../views/Parcial.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
   { path: '/todos', name: 'listar_todos', component: TodosView },
  { path: '/crear', name: 'guardar', component: CrearView },
  { path: '/por-id', name: 'consultar_por_id', component: PorIdView },
  { path: '/actualizar', name: 'actualizar', component: ActualizarView },
  { path: '/parcial', name: 'actualizar_parcial', component: ParcialView },
  { path: '/borrar', name: 'borrar', component: BorrarView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
