document.addEventListener('DOMContentLoaded', () => {

    // დამხმარე ფუნქცია გვერდების უტყუარი იდენტიფიკაციისთვის
    const isPage = (pageName) => {
        return window.location.pathname.toLowerCase().endsWith(pageName.toLowerCase()) || 
               window.location.href.toLowerCase().includes('/' + pageName.toLowerCase());
    };

    // ბრაუზერის მეხსიერების ინიციალიზაცია (კალათა)
    if (!localStorage.getItem('smartCart')) {
        localStorage.setItem('smartCart', JSON.stringify([]));
    }

    if (!localStorage.getItem('userData')) {
        localStorage.setItem('userData', JSON.stringify({
            name: "Nodari Khutsishvili",
            email: "nodo@safehouse.ge"
        }));
    }

    // --- 0. ნავიგაციის მენიუ ---
    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer) {
        const existingProfile = document.getElementById('navProfileLink');
        if (!existingProfile) {
            const profileLink = document.createElement('a');
            profileLink.href = 'profile.html';
            profileLink.id = 'navProfileLink';
            profileLink.textContent = 'Profile';
            if (isPage('profile.html')) profileLink.className = 'active';
            navLinksContainer.appendChild(profileLink);
        }
        
        const allLinks = navLinksContainer.querySelectorAll('a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && isPage(href)) {
                link.className = 'active';
            }
        });
    }

    // --- A. მაღაზიის გვერდი (store.html) ---
    if (isPage('store.html')) {
        const addToCartButtons = document.querySelectorAll('.premium-cart-button');
        
        const productsDatabase = {
            'Smart Light Switch': { price: 29.99, desc: 'Capacitive touch, wireless integration layers.', img: 'images/switch.png' },
            'Security Camera': { price: 39.99, desc: 'Ultra HD 4K night-vision array with dynamic encryption.', img: 'images/camera.png' },
            'Door Locker': { price: 49.99, desc: 'Biometric scanner architecture ensuring unbreakable entry.', img: 'images/lock.png' },
            'Smart Doorbell': { price: 29.99, desc: 'Two-way real-time communication audio matrix.', img: 'images/doorbell.png' }
        };

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.premium-product-card');
                const title = card.querySelector('h3').textContent.trim();
                const productInfo = productsDatabase[title];

                if (productInfo) {
                    const currentCart = JSON.parse(localStorage.getItem('smartCart')) || [];
                    currentCart.push({
                        id: Date.now() + Math.random(),
                        name: title,
                        price: productInfo.price,
                        desc: productInfo.desc,
                        img: productInfo.img
                    });
                    localStorage.setItem('smartCart', JSON.stringify(currentCart));
                    alert(`${title} added to cart successfully!`);
                }
            });
        });
    }

    // --- B. კალათის გვერდი (cart.html) ---
    if (isPage('cart.html')) {
        const cartWrapper = document.querySelector('.main-container');

        const renderCartPage = () => {
            const cartItems = JSON.parse(localStorage.getItem('smartCart')) || [];

            if (cartItems.length === 0) {
                cartWrapper.innerHTML = `
                    <h1 class="section-title">Your Smart Basket</h1>
                    <div class="card" style="text-align: center; padding: 5rem 2rem; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid #EAECE8; background: #FFF;">
                        <span style="font-size: 3rem; display:block; margin-bottom:1rem;">🛒</span>
                        <h2 style="margin-bottom: 1.5rem; color: #666; font-size:1.3rem;">Your basket is empty</h2>
                        <a href="store.html" class="premium-cart-button" style="text-decoration:none; display:inline-block; border-radius:8px; text-align:center; max-width:200px;">Return to Store</a>
                    </div>
                `;
                return;
            }

            let subtotal = 0;
            let itemsListHTML = '';

            cartItems.forEach(item => {
                subtotal += item.price;
                itemsListHTML += `
                    <div class="card" data-id="${item.id}" style="padding: 1.5rem; display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 2rem; margin-bottom: 1.5rem; background:#FFF; border:1px solid #EAECE8; border-radius:16px;">
                        <div style="display: flex; align-items: center; gap: 1.5rem;">
                            <div class="product-img-wrapper" style="width: 80px; height: 80px; padding: 0.5rem; background-color: #FAF9F6; margin: 0; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100?text=Device'" style="max-height: 100%; max-width:100%; object-fit:contain;">
                            </div>
                            <div>
                                <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem; font-weight:700;">${item.name}</h3>
                                <p style="color: #666; font-size: 0.85rem; margin:0;">${item.desc}</p>
                            </div>
                        </div>
                        <div style="text-align: right; flex-shrink:0;">
                            <span class="price" style="display: block; margin-bottom: 0.5rem; font-weight:700; font-size:1.1rem;">$${item.price.toFixed(2)}</span>
                            <a href="#" class="cart-remove-btn" style="color: #FF3B30; font-size: 0.85rem; font-weight: 600; text-decoration: none;">Remove</a>
                        </div>
                    </div>
                `;
            });

            cartWrapper.innerHTML = `
                <h1 class="section-title" style="text-align: left; margin-bottom: 3rem;">Your Smart Basket</h1>
                <div style="display: grid; grid-template-columns: 1fr 360px; gap: 3rem; align-items: start;">
                    <div class="cart-items-container-list">${itemsListHTML}</div>
                    <div class="card" style="padding: 2.5rem; background-color: #FFFFFF; border:1px solid #EAECE8; border-radius:20px; display: flex; flex-direction: column; gap: 1.5rem; margin: 0; box-shadow: 0 4px 20px rgba(0,0,0,0.01); box-sizing:border-box;">
                        <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Order Summary</h2>
                        <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.95rem;">
                            <div style="display: flex; justify-content: space-between; color: #666;">
                                <span>Subtotal</span>
                                <strong style="color: #111; font-weight: 700;">$${subtotal.toFixed(2)}</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; color: #666;">
                                <span>Secure Shipping</span>
                                <strong style="color: #34C759; font-weight: 700;">FREE</strong>
                            </div>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #EAECE8; margin:0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom:0.5rem;">
                            <span style="font-weight: 700; font-size: 1.05rem;">Total Investment</span>
                            <span style="font-size: 1.5rem; color: #111; font-weight:800;">$${subtotal.toFixed(2)}</span>
                        </div>
                        <a href="checkout.html" style="display: block !important; width: 100% !important; background-color: #111111 !important; color: #FFFFFF !important; text-align: center !important; padding: 1rem 0 !important; border-radius: 12px !important; font-size: 0.95rem !important; font-weight: 700 !important; text-decoration: none !important; box-sizing: border-box !important; transition: background 0.2s ease;">Proceed to Checkout</a>
                    </div>
                </div>
            `;

            document.querySelectorAll('.cart-remove-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const itemCard = button.closest('.card');
                    const itemId = parseFloat(itemCard.getAttribute('data-id'));
                    
                    let items = JSON.parse(localStorage.getItem('smartCart')) || [];
                    items = items.filter(i => i.id !== itemId);
                    localStorage.setItem('smartCart', JSON.stringify(items));
                    
                    renderCartPage();
                });
            });
        };

        renderCartPage();
    }

    // --- C. შეკვეთის გაფორმება (checkout.html - FIXED FORM ACCESSIBILITY) ---
    if (isPage('checkout.html')) {
        const checkoutForm = document.querySelector('form'); // 🚀 პოულობს პირდაპირ გვერდის ფორმას ყოველგვარი შეცდომის გარეშე
        const cartItems = JSON.parse(localStorage.getItem('smartCart')) || [];
        const totalToPay = cartItems.reduce((sum, item) => sum + item.price, 0);

        if (checkoutForm) {
            // დინამიურად ვამატებთ გადასახდელი თანხის პანელს ფორმის თავში
            const priceNotice = document.createElement('div');
            priceNotice.style.cssText = 'background: #F5F5F7; padding: 1.25rem; border-radius: 12px; margin-bottom: 2rem; display: flex; justify-content: space-between; font-weight: 700; border: 1px solid #EAECE8; font-size:1.05rem; box-sizing:border-box;';
            priceNotice.innerHTML = `<span>Amount to Pay:</span><span style="color: #0071E3;">$${totalToPay.toFixed(2)}</span>`;
            checkoutForm.insertBefore(priceNotice, checkoutForm.firstChild);

            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // ვაგენერირებთ შეკვეთის უნიკალურ კოდს
                const orderID = 'SH-' + Math.floor(100000 + Math.random() * 900000);
                const addressInput = checkoutForm.querySelector('input[placeholder*="Address"]').value;

                // ვინახავთ შეკვეთის რეპორტს ბოლო გვერდისთვის
                localStorage.setItem('lastOrderReport', JSON.stringify({
                    id: orderID,
                    total: totalToPay.toFixed(2),
                    address: addressInput
                }));

                // გადახდის დასრულებისას ვასუფთავებთ კალათას
                localStorage.setItem('smartCart', JSON.stringify([]));

                alert('გადახდა ავტორიზებულია! გენერირდება ელექტრონული ჩეკი.');
                window.location.href = 'thankyou.html';
            });
        }
    }

    // --- D. მადლობის გვერდი (thankyou.html) ---
    if (isPage('thankyou.html')) {
        const summaryBlock = document.querySelector('.order-summary');
        const report = JSON.parse(localStorage.getItem('lastOrderReport'));

        if (summaryBlock && report) {
            summaryBlock.className = "premium-receipt-card";
            summaryBlock.innerHTML = `
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color:#111;">Order Manifest</h3>
                <p><strong>Order ID:</strong> <span class="receipt-value-highlight">${report.id}</span></p>
                <p><strong>Total Investment:</strong> <span style="font-weight:700; color:#111;">$${report.total}</span></p>
                <p><strong>Destination:</strong> <span style="color:#666; font-weight:500;">${report.address}</span></p>
                <p><strong>Status:</strong> <span style="color:#34C759; font-weight:700; text-transform:uppercase; font-size:0.85rem;">Hardware Synchronized</span></p>
            `;
        }
    }

    // --- E. პროფილის გვერდი (profile.html) ---
    if (isPage('profile.html')) {
        const logoutBtn = document.getElementById('logoutBtn');
        const savedUser = JSON.parse(localStorage.getItem('userData'));

        if (savedUser) {
            const nameHeader = document.getElementById('profile-name-header');
            const emailValue = document.getElementById('profile-email-value');
            
            if (nameHeader) nameHeader.textContent = savedUser.name;
            if (emailValue) emailValue.textContent = savedUser.email;
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('smartCart');
                localStorage.removeItem('lastOrderReport');
                alert('სისტემის ქეში წარმატებით გასუფთავდა!');
                window.location.href = 'store.html';
            });
        }
    }
});