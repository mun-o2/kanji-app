import { useParams, useNavigate } from "react-router-dom";
import "./EventDetail.css";

function EventDetail() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const events = [
        {
            id: "1",
            name: "新歓飲み会",
            date: "2026/6/20",
            participantsCount: 18,
            status: "受付中",
        },
        {
            id: "2",
            name: "夏打ち上げ",
            date: "2026/8/10",
            participantsCount: 25,
            status: "準備中",
        },
    ];

    const event = events.find((e) => e.id === eventId);

    if (!event) {
        return <p>イベントが見つかりません</p>;
    }

    return (
        <section className="event-detail-page">
            <button className="back-link" onClick={() => navigate("/admin/events")}>
                ← イベント一覧へ
            </button>

            <div className="event-detail-header">
                <div>
                    <h1>{event.name}</h1>
                    <p>{event.date}</p>
                </div>
                <span>{event.status}</span>
            </div>

            <div className="event-summary-grid">
                <div className="summary-card">
                    <p>参加者</p>
                    <strong>{event.participantsCount}人</strong>
                </div>

                <div className="summary-card">
                    <p>席割</p>
                    <strong>未作成</strong>
                </div>

                <div className="summary-card">
                    <p>受付</p>
                    <strong>準備中</strong>
                </div>
            </div>

            <div className="event-action-list">
                <button>参加者を管理</button>
                <button>席割を作成</button>
                <button>当日受付を開く</button>
            </div>
        </section>
    );
}

export default EventDetail;