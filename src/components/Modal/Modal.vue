<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title>{{ titleModal }}</v-card-title>
      <v-card-text>
        {{ textContent }}
        <strong>{{ item?.name }}</strong
        >?
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" @click="$emit('close')">{{ cancelBtn }}</v-btn>
        <v-btn color="red" @click="$emit('confirm')">{{ deleteBtn }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { IModal } from "./models/modal.interface";

export default defineComponent({
  name: "Modal",
  props: {
    titleModal: {
      type: String as PropType<IModal["titleModal"]>,
      required: false,
    },
    textContent: {
      type: String as PropType<IModal["textContent"]>,
      required: false,
    },
    cancelBtn: {
      type: String as PropType<IModal["cancelBtn"]>,
      required: false,
    },
    deleteBtn: {
      type: String as PropType<IModal["deleteBtn"]>,
      required: false,
    },
    show: {
      type: Boolean as PropType<IModal["show"]>,
      required: false,
    },
    item: {
      type: Object as PropType<IModal["item"]>,
      required: false,
    },
  },
  emits: ["close", "confirm"],
});
</script>
