<template>
  <div class="task-input">
    <input
      v-model.trim="newTaskTitle"
      type="text"
      placeholder="Что нужно сделать?"
      @keyup.enter="handleAddTask"
    />
    <button @click="handleAddTask">
      <span>+</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskInput",

  setup() {
    const store = useStore();
    const newTaskTitle = ref("");

    const handleAddTask = async () => {
      if (newTaskTitle.value) {
        await store.dispatch("tasks/addTask", newTaskTitle.value);
        newTaskTitle.value = "";
      }
    };

    return {
      newTaskTitle,
      handleAddTask,
    };
  },
});
</script>

<style scoped>
.task-input {
  display: flex;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 0 1.25rem;
    background: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #3aa876;
    }

    span {
      font-size: 1.25rem;
      line-height: 1;
    }
  }
}
</style>
