<script setup lang="ts">

const props = defineProps<{
    id: string
}>()

const emit = defineEmits<{
    (e: 'removeTask', id: string): void
}>()

const removeTaskHandler = () => {
    console.log(props.id)
    emit('removeTask', props.id)
}

</script>

<template>
    <button class="ms-auto -mx-1.5 -my-1.5  bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" @click="removeTaskHandler">
        x
    </button>
</template>

