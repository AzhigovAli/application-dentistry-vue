<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <router-link to="/">
    <div class="flex items-center gap-3 cursor-pointer pt-9">
      <img src="/public/arrow.svg" alt="Arrow" />
      <p class="text-[#2A86FF] text-xl font-semibold">{{ title }}</p>
    </div>
  </router-link>
</template>
