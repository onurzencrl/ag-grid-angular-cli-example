import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavproductService } from './favproduct.service';
import { Subscription } from 'rxjs';
import { FavproductModel } from './favproduct-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-favproduct',
  templateUrl: './favproduct.component.html',
  styleUrls: ['./favproduct.component.scss']
})
export class FavproductComponent implements OnInit, OnDestroy {
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
  favproductForm: FormGroup;
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
      ]
    },
  ];
  Favproducts: FavproductModel[] = [];

  ngOnInit(): void {
    this.getFavproducts();
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
        this._service.deleteFavproduct(item.id).subscribe(
          response => {
            console.log('Favproduct deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Favproduct:', error);
          }
        );
      });
      this.getFavproducts();
    });
  }

  getFavproducts() {
    this._service.getFavproducts(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: FavproductService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.favproductForm = this.fb.group({
      name: ['', Validators.required],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from FavproductComponent:', data);
    data[0].isDeleted = true;
    this._service.updateFavproduct(data[0]).subscribe(
      response => {
        console.log('Favproduct updated successfully!', response);
      },
      error => {
        console.error('Error updating Favproduct:', error);
      }
    );
  }

  onSubmit() {
    if (this.favproductForm.valid) {
      var data: FavproductModel = this.favproductForm.value;
      this._service.createFavproduct(data).subscribe(
        response => {
          console.log('Favproduct created successfully!', response);
          this.getFavproducts();
        },
        error => {
          console.error('Error creating Favproduct:', error);
          this.getFavproducts();
        }
      );
    }
  }
}
