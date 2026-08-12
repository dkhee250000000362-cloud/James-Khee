(function () {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.documentElement.classList.add("has-custom-cursor");

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let visible = false;

  const show = () => {
    if (visible) return;
    visible = true;
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  };

  const hide = () => {
    if (!visible) return;
    visible = false;
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  };

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
    show();
  });

  document.addEventListener("mouseleave", hide);
  document.addEventListener("mouseenter", show);

  document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("grow"));
    el.addEventListener("mouseleave", () => ring.classList.remove("grow"));
  });

  const loop = () => {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(loop);
  };
  loop();
})();
