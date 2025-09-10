<template>
  <form @submit.prevent="submitForm" class="container">
    <h1 class="title">Cálculo de Notas</h1>

    <!-- Nota 1 -->
    <div class="form-group">
      <label for="n1">Nota 1</label>
      <input
        type="number"
        id="n1"
        ref="n1"
        v-model.number="form.n1"
        @input="validateN1"
        class="form-control"
        placeholder="Ej: 55"
        min="10"
        max="70"
        required
      />
    </div>

    <!-- Nota 2 -->
    <div class="form-group">
      <label for="n2">Nota 2</label>
      <input
        type="number"
        id="n2"
        ref="n2"
        v-model.number="form.n2"
        @input="validateN2"
        class="form-control"
        placeholder="Ej: 48"
        min="10"
        max="70"
        required
      />
    </div>

    <!-- Nota 3 -->
    <div class="form-group">
      <label for="n3">Nota 3</label>
      <input
        type="number"
        id="n3"
        ref="n3"
        v-model.number="form.n3"
        @input="validateN3"
        class="form-control"
        placeholder="Ej: 60"
        min="10"
        max="70"
        required
      />
    </div>

    <!-- Asistencia -->
    <div class="form-group">
      <label for="asistencia">Asistencia %</label>
      <input
        type="number"
        id="asistencia"
        ref="asistencia"
        v-model.number="form.asistencia"
        @input="validateAsistencia"
        class="form-control"
        placeholder="Ej: 80"
        min="0"
        max="100"
        required
      />
    </div>

    <button type="submit" class="btn btn-primary">Calcular</button>

    <p v-if="hasErrors" class="text-danger mt-3">
      Por favor, ingrese valores válidos para las notas y la asistencia
    </p>

    <!-- Resultado -->
    <div v-if="showResult" class="result">
      <p>
        El promedio es:
        <strong>{{ promedio.toFixed(2) }}</strong>
      </p>
      <p :class="approved ? 'ok' : 'bad'">
        Tu estado es: {{ approved ? "Aprobado" : "Reprobado" }}
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        n1: null,
        n2: null,
        n3: null,
        asistencia: null,
      },
      errors: {
        n1: "",
        n2: "",
        n3: "",
        asistencia: "",
      },
      showResult: false,
      promedio: 0,
      approved: false,
    };
  },

  computed: {
    hasErrors() {
      return Object.values(this.errors).some((e) => e !== "");
    },
  },

  methods: {
    // Helpers
    inRange(v, min, max) {
      return Number.isFinite(v) && v >= min && v <= max;
    },

    // Validaciones por campo
    validateN1() {
      const el = this.$refs.n1;
      const v = this.form.n1;
      let msg = "";
      if (v === null || v === "")
        msg = "Por favor, ingrese valores válidos para las notas";
      else if (v < 10) msg = "El valor debe ser superior o igual a 10";
      else if (v > 70) msg = "El valor debe ser menor o igual a 70";
      this.errors.n1 = msg;
      el.setCustomValidity(msg);
      el.reportValidity();
    },

    validateN2() {
      const el = this.$refs.n2;
      const v = this.form.n2;
      let msg = "";
      if (v === null || v === "")
        msg = "Por favor, ingrese valores válidos para las notas";
      else if (v < 10) msg = "El valor debe ser superior o igual a 10";
      else if (v > 70) msg = "El valor debe ser menor o igual a 70";
      this.errors.n2 = msg;
      el.setCustomValidity(msg);
      el.reportValidity();
    },

    validateN3() {
      const el = this.$refs.n3;
      const v = this.form.n3;
      let msg = "";
      if (v === null || v === "")
        msg = "Por favor, ingrese valores válidos para las notas";
      else if (v < 10) msg = "El valor debe ser superior o igual a 10";
      else if (v > 70) msg = "El valor debe ser menor o igual a 70";
      this.errors.n3 = msg;
      el.setCustomValidity(msg);
      el.reportValidity();
    },

    validateAsistencia() {
      const el = this.$refs.asistencia;
      const v = this.form.asistencia;
      let msg = "";
      if (v === null || v === "")
        msg = "Por favor, ingrese valores válidos para la asistencia";
      else if (!this.inRange(v, 0, 100))
        msg = "La asistencia debe estar entre 0 y 100";
      this.errors.asistencia = msg;
      el.setCustomValidity(msg);
      el.reportValidity();
    },

    // Envío (cálculo)
    submitForm() {
      // Validar todo
      this.validateN1();
      this.validateN2();
      this.validateN3();
      this.validateAsistencia();

      // ¿Hay errores?

      if (this.hasErrors) {
        const orden = ["n1", "n2", "n3", "asistencia"];
        const primero = orden.find((k) => this.errors[k]);
        if (primero && this.$refs[primero]) {
          this.$refs[primero].reportValidity();
        }
        this.showResult = false;
        return;
      }

      // Cálculo promedio ponderado 35%, 35%, 30%
      const { n1, n2, n3, asistencia } = this.form;
      this.promedio = n1 * 0.35 + n2 * 0.35 + n3 * 0.3;

      // Estado de aprobación
      this.approved = this.promedio >= 40 && asistencia >= 80;

      // Mostrar resultados
      this.showResult = true;
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
}

.result {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px dashed #e5e7eb;
}

.ok {
  color: #16a34a;
  font-weight: 700;
}

.bad {
  color: #dc2626;
  font-weight: 700;
}

.hint {
  color: #6b7280;
}
</style>
