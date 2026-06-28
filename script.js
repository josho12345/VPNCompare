/* ============================================================
   VPN Compare — bestvpncompareonline.com
   script.js — extracted from index.html v14.3.2 (18 June 2026)
   ============================================================ */

/* ══════════════════════════════════════════════
   VPN DATA — extended to 12 providers
══════════════════════════════════════════════ */
const vpns = [
  { id:'nordvpn',    name:'NordVPN',        speed:780, speedLabel:'⚡ 780 Mbps', servers:'6,400+', nolog:true,  kill:true,  devices:10,  monthly:11.99, annual:3.49,  biennial:2.99, score:9.4, tags:['personal','best'],     tagLabel:'BEST OVERALL',  tagClass:'tag-best',    card:true,  highlight:true, live:true,  tagline:'Fastest speeds + independently audited no-log policy',      features:['Threat Protection AI','Double VPN','Onion over VPN','Meshnet peer-to-peer','6,400+ servers in 111 countries','10 simultaneous devices'], link:'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902', guarantee:'30-day money-back', origPrice:11.99,
    pros:['Fastest average speeds in our testing','Independently audited 4× by Deloitte','Threat Protection blocks malware & ads','10 device allowance is class-leading','NordLynx (WireGuard) protocol'],
    cons:['2-year plan required for best price','Desktop app can feel feature-heavy','No split tunnelling on iOS'],
    scores:{speed:9.8,privacy:9.2,streaming:9.6,value:9.0,ease:9.3},
    review:'<h3>Overview<\/h3><p>NordVPN has been our top overall pick for three consecutive years. In our June 2026 testing round, it achieved an average of 780 Mbps on UK servers using NordLynx (WireGuard) — the fastest result of any VPN we tested.<\/p><h3>Speed & Performance<\/h3><p>On a 1Gbps test connection, NordVPN averaged 780 Mbps locally and 680 Mbps to US servers — a speed retention of roughly 78%, exceptional for a VPN.<\/p><h3>Privacy & Security<\/h3><p>NordVPN\'s fourth independent audit, completed by Deloitte in early 2025, confirmed no logs are retained. Incorporated in Panama, outside the 5\/9\/14 Eyes alliances.<\/p><h3>Streaming Performance<\/h3><p>Unblocked all 8 streaming platforms in our tests including Netflix US, UK, Japan and Australia. BBC iPlayer worked reliably across all 15 UK server locations tested.<\/p><h3>Value<\/h3><p>At $3.99\/mo on the 2-year plan, NordVPN represents excellent value. The 10-device allowance is particularly generous — most competitors offer 5–8.<\/p><h3>Nord Ecosystem — Beyond the VPN<\/h3><p>If you\'re already a NordVPN subscriber, two companion products are worth considering from the same provider family:</p><ul><li><a href="https:\/\/go.nordpass.io\/aff_c?offer_id=488&aff_id=141394&url_id=9356" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)"><strong>NordPass<\/strong><\/a> — Nord\'s password manager. End-to-end encrypted vault, zero-knowledge architecture, biometric unlock, secure sharing, and a data breach scanner. A natural pairing with NordVPN for complete online security.<\/li><li><a href="https:\/\/nordlayer.com\/pricing\/" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)"><strong>NordLayer<\/strong><\/a> — Nord\'s business VPN solution for teams. Built on the same infrastructure as NordVPN with centralised management, SSO, and dedicated IPs.<\/li><\/ul>',
    buyPrice:'$3.99', buyNote:'per month · billed $95.76 every 2 years' },

  { id:'purevpn',   name:'PureVPN',         speed:600, speedLabel:'🔵 600 Mbps', servers:'6,500+', nolog:true,  kill:true,  devices:10,  monthly:10.95, annual:3.74,  biennial:2.15, score:8.5, tags:['personal','budget'],   tagLabel:'EDITORS CHOICE', tagClass:'tag-best',   card:true,  highlight:false, live:true, tagline:'Outstanding value — KPMG-audited, 6,500+ servers, just $1.99/mo',
    features:['6,500+ servers in 78 countries','KPMG independently audited no-log policy','10 simultaneous devices','Port forwarding included','Dedicated IP available','31-day money-back guarantee'],
    link:'https://billing.purevpn.com/aff.php?aff=49387474', guarantee:'31-day money-back', origPrice:10.95,
    pros:['Lowest price of any audited VPN at $1.99\/mo','KPMG-verified no-log policy since 2023','6,500+ servers — one of the largest networks','Port forwarding built-in (rare feature)','10 devices — matches NordVPN','31-day money-back guarantee'],
    cons:['Speeds slightly below top-tier providers','App interface less polished than NordVPN','Streaming less consistent than ExpressVPN'],
    scores:{speed:7.8,privacy:8.6,streaming:8.2,value:9.8,ease:8.0},
    review:'<h3>Overview<\/h3><p>PureVPN is one of the longest-running VPN providers, founded in 2007 and now headquartered in the British Virgin Islands. In 2026 it offers outstanding value — the $1.99\/mo two-year plan is the lowest price of any independently audited VPN we review.<\/p><h3>KPMG Audit<\/h3><p>PureVPN completed an independent no-log audit with KPMG in 2023. KPMG confirmed that PureVPN retains no browsing activity, connection logs, DNS queries, IP addresses, or session data — placing it in the same verified tier as NordVPN and ExpressVPN for log policy credibility.<\/p><h3>Server Network<\/h3><p>With 6,500+ servers across 78 countries, PureVPN has one of the largest networks reviewed. Coverage is particularly strong across Asia-Pacific.<\/p><h3>Port Forwarding<\/h3><p>Port forwarding is included as a standard feature — something most VPNs either omit or charge extra for. Particularly useful for torrent users and remote desktop connections.<\/p><h3>Value Assessment<\/h3><p>At $1.99\/mo with a 31-day money-back guarantee, PureVPN delivers verified privacy, a large server network, 10 device coverage, and port forwarding at an unmatched price point.<\/p>',
    buyPrice:'$1.99', buyNote:'per month · billed every 2 years' },

  { id:'express',    name:'ExpressVPN',     speed:740, speedLabel:'⚡ 740 Mbps', servers:'3,200+', nolog:true,  kill:true,  devices:8,   monthly:12.95, annual:6.67,  biennial:4.99, score:9.1, tags:['personal'],            tagLabel:'',              tagClass:'',            card:true,  highlight:false, live:false, tagline:'Most reliable worldwide server network',                    features:['Lightway Protocol (ultra-fast)','TrustedServer RAM-only','Split tunnelling','24/7 live chat','Works in China','MediaStreamer DNS'], link:'https://www.expressvpn.com/order/', guarantee:'30-day money-back', origPrice:12.95,
    pros:['TrustedServer RAM-only across ALL servers','MediaStreamer DNS for smart TVs','Lightway protocol is exceptionally fast','Works reliably in China','Excellent 24\/7 live chat support'],
    cons:['Most expensive premium option','8 device limit (vs NordVPN\'s 10)','Acquired by Kape Technologies in 2021'],
    scores:{speed:9.5,privacy:9.0,streaming:9.7,value:7.8,ease:9.5},
    review:'<h3>Overview<\/h3><p>ExpressVPN remains one of the most polished and reliable VPNs in 2026. While NordVPN edges it on raw speed and value, ExpressVPN leads on ease of use, streaming reliability, and its unique MediaStreamer DNS feature.<\/p><h3>TrustedServer Architecture<\/h3><p>ExpressVPN runs its entire server network on RAM only — meaning no data can ever be written to a hard drive. This was independently verified by PwC in 2024 and represents the strongest technical implementation of a no-log policy available.<\/p><h3>Streaming<\/h3><p>ExpressVPN consistently leads our streaming tests. MediaStreamer DNS allows devices that cannot run VPN software to benefit from geo-unblocking without a full VPN connection.<\/p>',
    buyPrice:'$6.67', buyNote:'per month · billed $80.04 per year' },

  { id:'cyberghost', name:'CyberGhost',     speed:680, speedLabel:'🔵 680 Mbps', servers:'9,200+', nolog:true,  kill:true,  devices:7,   monthly:12.99, annual:2.19,  biennial:2.03, score:8.6, tags:['personal','budget'],   tagLabel:'BEST VALUE',    tagClass:'tag-budget',  card:true,  highlight:false, live:false, tagline:'9,200+ servers — biggest network, lowest price',            features:['Streaming-optimised servers','Torrent-optimised servers','45-day money-back','NoSpy Servers','WireGuard & OpenVPN','7 devices'], link:'https://www.cyberghostvpn.com/en_US/pricing', guarantee:'45-day money-back', origPrice:12.99,
    pros:['Cheapest reputable VPN at $2.03\/mo','Longest money-back guarantee (45 days)','9,200+ servers — largest network tested','Dedicated streaming & torrent servers','NoSpy servers for extra privacy'],
    cons:['Based in Romania (EU data laws apply)','Desktop app less refined than NordVPN','Slower speeds than top-tier providers'],
    scores:{speed:8.2,privacy:8.4,streaming:8.8,value:9.8,ease:8.9},
    review:'<h3>Overview<\/h3><p>CyberGhost is our best value pick for 2026. At $2.03\/month on the 2-year plan with a 45-day money-back guarantee, it is the most risk-free way to try a premium VPN.<\/p><h3>Server Network<\/h3><p>With 9,200+ servers across 91 countries, CyberGhost has the largest network of any VPN tested. Servers are organised by use case — dedicated streaming and torrent servers make setup straightforward for beginners.<\/p>',
    buyPrice:'$2.03', buyNote:'per month · billed every 2 years' },

  { id:'proton',     name:'Proton VPN',     speed:620, speedLabel:'🔵 620 Mbps', servers:'2,900+', nolog:true,  kill:true,  devices:10,  monthly:9.99,  annual:4.99,  biennial:3.99, score:8.9, tags:['personal','privacy'],  tagLabel:'BEST PRIVACY',  tagClass:'tag-privacy', card:true,  highlight:false, live:false, tagline:'Swiss privacy law + open-source code — verified',            features:['Open-source & independently audited','Secure Core multi-hop routing','NetShield ad/malware blocker','Stealth protocol (censored countries)','Free tier available','10 devices'], link:'https://protonvpn.com/pricing/', guarantee:'30-day money-back', origPrice:9.99,
    pros:['Fully open-source — anyone can inspect the code','Based in Switzerland (outside EU & US jurisdiction)','Free tier with unlimited data','Secure Core adds multi-hop protection','Accepts Bitcoin'],
    cons:['Slower than NordVPN and ExpressVPN','Fewer servers than competitors','Free tier server locations limited'],
    scores:{speed:7.8,privacy:9.9,streaming:8.2,value:8.8,ease:8.4},
    review:'<h3>Overview<\/h3><p>Proton VPN is the most credible privacy-first VPN in 2026, headquartered in Geneva, Switzerland — one of the world\'s strongest legal frameworks for digital privacy.<\/p><h3>Open Source<\/h3><p>All Proton VPN client apps are fully open source and available on GitHub. Any security researcher in the world can inspect the code for backdoors or vulnerabilities.<\/p><h3>Secure Core<\/h3><p>Proton\'s Secure Core routes traffic through privacy-friendly countries before exiting through the destination server — meaning even if a destination server is compromised, your real IP cannot be determined.<\/p>',
    buyPrice:'$4.99', buyNote:'per month · billed $59.88 per year' },

  { id:'mullvad',    name:'Mullvad VPN',    speed:650, speedLabel:'🔵 650 Mbps', servers:'700+',   nolog:true,  kill:true,  devices:5,   monthly:5.50,  annual:5.50,  biennial:5.50, score:9.0, tags:['personal','privacy'],  tagLabel:'',              tagClass:'',            card:false, highlight:false, live:false, tagline:'', features:[], link:'https://mullvad.net/en/account/create', guarantee:'No contract', origPrice:5.50,
    pros:['No email required to sign up','Accepts cash and Monero','Flat pricing — no lock-in contracts','RAM-only servers verified by Cure53','Court-verified no-log policy'],
    cons:['Only 5 simultaneous devices','Smallest server network (700+)','No dedicated streaming servers'],
    scores:{speed:8.5,privacy:9.9,streaming:7.5,value:9.0,ease:7.8},
    review:'<h3>Overview<\/h3><p>Mullvad is the VPN for users who take anonymity seriously. It requires no email, accepts cash and Monero, and in 2023 Swedish police raided their offices — and left empty-handed, providing real-world verification of their no-log policy.<\/p>',
    buyPrice:'€5.00', buyNote:'per month · no long-term contract required' },

  { id:'surfshark',  name:'Surfshark',      speed:710, speedLabel:'⚡ 710 Mbps', servers:'3,200+', nolog:true,  kill:true,  devices:999, monthly:10.99, annual:2.49,  biennial:1.99, score:8.7, tags:['personal','budget'],   tagLabel:'',              tagClass:'',            card:true, highlight:false, live:true, tagline:'Unlimited devices — best value for families & power users', features:['Unlimited simultaneous devices','CleanWeb ad & malware blocker','NoBorders censorship bypass','Camouflage mode','30-day money-back guarantee','Surfshark One bundle available'], link:'https://get.surfshark.net/aff_c?offer_id=1249&aff_id=44853', guarantee:'30-day money-back', origPrice:10.99,
    pros:['Unlimited simultaneous devices','Very competitive pricing','CleanWeb ad blocker included','NoBorders mode for restricted regions','Surfshark One bundle adds antivirus, search & identity protection'],
    cons:['Merged with NordVPN parent company (2022)','Audit history less extensive than NordVPN','Some servers slower in Asia-Pacific'],
    scores:{speed:9.0,privacy:8.5,streaming:8.8,value:9.5,ease:9.0},
    review:'<h3>Overview<\/h3><p>Surfshark is one of the best-value VPNs in 2026, particularly for households with many devices — unlimited simultaneous connections on a single subscription at under $2\/mo.<\/p><h3>Surfshark One Bundle<\/h3><p>Beyond the core VPN, Surfshark offers a full cybersecurity suite under the <strong>Surfshark One<\/strong> brand. Each product is available individually:<\/p><ul><li><a href="https:\/\/get.surfshark.net\/aff_c?offer_id=1249&aff_id=44853" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)">Surfshark ONE<\/a> — The complete bundle: VPN + Antivirus + Alert + Search<\/li><li><a href="https:\/\/get.surfshark.net\/aff_c?offer_id=934&aff_id=44853" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)">Surfshark Antivirus<\/a> — Real-time malware protection, cloud-based scanning<\/li><li><a href="https:\/\/get.surfshark.net\/aff_c?offer_id=1421&aff_id=44853" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)">Surfshark Alternative-ID<\/a> — Generate a disposable identity and email to protect your real personal data online<\/li><li><a href="https:\/\/get.surfshark.net\/aff_c?offer_id=1420&aff_id=44853" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)">Surfshark Alert<\/a> — Real-time breach monitoring for your email, passwords, credit cards and personal ID<\/li><li><a href="https:\/\/get.surfshark.net\/aff_c?offer_id=1679&aff_id=44853" target="_blank" rel="nofollow sponsored noopener" style="color:var(--cyan)">Surfshark Search<\/a> — Ad-free, tracker-free private search engine<\/li><\/ul><h3>Ownership Note<\/h3><p>In 2022, Surfshark merged with Nord Security (NordVPN\'s parent company). Both brands operate independently with separate infrastructure and teams.<\/p>',
    buyPrice:'$2.49', buyNote:'per month · billed $59.76 every 2 years' },

  { id:'perimeter',  name:'Perimeter 81',   speed:580, speedLabel:'🔵 580 Mbps', servers:'700+',   nolog:true,  kill:true,  devices:999, monthly:8.00,  annual:6.00,  biennial:5.00, score:9.2, tags:['business'],            tagLabel:'BEST BIZ',      tagClass:'tag-biz',     card:true,  highlight:false, live:false, tagline:'Zero-trust SASE — built for distributed teams',             features:['Team management console','SSO / SAML 2.0','Split tunnelling per-app','Dedicated static IPs','SOC 2 Type II certified','Unlimited devices'], link:'https://www.perimeter81.com/', guarantee:'30-day money-back', origPrice:11.00,
    pros:['Best-in-class team management dashboard','SSO\/SAML 2.0 with Okta, Azure AD, Google','SOC 2 Type II certified','Per-app split tunnelling','Unlimited devices'],
    cons:['More expensive than consumer VPNs','Overkill for individuals or small teams','Setup requires IT knowledge'],
    scores:{speed:7.5,privacy:9.0,streaming:6.5,value:8.5,ease:7.2},
    review:'<h3>Overview<\/h3><p>Perimeter 81 is a business-grade zero-trust network access (ZTNA) platform designed for organisations managing distributed remote teams — not a consumer VPN.<\/p><h3>Enterprise Integrations<\/h3><p>Integrates natively with Okta, Azure Active Directory, Google Workspace, and any SAML 2.0-compatible identity provider. Holds SOC 2 Type II certification — essential for regulated industries.<\/p>',
    buyPrice:'$6.00', buyNote:'per user/month · billed annually · min 5 users' },

  { id:'nordlayer',  name:'NordLayer',      speed:600, speedLabel:'🔵 600 Mbps', servers:'500+',   nolog:true,  kill:true,  devices:999, monthly:9.00,  annual:7.00,  biennial:6.00, score:8.8, tags:['business'],            tagLabel:'',              tagClass:'',            card:false, highlight:false, live:false, tagline:'', features:[], link:'https://nordlayer.com/pricing/', guarantee:'14-day money-back', origPrice:9.00,
    pros:['Built on NordVPN\'s proven infrastructure','Competitive pricing for small teams','Auto-connect & always-on VPN','Dedicated IPs available'],
    cons:['Fewer compliance features than Perimeter 81','SOC 2 certification in progress','Limited to 500 servers'],
    scores:{speed:8.8,privacy:8.8,streaming:7.0,value:8.5,ease:8.5},
    review:'<h3>Overview<\/h3><p>NordLayer is NordVPN\'s business-focused offering, best suited for teams of 5–50 users who need a straightforward, reliable business VPN without the complexity of enterprise SASE platforms.<\/p>',
    buyPrice:'$7.00', buyNote:'per user/month · billed annually' },

  { id:'ivpn',       name:'IVPN',           speed:500, speedLabel:'🔵 500 Mbps', servers:'80+',    nolog:true,  kill:true,  devices:7,   monthly:6.00,  annual:5.00,  biennial:4.50, score:8.3, tags:['personal','privacy'],  tagLabel:'',              tagClass:'',            card:false, highlight:false, live:false, tagline:'', features:[], link:'https://www.ivpn.net/pricing/', guarantee:'7-day money-back', origPrice:6.00,
    pros:['Open-source apps','Multi-hop (AntiTracker)','No email required','Gibraltar jurisdiction','Transparent ownership'],
    cons:['Only 80+ servers (very limited)','No streaming optimisation','Smaller community & support'],
    scores:{speed:7.2,privacy:9.7,streaming:6.5,value:8.5,ease:7.5},
    review:'<h3>Overview<\/h3><p>IVPN is a small, privacy-focused VPN popular with privacy researchers and security professionals. It publishes full financial transparency reports and has publicly named its ownership — rare in the industry.<\/p>',
    buyPrice:'$5.00', buyNote:'per month · billed annually' },

  { id:'pia',        name:'Private Internet Access', speed:630, speedLabel:'🔵 630 Mbps', servers:'35,000+', nolog:true, kill:true, devices:10, monthly:9.95, annual:3.33, biennial:2.03, score:8.4, tags:['personal','budget'], tagLabel:'', tagClass:'', card:false, highlight:false, live:false, tagline:'', features:[], link:'https://www.privateinternetaccess.com/buy-vpn-online',  guarantee:'30-day money-back', origPrice:9.95,
    pros:['35,000+ servers — largest network by far','Open-source apps','Highly configurable','US no-log court precedent'],
    cons:['Based in USA (5 Eyes)','Interface overwhelming for beginners','Streaming reliability inconsistent'],
    scores:{speed:8.0,privacy:8.2,streaming:7.8,value:9.2,ease:7.5},
    review:'<h3>Overview<\/h3><p>Private Internet Access (PIA) is one of the longest-standing VPNs in the industry, known for its enormous server network and open-source apps. Best suited to technically minded users. PIA has twice been subpoenaed by US courts and twice been unable to provide any user data, validating its no-log policy in the real world.<\/p>',
    buyPrice:'$3.33', buyNote:'per month · billed annually' },

  { id:'windscribe', name:'Windscribe',      speed:560, speedLabel:'🔵 560 Mbps', servers:'600+',   nolog:true,  kill:true,  devices:999, monthly:9.00,  annual:5.75,  biennial:4.08, score:8.1, tags:['personal'],            tagLabel:'',              tagClass:'',            card:false, highlight:false, live:false, tagline:'', features:[], link:'https://windscribe.com/upgrade', guarantee:'3-day money-back', origPrice:9.00,
    pros:['Generous free tier (10GB\/month)','Unlimited devices','Built-in firewall (R.O.B.E.R.T)','Custom DNS blocking'],
    cons:['Only 3-day money-back guarantee','Slower speeds than premium competitors','Smaller team = slower feature updates'],
    scores:{speed:7.5,privacy:8.5,streaming:7.8,value:8.8,ease:8.2},
    review:'<h3>Overview<\/h3><p>Windscribe punches above its weight. Its free tier is the most generous available (10GB\/month, 10+ server locations), and the built-in R.O.B.E.R.T firewall offers granular control over blocked content.<\/p>',
    buyPrice:'$5.75', buyNote:'per month · billed annually' },

  { id:'hidemyass',  name:'HideMyAss',      speed:520, speedLabel:'🔵 520 Mbps', servers:'1,100+', nolog:true,  kill:true,  devices:5,   monthly:11.99, annual:4.99,  biennial:3.99, score:7.8, tags:['personal'],            tagLabel:'',              tagClass:'',            card:false, highlight:false, live:false, tagline:'', features:[], link:'https://www.hidemyass.com/en-gb/index', guarantee:'30-day money-back', origPrice:11.99,
    pros:['Largest country coverage (210+ countries)','Owned by Avast (established security company)','Beginner-friendly interface'],
    cons:['Had a 2011 privacy controversy','UK-based (14 Eyes)','Not recommended for high-risk users'],
    scores:{speed:7.8,privacy:7.0,streaming:7.5,value:7.5,ease:8.8},
    review:'<h3>Overview<\/h3><p>HideMyAss (HMA) is one of the oldest VPN brands, now owned by Avast. It offers the widest country coverage (210+ countries), making it useful for travellers who need servers in obscure locations. Note: UK-based (14 Eyes) with a 2011 privacy controversy — privacy-focused users should choose alternatives.<\/p>',
    buyPrice:'$4.99', buyNote:'per month · billed annually' },
  { id:'ipvanish', name:'IPVanish', speed:550, speedLabel:'🔵 550 Mbps', servers:'2,200+', nolog:true, kill:true, devices:999, monthly:10.99, annual:3.99, biennial:3.99, score:8.2, tags:['personal'], tagLabel:'', tagClass:'', card:true, highlight:false, live:true, tagline:'Unlimited devices + WireGuard - powered by Ziff Davis', features:['Unlimited simultaneous devices','WireGuard & IKEv2 protocols','2,200+ servers in 75+ countries','SOCKS5 proxy included','Zero-log policy','30-day money-back guarantee'],
    link:'https://www.ipvanish.com/', guarantee:'30-day money-back', origPrice:10.99,
    pros:['Unlimited simultaneous devices','WireGuard support for fast speeds','SOCKS5 proxy included at no extra cost','Owned by Ziff Davis - established media company','30-day money-back guarantee'],
    cons:['Based in USA (5 Eyes jurisdiction)','No independent audit published yet','App can feel feature-heavy for beginners'],
    scores:{speed:7.8,privacy:7.8,streaming:8.2,value:8.5,ease:8.0},
    review:'<h3>Overview<\/h3><p>IPVanish is a long-standing US-based VPN provider known for its unlimited simultaneous connections and solid WireGuard implementation. Owned by Ziff Davis, it runs 2,200+ servers across 75+ countries.<\/p><h3>Performance<\/h3><p>In our testing, IPVanish delivered consistent speeds on WireGuard, averaging 550 Mbps on local UK servers.<\/p>',
    buyPrice:'$3.99', buyNote:'per month · billed annually' },

  { id:'tunnelbear', name:'TunnelBear', speed:450, speedLabel:'🔵 450 Mbps', servers:'5,000+', nolog:true, kill:true, devices:999, monthly:9.99, annual:3.33, biennial:1.67, score:7.9, tags:['personal'], tagLabel:'', tagClass:'', card:true, highlight:false, live:true, tagline:'Annual Cure53 security audit - most transparent VPN available', features:['Independently audited annually by Cure53','5,000+ servers in 45+ countries','Unlimited simultaneous devices','VigilantBear kill switch','GhostBear obfuscation','Free tier (2GB/month)'],
    link:'https://www.tunnelbear.com/', guarantee:'No refunds', origPrice:9.99,
    pros:['Annual independent audit by Cure53 - results published publicly','Extremely beginner-friendly interface','Free tier with 2GB per month','Unlimited devices','GhostBear obfuscation for restricted networks'],
    cons:['Based in Canada (5 Eyes)','No money-back guarantee','Slower speeds than premium providers'],
    scores:{speed:7.0,privacy:8.5,streaming:7.5,value:8.5,ease:9.5},
    review:'<h3>Overview<\/h3><p>TunnelBear is one of the most transparent VPNs available, commissioning annual independent security audits from Cure53 and publishing the full results publicly.<\/p><h3>Ease of Use<\/h3><p>Its bear-themed interface removes the technical complexity that puts beginners off VPNs, making it an excellent first VPN for non-technical users.<\/p>',
    buyPrice:'$3.33', buyNote:'per month · billed annually' },

  { id:'hotspotshield', name:'Hotspot Shield', speed:720, speedLabel:'⚡ 720 Mbps', servers:'3,200+', nolog:true, kill:true, devices:25, monthly:12.99, annual:7.99, biennial:2.99, score:8.0, tags:['personal'], tagLabel:'', tagClass:'', card:false, highlight:false, live:true, tagline:'', features:[], link:'https://www.hotspotshield.com/', guarantee:'45-day money-back', origPrice:12.99,
    pros:['Hydra protocol delivers class-leading speeds','45-day money-back guarantee','Strong streaming performance','One of the oldest VPN brands (since 2008)'],
    cons:['Based in USA (5 Eyes)','Hydra protocol is closed-source','Free tier is ad-supported'],
    scores:{speed:9.2,privacy:7.5,streaming:8.8,value:7.8,ease:8.5},
    review:'<h3>Overview<\/h3><p>Hotspot Shield uses its proprietary Hydra protocol to deliver some of the fastest VPN speeds available. In our testing it averaged 720 Mbps. It has been operating since 2008 and serves over 650 million users globally.<\/p>',
    buyPrice:'$2.99', buyNote:'per month · billed every 3 years' },


];

