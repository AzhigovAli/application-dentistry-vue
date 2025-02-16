<script setup>
defineProps({
  patientId: Number,
  isActive: Boolean,
  fullName: String,
  diagnosis: String,
  arrivalTime: String,
  status: String,
});
</script>

<template>
  <router-link :to="`/patientCard/${patientId}`">
    <div
      class="flex justify-between cursor-pointer"
      :class="{ 'opacity-50 pointer-events-none': status === 'cancelled' || status === 'accepted' }"
    >
      <div class="w-[330px] flex gap-4">
        <div
          class="flex justify-center items-center w-[55px] h-8 rounded-xl mb-5"
          :class="status === 'upcoming' ? 'bg-[#00A6FB]' : 'bg-[#E9F5FF]'"
        >
          <span
            class="font-semibold text-sm"
            :class="status === 'upcoming' ? 'text-white' : 'text-[#00A6FB]'"
            >{{ arrivalTime }}</span
          >
        </div>
        <div class="flex flex-col items-start">
          <p class="text-center font-semibold">{{ fullName }}</p>
          <p class="text-center text-[#00000080]">{{ diagnosis?.slice(0, 30) }}</p>
        </div>
      </div>
      <img
        v-if="status === 'cancelled'"
        src="/public/cancelled.svg"
        alt="Cancel"
        class="cursor-pointer"
      />
      <img
        v-if="status === 'accepted'"
        src="/public/accepted.svg"
        alt="Accept"
        class="cursor-pointer"
      />
    </div>
  </router-link>
  <hr class="w-full border-[#F3F3F3] mb-5" />
</template>
