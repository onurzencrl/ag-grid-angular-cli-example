import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent, SelectionChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProficiencyFilter } from 'src/app/onur-table/components/filters/proficiency.component.filter';
import { SkillFilter } from 'src/app/onur-table/components/filters/skill.component.filter';
import { RendererComponent } from 'src/app/onur-table/components/renderer-component/renderer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RichGridComponent } from 'src/app/onur-table/components/rich-grid-example/rich-grid.component';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { Subscription } from 'rxjs';
import { ProductTag,  ProductTagModel } from './product-tag-model';
import { ProductTagService } from './product-tag.service';

@Component({
  selector: 'app-product-tag',
  templateUrl: './product-tag.component.html',
  styleUrls: ['./product-tag.component.scss']
})
export class ProductTagComponent implements OnInit, OnDestroy  {
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
  public editType: "fullRow" = "fullRow";
  public themeClass: string =
    "ag-theme-quartz";

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
    );
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data;
    console.log(
      "onRowValueChanged: (" +
        data.make +
        ", " +
        data.model +
        ", " +
        data.price +
        ", " +
        data.field5 +
        ")",
    );
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(1, "make");
    this.gridApi.startEditingCell({
      rowIndex: 1,
      colKey: "make",
    });
  }




  productForm: FormGroup= new FormGroup({});

  rowData : any[] = [
    // { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    // { make: "Ford", model: "F-Series", price: 33850, electric: false },
    // { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
  // public columnDefs!: (ColDef | ColGroupDef)[];



  public columnDefs: (ColDef | ColGroupDef)[]  = [
            
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
                        enablePivot: true
                    },  
                       {
                        field: 'name',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true
                    },    
                      
                
                ]
              },

        ];

products: ProductTagModel[] = [];

ngOnInit(): void {
  this.getProductTags();
  this.gridEventService.cellValueChanged$.subscribe(data => {
    this.update(data);
  });
}


ngOnDestroy(): void {
  if (this.selectedDataSubscription) {
    this.selectedDataSubscription.unsubscribe();
  }
}

deleteRow() {
  this.selectedDataSubscription = this.gridEventService.getSelectedData().subscribe(data => {
    this.selectedData = data;
    this.selectedData.forEach((item) => {
        this._service.deleteProductTag(item.id).subscribe(
          response => {
            console.log('ProductTag deleted successfully!', response);
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
    })    
    this.getProductTags()

  });
}


getProductTags(){
  this._service.getProductTags(0, 10).subscribe((data: ProductTag) => {
    // this.products = data;
    this.rowData = data.items;
  });

}


openModal(){
  const modalDiv =document.getElementById('customModal')
  if(modalDiv != null)
  {
    modalDiv.style.display = 'block';

  }
}
closeModal(){
  const modalDiv =document.getElementById('customModal')
  if(modalDiv != null)
  {
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
constructor(private _service : ProductTagService ,  private fb: FormBuilder , private gridEventService: OnurTableService) {
  this.gridOptions = {
    onGridReady: this.onGridReady.bind(this),
    // Diğer gridOptions yapılandırmaları
  };

  this.productForm = this.fb.group({
    name: ['', Validators.required],
    isDeleted: [true]
  });
}
update(data: any) {
  console.log('Received data from ProductTagsComponent:', data);
  data[0].isDeleted = true;
  
  this._service.updateProductTag(data[0]).subscribe(
    response => {
      console.log('ProductTag updated successfully!', response);
    },
    error => {
      console.error('Error updating product:', error);
    }
  );
}

onSubmit() {
  if (this.productForm.valid) {
    var data : ProductTagModel = this.productForm.value;
    this._service.createProductTag(data).subscribe(
      response => {
        console.log('ProductTag created successfully!', response);
        this.getProductTags()

      },
      error => {
        console.error('Error creating category:', error);
        this.getProductTags()
      }
    );
  }
}
}
