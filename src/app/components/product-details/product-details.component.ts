import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    // get the "id" param string. 
    // convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductDetail(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  // add to cart 
  addToCart() {
    console.log(`Add to Cart: ${this.product.name},${this.product.unitPrice}`)
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
