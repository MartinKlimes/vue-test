<script setup lang="ts">
import type { Device } from "../App.vue";

defineProps<{ items: Device[] }>();
</script>

<template>
  <div class="device-table">
    <table class="table">
      <thead class="table-head">
        <tr>
          <th scope="col" class="px-6 py-3">Hostname</th>
          <th scope="col" class="px-6 py-3">Device type</th>
          <th scope="col" class="px-6 py-3">OS type</th>
          <th scope="col" class="px-6 py-3">Owner name</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="`${item.hostname}-${index}`"
          class="table-raw"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item.hostname }}
          </th>
          <td class="px-6 py-4">
            {{ item.device_type }}
          </td>
          <td class="px-6 py-4">
            {{ item.os_type }}
          </td>
          <td class="px-6 py-4">
            {{ item.owner_name }}
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!items.length"
      class="no-devices"
    >
      No devices have been added yet.
    </div>
  </div>
</template>

<style scoped>
.device-table {
  @apply relative overflow-x-auto shadow-md sm:rounded-lg h-max max-h-[500px];
}

.table {
  @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}

.table-head {
  @apply text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0;
}

.table-raw {
  @apply bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600;
}
.no-devices {
  @apply text-white text-xl m-4 text-center font-bold;
}

</style>
