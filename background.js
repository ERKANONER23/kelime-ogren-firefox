// Alarm tetiklendiğinde aktif tab'a mesaj gönder
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'wordAlarm') {
    const result = await chrome.storage.sync.get(['words']);
    const words = result.words || [];

    if (words.length === 0) {
      console.log('Kelime listesi boş!');
      return;
    }

    const random = words[Math.floor(Math.random() * words.length)];
    const time = new Date().toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    console.log('Kelime seçildi:', random);

    // Aktif tab'ı bul ve mesaj gönder
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab) {
      try {
        await chrome.tabs.sendMessage(tab.id, {
          action: 'showWord',
          word: {
            en: random.en,
            tr: random.tr
          },
          time: time
        });
        console.log('Mesaj gönderildi, tab:', tab.id);
      } catch (e) {
        console.error('Mesaj gönderilemedi:', e);
        console.log('Content script yüklenmemiş olabilir. Sayfayı yenileyin.');
      }
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Kelime Öğren eklentisi yüklendi!');
});