import { useState } from 'react'
import { useTasks } from '../taskProvider'
import '../home.css'

export default function Home() {
    const [showForm, setShowForm] = useState(false);
    const { addTask } = useTasks();

    const handleShowForm = () => {
        setShowForm(true);
    }
    const handleCloseShowForm = () => {
        setShowForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            planType: document.getElementById('plan-type').value,
            category: document.getElementById('plan-category').value,
            title: document.getElementById('title').value,
            detail: document.getElementById('detail').value,
            date: document.getElementById('task-date').value,
            time: document.getElementById('task-time').value,
            id: Date.now(),
            completed: false,
            createdAt: new Date().toISOString()
        }
        addTask(formData)
        setShowForm(false)
        e.target.reset()
        alert('Plan başarıyla eklendi!')
    }

    return (
        <>
            <button className="toAdd" onClick={handleShowForm}> <p>Plan Oluştur</p></button>
            <form onSubmit={handleSubmit} className={`form ${showForm ? 'show' : ''} `}>
                <div className="form">
                    <h3>Yeni Plan Ekle</h3>
                    <i className="bi bi-x" onClick={handleCloseShowForm}></i>
                    <div className="plango">
                        <div className="plan-type">
                            <label htmlFor="task-type">Plan Türü</label>
                            <select id="plan-type" required>
                                <option value="daily">Günlük Plan</option>
                                <option value="weekly">Haftalık Plan</option>
                                <option value="monthly">Aylık Plan</option>
                            </select>
                        </div>
                        <div className="category">
                            <label htmlFor="task-category">Kategori</label>
                            <select id="plan-category">
                                <option value="personal">Kişisel</option>
                                <option value="health">Sağlık</option>
                                <option value="education">Eğitim</option>
                                <option value="social">Sosyal</option>
                            </select>
                        </div>
                    </div>
                    <div className="title">
                        <input type="text" id="title" placeholder="Plan Başlığı" />
                    </div>
                    <div className="detail">
                        <input type="text" id="detail" placeholder="Plan Detayı" />
                    </div>
                    <div className="date">
                        <div className="dateTime">
                            <label htmlFor="task-date">Başlangıç Tarihi</label>
                            <input type="date" id="task-date" required />
                        </div>
                        <div className="time">
                            <label htmlFor="task-time">Saat</label>
                            <input type="time" id="task-time" />
                        </div>
                    </div>
                    <div className="submit">
                        <button type="submit">Gönder</button>
                    </div>
                </div>
            </form>
        </>
    )
}