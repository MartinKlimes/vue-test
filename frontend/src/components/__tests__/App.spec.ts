import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import App from "../../App.vue";

describe("App.vue", () => {
  it('displays the modal and form when "Add" button is clicked', async () => {
    const wrapper = mount(App);

    const addButton = wrapper.find('button[type="button"]');
    expect(addButton.exists()).toBe(true);

    await addButton.trigger("click");

    const modal = wrapper.findComponent({ name: "AppModal" });
    expect(modal.exists()).toBe(true);

    const deviceForm = modal.findComponent({ name: "DeviceForm" });
    expect(deviceForm.exists()).toBe(true);
  });

  it("displays the device table with expected data", async () => {
    const wrapper = mount(App);

    const addButton = wrapper.find('button[type="button"]');
    await addButton.trigger("click");

    const deviceForm = wrapper.findComponent({ name: "DeviceForm" });
    expect(deviceForm.exists()).toBe(true);

    await deviceForm.vm.$emit("submit", {
      hostname: "test-hostname",
      device_type: "pc",
      os_type: "win",
      owner_name: "Owner1",
    });
    expect(deviceForm.emitted().submit).toBeTruthy();

    const deviceTable = wrapper.findComponent({ name: "DeviceTable" });
    expect(deviceTable.exists()).toBe(true);
    setTimeout(() => {
      expect(deviceTable.props("items")).toEqual([
        {
          hostname: "test-hostname",
          device_type: "pc",
          os_type: "win",
          owner_name: "Owner1",
        },
      ]);
    }, 100);
  });
});
