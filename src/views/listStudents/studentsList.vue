<template>
  <div>
    <StudentManagementHeader title="Consulta de alunos" />
    <div class="search">
      <div class="input-container">
        <input
          class="input"
          type="text"
          placeholder="Digite sua busca"
          @input="onChangeSearchInput"
          v-model="searchInput"
        />
        <button class="search-button" @click="searchItems">Pesquisar</button>
      </div>
      <button class="button" @click="router.push('/create-student')">
        Cadastrar Aluno
      </button>
    </div>
    <div class="table">
      <v-data-table
        :headers="headers"
        :items="serverItems"
        :items-length="serverItems.length"
        item-value="name"
        hide-default-footer
        v-model:sort-by="sortBy"
      >
        <template v-slot:item.acoes="{ item }">
          <button class="btn" @click="editStudent(item)">[Editar]</button>
          <button class="btn" @click="deleteItem(item)">[Excluir]</button>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Api from "@/services/api";
export default {
  name: "StudentsList",
  setup() {
    const router = useRouter();
    const searchInput = ref("");
    const sortBy = ref([]);

    const sortDesc = ref(false);

    const headers = ref([
      {
        title: "Registro Acadêmico",
        align: "start" as "start",
        key: "academic_register",
      },
      { title: "Nome", key: "name", align: "end" as "end" },
      { title: "CPF", key: "student_cpf", align: "end" as "end" },
      { title: "Ações", key: "acoes", align: "end" as "end" },
    ]);

    const serverItems = ref<any[]>([]);
    const originalItems = ref<any[]>([]);

    const getStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Erro: Token não encontrado no localStorage");
          return;
        }

        const response = await Api.get("/students/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        serverItems.value = response.data;
        originalItems.value = [...response.data];
      } catch (error: any) {
        console.error("Erro ao buscar alunos:", error.response?.data || error);
      }
    };

    watchEffect(() => {
      getStudents();
    });

    const editStudent = async (item: any) => {
      if (!item || !item.academic_register) {
        console.error("Erro: Dados do aluno estão indefinidos");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Erro: Token não encontrado no localStorage");
        return;
      }

      try {
        const response = await Api.put(
          `students/update-student/${item.academic_register}`,
          {
            name: item.name,
            email: item.email,
            student_cpf: item.student_cpf,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Aluno editado com sucesso!");

        serverItems.value = serverItems.value.map((student) =>
          student.academic_register === item.academic_register
            ? response.data
            : student
        );

        router.push(`/students/${item.academic_register}`);
      } catch (error: any) {
        console.error("Erro ao editar aluno:", error);

        if (error.response) {
          alert(error.response.data.error || "Erro ao editar aluno.");
        } else {
          alert("Erro inesperado ao tentar editar o aluno.");
        }
      }
    };

    const deleteItem = async (item: any) => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Erro: Token não encontrado no localStorage");
        return;
      }

      try {
        await Api.delete(`/students/delete-student/${item.academic_register}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Aluno deletado com sucesso!");

        serverItems.value = serverItems.value.filter(
          (student) => student.academic_register !== item.academic_register
        );
      } catch (error: any) {
        console.error("Erro ao deletar aluno:", error);

        if (error.response) {
          alert(error.response.data.error || "Erro ao deletar aluno.");
        } else {
          alert("Erro inesperado ao tentar deletar o aluno.");
        }
      }
    };

    const searchItems = () => {
      const searchValue = searchInput.value.trim().toLowerCase();

      if (!searchValue) {
        serverItems.value = [...originalItems.value];
        return;
      }

      serverItems.value = originalItems.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue) ||
          item.academic_register.toString().includes(searchValue)
      );
    };

    const onChangeSearchInput = (event: any) => {
      const { value } = event.target;
      if (value === "") {
        serverItems.value = originalItems.value;
      }
      searchInput.value = value;
    };

    return {
      headers,
      serverItems,
      searchInput,
      router,
      editStudent,
      deleteItem,
      searchItems,
      onChangeSearchInput,
      sortBy,
      sortDesc,
    };
  },
};
</script>

<style scoped>
@import "./studentsList.style.scss";
</style>
