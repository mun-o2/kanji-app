const mock = {
  events: [
    {
      id: 'evt1',
      title: '春の飲み会',
      date: '2026-06-20',
      participants: [
        { id: 'p1', name: '田中', pin: '1234', status: '到着', seat: 'T1-S1' },
        { id: 'p2', name: '佐藤', pin: '2345', status: '未回答', seat: null },
        { id: 'p3', name: '鈴木', pin: '3456', status: '未回答', seat: null }
      ]
    }
  ],
  members: [
    {
      id: 1,
      role: "メンバー",
      nickname: "みう",
      pin: "1234",
      birthDate: "2005/04/12",
      grade: "3年",
      alcohol: "可",
      allergy: "なし",
      status: "登録済み",
    },
  ],

};

export default mock
