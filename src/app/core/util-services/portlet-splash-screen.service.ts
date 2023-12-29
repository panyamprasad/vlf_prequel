import {Injectable, OnDestroy} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class PortletSplashScreenService implements OnDestroy {
    public player: AnimationPlayer;
    /**
     * Spinner observable
     *
     * @memberof NgxSpinnerService
     */
    public spinnerObservable = new Subject<boolean>();
    private splashElement;

    constructor(
        private animationBuilder: AnimationBuilder,
        private router: Router
    ) {
    }

    load(element, loading$: BehaviorSubject<boolean>) {
        this.spinnerObservable = loading$;
        // Get the splash screen element
        this.splashElement = element;
        console.log(' Splash initialized ....', new Date().getTime());
        this.spinnerObservable.subscribe((val) => {
            if (val === false) {
                this.hide('from portal');
            }
        });
        // Hide it on the first NavigationEnd event
    }

    show() {
        console.log(' Splash is starting now ....', new Date().getTime());
        this.player = this.animationBuilder
            .build([
                style({opacity: '0', zIndex: '99999'}),
                animate('600ms ease', style({opacity: '1'}))
            ])
            .create(this.splashElement);
        setTimeout(() => {
            this.player.play();
        }, 0);
    }

    hide(str: any) {
        console.log(' Splash is Closing now ....', str, new Date().getTime());
        this.player = this.animationBuilder
            .build([
                style({opacity: '1'}),
                animate('600ms ease', style({opacity: '0'}))
            ])
            .create(this.splashElement);
        setTimeout(() => {
            this.player.onDone(
                () => (this.splashElement.style.display = 'none')
            );
            this.player.play();
        }, 0);
    }

    /**
     * To show spinner
     *
     * @memberof NgxSpinnerService
     */
    start() {
        this.spinnerObservable.next(true);
    }

    /**
     * To hide spinner
     *
     * @memberof NgxSpinnerService
     */
    end() {
        this.spinnerObservable.next(false);
    }

    ngOnDestroy() {
        this.spinnerObservable.unsubscribe();
    }
}
