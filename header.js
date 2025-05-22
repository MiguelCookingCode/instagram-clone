document.addEventListener('DOMContentLoaded', () => {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const storyList = document.querySelector('.list');
    const scrollAmount = 795; // scroll distance per click

    // Button update  states (opacity & pointer-events)
    function updateButtons() {
        if (storyList.scrollLeft <= 0) {
            leftBtn.style.opacity = '0';
            leftBtn.style.pointerEvents = 'none';
        } else {
            leftBtn.style.opacity = '0.5';
            leftBtn.style.pointerEvents = 'auto';
        }

        if (storyList.scrollLeft + storyList.clientWidth >= storyList.scrollWidth - 1) {
            rightBtn.style.opacity = '0';
            rightBtn.style.pointerEvents = 'none';
        } else {
            rightBtn.style.opacity = '0.5';
            rightBtn.style.pointerEvents = 'auto';
        }
    }

    // AnimateScroll function
    function animateScroll(element, distance, duration = 1500) {
        const start = element.scrollLeft;
        const startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function scrollStep(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            element.scrollLeft = start + distance * easedProgress;

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            } else {
                updateButtons(); // update buttons after animation ends
            }
        }

        requestAnimationFrame(scrollStep);
    }

    // Attach click handlers using animateScroll
    rightBtn.addEventListener('click', () => {
        animateScroll(storyList, scrollAmount, 1500);
    });

    leftBtn.addEventListener('click', () => {
        animateScroll(storyList, -scrollAmount, 1500);
    });

    // Also update buttons on manual scroll
    storyList.addEventListener('scroll', updateButtons);

    // Initial button states
    updateButtons();
});