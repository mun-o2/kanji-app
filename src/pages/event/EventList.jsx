import { useNavigate, useParams } from "react-router-dom";
import "./EventList.css";

function EventList() {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
    const group = groups[groupId];

    const events = group?.events || [];

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
                        onClick={() => navigate(`/${groupId}/admin/events/${event.id}`)}
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