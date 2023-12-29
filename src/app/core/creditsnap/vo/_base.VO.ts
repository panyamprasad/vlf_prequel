/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: _base.VO.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class BaseVO {
    // Edit
    _isEditMode: boolean = false;
    _isNew: boolean = false;
    _isUpdated: boolean = false;
    _isDeleted: boolean = false;
    _prevState: any = null;
    // Filter
    _defaultFieldName: string = '';
    // Log
    _userId: number = 0; // Admin
    _createdDate: string;
    _updatedDate: string;

    // Common Identifier
    id: number;
    appId: number;
    tranId: string;
    channel: string;
    status: string;
    action: string;
    mappingScreen: string;
}
