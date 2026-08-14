(function () {
  const root = document.documentElement;
  const stored = (function () {
    try {
      return localStorage.getItem("portfolioTheme");
    } catch (e) {
      return null;
    }
  })();

  const theme = stored === "light" || stored === "dark" ? stored : "dark";
  root.setAttribute("data-theme", theme);

  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("portfolioTheme", next);
    } catch (e) {}
  });
})();