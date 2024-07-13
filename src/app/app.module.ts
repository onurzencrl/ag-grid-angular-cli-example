import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// ag-grid
import { AgGridAngular } from "@ag-grid-community/angular";
// application
import { AppComponent } from "./app.component";
// rich grid
import { UiModule } from "./ui/ui.module";
import { AdminModule } from "./admin/admin.module";
import { CustomerModule } from "./admin/components/customer/customer.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    AdminModule,
    AgGridAngular,
    CustomerModule,
    BrowserAnimationsModule

],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
