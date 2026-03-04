// ------------------------------
// Subscribe Button (All Pages)
// ------------------------------
const subscribeBtn = document.querySelector(".subscribe-btn");

if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    alert("Thank you for subscribing.");
  });
}

// Shopping Cart (Gallery Page) - sessionStorage

function getCartItems() {
  return JSON.parse(sessionStorage.getItem("cartItems")) || [];
}

function saveCartItems(items) {
  sessionStorage.setItem("cartItems", JSON.stringify(items));
}

function renderCart() {
  const cartList = document.querySelector(".cart-items");
  const emptyMsg = document.querySelector(".cart-empty-message");

  // If this page doesn't have the cart display, do nothing
  if (!cartList || !emptyMsg) return;

  const items = getCartItems();
  cartList.innerHTML = "";

  if (items.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    cartList.appendChild(li);
  });
}

// Add to Cart Buttons (Gallery Page)
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Use the item name from the <p> right above the button
    const itemName = button.previousElementSibling?.textContent?.trim() || "Item";

    const items = getCartItems();
    items.push(itemName);
    saveCartItems(items);

    alert("Item added to the cart.");
  });
});

// View Cart Modal (Gallery Page)
const modal = document.getElementById("cartModal");
const closeBtn = document.querySelector(".close");

const viewCartBtn = document.querySelector(".view-cart");
if (viewCartBtn && modal) {
  viewCartBtn.addEventListener("click", function () {
    renderCart();
    modal.style.display = "block";
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

window.addEventListener("click", function (event) {
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
});

// Clear Cart Button (inside modal)
const clearCartBtn = document.querySelector(".clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    sessionStorage.removeItem("cartItems");
    renderCart();
    alert("Cart cleared.");
  });
}

// Process Order Button (inside modal)
const processOrderBtn = document.querySelector(".process-order");
if (processOrderBtn) {
  processOrderBtn.addEventListener("click", function () {
    sessionStorage.removeItem("cartItems");
    renderCart();
    alert("Thank you for your order.");
  });
}
// Contact Form (About Page) - localStorage
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Adjust these selectors if your input IDs/names differ
    const name = contactForm.querySelector('#fullName, input[name="fullName"]')?.value?.trim() || "";
    const email = contactForm.querySelector('input[name="email"], #email')?.value?.trim() || "";
    const phone = contactForm.querySelector('input[name="phone"], #phone')?.value?.trim() || "";
    const message = contactForm.querySelector('#customDetails, textarea[name="customDetails"]')?.value?.trim() || "";

    const orderData = {
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("customerOrder", JSON.stringify(orderData));

    alert("Thank you for your message.");
    contactForm.reset();
  });
}