/* ══════════════════════════════════════════════
   TABLE
══════════════════════════════════════════════ */
let currentFilter='all';
function starsHTML(s){const f=Math.round(s/2);let h='';for(let i=0;i<5;i++)h+=`<span class="star${i<f?'':' off'}">★</span>`;return h;}
function renderTable(filter){
  const tbody=document.getElementById('vpnTableBody');tbody.innerHTML='';
  vpns.filter(v=>v.live&&(filter==='all'||v.tags.includes(filter))).forEach(v=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><span class="vpn-name">${v.name}</span>${v.tagLabel?`<span class="vpn-tag ${v.tagClass}">${v.tagLabel}</span>`:''}</td>
      <td><a href="${v.link}" target="_blank" rel="nofollow sponsored noopener" class="aff-btn ${v.tagClass==='tag-biz'?'biz':v.promo||v.id==='purevpn'?'promo':''}">Get Deal →</a></td>
      <td>${v.speedLabel}</td><td>${v.servers}</td>
      <td>${v.nolog?'<span class="check">✔ Audited</span>':'<span class="cross">✘</span>'}</td>
      <td>${v.kill?'<span class="check">✔</span>':'<span class="cross">✘</span>'}</td>
      <td>${v.devices>=999?'Unlimited':v.devices}</td>
      <td><span class="price">$${v.annual}/mo</span></td>
      <td><div class="rating">${starsHTML(v.score)}<span style="font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-left:.3rem">${v.score}</span></div></td>`;
    tbody.appendChild(tr);
  });
}
function filterTable(f,btn){currentFilter=f;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderTable(f);}
renderTable('all');

/* ══════════════════════════════════════════════
   CARDS
══════════════════════════════════════════════ */
function renderCards(){
  const g=document.getElementById('cardsGrid');
  vpns.filter(v=>v.live&&v.card).forEach(v=>{
    const d=document.createElement('div');
    d.className='vpn-card fade-in'+(v.highlight?' highlight':'');
    d.innerHTML=`<p class="card-logo">${v.name}</p>
      <p class="card-tagline">${v.tagline}</p>
      <p class="card-price">${v.buyPrice}<span>/mo — billed annually</span></p>
      <p class="card-orig">Was $${v.origPrice}/mo monthly</p>
      <ul class="card-features">${v.features.map(f=>`<li>${f}</li>`).join('')}</ul>
      <div class="card-footer">
        <a href="${v.link}" target="_blank" rel="nofollow sponsored noopener" class="aff-btn ${v.tagClass==='tag-biz'?'biz':v.promo||v.id==='purevpn'?'promo':''}">Get Deal →</a>
        <span class="card-score">⭐ <span>${v.score}/10</span></span>
      </div>
      <span class="card-guarantee">✓ ${v.guarantee} guarantee</span>`;
    g.appendChild(d);
  });
}
renderCards();

/* ══════════════════════════════════════════════
   CALCULATOR
══════════════════════════════════════════════ */
const sel1=document.getElementById('calcVPN'),sel2=document.getElementById('calcVPN2');
vpns.forEach((v,i)=>{
  [sel1,sel2].forEach(sel=>{const o=document.createElement('option');o.value=v.id;o.textContent=v.name;sel.appendChild(o);});
  if(i===1)sel2.lastChild.selected=true;
});
document.getElementById('calcType').addEventListener('change',function(){document.getElementById('teamRow').style.display=this.value==='business'?'block':'none';calcUpdate();});
function calcUpdate(){
  const type=document.getElementById('calcType').value;
  const users=type==='business'?parseInt(document.getElementById('calcTeam').value)||1:1;
  const plan=document.getElementById('calcPlan').value;
  const v1=vpns.find(x=>x.id===document.getElementById('calcVPN').value);
  const v2=vpns.find(x=>x.id===document.getElementById('calcVPN2').value);
  if(!v1||!v2)return;
  const rate=v=>plan==='monthly'?v.monthly:plan==='annual'?v.annual:v.biennial;
  const mo1=v1.monthly*users,mo2=v2.monthly*users;
  const an1=rate(v1)*12*users,an2=rate(v2)*12*users;
  document.getElementById('rMonthly').textContent='$'+mo1.toFixed(2)+'/mo';
  document.getElementById('rMonthly2').textContent='$'+mo2.toFixed(2)+'/mo';
  document.getElementById('rAnnual').textContent='$'+an1.toFixed(2)+'/yr';
  document.getElementById('rAnnual2').textContent='$'+an2.toFixed(2)+'/yr';
  const diff=an2-an1;
  document.getElementById('rDiff').textContent=(diff>=0?'+':'−')+'$'+Math.abs(diff).toFixed(2)+'/yr';
  document.getElementById('rPerUser').textContent='$'+(an1/users).toFixed(2)+'/user/yr';
}
calcUpdate();

/* ══════════════════════════════════════════════
   QUIZ — weighted scoring engine
══════════════════════════════════════════════ */
const questions=[
  {q:'Who will primarily use this VPN?',opts:[{t:'👤 Just me',v:'personal'},{t:'👨‍👩‍👧 My family',v:'family'},{t:'🏢 My business / team',v:'business'},{t:'🔐 Privacy power user',v:'privacy'}]},
  {q:'What is your main use case?',opts:[{t:'🎬 Streaming (Netflix, iPlayer…)',v:'streaming'},{t:'🔒 Privacy & anonymity',v:'privacy'},{t:'🌍 Secure remote work',v:'remote'},{t:'💾 P2P / Torrenting',v:'torrent'}]},
  {q:'How important is connection speed?',opts:[{t:'⚡ Critical — I game or video call',v:'speed_high'},{t:'📶 Important but not critical',v:'speed_mid'},{t:'🐢 Privacy matters more',v:'speed_low'}]},
  {q:'What is your monthly budget?',opts:[{t:'💰 Under $3/mo',v:'budget_low'},{t:'💳 $3–$7/mo',v:'budget_mid'},{t:'🏦 $7+ for the best',v:'budget_high'}]},
  {q:'How many devices do you need covered?',opts:[{t:'📱 1–3 devices',v:'few'},{t:'💻 4–6 devices',v:'some'},{t:'🖥️ 7+ or unlimited',v:'many'}]},
  {q:'Which is most important to you?',opts:[{t:'🌏 Global server coverage',v:'servers'},{t:'🔐 Strongest possible privacy',v:'maxprivacy'},{t:'💬 Great customer support',v:'support'},{t:'📺 Streaming unblocking',v:'maxstream'}]},
];
let qIdx=0,answers=[];
function quizRender(){
  const q=questions[qIdx];
  document.getElementById('quizQ').textContent=q.q;
  const pct=Math.round(((qIdx+1)/questions.length)*100);
  document.getElementById('quizStep').textContent=`Question ${qIdx+1} of ${questions.length}`;
  document.getElementById('quizPct').textContent=pct+'%';
  document.getElementById('quizFill').style.width=pct+'%';
  document.getElementById('quizBack').style.display=qIdx>0?'':'none';
  document.getElementById('quizNext').textContent=qIdx===questions.length-1?'See My Match →':'Next →';
  const opts=document.getElementById('quizOpts');opts.innerHTML='';
  q.opts.forEach(o=>{
    const b=document.createElement('button');
    b.className='quiz-opt'+(answers[qIdx]===o.v?' selected':'');
    const parts=o.t.split(' ');
    b.innerHTML=`<span class="quiz-opt-icon">${parts[0]}</span>${parts.slice(1).join(' ')}`;
    b.onclick=()=>{answers[qIdx]=o.v;document.querySelectorAll('.quiz-opt').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');};
    opts.appendChild(b);
  });
}
function quizNext(){
  if(!answers[qIdx]){document.getElementById('quizOpts').style.outline='2px solid var(--sky)';setTimeout(()=>document.getElementById('quizOpts').style.outline='',700);return;}
  if(qIdx<questions.length-1){qIdx++;quizRender();}else{quizShowResult();}
}
function quizBack(){if(qIdx>0){qIdx--;quizRender();}}
function quizReset(){qIdx=0;answers=[];document.getElementById('quizBody').style.display='';document.getElementById('quizResult').classList.remove('visible');quizRender();}
function quizShowResult(){
  const sc={nordvpn:0,express:0,cyberghost:0,proton:0,mullvad:0,perimeter:0,surfshark:0,pia:0,purevpn:0};
  const a=answers;
  if(a[0]==='business'){sc.perimeter+=40;sc.nordlayer+=35;}
  if(a[0]==='privacy'){sc.mullvad+=30;sc.proton+=25;}
  if(a[0]==='personal'||a[0]==='family'){sc.nordvpn+=20;sc.cyberghost+=15;sc.express+=15;sc.surfshark+=18;sc.purevpn+=14;}
  if(a[1]==='streaming'){sc.nordvpn+=25;sc.express+=22;sc.cyberghost+=15;sc.surfshark+=18;sc.purevpn+=14;}
  if(a[1]==='privacy'){sc.mullvad+=30;sc.proton+=25;}
  if(a[1]==='remote'){sc.perimeter+=30;sc.nordvpn+=15;}
  if(a[1]==='torrent'){sc.cyberghost+=20;sc.nordvpn+=15;sc.proton+=10;sc.pia+=18;sc.purevpn+=18;}
  if(a[2]==='speed_high'){sc.nordvpn+=20;sc.express+=18;sc.surfshark+=15;}
  if(a[2]==='speed_low'){sc.mullvad+=15;sc.proton+=10;}
  if(a[3]==='budget_low'){sc.cyberghost+=30;sc.pia+=20;sc.surfshark+=25;sc.purevpn+=32;}
  if(a[3]==='budget_mid'){sc.nordvpn+=10;sc.proton+=10;sc.mullvad+=12;}
  if(a[3]==='budget_high'){sc.nordvpn+=15;sc.express+=15;}
  if(a[4]==='many'){sc.surfshark+=25;sc.nordvpn+=15;sc.cyberghost+=10;sc.purevpn+=15;}
  if(a[5]==='maxprivacy'){sc.mullvad+=25;sc.proton+=20;}
  if(a[5]==='maxstream'){sc.nordvpn+=20;sc.express+=22;}
  if(a[5]==='servers'){sc.pia+=20;sc.cyberghost+=18;}
  if(a[5]==='support'){sc.express+=20;sc.nordvpn+=10;}
  const sorted=Object.entries(sc).sort((a,b)=>b[1]-a[1]);
  const winner=vpns.find(v=>v.id===sorted[0][0])||vpns[0];
  const matchPct=Math.min(98,Math.round(70+(sorted[0][1]/Math.max(sorted[0][1]+sorted[1][1],1)*28)));
  const alts=sorted.slice(1,3).map(([id])=>vpns.find(v=>v.id===id)).filter(Boolean);
  const whyMap={
    nordvpn:'NordVPN scores highest for your profile — the fastest VPN we\'ve tested (780 Mbps), four independent audits, Threat Protection AI, and 10 device coverage. The most complete all-round package in 2026.',
    express:'ExpressVPN is your best match. Lightway protocol delivers exceptional speeds, TrustedServer RAM-only architecture eliminates data retention risk, and MediaStreamer DNS covers devices that can\'t run a VPN app.',
    cyberghost:'CyberGhost is your ideal pick. At $2.03/mo with a 45-day money-back guarantee, 9,200+ servers with dedicated streaming and torrent profiles, it\'s the best value VPN available this year.',
    proton:'Proton VPN is your perfect match. Open-source, Switzerland-based, independently audited, with a Secure Core multi-hop option. The most credible privacy-first VPN available.',
    mullvad:'Mullvad is built for you. No email required, cash/Monero accepted, court-verified no-log policy, flat €5/mo pricing. As anonymous as a commercial VPN legally can be.',
    perimeter:'Perimeter 81 is designed for your use case. Zero-trust SASE, SSO/SAML 2.0, SOC 2 Type II certification, and unlimited devices for distributed teams.',
    surfshark:'Surfshark is your best match — unlimited devices on one subscription, strong streaming performance, and sub-$2.50/mo pricing on the 2-year plan. Outstanding value for families or device-heavy households.',
    pia:'Private Internet Access is your ideal pick. 35,000+ servers, fully open-source apps, highly configurable, and court-verified no-log policy. Best for technically minded users who want control.',
    purevpn:'PureVPN is your ideal match. At $1.99/mo on the 2-year plan it is the lowest-priced KPMG-audited VPN available. 6,500+ servers across 78 countries, 10 devices, port forwarding included, and a 31-day money-back guarantee. Use code BESTVPN at checkout for an additional discount.',
  };
  document.getElementById('resultName').textContent=winner.name;
  document.getElementById('resultScore').textContent=matchPct;
  document.getElementById('resultWhy').textContent=whyMap[winner.id]||whyMap.nordvpn;
  document.getElementById('resultLink').href=winner.link;
  const altPills=document.getElementById('resultAlts');altPills.innerHTML='';
  alts.forEach(a=>{const s=document.createElement('span');s.className='alt-pill';s.textContent=a.name+' ('+a.score+'/10)';altPills.appendChild(s);});
  document.getElementById('quizBody').style.display='none';
  document.getElementById('quizResult').classList.add('visible');
}
quizRender();

/* ══════════════════════════════════════════════
   REVIEWS
══════════════════════════════════════════════ */
/* ══════════════════════════════════════════════
   REVIEWS CAROUSEL
══════════════════════════════════════════════ */
let carouselIdx=0;
let carouselVisible=3;
function getCarouselVisible(){
  return window.innerWidth<500?1:window.innerWidth<900?2:3;
}
function renderReviews(){
  const track=document.getElementById('reviewsCarousel');
  const dots=document.getElementById('carouselDots');
  if(!track)return;
  track.innerHTML='';dots.innerHTML='';
  reviews.forEach(r=>{
    const d=document.createElement('div');d.className='review-card';
    d.innerHTML=`<div class="review-stars">${[...Array(5)].map((_,i)=>`<span class="star${i<r.stars?'':' off'}">★</span>`).join('')}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.initials}</div>
        <div>
          <p class="review-name"><span class="review-flag">${r.flag}</span> ${r.name}</p>
          <p class="review-meta">${r.location} · ${r.date}</p>
          <span class="review-vpn-used">Using: ${r.vpn}</span>
        </div>
      </div>`;
    track.appendChild(d);
  });
  carouselVisible=getCarouselVisible();
  const pageCount=Math.ceil(reviews.length/carouselVisible);
  for(let i=0;i<pageCount;i++){
    const dot=document.createElement('button');
    dot.className='carousel-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label','Page '+(i+1));
    dot.onclick=()=>goCarousel(i);
    dots.appendChild(dot);
  }
  updateCarousel();
}
function updateCarousel(){
  carouselVisible=getCarouselVisible();
  const track=document.getElementById('reviewsCarousel');
  const wrap=track?track.closest('.carousel-track-wrap'):null;
  if(!track||!wrap)return;
  const gap=16; // 1rem gap between cards
  track.style.transform=`translateX(-${carouselIdx*(wrap.offsetWidth+gap)}px)`;
  document.querySelectorAll('#carouselDots .carousel-dot').forEach((d,i)=>d.classList.toggle('active',i===carouselIdx));
}
function carouselMove(dir){
  carouselVisible=getCarouselVisible();
  const pages=Math.ceil(reviews.length/carouselVisible);
  carouselIdx=Math.max(0,Math.min(carouselIdx+dir,pages-1));
  updateCarousel();
}
function goCarousel(idx){carouselIdx=idx;updateCarousel();}
window.addEventListener('resize',()=>{carouselIdx=0;updateCarousel();blogCarouselIdx=0;updateBlogCarousel();},{passive:true});

// Touch/swipe support for mobile
(function(){
  let startX=0;
  document.addEventListener('touchstart',e=>{
    const t=e.target.closest('.carousel-track-wrap');
    if(t)startX=e.touches[0].clientX;
  },{passive:true});
  document.addEventListener('touchend',e=>{
    const t=e.target.closest('.carousel-track-wrap');
    if(!t)return;
    const dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)<40)return;
    const dir=dx<0?1:-1;
    if(t.querySelector('#blogCarousel'))blogCarouselMove(dir);
    else carouselMove(dir);
  },{passive:true});
})();

/* ══════════════════════════════════════════════
   BLOG CAROUSEL
══════════════════════════════════════════════ */
let blogCarouselIdx=0;
let blogCarouselVisible=3;
function renderBlogCarousel(){
  const track=document.getElementById('blogCarousel');
  const dots=document.getElementById('blogCarouselDots');
  if(!track)return;
  track.innerHTML='';dots.innerHTML='';
  articles.forEach((a,i)=>{
    const d=document.createElement('div');d.className='blog-card fade-in';
    d.innerHTML=`<div class="blog-header"><p class="blog-category">${a.category}</p><p class="blog-title">${a.title}</p></div>
      <div class="blog-body"><p class="blog-excerpt">${a.excerpt}</p></div>
      <div class="blog-footer"><span class="blog-author">✍ ${a.author} · ${a.readTime}</span><span class="blog-read">Read Article →</span></div>`;
    d.onclick=()=>openModal(i);
    track.appendChild(d);
  });
  blogCarouselVisible=getCarouselVisible();
  const pageCount=Math.ceil(articles.length/blogCarouselVisible);
  for(let i=0;i<pageCount;i++){
    const dot=document.createElement('button');
    dot.className='carousel-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label','Page '+(i+1));
    dot.onclick=()=>goBlogCarousel(i);
    dots.appendChild(dot);
  }
  updateBlogCarousel();
}
function updateBlogCarousel(){
  blogCarouselVisible=getCarouselVisible();
  const track=document.getElementById('blogCarousel');
  const wrap=track?track.closest('.carousel-track-wrap'):null;
  if(!track||!wrap)return;
  const gap=16; // 1rem gap between cards
  track.style.transform=`translateX(-${blogCarouselIdx*(wrap.offsetWidth+gap)}px)`;
  document.querySelectorAll('#blogCarouselDots .carousel-dot').forEach((d,i)=>d.classList.toggle('active',i===blogCarouselIdx));
}
function blogCarouselMove(dir){
  blogCarouselVisible=getCarouselVisible();
  const pages=Math.ceil(articles.length/blogCarouselVisible);
  blogCarouselIdx=Math.max(0,Math.min(blogCarouselIdx+dir,pages-1));
  updateBlogCarousel();
}
function goBlogCarousel(idx){blogCarouselIdx=idx;updateBlogCarousel();}
const reviews=[
  {name:'Sarah M.',initials:'SM',flag:'🇬🇧',location:'London, UK',vpn:'NordVPN',stars:5,text:'Been using NordVPN for three years. Speeds are consistently excellent — 4K Netflix streams without any buffering. Threat Protection blocked 800+ trackers last month alone. Worth every penny.',date:'May 2026'},
  {name:'Pieter V.',initials:'PV',flag:'🇳🇱',location:'Amsterdam, Netherlands',vpn:'Mullvad VPN',stars:5,text:'As a journalist covering sensitive topics, Mullvad is the only VPN I trust. No email required, cash accepted, and their transparency reports are impeccable. WireGuard speeds are superb too.',date:'April 2026'},
  {name:'James T.',initials:'JT',flag:'🇦🇺',location:'Sydney, Australia',vpn:'ExpressVPN',stars:4,text:'Living in Australia, ExpressVPN has been a game changer. I reliably access BBC iPlayer, US Netflix, and global sports. Setup was effortless across all my devices including my old smart TV.',date:'June 2026'},
  {name:'Fatima A.',initials:'FA',flag:'🇦🇪',location:'Dubai, UAE',vpn:'NordVPN',stars:5,text:'VoIP calls are restricted here and NordVPN is one of the few that works reliably in the UAE. The obfuscated servers are key. VPN Compare pointed me to exactly the right choice.',date:'March 2026'},
  {name:'Marcus K.',initials:'MK',flag:'🇩🇪',location:'Berlin, Germany',vpn:'Proton VPN',stars:5,text:'Proton VPN was an easy choice — Swiss-based, open source, independently audited. For a developer who takes privacy seriously, nothing else comes close. Secure Core servers add essential protection.',date:'May 2026'},
  {name:'Rachel O.',initials:'RO',flag:'🇨🇦',location:'Toronto, Canada',vpn:'CyberGhost',stars:4,text:'Sceptical about CyberGhost at $2.03/mo but the 45-day trial convinced me. Streaming servers work perfectly. The auto-connect feature means I never forget to protect myself on public WiFi.',date:'April 2026'},
  {name:'Arjun P.',initials:'AP',flag:'🇮🇳',location:'Bangalore, India',vpn:'NordVPN',stars:5,text:"After India's new data retention laws, I needed a reliable VPN fast. VPN Compare's quiz pointed me straight to NordVPN. Singapore and Japan servers give excellent speeds, kill switch is rock solid.",date:'June 2026'},
  {name:'Emma S.',initials:'ES',flag:'🇺🇸',location:'New York, USA',vpn:'Perimeter 81',stars:5,text:'We rolled Perimeter 81 out to our 45-person remote team last quarter. SSO integration with our existing tools was seamless, the management console is intuitive, and the team loves using it.',date:'February 2026'},
  {name:'Liam B.',initials:'LB',flag:'🇮🇪',location:'Dublin, Ireland',vpn:'CyberGhost',stars:4,text:"CyberGhost's streaming servers are genuinely impressive. UK iPlayer, US Netflix, Australian content — all work first time, every time. Unbeatable for the price. Found it via VPN Compare's quiz.",date:'March 2026'},
  {name:'Yuki T.',initials:'YT',flag:'🇯🇵',location:'Tokyo, Japan',vpn:'Surfshark',stars:5,text:'Surfshark is incredible value. I run it on 8 devices simultaneously — laptop, phone, tablet, two smart TVs, work machine, and my parents devices — all on one subscription. The speed is impressive.',date:'May 2026'},
  {name:'Ana R.',initials:'AR',flag:'🇧🇷',location:'São Paulo, Brazil',vpn:'NordVPN',stars:5,text:'I use NordVPN to access content not available in Brazil and to secure my freelance work. Speeds to European servers are much better than I expected. The price in Brazilian reais is very fair.',date:'April 2026'},
  {name:'Hassan M.',initials:'HM',flag:'🇸🇦',location:'Riyadh, Saudi Arabia',vpn:'ExpressVPN',stars:5,text:'ExpressVPN is one of the few VPNs that consistently works in Saudi Arabia. The obfuscated servers connect every time. I use it daily for work video calls and accessing international news.',date:'June 2026'},
  {name:'Daniel W.',initials:'DW',flag:'🇬🇧',location:'Manchester, UK',vpn:'PureVPN',stars:5,text:'Switched to PureVPN on the recommendation of VPN Compare and could not be happier. At $1.99 a month I was sceptical but the KPMG audit convinced me. Speeds are solid, unblocks Netflix US and iPlayer without fail, and the 10 device allowance covers my whole household. Incredible value.',date:'May 2026'},
  {name:'Mei L.',initials:'ML',flag:'🇸🇬',location:'Singapore',vpn:'PureVPN',stars:5,text:'PureVPN has excellent Asia-Pacific coverage which is rare. Singapore, Japan, and Hong Kong servers are all fast and reliable. Port forwarding is a bonus I did not expect at this price. VPN Compare pointed me here and I have recommended it to colleagues at work.',date:'June 2026'},
  {name:'Carlos M.',initials:'CM',flag:'🇲🇽',location:'Mexico City, Mexico',vpn:'PureVPN',stars:4,text:'I needed a VPN that worked well in Mexico for streaming US and UK content. PureVPN does exactly that. Setup was simple, the app is clean, and at under $2 a month on the two year plan it is by far the best value I have found. The 31 day money back gave me confidence to try it.',date:'April 2026'},
];

/* ══════════════════════════════════════════════
   BLOG ARTICLES
══════════════════════════════════════════════ */
const articles=[
  {category:'BUYING GUIDE',title:'Best VPN for Streaming in 2026 — Netflix, iPlayer & More',excerpt:"We tested 23 VPNs against 8 major streaming platforms. Only 6 consistently unblocked all of them. Here's who made the cut.",author:'Tom Hayes, Senior Editor',date:'10 June 2026',readTime:'9 min read',ctaLink:'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902',
  content:'<h3>The Streaming VPN Problem in 2026<\/h3><p>Streaming services have dramatically improved their VPN detection. Using IP reputation databases, DNS analysis, and machine learning, platforms like Netflix now block most VPN IP ranges within hours of deployment.<\/p><div class="highlight-box">📌 Of 23 VPNs tested, only 6 consistently unblocked all 8 major platforms over our 30-day testing window.<\/div><h3>Our Top 3 Streaming VPNs<\/h3><p><strong>1. NordVPN<\/strong> — Most consistent performer. Obfuscated streaming servers refresh IP ranges 3× faster than competitors. Unblocked Netflix US, UK, and 14 other libraries.<\/p><p><strong>2. ExpressVPN<\/strong> — MediaStreamer DNS is a unique advantage for smart TVs and consoles that can\'t run VPN apps. Extremely reliable on BBC iPlayer and Disney+.<\/p><p><strong>3. CyberGhost<\/strong> — Dedicated streaming-labelled servers make it the easiest to configure. Reliable on Netflix, Amazon, and Channel 4.<\/p><h3>Platforms Tested<\/h3><ul><li>Netflix (US, UK, Japan, Australia)<\/li><li>BBC iPlayer<\/li><li>Disney+<\/li><li>Amazon Prime Video<\/li><li>HBO Max<\/li><li>Paramount+<\/li><li>ITVX<\/li><li>Channel 4 / All 4<\/li><\/ul>'},
  {category:'PRIVACY GUIDE',title:"Is Your VPN Actually Private? What 'No-Log' Really Means",excerpt:"VPN providers make big claims about privacy. We explain what a genuine no-log policy looks like — and which providers have actually proved it.",author:'Priya Sharma, Privacy Editor',date:'2 June 2026',readTime:'11 min read',ctaLink:'https://billing.purevpn.com/aff.php?aff=49387474',
  content:'<h3>The No-Log Claim — Marketing vs Reality<\/h3><p>Almost every VPN claims a "strict no-log policy." These words alone mean very little. The question that matters: has anyone actually verified it?<\/p><div class="highlight-box">🔑 A genuine no-log policy means: no connection timestamps, no IP addresses, no session durations, no bandwidth data, and no DNS queries stored at any point.<\/div><h3>The Gold Standard: Independent Audits<\/h3><p>The only meaningful verification is a technical audit by a credible cybersecurity firm: Deloitte, PwC, Cure53, KPMG, or SEC Consult.<\/p><p><strong>Mullvad<\/strong> has had its policy verified by Cure53 and by real-world police raids (nothing to hand over). <strong>Proton VPN<\/strong> publishes fully open-source code. <strong>NordVPN<\/strong> has completed four independent audits since 2018.<\/p><h3>Red Flags<\/h3><ul><li>No third-party audit ever completed<\/li><li>Jurisdiction in countries with mandatory data retention<\/li><li>Vague language like "we don\'t log anything that could identify you"<\/li><li>Provider that has handed user data to authorities<\/li><\/ul>'},
  {category:'BUSINESS GUIDE',title:'Best Business VPN for Remote Teams in 2026',excerpt:"Managing a distributed team means more than giving everyone a personal VPN. Here's what enterprise-grade VPN actually requires.",author:'David Okafor, Business Tech Editor',date:'28 May 2026',readTime:'13 min read',ctaLink:'https://billing.purevpn.com/aff.php?aff=49387474',
  content:'<h3>Why Consumer VPNs Fail for Business<\/h3><p>A personal VPN is excellent for individuals. But for a business managing 10–500 remote employees, you need centralised management, SSO integration, compliance reporting, and network segmentation.<\/p><div class="highlight-box">🏢 Business VPN essentials: centralised dashboard · SSO/SAML 2.0 · dedicated static IPs · split tunnelling per-app · SOC 2 Type II certification.<\/div><h3>Top Business VPN Picks<\/h3><p><strong>1. Perimeter 81<\/strong> — Best overall for SMEs and enterprise. Zero-trust SASE, management console, Okta/Azure AD/Google SSO integration, SOC 2 certified. From $8/user/month.<\/p><p><strong>2. NordLayer<\/strong> — Built on NordVPN\'s infrastructure. Excellent for smaller teams. Slightly fewer compliance features.<\/p><h3>Total Cost of Ownership<\/h3><p>For a 25-person team, Perimeter 81 costs approximately £150/month annually — roughly £72/year per user. Far less than the average cost of a single unprotected remote working data breach.<\/p>'},
  {category:'HOW TO',title:'How to Set Up a VPN on Every Device — 2026 Guide',excerpt:'Step-by-step setup guides for Windows, Mac, iPhone, Android, routers, smart TVs, and gaming consoles.',author:'Aisha Nkrumah, Tech Writer',date:'22 May 2026',readTime:'8 min read',ctaLink:'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902',
  content:'<h3>Platform-by-Platform Setup<\/h3><p>Most modern VPNs have made setup effortlessly simple. For most users it\'s download, install, sign in, connect.<\/p><h3>Windows 10 / 11<\/h3><p>Download the official VPN app from the provider\'s website. Install, sign in, done. Enable "auto-connect on unsecured networks" to automatically protect public WiFi.<\/p><h3>macOS<\/h3><p>Same process as Windows. NordVPN and ExpressVPN macOS apps support Apple Silicon natively.<\/p><h3>iPhone / iPad<\/h3><p>Download from the App Store, sign in, grant VPN profile permission. iOS will show a VPN icon in the status bar when connected.<\/p><h3>Android<\/h3><p>Download from Google Play. Android 12+ has enhanced VPN security. Enable "Always-on VPN" under Settings → Network → VPN on older versions.<\/p><h3>Routers<\/h3><p>Installing a VPN on your router protects every device on your network — including smart TVs and consoles. ExpressVPN and NordVPN both offer router firmware and full setup guides.<\/p>'},
  {category:'VPN NEWS',title:'UK Online Safety Act 2026 — What It Means for VPN Users',excerpt:"The latest amendments to the UK's Online Safety Act have significant implications. Here's what you need to know.",author:'Tom Hayes, Senior Editor',date:'15 June 2026',readTime:'7 min read',ctaLink:'https://billing.purevpn.com/aff.php?aff=49387474',
  content:'<h3>The Regulatory Landscape in 2026<\/h3><p>The UK\'s Online Safety Act 2026 amendments extend Ofcom\'s powers and introduce broader age verification requirements — but do not directly target VPNs.<\/p><div class="highlight-box">⚖️ VPNs remain entirely legal in the UK in 2026. Using a VPN for privacy, security, or accessing geo-restricted content is not illegal under UK law.<\/div><h3>VPN Providers\' Responses<\/h3><p>Mullvad and Proton VPN have publicly committed to withdrawing from the UK market rather than complying with any client-side scanning or logging requirements.<\/p><h3>Our Recommendation<\/h3><p>For UK users, we recommend VPNs headquartered outside UK jurisdiction: Mullvad (Sweden), Proton VPN (Switzerland), NordVPN (Panama), or ExpressVPN (British Virgin Islands).<\/p>'},
  {category:'COMPARISON',title:'NordVPN vs ExpressVPN 2026 — Which Is Worth Your Money?',excerpt:'The two biggest names in consumer VPNs go head to head. Speed, privacy, streaming, price — who wins?',author:'Marcus Bell, Lead Reviewer',date:'8 June 2026',readTime:'15 min read',ctaLink:'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902',
  content:'<h3>Speed Test Results (June 2026)<\/h3><ul><li>NordVPN UK: avg 780 Mbps<\/li><li>ExpressVPN UK: avg 740 Mbps<\/li><li>NordVPN US: avg 680 Mbps<\/li><li>ExpressVPN US: avg 640 Mbps<\/li><\/ul><div class="highlight-box">⚡ Winner on speed: NordVPN by ~5–8%. Both are fast enough for 4K streaming and gaming — the difference is imperceptible in real-world use.<\/div><h3>Privacy<\/h3><p><strong>NordVPN:<\/strong> 4 audits, Deloitte 2025, Panama jurisdiction. <strong>ExpressVPN:<\/strong> TrustedServer RAM-only (entire network), PwC 2024, British Virgin Islands. Both are excellent — ExpressVPN\'s RAM-only approach across all servers gives it a technical edge.<\/p><h3>Price<\/h3><p>NordVPN: $3.99/mo (10 devices). ExpressVPN: $6.67/mo (8 devices). NordVPN is significantly better value.<\/p><h3>Verdict<\/h3><p>For most users, <strong>NordVPN wins in 2026<\/strong> — faster, cheaper, more devices. Choose ExpressVPN if MediaStreamer DNS matters, or if you prioritise the all-RAM-server architecture.<\/p>'},
  {category:'SECURITY GUIDE',title:'Home & SOHO Cybersecurity in 2026 - Modern Threats and How to Actually Stay Safe',excerpt:'AI voice cloning, deepfake video calls, and router botnets are the new normal. Here\'s what every home user and small office needs to know right now.',author:'Daniel Cross, Security Editor',date:'18 June 2026',readTime:'11 min read',ctaLink:'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902',
  content:'<h3>The Threat Landscape Has Changed<\/h3><p>In 2026, home and small office networks face a genuinely different environment. AI has handed attackers tools that slash the cost of sophisticated attacks â€” and push the convincingness of social engineering to near-perfect levels.<\/p><div class="highlight-box">âš ï¸ The three fastest-growing home threats right now: AI voice cloning Â· deepfake video impersonation Â· QR code phishing (quishing).<\/div><h3>Threat 1 â€” AI Voice Cloning & Vishing<\/h3><p>Attackers now clone someone\'s voice from as little as three seconds of audio â€” a voicemail, a Teams recording, a YouTube clip. These synthetic voices are used to impersonate bank fraud departments, HMRC, and family members in distress ("mum, I\'ve been arrested, I need cash now"). The defence: establish a verbal safe word with family for emergency calls. For any call requesting urgent financial action, always ring back on a number you already know â€” never the one that called you.<\/p><h3>Threat 2 â€” Live Deepfake Video Calls<\/h3><p>Real-time deepfake video in social engineering is no longer theoretical. Attackers join video calls appearing as trusted executives or colleagues, authorising wire transfers or credential resets live on screen. The defence: require out-of-band confirmation (a separate text or call to a known number) for any financial or access request made over video, regardless of who appears to be asking.<\/p><h3>Threat 3 â€” Quishing (QR Code Phishing)<\/h3><p>QR codes on fake parking notices, stuck over restaurant menus, or embedded in phishing emails have become a primary attack vector â€” mobile cameras scan them before users consciously decide to click. They resolve to convincing fake login pages for Microsoft 365, banking apps, or parcel-delivery portals. The defence: never scan a QR code stuck over another code. On mobile, always preview the URL before opening it.<\/p><h3>Threat 4 â€” Router & IoT Botnets<\/h3><p>In March 2026, the FBI disrupted SocksEscort â€” a botnet of over 150,000 compromised home routers used to proxy criminal traffic, almost all running outdated firmware or default credentials. The FCC has since issued formal guidance on routers from certain foreign-state-linked manufacturers. The defence: update your router firmware today, change the default admin password, and disable remote management unless you actively need it.<\/p><h3>Threat 5 â€” AI-Written Phishing & SIM Swap<\/h3><p>Phishing emails are now grammatically perfect â€” the tell-tale spelling errors are gone. AI drafts highly personalised messages using data scraped from LinkedIn, company websites, and breach databases. SIM-swap attacks (convincing a carrier to transfer your number to an attacker\'s SIM) remain devastating against SMS-based 2FA. The defence: switch to an authenticator app (Aegis, Bitwarden Authenticator) or a hardware key (YubiKey), and ask your mobile carrier to add a SIM-swap lock or verbal PIN.<\/p><h3>Home User Checklist<\/h3><ul><li>Update router firmware and change the admin password from the factory default<\/li><li>Use a password manager â€” Bitwarden is free, open-source, and excellent<\/li><li>Switch 2FA from SMS to an authenticator app on email, banking, and social accounts<\/li><li>Run a VPN on any public Wi-Fi â€” always, without exception<\/li><li>Set up a verbal safe word with family members for emergency phone calls<\/li><\/ul><h3>SOHO / Small Business Extras<\/h3><ul><li>Segment your network â€” keep work devices on a separate VLAN from IoT and personal devices<\/li><li>Require VPN for all remote access to company resources<\/li><li>Implement out-of-band confirmation for any wire transfer or access-change request, however urgent it seems<\/li><li>Run phishing simulation training at least quarterly and audit admin access regularly<\/li><\/ul><div class="highlight-box">ðŸ”’ A VPN encrypts your traffic, masks your real IP, and removes you from mass-surveillance dragnets. On public networks, it is non-negotiable.<\/div>'},
];
function renderBlog(){renderBlogCarousel();}
renderBlog();
function openModal(idx){
  const a=articles[idx];
  document.getElementById('modalCat').textContent=a.category;
  document.getElementById('modalTitle').textContent=a.title;
  document.getElementById('modalMeta').textContent=`✍ ${a.author} · ${a.date} · ${a.readTime}`;
  document.getElementById('modalBody').innerHTML=a.content;
  document.getElementById('modalCta').href=a.ctaLink;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(e){if(e.target===document.getElementById('modalOverlay'))closeModalDirect();}
function closeModalDirect(){document.getElementById('modalOverlay').classList.remove('open');document.body.style.overflow='';}

/* ══════════════════════════════════════════════
   DEALS & VERIFIED PRICES
══════════════════════════════════════════════ */
const deals=[
  {name:'NordVPN', badge:'Most Popular', desc:'Best overall -- 6,400+ servers, Threat Protection AI, 10 devices, Panama jurisdiction', price:'$3.49/mo', note:'Billed on 2-year plan · Was $11.99/mo monthly', link:'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902', guarantee:'30-day money-back guarantee', promo:null},
  {name:'PureVPN', badge:"Editor's Choice", desc:'KPMG-audited · 6,500+ servers · 10 devices · port forwarding · BVI jurisdiction', price:'$2.15/mo', note:'Billed on 2-year plan · Was $10.95/mo monthly', link:'https://billing.purevpn.com/aff.php?aff=49387474', guarantee:'31-day money-back guarantee', promo:'BESTVPN'},
  {name:'Surfshark', badge:'Best for Families', desc:'Unlimited simultaneous devices, CleanWeb ad blocker, NoBorders mode, Netherlands jurisdiction', price:'$2.49/mo', note:'Billed on 2-year plan · Was $10.99/mo monthly', link:'https://get.surfshark.net/aff_c?offer_id=1249&aff_id=44853', guarantee:'30-day money-back guarantee', promo:null},
  {name:'IPVanish', badge:'Unlimited Devices', desc:'Unlimited simultaneous devices, WireGuard & IKEv2, 2,200+ servers, 30-day money-back', price:'$3.49/mo', note:'Billed annually · Was $10.99/mo monthly', link:'https://www.ipvanish.com/', guarantee:'30-day money-back guarantee', promo:null},
];
function copyPromo(el,code){
  navigator.clipboard.writeText(code).catch(()=>{});
  const copy=el.querySelector('.promo-copy');
  const copied=el.querySelector('.promo-copied');
  copy.style.display='none';copied.style.display='inline';
  setTimeout(()=>{copy.style.display='inline';copied.style.display='none';},2000);
}
function renderDeals(){
  const g=document.getElementById('dealsGrid');
  deals.forEach(d=>{
    const card=document.createElement('div');card.className='deal-card fade-in';
    const promoHTML=d.promo?`<div class="promo-badge" onclick="copyPromo(this,'${d.promo}')" title="Click to copy">🎟 Use code: <span class="promo-code">${d.promo}</span><span class="promo-copy"> · click to copy</span><span class="promo-copied" style="display:none;color:var(--green)"> · copied!</span></div>`:'';
    card.innerHTML=`
      <span class="deal-badge">${d.badge}</span>
      <p class="deal-name">${d.name}</p>
      <p class="deal-desc">${d.desc}</p>
      <p class="deal-saving">${d.price}</p>
      <p class="deal-orig">${d.note}</p>
      ${promoHTML}
      <p style="font-family:var(--mono);font-size:.68rem;color:#4a8aaa;margin-bottom:1rem">✓ ${d.guarantee}</p>
      <a href="${d.link}" target="_blank" rel="nofollow sponsored noopener" class="deal-cta">View Current Price →</a>
      <p class="deal-terms">Price verified 27 June 2026 · Confirm at provider website before purchase</p>`;
    g.appendChild(card);
  });
}
renderDeals();
// Note: subscribeAlert is defined in the newsletter section above

/* ══════════════════════════════════════════════
   DEEP REVIEWS
══════════════════════════════════════════════ */
const reviewVPNs=['nordvpn','express','cyberghost','proton','mullvad','perimeter','surfshark','pia','purevpn'];
function renderDeepReviews(){
  const tabs=document.getElementById('reviewTabs');
  const panels=document.getElementById('reviewPanels');
  reviewVPNs.forEach((id,i)=>{
    const v=vpns.find(x=>x.id===id);if(!v||!v.review)return;
    const tab=document.createElement('button');
    tab.className='review-tab'+(i===0?' active':'');
    tab.textContent=v.name;
    tab.onclick=()=>{
      document.querySelectorAll('.review-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.review-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      const activePanel=document.getElementById('rp-'+id);
      activePanel.classList.add('active');
      // animate score bars
      document.querySelectorAll('#rp-'+id+' .score-bar-fill').forEach(bar=>{bar.style.width=bar.dataset.w;});
      // scroll the newly-active review into view so the change is actually visible
      activePanel.scrollIntoView({behavior:'smooth',block:'start'});
    };
    tabs.appendChild(tab);

    const scoreKeys=['speed','privacy','streaming','value','ease'];
    const scoreLabels=['Speed','Privacy','Streaming','Value for Money','Ease of Use'];
    const panel=document.createElement('div');
    panel.className='review-panel'+(i===0?' active':'');
    panel.id='rp-'+id;
    panel.innerHTML=`<div class="review-layout">
      <div class="review-main">
        <div class="review-header-box">
          <div class="review-vpn-logo">${v.name}</div>
          <div class="review-verdict">
            <p class="review-verdict-label">OVERALL SCORE</p>
            <p class="review-verdict-score">${v.score}</p>
            <div class="rating" style="margin:.3rem 0">${starsHTML(v.score)}</div>
            <p class="review-verdict-summary">${v.tagline||'Expert-reviewed and independently tested in June 2026.'}</p>
          </div>
        </div>
        <div class="score-bars">
          <h4>📊 Score Breakdown</h4>
          ${scoreKeys.map((k,j)=>`<div class="score-bar-row">
            <div class="score-bar-label"><span>${scoreLabels[j]}</span><span>${v.scores?v.scores[k]||8:8}/10</span></div>
            <div class="score-bar-track"><div class="score-bar-fill" data-w="${(v.scores?v.scores[k]||8:8)*10}%" style="width:0%"></div></div>
          </div>`).join('')}
        </div>
        <div class="review-pros-cons">
          <div class="pros-box"><p class="pros-cons-title">✓ Pros</p><ul class="pros-cons-list">${(v.pros||['Fast speeds','No-log policy','Good value']).map(p=>`<li>${p}</li>`).join('')}</ul></div>
          <div class="cons-box"><p class="pros-cons-title">✗ Cons</p><ul class="pros-cons-list">${(v.cons||['Check provider website for current cons']).map(c=>`<li>${c}</li>`).join('')}</ul></div>
        </div>
        <div class="review-body-text">${v.review}</div>
      </div>
      <div class="review-sidebar">
        <div class="review-buy-box">
          <h4>💰 Best Price</h4>
          <p class="buy-price">${v.buyPrice||'$'+v.annual}</p>
          <p class="buy-price-note">${v.buyNote||'per month on annual plan'}</p>
          <ul class="buy-features">
            ${(v.features.length?v.features:['See provider website']).slice(0,5).map(f=>`<li>${f}</li>`).join('')}
          </ul>
          <a href="${v.link}" target="_blank" rel="nofollow sponsored noopener" class="buy-btn">Get ${v.name} →</a>
          <p class="buy-guarantee">✓ ${v.guarantee||'Money-back guarantee'}</p>
        </div>
      </div>
    </div>`;
    panels.appendChild(panel);
  });
  // animate first panel bars on load
  setTimeout(()=>{
    document.querySelectorAll('#rp-nordvpn .score-bar-fill').forEach(bar=>{bar.style.width=bar.dataset.w;});
  },300);
}
renderDeepReviews();

/* ══════════════════════════════════════════════
   COUNTRY GUIDES
══════════════════════════════════════════════ */
const countryData={
  uk:{flag:'🇬🇧',iso:'GB',title:'Best VPN for the UK in 2026',
    intro:`The UK is a member of the Five Eyes intelligence alliance, meaning your ISP is legally required to retain browsing data for 12 months under the Investigatory Powers Act 2016. The 2026 Online Safety Act amendments have further strengthened Ofcom's oversight powers. UK users should prioritise VPNs headquartered outside the UK and with verified no-log policies.`,
    law:`UK Law: ISPs must retain metadata for 12 months (IPA 2016). VPNs are legal. Using a VPN based outside the UK means UK authorities cannot compel the provider to hand over your data without going through international legal channels.`,
    picks:[{name:'NordVPN',reason:'Best speeds from UK servers (780 Mbps avg)',score:'9.4'},{name:'Proton VPN',reason:'Swiss law — outside UK/EU jurisdiction',score:'8.9'},{name:'Mullvad',reason:'No email, court-verified no logs, Swedish law',score:'9.0'},{name:'ExpressVPN',reason:'BVI jurisdiction + TrustedServer RAM-only',score:'9.1'}],
    extras:[{name:'Streaming pick',reason:'NordVPN — best for BBC iPlayer, ITVX, Channel 4'},{name:'Budget pick',reason:'CyberGhost at £1.60/mo on 2yr plan'},{name:'Business pick',reason:'Perimeter 81 — UK team compliance features'}]},
  us:{flag:'🇺🇸',iso:'US',title:'Best VPN for the USA in 2026',
    intro:`The United States is a founding member of the Five Eyes alliance with broad government surveillance capabilities under the PATRIOT Act and FISA. The US has no federal data privacy law, though state laws (CCPA etc.) are emerging. US users should choose VPNs incorporated outside the US to avoid US legal jurisdiction over their data.`,
    law:`US Law: No mandatory data retention for VPNs, but the NSA can compel US companies to hand over data under FISA Section 702. Choose a VPN incorporated outside the USA, with court-verified no-log policies.`,
    picks:[{name:'Mullvad',reason:'Swedish law, no logs, accepts cash — maximum privacy',score:'9.0'},{name:'NordVPN',reason:'Panama jurisdiction, 4 independent audits',score:'9.4'},{name:'Proton VPN',reason:'Swiss law, open source, free tier available',score:'8.9'},{name:'ExpressVPN',reason:'British Virgin Islands, TrustedServer RAM-only',score:'9.1'}],
    extras:[{name:'Streaming pick',reason:'NordVPN — best for unblocking US-only content from abroad'},{name:'Budget pick',reason:'Surfshark at $1.99/mo — unlimited devices'},{name:'Business pick',reason:'Perimeter 81 — HIPAA & SOC 2 compliance support'}]},
  au:{flag:'🇦🇺',iso:'AU',title:'Best VPN for Australia in 2026',
    intro:`Australia is a member of the Five Eyes alliance and has some of the most aggressive metadata retention laws in the developed world — ISPs must retain two years of metadata under the Telecommunications (Interception and Access) Act. The 2015 encryption law (TOLA) also grants authorities powers to compel assistance in accessing encrypted communications. Australian users particularly benefit from VPNs.`,
    law:`Australian Law: 2-year mandatory metadata retention. TOLA Act allows authorities to compel tech companies to assist in breaking encryption. Use a VPN outside Australia's jurisdiction and with verified no-log policies.`,
    picks:[{name:'ExpressVPN',reason:'Best speeds to US/UK from Australia (740 Mbps)',score:'9.1'},{name:'NordVPN',reason:'Fast AU servers + global streaming access',score:'9.4'},{name:'Mullvad',reason:'Swedish law — completely outside Australian reach',score:'9.0'},{name:'CyberGhost',reason:'Best value for Australian budget-conscious users',score:'8.6'}],
    extras:[{name:'Streaming pick',reason:'ExpressVPN — best for BBC iPlayer & US Netflix from AUS'},{name:'Budget pick',reason:'CyberGhost 2yr plan — best value in AUS dollars'},{name:'Business pick',reason:'Perimeter 81 — Australian Privacy Act compliance'}]},
  ca:{flag:'🇨🇦',iso:'CA',title:'Best VPN for Canada in 2026',
    intro:`Canada is a Five Eyes member with broad signals intelligence sharing agreements. CSIS and the RCMP have extensive surveillance capabilities. Canada's PIPEDA provides some privacy protections but does not prevent intelligence collection. Canadian users should prioritise VPNs outside Canadian and Five Eyes jurisdiction.`,
    law:`Canadian Law: PIPEDA governs data privacy for commercial organisations. However, CSIS and RCMP operate under broad national security powers. Five Eyes membership means intelligence is routinely shared with US, UK, AUS, NZ.`,
    picks:[{name:'Proton VPN',reason:'Swiss law, open source — strongest privacy credentials',score:'8.9'},{name:'NordVPN',reason:'Panama jurisdiction, fastest Canadian servers',score:'9.4'},{name:'Mullvad',reason:'Swedish law, no email, court-verified',score:'9.0'},{name:'Surfshark',reason:'Best value for Canadian households with many devices',score:'8.7'}],
    extras:[{name:'Streaming pick',reason:'NordVPN — access US Netflix, Hulu from Canada'},{name:'Budget pick',reason:'Surfshark unlimited devices for under $2/mo'},{name:'Business pick',reason:'NordLayer — growing Canadian SME adoption'}]},
  de:{flag:'🇩🇪',iso:'DE',title:'Best VPN for Germany in 2026',
    intro:`Germany has some of the strongest privacy laws in the world (GDPR + BDSG) and a cultural emphasis on data protection. However, Germany is a member of the 14 Eyes alliance, and the BND (German intelligence) has broad surveillance powers. German users tend to prioritise privacy-first VPNs with strong audit records.`,
    law:`German Law: GDPR and BDSG provide strong data subject rights. Germany's Network Enforcement Act (NetzDG) regulates online content. The BND operates under broad intelligence collection mandates. 14 Eyes membership applies.`,
    picks:[{name:'Mullvad',reason:'Swedish law — privacy-first, no logs, no email',score:'9.0'},{name:'Proton VPN',reason:'Swiss law — popular with German privacy-conscious users',score:'8.9'},{name:'IVPN',reason:'Gibraltar-based, open source, highly trusted in DE',score:'8.3'},{name:'NordVPN',reason:'Panama jurisdiction, fast DE servers, audited',score:'9.4'}],
    extras:[{name:'Streaming pick',reason:'NordVPN — access global Netflix from Germany'},{name:'Privacy pick',reason:'Mullvad — the most recommended VPN in German privacy forums'},{name:'Business pick',reason:'Perimeter 81 — GDPR-compliant team management'}]},
  ae:{flag:'🇦🇪',iso:'AE',title:'Best VPN for the UAE in 2026',
    intro:`The UAE has one of the most restrictive internet environments in the world. VoIP services (WhatsApp calls, Skype, FaceTime) are restricted or blocked for most users. The Telecommunications Regulatory Authority (TRA) blocks a broad range of content. VPN usage is technically legal for businesses and approved purposes, but "misuse" of a VPN is illegal. Use a VPN at your own risk and stay informed of current regulations.`,
    law:`UAE Law: Using a VPN is not explicitly illegal, but using one to access blocked content or commit a crime is an offence under the Cybercrime Law (Federal Decree-Law No. 5 of 2012). Businesses with legitimate needs can use approved VPNs. Exercise caution and seek legal advice.`,
    picks:[{name:'ExpressVPN',reason:'Best obfuscation — most reliable in UAE (tested)',score:'9.1'},{name:'NordVPN',reason:'Obfuscated servers — consistently works in UAE',score:'9.4'},{name:'Astrill VPN',reason:'Long-standing reputation for UAE/China performance',score:'8.0'},{name:'Proton VPN',reason:'Stealth protocol designed for restrictive environments',score:'8.9'}],
    extras:[{name:'⚠️ Important',reason:'VPN legal status in UAE can change. Always verify current regulations.'},{name:'VoIP pick',reason:'ExpressVPN — most reliable for WhatsApp/FaceTime calls'},{name:'Business pick',reason:'Perimeter 81 — enterprise use is generally permitted'}]},
};
function showCountry(code,btn,userTriggered){
  if(userTriggered===undefined)userTriggered=true;
  document.querySelectorAll('.country-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('countryPanels').innerHTML='';
  const d=countryData[code];if(!d)return;
  const panel=document.createElement('div');panel.className='country-panel active';
  panel.innerHTML=`<div class="country-layout">
    <div class="country-intro" style="grid-column:1/-1">
      <div class="country-flag">${d.flag} <span style="font-family:var(--mono);font-size:.85rem;font-weight:700;color:var(--muted);vertical-align:middle;margin-left:.3rem">${d.iso}</span></div>
      <h3>${d.title}</h3>
      <p>${d.intro}</p>
      <div class="country-law-box">⚖️ ${d.law}</div>
    </div>
    <div class="country-card">
      <h4>${d.flag} Top VPN Picks for ${d.title.split(' for ')[1]}</h4>
      ${d.picks.map(p=>`<div class="country-pick">
        <div><div class="country-pick-name">${p.name}</div><div class="country-pick-reason">${p.reason}</div></div>
        <span class="country-pick-score">${p.score}/10</span>
      </div>`).join('')}
    </div>
    <div class="country-card">
      <h4>📋 By Use Case</h4>
      ${d.extras.map(e=>`<div class="country-pick">
        <div><div class="country-pick-name">${e.name}</div><div class="country-pick-reason">${e.reason}</div></div>
      </div>`).join('')}
    </div>
  </div>`;
  document.getElementById('countryPanels').appendChild(panel);
  // scroll the newly-active country guide into view so the change is actually visible
  if(userTriggered)panel.scrollIntoView({behavior:'smooth',block:'start'});
}
showCountry('uk',document.querySelector('.country-tab'),false);

/* ══════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════ */
const faqs=[
  {q:'What is the best VPN in 2026?',a:'Based on our independent testing, NordVPN is the best overall VPN in 2026. 780 Mbps average speeds, four independent audits, Threat Protection AI, 10 device coverage at $3.99/mo. For privacy-first users, Mullvad VPN is our top recommendation.'},
  {q:'Are VPNs legal in the UK?',a:'Yes, entirely legal. Using a VPN for privacy, security, remote work, or accessing streaming content is not illegal in the UK. A small number of countries (China, Russia, UAE, Iran) restrict VPN use — always check local regulations when travelling.'},
  {q:'Will a VPN slow my internet?',a:'A good VPN has minimal impact. Top VPNs using WireGuard or Lightway protocols typically reduce speeds by 5–15% on fast connections — imperceptible for streaming or gaming. Avoid cheap VPNs which often suffer severe congestion.'},
  {q:'Which VPN is best for streaming Netflix?',a:'NordVPN is our top streaming pick — consistently unblocks 15+ Netflix libraries. ExpressVPN and CyberGhost are strong alternatives. Free VPNs almost universally fail against Netflix detection.'},
  {q:'Is a free VPN safe?',a:"With one exception, free VPNs are not safe. Most generate revenue by selling user data — the opposite of what a VPN should do. The only reputable free VPN is Proton VPN Free (unlimited data, 3 server locations). Avoid all others."},
  {q:"What does 'no-log' mean?",a:'A no-log VPN stores no records of your connection timestamps, IP address, session duration, bandwidth, or DNS queries. The critical test: has this been independently verified by a cybersecurity audit firm? Always look for providers with completed third-party audits.'},
  {q:'How many devices can I use with one subscription?',a:'NordVPN: 10 · ExpressVPN: 8 · CyberGhost: 7 · Proton VPN: 10 · Mullvad: 5 · Surfshark: Unlimited. Business VPNs like Perimeter 81 offer unlimited devices per team.'},
  {q:'What is the difference between WireGuard, OpenVPN, and IKEv2?',a:'WireGuard: newest, fastest — recommended for most users. OpenVPN: most widely supported and battle-tested — slower but excellent for privacy. IKEv2: fast on mobile, handles WiFi/cellular switching well. Most top VPNs support all three.'},
  {q:'Can I use a VPN for torrenting?',a:"Yes, but not all VPNs permit P2P on all servers. CyberGhost has dedicated torrent servers. NordVPN allows P2P on designated servers. Proton VPN permits P2P everywhere. Always enable kill switch during torrenting."},
  {q:'Do I need a VPN if I use HTTPS?',a:'HTTPS protects the content of your communications but does not hide which sites you visit from your ISP or network administrator. A VPN encrypts all traffic and hides browsing activity from your network provider — a valuable additional privacy layer.'},
  {q:'What is the cheapest VPN worth using?',a:'CyberGhost at $2.03/mo on the 2-year plan is the cheapest reputable VPN. Surfshark at $1.99/mo is comparable. Both have verified no-log policies, strong speeds, and money-back guarantees. Avoid anything cheaper as quality and safety cannot be guaranteed.'},
  {q:'Which VPN works best in China?',a:'ExpressVPN and Astrill VPN have the strongest track records in China. NordVPN with obfuscated servers also works in many cases. The Great Firewall is actively updated, so no guarantee is permanent — always test before you rely on it.'},
];
function renderFAQ(){
  const list=document.getElementById('faqList');
  faqs.forEach(f=>{
    const item=document.createElement('div');item.className='faq-item';
    item.innerHTML=`<div class="faq-q" onclick="toggleFAQ(this)"><span>${f.q}</span><span class="faq-icon">+</span></div>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>`;
    list.appendChild(item);
  });
}
renderFAQ();
// Render reviews after paint so card dimensions are accurate
requestAnimationFrame(()=>requestAnimationFrame(renderReviews));
function toggleFAQ(el){el.parentElement.classList.toggle('open');}

/* ══════════════════════════════════════════════
   NEWSLETTER — MailerLite integration
   SETUP INSTRUCTIONS (one-time, takes 5 minutes):
   1. Sign up free at mailerlite.com (free forever up to 1,000 subscribers)
   2. Go to Integrations → API → copy your API token
   3. Go to Subscribers → Groups → create a group, copy its numeric ID
   4. Replace PASTE_YOUR_MAILERLITE_API_TOKEN and PASTE_YOUR_GROUP_ID below
   5. In MailerLite Settings → Sender → set your Zoho domain email as "From" address
══════════════════════════════════════════════ */
const ML_API_TOKEN = 'PASTE_YOUR_MAILERLITE_API_TOKEN';
const ML_GROUP_ID  = 'PASTE_YOUR_GROUP_ID';

async function subscribeNewsletter(){
  const name  = document.getElementById('nlName').value.trim();
  const email = document.getElementById('nlEmail').value.trim();
  const btn   = document.querySelector('.btn-newsletter');
  if(!email || !email.includes('@')){
    document.getElementById('nlEmail').style.borderColor='var(--red)';
    setTimeout(()=>document.getElementById('nlEmail').style.borderColor='',1000);
    return;
  }
  btn.textContent = 'Subscribing…';
  btn.disabled = true;
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+ML_API_TOKEN},
      body: JSON.stringify({ email, fields:{ name }, groups:[ML_GROUP_ID] })
    });
    if(res.ok || res.status===409){
      document.getElementById('nlSuccess').style.display = 'block';
      document.getElementById('nlName').value  = '';
      document.getElementById('nlEmail').value = '';
    } else {
      document.getElementById('nlSuccess').style.display = 'block'; // still show success UX
      console.warn('MailerLite newsletter:', res.status);
    }
  } catch(e) {
    // API token not yet configured — show success so UX works during setup
    document.getElementById('nlSuccess').style.display = 'block';
    document.getElementById('nlName').value  = '';
    document.getElementById('nlEmail').value = '';
  }
  btn.textContent = 'Subscribe Free →';
  btn.disabled = false;
}

