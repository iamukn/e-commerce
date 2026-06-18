 export function updateCartCount (updatedCart) {
    const cartCount = document.querySelectorAll('.cart-count')
    cartCount.forEach((item) => {
        item.innerText = `(${updatedCart.length})`
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let selectedSize = '';
    const sizes = document.querySelectorAll('.size');
    const addToCartButton = document.getElementById('add-to-cart');

    sizes.forEach(size => {
    size.addEventListener('click', () => {
        sizes.forEach(s => {
            if (s.classList.contains('bg-gray-700')) {
                s.classList.remove('bg-gray-700');
                s.style.color = 'black';
            }
        })
        size.classList.add('bg-gray-700');
        size.style.color = 'whitesmoke';
        selectedSize = size.innerText;
    });
    });


    addToCartButton.addEventListener('click', () => {
        if (!selectedSize) {
            const size_err = document.querySelector('.size-err ')
            size_err .innerText = 'Please select a size'
            setTimeout(()=> {
                size_err.innerText = '';
            }, 3000)
            return;
        }
        addToCartButton.innerText = 'Adding to Cart...';
        // add to local storage 
        const productId = addToCartButton.getAttribute('data-product-id');
        const quantityInput = document.getElementById('qty');
        const quantity = parseInt(quantityInput.value) || 1;
        let storedCart = localStorage.getItem('anisa_the_brand_cart')
        const cart = storedCart ? JSON.parse(storedCart) : [];
        const existingItemIndex = cart.findIndex(item => (item.productId === parseInt(productId) && item.size.toUpperCase() === selectedSize.toUpperCase()));

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ productId: Number(productId), quantity: quantity, image: addToCartButton.getAttribute('data-product-image'), size: selectedSize.toUpperCase(), name: addToCartButton.getAttribute('data-product-name'), price: addToCartButton.getAttribute('data-product-price') });
        }

        localStorage.setItem('anisa_the_brand_cart', JSON.stringify(cart));
        addToCartButton.innerText = 'Added to Cart✅!';
    
        // update the cart count on the frontend
        
        storedCart = localStorage.getItem('anisa_the_brand_cart')
        const updatedCart = storedCart ? JSON.parse(storedCart) : [];
        updateCartCount(updatedCart)
        setTimeout(() => {
            addToCartButton.innerText = 'Add to Cart';
        }, 2000);
    });

})