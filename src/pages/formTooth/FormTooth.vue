<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import BackButton from '../../components/backButton/BackButton.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const numbersRight = [38, 37, 36, 35, 34, 33, 32, 31, 41, 42, 43, 44, 45, 46, 47, 48];
const numbersLeft = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];

const selectNumberTooth = ref(null);
const items = ref([]);
const visible = ref(false);
const numberTooths = ref([]);
const selectedFile = ref(null);
const base64Image = ref(null);

const getImageTooth = async () => {
  try {
    if (!selectNumberTooth.value) {
      alert('Выберите зуб');
      return;
    }

    const { data } = await axios.get(
      `https://d085a13c5a9f6271.mokky.dev/formTooth?numberTooth=${selectNumberTooth.value}`,
    );

    items.value = data;
    visible.value = data.length > 0;

    if (data.length === 0) {
      alert(`У зуба ${selectNumberTooth.value} нет рентгена`);
    }
  } catch (error) {
    console.log(error);
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const onFileChange = async (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedFile.value = file;
    base64Image.value = await fileToBase64(file);
    await onAddImageTooth();
  }
};

const onAddImageTooth = async () => {
  try {
    if (!selectNumberTooth.value || !base64Image.value) {
      alert('Сначала выберите зуб и фото!');
      return;
    }

    await axios.post(`https://d085a13c5a9f6271.mokky.dev/formTooth`, {
      numberTooth: selectNumberTooth.value,
      imageUrl: base64Image.value,
    });

    alert('Фото успешно загружено!');
    selectedFile.value = null;
    base64Image.value = null;

    await fetchTeethData();
  } catch (error) {
    console.log(error);
    alert('Ошибка при загрузке фото');
  }
};

const onDeleteImageTooth = async (id) => {
  try {
    await axios.delete(`https://d085a13c5a9f6271.mokky.dev/formTooth/${id}`);
    alert('Фото удалено!');
    await fetchTeethData();
    await getImageTooth();

    if (items.value.length === 0) {
      visible.value = false;
    }
  } catch (error) {
    console.log(error);
    alert('Ошибка при удалении фото');
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get('https://d085a13c5a9f6271.mokky.dev/formTooth');
    numberTooths.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-baseline justify-between">
      <BackButton title="Формула зубов" />
    </div>
    <div class="flex items-center justify-around">
      <div v-if="numberTooths.length <= numbersLeft.length" class="flex flex-col items-end gap-3">
        <span
          v-for="num in numbersLeft"
          :key="num"
          @click="selectNumberTooth = num"
          class="cursor-pointer"
          :class="{
            'text-red-500':
              selectNumberTooth === num || numberTooths.some((tooth) => tooth.numberTooth === num),
          }"
        >
          {{ num }}
        </span>
      </div>
      <img src="/public/form-tooth.png" alt="FormTooth" />
      <div
        v-if="numberTooths.length <= numbersRight.length"
        class="flex flex-col items-start gap-3"
      >
        <span
          v-for="num in numbersRight"
          :key="num"
          @click="selectNumberTooth = num"
          class="cursor-pointer"
          :class="{
            'text-red-500':
              selectNumberTooth === num || numberTooths.some((tooth) => tooth.numberTooth === num),
          }"
        >
          {{ num }}
        </span>
      </div>
    </div>
    <div class="flex flex-col rounded-xl p-6 gap-3 w-full bg-[#F4F4F4]">
      <span class="cursor-pointer" @click="getImageTooth">Открыть фото рентгена</span>
      <span class="cursor-pointer relative">
        Загрузить фото
        <input
          v-if="selectNumberTooth"
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="absolute top-0 right-0 cursor-pointer opacity-0"
        />
      </span>
    </div>
  </div>
  <Dialog v-model:visible="visible" header="Рентген зуба" :style="{ width: '25rem' }">
    <div v-for="item in items" :key="item.id" class="flex items-center gap-4 mb-8">
      <span>Номер зуба: {{ item.numberTooth }}</span>
    </div>
    <div v-for="item in items" :key="item.id" class="flex flex-col gap-4 mb-8">
      <img :src="item.imageUrl" alt="ImageTooth" class="max-w-full h-auto" />
      <Button
        type="button"
        label="Удалить"
        severity="danger"
        @click="onDeleteImageTooth(item.id)"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Закрыть" severity="secondary" @click="visible = false" />
    </div>
  </Dialog>
</template>
