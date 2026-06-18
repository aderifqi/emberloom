(function () {
  var script = document.currentScript;
  if (!script) return;

  var lockedTitle = script.getAttribute("data-title");
  var iconBase = script.getAttribute("data-icon-base") || "assets/icons";
  var isApplying = false;

  function iconHref(name) {
    return new URL(iconBase.replace(/\/$/, "") + "/" + name, document.baseURI).href;
  }

  function ensureLink(rel, href, attrs) {
    var selector = "link[rel='" + rel + "']" + (attrs && attrs.sizes ? "[sizes='" + attrs.sizes + "']" : "");
    var link = document.head.querySelector(selector);

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }

    if (link.href !== href) link.href = href;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (link.getAttribute(key) !== attrs[key]) link.setAttribute(key, attrs[key]);
      });
    }
  }

  function applyMeta() {
    if (isApplying) return;
    isApplying = true;

    if (lockedTitle && document.title !== lockedTitle) {
      document.title = lockedTitle;
    }

    ensureLink("icon", iconHref("favicon.ico"), { sizes: "any" });
    ensureLink("icon", iconHref("favicon-32x32.png"), { type: "image/png", sizes: "32x32" });
    ensureLink("icon", iconHref("favicon-16x16.png"), { type: "image/png", sizes: "16x16" });
    ensureLink("apple-touch-icon", iconHref("apple-icon.png"));

    isApplying = false;
  }

  applyMeta();

  new MutationObserver(applyMeta).observe(document.head, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeFilter: ["href", "rel", "sizes", "type"]
  });
})();
