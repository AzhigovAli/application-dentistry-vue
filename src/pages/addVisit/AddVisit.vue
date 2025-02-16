<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

import Button from 'primevue/button';
import { getDate } from '../../lib/date';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { hoursOptions } from '../../constants/hoursOptions';
import BackButton from '../../components/backButton/BackButton.vue';
import CalendarList from '../../components/calendar/CalendarList.vue';
import BtnListTime from '../../components/btnListTime/BtnListTime.vue';
import AutoComplete from '../../components/autoComplete/AutoComplete.vue';

const { id } = useRoute().params;
const activeDay = ref(0);
const currentDate = ref(new Date());
const currentDayOfWeek = ref(currentDate.value.getDay());
const currentDayOfMonth = ref(currentDate.value.getDate());
const daysInMonth = ref(
  new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate(),
);
const selectDay = ref(currentDayOfMonth.value);
const items = ref([]);
const arrivalTime = ref(0);
const selectPatient = ref(null);
const diagnosis = ref('');
const price = ref(0);
const numberTooth = ref(0);
const isPrepayment = ref(false);
const isDisabled = ref(true);

const handleActiveDay = (dayIndex) => {
  activeDay.value = dayIndex;
  selectDay.value = (currentDayOfMonth.value + dayIndex) % daysInMonth.value || daysInMonth.value;
};

onMounted(async () => {
  try {
    const { data } = await axios.get('https://d085a13c5a9f6271.mokky.dev/patients');
    items.value = data;
  } catch (error) {
    console.log(error);
    items.value = [];
  }
});

const onClickAddVisit = async () => {
  try {
    await axios.post('https://d085a13c5a9f6271.mokky.dev/visits', {
      patientId: selectPatient.value.id,
      fullName: selectPatient.value.fullName,
      date: selectDay.value,
      prepayment: isPrepayment.value,
      month: currentDate.value.toLocaleDateString('ru-RU', { month: 'long' }),
      diagnosis: diagnosis.value,
      arrivalTime: arrivalTime.value,
      price: price.value,
      numberTooth: numberTooth.value,
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const onChangeArrivalTime = (value) => {
  arrivalTime.value = value;
};

onMounted(async () => {
  if (id) {
    try {
      const { data } = await axios.get(`https://d085a13c5a9f6271.mokky.dev/patients/${id}`);
      selectPatient.value = data;
    } catch (error) {
      console.log(error);
    }
  }
});

watch([selectPatient, diagnosis, price, numberTooth, arrivalTime], () => {
  if (
    selectPatient.value &&
    diagnosis.value &&
    price.value &&
    numberTooth.value &&
    arrivalTime.value
  ) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
  }
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <BackButton :title="'Добавить посещение'" />

    <div class="flex flex-col gap-5">
      <AutoComplete
        v-model:modelValue="selectPatient"
        :items="items"
        placeholder="Выберите пациента..."
        optionLabel="fullName"
        addButtonLabel="Добавить пациента"
        :showImage="true"
      />

      <InputText v-model="diagnosis" placeholder="Введите диагноз..." />
      <div class="flex gap-5">
        <InputText
          v-model.number="numberTooth"
          style="width: 157px"
          placeholder="Номер зуба"
          type="number"
        />
        <InputText v-model.number="price" placeholder="Стоимость" type="number" />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox v-model="isPrepayment" binary />
        <label for="size_large" class="text-lg">Предоплата</label>
      </div>
      <div class="flex flex-col gap-5">
        <p class="text-[#A0A2A4] text-md">{{ getDate() }}</p>
        <div class="flex items-center overflow-x-auto">
          <CalendarList
            :daysInMonth="daysInMonth"
            :currentDayOfMonth="currentDayOfMonth"
            :currentDayOfWeek="currentDayOfWeek"
            :activeDay="activeDay"
            :onChoiceDay="handleActiveDay"
          />
        </div>
      </div>
      <div class="flex flex-col space-y-3 mb-[40px] mt-[23px]">
        <span class="font-medium text-[16px] text-gray-400">Время</span>
        <BtnListTime
          :variant="'secondary'"
          :options="hoursOptions"
          v-model="arrivalTime"
          :value="arrivalTime"
          :key="arrivalTime"
          @change="onChangeArrivalTime"
        />
      </div>
    </div>
    <router-link to="/">
      <Button
        :disabled="isDisabled"
        @click="onClickAddVisit"
        style="width: 100%; color: white"
        label="Добавить посещение"
        severity="info"
      />
    </router-link>
  </div>
</template>
