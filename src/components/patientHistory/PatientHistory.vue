<script setup>
import BtnTime from '../btnTime/BtnTime.vue';

defineProps({
  _id: String,
  diagnosis: String,
  arrivalTime: String,
  price: Number,
  numberTooth: Number,
  prepayment: Boolean,
});
</script>

<template>
  <div>
    <div :key="_id" className="flex items-center justify-between py-[23px]">
      <div className="flex items-center space-x-3 ">
        <BtnTime :arrivalTime="arrivalTime" />
        <div className="flex flex-col items-start ">
          <h2 className="text-black text-[18px] font-semibold">{{ diagnosis }}</h2>
          <span
            className="flex items-center text-black text-opacity-40 text-[16px] font-normal space-x-2 "
          >
            <img src="/public/tooth.svg" /> <span>{{ numberTooth }}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <h2 className="text-green-500 text-[18px] font-semibold ">{{ price }} P</h2>
        <span className="text-[#00000080] text-opacity-40 text-[16px] font-normal">{{
          prepayment ? 'Предоплата' : ''
        }}</span>
      </div>
    </div>
  </div>
</template>
