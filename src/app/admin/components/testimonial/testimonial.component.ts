import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from './testimonial.service';
import { Subscription } from 'rxjs';
import { TestimonialModel } from './testimonial-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit, OnDestroy {
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
  testimonialForm: FormGroup;
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
          headerName: 'Product Image',
          field: 'imageUrl',
          cellRenderer: ImageCellRendererComponent,
          editable: true,
          width: 150
        },
        
        {
          field: 'id',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
         {
          field: 'testimonialText',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
         {
          field: 'position',
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
  Testimonials: TestimonialModel[] = [];

  ngOnInit(): void {
    this.getTestimonials();
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
        this._service.deleteTestimonial(item.id).subscribe(
          response => {
            console.log('Testimonial deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Testimonial:', error);
          }
        );
      });
      this.getTestimonials();
    });
  }

  getTestimonials() {
    this._service.getTestimonials(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: TestimonialService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.testimonialForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [''],
      testimonialText: [''],
      position: [''],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from TestimonialComponent:', data);
    data[0].isDeleted = true;
    this._service.updateTestimonial(data[0]).subscribe(
      response => {
        console.log('Testimonial updated successfully!', response);
      },
      error => {
        console.error('Error updating Testimonial:', error);
      }
    );
  }
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.testimonialForm.valid) {
      var data: TestimonialModel = this.testimonialForm.value;
      data.imageUrl = this.imageUrl as string;
      this._service.createTestimonial(data).subscribe(
        response => {
          console.log('Testimonial created successfully!', response);
          this.getTestimonials();
        },
        error => {
          console.error('Error creating Testimonial:', error);
          this.getTestimonials();
        }
      );
    }
  }
}
