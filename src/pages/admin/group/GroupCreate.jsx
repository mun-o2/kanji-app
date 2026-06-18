import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupCreate.css";

function GroupCreate() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState("");
    const [groupId, setGroupId] = useState("");

    const handleCreateGroup = () => {
        if (!groupName.trim() || !groupId.trim()) return;

        const organizer =
            JSON.parse(localStorage.getItem("eventer-organizer")) || {};

        const newGroup = {
            id: groupId,
            name: groupName,
            organizerName: organizer.nickname || "幹事",
            events: [],
            members: [
                {
                    id: Date.now(),
                    role: "幹事",
                    nickname: organizer.nickname || "",
                    pin: organizer.pin || "",
                    birthDate: organizer.birthDate || "",
                    grade: organizer.grade || "未設定",
                    alcohol: organizer.alcohol || "未設定",
                    allergy: organizer.allergy || "なし",
                    status: "登録済み",
                },
            ],
        };

        const savedGroups =
            JSON.parse(localStorage.getItem("eventer-groups")) || {};

        savedGroups[groupId] = newGroup;

        localStorage.setItem("eventer-groups", JSON.stringify(savedGroups));
        localStorage.setItem("eventer-current-group-id", groupId);

        navigate(`/${groupId}/admin/events`);
    };

    return (
        <main className="group-create-page">
            <div className="group-create-card">
                <p className="group-create-label">eventer</p>
                <h1>ルームを立ち上げる</h1>
                <p className="group-create-description">
                    サークルや団体ごとの管理ルームを作成します。
                </p>

                <form className="group-create-form">
                    <label>
                        グループ名
                        <input
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="例：CHUG"
                        />
                    </label>

                    <label>
                        URL用ID
                        <input
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            placeholder="例：chug"
                        />
                    </label>

                    <button type="button" onClick={handleCreateGroup}>
                        ルームを作成
                    </button>
                </form>
            </div>
        </main>
    );
}

export default GroupCreate;