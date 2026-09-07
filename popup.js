document.addEventListener('DOMContentLoaded', async () => {
  // ========== ELEMENTLER ==========
  const wordEn = document.getElementById('wordEn');
  const wordTr = document.getElementById('wordTr');
  const nextBtn = document.getElementById('nextBtn');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const intervalInput = document.getElementById('intervalInput');
  const status = document.getElementById('status');
  const addBtn = document.getElementById('addBtn');
  const inputEn = document.getElementById('inputEn');
  const inputTr = document.getElementById('inputTr');
  const exportBtn = document.getElementById('exportBtn');
  const importFile = document.getElementById('importFile');
  const wordList = document.getElementById('wordList');
  const wordCount = document.getElementById('wordCount');

  let currentWords = [];

  // ========== KELİMELERİ YÜKLE ==========
  currentWords = await loadWords();

  // ========== RASTGELE KELİME GÖSTER ==========
  function showRandomWord() {
    if (currentWords.length === 0) {
      wordEn.textContent = 'Kelime yok!';
      wordTr.textContent = 'Lütfen kelime ekleyin';
      return;
    }
    const random = currentWords[Math.floor(Math.random() * currentWords.length)];
    wordEn.textContent = random.en;
    wordTr.textContent = random.tr;
  }

  // ========== SONRAKİ KELİME BUTONU - YENİ EKLENDİ ==========
  nextBtn.addEventListener('click', () => {
    showRandomWord();
  });

  // ========== KELİME LİSTESİNİ RENDER ET (SON 10) ==========
  function renderWordList() {
    wordList.innerHTML = '';
    wordCount.textContent = currentWords.length;
    
    if (currentWords.length === 0) {
      wordList.innerHTML = '<div style="color:#666; text-align:center; padding:10px;">Henüz kelime yok</div>';
      return;
    }
    
    // SON 10 KELİME (en son eklenenler)
    const lastTenWords = currentWords.slice(-10).reverse();
    
    lastTenWords.forEach((word) => {
      const originalIndex = currentWords.indexOf(word);
      const item = document.createElement('div');
      item.className = 'word-item';
      item.innerHTML = `
        <div class="word-text">
          <span class="en">${word.en}</span>
          <span class="tr">${word.tr}</span>
        </div>
        <button class="delete-btn" data-index="${originalIndex}">🗑 Sil</button>
      `;
      wordList.appendChild(item);
    });
    
    // 10'dan fazla kelime varsa bilgi göster
    if (currentWords.length > 10) {
      const info = document.createElement('div');
      info.style.cssText = 'color:#666; text-align:center; padding:8px; font-size:11px;';
      info.textContent = `... ve ${currentWords.length - 10} kelime daha (toplam: ${currentWords.length})`;
      wordList.appendChild(info);
    }
    
    // Silme butonlarına event ekle
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const word = currentWords[idx];
        if (confirm(`"${word.en} - ${word.tr}" silinsin mi?`)) {
          currentWords.splice(idx, 1);
          saveWords();
          renderWordList();
          showRandomWord();
        }
      });
    });
  }

  // ========== STORAGE'A KAYDET ==========
  function saveWords() {
    chrome.storage.sync.set({ words: currentWords });
  }

  // ========== YENİ KELİME EKLE ==========
  addBtn.addEventListener('click', () => {
    const en = inputEn.value.trim();
    const tr = inputTr.value.trim();
    
    if (!en || !tr) {
      alert('Lütfen her iki alanı da doldurun!');
      return;
    }
    
    const exists = currentWords.some(w => w.en.toLowerCase() === en.toLowerCase());
    if (exists) {
      alert('Bu kelime zaten listede var!');
      return;
    }
    
    currentWords.push({
      en: capitalizeEN(en),
      tr: capitalizeTR(tr)
    });
    
    saveWords();
    renderWordList();
    showRandomWord();
    inputEn.value = '';
    inputTr.value = '';
    inputEn.focus();
  });

  inputTr.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });
  
  inputEn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') inputTr.focus();
  });

  // ========== CSV EXPORT ==========
  exportBtn.addEventListener('click', () => {
    if (currentWords.length === 0) {
      alert('Dışa aktarılacak kelime yok!');
      return;
    }
    
    let csv = 'english,turkish\n';
    currentWords.forEach(w => {
      const trValue = w.tr.includes(',') ? `"${w.tr}"` : w.tr;
      csv += `${w.en},${trValue}\n`;
    });
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kelimeler_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  });

  // ========== CSV IMPORT ==========
  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(l => l.trim());
      const startIndex = lines[0].toLowerCase().includes('english') ? 1 : 0;
      let added = 0;
      let skipped = 0;
      
      for (let i = startIndex; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;
        
        let parts;
        if (line.includes('"')) {
          const match = line.match(/^([^,]+),\s*"([^"]+)"/);
          if (match) {
            parts = [match[1].trim(), match[2].trim()];
          } else {
            parts = line.split(',');
          }
        } else {
          parts = line.split(',');
        }
        
        if (parts.length >= 2) {
          const en = parts[0].trim();
          const tr = parts.slice(1).join(',').trim().replace(/"/g, '');
          
          if (en && tr) {
            const exists = currentWords.some(w => w.en.toLowerCase() === en.toLowerCase());
            if (!exists) {
              currentWords.push({
                en: capitalizeEN(en),
                tr: capitalizeTR(tr)
              });
              added++;
            } else {
              skipped++;
            }
          }
        }
      }
      
      saveWords();
      renderWordList();
      showRandomWord();
      alert(`${added} yeni kelime eklendi!\n${skipped} kelime atlandı (zaten var).`);
    };
    reader.readAsText(file, 'UTF-8');
    importFile.value = '';
  });

  // ========== BİLDİRİM BAŞLAT ==========
  startBtn.addEventListener('click', async () => {
    const minutes = parseInt(intervalInput.value) || 5;
    
    if (minutes < 1) {
      alert('Aralık en az 1 dakika olmalıdır!');
      return;
    }
    
    await chrome.alarms.create('wordAlarm', { periodInMinutes: minutes });
    await chrome.storage.sync.set({ interval: minutes });
    status.textContent = `✅ Bildirim her ${minutes} dakikada bir aktif`;
    status.style.color = '#4caf50';
  });

  // ========== BİLDİRİM DURDUR ==========
  stopBtn.addEventListener('click', async () => {
    await chrome.alarms.clear('wordAlarm');
    await chrome.storage.sync.set({ interval: 0 });
    status.textContent = 'Bildirim kapalı';
    status.style.color = '#888';
  });

  // ========== SEKME DEĞİŞTİRME ==========
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // ========== İLK AÇILIŞTA ALARM DURUMUNU KONTROL ET ==========
  const allAlarms = await chrome.alarms.getAll();
  const wordAlarm = allAlarms.find(a => a.name === 'wordAlarm');
  
  if (wordAlarm) {
    const mins = Math.round(wordAlarm.periodInMinutes);
    status.textContent = `✅ Bildirim her ${mins} dakikada bir aktif`;
    status.style.color = '#4caf50';
    intervalInput.value = mins;
  } else {
    status.textContent = 'Bildirim kapalı';
    status.style.color = '#888';
  }
  
  chrome.storage.sync.get(['interval'], (result) => {
    if (result.interval && result.interval > 0) {
      intervalInput.value = result.interval;
    }
  });

  // ========== BAŞLANGIÇ ==========
  showRandomWord();
  renderWordList();
});