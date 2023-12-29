/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: acl.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {ConfigModel} from '../../interfaces/config';

export interface AclInterface {
    permissions: any;
    currentUserRoles: any;
}

export class AclModel implements AclInterface, ConfigModel {
    public config: any;

    // default permissions
    public permissions: any = {
        ADMIN: ['canDoAnything'],
        USER: ['canDoLimitedThings']
    };

    // store an object of current user roles
    public currentUserRoles: any = {};

    constructor() {
    }
}
