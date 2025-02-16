<script setup>
defineProps({
  dayOfMonth: Number,
  dayOfWeek: Number,
  choiceDay: Function,
  isActive: Boolean,
});
const activeStyles = 'bg-[#00A6FB] shadow-blue-900';
const inactiveStyles = 'bg-gray-100 ';
const baseStyles = 'flex flex-col items-center py-[14px] px-[18px] rounded-[10px]';

const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
</script>

<template>
  <div
    @click="choiceDay"
    class="flex flex-col items-center justify-center w-[60px] h-[70px] rounded-xl cursor-pointer"
    :class="`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`"
  >
    <span
      class="text-[20px] font-bold"
      :class="isActive ? 'text-white ' : 'text-black text-opacity-40'"
      >{{ dayOfMonth }}</span
    >
    <p class="text-[12px] font-bold" :class="isActive ? 'text-[#FFFFFF80]' : 'text-[#00000080]'">
      {{ daysOfWeek[dayOfWeek] }}
    </p>
  </div>
</template>
