import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassedsearchService } from './passedsearch.service';
import { Subscription } from 'rxjs';
import { PassedsearchModel } from './passedsearch-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-passedsearch',
  templateUrl: './passedsearch.component.html',
  styleUrls: ['./passedsearch.component.scss']
})
export class PassedsearchComponent implements OnInit, OnDestroy {
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
  passedsearchForm: FormGroup;
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
  Passedsearchs: PassedsearchModel[] = [];

  ngOnInit(): void {
    this.getPassedsearchs();
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
        this._service.deletePassedsearch(item.id).subscribe(
          response => {
            console.log('Passedsearch deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Passedsearch:', error);
          }
        );
      });
      this.getPassedsearchs();
    });
  }

  getPassedsearchs() {
    this._service.getPassedsearches(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: PassedsearchService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.passedsearchForm = this.fb.group({
      name: ['', Validators.required],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from PassedsearchComponent:', data);
    data[0].isDeleted = true;
    this._service.updatePassedsearch(data[0]).subscribe(
      response => {
        console.log('Passedsearch updated successfully!', response);
      },
      error => {
        console.error('Error updating Passedsearch:', error);
      }
    );
  }

  onSubmit() {
    if (this.passedsearchForm.valid) {
      var data: PassedsearchModel = this.passedsearchForm.value;
      this._service.createPassedsearch(data).subscribe(
        response => {
          console.log('Passedsearch created successfully!', response);
          this.getPassedsearchs();
        },
        error => {
          console.error('Error creating Passedsearch:', error);
          this.getPassedsearchs();
        }
      );
    }
  }
}