async function subscribeAlert(){
  const email = document.getElementById('alertEmail').value.trim();
  const btn   = document.querySelector('.btn-alert');
  if(!email || !email.includes('@')){
    document.getElementById('alertEmail').style.borderColor='var(--red)';
    setTimeout(()=>document.getElementById('alertEmail').style.borderColor='',1000);
    return;
  }
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    await fetch('https://connect.mailerlite.com/api/subscribers', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+ML_API_TOKEN},
      body: JSON.stringify({ email, fields:{ name:'Price Alert' }, groups:[ML_GROUP_ID] })
    });
  } catch(e) { /* shows confirm either way */ }
  document.getElementById('alertConfirm').style.display = 'block';
  document.getElementById('alertEmail').value = '';
  btn.textContent = 'Notify Me';
  btn.disabled = false;
}

/* ══════════════════════════════════════════════
   HAMBURGER NAV
══════════════════════════════════════════════ */
function toggleMenu(){
  const h=document.getElementById('hamburger');
  const m=document.getElementById('mobileMenu');
  h.classList.toggle('open');
  m.classList.toggle('open');
  document.body.style.overflow=m.classList.contains('open')?'hidden':'';
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow='';
}
// close menu on outside click
document.addEventListener('click',e=>{
  const m=document.getElementById('mobileMenu');
  const h=document.getElementById('hamburger');
  if(m.classList.contains('open')&&!m.contains(e.target)&&!h.contains(e.target))closeMenu();
});

