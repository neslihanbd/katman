# Katman Kurulum Rehberi (tek seferlik)

Bu rehber, Katman sitesini sıfırdan yayına almak için tek seferlik kurulum adımlarını anlatır.

> Ekran adları: Netlify ve GitHub arayüzleri sık değişir. Emin olmadığımız ekran adlarını "(ekran adı farklı olabilir)" diye, doğrulanamayan davranışları "doğrulanmadı" diye işaretledik.

## Mimari özet

- Hugo + PaperMod teması (Hugo modülü, `go.mod` içinde sabit) + Decap CMS 3.17.1.
- Kod ve içerik GitHub'da: `sadettindemirel/katman` (public).
- Yayın Netlify'da (Free plan). Site adresi: `https://katmanlar.netlify.app` (Netlify proje adı: `katmanlar`), panel: `/admin/`.
- Kimlik doğrulama: Netlify'ın GitHub OAuth sağlayıcısı. **Netlify Identity ve Git Gateway kullanılmıyor** (Git Gateway kullanımdan kalkıyor ve open authoring'i desteklemiyor).
- Open authoring: öğrenci kendi GitHub hesabıyla girer, repo kendi hesabına fork'lanır, yazı PR olarak gelir. Öğrencinin Netlify hesabı gerekmez.

## Sıra

(a) Yeni Netlify hesabı > (b) Projeyi içe aktar ve GitHub App'i kısıtla > (c) Build ayarları > (d) Site adı > (e) Branches and deploy contexts > (f) Sensitive variable policy > (g) GitHub OAuth App > (h) Netlify OAuth sağlayıcısı > (i) Adres değişirse > (j) Özel alan adı > (k) Uçtan uca test.

---

## (a) Yeni Netlify hesabı

Bu siteye ait ayrı, yeni bir Netlify hesabı aç. Kişisel ya da başka projelerle karışmasın. Free plan kredisi hesap bazlıdır. Kredi biterse hesaptaki tüm siteler durur.

1. https://app.netlify.com/signup adresine git.
2. GitHub ile kayıt olabilirsin ya da e-posta ile açabilirsin. E-posta ile açıyorsan bu proje için ayrılmış bir adres kullan.
3. E-postanı doğrula.
4. Plan olarak Free'yi koru.

## (b) Projeyi içe aktarma ve GitHub App'i yalnızca bu repoya kısıtlama

1. Netlify'da **Add new project** (ya da Add new site) > **Import an existing project** seç.
2. Sağlayıcı olarak **GitHub**'ı seç.
3. Netlify GitHub App'ini yüklerken GitHub bir yetki ekranı gösterir. **Only select repositories** seç ve yalnızca `sadettindemirel/katman` reposunu işaretle. **Install** de.
4. Listeden `sadettindemirel/katman` reposunu seç.
5. Dal olarak `main`'i seç. Build ayarlarını elle değiştirme (bölüm c).
6. **Deploy** de.

Kısıtlamayı sonradan kontrol etmek ya da düzeltmek:

1. GitHub > sağ üst profil > **Settings**.
2. **Integrations** > **Applications** > **Installed GitHub Apps** (ekran adı farklı olabilir).
3. **Netlify** > **Configure**.
4. **Repository access** bölümünde **Only select repositories** seçili olmalı.
5. Listede yalnızca `sadettindemirel/katman` olmalı. Fazlalık varsa kaldır.
6. **Save**.

## (c) Build ayarları

Build komutu, publish klasörü, Hugo ve Go sürümleri **`netlify.toml` dosyasından** gelir. Netlify arayüzünde elle değiştirme. Arayüzdeki bir değer ile `netlify.toml` çakışırsa dosya geçerli olur ve karışıklık çıkar.

Netlify'da bir şey değiştirmek istersen dosyayı değiştir (PR ya da doğrudan commit).

## (d) Site adını değiştirme

Proje adı: `katmanlar`. Netlify'da projeyi içe aktarırken bu adı verdiysen bu bölümü atla.

