import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApplicationService} from '@service/services';
import {SharedkeyDataService} from '@customer/shared/sharedkey-data.service';
import {KeyIdentifierModel} from '@service/models';

function _window(): any {
    // return the global native browser window object
    return window;
}

@Component({
    selector: 'm-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
    applicationId: number;
    keyIdentifier: KeyIdentifierModel = new KeyIdentifierModel(true);
    constructor(
        private title: Title,
        private activatedRoute: ActivatedRoute
    ) {
        // console.log(this.activatedRoute);
        let queryParams: Params = {};
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('query params =>', params);
            queryParams = params;
            // TODO: need to update
           // this.applicationId = 7937; //params.appId;
        });

        console.log(_window());
        _window().parent.location.href = `/approved?appId=${queryParams.appId}&event=${queryParams.event}&feature=${queryParams.feature}`;

       // _window().parent.location.href = `/approved?appId=${queryParams.appId}&feature=${queryParams.feature}&event=${queryParams.event}`;
        // this.router.navigate(['myApp'], {queryParams});
    }

    ngOnInit() {
        this.title.setTitle('Check Application Status');
    }

}
