<script setup lang="ts">

import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'createTask', title: string, description: string): void
}>()

const createTaskHandler = () => {
    errorHandler()
    if (!titleError.value && !descriptionError.value) {
        emit('createTask', title.value.trim(), description.value.trim())
    }
    title.value = ''
    description.value = ''
}

const errorHandler = () => {
    titleError.value = false
    descriptionError.value = false

    if (title.value.trim().length === 0) {
        titleError.value = true
    } 
    if (description.value.trim().length === 0) {
        descriptionError.value = true
    }
}

const title = ref('')
const description = ref('')
const titleError = ref(false)
const descriptionError = ref(false)

</script>

<template>
    
<form class="mx-auto my-auto bg-slate-100 px-10 py-5 rounded-md max-w-screen-lg">
    <div class="grid md:grid-cols-3 md:gap-6">
        <div class="">
            <label for="username-success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Title</label>
            <input v-model="title" type="text" id="username-success" class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Le nom de la tache">
            <p v-if="titleError" class="mt-2 text-sm text-red-600 dark:red-green-500">Title ne doit pas être vide</p>
        </div>
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea v-model="description" id="message" rows="4" class="h-14 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description de la tache"></textarea>
            <p v-if="descriptionError" class="mt-2 text-sm text-red-600 dark:red-green-500">Description ne doit pas être vide</p>
        </div>
        <div class="content-center mt-4">
            <button @click.prevent="createTaskHandler" class="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer une nouvelle tâche</button>
        </div>
    </div>
</form>

</template>