// Arşiv filtresi: JS yoksa tüm yazılar listelenir; JS varsa form görünür.
// Seçimler adres çubuğuna yazılır (?donem=2026+Güz&odev=Final), bağlantı paylaşılabilir.
(function () {
  var form = document.getElementById('arsiv-filtre');
  if (!form) return;
  var secimler = form.querySelectorAll('select[data-alan]');
  var ogeler = document.querySelectorAll('.katman-arsiv-oge');
  var sonuc = document.getElementById('arsiv-sonuc');

  function eslesir(oge, alan, deger) {
    if (!deger) return true;
    var veri = oge.getAttribute('data-' + alan) || '';
    return veri.split('|').indexOf(deger) !== -1;
  }

  function uygula() {
    var sayac = 0;
    var params = new URLSearchParams();
    secimler.forEach(function (s) { if (s.value) params.set(s.dataset.alan, s.value); });
    ogeler.forEach(function (oge) {
      var gorunur = Array.prototype.every.call(secimler, function (s) {
        return eslesir(oge, s.dataset.alan, s.value);
      });
      oge.hidden = !gorunur;
      if (gorunur) sayac++;
    });
    document.querySelectorAll('[data-tur-grup], [data-donem-grup]').forEach(function (grup) {
      grup.hidden = !grup.querySelector('.katman-arsiv-oge:not([hidden])');
    });
    sonuc.textContent = sayac + ' yazı';
    var q = params.toString();
    history.replaceState(null, '', q ? '?' + q : location.pathname);
  }

  var baslangic = new URLSearchParams(location.search);
  secimler.forEach(function (s) {
    var d = baslangic.get(s.dataset.alan);
    if (d) s.value = d;
    s.addEventListener('change', uygula);
  });
  form.hidden = false;
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  uygula();
})();
