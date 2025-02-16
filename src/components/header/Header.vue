<script setup>
import { ref } from 'vue';
import CalendarList from '../calendar/CalendarList.vue';
const { onChoiceDay, activeDay, daysInMonth, currentDayOfMonth, currentDayOfWeek } = defineProps({
  currentDayOfWeek: Number,
  currentDayOfMonth: Number,
  activeDay: Number,
  daysInMonth: Number,
  onChoiceDay: Function,
});
const inputVisible = ref(false);
</script>

<template>
  <div class="flex flex-col gap-4 pt-9">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-medium">Пациенты</p>
      <div class="flex items-center gap-2">
        <transition
          enter-active-class="transition-transform duration-300 ease-in-out"
          enter-from-class="translate-x-10 opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition-transform duration-300 ease-in-out"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-10 opacity-0"
        >
          <input
            v-if="inputVisible"
            class="w-52 p-2 rounded-xl border border-gray-300 outline-none"
            type="text"
            placeholder="Поиск посещения..."
          />
        </transition>
        <img
          v-if="!inputVisible"
          @click="inputVisible = !inputVisible"
          class="cursor-pointer transition-opacity duration-300 ease-in-out"
          src="/search.svg"
          alt="Search"
        />
      </div>
    </div>
    <div class="flex items-center overflow-x-auto">
      <CalendarList
        :onChoiceDay="onChoiceDay"
        :activeDay="activeDay"
        :daysInMonth="daysInMonth"
        :currentDayOfMonth="currentDayOfMonth"
        :currentDayOfWeek="currentDayOfWeek"
      />
    </div>
  </div>
</template>
