import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-image-cell-renderer',
  template: `
    <div style='display:flex; align-items:center; justify-content:center;'>
      <img [src]="params.value" style="width: 50px; height: 50px; margin-right: 10px;"/>
      <input type="file" (change)="onFileSelected($event)" style="width: 50px;"/>
    </div>
  `,
})
export class ImageCellRendererComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (this.params && this.params.setValue) {
        this.params.setValue(e.target.result);  // Update the cell value with the new image URL
      } else {
        console.error('Params or setValue is undefined.');
      }
    };
    reader.readAsDataURL(file);
  }
  
}
