<script setup lang="ts">
import { reactive } from "vue";
import type { Device } from "../App.vue";

defineProps<{ owners: string[] }>();

const form = reactive<Device>({
  hostname: "",
  device_type: "",
  os_type: "",
  owner_name: "",
});

const errors = reactive({
  hostname: "",
  device_type: "",
  os_type: "",
  owner_name: "",
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", form: Device): void;
}>();

const device_typeOptions = [
  { name: "Pc", value: "pc" },
  { name: "Laptop", value: "laptop" },
  { name: "Mobile", value: "mobile" },
];
const os_typeOptions = [
  { name: "Windows", value: "win" },
  { name: "Linux", value: "lin" },
  { name: "MacOS", value: "macOS" },
  { name: "IOS", value: "iOS" },
  { name: "Android", value: "android" },
];
function clearForm() {
  form.hostname = "";
  form.device_type = "";
  form.os_type = "";
  form.owner_name = "";
}

const validations = reactive({
  hostname: "required",
  device_type: "required",
  os_type: "required",
  owner_name: "required",
});

const validationRules = (rule: string) => {
  if (rule === "required") return /^ *$/;

  return null;
};

function validate() {
  let valid = true;
  clearErrors();
  for (const [field, rule] of Object.entries(validations)) {
    const validation = validationRules(rule);
    if (validation) {
      if (validation.test(form[field as keyof typeof form] || "")) {
        errors[field as keyof typeof errors] = `${field} is ${rule}`;
        valid = false;
      }
    }
  }

  return valid;
}
function clearErrors() {
  errors.hostname = "";
  errors.device_type = "";
  errors.os_type = "";
  errors.owner_name = "";
}

function submitForm() {
  if (validate()) {
    emit("submit", form);
  }
}
function cancelForm() {
  clearForm();
  emit("close");
}
</script>

<template>
  <form>
    <div class="form-input-wrapper">
      <label for="hostname">Hostname</label>
      <input
        type="text"
        name="hostname"
        v-model="form.hostname"
        class="form-input"
      />
      <span class="form-error">{{ errors.hostname }}</span>
    </div>
    <div class="form-input-wrapper">
      <label for="device_type">Device type</label>
      <select name="device_type" v-model="form.device_type" class="form-input">
        <option
          v-for="option in device_typeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
      <span class="form-error">{{ errors.device_type }}</span>
    </div>
    <div class="form-input-wrapper">
      <label for="os_type">Os type</label>
      <select name="os_type" v-model="form.os_type" class="form-input">
        <option
          v-for="option in os_typeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
      <span class="form-error">{{ errors.os_type }}</span>
    </div>

    <div class="flex gap-4">
      <div v-if="owners.length" class="form-input-wrapper">
        <label for="existing-owner">Existing Owners</label>
        <select
          name="existing-owner"
          v-model="form.owner_name"
          class="form-input"
        >
          <option v-for="owner in owners" :key="owner" :value="owner">
            {{ owner }}
          </option>
        </select>
        <span class="form-error">{{ errors.owner_name }}</span>
      </div>
      <div class="form-input-wrapper">
        <label for="new-owner">New owner</label>
        <input
          type="text"
          name="new-owner"
          v-model="form.owner_name"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-actions-wrapper">
      <button type="button" class="btn" @click="cancelForm">Cancel</button>
      <button type="submit" @click="submitForm" class="btn btn-primary">
        Create
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-input-wrapper {
  @apply flex flex-col items-start justify-start w-full;
}
.form-input {
  @apply w-full bg-gray-900 rounded-md p-2;
}
.form-actions-wrapper {
  @apply flex items-center justify-between w-full mt-4;
}
.form-error {
  @apply text-red-500  h-8;
}
</style>
