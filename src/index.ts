import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCropperComponent } from './angular-cropper.component';

export * from './angular-cropper.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AngularCropperComponent
    ],
    exports: [
        AngularCropperComponent
    ]
})
export class AngularCropperModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularCropperModule,
            providers: []
        };
    }
}