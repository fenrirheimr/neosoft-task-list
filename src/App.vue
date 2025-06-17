<template>
  <div class="app">
    <h1>Мои задачи</h1>
    <div class="container">
      <TaskInput />
      <TaskFilter />
      <TaskList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import TaskInput from "@/components/TaskInput.vue";
import TaskList from "@/components/TaskList.vue";
import TaskFilter from "@/components/TaskFilter.vue";

// немного юмора
console.log(">>>", ("b" + "a" + +"a" + "a").toLowerCase());

export default defineComponent({
  name: "App",

  components: {
    TaskInput,
    TaskList,
    TaskFilter,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("tasks/loadTasks");
    });
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  background: #f5f5f5;
  padding: 1rem;
}

.app {
  max-width: 600px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }

  .container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
