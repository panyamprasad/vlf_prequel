import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CSPostResponseModel, KeyIdentifierModel} from '@service/models';

export class BaseService {
    entitySubject = new BehaviorSubject<any[]>([]);
    // Loading | Progress bar
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean>;
    keyIdentifier: KeyIdentifierModel;
    onPostResponseUpdated$: Subject<CSPostResponseModel>;

    constructor() {
        this.loading$ = this.loadingSubject.asObservable();
        this.onPostResponseUpdated$ = new Subject();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        // Connecting data source
        return this.entitySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        // Disonnecting data source
        this.entitySubject.complete();
        this.loadingSubject.complete();
    }
}
