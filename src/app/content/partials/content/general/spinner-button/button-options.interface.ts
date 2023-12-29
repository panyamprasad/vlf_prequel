/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: button-options.interface.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export interface SpinnerButtonOptions {
    active: boolean;
    spinnerText?: string;
    buttonColor?: string;
    spinnerColor?: string;
    barColor?: string;
    raised?: boolean;
    spinnerSize?: number;
    mode?: string;
    value?: number;
    fullWidth?: boolean;
}
