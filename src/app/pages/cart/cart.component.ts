import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: `./cart.component.html`,
  styles: [
  ]
})
export class CartComponent implements OnInit {
  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Sneakers',
    price: 150,
    quantity: 1,
    id: 1
  }, {
    product: 'https://via.placeholder.com/150',
    name: 'Sneakers',
    price: 150,
    quantity: 2,
    id: 2
  },{
    product: 'https://via.placeholder.com/150',
    name: 'Sneakers',
    price: 150,
    quantity: 3,
    id: 3
  }]}
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product', 
    'name', 
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private _cartService: CartService, private http: HttpClient) {

   }
 
  ngOnInit(): void {
    
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
   return this._cartService.getTotal(items);
  }
  onClearCart(): void {
    this._cartService.clearCart()
  }
  onRemoveFromCart(item: CartItem):void {
    this._cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void {
    this._cartService.addToCart(item)
  }
  onRemoveQuantity(item: CartItem): void {
    this._cartService.removeQuantity(item)
  }
  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51LQEhFHGqqdHRrkfhXOTt7JISBmVTCOpxJLn9WAbCnbR4sXTWhDZU3EH1sPVH1IiFkMhPAlhdy0QRxmgIedmU8gF00fDzWQIVg');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}