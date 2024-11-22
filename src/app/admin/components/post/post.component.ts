import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';
import { PostModel } from './post-model';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  private gridReadySubscription!: Subscription;
  public gridApi!: GridApi;
  public gridColumnApi!: ColumnApi;
  public gridOptions: GridOptions;
  private selectedDataSubscription!: Subscription;
  @ViewChild('editor') editor!: QuillEditorComponent;

  selectedData: any[] = [];
  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    cellDataType: false,
  };
  postModel = { content: '' };

  // Quill editor modules configuration
  editorModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],                     // blocks
      
      [{ list: 'ordered'}, { list: 'bullet' }],         // lists
      [{ indent: '-1'}, { indent: '+1' }],              // outdent/indent
      [{ align: [] }],                                  // text align
      
      ['link', 'image', 'video'],                       // media links
      
      ['clean']                                         // remove formatting
    ]
  };

  savePost() {
    console.log(this.postModel);  // Here you can save the blog post
  }
  
  public editType: 'fullRow' = 'fullRow';
  public themeClass: string = 'ag-theme-quartz';
  postForm: FormGroup;
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
      headerName: 'Posts',
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
          field: 'title',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        }, 
        
        {
          field: 'subtitle',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },  
        {
          field: 'content',
          width: 150,
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
        },
      ]
    },
  ];
  Posts: PostModel[] = [];

  ngOnInit(): void {
    this.getPosts();
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
        this._service.deletePost(item.id).subscribe(
          response => {
            console.log('Post deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Post:', error);
          }
        );
      });
      this.getPosts();
    });
  }

  getPosts() {
    this._service.getPosts(0, 10).subscribe((data : any ) => {
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

  constructor(private _service: PostService, private fb: FormBuilder, private gridEventService: OnurTableService) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      // Diğer gridOptions yapılandırmaları
    };
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      content: ['', Validators.required],
      isDeleted: [true]
    });
  }

  update(data: any) {
    console.log('Received data from PostComponent:', data);
    data[0].isDeleted = true;
    this._service.updatePost(data[0]).subscribe(
      response => {
        console.log('Post updated successfully!', response);
      },
      error => {
        console.error('Error updating Post:', error);
      }
    );
  }

  onSubmit() {
    if (this.postForm.valid) {
      var data: PostModel = this.postForm.value;
      data.subtitle = 'Subtitle';
      data.publishedDate = new Date();
      this._service.createPost(data).subscribe(
        response => {
          console.log('Post created successfully!', response);
          this.getPosts();
        },
        error => {
          console.error('Error creating Post:', error);
          this.getPosts();
        }
      );
    }
  }
}
