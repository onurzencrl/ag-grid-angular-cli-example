import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowValueChangedEvent, SelectionChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProficiencyFilter } from 'src/app/onur-table/components/filters/proficiency.component.filter';
import { SkillFilter } from 'src/app/onur-table/components/filters/skill.component.filter';
import { RendererComponent } from 'src/app/onur-table/components/renderer-component/renderer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RichGridComponent } from 'src/app/onur-table/components/rich-grid-example/rich-grid.component';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { Subscription } from 'rxjs';
import { CategoryService } from './category.service';
import { Category, CategoryModel } from './category-model';
import { KodListModel } from 'src/app/onur-table/onur-model';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  implements OnInit, OnDestroy  {
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
  public editType: "fullRow" = "fullRow";
  public themeClass: string =
    "ag-theme-quartz";

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
    );
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data;
    console.log(
      "onRowValueChanged: (" +
        data.make +
        ", " +
        data.model +
        ", " +
        data.price +
        ", " +
        data.field5 +
        ")",
    );
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(1, "make");
    this.gridApi.startEditingCell({
      rowIndex: 1,
      colKey: "make",
    });
  }



  parentCategoryList : any[] = [];
  categoryForm: FormGroup= new FormGroup({});

  rowData : any[] = [
    // { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    // { make: "Ford", model: "F-Series", price: 33850, electric: false },
    // { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
  // public columnDefs!: (ColDef | ColGroupDef)[];

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
  categoryJustName : string[] = [];
  getCategorys(){
    this._service.getCategorys(0, 10).subscribe((data: Category) => {
      this.rowData = data.items;
      this.parentCategoryList = data.items;
      data.items.forEach((item) => {
        var findParentId = this.parentCategoryList.find(x => x.id == item.parentCategoryId);
        this.categoryJustName.push(item.name);

        if(findParentId != undefined)
        {
          item.parentName = findParentId!.name;
        }
        else
        {
          item.parentName = "Ana Kategori";
        }
       })

      console.log(this.categoryJustName)
    });
  
  }
  
  public columnDefs: (ColDef | ColGroupDef)[]  = [
            
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
                    // {
                    //     field: 'id',
                    //     width: 150,
                    //     editable: true,
                    //     enableRowGroup: true,
                    //     enablePivot: true
                    // },   
                    {
                      headerName: 'Product Image',
                      field: 'imageUrl',
                      cellRenderer: ImageCellRendererComponent,
                      editable: true,
                      width: 150
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
                  values: this.categoryJustName,
                },
              },
         

        ];

categorys: CategoryModel[] = [];

ngOnInit(): void {
  this.gridEventService.cellValueChanged$.subscribe(data => {
    this.update(data);
  });
  this.getCategorys();
}


ngOnDestroy(): void {
  if (this.selectedDataSubscription) {
    this.selectedDataSubscription.unsubscribe();
  }
}

deleteRow() {
  this.selectedDataSubscription = this.gridEventService.getSelectedData().subscribe(data => {
    this.selectedData = data;
    this.selectedData.forEach((item) => {
        this._service.deleteCategory(item.id).subscribe(
          response => {
            console.log('Category deleted successfully!', response);
          },
          error => {
            console.error('Error deleting category:', error);
          }
        );
    })    
    this.getCategorys()

  });
}




openModal(){
  const modalDiv =document.getElementById('customModal')
  if(modalDiv != null)
  {
    modalDiv.style.display = 'block';

  }
}
closeModal(){
  const modalDiv =document.getElementById('customModal')
  if(modalDiv != null)
  {
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
constructor(private _service : CategoryService ,  private fb: FormBuilder , private gridEventService: OnurTableService ,private meta: Meta,private title: Title) {
  this.meta.addTags([
    {name: 'description', content: 'Home page of SEO friendly app'},
    {name: 'author', content: 'buttercms'},
    {name: 'keywords', content: 'Angular, ButterCMS'}
  ]);
  this.setTitle('Home Page');
  this.gridOptions = {
    onGridReady: this.onGridReady.bind(this),
    // Diğer gridOptions yapılandırmaları
  };

  this.categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    imageUrl: [''],
    isDeleted: [true],
    parentCategoryId: [null]
  });
}

public setTitle( newTitle: string) {
  this.title.setTitle( newTitle );
  }
update(data: any) {
  console.log('Received data from CategorysComponent:', data);
  data[0].isDeleted = true;
  var category = this.categoryJustName.find(x => x == data[0].parentName);
  if (category) {
    var parentCategory = this.parentCategoryList.find(x => x.name == category);
    if (parentCategory) {
      data[0].parentCategoryId = parentCategory.id;
    } else {
      console.error('Parent category not found.');
      // Handle the case where the parent category is not found
    }
  } else {
    console.error('Category not found.');
    // Handle the case where the category is not found
  }
  
  this._service.updateCategory(data[0]).subscribe(
    response => {
      console.log('Category updated successfully!', response);
    },
    error => {
      console.error('Error updating category:', error);
    }
  );
}

onSubmit() {
  if (this.categoryForm.valid) {
    var data : CategoryModel = this.categoryForm.value;
    data.imageUrl = this.imageUrl as string;
    this._service.createCategory(data).subscribe(
      response => {
        console.log('Category created successfully!', response);
        this.getCategorys()

      },
      error => {
        console.error('Error creating category:', error);
        this.getCategorys()
      }
    );
  }
}
}
