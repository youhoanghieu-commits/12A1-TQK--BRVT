function renderWeekDropdown() {
  const select = document.getElementById('selectWeek');
  if (!select) return;
  select.innerHTML = '';
  for (let i = 1; i <= TOTAL_WEEKS; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = `Tuần ${i} (${i <= 20 ? 'HK1' : 'HK2'})`;
    if (i === selectedWeek) opt.selected = true;
    select.appendChild(opt);
  }
}

function onWeekChange() {
  selectedWeek = parseInt(document.getElementById('selectWeek').value);
  renderWeeklyView();
}

function renderWeeklyView() {
  const current = weeklyData[selectedWeek] || init40WeeksWeeklyData()[selectedWeek];
  const semester = selectedWeek <= 20 ? "Học Kỳ 1" : "Học Kỳ 2";
  document.getElementById('displayWeekBadge').innerText = `Thi Đua Khối 12 • Tuần ${selectedWeek} - ${semester}`;

  document.getElementById('kpiRankBlock').innerText = `Hạng #${current.rankBlock}`;
  document.getElementById('kpiRankSchool').innerText = `Hạng #${current.rankSchool}`;
  document.getElementById('kpiScore').innerHTML = `${current.score} <span class="text-xs font-normal text-slate-400">/ 100đ</span>`;
  document.getElementById('kpiScoreNote').innerText = current.scoreNote;
  document.getElementById('kpiTitle').innerText = current.title;

  const notes = current.notes || ["", "", ""];
  document.getElementById('gvcnNotesContainer').innerHTML = `
    <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl"><span class="font-bold text-amber-900 block mb-0.5">1. Giờ Giấc:</span><p class="text-amber-800">${notes[0]}</p></div>
    <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl"><span class="font-bold text-emerald-900 block mb-0.5">2. Kỷ Luật:</span><p class="text-emerald-800">${notes[1]}</p></div>
    <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl"><span class="font-bold text-blue-900 block mb-0.5">3. Học Tập:</span><p class="text-blue-800">${notes[2]}</p></div>
  `;

  const gs = current.groupScores || { t1: 100, t2: 100, t3: 100, t4: 100 };
  document.getElementById('groupCardsContainer').innerHTML = `
    <div class="p-4 rounded-xl border bg-emerald-50/50"><strong>Tổ 1</strong><p class="font-bold text-emerald-700 text-lg mt-1">${gs.t1}đ</p></div>
    <div class="p-4 rounded-xl border bg-slate-50"><strong>Tổ 2</strong><p class="font-bold text-slate-800 text-lg mt-1">${gs.t2}đ</p></div>
    <div class="p-4 rounded-xl border bg-slate-50"><strong>Tổ 3</strong><p class="font-bold text-slate-800 text-lg mt-1">${gs.t3}đ</p></div>
    <div class="p-4 rounded-xl border bg-slate-50"><strong>Tổ 4</strong><p class="font-bold text-slate-800 text-lg mt-1">${gs.t4}đ</p></div>
  `;

  const historyBars = document.getElementById('historyBarsContainer');
  historyBars.innerHTML = '';
  for (let w = 1; w <= TOTAL_WEEKS; w++) {
    const item = weeklyData[w];
    if (!item) continue;
    const isCurrent = w === selectedWeek;
    historyBars.innerHTML += `
      <div class="p-2 rounded-lg ${isCurrent ? 'bg-emerald-50 border border-emerald-200' : ''}">
        <div class="flex justify-between font-semibold mb-1">
          <span>Tuần ${w} ${isCurrent ? '<strong class="text-emerald-700 font-bold ml-1">● Đang xem</strong>' : ''}</span>
          <span class="text-emerald-700 font-bold">${item.score}đ • Hạng #${item.rankBlock}</span>
        </div>
        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div class="bg-emerald-600 h-full rounded-full" style="width: ${item.score}%"></div>
        </div>
      </div>
    `;
  }
}

function openWeeklyModal() {
  const current = weeklyData[selectedWeek] || init40WeeksWeeklyData()[selectedWeek];
  document.getElementById('modalWeekTitle').innerText = `Tuần ${selectedWeek}`;
  document.getElementById('inputRankBlock').value = current.rankBlock;
  document.getElementById('inputRankSchool').value = current.rankSchool;
  document.getElementById('inputScore').value = current.score;
  document.getElementById('inputTitle').value = current.title;
  document.getElementById('inputScoreNote').value = current.scoreNote;
  document.getElementById('inputNote1').value = current.notes ? current.notes[0] : '';
  document.getElementById('inputNote2').value = current.notes ? current.notes[1] : '';
  document.getElementById('inputNote3').value = current.notes ? current.notes[2] : '';
  document.getElementById('inputScoreT1').value = current.groupScores?.t1 || 100;
  document.getElementById('inputScoreT2').value = current.groupScores?.t2 || 100;
  document.getElementById('inputScoreT3').value = current.groupScores?.t3 || 100;
  document.getElementById('inputScoreT4').value = current.groupScores?.t4 || 100;
  document.getElementById('weeklyModal').classList.remove('hidden');
  document.getElementById('weeklyModal').classList.add('flex');
}

function closeWeeklyModal() {
  document.getElementById('weeklyModal').classList.add('hidden');
  document.getElementById('weeklyModal').classList.remove('flex');
}

function saveWeeklyRecord(e) {
  e.preventDefault();
  weeklyData[selectedWeek] = {
    semester: selectedWeek <= 20 ? "Học Kỳ 1" : "Học Kỳ 2",
    rankBlock: document.getElementById('inputRankBlock').value,
    rankSchool: document.getElementById('inputRankSchool').value,
    score: parseFloat(document.getElementById('inputScore').value) || 100,
    title: document.getElementById('inputTitle').value,
    scoreNote: document.getElementById('inputScoreNote').value,
    notes: [
      document.getElementById('inputNote1').value,
      document.getElementById('inputNote2').value,
      document.getElementById('inputNote3').value
    ],
    groupScores: {
      t1: document.getElementById('inputScoreT1').value,
      t2: document.getElementById('inputScoreT2').value,
      t3: document.getElementById('inputScoreT3').value,
      t4: document.getElementById('inputScoreT4').value
    }
  };
  localStorage.setItem('class_weekly_40w_full_12a1', JSON.stringify(weeklyData));
  renderWeeklyView();
  closeWeeklyModal();
}
