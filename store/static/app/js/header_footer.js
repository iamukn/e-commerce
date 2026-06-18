document.addEventListener('DOMContentLoaded', () => {

    // get the cart
    const cart = localStorage.getItem('anisa_the_brand_cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    const cartCount = document.querySelectorAll('.cart-count');
    
    cartCount.forEach((item) => {
        item.innerText = `(${cartItems.length})`;
    })

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const copyright = document.querySelector(".copyright");
    const date = new Date();
    const year = date.getFullYear();

    copyright.innerText += ` ${year} ANISA THE BRAND`;
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
})
