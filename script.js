document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
  
    // Close the popup when clicking anywhere on the screen
    popupOverlay.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });
  
    // Carousel Code for Certification Section
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const certificationContainer = document.querySelector(".certification-container");
  
    let currentIndex = 0; // Track current slide index
    const cardWidth = 270; // Card width + gap (250px + 20px gap)
    const maxVisibleCards = 3; // Number of visible cards
    const totalCards = certificationContainer.children.length;
  
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        certificationContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    });
  
    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalCards - maxVisibleCards) {
        currentIndex++;
        certificationContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    });

    const toggleButton = document.getElementById("toggle-projects");
    const hiddenProjects = document.querySelectorAll(".project-card.hidden");
  
    toggleButton.addEventListener("click", () => {
      hiddenProjects.forEach(project => {
        project.classList.toggle("hidden"); // Toggle the 'hidden' class
      });
  
      // Update button text
      if (toggleButton.textContent === "Show more") {
        toggleButton.textContent = "Show less";
      } else {
        toggleButton.textContent = "Show more";
      }
    });

    const dots = document.querySelectorAll(".dots .dot");
    const slides = document.querySelectorAll(".about-slide");

    let currentSlideIndex = 0;
    let autoSlideInterval;

    // Function to switch to a specific slide
    function switchSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active", "prev");
            if (i === currentSlideIndex) {
                slide.classList.add("prev"); // Mark the outgoing slide
            }
        });

        // Update active dot
        dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        });

        // Add active class to the new slide
        slides[index].classList.add("active");

        currentSlideIndex = index; // Update the current slide index
    }

    // Function to switch to the next slide automatically
    function nextSlide() {
        const nextIndex = (currentSlideIndex + 1) % slides.length; // Loop back to the first slide
        switchSlide(nextIndex);
    }

    // Set up the auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 30000); // Change slide every 30 seconds
    }

    // Stop the auto-slide functionality
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Initialize manual navigation for dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
        stopAutoSlide(); // Stop auto-slide when a dot is clicked
        switchSlide(index);
        startAutoSlide(); // Restart auto-slide after manual interaction
        });
    });

    // Start the auto-slide on page load
    startAutoSlide();

  
});
  