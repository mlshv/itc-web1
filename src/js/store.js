function renderStoreInfo() {
    const uuid = getQueryParams().uuid;
    if (uuid) {
        fetchJSON(`store?uuid=${uuid}`).then(response => {
            const { title, largeHeroImageUrl } = response.payload;
            console.log(response.payload);
            document.querySelector('#storeName').innerHTML = title;
            document.querySelector('#imageContainer').innerHTML = `
                <img src="${largeHeroImageUrl}" />
            `;
        });
    }
}

renderStoreInfo();
