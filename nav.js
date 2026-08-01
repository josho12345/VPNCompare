// VPN Compare — Shared Navigation Component
// bestvpncompareonline.com
// Drop in root alongside style.css and script.js
// Include in every page with: <script src="/nav.js"></script>
// Must be loaded AFTER the opening <body> tag

(function () {

  // ── Announcement bar ──────────────────────────────────────────────────────
  var announceBar = document.createElement('div');
  announceBar.className = 'announce-bar';
  announceBar.innerHTML =
    '<svg style="display:inline-block;width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2 L28 7 L28 16 C28 22.5 22.8 27.5 16 29.5 C9.2 27.5 4 22.5 4 16 L4 7 Z" fill="#38bdf8"/><path d="M12.5 16.5 L15 19 L20 13" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>' +
    ' All prices independently verified &middot; Last checked ' +
    (function(){var m=['January','February','March','April','May','June','July','August','September','October','November','December'];var t=new Date();return t.getDate()+' '+m[t.getMonth()]+' '+t.getFullYear();})() +
    ' &nbsp;|&nbsp;' +
    ' <a href="https://bestvpncompareonline.com/vpn/#methodology">How we test VPNs &rarr;</a>';

  // ── Nav — flat structure matching original site, eSIM added as new top-level item ──
  var nav = document.createElement('nav');
  nav.innerHTML =
    '<a class="logo" href="https://bestvpncompareonline.com/">' +
      '<svg class="svg-shield" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#38bdf8"/>' +
          '<stop offset="1" stop-color="#0369a1"/>' +
        '</linearGradient></defs>' +
        '<path d="M16 2 L28 7 L28 16 C28 22.5 22.8 27.5 16 29.5 C9.2 27.5 4 22.5 4 16 L4 7 Z" fill="url(#sg)"/>' +
        '<path d="M12.5 16.5 L15 19 L20 13" stroke="#cc5500" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '</svg>VPN <span>Compare</span>' +
    '</a>' +
    '<ul>' +
      '<li><a href="https://bestvpncompareonline.com/">Home</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#compare">Compare</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#quiz">Quiz</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#calculator">Calculator</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/reviews/">Reviews</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/articles/">Articles</a></li>' +
      '<li class="nav-has-sub">' +
        '<a href="https://bestvpncompareonline.com/esim/">eSIM</a>' +
        '<ul class="nav-submenu">' +
          '<li><a href="https://bestvpncompareonline.com/esim/">Compare eSIMs</a></li>' +
          '<li><a href="https://bestvpncompareonline.com/esim/reviews/">eSIM Reviews</a></li>' +
          '<li><a href="https://bestvpncompareonline.com/esim/articles/">eSIM Articles</a></li>' +
          '<li><a href="https://bestvpncompareonline.com/esim/blog/">eSIM Blog</a></li>' +
        '</ul>' +
      '</li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#blog">Blog</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#faq">FAQ</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#advertise" class="nav-sponsor">Advertise</a></li>' +
      '<li><a href="https://bestvpncompareonline.com/vpn/#quiz" class="nav-cta">Find My VPN</a></li>' +
    '</ul>' +
    '<button class="hamburger" id="hamburger" onclick="vcToggleMenu()" aria-label="Menu">' +
      '<span></span><span></span><span></span>' +
    '</button>';

  // ── Mobile menu — flat structure matching original, eSIM gets its own expandable group ──
  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobileMenu';
  mobileMenu.innerHTML =
    '<a href="https://bestvpncompareonline.com/" onclick="vcCloseMenu()">&#127968; Home</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#compare" onclick="vcCloseMenu()">&#128202; Compare VPNs</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#quiz" onclick="vcCloseMenu()">&#127919; Take the Quiz</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#calculator" onclick="vcCloseMenu()">&#128176; Cost Calculator</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/reviews/" onclick="vcCloseMenu()">&#128203; VPN Reviews</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/articles/" onclick="vcCloseMenu()">&#128220; VPN Articles</a>' +

    // eSIM as its own expandable group, everything else stays flat
    '<div class="mobile-menu-parent" onclick="vcToggleSubMenu(this)">' +
      '<span><img src="data:image/png;base64,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" width="34" height="27" style="vertical-align:middle;margin-right:4px"> eSIM</span>' +
      '<span class="submenu-arrow">&#9660;</span>' +
    '</div>' +
    '<div class="mobile-submenu">' +
      '<a href="https://bestvpncompareonline.com/esim/" onclick="vcCloseMenu()">&#128202; Compare eSIMs</a>' +
      '<a href="https://bestvpncompareonline.com/esim/reviews/" onclick="vcCloseMenu()">&#128203; eSIM Reviews</a>' +
      '<a href="https://bestvpncompareonline.com/esim/articles/" onclick="vcCloseMenu()">&#9997; eSIM Articles</a>' +
      '<a href="https://bestvpncompareonline.com/esim/blog/" onclick="vcCloseMenu()">&#128221; eSIM Blog</a>' +
    '</div>' +

    '<a href="https://bestvpncompareonline.com/vpn/#blog" onclick="vcCloseMenu()">&#9997; Blog &amp; Guides</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#faq" onclick="vcCloseMenu()">&#10067; FAQ</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#newsletter" onclick="vcCloseMenu()">&#128231; Newsletter</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#advertise" onclick="vcCloseMenu()" class="nav-sponsor">&#128188; Advertise</a>' +
    '<a href="https://bestvpncompareonline.com/vpn/#quiz" onclick="vcCloseMenu()" class="nav-cta">&#127919; Find My VPN &mdash; Free Quiz</a>';

  // ── Legal modal (required for openLegal() in script.js) ──────────────────
  var legalModal = document.createElement('div');
  legalModal.id = 'legalModal';
  legalModal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;overflow-y:auto;padding:2rem 1rem';
  legalModal.setAttribute('onclick', "if(event.target===this)closeLegal()");
  legalModal.innerHTML =
    '<div style="background:#fff;border-radius:12px;max-width:780px;margin:0 auto;padding:2.5rem;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.3)">' +
      '<button onclick="closeLegal()" style="position:absolute;top:1rem;right:1.2rem;background:none;border:none;font-size:1.6rem;cursor:pointer;color:#64748b;line-height:1" aria-label="Close">&times;</button>' +
      '<div id="legalContent"></div>' +
    '</div>';

  // ── Cookie consent banner ─────────────────────────────────────────────────
  var cookieBanner = document.createElement('div');
  cookieBanner.id = 'vcCookieBanner';
  cookieBanner.style.cssText = 'display:none;position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0a2540;border-top:3px solid #d4af37;padding:.9rem 2rem;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;box-shadow:0 -4px 20px rgba(0,0,0,.3)';
  cookieBanner.innerHTML =
    '<p style="margin:0;font-family:var(--mono,monospace);font-size:.78rem;color:#93c5e8;flex:1;min-width:200px">' +
      '&#127850; This site uses cookies for analytics to help us improve. ' +
      '<a href="javascript:void(0)" onclick="openLegal(\'cookies\')" style="color:#d4af37;text-decoration:underline">Cookie Policy</a>' +
    '</p>' +
    '<div style="display:flex;gap:.6rem;flex-shrink:0">' +
      '<button onclick="vcConsent(\'accepted\')" style="background:#d4af37;color:#0a2540;border:none;padding:.45rem 1.2rem;border-radius:4px;font-family:var(--mono,monospace);font-size:.78rem;font-weight:700;cursor:pointer;letter-spacing:.5px">Accept</button>' +
      '<button onclick="vcConsent(\'declined\')" style="background:transparent;color:#93c5e8;border:1px solid #93c5e8;padding:.45rem 1.2rem;border-radius:4px;font-family:var(--mono,monospace);font-size:.78rem;cursor:pointer;letter-spacing:.5px">Decline</button>' +
    '</div>';

  // ── Inject everything into page ───────────────────────────────────────────
  var body = document.body;
  body.insertBefore(legalModal, body.firstChild);
  body.insertBefore(cookieBanner, body.firstChild);
  body.insertBefore(mobileMenu, body.firstChild);
  body.insertBefore(nav, body.firstChild);
  body.insertBefore(announceBar, body.firstChild);

  // ── Styles (injected once) ───────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    // Desktop nav-has-sub dropdown for eSIM
    '.nav-has-sub{position:relative;}' +
    '.nav-has-sub .nav-submenu{' +
      'display:none;position:absolute;top:100%;left:0;background:#0a2540;' +
      'border:1px solid rgba(255,255,255,.1);border-radius:8px;min-width:180px;' +
      'box-shadow:0 12px 30px rgba(0,0,0,.4);padding:.4rem 0;z-index:100;list-style:none;margin:0;' +
    '}' +
    '.nav-has-sub:hover .nav-submenu{display:block;}' +
    '.nav-submenu li{display:block;}' +
    '.nav-submenu li a{' +
      'display:block;padding:.6rem 1.2rem;font-size:.85rem;color:#93c5e8;' +
      'white-space:nowrap;border-bottom:1px solid rgba(255,255,255,.05);' +
    '}' +
    '.nav-submenu li:last-child a{border-bottom:none;}' +
    '.nav-submenu li a:hover{background:rgba(255,255,255,.05);color:#38bdf8;}' +
    // Mobile expandable group for eSIM (same as before)
    '.mobile-menu-parent{' +
      'display:flex;align-items:center;justify-content:space-between;' +
      'padding:.9rem 2rem;cursor:pointer;color:#e2e8f0;' +
      'font-family:var(--mono,monospace);font-size:.9rem;letter-spacing:.5px;' +
      'border-bottom:1px solid rgba(255,255,255,.07);' +
    '}' +
    '.mobile-menu-parent:hover{background:rgba(255,255,255,.05);}' +
    '.submenu-arrow{font-size:.7rem;transition:transform .25s;color:#d4af37;}' +
    '.mobile-menu-parent.open .submenu-arrow{transform:rotate(180deg);}' +
    '.mobile-submenu{' +
      'display:none;flex-direction:column;' +
      'background:rgba(0,0,0,.2);' +
    '}' +
    '.mobile-submenu.open{display:flex;}' +
    '.mobile-submenu a{' +
      'padding:.75rem 2rem .75rem 3rem;' +
      'font-size:.85rem;' +
      'border-bottom:1px solid rgba(255,255,255,.04);' +
    '}';
  document.head.appendChild(style);

  // ── Navigation functions ──────────────────────────────────────────────────

  window.vcToggleMenu = function () {
    var menu = document.getElementById('mobileMenu');
    var btn = document.getElementById('hamburger');
    if (!menu || !btn) return;
    var isOpen = menu.classList.contains('open');
    menu.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
  };

  window.vcCloseMenu = function () {
    var menu = document.getElementById('mobileMenu');
    var btn = document.getElementById('hamburger');
    if (menu) menu.classList.remove('open');
    if (btn) btn.classList.remove('open');
  };

  window.vcToggleSubMenu = function (parent) {
    var submenu = parent.nextElementSibling;
    if (!submenu) return;
    var isOpen = submenu.classList.contains('open');
    var allSubmenus = document.querySelectorAll('.mobile-submenu.open');
    var allParents = document.querySelectorAll('.mobile-menu-parent.open');
    for (var i = 0; i < allSubmenus.length; i++) allSubmenus[i].classList.remove('open');
    for (var j = 0; j < allParents.length; j++) allParents[j].classList.remove('open');
    if (!isOpen) {
      submenu.classList.add('open');
      parent.classList.add('open');
    }
  };

  // ── Cookie consent ────────────────────────────────────────────────────────

  window.vcConsent = function (choice) {
    var exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1);
    document.cookie = 'vc_consent=' + choice + ';expires=' + exp.toUTCString() + ';path=/;SameSite=Lax';
    var banner = document.getElementById('vcCookieBanner');
    if (banner) banner.style.display = 'none';
    if (choice === 'accepted' && typeof vcLoadGA4 === 'function') vcLoadGA4();
  };

  window.addEventListener('DOMContentLoaded', function () {
    function vcGetCookie(n) {
      var m = document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)');
      return m ? m.pop() : '';
    }
    if (vcGetCookie('vc_consent') === '') {
      var b = document.getElementById('vcCookieBanner');
      if (b) b.style.display = 'flex';
    }
  });

})();
