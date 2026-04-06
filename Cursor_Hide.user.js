// ==UserScript==
// @name         Pornhub Auto-Hide Cursor for Fullscreen Video Player
// @namespace    https://github.com/danmaclann
// @license      MIT
// @version      1.0
// @description  Hides mouse pointer after 2 seconds of inactivity when the Pornhub video player is in fullscreen and controls are hidden.
// @author       You
// @match        *://*.pornhub.com/view_video.php?viewkey=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let hideTimeout;

    // Inject a CSS style to aggressively hide the cursor
    const style = document.createElement('style');
    style.innerHTML = `
        .force-hide-cursor, .force-hide-cursor * {
            cursor: none !important;
        }
    `;
    document.head.appendChild(style);

    function checkStateAndHide() {
        // Find the specific player container using its primary class
        const player = document.querySelector('.playerFlvContainer');

        // Check if the player exists and is currently in the requested state
        // 'mgp_fullscreen' and 'mgp_hideControls' indicate the target state
        if (player &&
            player.classList.contains('mgp_fullscreen') &&
            player.classList.contains('mgp_hideControls')) {
            document.body.classList.add('force-hide-cursor');
        }
    }

    function resetTimer() {
        // Immediately show the cursor on any mouse movement
        document.body.classList.remove('force-hide-cursor');

        // Clear the previous 2-second timer
        clearTimeout(hideTimeout);

        // Set a new timer to hide the cursor after 2000 milliseconds (2 seconds)
        hideTimeout = setTimeout(checkStateAndHide, 2000);
    }

    // Attach the mouse movement listener to the entire document
    document.addEventListener('mousemove', resetTimer);

    // Initialize the timer as soon as the script loads
    resetTimer();
})();
