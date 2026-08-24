const TOTAL_WEEKS = 40;

// Dữ liệu học sinh
let students = JSON.parse(localStorage.getItem('class_students_12a1')) || [
  { id: 1, name: "Đặng Thị Kim Anh", gender: "Nữ", group: "Tổ 2", role: "Thành viên", code: "PH12A1-BW6Z-1P8S-IXIG", score: 100, history: [] }
];
let currentStudentId = students.length > 0 ? students[0].id : null;

// Dữ liệu TKB Sáng & Chiều
const defaultTkb = {
  note: "Áp dụng: Năm học 2026 - 2027",
  grid: [
    ["Chào cờ", "Toán", "Vật lí", "Hóa học", "Ngữ văn", "Lịch sử"],
    ["Sinh hoạt", "Toán", "Vật lí", "Hóa học", "Ngữ văn", "Địa lí"],
    ["Toán", "Tiếng Anh", "Hóa học", "Ngữ văn", "Tin học", "GDCD"],
    ["Vật lí", "Tiếng Anh", "Sinh học", "Toán", "Thể dục", "Công nghệ"],
    ["Vật lí", "Tin học", "Sinh học", "Toán", "Thể dục", "Tự học"]
  ],
  afternoonGrid: [
    ["Tăng cường Toán", "Bồi dưỡng Vật lí", "Tăng cường Hóa", "Tăng cường Anh", "Tự chọn KHTN", "Nghỉ"],
    ["Tăng cường Toán", "Bồi dưỡng Vật lí", "Tăng cường Hóa", "Tăng cường Anh", "Tự chọn KHTN", "Nghỉ"],
    ["Luyện đề TN", "Luyện đề TN", "GDQP - AN", "Luyện đề TN", "SH Câu lạc bộ", "Nghỉ"],
    ["Thể thao / CLB", "Thể thao / CLB", "GDQP - AN", "Thể thao / CLB", "SH Câu lạc bộ", "Nghỉ"]
  ]
};
let tkbData = JSON.parse(localStorage.getItem('class_tkb_full_12a1')) || defaultTkb;

// Dữ liệu Báo bài 40 Tuần
function init40WeeksBaoBai() {
  const obj = {};
  for (let w = 1; w <= TOTAL_WEEKS; w++) obj[w] = { t2: "", t3: "", t4: "", t5: "", t6: "", t7: "" };
  return obj;
}
let baobaiData = JSON.parse(localStorage.getItem('class_baobai_40w_12a1')) || init40WeeksBaoBai();
let currentBaoBaiWeek = 1;

// Dữ liệu Thi đua 40 Tuần
function init40WeeksWeeklyData() {
  const data = {};
  for (let w = 1; w <= TOTAL_WEEKS; w++) {
    data[w] = {
      semester: w <= 20 ? "Học Kỳ 1" : "Học Kỳ 2",
      rankBlock: 1, rankSchool: 1, score: 100.0, title: "Cờ Luân Lưu", scoreNote: "0 vi phạm",
      notes: [
        `Tuần ${w}: Toàn thể 12A1 có mặt trước 06:40 truy bài.`,
        `Tuần ${w}: Đồng phục đúng quy định, sơ mi trắng và bảng tên.`,
        `Tuần ${w}: Giữ vững 100% tiết học xếp loại Tốt.`
      ],
      groupScores: { t1: 100, t2: 100, t3: 100, t4: 100 }
    };
  }
  return data;
}
let weeklyData = JSON.parse(localStorage.getItem('class_weekly_40w_full_12a1')) || init40WeeksWeeklyData();
let selectedWeek = 1;

function generateParentCode() {
  const randStr = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PH12A1-${randStr()}-${randStr()}-${randStr()}`;
}
