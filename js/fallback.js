(function () {
  function revealStuckAppearNodes() {
    var nodes = document.querySelectorAll("[data-framer-appear-id]");
    nodes.forEach(function (node) {
      var style = window.getComputedStyle(node);
      if (style.opacity === "0") {
        node.style.opacity = "1";
        node.style.transform = "none";
        node.style.filter = "none";
        node.style.visibility = "visible";
      }
    });
  }

  window.addEventListener("load", function () {
    window.setTimeout(revealStuckAppearNodes, 1800);
    window.setTimeout(revealStuckAppearNodes, 4000);
  });
})();
