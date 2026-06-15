import { useNavigate } from "react-router-dom";
import "./styles/Top.css";

function Top() {
  const navigate = useNavigate();

  return (
    <main className="top-page">
      <section className="phone-card top-card">
        <h1 className="app-label">eventer</h1>

        <p className="top-copy">
          イベントの幹事をもっと簡単に。
        </p>

        <p className="hero-text">
          出欠管理・自動席割・当日の連絡まで、幹事の負担をまとめて減らすアプリです。
        </p>

        <div className="top-button">
          <button onClick={() => navigate("/login")}>ルームを作成する</button>
          <button className="join-button" onClick={() => navigate("/rsvp")}>ルームに参加する</button>
        </div>

      </section>
    </main>
  );
}

export default Top;