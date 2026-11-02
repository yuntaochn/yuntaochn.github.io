(() => {
  "use strict";

  function initialize() {
    const article = document.getElementById("briefing");
    if (!article) return;

    const topics = Array.from(article.querySelectorAll(":scope > section.topic[id]"));
    const start = document.getElementById("start-talk");
    const exit = document.getElementById("exit-talk");
    const previous = document.getElementById("prev-topic");
    const next = document.getElementById("next-topic");
    const tools = document.getElementById("talk-tools");
    const progress = document.getElementById("talk-progress");
    if (!topics.length || !start || !exit || !previous || !next || !tools || !progress) return;

    const links = document.querySelectorAll('#topic-nav a[href^="#"]');
    let current = 0;
    let presenting = false;
    let renderedURL = "";

    function render() {
      if (renderedURL === location.href) return;
      renderedURL = location.href;
      const url = new URL(location.href);
      const wasPresenting = presenting;
      presenting = url.searchParams.get("present") === "1";
      current = Math.max(0, topics.findIndex(topic => "#" + topic.id === url.hash));

      if (presenting) document.body.dataset.view = "talk";
      else delete document.body.dataset.view;
      start.hidden = presenting;
      tools.hidden = !presenting;
      topics.forEach((topic, index) => { topic.hidden = presenting && index !== current; });
      previous.disabled = current === 0;
      next.disabled = current === topics.length - 1;
      progress.textContent = (current + 1) + " / " + topics.length;
      links.forEach(link => {
        if (presenting && link.hash === "#" + topics[current].id) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });

      if (presenting || wasPresenting) {
        const section = topics[current];
        const heading = section.querySelector("h1, h2");
        if (heading) heading.focus({ preventScroll: true });
        section.scrollIntoView({ block: "start" });
      }
    }

    function navigate(index, asTalk) {
      if (index < 0 || index >= topics.length) return;
      const url = new URL(location.href);
      if (asTalk) url.searchParams.set("present", "1");
      else url.searchParams.delete("present");
      url.hash = topics[index].id;
      if (url.href !== location.href) history.pushState(history.state, "", url);
      render();
    }

    start.addEventListener("click", () => navigate(current, true));
    exit.addEventListener("click", () => navigate(current, false));
    previous.addEventListener("click", () => navigate(current - 1, true));
    next.addEventListener("click", () => navigate(current + 1, true));
    window.addEventListener("popstate", render);
    window.addEventListener("hashchange", render);
    document.addEventListener("keydown", event => {
      if (!presenting || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target.isContentEditable || event.target.closest?.('input, textarea, select, [role="textbox"], [role="slider"], [role="tablist"]')) return;
      if (event.key === "ArrowLeft") navigate(current - 1, true);
      else if (event.key === "ArrowRight") navigate(current + 1, true);
      else if (event.key === "Escape") navigate(current, false);
      else return;
      event.preventDefault();
    });

    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
