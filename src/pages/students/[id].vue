<template>
  <v-container v-if="!loading">
    <h2>Editar Aluno</h2>

    <v-form @submit.prevent="saveStudent">
      <v-text-field v-model="student.name" label="Nome" required></v-text-field>
      <v-text-field
        v-model="student.student_cpf"
        label="CPF"
        required
      ></v-text-field>
      <v-text-field v-model="student.email" label="Email"></v-text-field>
      <v-text-field
        v-model="student.academic_register"
        label="Registro Acadêmico"
        disabled
      ></v-text-field>

      <v-btn color="green" type="submit">Salvar</v-btn>
      <v-btn color="gray" @click="cancelEdit">Cancelar</v-btn>
    </v-form>
  </v-container>

  <v-container v-else>
    <p>Carregando aluno...</p>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const student = ref({
  name: "",
  email: "",
  student_cpf: "",
  academic_register: "",
});
const loading = ref(true);

const loadStudent = async () => {
  const id = route.params.id as string;

  console.log(id);
  if (!id) {
    router.replace("/not-found");
    return;
  }

  try {
    const response = await api.get(`/students/${id}`);
    student.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    router.replace("/not-found");
    return;
  } finally {
    loading.value = false;
  }
};

const saveStudent = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Erro: Token não encontrado no localStorage");
      return;
    }

    await api.put(
      `students/update-student/${student.value.academic_register}`,
      student.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/students");
  } catch (error) {
    console.error("Erro ao salvar aluno:", error);
  }
};

const cancelEdit = () => {
  router.push("/students");
};

onMounted(loadStudent);
</script>
