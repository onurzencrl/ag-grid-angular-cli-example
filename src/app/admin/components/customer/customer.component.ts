import { ColDef } from '@ag-grid-community/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls:[ './customer.component.scss']
})
export class CustomerComponent {
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];
  columnDefsFromTables = [
    {
        headerName: '#',
        width: 40,
        checkboxSelection: true,
        filter: false,
        sortable: false,
        editable: true,
        suppressMenu: true,
        pinned: true
    },
    {
        headerName: 'Employee',
        headerGroupComponent: 'headerGroupComponent',
        children: [
            {
                field: 'name',
                width: 150,
                pinned: true,
                editable: true,
                enableRowGroup: true,
                enablePivot: true
            },
            {
                field: 'country',
                width: 150,
                pinned: true,
                filterParams: {
                    cellHeight: 20
                },
                enableRowGroup: true,
                enablePivot: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'DOB',
                field: 'dob',
                width: 195,
                pinned: true,
                menuTabs: ['filterMenuTab'],
                filter: 'agDateColumnFilter',
                columnGroupShow: 'open'
            }
        ]
    },
];
}
