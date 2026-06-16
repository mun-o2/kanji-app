import "./RSVP.css";

function RSVP() {
	return (
		<main className="rsvp-page">
			<div className="rsvp-card">
				<p className="rsvp-label">eventer</p>
				<h1>イベント参加登録</h1>
				<p className="rsvp-description">
					ニックネームと暗証番号を登録して、イベントに参加できます。
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
						<input placeholder="例：甲殻類、なし" />
					</label>

					<button type="button">登録する</button>
				</form>
			</div>
		</main>
	);
}

export default RSVP;