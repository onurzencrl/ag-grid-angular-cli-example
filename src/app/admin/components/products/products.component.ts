import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellEditorParams, ICellRendererParams, RowValueChangedEvent, SelectionChangedEvent } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProficiencyFilter } from 'src/app/onur-table/components/filters/proficiency.component.filter';
import { SkillFilter } from 'src/app/onur-table/components/filters/skill.component.filter';
import { RendererComponent } from 'src/app/onur-table/components/renderer-component/renderer.component';
import { ProductService } from './product.service';
import { Product, ProductModel } from './product-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RichGridComponent } from 'src/app/onur-table/components/rich-grid-example/rich-grid.component';
import { OnurTableService } from 'src/app/onur-table/onur-table.service';
import { Subscription } from 'rxjs';
import { ProductTagService } from '../product-tag/product-tag.service';
import { KodListModel } from 'src/app/onur-table/onur-model';
import { ProductSpecificTagService } from '../product-specific-tag/product-specific-tag.service';
import { CategoryService } from '../category/category.service';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss',]

})


export class ProductsComponent implements OnInit, OnDestroy  {
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

  countries: KodListModel[] = [];
  products: ProductModel[] = [];
  specificProductTags: KodListModel[] = [];
  specificProductJustName: string[] = [];
  tagProductJustName: string[] = [];
  categoryJustName: string[] = [];
  productTags: KodListModel[] = [];
  categories: KodListModel[] = [];
  getSpecificProductTags(){
    this._productSpecificTagService.getProductSpecifics(0,20).subscribe((data: any) => {
      this.specificProductTags = data.items;
      this.specificProductTags.forEach((item) => {
        this.specificProductJustName.push(item.name)
      })
    });
  }



  productForm: FormGroup= new FormGroup({});

  rowData : any[] = [
    // { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    // { make: "Ford", model: "F-Series", price: 33850, electric: false },
    // { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
  // public columnDefs!: (ColDef | ColGroupDef)[];

  
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
                    headerName: 'Product Image',
                    field: 'imageUrl',
                    cellRenderer: ImageCellRendererComponent,
                    editable: true,
                    width: 150
                  },   {
                    headerName: 'Product Second Image',
                    field: 'secondImageUrl',
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
                            {
                        field: 'renk',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true,
                    },      
                     {
                        field: 'price',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true,
                    },    
                    
                    {
                        field: 'deletedPrice',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true,
                    },  
                     {
                        field: 'dealOfTheDay',
                        width: 150,
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true,
                    }, 
              {
                field: "specificTagName",
                cellEditor: "agSelectCellEditor",
                editable: true,
                cellEditorParams: {
                  values: this.specificProductJustName,
                },
              },
               {
                field: "tagName",
                cellEditor: "agSelectCellEditor",
                editable: true,
                cellEditorParams: {
                  values: this.tagProductJustName,
                },
              }, 
              {
                field: "categoryName",
                cellEditor: "agSelectCellEditor",
                editable: true,
                cellEditorParams: {
                  values: this.categoryJustName,
                },
              },


        ];


ngOnInit(): void {
  this.getProductTags()
  this.getSpecificProductTags()
  this.getCategory()
  this.getProducts();
  this.gridEventService.cellValueChanged$.subscribe(data => {
    this.update(data);
  });
}
selectedFile: File | null = null;
imageUrl: string | ArrayBuffer | null = null;
secondImageUrl: string | ArrayBuffer | null = null;
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
onSecondFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.secondImageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
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
        this._service.deleteProduct(item.id).subscribe(
          response => {
            console.log('Product deleted successfully!', response);
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
    })    
    this.getProducts()

  });
}


getProducts(){
  this._service.getProducts(0, 10).subscribe((data: Product) => {
    // this.products = data;
    this.rowData = data.items;

    data.items.forEach((item) => {
       var findNameOfTag = this.specificProductTags.find(x => x.id == item.productSpecificTagId);
        var findNameOfCategory = this.categories.find(x => x.id == item.categoryId);
        var findNameTag = this.productTags.find(x => x.id == item.tagId);
       item.specificTagName = findNameOfTag!.name;
        item.categoryName = findNameOfCategory!.name;
        item.tagName = findNameTag!.name;
      })
  });

}

getProductTags(){
  this._productTagService.getProductTags(0,20).subscribe((data: any) => {
    this.productTags = data.items;
    this.productTags.forEach((item) => {
      this.tagProductJustName.push(item.name)
    })
  });
}

getCategory(){
  this._categoryService.getCategorys(0, 10).subscribe((data: any) => {
    this.categories = data.items;
    this.categories.forEach((item) => {
      this.categoryJustName.push(item.name)
    })
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
constructor(private _service : ProductService ,private _categoryService : CategoryService, private _productTagService :ProductTagService, private _productSpecificTagService : ProductSpecificTagService,  private fb: FormBuilder , private gridEventService: OnurTableService) {
  this.gridOptions = {
    onGridReady: this.onGridReady.bind(this),
    // Diğer gridOptions yapılandırmaları
  };

  this.productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    specificTagName: [''],
    imageUrl: [''],
    productDetailText: [''],
    secondImageUrl: [''],
    isDeleted: [true],
    dealOfTheDay: [false],
    categoryId: [null],
    tagId: [null],
    stockQuantity: [0],
    price: [0],
    deletedPrice: [0],
    productSpecificTagId: [null]
  });
}
update(data: any) {
  console.log('Received data from ProductsComponent:', data);
  data[0].isDeleted = true;
  var findSpecificId = this.specificProductTags.find(x => x.name == data[0].specificTagName);
  var findCategoryId = this.categories.find(x => x.name == data[0].categoryName);
  var findTagId = this.productTags.find(x => x.name == data[0].tagName);
  data[0].categoryId = findCategoryId!.id;
  data[0].tagId = findTagId!.id;
  data[0].productSpecificTagId = findSpecificId!.id;
  this._service.updateCategory(data[0]).subscribe(
    response => {
      console.log('Product updated successfully!', response);
    },
    error => {
      console.error('Error updating product:', error);
    }
  );
}

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


onSubmit() {
  if (this.productForm.valid) {
    var data : ProductModel = this.productForm.value;
    data.imageUrl = this.imageUrl as string;
    data.secondImageUrl = this.secondImageUrl as string;
    this._service.createProduct(data).subscribe(
      response => {
        console.log('Product created successfully!', response);
        this.getProducts()

      },
      error => {
        console.error('Error creating category:', error);
        this.getProducts()
      }
    );
  }
}

}
const cellCellEditorParams = (params: ICellEditorParams<ProductModel>) => {
  const selectedspecificTagName = params.data.specificTagName;
  const allowedCities = countyToCityMap(selectedspecificTagName);
  return {
    values: allowedCities,
    formatValue: (value: any) => `${value} (${selectedspecificTagName})`,
  };
};

function countyToCityMap(match: string): string[] {
  const map: {
    [key: string]: string[];
  } = {
    Ireland: ["Dublin", "Cork", "Galway"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston"],
  };
  return map[match];
}

