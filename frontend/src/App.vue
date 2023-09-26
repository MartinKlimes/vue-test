<script setup lang="ts">
import DeviceTable from "./components/DeviceTable.vue";
import DeviceForm from "./components/DeviceForm.vue";
import AppModal from "./components/AppModal.vue";
import { api } from "../src/api";
import { ref, onMounted, computed } from "vue";

const showForm = ref(false);

export interface Device {
  hostname: string;
  device_type: string;
  os_type: string;
  owner_name: string;
}

const items = ref<Device[]>([]);

const owners = computed(() => {
  const owners = new Set();
  items.value.forEach((item) => owners.add(item.owner_name));
  return Array.from(owners) as string[];
});

onMounted(() => {
  api
    .get("/list")
    .then((res: any) => {
      // Data received from the database and the data that need to be sent to the database have different formats.
      items.value = res.data.map((item: any) => ({
        hostname: item.hostname,
        device_type: item.device_type,
        os_type: item.os_type,
        owner_name: item.owner,
      }));
    })
    .catch((err: any) => {
      console.error(
        "Error while fetching the list of devices from the database:",
        err
      );
    });
});

function addDevice(device: Device) {
  api
    .post("/save", device)
    .then((res: any) => {
      items.value.push(device);
      console.log("Device added successfully. Server response:", res.data);
      showForm.value = false;
    })
    .catch((err: any) => {
      console.error("Error while saving the device to the database:", err);
    });
}
</script>

<template>
  <div class="w-screen h-screen flex p-8 justify-center bg-gray-900">
    <div class="flex flex-col md:flex-row">
      <button
        @click="showForm = true"
        type="button"
        class="h-max btn btn-primary"
      >
        Add
      </button>

      <DeviceTable :items="items" />

      <AppModal
        v-if="showForm"
        :title="'Add new device'"
        @close="showForm = false"
      >
        <DeviceForm
          @submit="addDevice"
          @close="showForm = false"
          :owners="owners"
        />
      </AppModal>
    </div>
  </div>
</template>

