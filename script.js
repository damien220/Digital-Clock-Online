function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    const currentTimeString = `${hours}:${minutes}:${seconds}`;
    const previousTimeString = clockElement.dataset.previousTime || '00:00:00'; // Store previous time on the clock element
    clockElement.dataset.previousTime = currentTimeString; // Update previous time for the next cycle

    let newHTML = '';
    for (let i = 0; i < currentTimeString.length; i++) {
        const newChar = currentTimeString[i];
        const oldChar = previousTimeString[i] || newChar; // Default to newChar if no old char (initial load)

        if (newChar === ':') {
            newHTML += `<span>:</span>`; // Colons are static
        } else {
            // Check if the digit has changed
            if (newChar !== oldChar) {
                newHTML += `<span class="digit-changing" data-old="${oldChar}" data-new="${newChar}">${newChar}</span>`;
            } else {
                newHTML += `<span data-old="${newChar}" data-new="${newChar}">${newChar}</span>`;
            }
        }
    }

    // Temporarily apply the new HTML
    clockElement.innerHTML = newHTML;

    // Apply animation class after innerHTML is set, then remove it
    clockElement.querySelectorAll('.digit-changing').forEach(span => {
        // Force reflow to ensure animation starts
        void span.offsetWidth;
        span.classList.remove('digit-changing'); // Remove it, then add it to re-trigger
        setTimeout(() => {
            span.classList.add('digit-changing');
        }, 10); // Small delay to allow reflow
        setTimeout(() => {
            span.classList.remove('digit-changing');
        }, 310); // Match CSS transition duration (300ms) + small buffer
    });
}

// Initial call to display the clock immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

// Add the 'Orbitron' font dynamically to ensure it loads
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);