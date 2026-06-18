import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./OrganizerLogin.css";

function OrganizerLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const groupId = localStorage.getItem("eventer-current-group-id");



    return (
        <div className="organizer-login-page">
            <h1 className="organizeLogin-label">幹事ログイン</h1>
            <div className="organizeLogin-inputcard">
                <input
                    className="organizeLogin-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス" />
                <input
                    className="organizeLogin-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード" />
            </div>

            <button className="organizeLogin-button" onClick={() => navigate(groupId ? `/${groupId}/admin/events` : "/group/create")}>ログイン</button>
            <div className="divider">
                <span>または</span>
            </div>
            <button className='register-button' onClick={() => navigate("/register")}>アカウントを作成する</button>


        </div >
    );
}

export default OrganizerLogin;