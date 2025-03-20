import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Modal from "../Modal.vue";

describe("Modal.vue", () => {
  it("renders the correct content", () => {
    const wrapper = shallowMount(Modal, {
      props: {
        titleModal: "Title Modal",
        textContent: "Text content",
        cancelBtn: "Cancelar",
      },
    });
    expect(wrapper.text()).toContain("Title Modal");
    expect(wrapper.text()).toContain("Text content");
    expect(wrapper.text()).toContain("Cancelar");
  });
});
