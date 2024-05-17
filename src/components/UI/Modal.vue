<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps<{
    id: string
    category: string
}>()

const emit = defineEmits<{
    (e: 'changeStatus', id: string, statut: string): void
}>()

const changeStatusHandler = (changedStatus: string) => {
    emit('changeStatus', props.id, changedStatus)
    toggleModal()
}

let hiddenClasses = ref(" hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full")

const toggleModal = () => {
    if (hiddenClasses.value.includes(' hidden ')) {
        hiddenClasses.value = hiddenClasses.value.replace(' hidden ', ' ')
    } else {
        hiddenClasses.value = hiddenClasses.value.concat(' hidden ')
    }
}

</script>

<template>

    <button data-modal-target="default-modal" data-modal-toggle="default-modal" @click="toggleModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1 mt-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Changer le statut
    </button>

    <div id="default-modal" tabindex="-1" aria-hidden="true" :class="[hiddenClasses]">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Changer le statut
                    </h3>
                    <button type="button" @click="toggleModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button v-if="category === 'TO_MAKE' || category === 'FINISHED'" data-modal-hide="default-modal" type="button" @click="changeStatusHandler('IN_PROCESS')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Je le fais</button>
                    <button v-if="category === 'TO_MAKE' || category === 'IN_PROCESS'" data-modal-hide="default-modal" type="button" @click="changeStatusHandler('FINISHED')" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Fini !</button>
                    <button v-if="category === 'FINISHED' || category === 'IN_PROCESS'" data-modal-hide="default-modal" type="button" @click="changeStatusHandler('TO_MAKE')" class="text-white ms-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Je ne le fais pas</button>
                </div>
            </div>
        </div>
    </div>

</template>