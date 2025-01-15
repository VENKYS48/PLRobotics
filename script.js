const tabs = document.querySelectorAll('.tab');

    // Add click event listener to each tab
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Hide all content
        const allContent = document.querySelectorAll('.content');
        allContent.forEach(content => content.classList.remove('active'));

        // Show the content corresponding to the clicked tab
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        // Add active class to the clicked tab
        this.classList.add('active');
      });
    });

// const carousel = document.getElementById('carousel');
// const leftArrow = document.getElementById('left-arrow');
// const rightArrow = document.getElementById('right-arrow');
// const dots = document.querySelectorAll('.dot');

// let scrollPosition = 0;
// const items = document.querySelectorAll('.carousel-item');
// const itemWidth = items[0].offsetWidth + 30;

// function scrollLeft() {
//     scrollPosition -= itemWidth;
//     if (scrollPosition < 0) scrollPosition = 0; 
//     updateCarousel();
// }

// function scrollRight() {
//     const maxScroll = (items.length - 3) * itemWidth; 
//     scrollPosition += itemWidth;
//     if (scrollPosition > maxScroll) scrollPosition = maxScroll;
//     updateCarousel();
// }

// function updateCarousel() {
//     carousel.style.transform = `translateX(-${scrollPosition}px)`;
//     updateDots();
// }

// function updateDots() {
//     const currentIndex = Math.round(scrollPosition / itemWidth);
//     dots.forEach((dot, index) => {
//         dot.classList.toggle('active', index === currentIndex);
//     });
// }

// dots.forEach((dot) => {
//     dot.addEventListener('click', (e) => {
//         const index = parseInt(e.target.dataset.index);
//         scrollPosition = index * itemWidth;
//         updateCarousel();
//     });
// });

// // Event Listeners
// leftArrow.addEventListener('click', scrollLeft);
// rightArrow.addEventListener('click', scrollRight);


const carousel = document.getElementById('carousel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dots = document.querySelectorAll('.dot');

let scrollPosition = 0;
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth; // Include margin
const highlightTime = 2000; // 2 seconds
const autoScrollInterval = 3000; // 3 seconds
let currentIndex = 0;

// Highlight effect
function highlightCurrentItem() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('highlight');
        } else {
            item.classList.remove('highlight');
        }
    });
}

// Scroll left
function scrollLeft() {
    currentIndex -= 1;
    if (currentIndex < 0) currentIndex = 0; // Prevent scrolling left past start
    scrollPosition = currentIndex * itemWidth;
    updateCarousel();
}

// Scroll right
function scrollRight() {
    const maxIndex = items.length - 1; // Adjust based on visible items
    currentIndex += 1;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    scrollPosition = currentIndex * itemWidth;
    updateCarousel();
}

// Update carousel position and dots
function updateCarousel() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const boxWidth = items[0].offsetWidth;
    const margin = 40; // Half of the margin between items

    // Calculate the offset to center the current item
    const centerOffset = (containerWidth - boxWidth) / 2;

    // Calculate the translateX value to center the active box
    const translateX = -currentIndex * (boxWidth + margin * 2) + centerOffset;

    // Apply the translation to the carousel
    carousel.style.transform = `translateX(${translateX}px)`;

    // Highlight the active item
    highlightCurrentItem();

    // Update dots
    updateDots();
}

// Update dots
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Dot click event
dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        currentIndex = index;
        scrollPosition = index * itemWidth;
        updateCarousel();
    });
});

// Automatic scroll with highlighting
let direction = 1; // 1 for forward, -1 for backward

function autoScroll() {
    const maxIndex = items.length - 1;
    const minIndex = 0;

    currentIndex += direction;

    // Reverse direction at the ends
    if (currentIndex >= maxIndex) {
        direction = -1; // Switch to backward
        currentIndex = maxIndex; // Ensure it stays within bounds
    } else if (currentIndex <= minIndex) {
        direction = 1; // Switch to forward
        currentIndex = minIndex; // Ensure it stays within bounds
    }

    scrollPosition = currentIndex * itemWidth;
    updateCarousel();
}

// Start auto-scroll
let autoScrollTimer = setInterval(autoScroll, autoScrollInterval);


// Event Listeners for manual scrolling
leftArrow.addEventListener('click', () => {
    clearInterval(autoScrollTimer); // Pause auto-scroll
    scrollLeft();
    autoScrollTimer = setInterval(autoScroll, autoScrollInterval); 
});

rightArrow.addEventListener('click', () => {
    clearInterval(autoScrollTimer); // Pause auto-scroll
    scrollRight();
    autoScrollTimer = setInterval(autoScroll, autoScrollInterval); 
});

// Initial setup
updateCarousel();
highlightCurrentItem();

/// Select elements to animate
const imageElement = document.querySelector('.observe-image');
const textLeft = document.querySelector('.text-left');
const textRight = document.querySelector('.text-right');

// Create an Intersection Observer for the image
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the active class to the text elements when the image is visible
        textLeft.classList.add('active');
        textRight.classList.add('active');
        observer.unobserve(entry.target); // Stop observing the image
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the image is visible
  }
);

// Observe the image
observer.observe(imageElement);


/*SR3 Page*/


    document.getElementById('download-link').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        
        const fileUrl = '7_SCARA series.pdf';
        
        // Open the file in a new tab or window
        const newWindow = window.open(fileUrl, '_blank');
        
        // Ensure the download triggers only if the file successfully opens in a new tab
        if (newWindow) {
            setTimeout(() => {
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = '7_SCARA series.pdf'; // Set desired download filename
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink); // Clean up
            }, 500); // Adjust delay as needed
        } else {
            alert('Please allow pop-ups for this website to open the file in a new tab.');
        }
    });

const images = document.querySelectorAll('.product-image img');
const dots1 = document.querySelectorAll('.dots span');
let currentIndex1 = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.remove('active');
        dots1[i].classList.remove('active');
        if (i === index) {
          img.classList.add('active');
          dots1[i].classList.add('active');
        }
      });
    }

    function nextImage() {
      currentIndex = (currentIndex1 + 1) % images.length;
      showImage(currentIndex1);
    }

    // Set interval for automatic image change
    setInterval(nextImage, 3000);

    // Add click events to dots
    dots1.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex1 = index;
        showImage(currentIndex1);
      });
    });


    
