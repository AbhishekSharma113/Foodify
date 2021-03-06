/**
  */
import { untilDestroyed } from '@core';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from '@app/cart/cart.service';
import { ProductService } from '@app/products/product.service';
import { GlobalErrorService } from '@core/services/global-error.service';

import { ProductModel } from '@core/model/product.model';
import { ApiResponseModel } from '@core/model/api-response.model';

import { faLongArrowAltLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ProductModel[];
  isLoading: boolean;
  total:number;
  faLongArrowAltLeft = faLongArrowAltLeft;
  faTimes = faTimes;
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _cartService: CartService,
    private _globalErrorService: GlobalErrorService,
    private _productService: ProductService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this._loadShoppingCart();
  }

  ngOnDestroy() {}

  deleteProductFromCart(cartProduct: ProductModel) {
    this._cartService
      .deleteProductFromCart(cartProduct.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          if (res.success && res.result.affectedRows === 1) {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Product Deleted.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this._loadShoppingCart();
          } // TODO: handle else block
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }
  private _getCartProducts() {
    this._cartService
      .getCartProducts()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.total = 0;
          this.cartItems = res.items as ProductModel[];
          for (let item of this.cartItems){
              this.total = this.total + parseInt(item.price);
          }
          this._fetchCartProductImages(this.cartItems);
          this._setLoader(false);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  private _fetchCartProductImages(cartProducts: ProductModel[]) {
    cartProducts.forEach((cartProduct) => {
      cartProduct.imagePath = this._productService.fetchProductImage(cartProduct.id);
    });
  }

  private _setLoader(val: boolean) {
    this.isLoading = val;
  }

  private _loadShoppingCart() {
    this._setLoader(true);
    this._getCartProducts();
  }
}
