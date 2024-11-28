/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline JS may contain jQuery which is licensed under MIT
 */
(function() {
    'use strict';
    
    function init() {
        // Initialize all nav components on the page
        document.querySelectorAll('.w-nav').forEach(initNavbar);
    }

    function initNavbar(navbar) {
        if (!navbar) return;

        var menuButton = navbar.querySelector('.w-nav-button');
        var menuList = navbar.querySelector('.w-nav-menu');
        var isMenuOpen = false;

        // Handle menu button click
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navbar.contains(e.target)) {
                closeMenu();
            }
        });

        function toggleMenu() {
            isMenuOpen ? closeMenu() : openMenu();
        }

        function openMenu() {
            if (isMenuOpen) return;
            isMenuOpen = true;
            
            menuButton.classList.add('w--open');
            menuList.classList.add('w--open');
            menuButton.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            if (!isMenuOpen) return;
            isMenuOpen = false;
            
            menuButton.classList.remove('w--open');
            menuList.classList.remove('w--open');
            menuButton.setAttribute('aria-expanded', 'false');
        }

        // Handle window resize
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991 && isMenuOpen) {
                    closeMenu();
                }
            }, 100);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
