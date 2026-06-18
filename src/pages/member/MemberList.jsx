import { useState } from "react";
import { useParams } from "react-router-dom";
import "./MemberList.css";

function MemberList() {
    const { groupId } = useParams();

    const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
    const group = groups[groupId];

    const members = group?.members || [];

    const [selectedMember, setSelectedMember] = useState(null);
    const [showInvite, setShowInvite] = useState(false);

    const inviteUrl = `http://localhost:5173/join/${groupId}`;


    const handleSelectMember = (member) => {
        if (selectedMember?.id === member.id) {
            setSelectedMember(null);
        } else {
            setSelectedMember(member);
        }
    };

    return (
        <section className="memberList-page">
            <div className="memberList-header">
                <div className="memberList-caption">
                    <h1>メンバー名簿</h1>
                    <p>グループメンバーを管理します</p>
                </div>
            </div>

            <div className="memberList-nav">
                <input className="member-search" placeholder="ニックネームで検索" />
                <button
                    className="member-add-button"
                    onClick={() => setShowInvite(true)}
                >
                    ＋
                </button>
            </div>

            <div className="members-card">
                <table className="members-table">
                    <thead>
                        <tr>
                            <th>ロール</th>
                            <th>ニックネーム</th>
                            <th>生年月日</th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((member) => (
                            <>
                                <tr
                                    key={member.id}
                                    className={selectedMember?.id === member.id ? "selected-row" : ""}
                                    onClick={() =>
                                        setSelectedMember(
                                            selectedMember?.id === member.id ? null : member
                                        )
                                    }
                                >
                                    <td>
                                        <span className="role-badge">{member.role}</span>
                                    </td>
                                    <td className="member-name">{member.nickname}</td>
                                    <td>{member.birthDate}</td>
                                </tr>

                                {selectedMember?.id === member.id && (
                                    <tr className="member-detail-row">
                                        <td colSpan="3">
                                            <div className="member-inline-detail">
                                                <div className="detail-item">
                                                    <span>学年</span>
                                                    <strong>{member.grade}</strong>
                                                </div>

                                                <div className="detail-item">
                                                    <span>飲酒</span>
                                                    <strong>{member.alcohol}</strong>
                                                </div>

                                                <div className="detail-item">
                                                    <span>アレルギー</span>
                                                    <strong>{member.allergy}</strong>
                                                </div>

                                                <div className="detail-item">
                                                    <span>ステータス</span>
                                                    <strong>{member.status}</strong>
                                                </div>

                                                <button className="detail-edit-button">編集</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {showInvite && (
                <div className="invite-overlay" onClick={() => setShowInvite(false)}>
                    <div className="invite-popover" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="invite-close-button"
                            onClick={() => setShowInvite(false)}
                        >
                            ×
                        </button>

                        <p className="invite-label">招待URL</p>
                        <h2>メンバーを招待</h2>
                        <p className="invite-description">
                            このURLを共有すると、メンバーがグループに参加できます。
                        </p>

                        <div className="invite-url-box">
                            <span>{inviteUrl}</span>
                        </div>

                        <button
                            className="invite-copy-button"
                            onClick={() => navigator.clipboard.writeText(inviteUrl)}
                        >
                            URLをコピー
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
}

export default MemberList;