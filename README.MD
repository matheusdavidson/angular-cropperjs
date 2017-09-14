# angular-cropperjs

[CropperJS](https://fengyuanchen.github.io/cropperjs/) integration for Angular 2/4
 
## Installation

To install this library, run:

```bash
$ npm install angular-cropperjs --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install angular-cropperjs
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import angular-cropperjs
import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Load angular-cropperjs
    AngularCropperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```html
<!-- You can now use angular-cropper component in app.component.html -->
<angular-cropper [cropperOptions]="config" [imageUrl]="imageUrl"></angular-cropper>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Matheus Davidson](mailto:matheusdavidson@gmail.com)