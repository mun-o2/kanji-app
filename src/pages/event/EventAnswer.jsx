import { useState } from "react";
import { useParams } from "react-router-dom";
import "./EventAnswer.css";

function EventAnswer() {
    const { groupId, eventId } = useParams();

    const [form, setForm] = useState({
        nickname: "",
        pin: "",
        attendance: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
    const group = groups[groupId];
    const event = group?.events?.find((event) => event.id === eventId);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        const member = group.members.find(
            (member) =>
                member.nickname === form.nickname && member.pin === form.pin
        );

        if (!member) {
            setError("ニックネームまたは暗証番号が違います");
            return;
        }

        const updatedParticipant = {
            memberId: member.id,
            nickname: member.nickname,
            attendance: form.attendance,
            status: "回答済み",
        };

        const updatedEvents = group.events.map((event) => {
            if (event.id !== eventId) return event;

            const otherParticipants = event.participants.filter(
                (p) => p.memberId !== member.id
            );

            return {
                ...event,
                participants: [...otherParticipants, updatedParticipant],
            };
        });

        const updatedGroup = {
            ...group,
            events: updatedEvents,
        };

        groups[groupId] = updatedGroup;
        localStorage.setItem("eventer-groups", JSON.stringify(groups));

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <main className="event-answer-page">
                <div className="event-answer-card">
                    <p className="event-answer-label">eventer</p>
                    <h1>回答が完了しました</h1>
                    <p>{event?.title} への回答を受け付けました。</p>
                </div>
            </main>
        );
    }

    return (
        <main className="event-answer-page">
            <div className="event-answer-card">
                <p className="event-answer-label">eventer</p>
                <h1>{event?.title}</h1>
                <p className="event-answer-description">
                    ニックネームと暗証番号を入力して、出席回答をしてください。
                </p>

                <form className="event-answer-form">
                    <label>
                        ニックネーム
                        <input
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            placeholder="例：みう"
                        />
                    </label>

                    <label>
                        暗証番号
                        <input
                            name="pin"
                            value={form.pin}
                            onChange={handleChange}
                            placeholder="例：0000"
                        />
                    </label>

                    <label>
                        出席
                        <select
                            name="attendance"
                            value={form.attendance}
                            onChange={handleChange}
                        >
                            <option value="">選択してください</option>
                            <option value="参加">参加</option>
                            <option value="不参加">不参加</option>
                            <option value="未定">未定</option>
                        </select>
                    </label>

                    {error && <p className="event-answer-error">{error}</p>}

                    <button type="button" onClick={handleSubmit}>
                        回答する
                    </button>
                </form>
            </div>
        </main>
    );
}
export default EventAnswer;