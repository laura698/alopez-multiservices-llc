// ─── Julio Cash Electronic Inc — Language Switcher ────────────────────────────

const TRANSLATIONS = {
  es: {
    // ── Navigation ──────────────────────────────────────────────────────────
    'Home': 'Inicio',
    'Catalog': 'Catálogo',
    'About Us': 'Nosotros',
    'Contact Us': 'Contáctenos',
    'All categories': 'Todas las categorías',
    'Search': 'Buscar',

    // ── Categories ──────────────────────────────────────────────────────────
    'Washing Machines': 'Lavadoras',
    'Refrigerators': 'Refrigeradoras',
    'Air Conditioners': 'Aires Acondicionados',
    'Televisions': 'Televisores',
    'Kitchen Appliances': 'Electrodomésticos de Cocina',
    'Small Appliances': 'Pequeños Electrodomésticos',
    'Featured': 'Destacados',
    'See full catalog': 'Ver catálogo completo',
    'French Door': 'French Door',
    'Side-by-Side': 'Side-by-Side',
    'Top-Freezer': 'Congelador Superior',
    'Bottom-Freezer': 'Congelador Inferior',

    // ── Index — Hero ─────────────────────────────────────────────────────────
    'The Best Selection in Home Appliances': 'La Mejor Selección en Electrodomésticos para el Hogar',
    'Find the appliances your home needs quality, technology, and the best prices all in one place.': 'Encuentra los electrodomésticos que tu hogar necesita: calidad, tecnología y los mejores precios en un solo lugar.',
    'Shop Now': 'Comprar Ahora',
    'Go to Catalog': 'Ir al Catálogo',

    // ── Index — Section headings ─────────────────────────────────────────────
    'SHOP BY CATEGORY': 'COMPRAR POR CATEGORÍA',
    'New Arrivals': 'Nuevas Llegadas',
    'View All': 'Ver Todo',

    // ── Index — Feature badges ───────────────────────────────────────────────
    'Free Delivery': 'Envío Gratis',
    'Orders from $200': 'Pedidos desde $200',
    'Money returns': 'Devolución de dinero',
    '30 Days guarantee': 'Garantía de 30 días',
    '24/7 Supports': 'Soporte 24/7',
    'Consumer support': 'Atención al consumidor',

    // ── Index — Promo banner ─────────────────────────────────────────────────
    'ONLINE EXCLUSIVE': 'EXCLUSIVO EN LÍNEA',
    'REFRIGERATORS, SELECTED MODELS': 'REFRIGERADORAS, MODELOS SELECCIONADOS',
    '15% OFF TODAY ONLY': '15% DE DESCUENTO HOY',
    'RECOMMENDED FOR YOU': 'RECOMENDADOS PARA TI',
    'TOP NEW ARRIVAL': 'NUEVAS LLEGADAS DESTACADAS',

    // ── Product Detail ───────────────────────────────────────────────────────
    'Availability': 'Disponibilidad',
    'In Stock': 'En Stock',
    'Brand': 'Marca',
    'Category': 'Categoría',
    'Model': 'Modelo',
    'Product details': 'Detalles del producto',
    'Request Info': 'Solicitar Información',
    'Wishlist': 'Lista de deseos',
    'Quantity': 'Cantidad',
    'Back to': 'Volver a',
    'Price': 'Precio',
    'Rating': 'Calificación',
    'In Stock (product)': 'En Stock',
    'Warranty (product)': '1 Año Fabricante',
    '1 Year Manufacturer': '1 Año Fabricante',
    '4.5 / 5': '4.5 / 5',

    // ── Catalog — Controls ───────────────────────────────────────────────────
    'CATEGORIES': 'CATEGORÍAS',
    'BRANDS': 'MARCAS',
    'Sort by': 'Ordenar por',
    'Price: Low to High': 'Precio: Menor a Mayor',
    'Price: High to Low': 'Precio: Mayor a Menor',
    'Name: A-Z': 'Nombre: A-Z',
    'Name: Z-A': 'Nombre: Z-A',
    'Filters': 'Filtros',
    'View Details': 'Ver Detalles',

    // ── Footer ───────────────────────────────────────────────────────────────
    'SHOP': 'TIENDA',
    'CUSTOMER SERVICE': 'SERVICIO AL CLIENTE',
    'CONTACT': 'CONTACTO',
    'Warranty': 'Garantía',
    'Returns Policy': 'Política de Devoluciones',
    'Shipping Info': 'Información de Envío',
    'FAQ': 'Preguntas Frecuentes',
    'Your trusted source for home appliances and electronics in Hialeah, FL.': 'Tu fuente de confianza para electrodomésticos y electrónica en Hialeah, FL.',

    // ── About Us ─────────────────────────────────────────────────────────────
    'About Us Page Title': 'Nosotros',
    'About Us Hero Subtitle': 'Somos un distribuidor especializado en electrodomésticos para el hogar, comprometidos a llevar la mejor tecnología a cada familia — desde refrigeradoras y lavadoras hasta televisores inteligentes y electrodomésticos de cocina.',
    'Our Mission:': 'Nuestra Misión:',
    'Our Vision:': 'Nuestra Visión:',
    'Our Values:': 'Nuestros Valores:',
    'Mission Statement 1': 'Nuestra misión es hacer accesibles los electrodomésticos de calidad para cada familia. Seleccionamos cuidadosamente productos de las marcas líderes — Samsung, LG, Bosch, Dyson y más — garantizando que cada artículo cumple los más altos estándares de rendimiento, eficiencia energética y durabilidad.',
    'Mission Statement 2': 'Creemos que un hogar bien equipado es un hogar más feliz. Por eso vamos más allá de vender electrodomésticos — ofrecemos orientación experta para ayudar a los clientes a encontrar el producto adecuado para sus necesidades y presupuesto, respaldado por soporte post-venta confiable.',
    'Vision Statement': 'Visualizamos un futuro donde cada hogar se beneficie de electrodomésticos inteligentes y eficientes que simplifiquen la vida diaria. Nos mantenemos a la vanguardia — desde tecnología inverter y dispositivos IoT hasta refrigerantes ecológicos — para que nuestros clientes siempre tengan acceso a las últimas innovaciones a precios competitivos.',
    'Quality first.': 'Calidad primero.',
    'quality-first-desc': 'Cada electrodoméstico que vendemos está probado y certificado.',
    'Transparency.': 'Transparencia.',
    'transparency-desc': 'Precios claros, especificaciones honestas, sin tarifas ocultas.',
    'Customer focus.': 'Enfoque en el cliente.',
    'customer-focus-desc': 'Escuchamos a nuestros clientes y adaptamos nuestro catálogo para satisfacer las necesidades reales del hogar.',
    'Sustainability.': 'Sostenibilidad.',
    'sustainability-desc': 'Priorizamos productos energéticamente eficientes que reducen el impacto ambiental sin comprometer el rendimiento.',

    // ── Contact Us ───────────────────────────────────────────────────────────
    'Contact Us Page Title': 'Contáctenos',
    'Contact Us Hero Subtitle': 'Estamos aquí para ayudar. Contáctenos para cualquier pregunta sobre nuestros productos, pedidos o servicios.',
    'General Contact': 'Contacto General',
    'Support': 'Soporte',
    'Visit Us': 'Visítanos',
    'Support Description': 'Para consultas de productos, seguimiento de pedidos y soporte post-venta.',
  }
};

