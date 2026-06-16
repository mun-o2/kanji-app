import { useNavigate } from "react-router-dom";
import "./EventList.css";

function EventList() {
    const navigate = useNavigate();

    const events = [
        {
            id: 1,
            name: "新歓飲み会",
            date: "2026/6/20",
            participantsCount: 18,
            status: "開催済み",
        },
        {
            id: 2,
            name: "夏打ち上げ",
            date: "2026/8/10",
            participantsCount: 25,
            status: "準備中",
        },
    ];

    return (
        <section className="event-list-page">
            <div className="event-list-header">
                <h1>イベント一覧</h1>
                <p>グループ内のイベントを管理できます。</p>
            </div>

            <div className="event-card-list">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="event-card"
                        onClick={() => navigate(`/admin/events/${event.id}`)}
                    >
                        <div className="event-card-top">
                            <h2>{event.name}</h2>
                            <span>{event.status}</span>
                        </div>

                        <p className="event-date">{event.date}</p>

                        <p className="event-participants">
                            参加者 {event.participantsCount}人
                        </p>
                    </div>
                ))}

                <button className="create-event-button">
                    ＋ イベント作成
                </button>
            </div>

        </section>
    );
}

export default EventList;