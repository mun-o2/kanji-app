import { useParams } from "react-router-dom";
import { useState } from "react";
import "./RSVP.css";

function RSVP() {
	const { groupId } = useParams();
	const [submitted, setSubmitted] = useState(false);

	if (submitted) {
		return (
			<main className="rsvp-page">
				<div className="rsvp-card complete-card">
					<p className="rsvp-label">eventer</p>
					<h1>登録が完了しました</h1>
					<p className="rsvp-description">
						「{groupId}」へのメンバー登録が完了しました。
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="rsvp-page">
			<div className="rsvp-card">
				<p className="rsvp-label">eventer</p>
				<h1>メンバー登録</h1>
				<p className="rsvp-description">
					「{groupId}」に参加するため、情報を登録してください。
				</p>

				<form className="rsvp-form">
					<label>
						ニックネーム
						<input placeholder="例：みう" />
					</label>

					<label>
						暗証番号
						<input type="password" placeholder="4桁の数字" />
					</label>

					<label>
						生年月日
						<input type="date" />
					</label>

					<label>
						アレルギー
						<input placeholder="例：なし" />
					</label>

					<button type="button" onClick={() => setSubmitted(true)}>
						登録する
					</button>
				</form>
			</div>
		</main>
	);
}

export default RSVP;