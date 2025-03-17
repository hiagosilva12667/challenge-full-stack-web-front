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
          <button class="btn" @click="editStudent(item.academicRegister)">
            [Editar]
          </button>
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
        key: "academicRegister",
      },
      { title: "Nome", key: "name", align: "end" as "end" },
      { title: "CPF", key: "cpf", align: "end" as "end" },
      { title: "Ações", key: "acoes", align: "end" as "end" },
    ]);

    const serverItems = ref<any[]>([]);

    const getStudents = async () => {
      try {
        const response = await Api.get("/students");
        console.log("Alunos:", response.data);
        serverItems.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    watchEffect(() => {
      getStudents();
    });

    const originalItems = ref([...serverItems.value]);

    const editStudent = (id: number) => {
      if (!id) {
        console.error("Erro: ID do aluno está indefinido");
        return;
      }
      router.push(`/students/${id}`);
    };

    const deleteItem = (item: any) => {
      console.log("Deletando aluno:", item);
      if (!item) {
        console.error("Erro: Item está indefinido");
        return;
      }
      Api.delete(`/students/${item.academicRegister}`)
        .then(() => {
          console.log("Aluno deletado com sucesso!");
          getStudents();
        })
        .catch((error) => {
          console.error("Erro ao deletar aluno:", error);
        });
    };

    const searchItems = () => {
      const searchValue = searchInput.value;
      if (searchValue === "") {
        serverItems.value = originalItems.value;
        return;
      }
      serverItems.value = originalItems.value.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
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
