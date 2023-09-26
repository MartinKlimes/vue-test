import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AppModal from "../AppModal.vue";

describe("AppModal.vue", () => {
  it("renders the modal with title from props", async () => {
    const title = "Test Modal";
    const wrapper = mount(AppModal, {
      props: {
        title: title,
      },
      slots: {
        default: "<p>Modal Content</p>",
      },
    });

    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find(".modal-title").text()).toBe(title);
    expect(wrapper.find(".modal-inner").text()).toBe("Modal Content");
  });

  it("when close button is clicked emits a close event", async () => {
    const wrapper = mount(AppModal, {
      props: {
        title: "Test Modal",
      },
      slots: {
        default: "<p>Modal Content</p>",
      },
    });

    await wrapper.find(".modal-close-button").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
