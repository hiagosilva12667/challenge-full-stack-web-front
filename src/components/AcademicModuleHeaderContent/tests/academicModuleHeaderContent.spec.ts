import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AcademicModuleHeaderContent from "../AcademicModuleHeaderContent.vue";

describe("AcademicModuleHeaderContent", () => {
  it("should render the title correctly", () => {
    const wrapper = mount(AcademicModuleHeaderContent);

    const title = wrapper.find(".title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Módulo acadêmico");
  });

  it("should render the slot content correctly", () => {
    const slotContent = "Slot Content";
    const wrapper = mount(AcademicModuleHeaderContent, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.text()).toContain(slotContent);
  });

  it("should apply CSS classes correctly", () => {
    const wrapper = mount(AcademicModuleHeaderContent);

    const container = wrapper.find(".academic-module-header-content");
    expect(container.exists()).toBe(true);

    const title = wrapper.find(".title");
    expect(title.exists()).toBe(true);
  });
});
