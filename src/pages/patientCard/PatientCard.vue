<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BtnPhone from '../../components/btnPhone/BtnPhone.vue';
import BtnWhatsapp from '../../components/btnWhatsapp/BtnWhatsapp.vue';
import BackButton from '../../components/backButton/BackButton.vue';
import PatientInfo from '../../components/patientInfo/PatientInfo.vue';
import BtnFormTooth from '../../components/btnFormTooth/BtnFormTooth.vue';
import UpcomingVisits from '../../components/upcomingVisits/UpcomingVisits.vue';
import PatientHistory from '../../components/patientHistory/PatientHistory.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';

const visible = ref(false);
const { id } = useRoute().params;
const items = ref([]);
const currentDate = ref(new Date());
const currentDayOfMonth = ref(currentDate.value.getDate());
const upcomingVisits = ref([]);
const fullName = ref('');
const phoneNumber = ref('');
const historyVisits = ref([]);

const fetchPatient = async () => {
  try {
    const { data } = await axios.get(`https://d085a13c5a9f6271.mokky.dev/patients/${id}`);
    items.value = data;
    fullName.value = data.fullName;
    phoneNumber.value = data.phoneNumber;
  } catch (error) {
    console.log(error);
    items.value = [];
  }
};

const fetchUpcomingVisits = async () => {
  try {
    const { data } = await axios.get(
      `https://d085a13c5a9f6271.mokky.dev/visits?patientId=${id}&sortBy=-arrivalTime&date=${currentDayOfMonth.value}&limit=1`,
    );
    upcomingVisits.value = data.items;
  } catch (error) {
    console.log(error);
    upcomingVisits.value = [];
  }
};

const fetchHistoryVisits = async () => {
  try {
    const { data } = await axios.get(`https://d085a13c5a9f6271.mokky.dev/visits?patientId=${id}`);
    historyVisits.value = data;
  } catch (error) {
    console.log(error);
    historyVisits.value = [];
  }
};

const onChangePatientInfo = async () => {
  try {
    const { data } = await axios.patch(`https://d085a13c5a9f6271.mokky.dev/patients/${id}`, {
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
    });
    items.value = data;
    visible.value = false;
  } catch (error) {
    console.log(error);
    items.value = [];
  }
};

onMounted(async () => {
  await Promise.all([fetchPatient(), fetchUpcomingVisits(), fetchHistoryVisits()]);
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-baseline justify-between">
      <BackButton :title="'Карта пациента'" />
      <img @click="visible = true" class="cursor-pointer" src="/public/pen.svg" alt="Pen" />
    </div>
    <PatientInfo :fullName="items.fullName" :phoneNumber="items.phoneNumber" />
    <div class="flex items-center gap-4">
      <BtnPhone :phoneNumber="items.phoneNumber" />
      <BtnWhatsapp :phoneNumber="items.phoneNumber" />
      <router-link :to="`/formTooth/${id}`">
        <BtnFormTooth />
      </router-link>
      <router-link :to="`/addVisit/${id}`">
        <div class="flex justify-end">
          <button
            class="flex justify-center items-center w-[45px] h-[45px] bg-[#00A6FB] shadow-[0_4px_4px_0_#00A6FB4D] rounded-full cursor-pointer"
          >
            <img src="/public/plus.svg" alt="Plus" />
          </button>
        </div>
      </router-link>
    </div>
    <div class="flex flex-col gap-7">
      <span class="text-xl font-medium">Предстоящие</span>
      <UpcomingVisits
        v-for="item in upcomingVisits"
        :key="item.id"
        :arrivalTime="item.arrivalTime"
        :diagnosis="item.diagnosis"
        :numberTooth="item.numberTooth"
        :price="item.price"
        :prepayment="item.prepayment"
      />
    </div>
    <div class="flex flex-col gap-7">
      <span class="text-xl font-medium">История посещений</span>
      <PatientHistory
        v-for="item in historyVisits"
        :key="item.id"
        :arrivalTime="item.arrivalTime"
        :diagnosis="item.diagnosis"
        :numberTooth="item.numberTooth"
        :price="item.price"
        :prepayment="item.prepayment"
      />
    </div>
  </div>
  <Dialog v-model:visible="visible" header="Добавить пациента" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">ФИО</label>
      <InputText
        v-model="fullName"
        id="username"
        placeholder="Иванов Иван Иванович"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="phoneNumber" class="font-semibold w-24">Номер</label>
      <InputMask
        v-model="phoneNumber"
        id="phoneNumber"
        class="flex-auto"
        mask="+7 (999) 999-99-99"
        placeholder="+7 (___) ___-__-__"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Закрыть" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Добавить" severity="info" @click="onChangePatientInfo"></Button>
    </div>
  </Dialog>
</template>
