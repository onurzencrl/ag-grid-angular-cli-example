import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, RowValueChangedEvent } from '@ag-grid-community/core';
import { Subscription } from 'rxjs';
import { District, DistrictModel } from './district-model';
import { DistrictService } from './district.service';
import { CityService } from '../city/city.service';
import { City } from '../city/city-model';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit, OnDestroy  {
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
                      field: "cityName",
                      cellEditor: "agSelectCellEditor",
                      editable: true,
                      cellEditorParams: {
                        values: this.citiesJustName,
                      },
                    },
                
                ]
              },

        ];

orders: DistrictModel[] = [];

ngOnInit(): void {
  this.getDistricts();
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
cityList: any[] = [];
getCities(){
  this._cityService.getCitys(0, 10).subscribe((data: City) => {
    // this.orders = data;
    this.cityList = data.items;
    data.items.forEach((item) => {
      this.citiesJustName.push(item.name);
    });
  });
}

deleteRow() {
  this.selectedDataSubscription = this.gridEventService.getSelectedData().subscribe(data => {
    this.selectedData = data;
    this.selectedData.forEach((item) => {
        this._service.deleteDistrict(item.id).subscribe(
          response => {
            console.log('District deleted successfully!', response);
          },
          error => {
            console.error('Error deleting order:', error);
          }
        );
    })    
    this.getDistricts()

  });
}


getDistricts(){
  this._service.getDistricts(0, 10).subscribe((data: District) => {
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
constructor(private _service : DistrictService , private _cityService : CityService ,  private fb: FormBuilder , private gridEventService: OnurTableService) {
  this.gridOptions = {
    onGridReady: this.onGridReady.bind(this),
    // Diğer gridOptions yapılandırmaları
  };

  this.orderForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    imageUrl: [''],
    isDeleted: [true],
    cityId: [null]
  });
}
update(data: any) {
  console.log('Received data from DistrictsComponent:', data);
  data[0].isDeleted = true;
  var category = this.citiesJustName.find(x => x == data[0].parentName);
  if (category) {
    var parentDistricts = this.citiesJustName.find(x => x == category);
    if (parentDistricts) {
      data[0].parentDistrictsId = parentDistricts;
    } else {
      console.error('Parent category not found.');
      // Handle the case where the parent category is not found
    }
  }
  this._service.updateDistricts(data[0]).subscribe(
    response => {
      console.log('District updated successfully!', response);
    },
    error => {
      console.error('Error updating order:', error);
    }
  );
}

onSubmit() {
  if (this.orderForm.valid) {
    var data : DistrictModel = this.orderForm.value;
    this._service.createDistrict(data).subscribe(
      response => {
        console.log('District created successfully!', response);
        this.getDistricts()

      },
      error => {
        console.error('Error creating category:', error);
        this.getDistricts()
      }
    );
  }
}
}
