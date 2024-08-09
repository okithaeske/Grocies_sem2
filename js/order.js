
const optionList = document.getElementById('optionList');
const checkboxContainer = document.getElementById('checkboxContainer');
const totalPriceContainer = document.getElementById('totalPriceContainer');
const confirmButton = document.getElementById('confirmButton');
const resultTableContainer = document.getElementById('resultTableContainer');
const resultTable = document.getElementById('resultTable').querySelector('tbody');
const tableTotalPrice = document.getElementById('tableTotalPrice');
const addToFavoriteButton = document.getElementById('addToFavoriteButton');
const useFavoriteButton = document.getElementById('useFavoriteButton');
const resetButton = document.getElementById('resetButton');
const PaynowButton = document.getElementById('viewSelectedButton');



// order page

// initailising the products into dictionaries

const checkboxes = {
    option1: [
        { label: 'Amberalla 1Kg', price: 330 },
        { label: 'Ash Plantain 1Kg', price: 410 },
        { label: 'Beet root 1Kg', price: 540 },
        { label: 'Bell pepper green 1Kg', price: 1020 },
        { label: 'Bell pepper Red 1Kg', price: 1050 },
        { label: 'Bell pepper Yellow 1Kg', price: 1040 },
        { label: 'Big Onions 1Kg', price: 1100 },
        { label: 'Bitter Gourd 1Kg', price: 740 }
    ],
    option2: [
        { label: 'Apple - Green 1kg', price: 2930 },
        { label: 'Avacado 1Kg', price: 410 },
        { label: 'Apple - Royal Gala 1Kg', price: 3138 },
        { label: 'Apple - U.S.A 1Kg', price: 2607 },
        { label: 'Apple - U.S.A 1Kg', price: 2607 },
        { label: 'Banana - Ambul 1Kg', price: 1050 },
        { label: 'Grapes - Black 1Kg', price: 2440 },
        { label: 'Grapes - Red 1Kg', price: 2100 },
        { label: 'Promagranete - Imported 1Kg', price: 690 },
    ],
    option3: [
        { label: 'Ambewela Set Yoghurt 6 x 80G', price: 240 },
        { label: 'Aria cheese slices 150g', price: 485 },
        { label: 'Astra Fat Spread 500g', price: 245 },
        { label: 'Bega Cheese Slices', price: 245 },
        { label: 'Buon Appetito Cheese 200g', price: 510 },
        { label: 'Flora Fat Spread 250g', price: 280 },
        { label: 'Flora Fat Spread 500g', price: 370 },
        { label: 'Fondre Fat Spread  500g', price: 458 }
    ],
    option4: [
        { label: 'Bacon slices 250g', price: 600 },
        { label: 'Beef meat balls 1Kg', price: 2904 },
        { label: 'Chicken Drumstick 1Kg', price: 1110 },
        { label: 'Chicken Thigh 1Kg', price: 1120 },
        { label: 'Chicken Whole leg 1Kg', price: 1250 },
        { label: 'Prawns 1Kg', price: 1500 },
        { label: 'Thalapath - small 1Kg', price: 2100 },
        { label: 'Tuna - Fish  1Kg', price: 3470 }
    ],
    option5: [
        { label: 'Baking powder 100g', price: 480 },
        { label: 'Cocoa Powder 500g', price: 571 },
        { label: 'Motha Gelatin 100g', price: 1021 },
        { label: 'Green coluring 25ml(s)', price: 256 },
        { label: 'Coriander seed 75g', price: 325 },
        { label: 'Curry powder 250g', price: 456 },
        { label: 'Garlic paste 240g', price: 350 },
        { label: 'White pepper powder 50g', price: 517 }
    ],
    option6: [
        { label: 'Aurica Face Wash 50ml', price: 210 },
        { label: 'Aurica Under Eye Cream 15g', price: 178 },
        { label: 'Ayush Face Cream 50g', price: 784 },
        { label: 'Dreamron Cleanser Cream 180ml', price: 470 },
        { label: 'Glow & Lovely Face Gel 170ml', price: 860 },
        { label: 'Glow & Lovely Face wash 50g', price: 1148 },
        { label: 'Lakme Absolute Hydra Pro Gel 50g', price: 2484 },
        { label: 'Lakme Absolute Perfect Serum 30ml', price: 1951 }
    ]

};

