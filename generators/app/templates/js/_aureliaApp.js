export class App {
    configureRouter(config, router) {

        this.router = router;

        config.map([
            {
                route: ["", "home"],
                name: "home",
                title: "Home",
                moduleId: "home/home",
                nav: true
            }
        ]);
    }
}
