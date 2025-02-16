<script setup>
import CalendarCard from '../calendarCard/CalendarCard.vue';
import { computed } from 'vue';

const { onChoiceDay, activeDay, daysInMonth, currentDayOfMonth, currentDayOfWeek } = defineProps({
  onChoiceDay: Function,
  activeDay: Number,
  daysInMonth: Number,
  currentDayOfMonth: Number,
  currentDayOfWeek: Number,
});

const days = computed(() =>
  Array.from({ length: 31 }, (_, index) => {
    return {
      dayOfMonth: (currentDayOfMonth + index) % daysInMonth || daysInMonth,
      isActive: activeDay === index,
      index,
      onChoiceDay: () => onChoiceDay(index),
    };
  }),
);
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center gap-2">
      <CalendarCard
        v-for="day in days"
        :key="day.index"
        :dayOfMonth="day.dayOfMonth"
        :dayOfWeek="(currentDayOfWeek + day.index - 1) % 7"
        :isActive="day.isActive"
        :choiceDay="day.onChoiceDay"
      />
    </div>
  </div>
</template>
