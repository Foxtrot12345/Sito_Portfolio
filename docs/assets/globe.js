(function () {
  const page = document.querySelector('[data-globe-page]');
  if (!page) return;

  const host = document.getElementById('globe-viz');
  const status = document.getElementById('globe-status');
  const english = page.dataset.locale === 'en';
  const countries = new Set(['Italy', 'Spain', 'Switzerland']);
  const assets = {
    earth: 'https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/earth-blue-marble.jpg',
    terrain: 'https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/earth-topology.png',
    stars: 'https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/night-sky.png',
    borders: 'https://raw.githubusercontent.com/vasturiano/globe.gl/6e16419dd732b4400335e5121f2658ae119d62af/example/datasets/ne_110m_admin_0_countries.geojson'
  };

  let failed = false;
  let globeReady = false;
  let bordersReady = false;

  function fail() {
    if (failed) return;
    failed = true;
    status.hidden = false;
    status.classList.add('globe-status--error');
    status.textContent = english
      ? 'The interactive Earth is unavailable. Reload the page to try again, or use a browser that supports WebGL.'
      : 'Il globo interattivo non è disponibile. Ricarica la pagina per riprovare o usa un browser con WebGL.';
  }

  function finishLoading() {
    if (!failed && globeReady && bordersReady) status.hidden = true;
  }

  function countryName(feature) {
    const properties = feature.properties || {};
    return properties.ADMIN || properties.NAME_EN || properties.NAME || properties.name || '';
  }

  if (typeof Globe !== 'function') {
    fail();
    return;
  }

  const probe = document.createElement('canvas');
  if (!probe.getContext('webgl2') && !probe.getContext('webgl')) {
    fail();
    return;
  }

  try {
    const globe = new Globe(host, { animateIn: false })
      .globeImageUrl(assets.earth)
      .bumpImageUrl(assets.terrain)
      .backgroundImageUrl(assets.stars)
      .showAtmosphere(true)
      .atmosphereColor('#dbeafe')
      .atmosphereAltitude(0.16)
      .onGlobeReady(() => {
        globeReady = true;
        finishLoading();
      })
      .polygonAltitude(feature => countries.has(countryName(feature)) ? 0.012 : 0.006)
      .polygonCapColor(feature => countries.has(countryName(feature)) ? 'rgba(34,197,94,.34)' : 'rgba(255,255,255,.015)')
      .polygonSideColor(feature => countries.has(countryName(feature)) ? 'rgba(22,163,74,.18)' : 'rgba(255,255,255,.02)')
      .polygonStrokeColor(feature => countries.has(countryName(feature)) ? 'rgba(74,222,128,.72)' : 'rgba(255,255,255,.22)')
      .polygonLabel(feature => countryName(feature));

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      globe.width(width).height(height).globeOffset([0, -Math.round(height * 0.05)]);
    };
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
    else window.addEventListener('resize', resize);

    globe.pointOfView({ lat: 27, lng: 12, altitude: 1.5 }, 0);
    const controls = globe.controls();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.22;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 145;
    controls.maxDistance = 520;
    controls.zoomSpeed = 0.55;

    let resumeTimer;
    const pauseRotation = () => {
      if (reducedMotion) return;
      controls.autoRotate = false;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { controls.autoRotate = true; }, 6000);
    };
    host.addEventListener('pointerdown', pauseRotation, { passive: true });
    host.addEventListener('wheel', pauseRotation, { passive: true });

    fetch(assets.borders)
      .then(response => {
        if (!response.ok) throw new Error('Country data unavailable');
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data.features)) throw new Error('Invalid country data');
        const visibleCountries = data.features.filter(feature => countries.has(countryName(feature)));
        if (visibleCountries.length !== countries.size) throw new Error('Highlighted countries unavailable');
        globe.polygonsData(data.features.filter(feature => feature.properties?.ISO_A2 !== 'AQ'));
        bordersReady = true;
        finishLoading();
      })
      .catch(fail);

    window.setTimeout(() => {
      if (!globeReady || !bordersReady) fail();
    }, 20000);
  } catch (_error) {
    fail();
  }
})();
