const productList = document.querySelector('.product-list');

function createHTMLNodes(product) {
    const productElements = {
        cardContainer: document.createElement('div'),
        cardImageContainer: document.createElement('dd'),
        cardImage: document.createElement('img'),
        cardTitle: document.createElement('dt'),
        cardText: document.createElement('p'),
        cardButton: document.createElement('button'),
        cardButtonImg: document.createElement('img'),
    };
    setClasses(productElements);
    setValues(productElements, product);
    appendNodes(productElements);
}

function setClasses(HTMLNodes) {
    HTMLNodes.cardContainer.className = 'product-card';
    HTMLNodes.cardImageContainer.className = 'product-card-content';
    HTMLNodes.cardImage.className = 'product-img';
    HTMLNodes.cardTitle.className = 'product-name';
    HTMLNodes.cardText.className = 'product-price';
    HTMLNodes.cardButton.className = 'remove-button';
}

function setValues(productElements, product) {
    productElements.cardImage.setAttribute('src', product.image);
    productElements.cardImage.setAttribute('alt', product.title);
    productElements.cardTitle.innerText = product.title;
    productElements.cardText.innerText = `$${product.price}`;
    productElements.cardButtonImg.setAttribute('src', './assets/trash.svg');
    productElements.cardButtonImg.setAttribute('alt', 'trash');
}

function appendNodes(productElements) {
    productElements.cardImageContainer.appendChild(productElements.cardImage);
    productElements.cardButton.appendChild(productElements.cardButtonImg);    
    productElements.cardContainer.append(productElements.cardImageContainer, productElements.cardTitle, productElements.cardText, productElements.cardButton);
    productList.appendChild(productElements.cardContainer);
}

function renderMessageOnEmptyList() {
    const messageOnEmptyList = document.createElement('p');
    messageOnEmptyList.innerText = 'Usa el formulario para agregar tus primeros productos';
    productList.appendChild(messageOnEmptyList);
}

async function getProducts() {
    let products = await fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(json => json)
    if (products.length == 0) renderMessageOnEmptyList()
    else products.forEach(product => createHTMLNodes(product));
}

getProducts();
