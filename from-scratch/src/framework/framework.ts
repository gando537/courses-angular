import { Module, ProvidersMetadata, ServicesInstances } from "./types";

export class Framework {

    /**
     * Le tableau qui recense l'ensemble des directives déclarées par mes
     * collègues dans le projet
     */
    directives: any[] = [];

    /**
     * Le tableau qui contient les instances de services déjà construite
     * (pour éviter de les instanciés indéfinement)
     */
    services: ServicesInstances = [];

    /**
     * Le tableau qui contient les définitions de mes services
     * (comment construir un tel ou un tel service)
     */
    providers: ProvidersMetadata = [];

    /**
     * Le traitement qui va instancier les directives et les greffes aux
     * élments html ciblé par les sélecteurs CSS
     */
    bootstrapApplication(metadata: Module){

        this.providers = metadata.providers || [];

        this.directives = metadata.declarations;

        this.directives.forEach(directive => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);

            elements.forEach(element => {
                const params = this.analyseDirectiveConstructor(directive, element);
                const directiveInstance = Reflect.construct(directive, params) as any;
                directiveInstance.init();
            });
        });
    }

    /**
     * Permet d'analyser les besoins d'un constructeur et de créer les
     * instances nécessaires (dépendances)
     *
     * @param directive la classe de la directive à instancier
     * @param element L'élément HTML où on veut greffer la directive
     * @returns Le tableau de paramètres nécessaires pour instancier
     * ma directive
     */
    private analyseDirectiveConstructor(directive: any, element: HTMLElement){

        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());

        if(!hasConstructor){
            return [];
        }

        const paramsNames = this.extractParamsNamesFromDirective(directive);

        const params = paramsNames.map(name => {

            if(name === "element"){
                return element;
            }

            const directiveProviders = directive.providers || [];

            const directiveProvider = directiveProviders.find(p => p.provide === name);

            if (directiveProvider){
                const instance = directiveProvider.construct();
                return instance;
            }

            const service = this.services.find((s) => s.name === name);

            if (service){
                return service.instance;
            }

            const provider = this.providers.find((p) => p.provide === name);

            if (!provider){
                throw new Error("Aucun fournisseur n'existe pour le service " + name);
            }

            const instance = provider.constructor();

            this.services.push({
                name: name,
                instance: instance
            });

            return instance;
        })
        return params;
    }

    /**
     * Extrait les noms des paramètres du constructeur d'une directive
     *
     * @param directive La directive dont je veut connaitre les paramètres
     * @returns un tableau avec les noms des paramètres du constructeur
     */
    private extractParamsNamesFromDirective(directive: any) {

        const params = /constructor\((.*)\)/g.exec(directive.toString());

        if (!params){
            return [];
        }
        return params[1].split(", ");
    }
}

export const Angular = new Framework();