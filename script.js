const pageMap = {
  home: "/",
  services: "/services.html",
  industries: "/industries.html",
  about: "/about.html",
  contact: "/contact.html",
};

const currentPage = document.body.dataset.page;
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");

if (currentPage && navLinks) {
  [...navLinks.querySelectorAll("a")].forEach((link) => {
    const path = pageMap[currentPage];
    if (path && link.getAttribute("href") === path) {
      link.classList.add("is-active");
    }
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const nextExpanded = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(nextExpanded));
    navLinks.classList.toggle("is-open", nextExpanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((element) => observer.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const formStatus = document.querySelector("#form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim();
    const company = formData.get("company")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const service = formData.get("service")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !service || !message) {
      if (formStatus) {
        formStatus.textContent = "Please complete the required fields before sending.";
      }
      return;
    }

    const subject = encodeURIComponent(`Service Request: ${service}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Company: ${company || "N/A"}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Service needed: ${service}`,
        "",
        "Project details:",
        message,
      ].join("\n")
    );

    if (formStatus) {
      formStatus.textContent = "Opening your email app with the request prefilled.";
    }

    window.location.href = `mailto:hello@xyztronics.ca?subject=${subject}&body=${body}`;
  });
}
