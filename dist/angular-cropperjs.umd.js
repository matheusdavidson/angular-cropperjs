(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('cropperjs/dist/cropper')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'cropperjs/dist/cropper'], factory) :
	(factory((global['angular-cropperjs'] = {}),global.core,global.common,global.Cropper));
}(this, (function (exports,core,common,Cropper) { 'use strict';

var AngularCropperjsComponent = (function () {
    function AngularCropperjsComponent() {
        /*--------  View child elements  --------*/
        /*--------  Output events  --------*/
        this.export = new core.EventEmitter();
        this.ready = new core.EventEmitter();
        this.isLoading = true;
    }
    /**
     * Image lodaded event
     * @param {?} ev
     * @return {?}
     */
    AngularCropperjsComponent.prototype.imageLoaded = function (ev) {
        var _this = this;
        //
        // Unset load error state
        this.loadError = false;
        //
        // Setup image element
        var /** @type {?} */ image = (ev.target);
        this.imageElement = image;
        // 
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin)
            image.crossOrigin = 'anonymous';
        //
        // Image on ready event
        image.addEventListener('ready', function () {
            //
            // Emit ready
            _this.ready.emit(true);
            //
            // Unset loading state
            _this.isLoading = false;
            //
            // Validate cropbox existance
            if (_this.cropbox) {
                //
                // Set cropbox data
                _this.cropper.setCropBoxData(_this.cropbox);
            }
        });
        //
        // Setup aspect ratio according to settings
        var /** @type {?} */ aspectRatio = NaN;
        if (this.settings) {
            var _a = this.settings, width = _a.width, height = _a.height;
            aspectRatio = width / height;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio: aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);
        //
        // Set cropperjs
        this.cropper = new Cropper(image, this.cropperOptions);
    };
    /**
     * Image load error
     * @param {?} event
     * @return {?}
     */
    AngularCropperjsComponent.prototype.imageLoadError = function (event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    };
    /**
     * Export canvas
     * @param {?=} base64
     * @return {?}
     */
    AngularCropperjsComponent.prototype.exportCanvas = function (base64) {
        var _this = this;
        //
        // Get and set image, crop and canvas data
        var /** @type {?} */ imageData = this.cropper.getImageData();
        var /** @type {?} */ cropData = this.cropper.getCropBoxData();
        var /** @type {?} */ canvas = this.cropper.getCroppedCanvas();
        var /** @type {?} */ data = { imageData: imageData, cropData: cropData };
        //
        // Create promise to resolve canvas data
        var /** @type {?} */ promise = new Promise(function (resolve) {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(function (blob) { return resolve({ blob: blob }); });
        });
        //
        // Emit export data when promise is ready
        promise.then(function (res) {
            _this.export.emit(Object.assign(data, res));
        });
    };
    return AngularCropperjsComponent;
}());
AngularCropperjsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'angular-cropper',
                template: "<div class=\"angular-cropper-wrapper\"> <div class=\"loading-block\" *ngIf=\"isLoading\"> <div class=\"spinner\"></div></div><div class=\"alert alert-warning\" *ngIf=\"loadError\">{{loadImageErrorText}}</div><div class=\"cropper\"> <img #image alt=\"image\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\"/> </div></div>",
                styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%}.angular-cropper-wrapper{position:relative;min-height:80px}.angular-cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.angular-cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@-webkit-keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}/*!  * Cropper.js v0.8.1  * https://github.com/fengyuanchen/cropperjs  *  * Copyright (c) 2015-2016 Fengyuan Chen  * Released under the MIT license  *  * Date: 2016-09-03T04:55:16.458Z  */.cropper-container{font-size:0;line-height:0;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr}.cropper-container img{display:block;min-width:0!important;max-width:none!important;min-height:0!important;max-height:none!important;width:100%;height:100%;image-orientation:0deg}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{position:absolute;top:0;right:0;bottom:0;left:0}.cropper-wrap-box{overflow:hidden}.cropper-drag-box{opacity:0;background-color:#fff}.cropper-modal{opacity:.5;background-color:#000}.cropper-view-box{display:block;overflow:hidden;width:100%;height:100%;outline:#39f solid 1px;outline-color:rgba(51,153,255,.75)}.cropper-dashed{position:absolute;display:block;opacity:.5;border:0 dashed #eee}.cropper-dashed.dashed-h{top:33.33333333%;left:0;width:100%;height:33.33333333%;border-top-width:1px;border-bottom-width:1px}.cropper-dashed.dashed-v{top:0;left:33.33333333%;width:33.33333333%;height:100%;border-right-width:1px;border-left-width:1px}.cropper-center{position:absolute;top:50%;left:50%;display:block;width:0;height:0;opacity:.75}.cropper-center:after,.cropper-center:before{position:absolute;display:block;content:' ';background-color:#eee}.cropper-center:before{top:0;left:-3px;width:7px;height:1px}.cropper-center:after{top:-3px;left:0;width:1px;height:7px}.cropper-face,.cropper-line{width:100%;height:100%;opacity:.1}.cropper-face,.cropper-line,.cropper-point,.cropper-point.point-se:before{position:absolute;display:block}.cropper-face{top:0;left:0;background-color:#fff}.cropper-line,.cropper-point{background-color:#39f}.cropper-line.line-e{top:0;right:-3px;width:5px;cursor:e-resize}.cropper-line.line-n{top:-3px;left:0;height:5px;cursor:n-resize}.cropper-line.line-w{top:0;left:-3px;width:5px;cursor:w-resize}.cropper-line.line-s{bottom:-3px;left:0;height:5px;cursor:s-resize}.cropper-point{width:5px;height:5px;opacity:.75}.cropper-point.point-e{top:50%;right:-3px;margin-top:-3px;cursor:e-resize}.cropper-point.point-n{top:-3px;left:50%;margin-left:-3px;cursor:n-resize}.cropper-point.point-w{top:50%;left:-3px;margin-top:-3px;cursor:w-resize}.cropper-point.point-s{bottom:-3px;left:50%;margin-left:-3px;cursor:s-resize}.cropper-point.point-ne{top:-3px;right:-3px;cursor:ne-resize}.cropper-point.point-nw{top:-3px;left:-3px;cursor:nw-resize}.cropper-point.point-sw{bottom:-3px;left:-3px;cursor:sw-resize}.cropper-point.point-se{right:-3px;bottom:-3px;width:20px;height:20px;cursor:se-resize;opacity:1}.cropper-point.point-se:before{right:-50%;bottom:-50%;width:200%;height:200%;content:' ';opacity:0;background-color:#39f}@media (min-width:768px){.cropper-point.point-se{width:15px;height:15px}}@media (min-width:992px){.cropper-point.point-se{width:10px;height:10px}}@media (min-width:1200px){.cropper-point.point-se{width:5px;height:5px;opacity:.75}}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{position:absolute;display:block;width:0;height:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}"],
                encapsulation: core.ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
AngularCropperjsComponent.ctorParameters = function () { return []; };
AngularCropperjsComponent.propDecorators = {
    'image': [{ type: core.ViewChild, args: ['image',] },],
    'imageUrl': [{ type: core.Input },],
    'settings': [{ type: core.Input },],
    'cropbox': [{ type: core.Input },],
    'loadImageErrorText': [{ type: core.Input },],
    'cropperOptions': [{ type: core.Input },],
    'export': [{ type: core.Output },],
    'ready': [{ type: core.Output },],
};

var AngularCropperjsModule = (function () {
    function AngularCropperjsModule() {
    }
    /**
     * @return {?}
     */
    AngularCropperjsModule.forRoot = function () {
        return {
            ngModule: AngularCropperjsModule,
            providers: []
        };
    };
    return AngularCropperjsModule;
}());
AngularCropperjsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [
                    AngularCropperjsComponent
                ],
                exports: [
                    AngularCropperjsComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
AngularCropperjsModule.ctorParameters = function () { return []; };

exports.AngularCropperjsModule = AngularCropperjsModule;
exports.AngularCropperjsComponent = AngularCropperjsComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
