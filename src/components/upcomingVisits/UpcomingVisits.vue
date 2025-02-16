<script setup>
defineProps({
  arrivalTime: String,
  diagnosis: String,
  numberTooth: Number,
  price: Number,
  prepayment: Boolean,
});
</script>

<template>
  <div class="flex justify-between">
    <div class="flex justify-center gap-4">
      <div class="flex justify-center items-center w-[55px] h-8 rounded-xl mb-5 bg-[#00A6FB]">
        <span class="font-semibold text-white text-sm">{{ arrivalTime }}</span>
      </div>
      <div class="flex flex-col items-start">
        <p class="text-center font-semibold">{{ diagnosis }}</p>
        <div class="flex items-center gap-1">
          <img src="/public/tooth.svg" alt="Tooth" />
          <p class="text-center text-[#00000080]">
            {{ numberTooth }}
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <h2 className="text-green-500 text-[18px] font-semibold ">{{ price }} P</h2>
      <span className="text-[#00000080] text-opacity-40 text-[16px] font-normal">{{
        prepayment ? 'Предоплата' : ''
      }}</span>
    </div>
  </div>
</template>
