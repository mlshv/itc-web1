function show(elemId) {
    var elem = document.querySelector(`#${elemId}`);
    if (elem) {
        elem.classList.remove('hidden');
    }
}

function hide(elemId) {
    var elem = document.querySelector(`#${elemId}`);
    if (elem) {
        elem.classList.add('hidden');
    }
}

function renderMarketplaceCard({ uuid, title, heroImageUrl }) {
    const card = `
        <div class="store-card">
            <a class="store-card__base" href="store.html?uuid=${uuid}">
                <img src="${heroImageUrl}">
                <h3>${title}</h3>
            </a>
        </div>
    `;
    return card;
}

function renderStoresList() {
    hide('mapContainer');
    fetchJSON('stores').then(response => {
        const { stores } = response.payload;
        const html = stores.map(renderMarketplaceCard).join('');
        document.querySelector('#list').innerHTML = html;
        show('list');
    });
}

function addPlacemark(map, coodrinates, title) {
    const placemark = new ymaps.Placemark(coodrinates, {
        hintContent: title,
        balloonContent: title
    });

    map.geoObjects.add(placemark);
}

let yaMap;
function renderStoresMap() {
    hide('list');
    fetchJSON('locations').then(response => {
        show('mapContainer');
        const locations = response.payload;
        if (!yaMap) {
            yaMap = new ymaps.Map('map', {
                center: [55.76, 37.62],
                controls: [
                    'zoomControl',
                    'geolocationControl',
                    'fullscreenControl'
                ],
                zoom: 13
            });
        }

        locations.map(location => {
            addPlacemark(yaMap, [location.latitude, location.longitude]);
        });
    });
}

renderStoresList();