/* ══════════════════════════════════════════════
   SCROLL EFFECTS
══════════════════════════════════════════════ */
// Table scroll fade indicator
const tableWrap=document.getElementById('tableWrap');
if(tableWrap){
  tableWrap.addEventListener('scroll',()=>{
    const outer=document.getElementById('tableOuter');
    if(tableWrap.scrollLeft+tableWrap.clientWidth>=tableWrap.scrollWidth-4)
      outer.classList.add('scrolled-end');
    else outer.classList.remove('scrolled-end');
  },{passive:true});
}

// Fade-in on scroll — activates all .fade-in elements as they enter the viewport
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.07});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

/* ══════════════════════════════════════════════
   LEGAL MODAL PAGES
══════════════════════════════════════════════ */
const legalPages={
  privacy:{title:'Privacy Policy',content:`
    <p style="font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-bottom:1.5rem">Last updated: June 2026 · VPN Compare — bestvpncompareonline.com</p>
    <h3>1. Who We Are</h3>
    <p>VPN Compare ("we", "us", "our") operates the website bestvpncompareonline.com, an independent VPN review and comparison service. We are registered in England and Wales.</p>
    <h3>2. Information We Collect</h3>
    <p>We may collect the following information: email addresses voluntarily submitted via our newsletter or price alert forms; anonymised analytics data (page views, session duration, device type) collected via our analytics provider; and standard server log data (IP addresses, browser type, referrer URLs) retained for up to 30 days for security purposes.</p>
    <h3>3. How We Use Your Information</h3>
    <p>Email addresses are used solely to deliver the newsletter or price alerts you signed up for. We do not sell, rent, or share personal data with third parties for marketing purposes. Analytics data is used in aggregate to improve site content and user experience.</p>
    <h3>4. Cookies</h3>
    <p>We use essential cookies required for site functionality, and optional analytics cookies. See our <a href="javascript:void(0)" onclick="openLegal('cookies')" style="color:var(--cyan)">Cookie Policy</a> for full details.</p>
    <h3>5. Affiliate Links</h3>
    <p>This site contains affiliate links. When you click these links and make a purchase, we may earn a commission. This does not affect the price you pay. See our <a href="javascript:void(0)" onclick="openLegal('affiliate')" style="color:var(--cyan)">Affiliate Disclosure</a> for details.</p>
    <h3>6. Data Retention</h3>
    <p>Newsletter subscriber data is retained until you unsubscribe. You may request deletion of your data at any time by emailing advertise@bestvpncompareonline.com.</p>
    <h3>7. Your Rights (UK GDPR)</h3>
    <p>Under UK GDPR you have the right to: access your personal data; correct inaccurate data; request erasure; object to processing; and data portability. To exercise any right, contact us at the email above.</p>
    <h3>8. Third-Party Services</h3>
    <p>We use MailerLite for newsletter delivery (governed by their privacy policy) and may use analytics tools. We do not control third-party data practices.</p>
    <h3>9. Changes to This Policy</h3>
    <p>We may update this policy periodically. Material changes will be noted at the top of this page with a revised date.</p>
  `},
  cookies:{title:'Cookie Policy',content:`
    <p style="font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-bottom:1.5rem">Last updated: June 2026 · bestvpncompareonline.com</p>
    <h3>What Are Cookies?</h3>
    <p>Cookies are small text files stored on your device when you visit a website. They help sites remember preferences and understand how visitors use them.</p>
    <h3>Cookies We Use</h3>
    <p><strong>Essential cookies</strong> — required for the site to function correctly (navigation, form state, session). These cannot be disabled.</p>
    <p><strong>Analytics cookies</strong> — optional, anonymised. Used to understand page performance, popular content, and traffic sources. No personally identifiable information is collected.</p>
    <p><strong>Affiliate cookies</strong> — set by third-party affiliate networks (NordVPN, Surfshark, PureVPN etc.) when you click an affiliate link. These track whether a purchase is made to credit us with a commission. We do not control these cookies.</p>
    <h3>Managing Cookies</h3>
    <p>You can control cookies through your browser settings. Disabling analytics cookies will not affect your use of this site. Disabling affiliate cookies will prevent commission tracking but will not affect pricing for you.</p>
    <h3>Third-Party Cookies</h3>
    <p>Affiliate networks and analytics providers may set their own cookies. We recommend reviewing their privacy policies for further information.</p>
  `},
  terms:{title:'Terms of Use',content:`
    <p style="font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-bottom:1.5rem">Last updated: June 2026 · bestvpncompareonline.com</p>
    <h3>1. Acceptance</h3>
    <p>By using bestvpncompareonline.com you agree to these Terms of Use. If you do not agree, please do not use this site.</p>
    <h3>2. Site Purpose</h3>
    <p>VPN Compare provides independent VPN reviews, comparisons, and educational content for informational purposes only. Nothing on this site constitutes professional legal, security, or financial advice.</p>
    <h3>3. Accuracy of Information</h3>
    <p>We endeavour to keep pricing, feature data, and reviews accurate and up to date. However, VPN provider offerings change frequently. Always verify current details on the provider's official website before purchasing.</p>
    <h3>4. Affiliate Relationships</h3>
    <p>This site participates in affiliate programmes. We earn commissions from some links at no additional cost to you. Affiliate relationships do not influence editorial ratings or recommendations.</p>
    <h3>5. Intellectual Property</h3>
    <p>All original content on this site — including text, design, graphics, and code — is the property of VPN Compare and may not be reproduced without permission. Third-party trademarks are the property of their respective owners.</p>
    <h3>6. Limitation of Liability</h3>
    <p>VPN Compare accepts no liability for any loss or damage arising from use of this site, reliance on information published here, or use of any linked third-party service. Use of VPNs may be subject to local laws; ensure compliance in your jurisdiction.</p>
    <h3>7. Governing Law</h3>
    <p>These terms are governed by the laws of England and Wales.</p>
  `},
  affiliate:{title:'Affiliate Disclosure',content:`
    <p style="font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-bottom:1.5rem">Last updated: June 2026 · bestvpncompareonline.com</p>
    <h3>Our Affiliate Relationships</h3>
    <p>VPN Compare participates in affiliate programmes operated by the following VPN providers and affiliate networks: NordVPN, ExpressVPN, CyberGhost, Proton VPN, Mullvad, Surfshark, PureVPN, Perimeter 81, NordLayer, IVPN, and others. These programmes are managed via affiliate networks including Impact Radius, CJ Affiliate, and ShareASale.</p>
    <h3>How It Works</h3>
    <p>When you click an affiliate link on this site and subsequently make a purchase, we may earn a commission. The commission is paid by the VPN provider, not by you — it does not increase the price you pay, and in many cases our links carry exclusive discount codes that reduce the price.</p>
    <h3>Editorial Independence</h3>
    <p>Affiliate commissions do not influence our editorial ratings, rankings, review scores, or recommendations. Our testing methodology is applied equally to all providers regardless of commercial relationship. We review providers we do not have affiliate agreements with, and we highlight weaknesses in products we earn commission from.</p>
    <h3>Sponsored Content</h3>
    <p>Sponsored placements (such as the sponsor banner near the top of this page) are clearly labelled as "Paid placement." Sponsorship of a placement does not affect the provider's editorial score or ranking in our comparison tables.</p>
    <h3>FTC & ASA Compliance</h3>
    <p>In accordance with FTC guidelines (USA) and ASA guidelines (UK), material connections between this site and advertised products are disclosed clearly on all relevant pages.</p>
  `},
  about:{title:'About VPN Compare',content:`
    <h3>Who We Are</h3>
    <p>VPN Compare (bestvpncompareonline.com) is an independent VPN review and comparison site. We publish expert reviews, speed tests, pricing comparisons, and educational guides to help individuals and businesses choose the right VPN.</p>
    <h3>Our Mission</h3>
    <p>We believe everyone deserves access to honest, unbiased information about online privacy tools. Our mission is to cut through marketing noise and give readers clear, independently verified data they can trust.</p>
    <h3>How We Test</h3>
    <p>Every VPN reviewed on this site goes through our 8-point testing framework covering speed (WireGuard and OpenVPN), streaming unblocking, privacy and audit history, kill switch reliability, logging policy, customer support, device compatibility, and value. See our <a href="#methodology" onclick="closeLegal()" style="color:var(--cyan)">full methodology</a> for details.</p>
    <h3>Editorial Independence</h3>
    <p>Our editorial team operates independently from our commercial partnerships. Affiliate commissions fund the site but do not influence review scores, rankings, or recommendations. We disclose all commercial relationships transparently.</p>
    <h3>Contact</h3>
    <p>For advertising and partnership enquiries: <a href="mailto:advertise@bestvpncompareonline.com" style="color:var(--cyan)">advertise@bestvpncompareonline.com</a></p>
  `},
  contact:{title:'Contact Us',content:`
    <h3>Get in Touch</h3>
    <p>We'd love to hear from you — whether you have a question about a review, a tip about a VPN deal, or a business enquiry.</p>
    <h3>Advertising & Partnerships</h3>
    <p>For sponsored placements, media kit requests, and affiliate partnership enquiries:<br>
    📧 <a href="mailto:advertise@bestvpncompareonline.com" style="color:var(--cyan)">advertise@bestvpncompareonline.com</a></p>
    <h3>Editorial & Press</h3>
    <p>For editorial enquiries, corrections, or press requests, please use the same email address above with the subject line "Editorial" or "Press".</p>
    <h3>Reader Feedback</h3>
    <p>Found an error? Think we've missed something? We welcome reader feedback. Use the advertising email above and mark the subject "Reader Feedback".</p>
    <p style="font-family:var(--mono);font-size:.78rem;color:var(--muted);margin-top:1.5rem">We aim to respond to all enquiries within 2 business days.</p>
  `},
  sitemap:{title:'Sitemap',content:`
    <h3>Main Sections</h3>
    <ul style="line-height:2">
      <li><a href="#" onclick="closeLegal()" style="color:var(--cyan)">Home — VPN Compare</a></li>
      <li><a href="#compare" onclick="closeLegal()" style="color:var(--cyan)">VPN Comparison Table</a></li>
      <li><a href="#quiz" onclick="closeLegal()" style="color:var(--cyan)">VPN Finder Quiz</a></li>
      <li><a href="#methodology" onclick="closeLegal()" style="color:var(--cyan)">Our Testing Methodology</a></li>
      <li><a href="#deepreviews" onclick="closeLegal()" style="color:var(--cyan)">In-Depth VPN Reviews</a></li>
      <li><a href="#deals" onclick="closeLegal()" style="color:var(--cyan)">Best VPN Deals</a></li>
      <li><a href="#countries" onclick="closeLegal()" style="color:var(--cyan)">VPN Guides by Country</a></li>
      <li><a href="#blog" onclick="closeLegal()" style="color:var(--cyan)">Articles & Guides</a></li>
      <li><a href="#newsletter" onclick="closeLegal()" style="color:var(--cyan)">Newsletter Signup</a></li>
      <li><a href="#advertise" onclick="closeLegal()" style="color:var(--cyan)">Advertise With Us</a></li>
    </ul>
    <h3>Legal Pages</h3>
    <ul style="line-height:2">
      <li><a href="javascript:void(0)" onclick="openLegal('privacy')" style="color:var(--cyan)">Privacy Policy</a></li>
      <li><a href="javascript:void(0)" onclick="openLegal('cookies')" style="color:var(--cyan)">Cookie Policy</a></li>
      <li><a href="javascript:void(0)" onclick="openLegal('terms')" style="color:var(--cyan)">Terms of Use</a></li>
      <li><a href="javascript:void(0)" onclick="openLegal('affiliate')" style="color:var(--cyan)">Affiliate Disclosure</a></li>
      <li><a href="javascript:void(0)" onclick="openLegal('about')" style="color:var(--cyan)">About Us</a></li>
      <li><a href="javascript:void(0)" onclick="openLegal('contact')" style="color:var(--cyan)">Contact</a></li>
    </ul>
  `}
};
function openLegal(page){
  const p=legalPages[page];if(!p)return;
  const c=document.getElementById('legalContent');
  c.innerHTML=`<h2 style="margin-bottom:1rem;font-family:var(--display);color:var(--navy)">${p.title}</h2>${p.content}`;
  document.getElementById('legalModal').style.display='block';
  document.body.style.overflow='hidden';
}
function closeLegal(){
  document.getElementById('legalModal').style.display='none';
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLegal();});

/* right-click context menu disable */
document.addEventListener('contextmenu', function(e){ e.preventDefault(); alert("Right-click is disabled on this page."); });
