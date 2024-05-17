<script setup lang="ts">

import { onMounted, reactive, watch} from 'vue'
import Todolist from './components/Todolist.vue'
import CreateNewTask from './components/CreateNewTask.vue'
import TodolistAPI from './DAL/todolist-api'

export type TaskType = {
  _id: string
  title: string
  description: string
  category: string
}
  
enum Categories {
  TO_MAKE,
  IN_PROCESS,
  FINISHED
}

type StateType = {
  tasks: TaskType[]
  tasksToMake: TaskType[]
  tasksInProcess: TaskType[]
  tasksFinished: TaskType[]
}

let state: StateType = reactive({
  tasks: [],
  tasksToMake: [],
  tasksInProcess: [],
  tasksFinished: []
})

const removeTask = (id: string) => {
  console.log(id)
  TodolistAPI.deleteArticleById(id)
    .then(res => res)
    .catch(err => console.error(err))
  let temp = [...state.tasks]
  state.tasks = temp.filter(task => task._id !== id)
}

const changeStatus = (id: string, statut: string) => {
  TodolistAPI.changeTaskById(id, statut)
    .then(res => res)
    .catch(err => console.error(err))
  let temp = [...state.tasks]
  temp.forEach((task, index) => {
    if (task._id === id) temp[index].category = statut
  })
  state.tasks = temp
}

const createTask = (title: string, description: string) => {
  TodolistAPI.createTask(title, description, "TO_MAKE")
    .then(res => {
    let temp = [...state.tasks]
    temp.push({_id: res, description, title, category: "TO_MAKE"})
    state.tasks = temp
  }).catch(err => console.error(err))
}

const filterTasks = () => {
  state.tasksToMake = state.tasks.filter((task) => task.category === "TO_MAKE")
  state.tasksInProcess = state.tasks.filter((task) => task.category === "IN_PROCESS")
  state.tasksFinished = state.tasks.filter((task) => task.category === "FINISHED")
}

watch(() => state.tasks, () => filterTasks())

onMounted(() => {
  TodolistAPI.getAllArticles().then(res => {
    state.tasks = res
    filterTasks()
  }).catch(err => console.error(err))
})

</script>

<template>
  <header></header>

  <main class="m-5">
    <div>
      <CreateNewTask @createTask="createTask" />
      <div class="grid lg:grid-cols-3 gap-2 my-4 mx-auto max-w-screen-lg lg:grid-rows-3">
        <Todolist :tasks="state.tasksToMake" :category="Categories.TO_MAKE" @removeTask="removeTask" @changeStatus="changeStatus" />
        <Todolist :tasks="state.tasksInProcess" :category="Categories.IN_PROCESS" @removeTask="removeTask" @changeStatus="changeStatus" />
        <Todolist :tasks="state.tasksFinished" :category="Categories.FINISHED" @removeTask="removeTask" @changeStatus="changeStatus" />
      </div>
    </div>
  </main>

</template>

<style scoped>
  /* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } */
</style>
