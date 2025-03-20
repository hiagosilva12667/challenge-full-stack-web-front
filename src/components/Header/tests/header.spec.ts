import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header.vue";

describe("Header", () => {
  it("should render the title correctly", () => {
    const wrapper = mount(Header);

    const title = wrapper.find(".header-title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Instituto JavaScript");
  });

  it("should render the logo correctly", () => {
    const wrapper = mount(Header);

    const logo = wrapper.find(".header-logo");
    expect(logo.exists()).toBe(true);
    expect(logo.attributes("src")).toBe("/src/assets/logo.jpg");
    expect(logo.attributes("size")).toBe("65");
  });

  it("should apply CSS classes correctly", () => {
    const wrapper = mount(Header);

    expect(wrapper.find(".header").exists()).toBe(true);
    expect(wrapper.find(".header-title").exists()).toBe(true);
    expect(wrapper.find(".header-logo").exists()).toBe(true);
  });
});
