const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadBook);

function loadBook(){
  loadContent();
}

function loadContent(){
  //Remove book Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //product item change event
   let qtyElement=document.querySelectorAll('.cart-quantity');
  qtyElement.forEach((input)=>{
  input.addEventListener('change',changeQty);
  });

  //product cart 
    let cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();

}

//remove item 
function removeItem(){
  if(confirm('Are You Sure To Remove')){
  this.parentElement.remove();
      let title=this.parentElement.querySelector('.cart-book-title').innerHTML;
      itemList=itemList.filter(el=>el.title!=title);
      this.parentElement.remove();
      loadContent();
  }
}


//change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;

  }
  loadContent();
}

let itemList=[];

//add cart
function addCart(){
 let book=this.parentElement;
 let title=book.querySelector('.book-title').innerHTML;
 let price=book.querySelector('.book-price').innerHTML;
 let imgsrc=book.querySelector('.book-img').src;
//  console.log(title,price,imgsrc);

 let newProduct={title,price,imgsrc}

//Check Product already Exist in Cart
if(itemList.find((el)=>el.title==newProduct.title))
{
  alert("Product Already added in Cart");
  return;
}else{
  itemList.push(newProduct)
}

let newProductElement= createCartProduct(title,price,imgsrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();

}

function createCartProduct(title,price,imgSrc){
  return`
  <div class="cart-box">
                    <img src="${imgSrc}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-book-title">${title}</div>
                        <div class="price-box">
                            <div class="cart-price">${price}</div>
                            <div class="cart-amt">${price}</div>
                        </div>
                        <input type="number" class="cart-quantity">
                    </div>
                    <ion-icon name="trash" class="cart-remove"></ion-icon>
                   </div> 
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{

     let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+price*qty;
  });

  totalValue.innerHTML='Rs.'+total;

  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
   let count=itemList.length;
   cartCount.innerHTML=count;

    if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }
}