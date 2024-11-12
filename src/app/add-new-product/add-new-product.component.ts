import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product ={
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages:[]

  }

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm) {

    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response: Product)=>{
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData{
    const formData=new FormData();

    formData.append(
      'product', 
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(var i=0;i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  // In your TypeScript file
onFileSelected(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.files) {
      this.product.productImages = [];  // Clear existing images if needed

      Array.from(target.files).forEach((file) => {
          const url = URL.createObjectURL(file);
          this.product.productImages.push({ file, url });
      });
  }
}

removeImages(index: number): void {
  this.product.productImages.splice(index, 1);
}


fileDropped(fileHandle: FileHandle){
  this.product.productImages.push(fileHandle);

}

}