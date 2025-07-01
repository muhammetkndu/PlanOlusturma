import { createContext, useContext, useState, useEffect } from "react";

//  Context oluştur
const TaskContext = createContext();

//  Provider component
export const TaskProvider = ({ children }) => {
    // Başlangıçta localStorage'dan veri çek
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    });

    // tasks değiştikçe localStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Görev ekleme
    const addTask = (task) => setTasks(prev => [...prev, task]);

    // Görev tamamlama
    const toggleCompleted = (id) => setTasks(prev =>
        prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );

    // Görev silme
    const deleteTask = (id) => setTasks(prev => prev.filter(task => task.id !== id));

    // istatistik fnks. tamamlananları çekme

    const getStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length
        const pending = total - completed;
        return{total,completed,pending};
    }

    // kategoriye göre toplam ve tamamlanan görev hesaplama
    const getCategoryStats = () => {
        const categories = ['personal', 'health', 'education', 'social'];
        const stats = {}
        categories.forEach(category => {
            const total = tasks.filter(task => task.category === category).length;
            const completed = tasks.filter(task => task.category === category && task.completed).length;
            stats[category] = {total , completed};
        })
        return stats;
    }

    // plan türüne göre toplam ve tamamlanan görev hesaplama
    const getPlanTypeStats = () => {
        const Types = ['daily', 'weekly', 'monthly'];

        const stats = {}
        Types.forEach(type => {
            const total = tasks.filter(task => task.planType === type).length
            const completed = tasks.filter(task => task.planType === type && task.completed).length;
            stats[type] = {total, completed};
        })
        return stats;
    }

    return (
        <TaskContext.Provider value={{tasks, addTask, toggleCompleted, deleteTask,getStats,getCategoryStats,getPlanTypeStats}}>
            {children}
        </TaskContext.Provider>
    );
};

//  Custom hook ile context'i kullanmak kolaylaşır
export const useTasks = () => useContext(TaskContext);