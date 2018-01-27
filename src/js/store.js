function renderCategories(categories) {
    if (categories.length) {
        const categoriesHTML = categories
            .map(category => category.name)
            .join(', ');

        document.querySelector(
            '#categories'
        ).innerHTML = `Категории: ${categoriesHTML}`;
    }
}

function renderMealCard({ title, description, image, price }) {
    const imageHTML = image
        ? `<img class="meal-card__image" src="${image}" />`
        : '';
    return `
        <div class="meal-card">
            <div>
                <h3 class="meal-card__title">${title}</h3>
                <p class="meal-card__description">${description}</p>
                <p class="meal-card__price">${price}</p>
                <button class="meal-card__button">В заказ</button>
            </div>
            ${imageHTML}
        </div>
    `;
}

function renderMenu(menu) {
    const menuHTML = menu.reduce((mealCards, mealObj) => {
        return mealCards + renderMealCard(mealObj);
    }, '');

    document.querySelector('#menu').innerHTML = menuHTML;
}

function yaMapsReady() {
    return new Promise(resolve => {
        load().then(() => {
            return new Promise(() => ymaps.ready(resolve));
        });
    });
}

function renderMap({ latitude, longitude }) {
    console.log(latitude, longitude);
    yaMapsReady().then(() => {
        const map = new ymaps.Map('map', {
            center: [latitude, longitude],
            controls: [
                'zoomControl',
                'geolocationControl',
                'fullscreenControl'
            ],
            zoom: 14
        });

        const placemark = new ymaps.Placemark([latitude, longitude]);

        map.geoObjects.add(placemark);
    });
}

function renderStoreInfo() {
    const uuid = getQueryParams().uuid;
    if (uuid) {
        fetchJSON(`store?uuid=${uuid}`).then(response => {
            const {
                title,
                largeHeroImageUrl,
                etaRange,
                priceBucket,
                sellsAlcohol,
                categories,
                menu,
                location
            } = response.payload;
            console.log(response.payload);
            document.querySelector('#storeName').innerHTML = title;
            document.querySelector('#imageContainer').innerHTML = `
                <img src="${largeHeroImageUrl}" />
            `;
            document.querySelector('#deliveryTime').innerHTML = `${
                etaRange.min
            }-${etaRange.max} мин`;

            const prices = ['недорого', 'средний', 'дорого'];
            document.querySelector('#prices').innerHTML =
                prices[priceBucket.length - 1];

            document.querySelector('#sellsAlcohol').innerHTML = sellsAlcohol
                ? 'Да'
                : 'Нет';

            renderCategories(categories);
            renderMenu(menu);
            renderMap(location);
        });
    }
}

renderStoreInfo();
