/**
 * GOWRAX - Global System Injector V6.3
 * --------------------------------------------------
 * INCLUS : 
 * - Auto-chargement asynchrone Supabase (Indépendance totale)
 * - Gestion RGPD : HUD de consentement des Cookies
 * - Sécurité : Désactivation du clic droit
 * - UX : Système de Broadcast dynamique (Pop-ups ciblés via DB)
 * - Legal : Ghost Link dynamique (Adaptation Roster/Desktop)
 * --------------------------------------------------
 */

(function() {
    // --- 1. CONFIGURATION ET PARAMÈTRES RÉSEAU ---
    const LOGO_URL = "https://gowrax.me/assets/img/logo-team-esport.png";
    const GA_MEASUREMENT_ID = "G-PECF9PMWRC"; 

    /**
     * Initialisation du noyau Supabase
     * Gère le chargement de la librairie et l'établissement de la liaison DB
     */
    const initGowrax = async () => {
        // Chargement dynamique de la librairie Supabase si elle n'est pas détectée
        if (typeof supabase === 'undefined') {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        // Configuration de la liaison vers le cluster Supabase
        window.SUPABASE_URL = "https://nvtcjaallxoweujbyhng.supabase.co";
        window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dGNqYWFsbHhvd2V1amJ5aG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NDc4OTEsImV4cCI6MjA4NzQyMzg5MX0.a0FkgYwG3yxu0GMXA6wV-6GqFamB9Pu-E57_z6KkHik";
        
        // Initialisation du client global pour les requêtes asynchrones
        window._supabaseGlobal = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);

        // Activation du protocole de communication Broadcast
        checkAndInjectBroadcast();
    };

    // --- 2. MODULES D'INJECTION VISUELLE ET ANALYTIQUE ---

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

    /**
     * MODULE RGPD : Injecte l'alerte de consentement des cookies
     * Nécessaire pour la conformité légale et le suivi analytique
     */
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

    /**
     * MODULE LEGAL : Ghost Link (Mentions Légales)
     * S'adapte dynamiquement pour ne pas gêner l'UI du Roster sur Desktop
     */
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

    // --- 3. MODULE SMART BROADCAST (NOTIFICATIONS) ---

    const checkAndInjectBroadcast = async () => {
        try {
            const { data: notif, error } = await window._supabaseGlobal
                .from('notifications')
                .select('*')
                .eq('is_active', true)
                .limit(1)
                .single();

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
                            <img src="${LOGO_URL}" style="width:24px; height:24px; filter: grayscale(100%) brightness(200%);" alt="CEO">
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

    // --- 4. SÉCURITÉ ---
    const enforceSecurity = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
    };

    // --- 5. INITIALISATION DU SYSTÈME (BOOT SEQUENCE) ---
    const bootSequence = () => {
        injectIcons();
        enforceSecurity();
        injectAnalytics();
        injectCookieHUD(); // Restitution de la conformité Cookies
        injectGhostLink();
        initGowrax();      // Liaison DB et Broadcast
    };

    // Lancement du boot en fonction de l'état du document
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootSequence);
    } else {
        bootSequence();
    }
})();