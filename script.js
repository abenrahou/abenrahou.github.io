let cartItems = [];

// Fonction pour ajouter un produit au panier
function addToCart(productName, price, addButton) {
    // Récupérer le panier depuis le stockage local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Créer un objet représentant le produit à ajouter au panier
    const product = {
        name: productName,
        price: price,
        quantity: 1 // Initialiser la quantité à 1
    };

    // Ajouter le produit au panier
    cart.push(product);

    // Enregistrer le panier dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartDisplay();

    // Ajouter une classe d'animation au bouton "Ajouter au panier"
    addButton.classList.add('button-click-animation');

    // Ajouter une classe d'animation à l'image du produit associé au bouton
    const productImage = addButton.parentNode.querySelector('img');
    productImage.classList.add('rotate-on-add');

    // Retirer les classes d'animation après un certain délai
    setTimeout(() => {
        addButton.classList.remove('button-click-animation');
        productImage.classList.remove('rotate-on-add');
    }, 500); // Durée de l'animation en millisecondes
}

// Fonction pour supprimer un produit du panier
function removeFromCart(index) {
    // Récupérer le panier depuis le stockage local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Supprimer le produit correspondant à l'index spécifié
    cart.splice(index, 1);

    // Enregistrer le panier mis à jour dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartDisplay();
}

// Fonction pour calculer le total du prix des articles dans le panier
function calculateTotalPrice() {
    // Récupérer le panier depuis le stockage local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let totalPrice = 0;
    
    // Parcourir tous les produits dans le panier et ajouter leur prix total au total
    cart.forEach(product => {
        totalPrice += product.price * product.quantity; // Multiplier le prix par la quantité de chaque produit et l'ajouter au total
    });

    return totalPrice.toFixed(2); // Retourner le total avec deux décimales
}

// Fonction pour mettre à jour l'affichage du panier avec le total du prix des articles
function updateCartDisplay() {
    // Vérifier si la page actuelle est "cart.html" pour afficher le panier
    const cartDisplay = document.querySelector('.cart-items');
    if (cartDisplay) {
        // Supprimer tous les éléments enfants de l'élément cartDisplay pour éviter les duplications
        cartDisplay.innerHTML = '';

        // Récupérer le panier depuis le stockage local
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Parcourir tous les produits dans le panier
        cart.forEach((product, index) => {
            // Créer un élément HTML pour afficher le produit dans le panier
            const productItem = document.createElement('div');
            productItem.classList.add('cart-item');

            // Remplir le contenu de l'élément productItem avec les informations du produit et les boutons + et -
            productItem.innerHTML = `
                <span>${product.name}</span>
                <span>${product.price} €</span>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="quantity-btn increase-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-from-cart" onclick="removeFromCart(${index})">Supprimer</button>
            `;

            // Ajouter l'élément productItem à l'élément cartDisplay
            cartDisplay.appendChild(productItem);
        });

        // Mettre à jour le total du prix des articles dans le panier
        const totalPriceDisplay = document.getElementById('total-price');
        totalPriceDisplay.textContent = calculateTotalPrice(); // Appel de la fonction pour calculer le total du prix des articles
    }
}

// Appeler la fonction updateCartDisplay() pour mettre à jour l'affichage du panier lors du chargement de la page
updateCartDisplay();

// Fonction pour vider le panier
function clearCart() {
    localStorage.removeItem('cart');
    // Mettre à jour l'affichage du panier après avoir vidé le panier
    updateCartDisplay();
}

// Fonction pour augmenter la quantité du produit
function increaseQuantity(index) {
    // Récupérer le panier depuis le stockage local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Augmenter la quantité du produit correspondant à l'index spécifié
    cart[index].quantity++;
    // Enregistrer le panier mis à jour dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));
    // Mettre à jour l'affichage du panier
    updateCartDisplay();
}

// Fonction pour diminuer la quantité du produit
function decreaseQuantity(index) {
    // Récupérer le panier depuis le stockage local
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Vérifier si la quantité est supérieure à 1 avant de la diminuer
if (cart[index].quantity > 1) {
// Diminuer la quantité du produit correspondant à l'index spécifié
cart[index].quantity--;
// Enregistrer le panier mis à jour dans le stockage local
localStorage.setItem('cart', JSON.stringify(cart));
// Mettre à jour l'affichage du panier
updateCartDisplay();
}
}
