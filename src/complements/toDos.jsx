import { useState, useEffect } from 'react'
import '../todos.css'

export default function Todos() {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all') // all, daily, weekly, monthly

    useEffect(() => {
        // LocalStorage'dan verileri alıyoruz
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        setTasks(savedTasks)
    }, [])

    const handleComplete = (taskId) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    const handleDelete = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true
        return task.planType === filter
    })

    const getCategoryColor = (category) => {
        const colors = {
            personal: '#667eea',
            health: '#2ed573',
            education: '#ffa502',
            social: '#ff4757'
        }
        return colors[category] || '#667eea'
    }

    const getPlanTypeText = (type) => {
        const types = {
            daily: 'Günlük',
            weekly: 'Haftalık',
            monthly: 'Aylık'
        }
        return types[type] || type
    }

    return (
        <div className="todos-container">
            <div className="todos-header">
                <h1>Yapılacaklar Listesi</h1>
                <div className="filter-buttons">
                    <button 
                        className={filter === 'all' ? 'active' : ''} 
                        onClick={() => setFilter('all')}
                    >
                        Tümü
                    </button>
                    <button 
                        className={filter === 'daily' ? 'active' : ''} 
                        onClick={() => setFilter('daily')}
                    >
                        Günlük
                    </button>
                    <button 
                        className={filter === 'weekly' ? 'active' : ''} 
                        onClick={() => setFilter('weekly')}
                    >
                        Haftalık
                    </button>
                    <button 
                        className={filter === 'monthly' ? 'active' : ''} 
                        onClick={() => setFilter('monthly')}
                    >
                        Aylık
                    </button>
                </div>
            </div>

            <div className="tasks-grid">
                {filteredTasks.length === 0 ? (
                    <div className="no-tasks">
                        <i className="bi bi-inbox"></i>
                        <h3>Henüz plan eklenmemiş</h3>
                        <p>Yeni plan eklemek için "Plan Oluştur" butonunu kullanın</p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <div 
                            key={task.id} 
                            className={`task-card ${task.completed ? 'completed' : ''}`}
                            style={{ borderLeft: `4px solid ${getCategoryColor(task.category)}` }}
                        >
                            <div className="task-header">
                                <div className="task-type">
                                    <span className="type-badge">
                                        {getPlanTypeText(task.planType)}
                                    </span>
                                    <span className="category-badge" style={{ backgroundColor: getCategoryColor(task.category) }}>
                                        {task.category}
                                    </span>
                                </div>
                                <div className="task-actions">
                                    <button 
                                        className="complete-btn"
                                        onClick={() => handleComplete(task.id)}
                                    >
                                        <i className={`bi ${task.completed ? 'bi-check-circle-fill' : 'bi-circle'}`}></i>
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="task-content">
                                <h3 className={task.completed ? 'completed-text' : ''}>
                                    {task.title}
                                </h3>
                                <p className={task.completed ? 'completed-text' : ''}>
                                    {task.detail}
                                </p>
                            </div>

                            <div className="task-footer">
                                <div className="task-date">
                                    <i className="bi bi-calendar"></i>
                                    <span>{new Date(task.date).toLocaleDateString('tr-TR')}</span>
                                </div>
                                {task.time && (
                                    <div className="task-time">
                                        <i className="bi bi-clock"></i>
                                        <span>{task.time}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

    