const LANGS = {
  en: {
    label: 'EN',
    flagSVG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-4 w-6 rounded-sm"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zM0 15h30zM30 0h30zM0 0h30v15z"/></clipPath><g clip-path="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30M60 0L0 30" clip-path="url(#b)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>`,
  },
  es: {
    label: 'ES',
    flagSVG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-4 w-6 rounded-sm"><rect width="3" height="2" fill="#c60b1e"/><rect y=".5" width="3" height="1" fill="#ffc400"/></svg>`,
  },
};

// ─── Core logic ────────────────────────────────────────────────────────────────

function getLang() {
  return localStorage.getItem('lang') || 'en';
}

function applyLang(lang) {
  localStorage.setItem('lang', lang);
  const dict = lang === 'es' ? TRANSLATIONS.es : null;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = (dict && dict[key]) ? dict[key] : key;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = (dict && dict[key]) ? dict[key] : key;
  });

  // Update dropdown button display
  const flagEl  = document.getElementById('lang-flag');
  const labelEl = document.getElementById('lang-label');
  if (flagEl)  flagEl.innerHTML  = LANGS[lang].flagSVG;
  if (labelEl) labelEl.textContent = LANGS[lang].label;

  // Highlight active option in menu
  document.querySelectorAll('.lang-option').forEach(opt => {
    const active = opt.dataset.lang === lang;
    opt.classList.toggle('bg-amber-50', active);
    opt.classList.toggle('font-semibold', active);
    opt.classList.toggle('text-violet-900', active);
  });

  // Notificar a páginas con contenido dinámico
  if (typeof window.onLangApplied === 'function') window.onLangApplied(lang);
}

// ─── Dropdown toggle ───────────────────────────────────────────────────────────

function initDropdown() {
  const toggle = document.getElementById('lang-toggle');
  const menu   = document.getElementById('lang-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      applyLang(opt.dataset.lang);
      menu.classList.add('hidden');
    });
  });

  // Close on outside click
  document.addEventListener('click', () => menu.classList.add('hidden'));
}

// ─── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initDropdown();
  applyLang(getLang());
});
