// Function to display customers
let display = () => {
    let cleanlist = JSON.parse(localStorage.getItem('items'));
    let customersList = document.getElementById('customers-list');
    let out = "";
    if (cleanlist) {
        cleanlist.forEach((customer, index) => {
            out += `
                <div class="customercard">
                <img src="${customer.image}" alt="${customer.name}">
                <h3>${customer.name}</h3>
                <p>Phone: ${customer.phone}</p>
                <p>Address: ${customer.address}</p>
                    <a href="edit_customer.html?index=${index}"><button id="edit">Edit</button></a>
                    <button id="delete" onclick="deleteCustomer(${index})">Delete</button>
                </div>
            `;
        });
    }
    customersList.innerHTML = out;
}

// Function to add a new customer
let addCustomer = (image, customerName, phone, address) => {
    let newCustomer = {
        image: image,
        name: customerName,
        phone: phone,
        address: address
    };

    // Check if 'items' key exists in localStorage
    let storedItems = localStorage.getItem('items');
    if (storedItems !== null) {
        // Parse the stored array and add the new customer
        let cleanlist = JSON.parse(storedItems);
        cleanlist.push(newCustomer);
        localStorage.setItem('items', JSON.stringify(cleanlist));
    } else {
        // Initialize a new array with the new customer
        localStorage.setItem('items', JSON.stringify([newCustomer]));
    }
}

// Event listener for the add button
const add = document.getElementById('add');
if (add) {
    add.addEventListener('click', (event) => {
        event.preventDefault();
        const image = document.getElementById('image').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        addCustomer(image, name, phone, address);
         // Update the displayed list of customers
        // Reset form fields after submission
        document.getElementById('add-customer-form').reset();
        window.location.href = 'index.html';
    });
}



// Function to delete a customer
let deleteCustomer = (index) => {
    let cleanlist = JSON.parse(localStorage.getItem('items'));
    cleanlist.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(cleanlist));
    display();
}



// Call display to initially display any existing customers
display();
