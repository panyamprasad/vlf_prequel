/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: edit.interface.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export interface IEdit {
    _isEditMode: boolean;
    _isNew: boolean;
    _isDeleted: boolean;
    _isUpdated: boolean;
    _prevState: any;
}
