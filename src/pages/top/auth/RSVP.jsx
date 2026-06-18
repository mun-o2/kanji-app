import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { createMember } from "../../../mockAPI";
import "./RSVP.css";

function RSVP() {
	const { groupId } = useParams();

	const [submitted, setSubmitted] = useState(false);

	const [form, setForm] = useState({
		nickname: "",
		pin: "",
		birthDate: "",
		grade: "",
		alcohol: "",
		allergy: "",
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		const newMember = await createMember({
			groupId,
			nickname: form.nickname,
			pin: form.pin,
			birthDate: form.birthDate,
			grade: form.grade,
			alcohol: form.alcohol,
			allergy: form.allergy,
		});

		const savedGroups =
			JSON.parse(localStorage.getItem("eventer-groups")) || {};

		const targetGroup = savedGroups[groupId];

		if (targetGroup) {
			targetGroup.members = [...targetGroup.members, newMember];
			savedGroups[groupId] = targetGroup;

			localStorage.setItem("eventer-groups", JSON.stringify(savedGroups));
		}

		setSubmitted(true);
	};

	if (submitted) {
		return (
			<main className="rsvp-page complete-page">
				<div className="rsvp-card complete-card">
					<p className="rsvp-label">eventer</p>
					<h1 className="rsvp-title">登録が完了しました</h1>
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
				<h1 className="rsvp-title">メンバー登録</h1>
				<p className="rsvp-description">
					「{groupId}」に参加するため、情報を登録してください。
				</p>

				<form className="rsvp-form">
					<label>
						ニックネーム
						<input
							name="nickname"
							value={form.nickname}
							onChange={handleChange}
							placeholder="例：ねこ"
						/>
					</label>

					<label>
						暗証番号
						<input
							name="pin"
							value={form.pin}
							onChange={handleChange}
							placeholder="例：0000"
						/>
					</label>

					<label>

						学年
						<select
							name="grade"
							value={form.grade}
							onChange={handleChange}
						>
							<option value="">選択してください</option>
							<option value="B1">B1</option>
							<option value="B2">B2</option>
							<option value="B3">B3</option>
							<option value="B4">B4</option>
							<option value="M1">M1</option>
							<option value="M2">M2</option>
							<option value="その他">その他</option>
						</select>
					</label>


					<label>
						飲酒
						<select
							name="alcohol"
							value={form.alcohol}
							onChange={handleChange}
						>
							<option value="">選択してください</option>
							<option value="可">する</option>
							<option value="不可">しない</option>
							<option value="未成年">未成年</option>
						</select>
					</label>

					<label>
						生年月日
						<input
							name="birthDate"
							type="date"
							value={form.birthDate}
							onChange={handleChange}
						/>
					</label>

					<label>
						アレルギー
						<input name="allergy"
							value={form.allergy}
							onChange={handleChange}
							placeholder="例：卵" />
					</label>

					<button type="button" onClick={handleSubmit}>
						登録する
					</button>
				</form>
			</div>
		</main>
	);
}

export default RSVP;