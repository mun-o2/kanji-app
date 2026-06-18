import { useParams } from "react-router-dom";
import "./AdminSettings.css";

function AdminSettings() {
    const { groupId } = useParams();

    const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
    const group = groups[groupId];

    return (
        <div className="settings-page">

            <div className="settings-header">
                <h1>設定</h1>
                <p>グループ情報やイベント管理の設定を確認できます。</p>
            </div>

            <div className="settings-card">
                <div className="settings-card-title">
                    グループ情報
                </div>

                <div className="settings-row">
                    <span className="settings-label">グループID</span>
                    <span className="settings-value">{group.id}</span>
                </div>

                <div className="settings-row">
                    <span className="settings-label">グループ名</span>
                    <span className="settings-value">{group.name}</span>
                </div>

                <div className="settings-row">
                    <span className="settings-label">管理者</span>
                    <span className="settings-value">{group.organizerName}</span>
                </div>

                <div className="settings-row">
                    <span className="settings-label">メンバー登録</span>
                    <span className="settings-value">
                        ニックネーム・暗証番号制
                    </span>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-title">
                    今後追加予定
                </div>

                <div className="settings-row">
                    <span className="settings-label">LINE連携</span>
                    <span className="settings-value">未設定</span>
                </div>

                <div className="settings-row">
                    <span className="settings-label">席割条件</span>
                    <span className="settings-value">未設定</span>
                </div>
            </div>

        </div>
    );
}

export default AdminSettings;