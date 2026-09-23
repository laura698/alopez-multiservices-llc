/**
 * update-products.mjs
 *
 * Lee el Excel "catalogo-julio-cash-electronic.xlsx" y actualiza
 * automáticamente las páginas HTML de cada categoría.
 *
 * USO:
 *   1. npm install xlsx        (solo la primera vez)
 *   2. Pon el Excel en la raíz del proyecto
 *   3. node update-products.mjs
 */

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// ─── Configuración ────────────────────────────────────────────────────────────

const EXCEL_PATH = './catalogo-julio-cash-electronic.xlsx';
const SRC_DIR    = './src';

// Mapa: nombre de hoja Excel → archivo HTML
const HOJA_A_HTML = {
  'Washing Machines':  'category-washing-machines.html',
  'Refrigerators':     'category-refrigerators.html',
  'Air Conditioners':  'category-air-conditioners.html',
  'Televisions':       'category-televisions.html',
  'Kitchen Appliances':'category-kitchen-appliances.html',
  'Small Appliances':  'category-small-appliances.html',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcDescuento(precio, precioOriginal) {
  if (!precioOriginal || precioOriginal <= precio) return null;
  return Math.round((1 - precio / precioOriginal) * 100);
}

function estrellasSVG(rating) {
  const star = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-yellow-400"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"/></svg>`;
  const starGray = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-gray-300"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"/></svg>`;
  const llenas  = Math.round(rating);
  const vacias  = 5 - llenas;
  return star.repeat(llenas) + starGray.repeat(vacias);
}

function formatPrecio(n) {
  return '$' + Number(n).toLocaleString('en-US');
}

function generarTarjeta(producto, slug = '') {
  const {
    Nombre, 'Precio (USD)': Precio, 'Precio Original (USD)': precioOrig,
    'Imagen (nombre archivo)': imagen, 'Rating (1-5)': Rating, 'Num Reviews': reviews,
    'URL Detalle': url, Marca, Modelo, Descripcion
  } = producto;

  if (!Nombre) return '';   // fila vacía

  const desc = calcDescuento(Precio, precioOrig);
  const imgExists = imagen && fs.existsSync(path.join(SRC_DIR, 'assets/images', imagen));

  // Construir URL dinámica con parámetros del producto
  const p = new URLSearchParams();
  p.set('n', Nombre);
  if (Precio)      p.set('p', Precio);
  if (precioOrig)  p.set('po', precioOrig);
  if (imagen)      p.set('img', imagen);
  if (Marca)       p.set('b', Marca);
  if (Modelo)      p.set('m', Modelo);
  if (Descripcion) p.set('d', String(Descripcion).slice(0, 400));
  if (Rating)      p.set('r', Rating);
  if (reviews)     p.set('rv', reviews);
  if (slug)        p.set('cat', slug);
  const href = `product-detail.html#${p.toString()}`;

  const imgBlock = imgExists ? `
              <div class="relative flex h-56 overflow-hidden">
                <img class="h-full w-full object-contain" src="./assets/images/${imagen}" alt="${Nombre}" />${desc ? `
                <div class="absolute right-1 mt-3 flex items-center justify-center bg-amber-400">
                  <p class="px-2 py-2 text-sm">&minus; ${desc}% OFF</p>
                </div>` : ''}
              </div>` : '';

  return `
            <div class="flex flex-col border rounded overflow-hidden">${imgBlock}
              <div class="p-3">
                <p class="mt-2 text-sm uppercase font-medium">${Nombre}</p>
                <p class="font-medium text-violet-900">${formatPrecio(Precio)}${precioOrig ? ` <span class="text-sm text-gray-500 line-through">${formatPrecio(precioOrig)}</span>` : ''}</p>
                <div class="flex items-center">${estrellasSVG(Rating || 0)}<p class="text-sm text-gray-400 ml-1">(${reviews || 0})</p></div>
                <a href="${href}" class="mt-3 flex h-10 w-full items-center justify-center bg-violet-900 text-white text-sm hover:bg-violet-800 duration-100"><span data-i18n="View Details">View Details</span></a>
              </div>
            </div>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(EXCEL_PATH)) {
  console.error(`❌ No se encontró el archivo: ${EXCEL_PATH}`);
  console.error('   Asegúrate de que el Excel esté en la raíz del proyecto.');
  process.exit(1);
}

const wb = XLSX.readFile(EXCEL_PATH);
let actualizados = 0;

// ─── Mapa hoja → data-category slug ──────────────────────────────────────────
const HOJA_A_SLUG = {
  'Washing Machines':   'washing-machines',
  'Refrigerators':      'refrigerators',
  'Air Conditioners':   'air-conditioners',
  'Televisions':        'televisions',
  'Kitchen Appliances': 'kitchen-appliances',
  'Small Appliances':   'small-appliances',
};

function inyectarProductos(htmlPath, tarjetas, label) {
  const START = '<!-- PRODUCTOS:START -->';
  const END   = '<!-- PRODUCTOS:END -->';
  let html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes(START) || !html.includes(END)) {
    console.warn(`⚠️  Marcadores no encontrados en ${path.basename(htmlPath)} — saltando`);
    return false;
  }
  const before = html.indexOf(START) + START.length;
  const after  = html.indexOf(END);
  html = html.slice(0, before) + tarjetas + '\n            ' + html.slice(after);
  fs.writeFileSync(htmlPath, html);
  console.log(`✅ ${label}`);
  return true;
}

// ─── 1. Actualizar páginas de categoría ──────────────────────────────────────
const todosLosProductos = [];

for (const [hoja, htmlFile] of Object.entries(HOJA_A_HTML)) {
  const ws = wb.Sheets[hoja];
  if (!ws) { console.warn(`⚠️  Hoja no encontrada: "${hoja}"`); continue; }

  const productos = XLSX.utils.sheet_to_json(ws);
  if (productos.length === 0) { console.warn(`⚠️  Hoja "${hoja}" vacía`); continue; }

  const htmlPath = path.join(SRC_DIR, htmlFile);
  if (!fs.existsSync(htmlPath)) { console.warn(`⚠️  No encontrado: ${htmlFile}`); continue; }

  const slug = HOJA_A_SLUG[hoja];
  const tarjetas = productos.map(p => generarTarjeta(p, slug)).filter(Boolean).join('');
  if (inyectarProductos(htmlPath, tarjetas, `${htmlFile} — ${productos.length} productos`)) {
    actualizados++;
    todosLosProductos.push({ hoja, slug: HOJA_A_SLUG[hoja], productos });
  }
}

// ─── 2. Actualizar catalog.html ───────────────────────────────────────────────
const catalogPath = path.join(SRC_DIR, 'catalog.html');
if (fs.existsSync(catalogPath)) {
  // Generar tarjetas de todas las categorías con data-category
  const tarjetasCatalog = todosLosProductos.map(({ slug, productos }) =>
    productos.map(p => {
      const card = generarTarjeta(p, slug);
      // Add data-category to the outer div
      return card.replace('<div class="flex flex-col border rounded overflow-hidden">', `<div class="flex flex-col border rounded overflow-hidden" data-category="${slug}">`);
    }).filter(Boolean).join('')
  ).join('');

  if (inyectarProductos(catalogPath, tarjetasCatalog, `catalog.html — ${todosLosProductos.reduce((a, c) => a + c.productos.length, 0)} productos totales`)) {
    // Update category counts in sidebar
    let html = fs.readFileSync(catalogPath, 'utf8');
    for (const { slug, productos } of todosLosProductos) {
      html = html.replace(
        new RegExp(`(data-category="${slug}"[\\s\\S]{1,200}?text-gray-500">)\\(\\d+\\)`),
        `$1(${productos.length})`
      );
    }
    fs.writeFileSync(catalogPath, html);
    console.log('   ↳ Conteos de categorías actualizados');
    actualizados++;
  }
}

