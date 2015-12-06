export class App {

    constructor() {

        this.year = new Date().getFullYear();
    }
    
    configureRouter(config, router) {

        this.router = router;

        config.map([
            {
                route: ["", "/"],
                name: "home",
                title: "Home",
                moduleId: "app/home/home",
                nav: true
            }

        ]);
    }

}
