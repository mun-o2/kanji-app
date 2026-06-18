import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventCreate.css";

function EventCreate() {
	const navigate = useNavigate();
	const { groupId } = useParams();

	const [form, setForm] = useState({
		title: "",
		date: "",
		place: "",
		memo: "",
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreate = () => {
		const groups = JSON.parse(localStorage.getItem("eventer-groups")) || {};
		const group = groups[groupId];

		const newEvent = {
			id: `evt-${Date.now()}`,
			title: form.title,
			date: form.date,
			place: form.place,
			memo: form.memo,
			status: "準備中",
			participants: [],
		};

		group.events = [...(group.events || []), newEvent];
		groups[groupId] = group;

		localStorage.setItem("eventer-groups", JSON.stringify(groups));

		navigate(`/${groupId}/admin/events`);
	};

	return (
		<main className="event-create-page">
			<div className="event-create-card">
				<p className="event-create-label">eventer</p>
				<h1>イベント作成</h1>
				<p>グループ内で管理するイベントを作成します。</p>

				<form className="event-create-form">
					<label>
						イベントタイトル
						<input
							name="title"
							value={form.title}
							onChange={handleChange}
							placeholder="例：新歓飲み会"
						/>
					</label>

					<label>
						日付
						<input
							name="date"
							type="date"
							value={form.date}
							onChange={handleChange}
						/>
					</label>

					<label>
						場所
						<input
							name="place"
							value={form.place}
							onChange={handleChange}
							placeholder="例：函館駅前 居酒屋〇〇"
						/>
					</label>

					<label>
						メモ
						<textarea
							name="memo"
							value={form.memo}
							onChange={handleChange}
							placeholder="例：会費3000円、18時集合"
						/>
					</label>

					<button type="button" onClick={handleCreate}>
						作成する
					</button>
				</form>
			</div>
		</main>
	);
}

export default EventCreate;