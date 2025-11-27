<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stone Products - StoneCraft UK</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #ffffff;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        /* Header Styles */
        header {
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        }
        
        .main-content {
            margin-top: 180px;
            padding: 40px 0;
        }
        
        .page-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px 0;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 12px;
        }
        
        .page-header h1 {
            font-size: 36px;
            color: #333;
            margin-bottom: 10px;
        }
        
        .page-header .breadcrumb {
            color: #666;
            font-size: 16px;
        }
        
        .page-header .breadcrumb a {
            color: #b8860b;
            text-decoration: none;
        }
        
        .page-header .breadcrumb span {
            margin: 0 10px;
        }
        
        .filters-container {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 30px;
        }
        
        .sidebar-filters {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            height: fit-content;
            position: sticky;
            top: 200px;
        }
        
        .filter-group {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .filter-group:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .filter-group-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .filter-group-title i {
            color: #b8860b;
        }
        
        .price-range-inputs {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .price-input {
            flex: 1;
            padding: 10px;
            border: 2px solid #e9ecef;
            border-radius: 6px;
            font-size: 14px;
        }
        
        .price-input:focus {
            outline: none;
            border-color: #b8860b;
        }
        
        .price-slider {
            width: 100%;
            margin: 15px 0;
        }
        
        .filter-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .filter-option {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 8px 0;
        }
        
        .filter-option input {
            width: 18px;
            height: 18px;
            accent-color: #b8860b;
        }
        
        .filter-option label {
            cursor: pointer;
            flex: 1;
            font-size: 14px;
        }
        
        .option-count {
            color: #666;
            font-size: 12px;
            background: #f8f9fa;
            padding: 2px 8px;
            border-radius: 12px;
        }
        
        .apply-filters-btn {
            width: 100%;
            padding: 12px;
            background: #b8860b;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .apply-filters-btn:hover {
            background: #a3780a;
        }
        
        .main-content-area {
            flex: 1;
        }
        
        .sort-options {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .sort-btn {
            padding: 8px 16px;
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        }
        
        .sort-btn.active {
            background: #b8860b;
            color: white;
            border-color: #b8860b;
        }
        
        .current-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .current-filter {
            background: #e9ecef;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .remove-filter {
            cursor: pointer;
            color: #666;
        }
        
        .remove-filter:hover {
            color: #333;
        }
        
        .products-count {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }
        
        .product-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .product-image {
            width: 100%;
            height: 200px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        
        .product-info {
            padding: 20px;
        }
        
        .product-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }
        
        .product-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size: 14px;
            color: #666;
        }
        
        .product-type {
            background: #fff9e6;
            color: #b8860b;
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 500;
        }
        
        .product-price {
            font-size: 20px;
            font-weight: 700;
            color: #b8860b;
            margin-bottom: 15px;
        }
        
        .product-details {
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .product-details div {
            margin-bottom: 5px;
        }
        
        .product-actions {
            display: flex;
            gap: 10px;
        }
        
        .btn {
            display: inline-block;
            background: #b8860b;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            flex: 1;
            text-align: center;
        }
        
        .btn:hover {
            background: #a3780a;
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid #b8860b;
            color: #b8860b;
        }
        
        .btn-outline:hover {
            background: #b8860b;
            color: white;
        }
        
        .no-products {
            text-align: center;
            padding: 60px 20px;
            grid-column: 1 / -1;
        }
        
        .no-products i {
            font-size: 48px;
            color: #ddd;
            margin-bottom: 20px;
        }
        
        .no-products h3 {
            font-size: 24px;
            color: #666;
            margin-bottom: 10px;
        }
        
        .no-products p {
            color: #888;
            margin-bottom: 20px;
        }
        
        .loading-products {
            text-align: center;
            padding: 40px;
            grid-column: 1 / -1;
            color: #666;
        }
        
        .clear-all-filters {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .clear-all-filters:hover {
            background: #c82333;
        }
        
        @media (max-width: 768px) {
            .main-content {
                margin-top: 220px;
            }
            
            .filters-container {
                grid-template-columns: 1fr;
            }
            
            .sidebar-filters {
                position: static;
            }
            
            .products-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
        }
        
        @media (max-width: 480px) {
            .products-grid {
                grid-template-columns: 1fr;
            }
            
            .sort-options {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- Header - Same as your home page -->
    <header id="mainHeader">
        <!-- Your existing header content -->
    </header>

    <!-- Main Content -->
    <div class="main-content">
        <div class="container">
            <!-- Page Header -->
            <div class="page-header">
                <h1 id="pageTitle">Stone Products</h1>
                <div class="breadcrumb" id="breadcrumb">
                    <a href="index.html">Home</a>
                    <span>></span>
                    <span>Products</span>
                </div>
            </div>
            
            <!-- Main Filters Container -->
            <div class="filters-container">
                <!-- Sidebar Filters -->
                <div class="sidebar-filters">
                    <!-- Stone Name Filter -->
                    <div class="filter-group">
                        <h3 class="filter-group-title">
                            <i class="fas fa-gem"></i>
                            Stone Type
                        </h3>
                        <div class="filter-options" id="stoneNameFilters">
                            <div class="loading-products">
                                <i class="fas fa-spinner fa-spin"></i>
                                <p>Loading stone types...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Category Filter -->
                    <div class="filter-group">
                        <h3 class="filter-group-title">
                            <i class="fas fa-layer-group"></i>
                            Category
                        </h3>
                        <div class="filter-options" id="categoryFilters">
                            <div class="loading-products">
                                <i class="fas fa-spinner fa-spin"></i>
                                <p>Loading categories...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Type Filter (Natural, Artificial, etc) -->
                    <div class="filter-group">
                        <h3 class="filter-group-title">
                            <i class="fas fa-tag"></i>
                            Stone Nature
                        </h3>
                        <div class="filter-options" id="typeFilters">
                            <div class="loading-products">
                                <i class="fas fa-spinner fa-spin"></i>
                                <p>Loading types...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Color Filter -->
                    <div class="filter-group">
                        <h3 class="filter-group-title">
                            <i class="fas fa-palette"></i>
                            Color
                        </h3>
                        <div class="filter-options" id="colorFilters">
                            <div class="loading-products">
                                <i class="fas fa-spinner fa-spin"></i>
                                <p>Loading colors...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Price Filter -->
                    <div class="filter-group">
                        <h3 class="filter-group-title">
                            <i class="fas fa-indian-rupee-sign"></i>
                            Price Range (per sqft)
                        </h3>
                        <div class="price-range-inputs">
                            <input type="number" class="price-input" id="minPrice" placeholder="Min Price">
                            <input type="number" class="price-input" id="maxPrice" placeholder="Max Price">
                        </div>
                        <input type="range" class="price-slider" id="priceRange" min="0" max="1000" step="10">
                        <div class="price-display" id="priceDisplay">
                            Price: ₹0 - ₹1000
                        </div>
                    </div>
                    
                    <button class="apply-filters-btn" id="applyFilters">
                        <i class="fas fa-filter"></i>
                        Apply Filters
                    </button>
                    
                    <button class="clear-all-filters" id="clearAllFilters" style="width: 100%; margin-top: 10px;">
                        <i class="fas fa-times"></i>
                        Clear All Filters
                    </button>
                </div>
                
                <!-- Main Content Area -->
                <div class="main-content-area">
                    <!-- Current Active Filters -->
                    <div class="current-filters" id="currentFilters">
                        <!-- Active filters will show here -->
                    </div>
                    
                    <!-- Sort Options -->
                    <div class="sort-options">
                        <div class="sort-btn active" data-sort="name">Name A-Z</div>
                        <div class="sort-btn" data-sort="name-desc">Name Z-A</div>
                        <div class="sort-btn" data-sort="price-low">Price Low to High</div>
                        <div class="sort-btn" data-sort="price-high">Price High to Low</div>
                    </div>
                    
                    <!-- Products Count -->
                    <div class="products-count" id="productsCount">
                        Loading products...
                    </div>
                    
                    <!-- Products Grid -->
                    <div class="products-grid" id="productsGrid">
                        <div class="loading-products">
                            <i class="fas fa-spinner fa-spin"></i>
                            <p>Loading products...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <!-- Your footer content -->
    </footer>

    <!-- Firebase Script -->
    <script type="module">
        // Import from your updated firebase-config.js
        import { 
            db, auth, 
            collection, getDocs, onSnapshot,
            onAuthStateChanged, signOut
        } from './firebase-config.js';

        const appState = {
            products: [],
            filteredProducts: [],
            currentUsage: null,
            currentStoneName: null,
            filters: {
                stoneNames: [],
                categories: [],
                types: [],
                colors: [],
                minPrice: 0,
                maxPrice: 1000,
                sortBy: 'name'
            },
            user: null
        };

        document.addEventListener('DOMContentLoaded', function() {
            console.log('Initializing Category Products Page...');
            
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            appState.currentUsage = urlParams.get('usage');
            appState.currentStoneName = urlParams.get('stone_name');
            
            console.log('URL Parameters:', {
                usage: appState.currentUsage,
                stone_name: appState.currentStoneName
            });
            
            // Initialize the page
            initializePage();
            initializeAuth();
        });

        async function initializePage() {
            try {
                await loadProductsFromFirestore();
                updatePageTitle();
                generateAllFilters();
                applyFilters();
            } catch (error) {
                console.error('Error initializing page:', error);
            }
        }

        async function loadProductsFromFirestore() {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                appState.products = [];
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    appState.products.push({
                        id: doc.id,
                        ...data
                    });
                });
                
                console.log('Products loaded:', appState.products.length);
                
                // Real-time listener
                onSnapshot(collection(db, "products"), (snapshot) => {
                    const updatedProducts = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        updatedProducts.push({
                            id: doc.id,
                            ...data
                        });
                    });
                    appState.products = updatedProducts;
                    console.log('Products updated in real-time:', updatedProducts.length);
                    generateAllFilters();
                    applyFilters();
                });
                
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        function updatePageTitle() {
            const pageTitle = document.getElementById('pageTitle');
            const breadcrumb = document.getElementById('breadcrumb');
            
            if (appState.currentUsage && appState.currentStoneName) {
                pageTitle.textContent = `${appState.currentStoneName} - ${appState.currentUsage}`;
                breadcrumb.innerHTML = `
                    <a href="index.html">Home</a>
                    <span>></span>
                    <a href="category-products.html?usage=${appState.currentUsage}">${appState.currentUsage}</a>
                    <span>></span>
                    <span>${appState.currentStoneName}</span>
                `;
                
                // Set initial stone name filter from URL
                if (appState.currentStoneName) {
                    appState.filters.stoneNames = [appState.currentStoneName];
                }
                
            } else if (appState.currentUsage) {
                pageTitle.textContent = `${appState.currentUsage} Stones`;
                breadcrumb.innerHTML = `
                    <a href="index.html">Home</a>
                    <span>></span>
                    <span>${appState.currentUsage}</span>
                `;
            } else {
                pageTitle.textContent = 'All Stone Products';
            }
        }

        function generateAllFilters() {
            generateStoneNameFilters();
            generateCategoryFilters();
            generateTypeFilters();
            generateColorFilters();
            updatePriceRange();
        }

        function generateStoneNameFilters() {
            const stoneNameFilters = document.getElementById('stoneNameFilters');
            if (!stoneNameFilters) return;
            
            let productsToFilter = getBaseFilteredProducts();
            
            const uniqueStoneNames = [...new Set(productsToFilter
                .filter(product => product.stone_name && product.stone_name.trim() !== '')
                .map(product => product.stone_name.trim())
            )].sort();
            
            console.log('Available stone names:', uniqueStoneNames);
            
            if (uniqueStoneNames.length === 0) {
                stoneNameFilters.innerHTML = '<div>No stone types available</div>';
                return;
            }
            
            stoneNameFilters.innerHTML = uniqueStoneNames.map(stoneName => {
                const count = productsToFilter.filter(product => 
                    product.stone_name && product.stone_name.trim() === stoneName
                ).length;
                
                const isChecked = appState.filters.stoneNames.includes(stoneName);
                
                return `
                    <div class="filter-option">
                        <input type="checkbox" id="stone-${stoneName.replace(/\s+/g, '-')}" 
                               value="${stoneName}" ${isChecked ? 'checked' : ''}>
                        <label for="stone-${stoneName.replace(/\s+/g, '-')}">${stoneName}</label>
                        <span class="option-count">${count}</span>
                    </div>
                `;
            }).join('');
        }

        function generateCategoryFilters() {
            const categoryFilters = document.getElementById('categoryFilters');
            if (!categoryFilters) return;
            
            let productsToFilter = getBaseFilteredProducts();
            
            const uniqueCategories = [...new Set(productsToFilter
                .filter(product => product.category && product.category.trim() !== '')
                .map(product => product.category.trim())
            )].sort();
            
            console.log('Available categories:', uniqueCategories);
            
            if (uniqueCategories.length === 0) {
                categoryFilters.innerHTML = '<div>No categories available</div>';
                return;
            }
            
            categoryFilters.innerHTML = uniqueCategories.map(category => {
                const count = productsToFilter.filter(product => 
                    product.category && product.category.trim() === category
                ).length;
                
                const isChecked = appState.filters.categories.includes(category);
                
                return `
                    <div class="filter-option">
                        <input type="checkbox" id="category-${category.replace(/\s+/g, '-')}" 
                               value="${category}" ${isChecked ? 'checked' : ''}>
                        <label for="category-${category.replace(/\s+/g, '-')}">${category}</label>
                        <span class="option-count">${count}</span>
                    </div>
                `;
            }).join('');
        }

        function generateTypeFilters() {
            const typeFilters = document.getElementById('typeFilters');
            if (!typeFilters) return;
            
            let productsToFilter = getBaseFilteredProducts();
            
            const uniqueTypes = [...new Set(productsToFilter
                .filter(product => product.type && product.type.trim() !== '')
                .map(product => product.type.trim())
            )].sort();
            
            console.log('Available types:', uniqueTypes);
            
            if (uniqueTypes.length === 0) {
                typeFilters.innerHTML = '<div>No types available</div>';
                return;
            }
            
            typeFilters.innerHTML = uniqueTypes.map(type => {
                const count = productsToFilter.filter(product => 
                    product.type && product.type.trim() === type
                ).length;
                
                const isChecked = appState.filters.types.includes(type);
                
                return `
                    <div class="filter-option">
                        <input type="checkbox" id="type-${type.replace(/\s+/g, '-')}" 
                               value="${type}" ${isChecked ? 'checked' : ''}>
                        <label for="type-${type.replace(/\s+/g, '-')}">${type}</label>
                        <span class="option-count">${count}</span>
                    </div>
                `;
            }).join('');
        }

        function generateColorFilters() {
            const colorFilters = document.getElementById('colorFilters');
            if (!colorFilters) return;
            
            let productsToFilter = getBaseFilteredProducts();
            
            const uniqueColors = [...new Set(productsToFilter
                .filter(product => product.color && product.color.trim() !== '')
                .map(product => product.color.trim())
            )].sort();
            
            console.log('Available colors:', uniqueColors);
            
            if (uniqueColors.length === 0) {
                colorFilters.innerHTML = '<div>No colors available</div>';
                return;
            }
            
            colorFilters.innerHTML = uniqueColors.map(color => {
                const count = productsToFilter.filter(product => 
                    product.color && product.color.trim() === color
                ).length;
                
                const isChecked = appState.filters.colors.includes(color);
                
                return `
                    <div class="filter-option">
                        <input type="checkbox" id="color-${color.replace(/\s+/g, '-')}" 
                               value="${color}" ${isChecked ? 'checked' : ''}>
                        <label for="color-${color.replace(/\s+/g, '-')}">${color}</label>
                        <span class="option-count">${count}</span>
                    </div>
                `;
            }).join('');
        }

        function updatePriceRange() {
            const productsToFilter = getBaseFilteredProducts();
            const prices = productsToFilter
                .filter(product => product.price && typeof product.price === 'number')
                .map(product => product.price);
            
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
            const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;
            
            document.getElementById('minPrice').value = minPrice;
            document.getElementById('maxPrice').value = maxPrice;
            document.getElementById('priceRange').min = minPrice;
            document.getElementById('priceRange').max = maxPrice;
            document.getElementById('priceRange').value = maxPrice;
            
            appState.filters.minPrice = minPrice;
            appState.filters.maxPrice = maxPrice;
            
            updatePriceDisplay();
        }

        function updatePriceDisplay() {
            document.getElementById('priceDisplay').textContent = 
                `Price: ₹${appState.filters.minPrice} - ₹${appState.filters.maxPrice}`;
        }

        function initializeFilters() {
            // Stone name filters
            document.getElementById('stoneNameFilters').addEventListener('change', updateStoneNameFilters);
            
            // Category filters
            document.getElementById('categoryFilters').addEventListener('change', updateCategoryFilters);
            
            // Type filters
            document.getElementById('typeFilters').addEventListener('change', updateTypeFilters);
            
            // Color filters
            document.getElementById('colorFilters').addEventListener('change', updateColorFilters);
            
            // Price filters
            document.getElementById('minPrice').addEventListener('input', updatePriceFilters);
            document.getElementById('maxPrice').addEventListener('input', updatePriceFilters);
            document.getElementById('priceRange').addEventListener('input', updatePriceSlider);
            
            // Apply filters button
            document.getElementById('applyFilters').addEventListener('click', applyFilters);
            
            // Clear all filters
            document.getElementById('clearAllFilters').addEventListener('click', clearAllFilters);
        }

        function updateStoneNameFilters() {
            const checkedBoxes = document.querySelectorAll('#stoneNameFilters input:checked');
            appState.filters.stoneNames = Array.from(checkedBoxes).map(cb => cb.value);
            updateCurrentFilters();
        }

        function updateCategoryFilters() {
            const checkedBoxes = document.querySelectorAll('#categoryFilters input:checked');
            appState.filters.categories = Array.from(checkedBoxes).map(cb => cb.value);
            updateCurrentFilters();
        }

        function updateTypeFilters() {
            const checkedBoxes = document.querySelectorAll('#typeFilters input:checked');
            appState.filters.types = Array.from(checkedBoxes).map(cb => cb.value);
            updateCurrentFilters();
        }

        function updateColorFilters() {
            const checkedBoxes = document.querySelectorAll('#colorFilters input:checked');
            appState.filters.colors = Array.from(checkedBoxes).map(cb => cb.value);
            updateCurrentFilters();
        }

        function updatePriceFilters() {
            const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseInt(document.getElementById('maxPrice').value) || 1000;
            
            appState.filters.minPrice = minPrice;
            appState.filters.maxPrice = maxPrice;
            
            document.getElementById('priceRange').value = maxPrice;
            updatePriceDisplay();
        }

        function updatePriceSlider() {
            const value = document.getElementById('priceRange').value;
            document.getElementById('maxPrice').value = value;
            appState.filters.maxPrice = parseInt(value);
            updatePriceDisplay();
        }

        function initializeSorting() {
            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    appState.filters.sortBy = this.getAttribute('data-sort');
                    applyFilters();
                });
            });
        }

        function getBaseFilteredProducts() {
            let filteredProducts = [...appState.products];
            
            // Filter by usage if specified in URL
            if (appState.currentUsage) {
                filteredProducts = filteredProducts.filter(product => 
                    product.uses && 
                    product.uses.toLowerCase().replace(/\s+/g, '-') === appState.currentUsage.toLowerCase()
                );
            }
            
            return filteredProducts;
        }

        function applyFilters() {
            let filteredProducts = getBaseFilteredProducts();
            
            console.log('Applying filters:', appState.filters);
            console.log('Initial products:', filteredProducts.length);
            
            // Filter by stone names
            if (appState.filters.stoneNames.length > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    product.stone_name && 
                    appState.filters.stoneNames.includes(product.stone_name.trim())
                );
                console.log('After stone name filter:', filteredProducts.length);
            }
            
            // Filter by categories
            if (appState.filters.categories.length > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    product.category && 
                    appState.filters.categories.includes(product.category.trim())
                );
                console.log('After category filter:', filteredProducts.length);
            }
            
            // Filter by types
            if (appState.filters.types.length > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    product.type && 
                    appState.filters.types.includes(product.type.trim())
                );
                console.log('After type filter:', filteredProducts.length);
            }
            
            // Filter by colors
            if (appState.filters.colors.length > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    product.color && 
                    appState.filters.colors.includes(product.color.trim())
                );
                console.log('After color filter:', filteredProducts.length);
            }
            
            // Filter by price
            filteredProducts = filteredProducts.filter(product => {
                if (!product.price) return true;
                return product.price >= appState.filters.minPrice && 
                       product.price <= appState.filters.maxPrice;
            });
            console.log('After price filter:', filteredProducts.length);
            
            // Sort products
            filteredProducts = sortProducts(filteredProducts);
            
            appState.filteredProducts = filteredProducts;
            displayProducts();
            updateProductsCount();
            updateCurrentFilters();
        }

        function sortProducts(products) {
            switch (appState.filters.sortBy) {
                case 'name':
                    return products.sort((a, b) => (a.stone_name || '').localeCompare(b.stone_name || ''));
                case 'name-desc':
                    return products.sort((a, b) => (b.stone_name || '').localeCompare(a.stone_name || ''));
                case 'price-low':
                    return products.sort((a, b) => (a.price || 0) - (b.price || 0));
                case 'price-high':
                    return products.sort((a, b) => (b.price || 0) - (a.price || 0));
                default:
                    return products;
            }
        }

        function displayProducts() {
            const productsGrid = document.getElementById('productsGrid');
            if (!productsGrid) return;
            
            if (appState.filteredProducts.length === 0) {
                productsGrid.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-box-open"></i>
                        <h3>No Products Found</h3>
                        <p>No products match your current filters.</p>
                        <button class="btn" onclick="clearAllFilters()">Clear All Filters</button>
                    </div>
                `;
                return;
            }
            
            productsGrid.innerHTML = appState.filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image" style="background-image: url('${product.images?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'}')"></div>
                    <div class="product-info">
                        <h3 class="product-name">${product.stone_name || 'Stone Product'}</h3>
                        <div class="product-meta">
                            <span class="product-type">${product.category || 'Natural Stone'}</span>
                            <span>${product.uses || 'General Use'}</span>
                        </div>
                        <div class="product-price">${product.price ? '₹' + product.price + ' / ' + (product.price_unit || 'sqft') : 'Price on request'}</div>
                        <div class="product-details">
                            <div><strong>Type:</strong> ${product.type || 'N/A'}</div>
                            <div><strong>Color:</strong> ${product.color || 'N/A'}</div>
                            <div><strong>Size:</strong> ${product.size || 'N/A'} ${product.length || ''}x${product.width || ''}</div>
                            <div><strong>Thickness:</strong> ${product.thickness || 'N/A'}</div>
                        </div>
                        <div class="product-actions">
                            <a href="product-details.html?id=${product.id}" class="btn">View Details</a>
                            <button class="btn btn-outline add-to-cart" data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add event listeners to add-to-cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product-id');
                    addToCart(productId);
                });
            });
        }

        function updateProductsCount() {
            const productsCount = document.getElementById('productsCount');
            if (!productsCount) return;
            
            const baseCount = getBaseFilteredProducts().length;
            const filteredCount = appState.filteredProducts.length;
            
            let countText = `Showing ${filteredCount} of ${baseCount} products`;
            
            if (appState.currentUsage) {
                countText += ` in ${appState.currentUsage}`;
            }
            
            if (filteredCount < baseCount) {
                countText += ` (${baseCount - filteredCount} hidden by filters)`;
            }
            
            productsCount.textContent = countText;
        }

        function updateCurrentFilters() {
            const currentFilters = document.getElementById('currentFilters');
            const activeFilters = [];
            
            // Stone name filters
            appState.filters.stoneNames.forEach(stoneName => {
                activeFilters.push(`
                    <div class="current-filter">
                        Stone: ${stoneName}
                        <span class="remove-filter" data-type="stone" data-value="${stoneName}">×</span>
                    </div>
                `);
            });
            
            // Category filters
            appState.filters.categories.forEach(category => {
                activeFilters.push(`
                    <div class="current-filter">
                        Category: ${category}
                        <span class="remove-filter" data-type="category" data-value="${category}">×</span>
                    </div>
                `);
            });
            
            // Type filters
            appState.filters.types.forEach(type => {
                activeFilters.push(`
                    <div class="current-filter">
                        Type: ${type}
                        <span class="remove-filter" data-type="type" data-value="${type}">×</span>
                    </div>
                `);
            });
            
            // Color filters
            appState.filters.colors.forEach(color => {
                activeFilters.push(`
                    <div class="current-filter">
                        Color: ${color}
                        <span class="remove-filter" data-type="color" data-value="${color}">×</span>
                    </div>
                `);
            });
            
            // Price filter
            if (appState.filters.minPrice > 0 || appState.filters.maxPrice < 1000) {
                activeFilters.push(`
                    <div class="current-filter">
                        Price: ₹${appState.filters.minPrice} - ₹${appState.filters.maxPrice}
                        <span class="remove-filter" data-type="price">×</span>
                    </div>
                `);
            }
            
            currentFilters.innerHTML = activeFilters.join('');
            
            // Add remove filter functionality
            document.querySelectorAll('.remove-filter').forEach(btn => {
                btn.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    const value = this.getAttribute('data-value');
                    
                    if (type === 'stone') {
                        appState.filters.stoneNames = appState.filters.stoneNames.filter(s => s !== value);
                        document.querySelector(`#stoneNameFilters input[value="${value}"]`).checked = false;
                    } else if (type === 'category') {
                        appState.filters.categories = appState.filters.categories.filter(c => c !== value);
                        document.querySelector(`#categoryFilters input[value="${value}"]`).checked = false;
                    } else if (type === 'type') {
                        appState.filters.types = appState.filters.types.filter(t => t !== value);
                        document.querySelector(`#typeFilters input[value="${value}"]`).checked = false;
                    } else if (type === 'color') {
                        appState.filters.colors = appState.filters.colors.filter(c => c !== value);
                        document.querySelector(`#colorFilters input[value="${value}"]`).checked = false;
                    } else if (type === 'price') {
                        appState.filters.minPrice = 0;
                        appState.filters.maxPrice = 1000;
                        document.getElementById('minPrice').value = 0;
                        document.getElementById('maxPrice').value = 1000;
                        updatePriceRange();
                    }
                    
                    applyFilters();
                });
            });
        }

        function clearAllFilters() {
            appState.filters = {
                stoneNames: [],
                categories: [],
                types: [],
                colors: [],
                minPrice: 0,
                maxPrice: 1000,
                sortBy: 'name'
            };
            
            // Reset all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            
            // Reset price inputs
            updatePriceRange();
            
            // Reset sorting
            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-sort') === 'name') {
                    btn.classList.add('active');
                }
            });
            appState.filters.sortBy = 'name';
            
            applyFilters();
        }

        function addToCart(productId) {
            console.log('Adding product to cart:', productId);
            alert('Product added to cart!');
        }

        function initializeAuth() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    appState.user = {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName || user.email.split('@')[0]
                    };
                } else {
                    appState.user = null;
                }
            });
        }

        // Initialize everything after DOM is loaded
        setTimeout(() => {
            initializeFilters();
            initializeSorting();
        }, 1000);

        // Make clearAllFilters available globally
        window.clearAllFilters = clearAllFilters;
    </script>
</body>
</html>
