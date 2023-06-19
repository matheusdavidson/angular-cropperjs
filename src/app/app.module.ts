import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AngularCropperjsModule } from "angular-cropperjs";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularCropperjsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
