// Function to display customers
loadPosts = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/posts");
    const data = await response.json();
    if (data && data.length > 0) {
      // Example of data structure:
      //       {
      //   "_id": "6825095de213e53727ebe566",
      //   "title": "middleware test",
      //   "category": "middleware",
      //   "author": {
      //     "firstName": "Nomso",
      //     "lastName": "Ogan",
      //     "email": "nomsogan@gmail.com"
      //   },
      //   "body": "I hope this works"
      // }
      let cleanlist = data.map((post) => {
        return {
          title: post.title,
          category: post.category,
          author: post.author,
          body: post.body
        };
      });
      console.log(cleanlist);
      let customersList = document.getElementById("customers-list");
      let out = "";
      if (cleanlist) {
        cleanlist.forEach((customer, index) => {
          out += `
                <div class="customercard">
                <h3>${customer.title}</h3>
                <p>Category: ${customer.category}</p>
                <p>Author: ${customer.author.firstName} ${customer.author.lastName}</p>
                <p>Body: ${customer.body}</p>
                    <a href="edit_customer.html?index=${index}"><button id="edit">Edit</button></a>
                    <button id="delete" onclick="deleteCustomer(${index})">Delete</button>
                </div>
            `;
        });
      }
      customersList.innerHTML = out;
      if (!cleanlist || cleanlist.length === 0) {
        const addButton = document.getElementById("addButton");
        addButton.classList.add("scaleUp");
      }
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

let display = () => {

};

// Function to add a new customer
let addCustomer = (image, customerName, phone, address) => {
  let newCustomer = {
    image: image,
    name: customerName,
    phone: phone,
    address: address,
  };

  // Check if 'items' key exists in localStorage
  let storedItems = localStorage.getItem("items");
  if (storedItems !== null) {
    // Parse the stored array and add the new customer
    let cleanlist = JSON.parse(storedItems);
    cleanlist.push(newCustomer);
    localStorage.setItem("items", JSON.stringify(cleanlist));
  } else {
    // Initialize a new array with the new customer
    localStorage.setItem("items", JSON.stringify([newCustomer]));
  }
};

// Event listener for the add button
const add = document.getElementById("add");
if (add) {
  add.addEventListener("click", (event) => {
    event.preventDefault();
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    addCustomer(image, name, phone, address);
    // Update the displayed list of customers
    // Reset form fields after submission
    document.getElementById("add-customer-form").reset();
    window.location.href = "index.html";
  });
}

// Function to delete a customer
let deleteCustomer = (index) => {
  let cleanlist = JSON.parse(localStorage.getItem("items"));
  cleanlist.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(cleanlist));
  display();
};

// Call display to initially display any existing customers
loadPosts();
// display();
