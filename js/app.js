const loadProducts = () => {
  
  fetch('https://fakestoreapi.com/products') // All products are fetched using the correct url having all products

    .then(res => res.json())
    .then(data => showProducts(data))
                           };

loadProducts();

// To show all product in the UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // console.log(product.title);
    const image = product.image;  // There is no property inside the object that is images, rather it is image

    const div = document.createElement("div");
    div.classList.add("product");
    // styling is done to change the font color of paragraph tags located inside each boxes of differnt products 
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p> <span class="customized">Category: </span> ${product.category}</p>
      <p> <span class="customized">Rating: </span> ${product.rating.rate}</p>
      <p> <span class="customized">Number of people reviewed: </span>  ${product.rating.count}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" class="buy-now btn btn-success">Add to cart</button>
      <button onclick="productDetail(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const productDetail = productId => {
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayProductDetail(data));
}

const displayProductDetail = productInfo => {
  //  console.log(productInfo);
  const productDetails = document.getElementById('product-details');
  productDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <img src="${productInfo.image}" class="card-img-top" alt="...">
  <div class="card-body">
        <h5 class="card-title text-center">${productInfo.title}</h5>
      <p class="card-text"> <span class="customized"> Description: </span>  ${productInfo.description.slice(0, 150)}</p>
     
  </div> `;
  productDetails.appendChild(div);
};

let count = 0;
const addToCart = (id, price) => {
  // console.log("hello");
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  //  updateTotal function is called to give the final price in the cart that includes every cost.
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // parseInt is changed to parseFloat
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const finalTotal = total.toFixed(2);
  document.getElementById(id).innerText = (finalTotal);
};

// set innerText function
const setInnerText = (id, value) => {
  const values = value.toFixed(2)
  document.getElementById(id).innerText = (values);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  // the float value is coverted to two decimal places
  const finalPrice = grandTotal.toFixed(2)
  document.getElementById("total").innerText = finalPrice;
};

