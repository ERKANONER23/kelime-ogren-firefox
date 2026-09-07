# 📚 Kelime Öğren (Kelime Öğrenme Eklentisi)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome](https://img.shields.io/badge/Chrome-Uyumlu-green)](https://www.google.com/chrome/)
[![Firefox](https://img.shields.io/badge/Firefox-Uyumlu-orange)](https://www.mozilla.org/firefox/)

İngilizce-Türkçe kelime öğrenmeyi eğlenceli, otomatik ve görsel hale getiren, hem **Google Chrome** hem de **Mozilla Firefox** ile tam uyumlu, açık kaynaklı bir tarayıcı eklentisidir.

---

## ✨ Özellikler

- ⏱️ **Otomatik Bildirim:** Ayarlanabilir zaman aralıklarıyla (dakika bazlı) rastgele kelime gösterimi.
- 📖 **2 Aşamalı Öğrenme:** Kelime önce 5 saniye sadece İngilizce gösterilir, ardından Türkçe karşılığı belirir (Toplam 10 saniye ekranda kalır).
- ➕ **Kolay Yönetim:** Manuel kelime ekleme ve silme özelliği.
- 📁 **CSV Desteği:** Kelime listenizi `.csv` dosyası olarak dışa aktarabilir (Export) veya içe aktarabilirsiniz (Import).
- 🌐 **Çapraz Tarayıcı Desteği:** Manifest V3 mimarisi sayesinde Chrome, Edge, Brave ve Firefox'ta sorunsuz çalışır.
- 🎨 **Modern Tasarım:** Göz yormayan, şık ve minimal karanlık tema (Dark Mode).

---

## 📥 İndirme ve Kurulum

Eklentiyi bilgisayarınıza indirmek için bu sayfanın sağ üst köşesindeki yeşil **"<> Code"** butonuna tıklayıp **"Download ZIP"** seçeneğini kullanabilirsiniz.

### 🦊 Firefox İçin Kurulum
1. İndirdiğiniz `ZIP` dosyasını bilgisayarınızda bir klasöre çıkarın.
2. Firefox'ta yeni bir sekme açın ve adres çubuğuna şunu yazın:  
   `about:debugging#/runtime/this-firefox`
3. Açılan sayfada **"Geçici Eklenti Yükle..."** (Load Temporary Add-on) butonuna tıklayın.
4. Çıkardığınız klasörün içine girin ve **`manifest.json`** dosyasını seçin.
5. Eklenti araç çubuğunuzda görünecektir.

### 🌐 Chrome / Edge / Brave İçin Kurulum
1. İndirdiğiniz `ZIP` dosyasını bilgisayarınızda bir klasöre çıkarın.
2. Tarayıcınızda uzantılar sayfasını açın:  
   - Chrome: `chrome://extensions/`  
   - Edge: `edge://extensions/`
3. Sağ üst köşede bulunan **"Geliştirici modu"** (Developer mode) anahtarını **AÇIK** hale getirin.
4. Sol üstte beliren **"Paketlenmemiş öğe yükle"** (Load unpacked) butonuna tıklayın.
5. Çıkardığınız klasörü seçin. Kurulum tamamdır!

---

## 🎯 Nasıl Kullanılır?

1. Tarayıcınızın sağ üst köşesindeki eklenti simgesine tıklayın.
2. **📖 Öğren** sekmesine gidin.
3. "Bildirim Aralığı"nı istediğiniz dakikaya ayarlayın (Örn: 5 dakika).
4. **"▶ Başlat"** butonuna basın. Belirlediğiniz sürede kelimeler otomatik olarak ekranın üst kısmında belirecektir.
5. **⚙️ Kelimeler** sekmesine giderek kendi kelimelerinizi ekleyebilir, silebilir veya CSV dosyası yükleyebilirsiniz.

---

## 📂 CSV Dosya Formatı

Eğer toplu kelime eklemek isterseniz, `.csv` dosyanızın formatı tam olarak aşağıdaki gibi olmalıdır. İlk satır başlık olarak kabul edilir.

```csv
english,turkish
apple,elma
book,kitap
beautiful,güzel
(Not: Türkçe kelimede virgül varsa, kelimeyi tırnak içine alın. Örn: hello,"merhaba, nasılsın")

## 🛠️ Geliştirme ve Katkıda Bulunma
Bu proje açık kaynaktır ve katkılarınıza açıktır!
Bu depoyu Fork edin.
Yeni bir özellik dalı oluşturun: git checkout -b feature/YeniOzellik
Değişikliklerinizi commit edin: git commit -m 'Yeni özellik eklendi: XYZ'
Dalınızı push edin: git push origin feature/YeniOzellik
Bir Pull Request açın.
## 📄 Lisans
Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakabilirsiniz.
## 🤝 İletişim
Sorularınız, önerileriniz veya hata bildirimleriniz için GitHub Issues bölümünü kullanabilirsiniz.
