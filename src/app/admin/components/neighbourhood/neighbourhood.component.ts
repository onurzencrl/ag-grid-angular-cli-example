import { Component, OnDestroy, OnInit } from '@angular/core';
import { Neighbourhood, NeighbourhoodModel } from './neighbourhood-model';
import { NeighbourhoodService } from './neighbourhood.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, RowValueChangedEvent } from '@ag-grid-community/core';
import { Subscription } from 'rxjs';
import { DistrictService } from '../district/district.service';
import { District } from '../district/district-model';

@Component({
  selector: 'app-neighbourhood',
  templateUrl: './neighbourhood.component.html',
  styleUrls: ['./neighbourhood.component.scss']
})
export class NeighbourhoodComponent  implements OnInit, OnDestroy  {
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
  citiesJustName : string[] = [];

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




  orderForm: FormGroup= new FormGroup({});

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
                        field: 'name',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true
                    },    
                    {
                      field: "districtName",
                      cellEditor: "agSelectCellEditor",
                      editable: true,
                      cellEditorParams: {
                        values: this.citiesJustName,
                      },
                    },
                
                ]
              },

        ];

orders: NeighbourhoodModel[] = [];

ngOnInit(): void {
  this.getNeighbourhoods();
  this.getCities();
  this.gridEventService.cellValueChanged$.subscribe(data => {
    this.update(data);
  });
}


ngOnDestroy(): void {
  if (this.selectedDataSubscription) {
    this.selectedDataSubscription.unsubscribe();
  }
}
districtList: any[] = [];
getCities(){
  this._districtService.getDistricts(0, 10).subscribe((data: District) => {
    // this.orders = data;
    this.districtList = data.items;
    data.items.forEach((item) => {
      this.citiesJustName.push(item.name);
    });
  });
}

deleteRow() {
  this.selectedDataSubscription = this.gridEventService.getSelectedData().subscribe(data => {
    this.selectedData = data;
    this.selectedData.forEach((item) => {
        this._service.deleteNeighbourhood(item.id).subscribe(
          response => {
            console.log('Neighbourhood deleted successfully!', response);
          },
          error => {
            console.error('Error deleting order:', error);
          }
        );
    })    
    this.getNeighbourhoods()

  });
}


getNeighbourhoods(){
  this._service.getNeighbourhoods(0, 10).subscribe((data: Neighbourhood) => {
    // this.orders = data;
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
constructor(private _service : NeighbourhoodService , private _districtService : DistrictService ,  private fb: FormBuilder , private gridEventService: OnurTableService) {
  this.gridOptions = {
    onGridReady: this.onGridReady.bind(this),
    // Diğer gridOptions yapılandırmaları
  };

  this.orderForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    imageUrl: [''],
    isDeleted: [true],
    districtId: [null]
  });
}
update(data: any) {
  console.log('Received data from NeighbourhoodsComponent:', data);
  data[0].isDeleted = true;
  var category = this.citiesJustName.find(x => x == data[0].parentName);
  if (category) {
    var parentNeighbourhoods = this.citiesJustName.find(x => x == category);
    if (parentNeighbourhoods) {
      data[0].parentNeighbourhoodsId = parentNeighbourhoods;
    } else {
      console.error('Parent category not found.');
      // Handle the case where the parent category is not found
    }
  }
  this._service.updateNeighbourhood(data[0]).subscribe(
    response => {
      console.log('Neighbourhood updated successfully!', response);
    },
    error => {
      console.error('Error updating order:', error);
    }
  );
}

onSubmit() {
  if (this.orderForm.valid) {
    var data : NeighbourhoodModel = this.orderForm.value;
    this._service.createNeighbourhood(data).subscribe(
      response => {
        console.log('Neighbourhood created successfully!', response);
        this.getNeighbourhoods()

      },
      error => {
        console.error('Error creating category:', error);
        this.getNeighbourhoods()
      }
    );
  }
}
}
