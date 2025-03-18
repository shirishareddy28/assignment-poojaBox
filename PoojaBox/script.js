window.onload = function () {
    console.log("✅ JavaScript Loaded Successfully!");

    // 1️⃣ MOBILE MENU TOGGLE
    const menuToggle = document.createElement("div");
    menuToggle.innerHTML = "&#9776;"; // Hamburger icon
    menuToggle.style.fontSize = "30px";
    menuToggle.style.cursor = "pointer";
    menuToggle.style.display = "none"; 
    document.body.prepend(menuToggle);

    const navLinks = document.querySelector("nav ul");
    
    if (navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });

        function handleResize() {
            if (window.innerWidth < 768) {
                navLinks.style.display = "none";
            } else {
                navLinks.style.display = "flex";
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
    } else {
        console.error("❌ Navigation Menu Not Found!");
    }

    // 2️⃣ PRODUCT LIST (For Search and Cart)
    const products = [
        { name: "Aroma Incense Collection", price: 699 },
        { name: "Agarbatti Incense Sticks", price: 149 },
        { name: "Fragant Dhoopbatti", price: 199 },
        { name: "Natural Guggal Dhoop", price: 249 },
        { name: "Sambrani Havan Cups", price: 249 },
        { name: "Lavender and Smudge Bundles", price: 1299 }
    ];

    // 3️⃣ SEARCH FUNCTIONALITY
    const searchBox = document.getElementById("searchBox");
    const searchResults = document.getElementById("searchResults");

    searchBox.addEventListener("input", function () {
        let query = searchBox.value.toLowerCase();
        searchResults.innerHTML = "";

        if (query.length > 0) {
            let filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                searchResults.style.display = "block";
                filteredProducts.forEach(product => {
                    let div = document.createElement("div");
                    div.classList.add("searchResult");
                    div.innerText = product.name;
                    div.addEventListener("click", function () {
                        searchBox.value = product.name;
                        searchResults.style.display = "none";
                    });
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.style.display = "none";
            }
        } else {
            searchResults.style.display = "none";
        }
    });

    document.addEventListener("click", function (e) {
        if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });

    // 4️⃣ ADD TO CART FUNCTIONALITY
    let cart = [];
    const cartIcon = document.getElementById("cartIcon");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartDropdown = document.getElementById("cartDropdown");
    const clearCart = document.getElementById("clearCart");

    let cartButtons = document.querySelectorAll(".one button");
    cartButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let product = products[index];
            cart.push(product);
            updateCart();
            alert("✅ Item added to cart!");
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerText = `${item.name} - ₹${item.price}`;
            cartItems.appendChild(li);
        });
        cartCount.innerText = cart.length;
        cartDropdown.style.display = "block";
    }

    cartIcon.addEventListener("click", function () {
        cartDropdown.style.display =
            cartDropdown.style.display === "block" ? "none" : "block";
    });

    clearCart.addEventListener("click", function () {
        cart = [];
        updateCart();
        cartDropdown.style.display = "none";
    });

    // 5️⃣ VIEW ALL BUTTON FUNCTIONALITY
    let viewAllButtons = document.querySelectorAll(".btn5");
    viewAllButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let sections = document.querySelectorAll(".parent-container");
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: "smooth" });
            }
        });
    });
};

