import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from './campaign.service';
import { Subscription } from 'rxjs';
import { CampaignModel } from './campaign-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit, OnDestroy {
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
  campaignForm: FormGroup;
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
          field: 'text',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
        {
          field: 'title',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
         {
          field: 'discount',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },
      ]
    },
  ];
  Campaigns: CampaignModel[] = [];

  ngOnInit(): void {
    this.getCampaigns();
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
        this._service.deleteCampaign(item.id).subscribe(
          response => {
            console.log('Campaign deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Campaign:', error);
          }
        );
      });
      this.getCampaigns();
    });
  }

  getCampaigns() {
    this._service.getCampaigns(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: CampaignService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.campaignForm = this.fb.group({
      name: [''],
      text: [''],
      title: [''],
      discount: [null],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from CampaignComponent:', data);
    data[0].isDeleted = true;
    this._service.updateCampaign(data[0]).subscribe(
      response => {
        console.log('Campaign updated successfully!', response);
      },
      error => {
        console.error('Error updating Campaign:', error);
      }
    );
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      var data: CampaignModel = this.campaignForm.value;
      this._service.createCampaign(data).subscribe(
        response => {
          console.log('Campaign created successfully!', response);
          this.getCampaigns();
        },
        error => {
          console.error('Error creating Campaign:', error);
          this.getCampaigns();
        }
      );
    }
  }
}
