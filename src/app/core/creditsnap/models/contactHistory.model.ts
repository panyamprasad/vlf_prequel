/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: contactHistory.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class ContactHistoryModel {
    id: number;
    userId: number;
    name: string;
    submittedDate: Date;
    notes: string;
    type: string; // type of the transaction
    product: string;
    action: string;
    request: string;
}
