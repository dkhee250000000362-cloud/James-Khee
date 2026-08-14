(function () {
  const loaderEl = document.createElement("div");
  loaderEl.className = "loader";
  loaderEl.innerHTML =
    '<div class="loader-logo-box"><div class="loader-ring"></div><img class="loader-logo" src="images/GDGDOC KHEE.png" alt="Loading"></div>' +
    '<div class="loader-track"><div class="loader-fill" id="loaderFill"></div></div>' +
    '<div class="loader-percent"><span id="loaderPercent">0</span>%</div>';

  document.body.appendChild(loaderEl);

  const fill = document.getElementById("loaderFill");
  const percent = document.getElementById("loaderPercent");
  let progress = 0;
  const duration = 1400;
  const start = performance.now();
  let finished = false;

  let timer = null;
  let failsafe = setTimeout(() => {
    if (!finished) finish(100);
  }, 4000);

  const tick = (now) => {
    const elapsed = now - start;
    const eased = 1 - Math.pow(1 - Math.min(1, elapsed / duration), 3);
    const p = Math.min(100, eased * 100);
    progress = Math.floor(p);
    fill.style.width = progress + "%";
    percent.textContent = progress;
    if (progress >= 100) {
      finish(100);
    } else if (timer) {
      requestAnimationFrame(tick);
    }
  };

  const begin = () => {
    timer = true;
    requestAnimationFrame(tick);
  };

  const finish = (to) => {
    if (finished) return;
    finished = true;
    clearTimeout(failsafe);
    fill.style.width = to + "%";
    percent.textContent = to;
    setTimeout(() => {
      loaderEl.classList.add("hidden");
      setTimeout(() => loaderEl.remove(), 550);
    }, 250);
  };

  if (document.readyState === "loading") {
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (!finished) finish(100);
      }, 200);
    });
    begin();
  } else {
    begin();
    setTimeout(() => {
      if (!finished) finish(100);
    }, 300);
  }
})();