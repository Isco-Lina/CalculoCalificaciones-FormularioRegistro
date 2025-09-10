<template>
  <form @submit.prevent="submitForm" class="container">
    <h1 class="title">Formulario de registro</h1>

    <!-- Nombre -->
    <div class="form-group">
      <label for="name">Nombre:</label>
      <input
        type="text"
        id="name"
        ref="name"
        v-model.trim="form.name"
        @input="validateName"
        class="form-control"
        :class="{ 'is-invalid': !!errors.name }"
        placeholder="Ej: Felipe"
        required
      />
      <div class="invalid-feedback">{{ errors.name }}</div>
    </div>

    <!-- Correo -->
    <div class="form-group">
      <label for="email">Correo:</label>
      <input
        type="email"
        id="email"
        ref="email"
        v-model.trim="form.email"
        @input="validateEmail"
        class="form-control"
        :class="{ 'is-invalid': !!errors.email }"
        placeholder="ejemplo@gmail.com"
        required
      />
      <div class="invalid-feedback">{{ errors.email }}</div>
    </div>

    <!-- Contraseña -->
    <div class="form-group">
      <label for="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        ref="password"
        v-model="form.password"
        @input="validatePassword"
        class="form-control"
        :class="{ 'is-invalid': !!errors.password }"
        placeholder="Mín. 5 caracteres"
        required
      />
      <div class="invalid-feedback">{{ errors.password }}</div>
    </div>

    <!-- Repetir contraseña -->
    <div class="form-group">
      <label for="password2">Repetir Contraseña:</label>
      <input
        type="password"
        id="password2"
        ref="password2"
        v-model="form.password2"
        @input="validatePassword2"
        class="form-control"
        :class="{ 'is-invalid': !!errors.password2 }"
        placeholder="Debe coincidir"
        required
      />
      <div class="invalid-feedback">{{ errors.password2 }}</div>
    </div>

    <button type="submit" class="btn btn-primary">Enviar</button>
  </form>
</template>

<script>
export default {
  data() {
    // Valores del formulario
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      // Mensajes de error asociados a cada campo
      errors: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    // Validar Nombre
    validateName() {
      const el = this.$refs.name;
      const v = this.form.name;
      let msg = "";
      if (!v) msg = "El campo nombre es requerido";
      else if (/\d/.test(v)) msg = "El nombre no debe contener números";
      else if (v.length < 2) msg = "El nombre debe tener al menos 2 caracteres";
      this.errors.name = msg;
      el.setCustomValidity(msg);
    },

    // Validar Correo
    validateEmail() {
      const el = this.$refs.email;
      const v = this.form.email;
      let msg = "";
      if (!v) msg = "El campo correo es requerido";
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v))
        msg = "El correo es inválido";
      this.errors.email = msg;
      el.setCustomValidity(msg);
    },

    // Validar Contraseña
    validatePassword() {
      const el = this.$refs.password;
      const v = this.form.password;
      let msg = "";
      if (!v) msg = "El campo contraseña es requerido";
      else if (v.length < 5)
        msg = "La contraseña debe tener al menos 5 caracteres";
      this.errors.password = msg;
      el.setCustomValidity(msg);

      // Si ya se escribió la segunda contraseña, la volvemos a validar
      if (this.form.password2) this.validatePassword2();
    },

    // Validar Repetir Contraseña
    validatePassword2() {
      const el = this.$refs.password2;
      const v = this.form.password2;
      let msg = "";
      if (!v) msg = "El campo repetir contraseña es requerido";
      else if (v !== this.form.password) msg = "Las contraseñas no coinciden";
      this.errors.password2 = msg;
      el.setCustomValidity(msg);
    },

    // Validar todo al enviar
    submitForm() {
      // Ejecuta todas las validaciones
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validatePassword2();

      // Verificar si hay errores
      const hayErrores = Object.values(this.errors).some((e) => e !== "");
      if (hayErrores) {
        const orden = ["name", "email", "password", "password2"];
        const primero = orden.find((k) => this.errors[k]);
        if (primero && this.$refs[primero])
          this.$refs[primero].reportValidity();
        return;
      }
      alert("El registro se ha realizado correctamente");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  text-align: center;
  font-family: sans-serif;
}

.form-group {
  margin-bottom: 16px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
}

.error-message {
  color: #dc2626;
  margin-top: 6px;
  font-size: 14px;
}

.btn-primary {
  background-color: #2563eb;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: center;
  width: auto;
}

.result {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px dashed #e5e7eb;
}

/* estética básica */
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input[type="text"],
input[type="password"],
input[type="email"] {
  margin-bottom: 10px;
}
button {
  margin-top: 20px;
}
</style>
