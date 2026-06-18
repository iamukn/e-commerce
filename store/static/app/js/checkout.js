import { formatCurrency } from "./formatCurrency.js";
import { calcTotal, calcGrandTotal } from "./cart.js";

document.addEventListener('DOMContentLoaded', () => {
    // get the cart items
    const cart = localStorage.getItem('anisa_the_brand_cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    const nothingToCheckout = document.querySelector('.nothing-to-checkout')

    const shippingFee = 4500

    // display the no items if the cartitems is 0
    if (cartItems.length === 0) {
        
        if (nothingToCheckout.classList.contains('hidden')) {
            nothingToCheckout.classList.remove('hidden');
            return;
        }
    } else {
      const checkoutCtn = document.querySelector('.checkout-ctn')
      const cartItemsCard = cartItems.map((item) => `
                <div class="flex gap-4">
                  <div class="bg-secondary w-16 aspect-[3/4] overflow-hidden shrink-0">
                    <img
                      src=${item?.image}
                      alt=${item?.name}
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1 flex justify-between text-sm font-light">
                    <div>
                      <p class="font-serif text-bold">${item?.name}</p>
                      <p class="text-xs text-muted-foreground mt-1">
                        Size ${item?.size} · Qty ${item?.quantity}
                      </p>
                    </div>
                    <p class="tabular-nums">${formatCurrency(item?.price * item?.quantity)}</p>
                  </div>
                </div>
      `).join('')
      const htmlContent = `
        <main class="flex-1 max-w-screen-2xl mx-auto w-full px-6 md:px-12 py-16 sm:py-24 checkout-items">
        <div class="mb-12 sm:mb-16">
          <a
            href="/cart"
            class="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Cart
        </a>
          <h1 class="font-serif text-4xl sm:text-6xl font-light tracking-tighter mt-6">
            Checkout
          </h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <form id='paymentForm' class="lg:col-span-3 space-y-12">
            <section class="space-y-6">
              <h2 class="text-[10px] uppercase tracking-[0.2em] border-b border-border pb-4">
                Contact
              </h2>
              <div class="space-y-2 flex flex-col">
                <Label htmlFor="email" class="text-[10px] uppercase tracking-[0.2em]">
                  Email
                </Label>
                <input id="email" type="email" required class="rounded-none h-12" />
              </div>
            </section>

            <section class="space-y-6">
              <h2 class="text-[10px] uppercase tracking-[0.2em] border-b border-border pb-4">
                Shipping Address
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2 flex flex-col">
                  <Label htmlFor="firstName" class="text-[10px] uppercase tracking-[0.2em]">
                    First Name
                  </Label>
                  <input type="text" id="firstName" required class="rounded-none h-12" />
                </div>
                <div class="space-y-2 flex flex-col">
                  <Label htmlFor="lastName" class="text-[10px] uppercase tracking-[0.2em]">
                    Last Name
                  </Label>
                  <input type="text" id="lastName" required class="rounded-none h-12" />
                </div>
              </div>
              <div class="space-y-2 flex flex-col">
                <Label htmlFor="address" class="text-[10px] uppercase tracking-[0.2em]">
                  Address
                </Label>
                <input type="text" id="address" required class="rounded-none h-12" />
              </div>
              <div class="space-y-2 flex flex-col">
                <Label htmlFor="phone" class="text-[10px] uppercase tracking-[0.2em]">
                  Phone Number
                </Label>
                <input type="text" id="phone" required class="rounded-none h-12" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2 flex flex-col">
                  <Label htmlFor="city" class="text-[10px] uppercase tracking-[0.2em]">
                    City
                  </Label>
                  <input id="city" type="text" required class="rounded-none h-12" />
                </div>
                <!-- <div class="space-y-2">
                  <Label htmlFor="postal" class="text-[10px] uppercase tracking-[0.2em]">
                    Postal Code
                  </Label>
                  <Input id="postal" required class="rounded-none h-12" />
                </div> -->
                <div class="space-y-2 flex flex-col">
                <Label htmlFor="country" class="text-[10px] uppercase tracking-[0.2em]">
                  Country
                </Label>
                <input id="country" type="text" required defaultValue="France" class="rounded-none h-12" />
              </div>
              </div>
              
            </section>

            <button
              type="submit"
              id="pay"
              class="px-3 py-3 bg-foreground payment-btn text-white text-sm font-light rounded-sm bg-gray-800 transition-colors duration-300 w-full"
            >
              Complete Order
            </button>
            <h1 class='err-ctn text-[10px] uppercase tracking-[0.2em] w-full text-red-800 text-center'></h1>
          </form>

          <aside class="lg:col-span-2 lg:sticky lg:top-8 lg:self-start space-y-6 border-t border-border pt-8">
            <h2 class="text-[10px] uppercase tracking-[0.2em]">Order Summary</h2>
            <div class="space-y-5">
                ${cartItemsCard}
            </div>

            <div class="border-t border-border pt-6 space-y-3 text-sm font-light">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Subtotal</span>
                <span class="tabular-nums">${calcTotal().subTotal}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Shipping</span>
                <span class="tabular-nums">
                  ${formatCurrency(shippingFee)}
                </span>
              </div>
            </div>
            <div class="border-t border-border pt-4 flex justify-between text-base font-light">
              <span>Total</span>
              <span class="tabular-nums">${calcGrandTotal(calcTotal().actualTotal, shippingFee)}</span>
            </div>
          </aside>
        </div>
      </main>
      `
      checkoutCtn.innerHTML = htmlContent
    }

})