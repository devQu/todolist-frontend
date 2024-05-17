<script setup lang="ts">
import { ref } from 'vue'
import DeleteIcon from './UI/DeleteIcon.vue';
import ToMake from './icons/ToMake.vue';
import InProcess from './icons/InProcess.vue';
import Finished from './icons/Finished.vue';
import Modal from './UI/Modal.vue';

const props = defineProps<{
    title: string
    description: string
    id: string
    category: string
}>()

const emit = defineEmits<{
    (e: 'removeTask', id: string): void
    (e: 'changeStatus', id: string, statut: string): void
}>()

const removeTask = () => {
    emit('removeTask', props.id)
}

const changeStatus = (id: string, statut: string) => {
    emit('changeStatus', id, statut)
}

const isToMake = ref(props.category === 'TO_MAKE')
const isInProcess = ref(props.category === 'IN_PROCESS')
const isFinished = ref(props.category === 'FINISHED')

</script>

<template>
    <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <template v-if="isToMake">
                <ToMake />
            </template>
            <template v-if="isInProcess">
                <InProcess />
            </template>
            <template v-if="isFinished">
                <Finished />
            </template>
        </div>
        <div class="ms-3 mx-3 min-w-40">
            <h5 v-if="isFinished" class="font-bold line-through">{{ title }}</h5> 
            <h5 v-else class="font-bold">{{ title }}</h5>
            <div class="text-sm font-normal">{{ description }}</div>
            <Modal @changeStatus="changeStatus" :id="id" :category="category" />
        </div>
        <DeleteIcon @removeTask="removeTask" :id="id" />
    </div>
</template>