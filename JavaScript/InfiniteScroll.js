const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';

document.addEventListener("DOMContentLoaded", () => {
  const testimonialContainer = document.getElementById("testimonial-container");
  let afterId = undefined;
  let next = true;
  let testimonialArr = [];
  let isFetching = false; // Flag to track ongoing requests

  const getTestimonials = async (afterId) => {
    if (isFetching) return; // Exit if a request is already in progress
    isFetching = true; // Set flag to true when a request starts

    let response;
    try {
      if (next) {
        const url = afterId === undefined
          ? `${API_BASE_URL}?limit=5`
          : `${API_BASE_URL}?limit=5&after=${parseInt(afterId)}`;

        response = await fetch(url);

        // Network check
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        next = data.hasNext;
        testimonialArr = data.testimonials;

        return { next, testimonialArr };
      } else {
        console.log("All data has been fetched");
        return { next: false, testimonialArr: [] };
      }
    } catch (error) {
      console.log("Could not fetch data", error);
      return { next: false, testimonialArr: [] };
    } finally {
      isFetching = false; // Reset flag after request completes
    }
  };

  const appendNewP = (arr) => {
    arr.forEach(testimonial => {
      const newP = document.createElement("p");
      newP.textContent = testimonial.message;
      newP.classList.add("testimonial");
      testimonialContainer.appendChild(newP);
      afterId = testimonial.id; // Update afterId to the latest testimonial ID
    });
  };

  const loadInitialTestimonials = async () => {
    const { next, testimonialArr } = await getTestimonials(afterId);
    appendNewP(testimonialArr);
  };

  loadInitialTestimonials();

  testimonialContainer.addEventListener("scroll", async () => {
    const containerHeight = testimonialContainer.scrollHeight;
    const scrollTop = testimonialContainer.scrollTop;
    const clientHeight = testimonialContainer.clientHeight;

    if (scrollTop + clientHeight >= containerHeight) {
      if (next) {
        const { next: newNext, testimonialArr } = await getTestimonials(afterId);
        appendNewP(testimonialArr);
        next = newNext; // Update the next flag
      }
    }
  });
});