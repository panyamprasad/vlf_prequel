/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: log.interface.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export interface ILog {
    _userId: number; // user who did changes
    _createdDate: string; // date when entity were created => format: 'mm/dd/yyyy'
    _updatedDate: string; // date when changed were applied => format: 'mm/dd/yyyy'
}
