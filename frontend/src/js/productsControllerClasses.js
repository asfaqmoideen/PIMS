// import { productsArray } from "./constants";


class Product{
    constructor(productId, productName, productPrice, productQuantity){
        this.id = productId;
        this.name = productName;
        this.price = productPrice;
        this.quantity = productQuantity; 
    }
}
class AddProduct{
    constructor(productName, productPrice, productQuantity){
        this.name = productName;
        this.price = productPrice;
        this.quantity = productQuantity; 
    }
}

import { getProducts, addProduct, updateProduct, deleteProduct } from "./productApiService.js";

class ProductController {

  async fetchProducts() {
    this.products = await getProducts();
    return this.products;
  }

  async addNewProduct(product) {
    const addedProduct = await addProduct(product);
  //  this.products.push(addedProduct);
    return addedProduct;
  }

  async updateExistingProduct(id, updatedProduct) {
    console.log(updatedProduct);
    const updated = await updateProduct(id, updatedProduct);
    // const productIndex = this.products.find(p => p.id === id);
    // if (productIndex) {
    // console.log(productIndex);
    //   Object.assign(productIndex, updatedProduct);
    // }
    return updated;
  }

async deleteProduct(id) {
    const isDeleted = await deleteProduct(id);
    // if (isDeleted) {
    //   this.products = this.products.filter((product) => product.id !== id);
    // }
    return isDeleted;
  }



async applyDiscount(percentage){
    const productsInDb = await this.fetchProducts();
    const dicountedArray = productsInDb.map(product => {
            product.discounprice = product.price - (product.price*percentage)/100;
            return product;
        });
    console.log(dicountedArray);
    return dicountedArray;
}
}

// --------------------------UI Funtions-------------------------------------

document.addEventListener("DOMContentLoaded", async()=>{
    const productLogic = new ProductController();
    const uiLogic = new GridUI(productLogic);
    uiLogic.renderProducts();

    const addp = document.getElementById('add-form');
    addp.addEventListener('submit',(event)=>{
        event.preventDefault();
        uiLogic.tryAddingProduct(addp);
    });

    const applyD = document.getElementById("applyDiscount");
    applyD.addEventListener("click", ()=>{
        uiLogic.tryApplyingDiscount();
    });
})



class GridUI{
    constructor(prodlogic){
        this.productLogic= prodlogic;
    }
    
    async tryAddingProduct(addform){

        if(addform){
            const response = await this.productLogic.addNewProduct(new AddProduct(
            addform.name.value,addform.price.value, addform.quantity.value))
                this.renderProducts();
                addform.reset();
                this.displayMessage(`Product Added!`, "add");
                return;
            }
        this.displayMessage("Product not Added !, Id should be unique", "add");
    }

    displayProductsTable(products) {
        const row = document.createElement('tr');
            for(let key in product){
                const cell = document.createElement('td');
                if(key == 'price' || key == 'discountedPrice'){
                    cell.textContent = `₹${product[key]}`;                    
                }
                else{
                    cell.textContent = product[key];
                }
                row.appendChild(cell);
            }
            table.appendChild(row); 
    }

    displayMessage(message, fromDiv){
        const spanItem = document.getElementById(`message-${fromDiv}`);
        spanItem.textContent = message;
        setTimeout(function(){spanItem.textContent = ""}, 3000);
    }

    async renderProducts() {
        const grid = document.getElementById("product-grid");
        grid.textContent = "";
        const productsInDb =  await this.productLogic.fetchProducts();
        productsInDb.forEach((product) => {
            const tile = document.createElement("div");
            tile.className = "tile";
            const title = document.createElement('h3');
            title.textContent = product.name;
            tile.appendChild(title);

            const pricep = document.createElement('p');
            pricep.textContent = `Price: ₹${product.price}`;
            tile.appendChild(pricep);

            const quanp = document.createElement('p');
            quanp.textContent = `Quantity: ${product.quantity}`;
            tile.appendChild(quanp);

            const actiondiv = document.createElement('div');
            actiondiv.className = "actions";
            const editbtn = document.createElement('button');
            editbtn.textContent = `📝`;
            editbtn.addEventListener('click', async()=> {
                await this.editProduct(product);
                this.displayMessage("Product Edited!","edit");
                this.renderProducts();
            })
            actiondiv.appendChild(editbtn);

            const rembtn = document.createElement('button');
            rembtn.textContent = `🗑️`;
            rembtn.addEventListener('click', async ()=> {
                const result = await this.getUserConfirmation(`to delete ${product.name}`);
                    if(result){
                        await this.productLogic.deleteProduct(product.id);
                        this.renderProducts();
                        this.displayMessage("Product Removed!","edit");
                    }
                 }
                );
                
            actiondiv.appendChild(rembtn);

            tile.appendChild(actiondiv);

            grid.appendChild(tile);
        });
    }
      
     async editProduct(product){
        const eform = document.getElementById("edit-form");
        const emodal = document.getElementById("edit-modal");
        const ecancelButton = document.getElementById("cancel-button");
        this.setEditFormDetails(eform, product);

        emodal.classList.remove("hidden");
        return new Promise((resolve)=>{
        eform.addEventListener("submit", async (event) => {
            event.preventDefault();
            const response = await this.productLogic.updateExistingProduct(eform.eid.value, new AddProduct(eform.ename.value,eform.eprice.value, eform.equantity.value));
            if(response){
                resolve(true);
            }
            emodal.classList.add("hidden");
          });
          ecancelButton.addEventListener("click", () => {
            emodal.classList.add("hidden");
                resolve(false);
          });

        })
    }

    setEditFormDetails(eform, product) {
        eform.eid.value = product.id;
        eform.eid.disabled = true;
        eform.ename.value = product.name;
        eform.eprice.value = product.price;
        eform.equantity.value = product.quantity;
    }

    async tryApplyingDiscount(){
        const percent = document.getElementById("percent");
        if(percent.value < 100 && percent.value > 0){
        this.displayProductsTable(await this.productLogic.applyDiscount(percent.value));
        this.displayMessage("Discount Applied","dis");
        }
        percent.value = "";
    }

    getUserConfirmation(context) {
        const confirm = document.getElementById('confirmation');
        const overlay = document.getElementById('overlay');
        confirm.style.display = 'block';
        overlay.style.display = 'block';
        document.getElementById('confirm-title').textContent = `Are you sure ${context}?`;
    
        return new Promise((resolve) => {
            document.getElementById('yesbtn').onclick = () => {
                confirm.style.display = 'none';
                overlay.style.display = 'none'
                resolve(true);
            };
            document.getElementById('nobtn').onclick = () => {
                confirm.style.display = 'none';
                overlay.style.display = 'none'
                resolve(false);
            };
        });
    }
}


