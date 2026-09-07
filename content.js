// Font boyutunu kelime uzunluğuna göre ayarla
function adjustFontSize(element, maxFontSize, minFontSize) {
  let fontSize = maxFontSize;
  element.style.fontSize = fontSize + 'px';
  
  // Kelime popup genişliğinden büyükse fontu küçült
  while (element.scrollWidth > element.parentElement.clientWidth - 20 && fontSize > minFontSize) {
    fontSize -= 2;
    element.style.fontSize = fontSize + 'px';
  }
}

function showWordPopup(wordEn, wordTr, time) {
  removeWordPopup();
  
  const popup = document.createElement('div');
  popup.className = 'kelime-ogren-popup';
  popup.id = 'kelime-ogren-popup';
  
  popup.innerHTML = `
    <div class="kelime-popup-en">${wordEn}</div>
    <div class="kelime-popup-divider"></div>
    <div class="kelime-popup-tr" style="opacity: 0; transition: opacity 0.5s ease;">${wordTr}</div>
    <div class="kelime-popup-time">⏰ ${time}</div>
  `;
  
  document.body.appendChild(popup);
  
  // Font boyutlarını ayarla
  const enElement = popup.querySelector('.kelime-popup-en');
  const trElement = popup.querySelector('.kelime-popup-tr');
  
  adjustFontSize(enElement, 48, 24); // İngilizce: 48px max, 24px min
  adjustFontSize(trElement, 28, 16); // Türkçe: 28px max, 16px min
  
  // 5 saniye sonra Türkçeyi göster
  setTimeout(() => {
    if (trElement) {
      trElement.style.opacity = '1';
    }
  }, 5000);
  
  // 10 saniye sonra popup'ı kapat
  setTimeout(() => {
    if (popup.parentNode) {
      popup.style.opacity = '0';
      popup.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => {
        removeWordPopup();
      }, 300);
    }
  }, 10000);
}

function removeWordPopup() {
  const existingPopup = document.getElementById('kelime-ogren-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showWord') {
    showWordPopup(message.word.en, message.word.tr, message.time);
    sendResponse({ success: true });
  }
  return true;
});

if (document.readyState === 'complete') {
  removeWordPopup();
}