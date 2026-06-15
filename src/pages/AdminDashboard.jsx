import { useState } from "react";
import "./styles/AdminDashboard.css";

function AdminDashboard() {
    const [selectedUser, setSelectedUser] = useState(null);

    const participants = [
        { name: "山田 太郎", grade: "2年", drink: "飲む", allergy: "なし", status: "参加予定" },
        { name: "佐藤 花子", grade: "2年", drink: "飲まない", allergy: "えび", status: "参加予定" },
        { name: "鈴木 一郎", grade: "3年", drink: "飲む", allergy: "なし", status: "未回答" },
        { name: "田中 美咲", grade: "1年", drink: "飲む", allergy: "ナッツ", status: "参加予定" },
    ];

    return (
        <main className="admin-page">
            <aside className="admin-sidebar">
                <h2>eventer</h2>
                <p>ダッシュボード</p>
                <p className="active">参加者</p>
                <p>席割</p>
                <p>当日受付</p>
                <p>設定</p>
            </aside>

            <section className="admin-content">
                <h1>参加者一覧</h1>

                <div className="summary-cards">
                    <div className="summary-card"><span>参加者</span><strong>18人</strong></div>
                    <div className="summary-card"><span>参加予定</span><strong>15人</strong></div>
                    <div className="summary-card"><span>未回答</span><strong>3人</strong></div>
                </div>

                <table className="participant-table">
                    <thead>
                        <tr>
                            <th>名前</th>
                            <th>学年</th>
                            <th>飲酒</th>
                            <th>アレルギー</th>
                            <th>ステータス</th>
                        </tr>
                    </thead>

                    <tbody>
                        {participants.map((p) => (
                            <tr
                                key={p.name}
                                className="participant-row"
                                onClick={() => setSelectedUser(p)}
                            >
                                <td>{p.name}</td>
                                <td>{p.grade}</td>
                                <td>{p.drink}</td>
                                <td>{p.allergy}</td>
                                <td>{p.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {selectedUser && (
                <div className="modal-backdrop" onClick={() => setSelectedUser(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedUser(null)}>
                            ×
                        </button>

                        <h2>{selectedUser.name}</h2>
                        <p>学年：{selectedUser.grade}</p>
                        <p>飲酒：{selectedUser.drink}</p>
                        <p>アレルギー：{selectedUser.allergy}</p>
                        <p>ステータス：{selectedUser.status}</p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default AdminDashboard;