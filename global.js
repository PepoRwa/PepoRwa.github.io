/**
 * GOWRAX - Global System Injector V4.5 (Resilient Edition)
 * Centralisation du Favicon, Analytics GA4 et Sécurité Tactique
 * Correction pour compatibilité Safari & Adblocks
 */

(function() {
    // --- 1. CONFIGURATION ---
    const LOGO_URL = "https://gowrax.me/assets/img/logo-team-esport.png";
    const GA_MEASUREMENT_ID = "G-PECF9PMWRC"; 

    // --- 2. INJECTION DES ICÔNES (Favicon & Apple) ---
    const injectIcons = () => {
        try {
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
        } catch (e) {
            console.warn("GRX_SYSTEM: Échec mineur lors de l'injection visuelle.");
        }
    };

    // --- 3. INJECTION GOOGLE ANALYTICS (GA4) - MODE RÉSILIENT ---
    const injectAnalytics = () => {
        // Sécurité si l'ID n'est pas rempli
        if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX" || !GA_MEASUREMENT_ID) return;

        try {
            // Initialisation locale de la fonction gtag (même si le script externe est bloqué)
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){ dataLayer.push(arguments); };
            
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID);

            // Création de la balise script externe
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            
            // Si le script externe échoue (Adblock/Safari), on prévient proprement
            gaScript.onerror = () => {
                console.warn("GRX_ANALYTICS: Liaison satellite bloquée (Adblock détecté). Mode furtif activé.");
            };

            document.head.appendChild(gaScript);
            console.log(`GRX_ANALYTICS: Tentative d'établissement [${GA_MEASUREMENT_ID}].`);
            
        } catch (e) {
            // Capture l'erreur pour éviter d'arrêter l'exécution du reste du global.js
            console.error("GRX_ANALYTICS: Protocole de tracking interrompu par le navigateur.");
        }
    };

    // --- 4. SÉCURITÉ TACTIQUE (Anti-Clic Droit) ---
    const enforceSecurity = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
        console.log("GRX_SECURITY: Chiffrement de l'interface actif.");
    };

    // --- EXECUTION DES PROTOCOLES ---
    // On lance les icônes en premier car c'est le plus important pour le branding
    injectIcons();
    
    // On lance la sécurité
    enforceSecurity();

    // On termine par l'Analytics (le plus susceptible d'être bloqué)
    injectAnalytics();

    console.log("GOWRAX_GLOBAL: Système Opérationnel.");
})();