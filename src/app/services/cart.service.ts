import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  // subject is a subclass of observable 
  // we can use subject to publish events in our code.
  // the event will be sent to all of the subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItem: CartItem) {
    console.log('Start');
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    console.log('cartItems ' + this.cartItems.length);
    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      // for (let temp of this.cartItems) {
      //   if (temp.id == theCartItem.id) {
      //     existingCartItem = temp;
      //     break;
      //   }
      // }
      // if did not find a product will return undefined
      existingCartItem = this.cartItems.find(temp => temp.id === theCartItem.id);
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined)
    }
    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }
    // compute cart total quantity and price
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new value.. 
    // all subscribers will recive the new data
    // .next(..) --> publish/send event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for (let temp of this.cartItems) {
      const subTotalPrice = temp.quantity * temp.unitPrice;
      console.log(`name: ${temp.name}, 
                   quantity=${temp.quantity}, 
                   unitPrice= ${temp.unitPrice}, 
                   subTotalPrice = ${subTotalPrice}`);

    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, TotalQuantity: ${totalQuantityValue}`);
    console.log('================');
  }

}
