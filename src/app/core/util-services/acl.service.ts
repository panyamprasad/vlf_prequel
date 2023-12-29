/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: acl.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AclModel} from '../creditsnap/models/acl';
import {Injectable} from '@angular/core';
import {ConfigData} from '../interfaces/config-data';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';
import {BehaviorSubject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable()
export class AclService implements ConfigData {
    public aclModel: AclModel;
    public onAclUpdated$: BehaviorSubject<AclModel>;

    constructor(
        private roleService: NgxRolesService,
        private permService: NgxPermissionsService,
        private authService: AuthenticationService,
    ) {
        // set initial permission model
        this.aclModel = new AclModel();
        this.onAclUpdated$ = new BehaviorSubject(this.aclModel);

        this.authService.getUserRoles().subscribe(roles => {
            this.setCurrrentUserRoles(roles);
        });

        // subscribe to credential changed, eg. after login response
        this.authService.onCredentialUpdated$
            .pipe(mergeMap(accessData => this.authService.getUserRoles()))
            .subscribe(roles => this.setCurrrentUserRoles(roles));

        // subscribe to acl data observable
        this.onAclUpdated$.subscribe(acl => {
            const permissions = Object.keys(acl.permissions).map((key) => {
                return acl.permissions[key];
            });
            // load default permission list
            this.permService.loadPermissions(permissions, (permissionName, permissionStore) => !!permissionStore[permissionName]);

            // merge current user roles
            const roles = Object.assign({}, this.aclModel.currentUserRoles, {
                // default user role is GUEST
                GUEST: () => {
                    // return this.authService.isAuthorized().toPromise();
                }
            });
            // add to role service
            this.roleService.addRoles(roles);
        });
    }

    /**
     * Set AclModel and fire off event that all subscribers will listen to
     * @param aclModel
     */
    setModel(aclModel: AclModel): any {
        aclModel = Object.assign({}, this.aclModel, aclModel);
        this.onAclUpdated$.next(aclModel);
    }

    setCurrrentUserRoles(roles: any): any {
        // update roles if the credential data has roles
        if (roles != null) {
            this.aclModel.currentUserRoles = {};
            roles.forEach(role => {
                this.aclModel.currentUserRoles[role] = this.aclModel.permissions[role];
            });
            // set updated acl model back to service
            this.setModel(this.aclModel);
        }
    }
}
