const STORAGE_KEY = 'vue-todo-list'

function getSavedTasks(): Task[] {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
}

function saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const fetchTasks = async (): Promise<Task[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(getSavedTasks()), 300)
    })
}

export const createTask = async (title: string): Promise<Task> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const tasks = getSavedTasks()
            const newTask = {
                id: Date.now(),
                title: title.trim(),
                completed: false
            }
            tasks.push(newTask)
            saveTasks(tasks)
            resolve(newTask)
        }, 300)
    })
}

export const toggleTask = async (task: Task): Promise<Task> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const tasks = getSavedTasks()
            const index = tasks.findIndex(t => t.id === task.id)
            if (index !== -1) {
                tasks[index].completed = !tasks[index].completed
                saveTasks(tasks)
            }
            resolve(tasks[index])
        }, 300)
    })
}

export const deleteTask = async (id: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const tasks = getSavedTasks().filter(task => task.id !== id)
            saveTasks(tasks)
            resolve()
        }, 300)
    })
}