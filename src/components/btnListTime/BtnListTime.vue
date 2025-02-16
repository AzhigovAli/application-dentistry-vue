<script setup>
import { ref } from 'vue';

let buttonClassName = `flex items-center py-[9px] px-[8px] rounded-[10px] w-[55px] h-[32px]`;
let backgroundColor, textColor;

const activeTime = ref(null);

const props = defineProps({
  variant: String,
  options: Array,
  onChange: Function,
});

switch (props.variant) {
  case 'upcoming':
    backgroundColor = 'bg-[#00A6FB]';
    textColor = 'text-white';
    break;
  case 'expectation':
    backgroundColor = 'bg-[#E9F5FF]';
    textColor = 'text-[#4294FF]';
    break;
  case 'skipped':
    backgroundColor = 'bg-[#F2F2F2]';
    textColor = 'text-[#8F8F8F]';
    break;
  case 'cancelled':
    backgroundColor = 'bg-[#FFE5E5]';
    textColor = 'text-[#D08888]';
    break;
  case 'occupied':
    backgroundColor = 'bg-[#F6F6F6] opacity-50';
    textColor = 'text-[#949494]';
    break;
}

const handleClick = (index, item) => {
  activeTime.value = index;
  props.onChange(item);
};
</script>

<template>
  <div class="h-[227px] flex flex-wrap cursor-pointer">
    <div
      v-for="(item, index) in options"
      :key="index"
      @click="handleClick(index, item)"
      class="flex items-center justify-center px-3 rounded-[10px] w-[75px] h-[40px] mx-1 my-1"
      :class="[
        backgroundColor,
        activeTime === index ? 'bg-[#00A6FB] shadow-blue-900' : 'bg-[#F2F2F2]',
      ]"
    >
      <span :class="[textColor, activeTime === index ? 'text-white' : 'text-[#949494]']">
        {{ item }}
      </span>
    </div>
  </div>
</template>
