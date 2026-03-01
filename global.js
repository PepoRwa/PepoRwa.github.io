/**
 * GOWRAX - Global System Injector V5.2
 * Version "Ghost Design" : Avec décalage dynamique pour le Roster
 */

(function() {
    const LOGO_URL = "https://gowrax.me/assets/img/logo-team-esport.png";
    const GA_MEASUREMENT_ID = "G-PECF9PMWRC"; 

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

    // --- 4. LIEN LÉGAL DISCRET (GHOST LINK) AVEC DÉCALAGE PC UNIQUEMENT ---
        const injectGhostLink = () => {
            const link = document.createElement('a');
            link.href = "/privacy.html";
            
            // --- LOGIQUE DYNAMIQUE ---
            const isRosterPage = window.location.pathname.includes('/roster/');
            const isDesktop = window.innerWidth > 768; // On définit le PC au dessus de 768px
            
            // On applique les 60px SEULEMENT si (Page Roster ET Desktop)
            const bottomPosition = (isRosterPage && isDesktop) ? "60px" : "15px"; 

            link.style.cssText = `
                position: fixed; 
                bottom: ${bottomPosition}; 
                left: 15px; 
                z-index: 100;
                font-family: 'Share Tech Mono', monospace; 
                font-size: 8px;
                color: #333; 
                text-decoration: none; 
                text-transform: uppercase;
                letter-spacing: 2px; 
                transition: 0.3s;
            `;

            link.onmouseover = () => { link.style.color = "#D62F7F"; };
            link.onmouseout = () => { link.style.color = "#333"; };
            link.innerText = "© 2026 GOWRAX // LEGAL_FILE";
            document.body.appendChild(link);
        };

    const enforceSecurity = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
    };

    // --- BOOT ---
    injectIcons();
    enforceSecurity();
    injectAnalytics();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectCookieHUD();
            injectGhostLink();
        });
    } else {
        injectCookieHUD();
        injectGhostLink();
    }
})();