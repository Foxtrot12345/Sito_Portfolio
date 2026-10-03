(function () {
  const page = document.querySelector('[data-globe-page]');
  if (!page) return;

  const english = page.dataset.locale === 'en';
  const host = document.getElementById('globe-viz');
  const fallback = document.getElementById('globe-fallback');
  const status = document.getElementById('globe-status');
  const countries = new Set(['Italy', 'Spain', 'Switzerland']);
  const locations = {
    italy: { lat: 42.8, lng: 12.5, altitude: 2.05 },
    spain: { lat: 40.3, lng: -3.8, altitude: 2.05 },
    switzerland: { lat: 46.8, lng: 8.2, altitude: 1.7 },
    madrid: { lat: 40.412, lng: -3.678, altitude: 1.35 },
    'h-farm': { lat: 45.566, lng: 12.439, altitude: 1.35 }
  };
  const pins = [
    { key: 'madrid', name: 'Madrid', lat: locations.madrid.lat, lng: locations.madrid.lng },
    { key: 'h-farm', name: 'H-FARM', lat: locations['h-farm'].lat, lng: locations['h-farm'].lng }
  ];
  const errorText = english
    ? 'The interactive globe is unavailable. The countries and places remain listed on this page.'
    : 'Il globo interattivo non è disponibile. Puoi comunque consultare i Paesi e i luoghi nell’elenco.';

  function fail() {
    status.textContent = errorText;
    fallback.classList.add('globe-fallback--error');
    for (const button of page.querySelectorAll('[data-globe-focus]')) button.disabled = true;
    const hint = page.querySelector('.globe-hint');
    if (hint) hint.hidden = true;
  }

  function countryName(feature) {
    const props = feature.properties || {};
    return props.ADMIN || props.NAME_EN || props.NAME || props.name || '';
  }

  function makePin(pin) {
    const marker = document.createElement('div');
    marker.className = 'globe-map-pin';
    marker.setAttribute('aria-label', pin.name);
    const dot = document.createElement('span');
    dot.className = 'globe-map-pin-dot';
    const label = document.createElement('span');
    label.className = 'globe-map-pin-label';
    label.textContent = pin.name;
    marker.append(dot, label);
    return marker;
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
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#747e7a')
      .atmosphereAltitude(0.18)
      .showGraticules(true)
      .htmlElementsData(pins)
      .htmlLat(pin => pin.lat)
      .htmlLng(pin => pin.lng)
      .htmlAltitude(0.04)
      .htmlElement(makePin)
      .htmlTransitionDuration(0);

    globe.globeMaterial().color.set('#171c1d');
    globe.globeMaterial().emissive.set('#080b0b');
    globe.globeMaterial().emissiveIntensity = 0.3;
    globe.controls().autoRotate = false;
    globe.controls().enableDamping = true;
    globe.controls().minDistance = 150;
    globe.controls().maxDistance = 850;

    const resize = () => globe.width(host.clientWidth).height(host.clientHeight);
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
    else window.addEventListener('resize', resize);
    globe.pointOfView({ lat: 43.5, lng: 6, altitude: 1.7 }, 0);

    for (const button of page.querySelectorAll('[data-globe-focus]')) {
      button.addEventListener('click', () => {
        const target = locations[button.dataset.globeFocus];
        if (!target) return;
        globe.pointOfView(target, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 950);
        for (const other of page.querySelectorAll('[data-globe-focus]')) other.setAttribute('aria-pressed', String(other === button));
      });
    }

    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/6e16419dd732b4400335e5121f2658ae119d62af/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(response => { if (!response.ok) throw new Error('Country data unavailable'); return response.json(); })
      .then(data => {
        if (!Array.isArray(data.features)) throw new Error('Invalid country data');
        globe.polygonsData(data.features)
          .polygonCapColor(feature => countryName(feature) === 'Switzerland' ? '#5ade8b' : countries.has(countryName(feature)) ? '#31bf6c' : '#292e2e')
          .polygonSideColor(feature => countries.has(countryName(feature)) ? '#216b43' : '#242828')
          .polygonStrokeColor(() => '#101414')
          .polygonAltitude(feature => countryName(feature) === 'Switzerland' ? 0.032 : countries.has(countryName(feature)) ? 0.017 : 0.006);
        fallback.hidden = true;
      })
      .catch(() => { fail(); });
  } catch (_error) {
    fail();
  }
})();
