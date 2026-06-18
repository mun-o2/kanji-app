import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth/RSVP.css"

function OrganizerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
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

  const handleRegister = () => {
    localStorage.setItem("eventer-organizer", JSON.stringify(form));
    navigate("/group/create");
  };

  return (
    <main className="rsvp-page">
      <div className="rsvp-card">
        <p className="rsvp-label">eventer</p>
        <h1 className="rsvp-title">幹事登録</h1>
        <p className="rsvp-description">
          アカウント情報と、メンバーとして必要な情報を登録してください。
        </p>

        <form className="rsvp-form">
          <label>
            メールアドレス
            <input name="email" value={form.email} onChange={handleChange} placeholder="例：abc1234@mail.com" />
          </label>

          <label>
            パスワード
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="例：12345abc" />
          </label>

          <label>
            ニックネーム
            <input name="nickname" value={form.nickname} onChange={handleChange} placeholder="例：ねこ" />
          </label>

          <label>
            学年
            <select name="grade" value={form.grade} onChange={handleChange}>
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
            <select name="alcohol" value={form.alcohol} onChange={handleChange}>
              <option value="">選択してください</option>
              <option value="可">する</option>
              <option value="不可">しない</option>
              <option value="未成年">未成年</option>
            </select>
          </label>

          <label>
            生年月日
            <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
          </label>

          <label>
            アレルギー
            <input name="allergy" value={form.allergy} onChange={handleChange} />
          </label>

          <button type="button" onClick={handleRegister}>
            次へ
          </button>
        </form>
      </div>
    </main>
  );
}

export default OrganizerRegister;