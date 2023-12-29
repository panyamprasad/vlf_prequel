/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: LoadingComponent.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Component} from '@angular/core';

@Component({
    selector: 'm-app-loading',
    template: `
    <img src="/assets/images/loading.svg">
  `,
    styles: [`
    :host {
      display: block;
    }
    img {
      display: block;
      margin: 20px auto;
      width: 50px;
    }
  `]
})
export class LoadingComponent {
}
