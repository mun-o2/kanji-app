import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import "./AdminDashboard.css";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = useParams();

    return (
        <main className="admin-page">
            <aside className="admin-sidebar">
                <h2>eventer</h2>

                <nav className="admin-nav">
                    <p
                        className={location.pathname === "/admin" ? "active" : ""}
                        onClick={() => navigate(`/${groupId}/admin`)}
                    >
                        ホーム
                    </p>
                    <p
                        className={location.pathname === `/${groupId}/admin/events` ? "active" : ""}
                        onClick={() => navigate(`/${groupId}/admin/events`)}
                    >
                        イベント
                    </p>
                    <p
                        className={location.pathname === `/${groupId}/admin/members` ? "active" : ""}
                        onClick={() => navigate(`/${groupId}/admin/members`)}
                    >
                        メンバー
                    </p>
                    <p
                        className={location.pathname === `/${groupId}/admin/settings` ? "active" : ""}
                        onClick={() => navigate(`/${groupId}/admin/settings`)}
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