import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasketitemService } from './basketitem.service';
import { Subscription } from 'rxjs';
import { BasketitemModel } from './basketitem-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-basketitem',
  templateUrl: './basketitem.component.html',
  styleUrls: ['./basketitem.component.scss']
})
export class BasketitemComponent implements OnInit, OnDestroy {
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
  basketitemForm: FormGroup;
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
  Basketitems: BasketitemModel[] = [];

  ngOnInit(): void {
    this.getBasketitems();
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
        this._service.deleteBasketitem(item.id).subscribe(
          response => {
            console.log('Basketitem deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Basketitem:', error);
          }
        );
      });
      this.getBasketitems();
    });
  }

  getBasketitems() {
    this._service.getBasketitems(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: BasketitemService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.basketitemForm = this.fb.group({
      name: ['', Validators.required],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from BasketitemComponent:', data);
    data[0].isDeleted = true;
    this._service.updateBasketitem(data[0]).subscribe(
      response => {
        console.log('Basketitem updated successfully!', response);
      },
      error => {
        console.error('Error updating Basketitem:', error);
      }
    );
  }

  onSubmit() {
    if (this.basketitemForm.valid) {
      var data: BasketitemModel = this.basketitemForm.value;
      this._service.createBasketitem(data).subscribe(
        response => {
          console.log('Basketitem created successfully!', response);
          this.getBasketitems();
        },
        error => {
          console.error('Error creating Basketitem:', error);
          this.getBasketitems();
        }
      );
    }
  }
}
