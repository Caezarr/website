export const ATTRIBUTION_TRACKER_SCRIPT = `(function () {
  var ENDPOINT = "https://project--e5c218cb-4ec5-4194-b65e-128a03b3cf5f.lovable.app/api/public/track-event";
  var qs = new URLSearchParams(location.search);
  var keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","gclid"];
  var stored = {};
  try { stored = JSON.parse(localStorage.getItem("wonka_attr") || "{}"); } catch(e){}
  keys.forEach(function (k) { if (qs.get(k)) stored[k] = qs.get(k); });
  if (!stored.visitor_id) stored.visitor_id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
  try { localStorage.setItem("wonka_attr", JSON.stringify(stored)); } catch(e){}

  function send(type, extra) {
    var body = Object.assign({
      event_type: type,
      page_url: location.href,
      occurred_at: new Date().toISOString()
    }, stored, extra || {});
    try {
      var blob = new Blob([JSON.stringify(body)], { type: "application/json" });
      if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, blob);
      else fetch(ENDPOINT, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body), keepalive: true });
    } catch(e){}
  }

  window.wonkaTrack = send;
  send("ping");

  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest('[data-track="meeting"]');
    if (t) send("meeting_click", { link_url: t.href || null, meeting_type: t.getAttribute("data-meeting-type") || null });
    var l = e.target.closest && e.target.closest('a[data-track="link"]');
    if (l) send("link_click", { link_url: l.href });
  });
})();`;