// dictionary to store the confirmed items

const selections = {
    option1: [],
    option2: [],
    option3: [],
    option4: [],
    option5: [],
    option6: []
};

// update total price 

function updateTotalPrice() {
    let totalPrice = 0;
    const items = checkboxContainer.querySelectorAll('.checkbox-item');
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantity = item.querySelector('input[type="number"]').value;
        const price = checkbox.dataset.price;

        if (checkbox.checked) {
            totalPrice += quantity * price;
        }
    });
    totalPriceContainer.textContent = `Price: Rs.${totalPrice.toFixed(2)}`;
}

// add exception to quantity

function validateInput(event) {
    const input = event.target;
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4);
    }
}

// create table 

function updateTable() {
    resultTable.innerHTML = ''; // Clear existing rows
    let grandTotalPrice = 0;

    for (const [option, items] of Object.entries(selections)) {
        items.forEach(item => {
            const row = document.createElement('tr');

            const productCell = document.createElement('td');
            productCell.textContent = item.label;

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;

            const priceCell = document.createElement('td');
            priceCell.textContent = `Rs.${(item.quantity * item.price).toFixed(2)}`;

            row.appendChild(productCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);

            resultTable.appendChild(row);

            grandTotalPrice += item.quantity * item.price;

        });

    }

    tableTotalPrice.textContent = `Rs.${grandTotalPrice.toFixed(2)}`;

    if (resultTable.innerHTML === '') {
        resultTableContainer.style.display = 'none';
    } else {
        resultTableContainer.style.display = 'block';
    }
}

// confirm selection and pushing values to table

function confirmSelection() {
    const selectedOption = optionList.value;
    const items = checkboxContainer.querySelectorAll('.checkbox-item');
    selections[selectedOption] = []; // Clear existing selections for the selected option

    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantity = item.querySelector('input[type="number"]').value;
        const price = checkbox.dataset.price;

        if (checkbox.checked && quantity > 0) {
            selections[selectedOption].push({
                label: checkbox.name,
                quantity: quantity,
                price: price
            });
        }
    });

    updateTable();
}

//  add favorites and use favprites
function addToFavorites() {
    if (resultTable.rows.length == 0) {
        alert("Please select items bofore adding to favorites")
        
    }else{
        localStorage.setItem('favorites', JSON.stringify(selections));
        alert('Items added to favorites');

    }
 
}

function useFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        alert('No favorites found!');
        
    } else {
        Object.assign(selections, favorites);
        updateTable();  
    }
}



function resetSelections() {
    for (const option in selections) {
        selections[option] = [];
    }
    updateTable();
    totalPriceContainer.textContent = ' Price: Rs.0';
    checkboxContainer.innerHTML = ''; // Clear existing checkboxes
    optionList.value = ''; // Reset select box
}


function buynow() {
    localStorage.setItem('selectedItems', JSON.stringify(selections));
    window.location.href = 'payment_method.html';
}

// creating checkboxes according to selected option

function createCheckboxes () {
    const selectedOption = optionList.value;

    checkboxContainer.innerHTML = ''; // Clear existing checkboxes

    if (checkboxes[selectedOption]) {
        checkboxes[selectedOption].forEach(item => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.label;
            checkbox.name = item.label;
            checkbox.dataset.price = item.price;
            checkbox.className = 'check'
        

            const checkboxLabel = document.createElement('label');
            checkboxLabel.htmlFor = item.label;
            checkboxLabel.appendChild(document.createTextNode(`${item.label} (Rs.${item.price})`));

            const numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.min = 0;
            numberInput.max = 20;
            numberInput.value = 0;
            numberInput.addEventListener('input', updateTotalPrice);
            numberInput.addEventListener('input', validateInput);

            checkbox.addEventListener('change', updateTotalPrice);

            checkboxItem.appendChild(checkbox);
            checkboxItem.appendChild(checkboxLabel);
            checkboxItem.appendChild(numberInput);

            checkboxContainer.appendChild(checkboxItem);
        });
    }
}

optionList.addEventListener('change',createCheckboxes );
confirmButton.addEventListener('click', confirmSelection);
addToFavoriteButton.addEventListener('click', addToFavorites);
useFavoriteButton.addEventListener('click', useFavorites);
resetButton.addEventListener('click', resetSelections);
PaynowButton.addEventListener('click', buynow);


