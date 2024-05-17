<script setup lang="ts">

import { onMounted, ref } from 'vue'
import Task from './Task.vue'
import { type TaskType } from '@/App.vue';

enum Categories {TO_MAKE, IN_PROCESS, FINISHED}

const props = defineProps<{
    tasks: TaskType[]
    category: Categories
}>()

const emit = defineEmits<{
    (e: 'removeTask', id: string): void
    (e: 'changeStatus', id: string, statut: string): void
}>()

const removeTask = (id: string) => {
    emit('removeTask', id)
}

const changeStatus = (id: string, statut: string) => {
    emit('changeStatus', id, statut)
}

let categoryClasses = ref("max-w-xs block text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 border ")
let toMakeCategoryClasses = ref("bg-green-100 text-green-800 dark:text-green-400 border-green-400")
let inProcessCategoryClasses = ref("bg-yellow-100 text-yellow-800 dark:text-yellow-400 border-yellow-400")
let finishedCategoryClasses = ref("bg-purple-100 text-purple-800 dark:text-purple-400 border-purple-400")
let columnName = ref("En cours")

onMounted(() => {
    if (props.category === 0) {
        categoryClasses.value = categoryClasses.value.concat(toMakeCategoryClasses.value)
    } else if (props.category === 1) {
        categoryClasses.value = categoryClasses.value.concat(inProcessCategoryClasses.value)
        columnName.value = "À faire"
    } else {
        categoryClasses.value = categoryClasses.value.concat(finishedCategoryClasses.value)
        columnName.value = "Terminée"
    }
})

</script>

<template>
    <div class="mx-auto">
        <span :class="[categoryClasses]">{{ columnName }}</span>
        <template v-if="tasks.length > 0">
            <ul class="mx-auto my-5">
                <li v-for="task in tasks" class="">
                    <Task 
                        :key="task._id" 
                        :id="task._id" 
                        :title="task.title" 
                        :description="task.description"
                        :category="task.category"
                        @removeTask="removeTask"  
                        @changeStatus="changeStatus" />
                </li>
            </ul>
        </template>
        <template v-if="tasks.length === 0">
            <div class="my-2 mx-2">
                Il n'y a pas de tâches ...
            </div>
        </template>
    </div>
    
</template>