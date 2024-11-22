import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriberService } from './subscriber.service';
import { Subscription } from 'rxjs';
import { SubscriberModel } from './subscriber-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit, OnDestroy {
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
  subscriberForm: FormGroup;
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
          field: 'email',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },
      ]
    },
  ];
  Subscribers: SubscriberModel[] = [];

  ngOnInit(): void {
    this.getSubscribers();
    this.gridEventService.cellValueChanged$.subscribe((data : any) => {
      this.update(data);
    });
  }

  ngOnDestroy(): void {
    if (this.selectedDataSubscription) {
      this.selectedDataSubscription.unsubscribe();
    }
  }

  deleteRow() {
    this.selectedDataSubscription = this.gridEventService.getSelectedData().subscribe((data : any) => {
      this.selectedData = data;
      this.selectedData.forEach((item) => {
        this._service.deleteSubscriber(item.id).subscribe(
          response => {
            console.log('Subscriber deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Subscriber:', error);
          }
        );
      });
      this.getSubscribers();
    });
  }

  getSubscribers() {
    this._service.getSubscribers(0, 10).subscribe((data: any) => {
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

  constructor(private _service: SubscriberService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.subscriberForm = this.fb.group({
      email: ['', Validators.required],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from SubscriberComponent:', data);
    data[0].isDeleted = true;
    this._service.updateSubscriber(data[0]).subscribe(
      response => {
        console.log('Subscriber updated successfully!', response);
      },
      error => {
        console.error('Error updating Subscriber:', error);
      }
    );
  }

  onSubmit() {
    if (this.subscriberForm.valid) {
      var data: SubscriberModel = this.subscriberForm.value;
      this._service.createSubscriber(data).subscribe(
        response => {
          console.log('Subscriber created successfully!', response);
          this.getSubscribers();
        },
        error => {
          console.error('Error creating Subscriber:', error);
          this.getSubscribers();
        }
      );
    }
  }
}
