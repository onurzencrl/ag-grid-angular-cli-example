import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-gender-renderer-component',
    template: `
        <span>{{value}}</span>
    `
})
export class GenderRenderer implements ICellRendererAngularComp {
    public iconClass!: string;
    public value: any;

    agInit(params: ICellRendererParams): void {
        this.iconClass = params.value === 'Male' ? 'fa fa-male' : 'fa fa-female';
        this.value = params.value;
    }

    refresh(params: ICellRendererParams) {
        return false;
    }
}