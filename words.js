const defaultWords = [
  { en: "Pancake", tr: "Krep" },
  { en: "Coworker", tr: "İş arkadaşı" },
  { en: "Polite", tr: "Nazik" },
  { en: "Neighbor", tr: "Komşu" },
  { en: "Mystery", tr: "Gizem" },
  { en: "Scarf", tr: "Atkı" },
  { en: "Skill", tr: "Beceri" },
  { en: "Together", tr: "Birlikte" },
  { en: "Well", tr: "İyi" },
  { en: "Round", tr: "Yuvarlak" },
  { en: "Here is", tr: "İşte burada" },
  { en: "Important", tr: "Önemli" },
  { en: "Abandon", tr: "Terk etmek" },
  { en: "Ability", tr: "Yetenek" },
  { en: "Achieve", tr: "Başarmak" },
  { en: "Believe", tr: "İnanmak" },
  { en: "Challenge", tr: "Zorluk" },
  { en: "Decision", tr: "Karar" },
  { en: "Environment", tr: "Çevre" },
  { en: "Freedom", tr: "Özgürlük" },
  { en: "Happiness", tr: "Mutluluk" },
  { en: "Imagine", tr: "Hayal etmek" },
  { en: "Journey", tr: "Yolculuk" },
  { en: "Knowledge", tr: "Bilgi" },
  { en: "Language", tr: "Dil" },
  { en: "Memory", tr: "Hafıza" },
  { en: "Opportunity", tr: "Fırsat" },
  { en: "Patience", tr: "Sabır" },
  { en: "Question", tr: "Soru" },
  { en: "Remember", tr: "Hatırlamak" },
  { en: "Success", tr: "Başarı" },
  { en: "Understand", tr: "Anlamak" },
  { en: "Valuable", tr: "Değerli" },
  { en: "Wonder", tr: "Merak etmek" },
  { en: "Experience", tr: "Deneyim" },
  { en: "Beautiful", tr: "Güzel" }
];

function capitalizeTR(str) {
  if (!str) return str;
  return str.charAt(0).toLocaleUpperCase('tr-TR') + str.slice(1).toLocaleLowerCase('tr-TR');
}

function capitalizeEN(str) {
  if (!str) return str;
  return str.charAt(0).toLocaleUpperCase('en-US') + str.slice(1);
}

async function loadWords() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['words'], (result) => {
      if (result.words && result.words.length > 0) {
        resolve(result.words);
      } else {
        chrome.storage.sync.set({ words: defaultWords }, () => {
          resolve(defaultWords);
        });
      }
    });
  });
}