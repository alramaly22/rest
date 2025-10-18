/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const modal = document.getElementById("pizzaModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const closeBtn = document.querySelector(".modal__close");

document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = button.dataset.img;
        modalName.textContent = button.dataset.name;
        modalDesc.textContent = button.dataset.desc;
        modalPrice.textContent = button.dataset.price;
        qtyInput.value = 1; // نرجع الكمية 1 كل مرة نفتحه
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

let cart = []; // Array للكارت
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const addToCartBtn = document.getElementById("addToCartBtn");

// عناصر الكمية في المودال
const qtyInput = document.getElementById("modalQty");
const increaseQty = document.getElementById("increaseQty");
const decreaseQty = document.getElementById("decreaseQty");

// زرار + يزيد الكمية
increaseQty.addEventListener("click", () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
});

// زرار - ينقص الكمية (ما يقلش عن 1)
decreaseQty.addEventListener("click", () => {
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
});

// Function لإضافة منتج للكارت
function addToCart(name, price, img, qty) {
    price = parseFloat(price.replace("$", "")); // نشيل $
    let product = cart.find(item => item.name === name);

    if (product) {
        product.qty += qty; // لو المنتج موجود نزود الكمية
    } else {
        cart.push({ name, price, img, qty });
    }
    renderCart();
}

// Function لعرض الكارت
function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        cartItems.innerHTML += `
          <li class="cart__item">
            <img src="${item.img}" alt="" class="cart__img">
            <div class="cart__details">
              <h4>${item.name}</h4>
              <p>$${item.price} × ${item.qty} = $${(item.price * item.qty).toFixed(2)}</p>
            </div>
            <button class="cart__remove" onclick="removeFromCart(${index})">✖</button>
          </li>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Function لحذف منتج
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// حدث عند الضغط على زر "Add To Cart" في المودال
addToCartBtn.addEventListener("click", () => {
    let qty = parseInt(qtyInput.value);
    addToCart(modalName.textContent, modalPrice.textContent, modalImg.src, qty);
    modal.style.display = "none"; // نقفل المودال بعد الإضافة
    qtyInput.value = 1; // نرجع الكمية 1
});

// زرار Checkout (ممكن نخليه بس ينبه دلوقتي)
document.getElementById("checkoutBtn").addEventListener("click", () => {
    alert("Thank you for your order!");
    cart = [];
    renderCart();
});