import { Component } from '@angular/core';

import { Bezier } from '../../lib/index';

@Component({
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent {
    bezier = new Bezier([.48,.08,.21,.8]);
    progress: number = 0;

    change(n: number) {
        this.bezier.update(n / 100);
    }
}
