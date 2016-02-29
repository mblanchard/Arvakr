export default function() {

    return {
        scope: {},
        controller: TopBarComponent,
        controllerAs: 'ctrl',
        bindToController: true,
        template: '<span style="color: #0088cc;">Hi {{ctrl.name}}!'
    };

}

class UserInfoComponent {

    constructor() {
        this.name = 'Tomas';
    }

}