<template>
  <div class="task-filter">
    <button
      v-for="filter in filters"
      :key="filter.value"
      :class="{ active: currentFilter === filter.value }"
      @click="setFilter(filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { TaskFilter } from "@/types/tasks";

interface FilterOption {
  value: TaskFilter;
  label: string;
}

export default defineComponent({
  name: "TaskFilter",

  setup() {
    const store = useStore();

    const filters: FilterOption[] = [
      { value: "all", label: "Все" },
      { value: "active", label: "Активные" },
      { value: "completed", label: "Завершенные" },
    ];

    const currentFilter = computed(() => store.state.tasks.filter);

    const setFilter = (filter: TaskFilter) => {
      store.dispatch("tasks/setFilter", filter);
    };

    return {
      filters,
      currentFilter,
      setFilter,
    };
  },
});
</script>

<style scoped>
.task-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  button {
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #ccc;
    }

    &.active {
      background: #42b983;
      border-color: #42b983;
      color: white;
    }
  }
}
</style>
