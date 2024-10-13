import React from 'react'
async function loadTasks() {
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/api/tasks/`)
    const tasks = await res.json()
    return tasks
}
async function ListTask() {
    const tasks = await loadTasks()
    console.log(tasks)
    return (
        <div>
            <h1>titulo</h1>
            {tasks.map((task: { title: string }) => (
                <div>
                    <h2>{task.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default ListTask
