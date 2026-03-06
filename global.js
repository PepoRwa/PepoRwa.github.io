/**
 * GOWRAX - Global System Injector V7.0
 * --------------------------------------------------
 * NOUVEAU : Auto-Injection de la Navigation Dynamique !
 * INCLUS : Cookies (HUD), Ghost Link, Supabase Auto-load, Broadcast
 * --------------------------------------------------
 */

(function() {
    // --- 1. CONFIGURATION ET PARAMÈTRES RÉSEAU ---
    const LOGO_URL = "https://gowrax.me/assets/img/logo-team-esport.png";
    const GA_MEASUREMENT_ID = "G-PECF9PMWRC"; 

    const initGowrax = async () => {
        if (typeof supabase === 'undefined') {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }
        window.SUPABASE_URL = "https://nvtcjaallxoweujbyhng.supabase.co";
        window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dGNqYWFsbHhvd2V1amJ5aG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NDc4OTEsImV4cCI6MjA4NzQyMzg5MX0.a0FkgYwG3yxu0GMXA6wV-6GqFamB9Pu-E57_z6KkHik";
        window._supabaseGlobal = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);

        checkAndInjectBroadcast();
    };

    // --- 2. LE MOTEUR DE NAVIGATION DYNAMIQUE (V7.0) ---
    const injectNavigation = () => {
        const path = window.location.pathname;

        // 🛡️ EXCEPTION MAJEURE : On ne touche pas à la page CEO !
        if (path.includes('/ceo')) return;

        // 1. Détermination du Titre (Logo)
        let suffix = "HQ";
        if (path.includes('/news/post.html')) suffix = "REPORT";
        else if (path.includes('/news')) suffix = "ARCHIVES";
        else if (path.includes('/staff')) suffix = "PERSONNEL";
        else if (path.includes('/profiles/member.html')) suffix = "FILE";
        else if (path.includes('/profiles')) suffix = "DATABASE";
        else if (path.includes('/roster/fortnite')) suffix = "UNIT";
        else if (path.includes('/roster/rl')) suffix = "SOCAR";
        else if (path.includes('/roster/valorant')) suffix = "VALORANT";
        else if (path.includes('/roster/cs2')) suffix = "TACTICAL";
        else if (path.includes('/roster/calendar')) suffix = "SCHEDULE";
        else if (path.includes('/roster')) suffix = "UNITS";
        else if (path.includes('join')) suffix = "RECRUIT";
        else if (path.includes('/contact')) suffix = "SIGNAL";
        else if (path.includes('/partners')) suffix = "NETWORK";
        else if (path.includes('/about')) suffix = "INFO";

        // 2. Détermination de la page active (Le lien souligné)
        const isHome = path === '/' || path === '/index.html';
        
        const getNavClass = (target) => {
            const activeClass = "text-magenta underline underline-offset-8 decoration-2";
            if (target === '/') return isHome ? activeClass : 'nav-link';
            if (target === '/roster') return (path.includes('/roster') && !path.includes('calendar')) ? activeClass : 'nav-link';
            return path.includes(target) ? activeClass : 'nav-link';
        };

        // 3. Construction du Header HTML
        const headerHTML = `
        <header class="relative z-[100] p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-xl bg-black/40">
            <div class="flex items-center gap-4">
                <div class="w-8 h-8 border border-magenta rotate-45 flex items-center justify-center">
                    <div class="w-4 h-4 bg-magenta animate-pulse rotate-[-45deg]"></div>
                </div>
                <div class="font-rajdhani font-bold text-2xl text-white tracking-tighter uppercase leading-none" style="font-family: 'Rajdhani', sans-serif;">
                    GOWRAX<span class="text-magenta italic">_${suffix}</span>
                </div>
            </div>
            
            <nav class="hidden lg:flex space-x-10 text-[10px] font-bold tracking-[0.4em]" style="font-family: 'Share Tech Mono', monospace;">
                <a href="/about/index.html" class="${getNavClass('/about')}">ABOUT</a>
                <a href="/" class="${getNavClass('/')}">INDEX</a>
                <a href="/news/index.html" class="${getNavClass('/news')}">NEWS</a>
                <a href="/staff/index.html" class="${getNavClass('/staff')}">STAFF</a>
                <a href="/ceo/index.html" class="nav-link">COMMAND</a>
                <a href="/profiles/index.html" class="${getNavClass('/profiles')}">DATABASE</a>
                <a href="/roster/index.html" class="${getNavClass('/roster')}">UNITS</a>
                <a href="/roster/calendar.html" class="${getNavClass('/calendar')}">CALENDRIER</a>
                <a href="/partners/index.html" class="${getNavClass('/partners')} text-[#D4AF37]">PARTNERS</a>
                <a href="/contact/index.html" class="${getNavClass('/contact')}">SIGNAL</a>
            </nav>

            <div class="flex items-center gap-6">
                ${isHome ? `
                <div class="hidden md:block text-right">
                    <div class="text-[8px] text-magenta font-mono uppercase tracking-widest" style="font-family: 'Share Tech Mono', monospace;">Security_Level</div>
                    <div class="text-[10px] font-bold font-mono" style="font-family: 'Share Tech Mono', monospace;">BETA_CLEARANCE</div>
                </div>` : ''}
                
                <button onclick="window.toggleGlobalNav(true)" class="lg:hidden text-magenta border border-magenta/40 p-2 hover:bg-magenta hover:text-white transition-all z-[110] pointer-events-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </header>

        <div id="global-mobile-nav" class="fixed inset-0 z-[999999] p-12 flex flex-col justify-center items-center space-y-8 opacity-0 pointer-events-none transition-all duration-500" style="display: none; background: rgba(2, 2, 5, 0.98); backdrop-filter: blur(20px);">
            <button onclick="window.toggleGlobalNav(false)" class="absolute top-10 right-10 text-magenta text-sm border border-magenta/40 px-6 py-2 uppercase pointer-events-auto" style="font-family: 'Share Tech Mono', monospace;">Close_X</button>
            <a href="/about/index.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">ABOUT</a>
            <a href="/" class="text-4xl font-bold text-magenta italic pointer-events-auto" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">INDEX</a>
            <a href="/news/index.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">NEWS</a>
            <a href="/staff/index.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">STAFF</a>
            <a href="/ceo/index.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">COMMAND</a>
            <a href="/profiles/index.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">DATABASE</a>
            <a href="/roster/index.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">ROSTERS</a>
            <a href="/roster/calendar.html" class="text-2xl tracking-widest pointer-events-auto text-white" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">CALENDRIER</a>
            <a href="/partners/index.html" class="text-2xl tracking-widest pointer-events-auto text-[#D4AF37]" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">PARTNERS</a>
            <a href="/contact/index.html" class="text-2xl tracking-widest border border-magenta/40 px-10 py-3 text-magenta pointer-events-auto" style="font-family: 'Rajdhani', sans-serif;" onclick="window.toggleGlobalNav(false)">SIGNAL</a>
            
        </div>
        `;

        // 4. Injection dans le DOM (Juste après l'ouverture du <body>)
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    };

    // Logique globale du menu mobile
    window.toggleGlobalNav = function(state) { 
        const nav = document.getElementById('global-mobile-nav');
        if(state) {
            nav.style.display = 'flex';
            setTimeout(() => { nav.style.opacity = '1'; nav.style.pointerEvents = 'auto'; }, 10);
            document.body.style.overflow = 'hidden';
        } else {
            nav.style.opacity = '0'; nav.style.pointerEvents = 'none';
            setTimeout(() => { nav.style.display = 'none'; }, 500);
            document.body.style.overflow = 'auto';
        }
    };


    // --- 3. MODULES VISUELS (ICONS, GA, COOKIES, GHOST LINK) ---
    const injectIcons = () => {
        try {
            const favicon = document.createElement('link');
            favicon.rel = 'icon'; favicon.type = 'image/png'; favicon.href = LOGO_URL;
            document.head.appendChild(favicon);
            const appleIcon = document.createElement('link');
            appleIcon.rel = 'apple-touch-icon'; appleIcon.href = LOGO_URL;
            document.head.appendChild(appleIcon);
        } catch (e) {}
    };

    const injectAnalytics = () => {
        if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes('XXX')) return;
        try {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){ dataLayer.push(arguments); };
            gtag('js', new Date()); gtag('config', GA_MEASUREMENT_ID);
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(gaScript);
        } catch (e) {}
    };

    const injectCookieHUD = () => {
        if (localStorage.getItem('grx_cookies_accepted')) return;
        const hud = document.createElement('div');
        hud.id = "grx-cookie-alert";
        hud.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; z-index: 10000;
            background: rgba(2, 2, 5, 0.9); border: 1px solid #D62F7F;
            padding: 12px; font-family: 'Share Tech Mono', monospace;
            width: 260px; box-shadow: 0 0 20px rgba(214, 47, 127, 0.2);
            transition: 0.5s; backdrop-filter: blur(10px);
        `;
        hud.innerHTML = `
            <div style="font-size: 8px; color: #D62F7F; letter-spacing: 2px; margin-bottom: 5px;">[ SYS_MAINTENANCE ]</div>
            <div style="font-size: 10px; color: #ccc; margin-bottom: 10px; line-height: 1.3;">
                Liaison optimisée via cookies techniques uniquement.
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="btn-accept-grx" style="flex: 1; background: #D62F7F; color: #fff; border: none; font-size: 9px; padding: 5px; cursor: pointer; text-transform: uppercase;">Accepter</button>
                <a href="/privacy.html" style="flex: 1; border: 1px solid #333; color: #666; font-size: 8px; text-decoration: none; display: flex; align-items: center; justify-content: center; text-transform: uppercase;">Infos</a>
            </div>
        `;
        document.body.appendChild(hud);
        document.getElementById('btn-accept-grx').onclick = () => {
            localStorage.setItem('grx_cookies_accepted', 'true');
            hud.style.opacity = '0';
            hud.style.transform = 'translateX(20px)';
            setTimeout(() => hud.remove(), 500);
        };
    };

    const injectGhostLink = () => {
        const link = document.createElement('a');
        link.href = "/privacy.html";
        const isRosterPage = window.location.pathname.includes('/roster/');
        const isDesktop = window.innerWidth > 768; 
        const bottomPosition = (isRosterPage && isDesktop) ? "60px" : "15px"; 
        link.style.cssText = `position: fixed; bottom: ${bottomPosition}; left: 15px; z-index: 100; font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #333; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s;`;
        link.onmouseover = () => { link.style.color = "#D62F7F"; };
        link.onmouseout = () => { link.style.color = "#333"; };
        link.innerText = "© 2026 GOWRAX // LEGAL_FILE";
        document.body.appendChild(link);
    };

    // --- 4. MODULE SMART BROADCAST ---
    const checkAndInjectBroadcast = async () => {
        try {
            const { data: notif, error } = await window._supabaseGlobal
                .from('notifications')
                .select('*')
                .eq('is_active', true)
                .limit(1)
                .maybeSingle();

            if (error || !notif) return;

            const savedVersion = localStorage.getItem('grx_popup_status');
            if (savedVersion === notif.version_tag) return;

            const currentPath = window.location.pathname;
            if (notif.target_page !== 'ALL' && !currentPath.includes(notif.target_page)) return;

            const formattedContent = notif.content.replace(/\n/g, '<br/>');

            let buttonHTML = '';
            if (notif.button_text && notif.button_link) {
                buttonHTML = `
                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                    <a href="${notif.button_link}" target="_blank" style="display:block; width:100%; text-align:center; background:rgba(214,47,127,0.1); border:1px solid #D62F7F; color:white; padding:12px; font-size:12px; font-weight:bold; font-family:'Rajdhani', sans-serif; text-transform:uppercase; letter-spacing:0.2em; text-decoration:none; transition:0.3s;">
                        >> ${notif.button_text} <<
                    </a>
                </div>`;
            }

            const overlay = document.createElement('div');
            overlay.id = "grx-dynamic-broadcast";
            overlay.style.cssText = `position:fixed; inset:0; z-index:15000; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.9); backdrop-filter:blur(10px); opacity:0; transition:opacity 0.7s;`;
            
            overlay.innerHTML = `
                <div style="max-width:600px; width:90%; background:#050508; border-top:2px solid #D62F7F; padding:40px; box-shadow:0 30px 100px rgba(214,47,127,0.3); position:relative; color:white;">
                    <button id="broadcast-ignore" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#666; font-family:'Share Tech Mono', monospace; font-size:10px; text-transform:uppercase; letter-spacing:2px; cursor:pointer;">X Ignorer</button>
                    <div style="font-size:10px; font-family:'Share Tech Mono', monospace; color:#D62F7F; margin-bottom:20px; letter-spacing:0.5em; text-transform:uppercase; font-style:italic;">Priority_Transmission</div>
                    <h3 style="font-size:28px; font-family:'Rajdhani', sans-serif; font-weight:bold; line-height:1.2; text-transform:uppercase; font-style:italic; margin-bottom:20px;">${notif.title}</h3>
                    <div style="font-size:14px; color:#aaa; font-family:'Montserrat', sans-serif; line-height:1.6; margin-bottom:20px;">${formattedContent}</div>
                    ${buttonHTML}
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="https://cdn.discordapp.com/avatars/733320797245931520/f034acc53b801d76ec0ced158870811c.png?size=1024" style="width:24px; height:24px; " alt="CEO">
                            <div style="font-family:'Share Tech Mono', monospace;">
                                <span style="display:block; font-size:12px; color:#D62F7F; font-weight:bold; text-transform:uppercase;">Crazzynel</span>
                                <span style="display:block; font-size:9px; color:#666; text-transform:uppercase; font-style:italic;">Commanding Officer</span>
                            </div>
                        </div>
                        <button id="broadcast-read" style="background:#D62F7F; color:white; border:none; padding:10px 20px; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:0.2em; cursor:pointer; font-family:'Share Tech Mono', monospace;">Marquer comme lu</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
            setTimeout(() => { overlay.style.opacity = '1'; }, 100);

            document.getElementById('broadcast-ignore').onclick = () => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 700);
            };

            document.getElementById('broadcast-read').onclick = () => {
                localStorage.setItem('grx_popup_status', notif.version_tag);
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 700);
            };

        } catch (err) {
            console.error("GOWRAX OS: Broadcast Failed", err);
        }
    };

    // --- 5. SÉCURITÉ ---
    const enforceSecurity = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
    };

    // --- 6. BOOT SEQUENCE ---
    const bootSequence = () => {
        injectNavigation(); // Injection du nouveau menu en tout premier !
        injectIcons();
        enforceSecurity();
        injectAnalytics();
        injectCookieHUD();
        injectGhostLink();
        initGowrax();      
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootSequence);
    } else {
        bootSequence();
    }
})();