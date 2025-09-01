import pokemonJson from "@/assets/json/pokemon.json"

export default class Pokemon {

    pokemon: any = pokemonJson;

    constructor() {
    }

    getPkNameList() {
        return this.pokemon.map((obj: any) => obj.name);
    }

    getPokemon(name: string) {
        let pkDetail = this.pokemon.find((obj: any) => obj.name === name);

        if (pkDetail) {
            return pkDetail.pokemon;
        }

        return null;
    }


    getPkGenderList(name: string) {
        let pkDetail = this.pokemon.find((obj: any) => obj.name === name);
        let list = [];

        if (pkDetail) {
            if (pkDetail.male > 0 && pkDetail.dex !== 32) {
                list.push('♂');
            }
            if (pkDetail.female > 0 && pkDetail.dex !== 29) {
                list.push('♀');
            }
        }

        return list;
    }

    getPkImage(name: string, gender: string) {
        let pkDetail = this.pokemon.find((obj: any) => obj.name === name);
        let image = {
            "dex": '0000',
            "forms_id": '000',
            "gender": 'uk',
            "extra_id": '000',
        };

        if (pkDetail) {
            image.dex = pkDetail.dex.toString().padStart(4, '0');
            image.forms_id = pkDetail.forms_id.toString().padStart(3, '0');
            image.extra_id = pkDetail.extra_id.toString().padStart(3, '0');

            if (gender === '♂') {
                if (pkDetail.male > 0 && pkDetail.female === 0) {
                    image.gender = 'mo';
                } else if (pkDetail.gender_differences === 0) {
                    image.gender = 'mf';
                } else {
                    image.gender = 'md';
                }
            } else if (gender === '♀') {
                if (pkDetail.male === 0 && pkDetail.female > 0) {
                    image.gender = 'fo';
                } else if (pkDetail.gender_differences === 0) {
                    image.gender = 'mf';
                } else {
                    image.gender = 'fd';
                }
            } else {
                if (pkDetail.male === 0 && pkDetail.female === 0) {
                    image.gender = 'uk';
                } else if (pkDetail.male > 0 && pkDetail.female === 0) {
                    image.gender = 'mo';
                } else if (pkDetail.male === 0 && pkDetail.female > 0) {
                    image.gender = 'fo';
                } else {
                    if (pkDetail.gender_differences === 0) {
                        image.gender = 'mf';
                    } else {
                        image.gender = 'md';
                    }
                }
            }
        }

        return image.dex + '_' + image.forms_id + '_' + image.gender + '_n_' + image.extra_id;
    }
}
