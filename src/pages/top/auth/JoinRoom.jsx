import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinRoom.css";

function JoinRoom() {
    const [joinUrl, setJoinUrl] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!joinUrl.trim()) return;

        const value = joinUrl.trim();

        if (value.startsWith("http")) {
            window.location.href = value;
            return;
        }

        navigate(`/join/${value}`);
    };

    return (
        <main className="join-page">
            <div className="join-card">
                <p className="join-label">eventer</p>
                <h1 className="join-title">ルームに参加</h1>
                <p className="join-description">
                    幹事から共有された招待URL、またはグループIDを入力してください。
                </p>

                <input
                    className="join-input"
                    value={joinUrl}
                    onChange={(e) => setJoinUrl(e.target.value)}
                    placeholder="例：http://localhost:5173/"
                />

                <button className="join-button" onClick={handleJoin}>
                    次へ
                </button>
            </div>
        </main>
    );
}

export default JoinRoom;