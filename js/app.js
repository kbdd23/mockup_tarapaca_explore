/* ============================================
   Tarapacá Explore · Mockup App Logic
   ============================================ */

(function () {
  'use strict';

  // --- POI Data ---
  const POI_DATA = {
    pisagua: {
      name_es: 'Pisagua',
      name_en: 'Pisagua',
      tag_es: 'Puerto histórico',
      tag_en: 'Historic port',
      dist_es: 'A 2.3 km',
      dist_en: '2.3 km away',
      desc_es: 'Antiguo puerto salitrero y ferrocarrilero, Pisagua guarda historias de la epoca dorada del salitre y la conexion ferroviaria con Bolivia. Sus playas y arquitectura decimononica ofrecen una ventana al pasado.',
      desc_en: 'An ancient saltpeter and railway port, Pisagua holds stories from the golden age of saltpeter and the railway connection to Bolivia. Its beaches and 19th-century architecture offer a window into the past.',
      businesses: [
        {
          name: 'Cabanas del Puerto',
          type_es: 'Alojamiento',
          type_en: 'Lodging',
          desc_es: 'Cabanas con vista al mar, ideales para descansar despues de recorrer el puerto.',
          desc_en: 'Sea-view cabins, ideal for resting after touring the port.',
          tags_es: ['Hospedaje', 'Vista al mar'],
          tags_en: ['Lodging', 'Sea view']
        },
        {
          name: 'Caleta Pisagua',
          type_es: 'Gastronomia',
          type_en: 'Food',
          desc_es: 'Restaurante familiar con platos tipicos del norte, pescados frescos y mariscos.',
          desc_en: 'Family restaurant with typical northern dishes, fresh fish and seafood.',
          tags_es: ['Pescados', 'Mariscos', 'Cocina nortina'],
          tags_en: ['Fish', 'Seafood', 'Northern cuisine']
        }
      ]
    },
    iquique: {
      name_es: 'Iquique',
      name_en: 'Iquique',
      tag_es: 'Playas y cultura',
      tag_en: 'Beaches & culture',
      dist_es: 'A 5.1 km',
      dist_en: '5.1 km away',
      desc_es: 'Capital regional y principal centro turistico. Playas como Cavancha y el Casco Historico con el Teatro Municipal y la Plaza Prat son paradas obligadas.',
      desc_en: 'Regional capital and main tourist hub. Beaches like Cavancha and the Historic Center with the Municipal Theatre and Prat Square are must-sees.',
      businesses: [
        {
          name: 'Hotel Cavancha Suites',
          type_es: 'Alojamiento',
          type_en: 'Lodging',
          desc_es: 'Hotel frente a la playa con piscina, restaurante y vistas privilegiadas.',
          desc_en: 'Beachfront hotel with pool, restaurant and privileged views.',
          tags_es: ['Hotel', 'Frente al mar', 'Piscina'],
          tags_en: ['Hotel', 'Beachfront', 'Pool']
        },
        {
          name: 'Mercado Centenario',
          type_es: 'Gastronomia',
          type_en: 'Food',
          desc_es: 'Mercado tradicional donde encontraras desde pescados frescos hasta artesanias locales.',
          desc_en: 'Traditional market offering fresh fish to local crafts.',
          tags_es: ['Mercado', 'Artesanias', 'Comida tipica'],
          tags_en: ['Market', 'Crafts', 'Local food']
        },
        {
          name: 'Agencia Turismo Activo',
          type_es: 'Tours',
          type_en: 'Tours',
          desc_es: 'Ofrecen parapente, surf y excursiones guiadas por el desierto y la costa.',
          desc_en: 'Offering paragliding, surfing and guided desert and coastal excursions.',
          tags_es: ['Parapente', 'Surf', 'Excursiones'],
          tags_en: ['Paragliding', 'Surf', 'Excursions']
        }
      ]
    },
    humberstone: {
      name_es: 'Oficina Salitrera Humberstone',
      name_en: 'Humberstone Saltpeter Office',
      tag_es: 'Patrimonio de la humanidad',
      tag_en: 'World heritage site',
      dist_es: 'A 8.7 km',
      dist_en: '8.7 km away',
      desc_es: 'Declarada Patrimonio de la Humanidad por la UNESCO, esta oficina salitrera exhibe la vida de los obreros del salitre. Un museo al aire libre que no te puedes perder.',
      desc_en: 'Declared a UNESCO World Heritage Site, this saltpeter office showcases the life of saltpeter workers. An open-air museum not to be missed.',
      businesses: [
        {
          name: 'Guia Tour Salitrero',
          type_es: 'Tours',
          type_en: 'Tours',
          desc_es: 'Recorridos guiados por la oficina con historiadores locales que relatan la epoca de esplendor.',
          desc_en: 'Guided tours of the office with local historians recounting the era of splendor.',
          tags_es: ['Guia en espanol', 'Historia', 'Recorrido peatonal'],
          tags_en: ['Spanish guide', 'History', 'Walking tour']
        }
      ]
    },
    pica: {
      name_es: 'Pica',
      name_en: 'Pica',
      tag_es: 'Oasis y limones',
      tag_en: 'Oasis & lemons',
      dist_es: 'A 45 km',
      dist_en: '45 km away',
      desc_es: 'Oasis en medio del desierto, famoso por sus limones de Pica y sus cochas termales.',
      desc_en: 'Oasis in the middle of the desert, famous for its Pica lemons and thermal pools.',
      businesses: []
    },
    mamina: {
      name_es: 'Mamina',
      name_en: 'Mamina',
      tag_es: 'Termas ancestrales',
      tag_en: 'Ancestral hot springs',
      dist_es: 'A 35 km',
      dist_en: '35 km away',
      desc_es: 'Pueblo altiplano con termas de aguas sulfurosas conocidas por sus propiedades medicinales.',
      desc_en: 'Highland village with sulfuric hot springs known for their medicinal properties.',
      businesses: []
    }
  };

  // --- Language state ---
  let currentLang = 'es';

  // --- DOM refs ---
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const views = {
    qr: $('#view-qr'),
    map: $('#view-map'),
    detail: $('#view-detail')
  };

  const scanLine = $('#scanLine');
  const btnSimulate = $('#btnSimulate');
  const btnBack = $('#btnBack');
  const btnBackDetail = $('#btnBackDetail');
  const proxNotif = $('#proxNotif');
  const detailBody = $('#detailBody');
  const screen = $('#screen');
  const foliumMap = $('#foliumMap');
  const tourPointName = $('#tourPointName');

  // --- Comunicacion con iframe Folium ---
  function sendToMap (msg) {
    if (foliumMap && foliumMap.contentWindow) {
      foliumMap.contentWindow.postMessage(msg, '*');
    }
  }

  // Escuchar mensajes del mapa (fly-to)
  window.addEventListener('message', function (e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'fly-to') {
      if (tourPointName) {
        tourPointName.textContent = e.data.nombre || '';
      }
    }
  });

  // --- Language toggles ---
  const langToggles = $$('.lang-toggle');

  function switchLang (lang) {
    if (lang === currentLang) return;
    currentLang = lang;

    // Update toggle UI
    langToggles.forEach(toggle => {
      toggle.querySelectorAll('.lang-option').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === lang);
      });
    });

    // Show/hide spans by data-key
    document.querySelectorAll('[data-key]').forEach(el => {
      // They are arranged as .es and .en siblings
    });

    $$('.es').forEach(el => el.classList.toggle('hidden', lang !== 'es'));
    $$('.en').forEach(el => el.classList.toggle('hidden', lang !== 'en'));

    // If detail view is active, re-render
    if (views.detail.classList.contains('active') && detailBody.dataset.currentPoi) {
      renderDetail(detailBody.dataset.currentPoi);
    }
  }

  // Attach lang toggle events
  langToggles.forEach(toggle => {
    toggle.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        switchLang(opt.dataset.lang);
      });
    });
  });

  // --- View switching ---
  function showView (viewId) {
    Object.keys(views).forEach(key => {
      views[key].classList.toggle('active', key === viewId);
    });
  }

  // --- Scan Simulation ---
  btnSimulate.addEventListener('click', () => {
    // Flash effect
    const flash = document.createElement('div');
    flash.className = 'flash-overlay';
    screen.appendChild(flash);
    setTimeout(() => flash.remove(), 450);

    // Switch to map after brief delay
    setTimeout(() => {
      showView('map');
      // Show proximity notification
      proxNotif.classList.remove('hidden');
      // Auto-hide notification
      setTimeout(() => proxNotif.classList.add('hidden'), 4000);
    }, 600);
  });

  // --- Back buttons ---
  btnBack.addEventListener('click', () => {
    showView('qr');
  });
  btnBackDetail.addEventListener('click', () => showView('map'));

  // --- POI Cards (strip) click: solo volar la camara al punto ---
  $$('.poi-card').forEach(card => {
    card.addEventListener('click', () => {
      const poiId = card.dataset.poi;
      sendToMap({ type: 'fly-to-poi', poi: poiId });
    });
  });

  // --- Render detail ---
  function renderDetail (poiId) {
    const data = POI_DATA[poiId];
    if (!data) return;

    detailBody.dataset.currentPoi = poiId;

    const name = currentLang === 'es' ? data.name_es : data.name_en;
    const tag = currentLang === 'es' ? data.tag_es : data.tag_en;
    const desc = currentLang === 'es' ? data.desc_es : data.desc_en;
    const businesses = data.businesses;

    let bizHtml = '';
    if (businesses && businesses.length > 0) {
      bizHtml = businesses.map(b => {
        const bName = b.name;
        const bType = currentLang === 'es' ? b.type_es : b.type_en;
        const bDesc = currentLang === 'es' ? b.desc_es : b.desc_en;
        const bTags = currentLang === 'es' ? b.tags_es : b.tags_en;
        const tagsHtml = bTags.map(t => `<span class="business-tag">${t}</span>`).join('');
        return `
          <div class="detail-business-card">
            <div class="business-name">${bName}</div>
            <div class="business-type">${bType}</div>
            <div class="business-desc">${bDesc}</div>
            <div>${tagsHtml}</div>
          </div>
        `;
      }).join('');
    } else {
      const noBiz = currentLang === 'es'
        ? 'Aun no hay emprendimientos registrados en esta localidad. ¿Tienes un negocio aqui? Contactanos para aparecer.'
        : 'No registered businesses in this location yet. Own a business here? Contact us to be listed.';
      bizHtml = `<div class="detail-section-text" style="padding:12px 0;color:var(--text-dim);">${noBiz}</div>`;
    }

    detailBody.innerHTML = `
      <div class="detail-hero">
        <div class="detail-hero-label">${name}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">${currentLang === 'es' ? 'Informacion' : 'Information'}</div>
        <div class="detail-section-text">${tag} · ${desc}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">
          ${currentLang === 'es' ? 'Emprendimientos locales' : 'Local businesses'}
        </div>
        ${bizHtml}
      </div>
      <div class="detail-section">
        <div class="detail-section-title">${currentLang === 'es' ? 'Senialeticas cercanas' : 'Nearby signposts'}</div>
        <div class="detail-section-text" style="font-size:11px;color:var(--text-dim);">
          ${currentLang === 'es'
            ? 'Hay 3 senialeticas QR instaladas en esta zona. Escanea otro QR para descubrir mas puntos.'
            : 'There are 3 QR signposts installed in this area. Scan another QR to discover more points.'}
        </div>
      </div>
    `;
  }

  // --- Init ---
  // Start on QR view with ES language
  switchLang('es');
  showView('qr');

  // --- Scan line animation kickstart ---
  // (already animating via CSS)

  console.log('Tarapaca Explore Mockup v1.0 initialized');

})();
