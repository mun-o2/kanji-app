import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./AdminDashboard.css";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="admin-page">
            <aside className="admin-sidebar">
                <h2>eventer</h2>

                <nav className="admin-nav">
                    <p
                        className={location.pathname === "/admin" ? "active" : ""}
                        onClick={() => navigate("/admin")}
                    >
                        ホーム
                    </p>
                    <p
                        className={location.pathname === "/admin/events" ? "active" : ""}
                        onClick={() => navigate("/admin/events")}
                    >
                        イベント
                    </p>
                    <p
                        className={location.pathname === "/admin/members" ? "active" : ""}
                        onClick={() => navigate("/admin/members")}
                    >
                        メンバー
                    </p>
                    <p
                        className={location.pathname === "/admin/settings" ? "active" : ""}
                        onClick={() => navigate("/admin/settings")}
                    >
                        設定
                    </p>
                </nav>
            </aside>

            <section className="admin-content">
                <Outlet />
            </section>
        </main >
    );
}

export default AdminLayout;