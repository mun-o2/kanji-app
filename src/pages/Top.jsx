import { useNavigate } from "react-router-dom";

function Top() {
  const navigate = useNavigate();

  return (
    <main className="top-page">
      <section className="hero-card">
        <p className="app-label">KanjiApp</p>

        <h1>
          サークルの飲み会を
          <br />
          もっと簡単に
        </h1>

        <p className="hero-text">
          出欠管理・自動席割・当日の連絡まで、幹事の負担をまとめて減らすアプリです。
        </p>

        <div className="top-actions">
          <button onClick={() => navigate("/login")}>幹事ログイン</button>
          <button className="secondary" onClick={() => navigate("/register")}>
            新規登録
          </button>
        </div>

        <button className="text-button" onClick={() => navigate("/rsvp")}>
          参加者はこちら
        </button>
      </section>
    </main>
  );
}

export default Top;