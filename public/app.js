(() => {
  'use strict';
  const status = document.getElementById('copy-status');
  let statusTimer;
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        status.textContent = `已复制：${value}`;
      } catch {
        status.textContent = `未能复制，请手动复制：${value}`;
      }
      status.classList.add('visible');
      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => status.classList.remove('visible'), 4500);
    });
  });

  // The fallback in HTML works with JavaScript disabled or metadata unavailable.
  const metadataUrl = new URL('./release.json', document.currentScript.src);
  fetch(metadataUrl, { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) throw new Error('Release metadata unavailable');
      return response.json();
    })
    .then((metadata) => {
      const release = metadata.release;
      if (!release || !/^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/.test(release.version)) return;
      const url = new URL(release.url);
      if (url.protocol !== 'https:' || url.hostname !== 'github.com' ||
          !/^\/[\w.-]+\/[\w.-]+\/releases\/download\/[\w.-]+\/Souchuan_[\w.-]+_x64-setup\.exe$/.test(url.pathname) ||
          !/^[a-f\d]{64}$/i.test(release.sha256) || !Number.isSafeInteger(release.bytes) || release.bytes <= 0) return;
      document.querySelectorAll('[data-download]').forEach((link) => {
        link.href = url.href;
        link.removeAttribute('target');
      });
      document.querySelectorAll('[data-version]').forEach((item) => { item.textContent = release.version; });
      document.querySelectorAll('[data-channel-note]').forEach((item) => {
        item.textContent = `GitHub 直接下载 · ${(release.bytes / 1024 / 1024).toFixed(1)} MiB`;
      });
      document.getElementById('installer-hash').textContent = release.sha256;
      document.getElementById('installer-filename').textContent = decodeURIComponent(url.pathname.split('/').pop());
      document.getElementById('checksum-details').hidden = false;
    })
    .catch(() => { /* Keep the usable backup download in the HTML. */ });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy', { y: 12, opacity: 0, duration: 0.55, ease: 'power2.out' });
      // Download controls stay steady while the two device illustrations converge.
      gsap.to('.desktop-device', { xPercent: -4, rotation: 0, ease: 'none', scrollTrigger: { trigger: '.product-stage', start: 'top 75%', end: 'bottom 15%', scrub: 0.4 } });
      gsap.to('.phone-device', { y: -30, rotation: 0, ease: 'none', scrollTrigger: { trigger: '.product-stage', start: 'top 75%', end: 'bottom 15%', scrub: 0.4 } });
      gsap.fromTo('.transfer-file', { x: -32, rotation: -7 }, { x: 24, rotation: 3, ease: 'none', scrollTrigger: { trigger: '.product-stage', start: 'top 75%', end: 'bottom 15%', scrub: 0.4 } });
      gsap.from('.feature', { y: 18, opacity: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.feature-grid', start: 'top 90%', once: true } });
      gsap.from('.steps li', { x: -14, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.steps', start: 'top 90%', once: true } });
      gsap.from('.download-panel', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: '.download-panel', start: 'top 92%', once: true } });
    });
  }
})();
