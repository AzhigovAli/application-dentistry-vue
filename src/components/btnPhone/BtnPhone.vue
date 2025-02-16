<script setup>
const props = defineProps({
  phoneNumber: String,
});
const callPhone = () => {
  window.location.href = `tel:${props.phoneNumber}`;
};
</script>

<template>
  <div class="flex justify-end">
    <button
      @click="callPhone"
      class="flex justify-center items-center w-[45px] h-[45px] bg-[#84D269] rounded-full cursor-pointer"
    >
      <img src="/public/phone.svg" alt="Phone" />
    </button>
  </div>
</template>
