<script setup>
const props = defineProps({
  fullName: String,
  phoneNumber: String,
});
</script>

<template>
  <div class="flex flex-col">
    <p class="text-3xl font-bold">{{ props.fullName }}</p>
    <p class="text-[#A0A2A4] text-lg">{{ props.phoneNumber }}</p>
  </div>
</template>
