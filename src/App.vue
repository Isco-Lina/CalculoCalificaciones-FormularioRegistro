<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <router-link class="brand" to="/">Programación Frontend</router-link>

        <!-- botón hamburguesa (aparece solo en móvil por CSS) -->
        <button
          class="nav-toggle"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <!-- agrega la clase 'open' cuando menuOpen sea true -->
        <ul class="nav-links" :class="{ open: menuOpen }">
          <li>
            <router-link to="/" @click="menuOpen = false"
              >Calificaciones</router-link
            >
          </li>
          <li>
            <router-link to="/formulario_registro" @click="menuOpen = false">
              Formulario de Registro
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container main">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const menuOpen = ref(false);
</script>
