import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, MenuService, RowValueChangedEvent, SelectionChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProficiencyFilter } from 'src/app/onur-table/components/filters/proficiency.component.filter';
import { SkillFilter } from 'src/app/onur-table/components/filters/skill.component.filter';
import { RendererComponent } from 'src/app/onur-table/components/renderer-component/renderer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RichGridComponent } from 'src/app/onur-table/components/rich-grid-example/rich-grid.component';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { Subscription } from 'rxjs';
import { KodListModel } from 'src/app/onur-table/onur-model';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';
import { Meta, Title } from '@angular/platform-browser';
import { Menu, MenuModel } from './menus-model';
import { MenusService } from './menus.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent  implements OnInit, OnDestroy  {
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



  parentMenuList : any[] = [];
  MenuForm: FormGroup= new FormGroup({});

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
  MenuJustName : string[] = [];
  getMenus(){
    this._service.getMenus(0, 50).subscribe((data: Menu) => {
      this.rowData = data.items;
      this.parentMenuList = data.items;
      data.items.forEach((item) => {
        var findParentId = this.parentMenuList.find(x => x.id == item.parentMenuId);
        this.MenuJustName.push(item.name);

        if(findParentId != undefined)
        {
          item.parentName = findParentId!.name;
        }
        else
        {
          item.parentName = "Ana Kategori";
        }
       })

      console.log(this.MenuJustName)
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
                        field: 'name',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true
                    },    
                      {
                        field: 'url',
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
                  values: this.MenuJustName,
                },
              },
         

        ];

Menus: MenuModel[] = [];

ngOnInit(): void {
  this.gridEventService.cellValueChanged$.subscribe(data => {
    this.update(data);
  });
  this.getMenus();
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
        this._service.deleteMenu(item.id).subscribe(
          response => {
            console.log('Menu deleted successfully!', response);
          },
          error => {
            console.error('Error deleting Menu:', error);
          }
        );
    })    
    this.getMenus()

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
constructor(private _service : MenusService ,  private fb: FormBuilder , private gridEventService: OnurTableService ,private meta: Meta,private title: Title) {
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

  this.MenuForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    url: [''],
    isDeleted: [true],
    parentMenuId: [null]
  });
}

public setTitle( newTitle: string) {
  this.title.setTitle( newTitle );
  }
update(data: any) {
  console.log('Received data from MenusComponent:', data);
  data[0].isDeleted = true;
  var Menu = this.MenuJustName.find(x => x == data[0].parentName);
  if (Menu) {
    var parentMenu = this.parentMenuList.find(x => x.name == Menu);
    if (parentMenu) {
      data[0].parentMenuId = parentMenu.id;
    } else {
      console.error('Parent Menu not found.');
      // Handle the case where the parent Menu is not found
    }
  } else {
    console.error('Menu not found.');
    // Handle the case where the Menu is not found
  }
  
  this._service.updateMenu(data[0]).subscribe(
    response => {
      console.log('Menu updated successfully!', response);
    },
    error => {
      console.error('Error updating Menu:', error);
    }
  );
}

onSubmit() {
  if (this.MenuForm.valid) {
    var data : MenuModel = this.MenuForm.value;
    this._service.createMenu(data).subscribe(
      response => {
        console.log('Menu created successfully!', response);
        this.getMenus()

      },
      error => {
        console.error('Error creating Menu:', error);
        this.getMenus()
      }
    );
  }
}
}
