import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponService } from './coupon.service';
import { Subscription } from 'rxjs';
import { CouponModel } from './coupon-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit, OnDestroy {
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
  couponForm: FormGroup;
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
          field: 'couponCode',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },  
         {
          field: 'discountRate',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },   
        {
          field: 'minLimit',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },  
         {
          field: 'isActive',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
        {
          field: 'isUsed',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
        {
          field: 'usedDate',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
        {
          field: 'isActive',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, {
          field: 'expirationDate',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },
      ]
    },
  ];
  Coupons: CouponModel[] = [];

  ngOnInit(): void {
    this.getCoupons();
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
        this._service.deleteCoupon(item.id).subscribe(
          response => {
            console.log('Coupon deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Coupon:', error);
          }
        );
      });
      this.getCoupons();
    });
  }

  getCoupons() {
    this._service.getCoupons(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: CouponService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.couponForm = this.fb.group({
      name: ['', Validators.required],
      couponCode: ['', Validators.required],
      discountRate: [null, [Validators.required, Validators.min(0)]],
      minLimit: [null, Validators.min(0)],
      expirationDate: [null, Validators.required],
      isActive: [false],
      isUsed: [false],
      usedDate: [null],
      userId: [''],
      orderId: [''],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from CouponComponent:', data);
    data[0].isDeleted = true;
    this._service.updateCoupon(data[0]).subscribe(
      response => {
        console.log('Coupon updated successfully!', response);
      },
      error => {
        console.error('Error updating Coupon:', error);
      }
    );
  }

  onSubmit() {
      var data: CouponModel = this.couponForm.value;
      this._service.createCoupon(data).subscribe(
        response => {
          console.log('Coupon created successfully!', response);
          this.getCoupons();
        },
        error => {
          console.error('Error creating Coupon:', error);
          this.getCoupons();
        }
      );
    
  }
}
