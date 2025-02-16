<script setup>
import { ref, watch } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import axios from 'axios';

const visible = ref(false);
const phoneValue = ref('');
const fullNameValue = ref('');

const filteredItems = ref([]);

const props = defineProps({
  modelValue: Object,
  items: Array,
  placeholder: String,
  optionLabel: String,
  addButtonLabel: String,
  showImage: Boolean,
});

const emit = defineEmits(['update:modelValue', 'item-select']);

const selectedItem = ref(props.modelValue);

const search = (event) => {
  filteredItems.value = props.items.filter((item) => {
    return item[props.optionLabel].toLowerCase().startsWith(event.query.toLowerCase());
  });
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedItem.value = newValue;
  },
);

const onClickAddPatient = async () => {
  try {
    const { data } = await axios.post('https://d085a13c5a9f6271.mokky.dev/patients', {
      fullName: fullNameValue.value,
      phoneNumber: phoneValue.value,
    });

    props.items.push({
      id: data.id,
      fullName: data.fullName,
      phoneNumber: data.phone,
    });

    visible.value = false;
  } catch (error) {
    console.log(error);
  }
};

const onSelectItem = (event) => {
  selectedItem.value = event;
  emit('update:modelValue', event);
  emit('item-select', event);
};
</script>

<template>
  <div class="flex">
    <AutoComplete
      v-model="selectedItem"
      :suggestions="filteredItems"
      :optionLabel="optionLabel"
      :placeholder="placeholder"
      :dropdown="true"
      @complete="search"
      @update:modelValue="onSelectItem"
      class="w-full"
    >
      <template #option="slotProps">
        <div class="flex items-center">
          <img
            v-if="showImage"
            :alt="slotProps.option[optionLabel]"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            style="width: 18px; margin-right: 8px"
          />
          <div>{{ slotProps.option[optionLabel] }}</div>
        </div>
      </template>
      <template #header>
        <div class="font-medium px-3 py-2">{{ placeholder }}</div>
      </template>
      <template #footer>
        <div class="px-3 py-3">
          <Button
            :label="addButtonLabel"
            @click="visible = true"
            fluid
            severity="light"
            text
            class="bg-[#E9F5FF] border-none"
            size="small"
            icon="pi pi-plus"
          />
        </div>
      </template>
    </AutoComplete>
  </div>
  <Dialog v-model:visible="visible" header="Добавить пациента" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">ФИО</label>
      <InputText v-model="fullNameValue" id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Номер</label>
      <InputMask
        id="phoneValue"
        v-model="phoneValue"
        mask="+7 (999) 999-99-99"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Закрыть" severity="secondary" @click="visible = false" />
      <Button type="button" label="Добавить" severity="info" @click="onClickAddPatient" />
    </div>
  </Dialog>
</template>
