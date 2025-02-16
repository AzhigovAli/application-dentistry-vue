<script setup>
import VisitCard from '../visitCard/VisitCard.vue';

defineProps({
  items: Array,
});
</script>

<template>
  <div v-if="items.length > 0" class="flex flex-col justify-center gap-4">
    <VisitCard
      v-for="item in items"
      :key="item.id"
      :patientId="item.patientId"
      :fullName="item.fullName"
      :diagnosis="item.diagnosis"
      :arrivalTime="item.arrivalTime"
      :status="item.status"
    />
  </div>
  <div v-else>
    <p class="text-center font-medium">Нет записей</p>
  </div>
</template>
