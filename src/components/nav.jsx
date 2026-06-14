import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <header className="nav">
      <div className="brand">サークル幹事アプリ (MVP)</div>
      <nav>
        <button onClick={() => navigate("/circle")}>ホーム</button>
        <button onClick={() => navigate("/event/create")}>イベント作成</button>
        <button onClick={() => navigate("/admin")}>幹事ダッシュボード</button>
        <button onClick={() => navigate("/day/login")}>当日アクセス</button>
      </nav>
    </header>
  );
}

export default Nav;