1. Netlify > projeyi aç > **Site configuration** > **Site details** > **Change site name** (ekran adı farklı olabilir).
2. `katmanlar` yaz ve **Save**.
3. Adres `https://katmanlar.netlify.app` olur. Başka bir ad kullanırsan bölüm (i)'yi uygula.

## (e) Branches and deploy contexts

1. Netlify > **Project configuration** > **Build & deploy** > **Continuous deployment** > **Branches and deploy contexts** (ekran adı farklı olabilir).
2. **Production branch**: `main`.
3. **Branch deploys**: **None**. (Bu ayar ara dal yöntemini kredisiz yapar ve gereksiz deploy'u önler.)
4. **Deploy Previews**: **Any pull request**. (Deploy preview 0 kredidir ve öğrenci PR'larını incelemek için gerekir.)
5. **Save**.

## (f) Sensitive variable policy

1. Netlify > **Project configuration** > **Environment variables** > **Site policies** (ya da **Sensitive variable policy**; ekran adı farklı olabilir).
2. **Deploy without sensitive variables** seç.
3. Kaydet.

Bu, fork'tan gelen PR'ların gizli değişkenlere erişmesini önler. Bu sitede şu an gizli ortam değişkeni kullanılmıyor.

## (g) GitHub OAuth App kaydı

OAuth App'i **sadettindemirel kişisel hesabında** kaydet (organizasyonda değil).

1. GitHub > sağ üst profil > **Settings**.
2. Sol menüde en alta in: **Developer settings**.
3. **OAuth Apps** > **New OAuth App**.
4. Alanları doldur:
   - **Application name**: `Katman CMS` (istediğin bir ad).
   - **Homepage URL**: site adresi, örneğin `https://katmanlar.netlify.app`.
   - **Application description**: isteğe bağlı.
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
5. **Register application**.
6. Açılan sayfada **Client ID**'yi kopyala.
7. **Generate a new client secret** de. **Client secret yalnızca bir kez gösterilir.** Hemen kopyala. Kaybedersen yenisini üret.

**Client secret'ı hiçbir yere (repo, e-posta, sohbet, ekran görüntüsü) yazma.** Yalnızca bir sonraki adımda Netlify'a gir. Repoya asla konmaz.

## (h) Netlify OAuth sağlayıcısı kurulumu

1. Netlify > projeyi aç > **Project configuration** > **Security** > **OAuth** (**Access & security** olarak da görünebilir; ekran adı farklı olabilir).
2. **Authentication Providers** bölümünde **Install Provider** de.
3. Sağlayıcı olarak **GitHub**'ı seç.
4. **Client ID** ve **Client Secret** alanlarına (g)'de aldığın değerleri yapıştır.
5. **Install**.

Önemli: Bu OAuth sağlayıcısı Netlify'a özeldir. `config.yml` içinde `backend.base_url` verilmez; Decap, Netlify'ın OAuth sağlayıcısını (api.netlify.com) kullanır.

## (i) Site adresi değişirse güncellenecek yerler

Site adını ya da alan adını değiştirdiysen (örneğin `katmanlar` yerine başka bir ad ya da özel alan adı):

1. `hugo.yaml` içindeki `baseURL`. Build sırasında `${URL}` ile ezilir (build komutu `netlify.toml`'dadır), ama yine de dosyayı güncel tut.
2. `static/admin/config.yml` içindeki `site_url` ve `display_url`.
3. GitHub OAuth App'in **Homepage URL**'si (Settings > Developer settings > OAuth Apps > uygulamayı aç). Callback URL değişmez (`https://api.netlify.com/auth/done`).
4. Öğrenci kılavuzundaki ve ders materyallerindeki adresler.

## (j) Özel alan adı (isteğe bağlı)

Özel alan adı kullanmak istersen:

1. Netlify > projeyi aç > **Domain management** > **Add domain** (ekran adı farklı olabilir).
2. Alan adını yaz ve doğrula.
3. DNS sağlayıcında (alan adını satın aldığın yer) Netlify'ın gösterdiği **CNAME** kaydını (alt alan adı için) ekle. Apex alan adı (kök) için farklı kayıt gerekebilir. DNS sağlayıcıya göre değişir, **doğrulanmadı**; Netlify'ın gösterdiği talimatı izle.
4. HTTPS sertifikasının otomatik verildiğini Netlify panelinden kontrol et.
5. Bölüm (i)'yi uygula.

Üniversite alan adı kullanılacaksa üniversitenin BT birimiyle konuş.

## (k) İlk giriş testi ve uçtan uca test

Gerçek öğrenci verisi kullanma. Test için ikinci bir (sahte öğrenci) GitHub hesabı aç.

Kontrol listesi:

1. [ ] Netlify'da ilk production deploy başarılı oldu mu? Site adresi açılıyor mu?
2. [ ] Netlify Usage sayfasında kalan krediyi not et (deploy öncesi).
3. [ ] Sahte öğrenci hesabıyla `/admin/` adresine git. **GitHub ile giriş** yapıldı mı? (Popup engelleyiciyi kapat.)
4. [ ] OAuth yetki ekranı geldi ve onaylandı mı?
5. [ ] Panel fork istedi mi? Fork oluştu mu (sahte hesapta `katman` kopyası)?
6. [ ] Yeni yazı formu açıldı. Tüm alanlar doğru etiketlerle göründü mü?
7. [ ] Örnek yazı yazıldı ve **Kaydet** yapıldı. Gömme kodu da eklendi (örneğin bir Datawrapper iframe'i).
8. [ ] Yazı "Taslak" sütunundan **"İncelemeye hazır"**'a taşındı.
9. [ ] `sadettindemirel/katman` reposunda **PR açıldı** mı?
10. [ ] **Deploy preview** üretildi mi? Çalıştı mı? **Gömme göründü mü?**
11. [ ] PR'ın Files changed sekmesinde yalnızca `content/yazilar/<dosya-adı>.md` değişmiş mi?
12. [ ] Merge (yönetici hesabıyla). Production deploy çalıştı mı?
13. [ ] Production'da yazı yayında mı? **Kalıcı adres** `/yazilar/<dosya-adı>/` açılıyor mu?
14. [ ] Anasayfada ve arşivde görünüyor mu?
15. [ ] **RSS'te görünüyor mu?** (RSS adresi: `/index.xml`; dönem ve etiket sayfalarının da kendi `index.xml` beslemesi vardır.)
16. [ ] Netlify Usage'da **kredi düşüşü 15** mi?
17. [ ] Deploy log'da `KATMAN:` uyarısı var mı? Yoksa test yazısına bilerek eksik alan koyup uyarının çıktığını da doğrula.
18. [ ] Test yazısını `draft: true` yap ya da sil. (Bunun için ayrı bir deploy gerekir; kredi hesabına kat. Toplu yayına ekleyebilirsin.)
19. [ ] Sahte hesabı ve fork'unu sil.

Herhangi bir adım başarısız olursa "Sorun giderme" için `OGRENCI_KILAVUZU.md` bölüm 11'e bak.

---

## OAuth seçenekleri

Decap'in GitHub backend'i bir OAuth sağlayıcısına ihtiyaç duyar.

| Seçenek | Artı | Eksi |
|---|---|---|
| **Netlify OAuth sağlayıcısı** (önerilen) | Ek altyapı yok. Ücretsiz. Kurulum kısa (bölüm g-h). `config.yml`'de ek ayar gerekmez. | Netlify'a bağlı. Netlify kredisi biterse site durduğu için `/admin/` de erişilemez. |
| **Kendi barındırılan proxy** (örneğin `sveltia-cms-auth` ya da `decap-proxy`, Cloudflare Worker olarak) | Netlify'dan bağımsız. Siteyi başka yere taşısan da çalışır. | Bakım ve secret yönetimi sende. Ek hesap (Cloudflare) gerekir. `config.yml`'de `backend.base_url: https://<proxy-adresi>` ayarlanır. Kurulum adımları burada doğrulanmadı; ilgili projenin güncel dokümanına bak. |
| **Ücretli Decap Turbo** | Barındırılan, hazır çözüm. | Ücretli. Ayrıntılar doğrulanmadı. |

Öneri: Netlify OAuth sağlayıcısı. Netlify'dan çıkmak istersen proxy seçeneğine geç; geçişte yalnızca `config.yml`'de `base_url` ve OAuth App'in callback URL'si değişir.

---

## Kredi tahmini

Netlify Free planı oranları (14 Nisan 2026 değişikliğine göre; güncel oranları Netlify'dan kontrol et):

| Kalem | Oran |
|---|---|
| Aylık kredi | 300 |
| Production deploy | 15 kredi |
| Bandwidth | 20 kredi/GB |
| Web istekleri | 2 kredi/10.000 istek |
| Deploy preview ve branch deploy | 0 kredi |
| Başarısız deploy | 0 kredi |

Kredi biterse hesaptaki tüm siteler durur ("Site not available"). Free planda ek kredi alınamaz. Bildirimler %50, %75, %90 ve %100'de gelir.

### Dönem tahmini (yaklaşık 4 ay)

- **Production deploy**: 10 deploy = 150 kredi (dönem toplamı). Yani ortalama ayda 2-3 deploy.
- **Bandwidth**: Sayfa boyutu yaklaşık 150-300 KB. Gömmeler (Flourish, Datawrapper vb.) kendi sunucularından gelir ve Netlify kotasını harcamaz. Ayda 5.000-10.000 sayfa görüntüleme yaklaşık 1-3 GB eder, bu da yaklaşık **20-60 kredi/ay**.
- **Web istekleri**: Ayda yaklaşık 50.000 istek = yaklaşık 10 kredi.

Bunlar tahmindir. Gerçek tüketim Netlify Usage sayfasından izlenmeli.

### Aylık örnek tablo

| Kalem | Sakin ay | Yoğun (final) ay |
|---|---|---|
| Production deploy | 1 deploy = 15 | 4 deploy = 60 |
| Bandwidth | 1 GB = 20 | 3 GB = 60 |
| Web istekleri | ~50.000 = 10 | ~50.000 = 10 |
| **Toplam** | **45 kredi** | **130 kredi** |
| Kota (300) içinde kalan | 255 | 170 |

Yoğun ayda trafik çok artarsa (örneğin 10 GB) bandwidth tek başına 200 kredi eder. Trafik patlaması bu planın asıl riskidir. Usage sayfasını yoğun dönemde sık kontrol et.

### Risk

60 PR'ı tek tek merge edersen: 60 × 15 = **900 kredi**. Kota 300 olduğundan **site durur**. Bu yüzden her zaman toplu yayın yap.

### Elle yayın değerlendirmesi

Netlify'da "otomatik yayın" (Auto publishing) kapatılıp her deploy elle yayımlanabilir. Bu seçenek build'leri durdurmaz; build yine olur ve harcama olur. Bu nedenle krediyi korumak için tek başına yeterli değildir.

**Öneri:** Otomatik yayın açık kalsın. Toplu yayın şu yöntemle yapılsın (ayrıntı `YONETICI_KILAVUZU.md` bölüm 4):

1. İncelemeleri bitir ve onayla.
2. **Build status: Stopped builds** yap.
3. PR'ları art arda merge et.
4. **Activate builds** yap (otomatik build tetiklemez).
5. **Deploys > Trigger deploy > Deploy site** ile tek deploy yap (15 kredi).

İkinci seçenek: ara dal (`toplu-yayin`) yöntemi. PR'ların base dalını GitHub'da tek tek değiştirmek gerekir (`YONETICI_KILAVUZU.md` bölüm 5).

**Acil fren:** "Stopped builds" ayarı, kredi hızla giderse (örneğin beklenmeyen build'ler) hemen kullanılır. Eski bir deploy'a "Publish deploy" ile dönmek 0 kredidir. Lock'un (Lock to stop auto publishing) build'lerin kredi harcayıp harcamadığı **doğrulanmadı**; bu yüzden Stopped builds önerilir.
