import { useNavigate, useParams } from "react-router-dom";
import "./EventDetail.css";

function EventDetail() {
    const { groupId, eventId } = useParams();

    const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
    const group = groups[groupId];
    const event = group?.events?.find((event) => event.id === eventId);
    const navigate = useNavigate();

    if (!event) {
        return <p>イベントが見つかりません</p>;
    }

    const inviteUrl = `http://localhost:5173/join/${groupId}/events/${eventId}`;

    return (
        <section className="event-detail-page">
            <div className="event-detail-card">
                <h1 className="event-title">{event.title}</h1>

                <div className="event-info">
                    <div
                        className="event-info-item clickable-info"
                        onClick={() => navigate(`/${groupId}/admin/events/${eventId}/participants`)}
                    >
                        <span className="event-info-label">参加者</span>
                        <span className="event-info-value">
                            {event.participants?.length || 0}人
                        </span>
                    </div>

                    <div className="event-info-item">
                        <span className="event-info-label">場所</span>
                        <span className="event-info-value">{event.place}</span>
                    </div>
                </div>

                <div className="invite-section">
                    <h2>参加回答URL</h2>

                    <div className="invite-url">
                        {inviteUrl}
                    </div>

                    <button
                        className="copy-button"
                        onClick={() => navigator.clipboard.writeText(inviteUrl)}
                    >
                        URLをコピー
                    </button>
                </div>
            </div>
        </section>
    );
}

export default EventDetail;