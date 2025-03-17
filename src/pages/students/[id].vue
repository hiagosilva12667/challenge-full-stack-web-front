<template>
  <v-container>
    <h2>Editar Aluno</h2>

    <v-form @submit.prevent="saveStudent">
      <v-text-field v-model="student.name" label="Nome" required></v-text-field>
      <v-text-field v-model="student.cpf" label="CPF" required></v-text-field>
      <v-text-field
        v-model="student.academicRegister"
        label="Registro Acadêmico"
        disabled
      ></v-text-field>

      <v-btn color="green" type="submit">Salvar</v-btn>
      <v-btn color="gray" @click="cancelEdit">Cancelar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();

const student = ref({ name: "", cpf: "", academicRegister: 0 });

const getStudent = async (id: string) => {
  const response = await api.get(`/students/${id}`);
  console.log(response.data);
};

onMounted(() => {
  if (route.params.id) {
    loadStudent(route.params.id as string);
  }
});

const loadStudent = (id: string) => {
  getStudent(id);
  const students = [
    {
      academicRegister: 121115,
      name: "Maria Silva",
      cpf: "123.456.789-00",
    },
    {
      academicRegister: 101234,
      name: "Carlos Souza",
      cpf: "987.654.321-00",
    },
  ];

  const foundStudent = students.find((s) => s.academicRegister === Number(id));

  if (foundStudent) {
    student.value = { ...foundStudent };
  } else {
    router.replace("/not-found"); // Redireciona para página de erro
  }
};

const saveStudent = () => {
  console.log("Salvando aluno:", student.value);
  router.push("/students");
};

const cancelEdit = () => {
  console.log("Cancelando edição");
  router.push("/students");
};
</script>
