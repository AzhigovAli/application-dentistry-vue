<script setup>
const props = defineProps({
  phoneNumber: String,
});

const openWhatsApp = () => {
  const cleanedNumber = props.phoneNumber.replace(/\D/g, '');
  window.location.href = `https://wa.me/${cleanedNumber}`;
};
</script>

<template>
  <div class="flex justify-end">
    <button
      @click="openWhatsApp"
      class="flex justify-center items-center w-[45px] h-[45px] bg-[#25D366] rounded-full cursor-pointer"
    >
      <img src="/public/whatsapp.svg" alt="WhatsApp" />
    </button>
  </div>
</template>
