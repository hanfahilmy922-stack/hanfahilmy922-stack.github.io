
"use strict";

// --------------------------------------
// 1. MOBILE NAVIGATION
// --------------------------------------

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuIcon.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  if (isOpen) {
    closeMobileMenu();
  } else {
    mobileMenu.classList.remove("hidden");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    menuIcon.textContent = "✕";
  }
});

// Close the mobile menu after selecting a section.
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// --------------------------------------
// 2. DARK / LIGHT THEME
// --------------------------------------

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

function updateThemeButton() {
  const isLight = root.dataset.theme === "light";

  themeIcon.textContent = isLight ? "🌙" : "☀️";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );

  themeToggle.title = isLight
    ? "Switch to dark theme"
    : "Switch to light theme";
}

themeToggle.addEventListener("click", () => {
  const isLight = root.dataset.theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  if (nextTheme === "light") {
    root.dataset.theme = "light";
  } else {
    delete root.dataset.theme;
  }

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    // Theme switching still works if storage is unavailable.
  }

  updateThemeButton();
});

updateThemeButton();

// --------------------------------------
// 3. AUTOMATIC COPYRIGHT YEAR
// --------------------------------------

document.getElementById("current-year").textContent =
  new Date().getFullYear();

// --------------------------------------
// 4. CONTACT FORM
// --------------------------------------

// This is a front-end-only form. It opens an email application.
// Replace the placeholder address with your real email address.

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const portfolioEmail = "your-email@example.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const name = document.getElementById("name").value.trim();
  const senderEmail = document
    .getElementById("sender-email")
    .value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !senderEmail || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const subject = `Portfolio enquiry from ${name}`;

  const body = [
    `Name: ${name}`,
    `Email: ${senderEmail}`,
    "",
    "Message:",
    message
  ].join("\n");

  const mailtoLink =
    `mailto:${portfolioEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  formStatus.textContent =
    "Opening your email application. Please send the message there.";

  window.location.href = mailtoLink;
});

// --------------------------------------
// 5. UPDATE EMAIL PLACEHOLDER
// --------------------------------------

const emailLink = document.getElementById("email-link");

emailLink.href = `mailto:${portfolioEmail}`;
emailLink.textContent = `✉ ${portfolioEmail}`;
