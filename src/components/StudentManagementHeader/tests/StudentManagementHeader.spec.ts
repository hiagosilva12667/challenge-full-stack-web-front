import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StudentManagementHeader from "../StudentManagementHeader.vue";

describe("StudentManagementHeader", () => {
  it("should render the title correctly", () => {
    const title = "Student Management";
    const wrapper = mount(StudentManagementHeader, {
      props: {
        title,
      },
    });

    const titleElement = wrapper.find(".student-management-header--title");
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toBe(title);
  });

  it("should apply CSS classes correctly", () => {
    const title = "Student Management";
    const wrapper = mount(StudentManagementHeader, {
      props: {
        title,
      },
    });

    const container = wrapper.find(".student-management-header");
    expect(container.exists()).toBe(true);

    const titleElement = wrapper.find(".student-management-header--title");
    expect(titleElement.exists()).toBe(true);
  });
});
