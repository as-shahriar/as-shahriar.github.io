window.onload = () => {
  theme = getCookie("theme");
  if (theme) document.body.setAttribute("data-theme", theme);
};

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
    setCookie("theme", "");
  } else {
    document.body.setAttribute("data-theme", "dark");
    setCookie("theme", "dark");
  }
};

document.getElementById("checkbox").addEventListener("click", toggle_theme);

setCookie = (name, value) => {
  var date = new Date();
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
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
