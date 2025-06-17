<template>
  <div class="task-list">
    <div v-if="isLoading" class="loading">Загрузка...</div>

    <template v-else>
      <div v-if="!filteredTasks.length" class="empty">Нет задач</div>

      <ul v-else>
        <li v-for="task in filteredTasks" :key="task.id" class="task-item">
          <label>
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(task)"
            />
            <span :class="{ completed: task.completed }">{{ task.title }}</span>
          </label>
          <button @click="removeTask(task.id)" class="delete-btn">
            &times;
          </button>
        </li>
      </ul>

      <div class="summary">Осталось задач: {{ activeCount }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskList",

  setup() {
    const store = useStore();

    const filteredTasks = computed(() => store.getters["tasks/filteredTasks"]);
    const activeCount = computed(() => store.getters["tasks/activeCount"]);
    const isLoading = computed(() => store.getters["tasks/isLoading"]);

    const toggleTask = (task: Task) => {
      store.dispatch("tasks/toggleTaskStatus", task);
    };

    const removeTask = (id: number) => {
      store.dispatch("tasks/removeTask", id);
    };

    return {
      filteredTasks,
      activeCount,
      isLoading,
      toggleTask,
      removeTask,
    };
  },
});
</script>

<style scoped>
.task-list {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .loading,
  .empty {
    padding: 1.5rem;
    text-align: center;
    color: #666;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .task-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
      background: #f9f9f9;

      .delete-btn {
        opacity: 1;
      }
    }

    label {
      flex: 1;
      display: flex;
      align-items: center;
      cursor: pointer;

      input {
        margin-right: 0.75rem;
      }

      .completed {
        text-decoration: line-through;
        color: #999;
      }
    }

    .delete-btn {
      opacity: 0;
      background: none;
      border: none;
      color: #ff5a5f;
      font-size: 1.25rem;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        color: #d43c41;
      }
    }
  }

  .summary {
    padding: 0.75rem 1rem;
    border-top: 1px solid #f0f0f0;
    font-size: 0.875rem;
    color: #666;
  }
}
</style>
