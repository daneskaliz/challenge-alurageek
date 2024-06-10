const products = [
    { title: 'Colección Marvel vs DC', price: 250, image: './assets/comics.jpg' },
    { title: 'Control de Super Nintendo', price: 75, image: './assets/control.jpg' },
    { title: 'El perro de Superman', price: 25, image: './assets/dog.jpg' },
    { title: 'Game Boy', price: 75, image: './assets/game-boy.jpg' },
    { title: 'Son Goku', price: 7, image: './assets/goku.jpg' },
    { title: 'Pikachu Tejido', price: 5, image: './assets/pikachu.jpg' },
    { title: 'Playstation', price: 100, image: './assets/ps.jpg' },
    { title: 'Mascota virtual', price: 10, image: './assets/vpet.jpg' },
];
const productList = document.querySelector('.product-list');
const productForm = document.querySelector('.product-form');
const clearButton = document.querySelector('.clear-button');
const nameField = document.getElementById('name-field');
const priceField = document.getElementById('price-field');
const imageField = document.getElementById('img-field');

function createHTMLNodes(productData) {
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
    setValuesAndAttributes(productElements, productData);
    renderProduct(productElements);
}

function setClasses(HTMLNodes) {
    HTMLNodes.cardContainer.className = 'product-card';
    HTMLNodes.cardImageContainer.className = 'product-card-content';
    HTMLNodes.cardImage.className = 'product-img';
    HTMLNodes.cardTitle.className = 'product-name';
    HTMLNodes.cardText.className = 'product-price';
    HTMLNodes.cardButton.className = 'remove-button';
}

function setValuesAndAttributes(productElements, product) {
    productElements.cardImage.setAttribute('src', product.image);
    productElements.cardImage.setAttribute('alt', product.title);
    productElements.cardTitle.innerText = product.title;
    productElements.cardText.innerText = `$${product.price}`;
    productElements.cardButtonImg.setAttribute('src', './assets/trash.svg');
    productElements.cardButtonImg.setAttribute('alt', 'trash');
    productElements.cardButton.addEventListener('click', removeProduct)
    productElements.cardButton.value = product.title;
}

function renderProduct(productElements) {
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
    const productsFromAPI = await fetch('https://fakestoreapi.com/products/category/electronics')
        .then(response => response.json())
        .then(json => json)
    if (productsFromAPI.length > 0) products.push(...productsFromAPI)
    products.forEach(product => createHTMLNodes(product));
}

function validateFields(productData) {
    const formIsInvalid = productData.includes(null) || productData.includes(undefined) || productData.includes('');
    return formIsInvalid;
}

function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(productForm);
    const { name: title, price, 'img-url': image } = Object.fromEntries(formData);
    const formIsInvalid = validateFields([title, price, image]);
    if (formIsInvalid) return alert('Por favor complete todos los campos para agregar el producto.')
    fetch('https://fakestoreapi.com/products', {
            method:"POST",
            body:JSON.stringify(title, price, image)
        })
            .then(() => {
                createHTMLNodes({ title, price, image })
                clearForm();
                alert('Producto agregado!')
            })
            .catch(() => alert('Lo sentimos, ocurrió un error.'))
}

function clearForm() {
    nameField.value = '';
    priceField.value = '';
    imageField.value = '';
}

function removeProduct(e) {
    const deletionConfirmed = confirm('¿Deseas eliminar este producto?')
    if (!deletionConfirmed) return;
    const productTitle = e.target.value;
    const index = products.findIndex(p => p.title == productTitle);
    const productCards = document.getElementsByClassName('product-card')
    const element = productCards.item(index);
    element.remove();
    products.splice(index, 1);
    if (products.length == 0) renderMessageOnEmptyList();
}

getProducts();

productForm.addEventListener('submit', submitForm);
clearButton.addEventListener('click', clearForm);
