import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
import { Subscription } from 'rxjs';
import { ServiceModel } from './service-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {
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
  serviceForm: FormGroup;
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
  Services: ServiceModel[] = [];

  ngOnInit(): void {
    this.getServices();
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
        this._service.deleteService(item.id).subscribe(
          response => {
            console.log('Service deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Service:', error);
          }
        );
      });
      this.getServices();
    });
  }

  getServices() {
    this._service.getServices(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: ServiceService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      url: ['', ],
      icon: ['', ],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from ServiceComponent:', data);
    data[0].isDeleted = true;
    this._service.updateService(data[0]).subscribe(
      response => {
        console.log('Service updated successfully!', response);
      },
      error => {
        console.error('Error updating Service:', error);
      }
    );
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      var data: ServiceModel = this.serviceForm.value;
      this._service.createService(data).subscribe(
        response => {
          console.log('Service created successfully!', response);
          this.getServices();
        },
        error => {
          console.error('Error creating Service:', error);
          this.getServices();
        }
      );
    }
  }
}
