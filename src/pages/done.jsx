import { useTasks } from '../taskProvider';
import '../done.css'

export default function Done() {
    const { tasks } = useTasks();
    const doneTasks = tasks.filter(task => task.completed);

    return (
        <div className="done">
            <h1>Tamamlanan Görevler</h1>
            {doneTasks.length === 0 ? (
                <p>Henüz Tamamlanan Görev Yok</p>
            ) : (
                doneTasks.map(task => (
                    <div key={task.id} className="detail">
                        <h3>{task.title}</h3>
                        <p>{task.detail}</p>
                    </div>
                ))
            )}
        </div>
    );
}