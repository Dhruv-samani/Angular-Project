import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApisService } from '../services/apis.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  public productForm !: FormGroup;

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];

  actionBtn: string = "Save";

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private formBuilder: FormBuilder, private apis: ApisService, private dialofRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.apis.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("Product Added successfully");
              this.productForm.reset();
              this.dialofRef.close('save');
              
            },
            error: () => {
              alert("Error while adding the product")
            }
          })
      }
    } else {
      this.updateData();
    }
  }
  updateData() {
    this.apis.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product Updated Successfully")
          this.productForm.reset();
          this.dialofRef.close('update');
        },
        error: () => {
          alert("Error While Updating the Record!")
        }
      })
  }
}
