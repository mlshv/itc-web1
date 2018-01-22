function fetchStores() {
    return fetch('http://localhost:3001/stores').then(response =>
        response.json()
    );
}

function renderMarketplaceCard({ title, heroImageUrl, link }) {
    const card = `
        <div class="store-card">
            <a class="store-card__base" href="${link}">
                <img src="${heroImageUrl}">
                <h3>${title}</h3>
            </a>
        </div>
    `;
    return card;
}

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

function renderStoresList() {
    hide('mapContainer');
    fetchStores().then(stores => {
        show('list');
        const storesParsed = Object.values(stores);
        const html = storesParsed.map(renderMarketplaceCard).join('');
        document.querySelector('#list').innerHTML = html;
    });
}

function addPlacemark(map, coodrinates, title) {
    var placemark = new ymaps.Placemark(coodrinates, {
        hintContent: title,
        balloonContent: title
    });

    map.geoObjects.add(placemark);
}

var yaMap;
function renderStoresMap() {
    hide('list');
    fetchStores().then(stores => {
        show('mapContainer');
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

        Object.values(stores).map(store => {
            addPlacemark(
                yaMap,
                [store.location.latitude, store.location.longitude],
                store.title
            );
            console.log(store.location);
        });
    });
}
