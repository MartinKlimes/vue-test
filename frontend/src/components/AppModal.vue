<script setup lang="ts">

defineProps<{ title: string | null }>();

defineEmits(["close"]);
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal-wrapper-inner">
      <button class="modal-close-button" @click="$emit('close')">
        X
      </button>
      <h3 class="modal-title" v-if="title">{{ title }}</h3>
      <div class="modal-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-wrapper {
    @apply absolute inset-0 flex items-center justify-center z-20 bg-gray-800/40 backdrop-blur;
}

.modal-close-button {
    @apply absolute -right-12 -top-2 text-gray-300 px-3 py-1 hover:text-white border border-gray-700 hover:border-white rounded-lg;
}

.modal-title {
    @apply w-full bg-gray-900 p-4 rounded-t-md text-2xl
}

.modal-wrapper-inner {
    @apply relative w-full max-w-2xl rounded-md flex flex-col shadow-2xl bg-white dark:bg-gray-800 dark:text-white;
}

.modal-inner {
    @apply p-4 space-y-4
}

</style>