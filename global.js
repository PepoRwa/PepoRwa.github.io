/**
 * GOWRAX - Global System Injector
 * Centralisation du Favicon et des paramètres de base
 */

(function() {
    // 1. URL de ton logo (Remplace par ton lien Supabase)
    const LOGO_URL = "https://gowrax.me/assets/img/logo-team-esport.png";

    // 2. Injection du Favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = LOGO_URL;
    document.head.appendChild(favicon);

    // 3. Injection pour Apple (Icône écran d'accueil iPhone)
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = LOGO_URL;
    document.head.appendChild(appleIcon);

    console.log("GRX_SYSTEM: Favicon injecté avec succès.");
})();