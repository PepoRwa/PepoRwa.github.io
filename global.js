/**
 * GOWRAX - Global System Injector V4.0
 * Centralisation du Favicon, Analytics GA4 et Sécurité Tactique
 */

(function() {
    // --- 1. CONFIGURATION ---
    const LOGO_URL = "https://gowrax.me/assets/img/logo-team-esport.png";
    const GA_MEASUREMENT_ID = "G-PECF9PMWRC"; 

    // --- 2. INJECTION DES ICÔNES (Favicon & Apple) ---
    const injectIcons = () => {
        // Favicon standard
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = LOGO_URL;
        document.head.appendChild(favicon);

        // Icône Apple (iPhone Home Screen)
        const appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon';
        appleIcon.href = LOGO_URL;
        document.head.appendChild(appleIcon);
        
        console.log("GRX_SYSTEM: Protocoles Visuels Injectés.");
    };

    // --- 3. INJECTION GOOGLE ANALYTICS (GA4) ---
    const injectAnalytics = () => {
        if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
            console.warn("GRX_ANALYTICS: ID de mesure non configuré. Liaison satellite en attente.");
            return;
        }

        // Chargement de la bibliothèque gtag.js
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);

        // Initialisation de la configuration
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag; // Rend gtag accessible globalement si besoin
        
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);

        console.log(`GRX_ANALYTICS: Liaison établie [${GA_MEASUREMENT_ID}].`);
    };

    // --- 4. SÉCURITÉ TACTIQUE (Anti-Clic Droit) ---
    // Désactive le clic droit pour renforcer l'immersion "Base de données sécurisée"
    const enforceSecurity = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
        console.log("GRX_SECURITY: Chiffrement de l'interface actif.");
    };

    // --- EXECUTION ---
    injectIcons();
    injectAnalytics();
    enforceSecurity();

    console.log("GOWRAX_GLOBAL: Système Opérationnel.");
})();