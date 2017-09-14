import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCropperjsComponent } from './angular-cropperjs.component';

export * from './angular-cropperjs.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AngularCropperjsComponent
    ],
    exports: [
        AngularCropperjsComponent
    ]
})
export class AngularCropperjsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularCropperjsModule,
            providers: []
        };
    }
}