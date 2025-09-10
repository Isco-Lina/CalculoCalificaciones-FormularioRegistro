import { createRouter, createWebHistory } from "vue-router";
import calculo_calificaciones from "../views/calculo_calificaciones.vue";
import formulario_registro from "../views/formulario_registro.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "calculo_calificaciones",
      component: calculo_calificaciones,
    },
    {
      path: "/formulario_registro",
      name: "formulario_registro",
      component: formulario_registro,
    },
  ],
});

export default router;
