import { useParams } from "react-router-dom";
import "../member/MemberList.css";

function ParticipantList() {
    const { groupId, eventId } = useParams();

    const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
    const group = groups[groupId];
    const event = group?.events?.find((event) => event.id === eventId);

    const participants = event?.participants || [];

    return (
        <section className="memberList-page">
            <div className="memberList-header">
                <div className="memberList-caption">
                    <h1>参加者一覧</h1>
                    <p>{event?.title} の出席回答を確認できます</p>
                </div>
            </div>

            <div className="members-card">
                <table className="members-table">
                    <thead>
                        <tr>
                            <th>ニックネーム</th>
                            <th>出席</th>
                            <th>ステータス</th>
                        </tr>
                    </thead>

                    <tbody>
                        {participants.map((participant) => (
                            <tr key={participant.memberId}>
                                <td className="member-name">{participant.nickname}</td>
                                <td>{participant.attendance}</td>
                                <td>
                                    <span className="role-badge">{participant.status}</span>
                                </td>
                            </tr>
                        ))}

                        {participants.length === 0 && (
                            <tr>
                                <td colSpan="3">まだ回答がありません</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ParticipantList;