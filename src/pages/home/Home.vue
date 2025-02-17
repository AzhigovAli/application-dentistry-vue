<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Header from '../../components/header/Header.vue';
import VisitList from '../../components/visitList/VisitList.vue';
import AddVisitButton from '../../components/addVisitButton/AddVisitButton.vue';

const activeDay = ref(0);
const currentDate = ref(new Date());
const currentDayOfWeek = ref(currentDate.value.getDay());
const currentDayOfMonth = ref(currentDate.value.getDate());
const searchValue = ref('');
const daysInMonth = ref(
  new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate(),
);
const items = ref([]);

const onChoiceDay = async (dayIndex) => {
  const selectedDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    currentDayOfMonth.value + dayIndex,
  );
  try {
    const month = selectedDate.toLocaleDateString('ru-RU', { month: 'long' });
    const date = selectedDate.getDate();

    const { data } = await axios.get(
      `https://d085a13c5a9f6271.mokky.dev/visits?sortBy=arrivalTime&date=${date}&month=${month}`,
    );
    items.value = data;
  } catch (error) {
    console.log(error);
    items.value = [];
  }
  activeDay.value = dayIndex;
};

const fetchVisits = async () => {
  try {
    const { data } = await axios.get(
      `https://d085a13c5a9f6271.mokky.dev/visits?sortBy=arrivalTime&date=${currentDayOfMonth.value}&month=${currentDate.value.toLocaleDateString(
        'ru-RU',
        { month: 'long' },
      )}`,
    );
    items.value = data;
  } catch (error) {
    console.log(error);
    items.value = [];
  }
};

const filteredItems = computed(() =>
  items.value.filter((item) =>
    item.fullName.toLowerCase().includes(searchValue.value.toLowerCase()),
  ),
);

onMounted(fetchVisits);
</script>

<template>
  <Header
    :searchValue="searchValue"
    @update:searchValue="searchValue = $event"
    :currentDayOfWeek="currentDayOfWeek"
    :currentDayOfMonth="currentDayOfMonth"
    :activeDay="activeDay"
    :daysInMonth="daysInMonth"
    :onChoiceDay="onChoiceDay"
  />
  <hr class="w-[100%] mb-8 border-[#ECECEC]" />
  <VisitList :items="filteredItems" />
  <AddVisitButton />
</template>
