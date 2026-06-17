export async function createMember(memberData) {

    const newMember = {
        id: Date.now(),
        role: "メンバー",
        nickname: memberData.nickname,
        pin: memberData.pin,
        birthDate: memberData.birthDate,
        grade: memberData.grade || "未設定",
        alcohol: memberData.alcohol || "未設定",
        allergy: memberData.allergy || "なし",
        status: "登録済み",
    };

    return newMember;
}

