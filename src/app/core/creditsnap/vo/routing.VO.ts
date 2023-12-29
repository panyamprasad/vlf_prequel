/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: routing.VO.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class RoutingVO {
    state: string;
    address: string;
    customer_name: string;
    city: string;
    message: string;
    record_type_code: string;
    routing_number: string;
    data_view_code: string;
    code: number;
    telephone: string;
    institution_status_code: string;
    new_routing_number: string;
    zip: string;
    change_date: string; // MMDDYY
    rn: string;
}
