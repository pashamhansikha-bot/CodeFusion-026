/* ============ Ruchulu Junction — Food Photo Loader ============ */
/*
  Replaces food-item emojis with real photos, fetched at runtime from free,
  no-key-required public APIs:
    1) TheMealDB   (https://www.themealdb.com)        — dish-specific photos
    2) Wikimedia Commons search API                    — fallback for dishes
                                                          TheMealDB doesn't have
  If neither API returns a usable photo (e.g. the user is offline, or a very
  niche dish has no match), a plain letter tile is shown instead — never an
  emoji.

  Results are cached in localStorage so each dish is only ever looked up once
  per browser.

  Optional: if you want higher-quality, more accurate photos, sign up for a
  free Unsplash API key (https://unsplash.com/developers) and set it below.
  Everything works fine without one.
*/
const UNSPLASH_ACCESS_KEY = ''; // optional — paste a free Unsplash Access Key here

const IMG_CACHE_KEY = 'ruchulu_img_cache_v1';

function getImgCache(){
  try{ return JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || '{}'); }
  catch(e){ return {}; }
}
function saveImgCache(cache){
  try{ localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(cache)); }
  catch(e){ /* storage full or unavailable — ignore, just refetch next time */ }
}

async function fetchUnsplashImage(query){
  if(!UNSPLASH_ACCESS_KEY) return null;
  try{
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query+' food')}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;
    const res = await fetch(url);
    if(!res.ok) return null;
    const data = await res.json();
    const first = data && data.results && data.results[0];
    return first ? first.urls.small : null;
  }catch(e){ return null; }
}

async function fetchMealDBImage(query){
  try{
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    if(!res.ok) return null;
    const data = await res.json();
    const meal = data && data.meals && data.meals[0];
    return meal ? meal.strMealThumb + '/medium' : null;
  }catch(e){ return null; }
}

async function fetchWikimediaImage(query){
  try{
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query+' food')}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=500`;
    const res = await fetch(url);
    if(!res.ok) return null;
    const data = await res.json();
    const pages = data && data.query && data.query.pages;
    if(!pages) return null;
    const first = Object.values(pages)[0];
    const info = first && first.imageinfo && first.imageinfo[0];
    return info ? (info.thumburl || info.url) : null;
  }catch(e){ return null; }
}

/* Tries each source in order, stops at the first hit, caches the winner. */
async function getFoodImageUrl(item){
  const cache = getImgCache();
  if(cache[item.id]) return cache[item.id];

  const query = item.imgQuery || item.name;
  let url = await fetchUnsplashImage(query);
  if(!url) url = await fetchMealDBImage(query);
  if(!url) url = await fetchWikimediaImage(query);

  if(url){ cache[item.id] = url; saveImgCache(cache); }
  return url;
}

function foodInitials(name){
  const letters = name.split(' ')
    .map(w => w.replace(/[^A-Za-z]/g, ''))
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase());
  return letters.join('') || '•';
}

function renderFoodPlaceholder(el, item){
  el.innerHTML = '';
  el.classList.add('img-pending');
  const span = document.createElement('span');
  span.className = 'img-fallback';
  span.textContent = foodInitials(item.name);
  el.appendChild(span);
}

function renderFoodPhoto(el, item, url){
  el.innerHTML = '';
  el.classList.remove('img-pending');
  const img = document.createElement('img');
  img.src = url;
  img.alt = item.name;
  img.loading = 'lazy';
  img.addEventListener('error', () => renderFoodPlaceholder(el, item));
  el.appendChild(img);
}

/*
  Call this after rendering any markup that contains elements like:
    <div class="card-emoji" data-food-img="b1"></div>
  It fills every matching element for the given items — a letter tile first,
  then swaps in a real photo as soon as one is found.
*/
function initFoodImages(items){
  items.forEach(item => {
    document.querySelectorAll(`[data-food-img="${item.id}"]`).forEach(el => {
      renderFoodPlaceholder(el, item);
    });
  });
  items.forEach(item => {
    getFoodImageUrl(item).then(url => {
      if(!url) return;
      document.querySelectorAll(`[data-food-img="${item.id}"]`).forEach(el => {
        renderFoodPhoto(el, item, url);
      });
    });
  });
}
