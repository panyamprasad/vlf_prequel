/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: clipboard.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

// Import the core angular services.
import {Directive, EventEmitter} from '@angular/core';
// Import the application components and services.
import {ClipboardService} from '../util-services/clipboard.sevice';

// This directive acts as a simple glue layer between the given [clipboard] property
// and the underlying ClipboardService. Upon the (click) event, the [clipboard] value
// will be copied to the ClipboardService and a (clipboardCopy) event will be emitted.
@Directive({
    selector: '[clipboard]',
    inputs: ['value: clipboard'],
    outputs: [
        'copyEvent: clipboardCopy',
        'errorEvent: clipboardError'
    ],
    host: {
        '(click)': 'copyToClipboard()'
    }
})
export class ClipboardDirective {

    public copyEvent: EventEmitter<string>;
    public errorEvent: EventEmitter<Error>;
    public value: string;

    private clipboardService: ClipboardService;


    // I initialize the clipboard directive.
    constructor(clipboardService: ClipboardService) {

        this.clipboardService = clipboardService;
        this.copyEvent = new EventEmitter();
        this.errorEvent = new EventEmitter();
        this.value = '';
    }

    // ---
    // PUBLIC METODS.
    // ---

    // I copy the value-input to the Clipboard. Emits success or error event.
    public copyToClipboard(): void {
        this.clipboardService
            .copy(this.value)
            .then(
                (value: string): void => {

                    this.copyEvent.emit(value);

                }
            )
            .catch(
                (error: Error): void => {

                    this.errorEvent.emit(error);
                }
            );
    }
}