// ─── 3. Generar image-map.js para product-detail.html ────────────────────────
const imgDir = path.join(SRC_DIR, 'assets/images');
const imageMapPath = path.join(SRC_DIR, 'assets/js/image-map.js');

// Recopilar todas las imágenes de productos usadas en el Excel
const imagenesUsadas = new Set();
for (const { productos } of todosLosProductos) {
  for (const p of productos) {
    const img = p['Imagen (nombre archivo)'];
    if (img && fs.existsSync(path.join(imgDir, img))) imagenesUsadas.add(img);
  }
}
// Añadir imágenes de categoría como fallback
['cat-washing-machines.jpg','cat-refrigerators.jpg','cat-air-conditioners.jpg',
 'cat-televisions.jpg','cat-kitchen-appliances.jpg','cat-small-appliances.jpg']
  .forEach(f => imagenesUsadas.add(f));

const entries = [...imagenesUsadas].sort()
  .map(f => `  '${f}': new URL('../images/${f}', import.meta.url).href,`)
  .join('\n');

const imageMapContent = `// Auto-generado por update-products.mjs — no editar manualmente\nexport const IMAGES = {\n${entries}\n};\n`;
fs.writeFileSync(imageMapPath, imageMapContent);
console.log(`✅ image-map.js — ${imagenesUsadas.size} imágenes indexadas`);
actualizados++;

console.log(`\n🎉 Listo. ${actualizados} páginas actualizadas.`);
console.log('   Recuerda ejecutar "npm run build" para reflejar los cambios en el sitio.');