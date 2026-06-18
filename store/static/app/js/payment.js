document.addEventListener('DOMContentLoaded', () => {
    const checkoutCtn = document.querySelector('.checkout-ctn')
    const paymentBtn = document.querySelector('.payment-btn')
    checkoutCtn.addEventListener('click', async (e) => {

function getCookie(name) {
    let cookieValue = null;

    if (document.cookie) {
        document.cookie.split(';').forEach(cookie => {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.split('=')[1]);
            }
        });
    }

    return cookieValue;
}
        const target = e.target.id
        if (target.toLowerCase() === 'pay') {
            e.preventDefault();
            const firstName = document.querySelector('#firstName');
            const lastName = document.querySelector('#firstName');
            const email = document.querySelector('#email');
            const shippingAddress = document.querySelector('#address');
            const phone = document.querySelector('#phone');
            const city = document.querySelector('#city');
            const country = document.querySelector('#country');

            if (!email.value) {
                email.focus();
            } else if (!firstName.value) {
                firstName.focus();
            } else if (!lastName.value) {
                lastName.focus();
            } else if (!shippingAddress.value) {
                shippingAddress.focus();
            } else if (!phone.value) {
                phone.focus();
            } else if (!city.value) {
                city.focus();
            } else if (!country.value) {
                country.value();
            }

            if (email.value) {
                // verify if email is valid
                const email_check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email_check.test(email.value)) {
                   const err = document.querySelector('.err-ctn');
                   err.innerText = 'enter a valid email address!';
                   err.focus();

                   setTimeout(() => {
                        err.innerText = '';
                   }, 3000)
                   return 
                }
            const data = {
                firtName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                shippingAddress: shippingAddress.value,
                phone: phone.value,
                city: city.value,
                country: country.value,
                items: JSON.parse(localStorage.getItem('anisa_the_brand_cart'))
            }

            const payBtn = document.querySelector('#pay')
            payBtn.innerText = 'Generating payment...';
            payBtn.disabled = true;
       


            const res = await fetch('http://localhost:8000/payout/',
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": getCookie("csrftoken")
                    },
                    body: JSON.stringify(data)
                }
            );

            const res_data = await res.json()

            if (res.ok && res_data.url) {
                window.open(res_data.url, "_blank", "width=500,height=700");
            } else {
                alert('Payment request failed, please try again!')
                payBtn.disabled = false;
                payBtn.innerText = "Complete Order"
            }
            
            }







        }
    })
});