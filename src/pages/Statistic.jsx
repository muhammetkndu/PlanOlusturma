import { useEffect, useState } from 'react';
import '../istatistic.css'
import { useTasks } from '../taskProvider';
export default function Statistic(){

    const { tasks, getStats,getCategoryStats,getPlanTypeStats} = useTasks()
    const onGetStats = getStats();
    const onGetCategoryStats = getCategoryStats();
    const onGetPlanTypeStats = getPlanTypeStats();

    const [now,setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        },60000); // 1 dakika da bir güncelliyoruz
        return () => clearInterval(interval);
    },[]);

    // bekleyen ve tamamlananları filtreliyoruz
    // sadece burda kullanacağımız için burda tanımlıyoruz
    const completedTasks = tasks.filter(task=> task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    const lastCompleted = completedTasks.length > 0 ? completedTasks[completedTasks.length -1] : null;
    const lastPending = pendingTasks.length > 0 ? pendingTasks[pendingTasks.length -1] : null;

    function getTimeAgo(dateString) {
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'şimdi';
        if (diffMins < 60) return `${diffMins} dakika önce`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} saat önce`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} gün önce`;
    }

    return (
        <div className="statistics-container">
            <div className="stats-header">
                <h1>İstatistikler</h1>
                <p>Planlarınızın genel durumu ve son aktiviteleriniz burada!</p>
            </div>

            <div className="stats-overview">
                <div className="stat-card completed">
                    <span className="stat-icon"><i className="bi bi-check-circle-fill"></i></span>
                    <h3>Tamamlanan</h3>
                    <span className="stat-number">{onGetStats.completed}</span>
                </div>
                <div className="stat-card pending">
                    <span className="stat-icon"><i className="bi bi-hourglass-split"></i></span>
                    <h3>Bekleyen</h3>
                    <span className="stat-number">{onGetStats.pending}</span>
                </div>
                <div className="stat-card progress">
                    <span className="stat-icon"><i className="bi bi-list-task"></i></span>
                    <h3>Toplam Plan</h3>
                    <span className="stat-number">{onGetStats.total}</span>
                </div>
            </div>

            <div className="stats-section">
                <h2>Kategorilere Göre Dağılım</h2>
                <div className="category-stats">
                    <div className="category-card personal">
                        <div className="category-header">
                            <i className="bi bi-person"></i>
                            <h3>Kişisel</h3>
                        </div>
                        <div className="category-numbers">
                            <span className="total">{onGetCategoryStats.personal.total}</span> / <span className="completed">{onGetCategoryStats.personal.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                    <div className="category-card health">
                        <div className="category-header">
                            <i className="bi bi-heart-pulse"></i>
                            <h3>Sağlık</h3>
                        </div>
                        <div className="category-numbers">
                            <span className="total">{onGetCategoryStats.health.total}</span> / <span className="completed">{onGetCategoryStats.health.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                    <div className="category-card education">
                        <div className="category-header">
                            <i className="bi bi-book"></i>
                            <h3>Eğitim</h3>
                        </div>
                        <div className="category-numbers">
                            <span className="total">{onGetCategoryStats.education.total}</span> / <span className="completed">{onGetCategoryStats.education.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                    <div className="category-card social">
                        <div className="category-header">
                            <i className="bi bi-people"></i>
                            <h3>Sosyal</h3>
                        </div>
                        <div className="category-numbers">
                            <span className="total">{onGetCategoryStats.social.total}</span> / <span className="completed">{onGetCategoryStats.social.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <h2>Plan Türlerine Göre Dağılım</h2>
                <div className="plan-stats">
                    <div className="plan-card daily">
                        <div className="plan-header">
                            <i className="bi bi-calendar-day"></i>
                            <h3>Günlük</h3>
                        </div>
                        <div className="plan-numbers">
                            <span className="total">{onGetPlanTypeStats.daily.total}</span> / <span className="completed">{onGetPlanTypeStats.daily.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                    <div className="plan-card weekly">
                        <div className="plan-header">
                            <i className="bi bi-calendar-week"></i>
                            <h3>Haftalık</h3>
                        </div>
                        <div className="plan-numbers">
                            <span className="total">{onGetPlanTypeStats.weekly.total}</span> / <span className="completed">{onGetPlanTypeStats.weekly.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                    <div className="plan-card monthly">
                        <div className="plan-header">
                            <i className="bi bi-calendar-month"></i>
                            <h3>Aylık</h3>
                        </div>
                        <div className="plan-numbers">
                            <span className="total">{onGetPlanTypeStats.monthly.total}</span> / <span className="completed">{onGetPlanTypeStats.monthly.completed}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <h2>Son Aktiviteler</h2>
                <div className="recent-activities">
                    <div className="activity-item">
                        <span className="activity-icon completed"><i className="bi bi-check-circle"></i></span>
                        <div className="activity-content">
                            <p>{lastCompleted ? lastCompleted.title : 'Henüz Tamamlanan Görev Yok'}</p>
                            <span className="activity-time">{lastCompleted ? getTimeAgo(lastCompleted.createdAt) : ""}</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <span className="activity-icon pending"><i className="bi bi-hourglass-split"></i></span>
                        <div className="activity-content">
                            <p>{lastPending ? lastPending.title : 'Henüz Bekleyen Görev yok'}</p>
                            <span className="activity-time">{lastPending ? getTimeAgo(lastPending.createdAt) : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
