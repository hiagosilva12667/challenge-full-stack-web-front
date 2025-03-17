<template>
  <StudentManagementHeader title="Cadastro de aluno" />
  <div class="create-student">
    <form @submit.prevent="createStudent">
      <section class="create-student__form">
        <label class="create-student__form__label" for="name">Nome</label>
        <input
          class="create-student__form__input"
          v-model="student.name"
          type="text"
          id="name"
          placeholder="Informe o nome completo"
          required
        />
      </section>
      <section class="create-student__form">
        <label class="create-student__form__label" for="email">Email</label>
        <input
          class="create-student__form__input"
          v-model="student.email"
          type="email"
          id="email"
          placeholder="Informe apenas um email"
          required
        />
      </section>
      <section class="create-student__form">
        <label class="create-student__form__label" for="ra">RA</label>
        <input
          class="create-student__form__input"
          v-model="student.academicRegister"
          type="text"
          id="ra"
          placeholder="Informe o registro acadêmico"
          required
        />
      </section>
      <section class="create-student__form">
        <label class="create-student__form__label" for="cpf">CPF</label>
        <input
          class="create-student__form__input"
          v-model="student.cpf"
          type="text"
          id="cpf"
          placeholder="Informe o número do documento"
          required
        />
      </section>
      <section class="create-student__actions">
        <button
          class="create-student__actions__button"
          type="button"
          @click="router.push('/students')"
        >
          Cancel
        </button>
        <button class="create-student__actions__button" type="submit">
          Create
        </button>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import StudentManagementHeader from "@/components/StudentManagementHeader/StudentManagementHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/services/api";
export default {
  name: "CreateStudent",
  components: {
    StudentManagementHeader,
  },
  setup() {
    const router = useRouter();
    const student = ref({
      name: "",
      email: "",
      academicRegister: "",
      cpf: "",
    });

    const createStudent = () => {
      Api.post("/students", student.value)
        .then(() => {
          console.log("Aluno cadastrado com sucesso!");
          router.push("/students");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return {
      router,
      student,
      createStudent,
    };
  },
};
</script>

<style scoped>
@import "./createStudent.styles.scss";
</style>
