import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductdetailService } from './productdetail.service';
import { Subscription } from 'rxjs';
import { ProductdetailModel } from './productdetail-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { ProductService } from '../products/product.service';
import { Product, ProductModel } from '../products/product-model';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit, OnDestroy {
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

  productJustName : string[] = [];
  productList : ProductModel[] = [];
  getProducts(){
    this._productservice.getProducts(0, 100).subscribe((data: Product) => {
      // this.products = data;
      this.productList = data.items;
      this.productList.forEach((item) => {
        this.productJustName.push(item.name);
      })
     
    });
  
  }

  public editType: 'fullRow' = 'fullRow';
  public themeClass: string = 'ag-theme-quartz';
  productdetailForm: FormGroup;
  rowData: any[] = [];
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
          field: 'name',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: "productName",
          cellEditor: "agSelectCellEditor",
          editable: true,
          cellEditorParams: {
            values: this.productJustName,
          },
        },
      ]
    },
  ];
  Productdetails: ProductdetailModel[] = [];

  ngOnInit(): void {
    this.getProducts();
    this.getProductdetails();
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
        this._service.deleteProductdetail(item.id).subscribe(
          response => {
            console.log('Productdetail deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Productdetail:', error);
          }
        );
      });
      this.getProductdetails();
    });
  }

  getProductdetails() {
    this._service.getProductdetails(0, 10).subscribe((data : any ) => {
      this.rowData = data.items;
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

  editorModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],                     // blocks
      
      [{ list: 'ordered'}, { list: 'bullet' }],         // lists
      [{ indent: '-1'}, { indent: '+1' }],              // outdent/indent
      [{ align: [] }],                                  // text align
      
      ['link', 'image', 'video'],                       // media links
      
      ['clean']                                         // remove formatting
    ]
  };

  constructor(private _service: ProductdetailService, private fb: FormBuilder, private gridEventService: OnurTableService , private _productservice : ProductService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.productdetailForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', ],
      productId: ['', ],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from ProductdetailComponent:', data);
    data[0].isDeleted = true;
    this._service.updateProductdetail(data[0]).subscribe(
      response => {
        console.log('Productdetail updated successfully!', response);
      },
      error => {
        console.error('Error updating Productdetail:', error);
      }
    );
  }

  onSubmit() {
    if (this.productdetailForm.valid) {
      var data: ProductdetailModel = this.productdetailForm.value;
      this._service.createProductdetail(data).subscribe(
        response => {
          console.log('Productdetail created successfully!', response);
          this.getProductdetails();
        },
        error => {
          console.error('Error creating Productdetail:', error);
          this.getProductdetails();
        }
      );
    }
  }
}
