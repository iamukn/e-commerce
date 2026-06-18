import { updateCartCount } from "./details.js";
import { formatCurrency } from "./formatCurrency.js";

export function calcTotal() {
        let cartData = JSON.parse(localStorage.getItem('anisa_the_brand_cart')) || [];
        let total = 0;

        cartData.forEach(data => {
            total += parseInt(data.price) * parseInt(data.quantity)
        })

        const formattedTotal = formatCurrency( total)

        return {total: formattedTotal, subTotal: formattedTotal, actualTotal: total}
    }

export function calcGrandTotal (subTotal, shippingFee) {
    const total = subTotal + shippingFee
    return formatCurrency(total)
}

document.addEventListener('DOMContentLoaded', () => {


    // 1. Grab the container immediately when the DOM loads
    const cartCtn = document.querySelector('.cart-ctn');

    // calculate subTotal and total



    // 2. DEFINE THE RENDERING FUNCTION ONLY
    function renderCart() {
        const cartItems = localStorage.getItem('anisa_the_brand_cart');
        const cartCount = cartItems ? JSON.parse(cartItems) : [];
        const emptyCartDiv = document.querySelector('.empty-cart'); // Not used right now but safe here

        if (cartCount.length === 0) {
            const htmlString = `<div class="text-center space-y-6 empty-cart">
              <h1 class="font-serif text-4xl sm:text-5xl font-light tracking-tighter">Your Cart</h1>
              <p class="text-sm font-light text-muted-foreground max-w-[35ch] mx-auto">
                Your cart is empty. Discover pieces that define your silhouette.
              </p>
              <button type="button" class="px-6 py-3 bg-foreground hover:bg-gray-700 text-white text-sm font-light rounded-sm bg-gray-800 transition-colors duration-300">
                <a href="/shop">Continue Shopping</a>
              </button>
            </div>`;
            cartCtn.innerHTML = htmlString;
            return; // Exits renderCart cleanly
        } else {
            const addedItems = cartCount.map((item) => `<div class="flex gap-4 w-full border-t border-border pt-4" key=${item?.productId}> 
                    <div class="flex-shrink-0">
                        <img src="${item?.image}" alt="${item?.name}" class="w-[70px] h-[90px] object-cover" />
                    </div>
                    
                    <div class="flex flex-col w-full">
                        <h2 class="text-[10px] uppercase tracking-[0.2em] font-bold pb-2">${item?.name}</h2>
                        
                        <div class="flex justify-between items-center w-full pb-2">
                            <h2 class="text-[10px] uppercase tracking-[0.2em]">SIZE: ${item?.size}</h2>
                            <!-- Added pointer-events-none inside <i> so clicks hit the button directly -->
                            <button item-id="${item?.productId}" item-size=${item?.size} class="text-[10px] trash uppercase tracking-[0.2em] hover:text-red-500 cursor-pointer">
                                <i class="fa-solid fa-trash pointer-events-none"></i>
                            </button>
                        </div>
                        
                        <div class="flex justify-between items-center w-full pt-2">
                            <div class="flex justify-center items-center gap-2">
                                <h2 class="text-[10px] uppercase tracking-[0.2em]">QTY</h2>
                                <input item-id="${item?.productId}" type="number" min="1" item-size=${item?.size} value="${item?.quantity}" id="qty" class="border qty rounded-sm py-1 px-2 focus:outline-none w-[3.5rem] h-[2rem] text-sm">
                            </div>
                            <h2  class="text-[18px] qty-input uppercase tracking-[0.2em]"><span itemQty-id="${item?.productId}-${item?.size}">${formatCurrency( item?.price * item?.quantity)}</span></h2>
                        </div>
                    </div>
                </div>`
            ).join('');

            const htmlString = `<div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 w-full px-4 sm:px-6">
            
            <div class="lg:col-span-2 flex flex-col w-full">
                <h1 class="font-serif text-4xl sm:text-6xl font-light tracking-tighter mb-8 sm:mb-16">Your Cart</h1>
                ${addedItems}
            </div>
            
            <aside class="lg:sticky lg:top-8 lg:self-start space-y-6 border-t lg:border-t-0 border-border pt-8 lg:pt-0">
                <h2 class="text-[10px] uppercase tracking-[0.2em] font-medium">Order Summary</h2>
                <div class="space-y-3 text-sm font-light">
                    <div class="flex justify-between"><span>Subtotal</span><span class="tabular-nums subTotal">${calcTotal()?.subTotal}</span></div>
                    <div class="flex justify-between gap-4"><span class="text-muted-foreground">Shipping</span><span class="text-muted-foreground text-right">Calculated at checkout</span></div>
                    <div class="flex justify-between"><span>Taxes</span><span class="text-muted-foreground">Included</span></div>
                </div>
                
                <div class="border-t border-border pt-4 flex justify-between text-base font-light">
                    <span>Total</span><span class="tabular-nums total">${calcTotal()?.total}</span>
                </div>
                
                <button type="button" class="w-full bg-black text-white rounded-none h-14 text-[10px] uppercase tracking-[0.2em] font-normal hover:bg-neutral-800 transition-colors">
                    <a href="/checkout" class="block w-full h-full content-center ">Proceed to Checkout</a>
                </button>
                
                <a href="/shop" class="block text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors underline">Continue Shopping</a>
            </aside>

            </div>
            </div>`;
            
            cartCtn.innerHTML = htmlString;
            return; // Exits renderCart cleanly
        }
    } // <--- NOTICE THIS BRACE: renderCart function ends right here!

    // 3. LISTEN FOR CLICKS SEPARATELY (It will now run on page load)
    cartCtn.addEventListener('click', (event) => {
        const trashButton = event.target.closest('.trash');
        const qtyButton = event.target.closest('.qty');
        
        
        if (trashButton) {
            const productId = trashButton.getAttribute('item-id');
            const productSize = trashButton.getAttribute('item-size');
            let cart = JSON.parse(localStorage.getItem('anisa_the_brand_cart')) || [];
            // Filter out the targeted product
            cart = cart.filter(item => !(item.productId === parseInt(productId) && item.size.toUpperCase() === productSize.toUpperCase()));
            // Update localStorage
            localStorage.setItem('anisa_the_brand_cart', JSON.stringify(cart));
            
            // update the cart count 
            updateCartCount(cart)
            // Re-render instantly
            renderCart();
        } else if (qtyButton) {
            
            const productId = qtyButton.getAttribute('item-id');
            const productSize = qtyButton.getAttribute('item-size');
            let cart = JSON.parse(localStorage.getItem('anisa_the_brand_cart')) || [];
            const qtyInput = document.querySelector(`[itemQty-id="${productId}-${productSize}"]`)
            const price = cart.filter(x => x.productId === parseInt(productId))[0].price
            qtyInput.innerText = formatCurrency(price * parseInt(qtyButton.value))
            // Filter out the targeted product
            cart = cart.map((item) => {
                if (item.productId === parseInt(productId) && item.size.toUpperCase() === productSize.toUpperCase()) {
                        return {
                        ...item,
                        quantity: JSON.stringify(parseInt(qtyButton.value))
                        };
                }
                return item
            });
            
            // // // Update localStorage
            localStorage.setItem('anisa_the_brand_cart', JSON.stringify(cart));

            // updated the subtotal and total too
            const totalCtn = document.querySelector('.total')
            const subTotalCtn = document.querySelector('.subTotal')
            const { total, subTotal } = calcTotal();

            totalCtn.innerText = total;
            subTotalCtn.innerText = total;

        }


    });

    // 4. RUN THE INITIAL RENDER TO POPULATE THE SCREEN
    renderCart();

});