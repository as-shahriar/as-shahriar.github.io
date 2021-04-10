theme = localStorage.getItem("theme");
if (theme) document.body.setAttribute("data-theme", theme);

document.querySelectorAll(".copy").forEach((e) => {
  e.addEventListener("click", () => {
    copy(e.textContent);
  });
});

copy = (value) => {
  (dummy = document.createElement("input")), document.body.appendChild(dummy);
  dummy.value = value;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

toggle_theme = () => {
  if (document.body.getAttribute("data-theme") == "dark") {
    document.body.setAttribute("data-theme", "");
    localStorage.setItem("theme", "");
  } else {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
};

document.getElementById("checkbox").addEventListener("click", toggle_theme);

setCookie = (name, value) => {
  var date = new Date();
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Make sure sw are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_site.js")
      .then((reg) => {})
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
