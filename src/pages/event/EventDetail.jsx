import { useParams } from "react-router-dom";
//import "./EventDetail.css";

function EventDetail() {
    const { eventId } = useParams();

    return (
        <section className="event-detail-page">
            <h1>イベント詳細</h1>
            <p>イベントID：{eventId}</p>
        </section>
    );
}

export default EventDetail;