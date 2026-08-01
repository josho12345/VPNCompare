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
      '<span><img src="data:image/png;base64,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" width="126" height="91" style="vertical-align:middle;margin-right:4px"> eSIM</span>' +
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
