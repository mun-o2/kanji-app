import "./AdminSettings.css";

function AdminSettings() {
    return (
        <section className="settings-page">
            <div className="settings-header">
                <h1>設定</h1>
                <p>グループ情報やイベント管理の設定を確認できます。</p>
            </div>

            <div className="settings-card">
                <h2>グループ情報</h2>

                <div className="setting-row">
                    <span>グループ名</span>
                    <strong>ダンスサークル</strong>
                </div>

                <div className="setting-row">
                    <span>管理者</span>
                    <strong>みう</strong>
                </div>

                <div className="setting-row">
                    <span>メンバー登録</span>
                    <strong>ニックネーム・暗証番号制</strong>
                </div>
            </div>

            <div className="settings-card">
                <h2>今後追加予定</h2>

                <div className="setting-row">
                    <span>LINE連携</span>
                    <strong>未設定</strong>
                </div>

                <div className="setting-row">
                    <span>席割条件</span>
                    <strong>未設定</strong>
                </div>
            </div>
        </section>
    );
}

export default AdminSettings;