export default class FotoService {

    constructor(resource) {

        this._resource = resource('fotos{/id}');
    }

    cadastra(foto) {

        return this._resource.save(foto);
    }

    lista() {

        return this._resource
          .query() //devolve uma promisse
          .then(res => res.json()); //converte para json
    }

    apaga(id) {

        return this._resource.delete({ id });
    }
}