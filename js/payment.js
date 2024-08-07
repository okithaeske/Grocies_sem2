const resultTable = document.getElementById('resultTable').querySelector('tbody');
const tableTotalPrice = document.getElementById('tableTotalPrice');
const Name = document.getElementById("name");
const streetNo = document.getElementById("street_no");
const telNo = document.getElementById("tel_no");
const streetName = document.getElementById("street_name");
const cityName = document.getElementById("city_name");
const CardName = document.getElementById("Card_name");
const submit = document.getElementById("payment_submit")



// importing local storage and displaying the table 


function updateTable(){
    const selections = JSON.parse(localStorage.getItem('selectedItems'));
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

    tableTotalPrice.textContent = `Rs${grandTotalPrice.toFixed(2)}`;
}
updateTable();

// exception handling for the payment form

Name.addEventListener("input", function () {
    Name.value = (Name.value).replace(/\d/g, '');

})
streetNo.addEventListener("input", function () {
    streetNo.value = (streetNo.value).replace(/[A-Za-z]/g, '');

})
streetName.addEventListener("input", function () {
    streetName.value = (streetName.value).replace(/\d/g, '');

})
cityName.addEventListener("input", function () {
    cityName.value = (cityName.value).replace(/\d/g, '');

})
telNo.addEventListener("input", function () {
    telNo.value = (telNo.value).replace(/[A-Za-z]/g, '');

})
CardName.addEventListener("input", function () {
    CardName.value = (CardName.value).replace(/[A-Za-z]/g, '');

})


function showPay()
{
    const c_name = Name.value
    const customerAddress =  (`${streetNo.value},${streetName.value}, ${cityName.value}`)
    
    const Delidate = new Date();
    let date = Delidate.getDate() +1
    let month = Delidate.getMonth() + 1
    let year = Delidate.getFullYear()

    let delidate = `${date}-${month}-${year}`

    alert(`Order of ${c_name} has been succesfully confirmed.\nIt will be delivered to ${customerAddress} by ${delidate}`)


    



}
submit.addEventListener("click",showPay)


