import {
    Component,
    ViewEncapsulation,
    ElementRef,
    ViewChild,
    Input,
    EventEmitter,
    Output
} from "@angular/core";
import Cropper from "cropperjs";

export interface ImageCropperSetting {
    width: number;
    height: number;
}

export interface ImageCropperResult {
    imageData: Cropper.ImageData;
    cropData: Cropper.CropBoxData;
    blob?: Blob;
    dataUrl?: string;
}

@Component({
    selector: 'angular-cropper',
    templateUrl: './cropper.component.html',
    styleUrls: ['./cropper.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CropperComponent {

    @ViewChild('image') image: ElementRef;

    @Input() imageUrl: any;
    @Input() settings: ImageCropperSetting;
    @Input() cropbox: Cropper.CropBoxData;
    @Input() loadImageErrorText: string;
    @Input() cropperOptions: any = {};

    @Output() export = new EventEmitter<ImageCropperResult>();
    @Output() ready = new EventEmitter();

    public isLoading = true;
    public cropper: Cropper;
    public imageElement: HTMLImageElement;
    public loadError: any;

    constructor() {}

    /**
     * Image loaded
     * @param ev
     */
    public imageLoaded(ev: Event): void {
        //
        // Unset load error state
        this.loadError = false;

        //
        // Setup image element
        const image = ev.target as HTMLImageElement;
        this.imageElement = image;

        //
        // Add crossOrigin?

        if (this.cropperOptions.checkCrossOrigin) {
            image.crossOrigin = "anonymous";
        }
        //
        // Image on ready event
        image.addEventListener("ready", () => {
            //
            // Emit ready
            this.ready.emit(true);

            //
            // Unset loading state
            this.isLoading = false;

            //
            // Validate cropbox existance
            if (this.cropbox) {
                //
                // Set cropbox data
                this.cropper.setCropBoxData(this.cropbox);
            }
        });

        //
        // Setup aspect ratio according to settings
        let aspectRatio = NaN;
        if (this.settings) {
            const { width, height } = this.settings;
            aspectRatio = width / height;
        }

        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = {
            aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true,
            ...this.cropperOptions
        };

        //
        // Set cropperjs
        this.cropper = new Cropper(image, this.cropperOptions);
    }

    /**
     * Image load error
     * @param event
     */
    public imageLoadError(event: any): void {
        //
        // Set load error state
        this.loadError = true;

        //
        // Unset loading state
        this.isLoading = false;
    }

    /**
     * Export canvas
     * @param base64
     */
    public exportCanvas(base64?: any): void {
        //
        // Get and set image, crop and canvas data
        const imageData = this.cropper.getImageData();
        const cropData = this.cropper.getCropBoxData();
        const canvas = this.cropper.getCroppedCanvas();
        const data = { imageData, cropData };

        //
        // Create promise to resolve canvas data
        const promise = new Promise(resolve => {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL("image/png")
                });
            }
            canvas.toBlob(blob => resolve({ blob }));
        });

        //
        // Emit export data when promise is ready
        promise.then((res: { blob?: Blob; dataUrl?: string }) => {
            this.export.emit({ ...data, ...res });
        });
    }
}
