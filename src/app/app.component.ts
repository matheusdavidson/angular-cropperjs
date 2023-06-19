import { Component, ViewChild } from "@angular/core";
import { CropperComponent } from "angular-cropperjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    @ViewChild(CropperComponent, { static: true })
    public cropperElement: CropperComponent;

    reset() {
        this.cropperElement.cropper.reset();
    }

    goDown() {
        this.cropperElement.cropper.move(0, 1);
    }

    goUp() {
        this.cropperElement.cropper.move(0, -1);
    }

    goRight() {
        this.cropperElement.cropper.move(10, 0);
    }

    goLeft() {
        this.cropperElement.cropper.move(-10, 0);
    }

    zoomOut() {
        this.cropperElement.cropper.zoom(-0.1);
    }

    zoomIn() {
        this.cropperElement.cropper.zoom(0.1);
    }
}
