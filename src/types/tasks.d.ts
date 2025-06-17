interface Task {
    id: number
    title: string
    completed: boolean
}

type TaskFilter = 'all' | 'active' | 'completed'