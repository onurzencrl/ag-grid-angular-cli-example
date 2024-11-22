import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterService } from './filter.service';
import { Subscription } from 'rxjs';
import { FilterModel } from './filter-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private gridReadySubscription!: Subscription;
  public gridApi!: GridApi;
  public gridColumnApi!: ColumnApi;
  public gridOptions: GridOptions;
  private selectedDataSubscription!: Subscription;
  selectedData: any[] = [];
  parentFilterList : any[] = [];
  filterJustName : string[] = [];
  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    cellDataType: false,
  };
  public editType: 'fullRow' = 'fullRow';
  public themeClass: string = 'ag-theme-quartz';
  filterForm: FormGroup;
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
          enablePivot: true
      },    
        {
          field: 'description',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
      },
  
  ]
},
{
  field: "parentName",
  cellEditor: "agSelectCellEditor",
  editable: true,
  cellEditorParams: {
    values: this.filterJustName,
  },
},
      ]

  Filters: FilterModel[] = [];

  ngOnInit(): void {
    this.getFilters();
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
        this._service.deleteFilter(item.id).subscribe(
          response => {
            console.log('Filter deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Filter:', error);
          }
        );
      });
      this.getFilters();
    });
  }



  getFilters() {
    this._service.getFilters(0, 10).subscribe((data : any ) => {
      this.rowData = data.items;
      this.parentFilterList = data.items;
      data.items.forEach((item : any) => {
        var findParentId = this.parentFilterList.find(x => x.id == item.parentFilterId);
        this.filterJustName.push(item.name);

        if(findParentId != undefined)
        {
          item.parentName = findParentId!.name;
        }
        else
        {
          item.parentName = "Ana Kategori";
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

  constructor(private _service: FilterService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.filterForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',],
      parentFilterId: [null],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from FilterComponent:', data);
    data[0].isDeleted = true;
    var category = this.filterJustName.find(x => x == data[0].parentName);
    this._service.updateFilter(data[0]).subscribe(
      response => {
        console.log('Filter updated successfully!', response);
      },
      error => {
        console.error('Error updating Filter:', error);
      }
    );
  }

  onSubmit() {
    if (this.filterForm.valid) {
      var data: FilterModel = this.filterForm.value;

      this._service.createFilter(data).subscribe(
        response => {
          console.log('Filter created successfully!', response);
          this.getFilters();
        },
        error => {
          console.error('Error creating Filter:', error);
          this.getFilters();
        }
      );
    }
  }
}
