import { fetchTasks, createTask, toggleTask, deleteTask } from '@/api/tasks'
import { Task, TaskFilter } from '@/types/tasks'

interface TasksState {
    items: Task[]
    filter: TaskFilter
    loading: boolean
}

export default {
    namespaced: true,

    state: (): TasksState => ({
        items: [],
        filter: 'all',
        loading: false
    }),

    mutations: {
        SET_TASKS(state: TasksState, tasks: Task[]) {
            state.items = tasks
        },
        ADD_TASK(state: TasksState, task: Task) {
            state.items.unshift(task)
        },
        UPDATE_TASK(state: TasksState, updatedTask: Task) {
            const index = state.items.findIndex(t => t.id === updatedTask.id)
            if (index !== -1) {
                state.items.splice(index, 1, updatedTask)
            }
        },
        REMOVE_TASK(state: TasksState, id: number) {
            state.items = state.items.filter(task => task.id !== id)
        },
        SET_FILTER(state: TasksState, filter: TaskFilter) {
            state.filter = filter
        },
        SET_LOADING(state: TasksState, isLoading: boolean) {
            state.loading = isLoading
        }
    },

    actions: {
        async loadTasks({ commit }) {
            commit('SET_LOADING', true)
            try {
                const tasks = await fetchTasks()
                commit('SET_TASKS', tasks)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async addTask({ commit }, title: string) {
            if (!title.trim()) return

            commit('SET_LOADING', true)
            try {
                const task = await createTask(title)
                commit('ADD_TASK', task)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async toggleTaskStatus({ commit }, task: Task) {
            commit('SET_LOADING', true)
            try {
                const updatedTask = await toggleTask(task)
                commit('UPDATE_TASK', updatedTask)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async removeTask({ commit }, id: number) {
            commit('SET_LOADING', true)
            try {
                await deleteTask(id)
                commit('REMOVE_TASK', id)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        setFilter({ commit }, filter: TaskFilter) {
            commit('SET_FILTER', filter)
        }
    },

    getters: {
        filteredTasks: (state: TasksState) => {
            switch (state.filter) {
                case 'active':
                    return state.items.filter(task => !task.completed)
                case 'completed':
                    return state.items.filter(task => task.completed)
                default:
                    return state.items
            }
        },
        activeCount: (state: TasksState) => {
            return state.items.filter(task => !task.completed).length
        },
        isLoading: (state: TasksState) => state.loading
    }
}