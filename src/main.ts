import './assets/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
//@ts-ignore
import Home from './pages/home/Home.vue';
//@ts-ignore
import AddVisit from './pages/addVisit/AddVisit.vue';
//@ts-ignore
import PatientCard from './pages/patientCard/PatientCard.vue';
import App from './App.vue';
//@ts-ignore
import FormTooth from './pages/formTooth/FormTooth.vue';

const app = createApp(App);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/addVisit',
    name: 'addVisit',
    component: AddVisit,
  },
  {
    path: '/addVisit/:id',
    name: 'addVisitPatient',
    component: AddVisit,
  },
  {
    path: '/formTooth/:id',
    name: 'formToothPatient',
    component: FormTooth,
  },
  {
    path: '/patientCard/:id',
    name: 'patientCard',
    component: PatientCard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

app.use(router);

app.use(createPinia());

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount('#app');
