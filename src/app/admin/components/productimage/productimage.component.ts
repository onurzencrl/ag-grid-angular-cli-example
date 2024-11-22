import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductimageService } from './productimage.service';
import { Subscription } from 'rxjs';
import { ProductimageModel } from './productimage-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { Product } from '../products/product-model';
import { ProductService } from '../products/product.service';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';

@Component({
  selector: 'app-productimage',
  templateUrl: './productimage.component.html',
  styleUrls: ['./productimage.component.scss']
})
export class ProductimageComponent implements OnInit, OnDestroy {
  private gridReadySubscription!: Subscription;
  public gridApi!: GridApi;
  public gridColumnApi!: ColumnApi;
  public gridOptions: GridOptions;
  private selectedDataSubscription!: Subscription;
  selectedData: any[] = [];
  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    cellDataType: false,
  };
  public editType: 'fullRow' = 'fullRow';
  public themeClass: string = 'ag-theme-quartz';
  productimageForm: FormGroup;
  rowData: any[] = [];

  productList : any[] = [];
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  productJustName : string[] = [];

  getProducts(){
    this._productservice.getProducts(0, 100).subscribe((data: Product) => {
      // this.products = data;
      this.productList = data.items;
      this.productList.forEach((item) => {
        this.productJustName.push(item.name);
      })
     
    });
  
  }

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: '#',
      width: 40,
      checkboxSelection: true,
      filter: false,
      sortable: false,
      editable: true,
      suppressMenu: true,
      pinned: true,
      cellEditorPopup: true,
      cellEditorPopupPosition: 'under',
    },
    {
      headerName: 'Employee',
      headerGroupComponent: 'headerGroupComponent',
      children: [
        {
          field: 'id',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },
      
        {
          headerName: 'Product Image',
          field: 'imageUrl',
          cellRenderer: ImageCellRendererComponent,
          editable: true,
          width: 150
        }, 
      ]
    },
    {
      field: "productName",
      cellEditor: "agSelectCellEditor",
      editable: true,
      cellEditorParams: {
        values: this.productJustName,
      },
    },

  ];
  Productimages: ProductimageModel[] = [];
  ngOnInit(): void {
    this.getProducts()
    this.getProductimages();
    this.gridEventService.cellValueChanged$.subscribe((data : any )=> {
      this.update(data);
    });
  }

  ngOnDestroy(): void {
    if (this.selectedDataSubscription) {
      this.selectedDataSubscription.unsubscribe();
    }
  }



  deleteRow() {
    this.selectedDataSubscription = this.gridEventService.getSelectedData().subscribe((data : any ) => {
      this.selectedData = data;
      this.selectedData.forEach((item) => {
        this._service.deleteProductimage(item.id).subscribe(
          response => {
            console.log('Productimage deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Productimage:', error);
          }
        );
      });
      this.getProductimages();
    });
  }

  getProductimages() {
    this._service.getProductimages(0, 10).subscribe((data : any ) => {
      this.rowData = data.items;
      this.rowData.forEach((item) => {
        var product = this.productList.find(x => x.id == item.productId);
        if (product) {
          item.productName = product.name;
        } else {
          console.error('Product not found.');
        }
      })
    });
  }

  openModal() {
    const modalDiv = document.getElementById('customModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('customModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  getSelectedRows() {
    if (this.gridApi) {
      var selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows);
    } else {
      console.error('Grid API is not available.');
    }
  }

  constructor(private _service: ProductimageService, private fb: FormBuilder, private gridEventService: OnurTableService , private _productservice : ProductService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.productimageForm = this.fb.group({
      productId: [''],
      imageUrl: [''],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from ProductimageComponent:', data);
    data[0].isDeleted = true;
    var product = this.productList.find(x => x.name == data[0].productName);
    if (product) {
      var productId = this.productList.find(x => x.name == product.name);
      if (productId) {
        data[0].productId = productId.id;
      } else {
        console.error('Parent category not found.');
      }
    } else {
      console.error('Category not found.');
      // Handle the case where the category is not found
    }
    this._service.updateProductimage(data[0]).subscribe(
      response => {
        console.log('Productimage updated successfully!', response);
      },
      error => {
        console.error('Error updating Productimage:', error);
      }
    );
  }

  onSubmit() {
    if (this.productimageForm.valid) {
      var data: ProductimageModel = this.productimageForm.value;
      data.imageUrl = this.imageUrl as string;
      this._service.createProductimage(data).subscribe(
        response => {
          console.log('Productimage created successfully!', response);
          this.getProductimages();
        },
        error => {
          console.error('Error creating Productimage:', error);
          this.getProductimages();
        }
      );
    }
  }
}
