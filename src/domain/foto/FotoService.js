export default class FotoService {

    constructor(resource) {

        this._resource = resource('fotos{/id}');
    }

    cadastra(foto) {

        if(foto._id) { //se tiver conteúdo vai alterar

            return this._resource.update({ id: foto._id }, foto);

        } else {

            return this._resource.save(foto); //senão salva novo
        }
    }

    lista() {

        return this._resource
          .query() //devolve uma promisse
          .then(
            res => res.json(),
            err => {
                console.log(err);
                throw new Error('Não foi possível carregar as fotos. Tenta mais tarde');
            }
        )
    }

    apaga(id) {

        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto. Tente mais tarde');
            });
    }

    busca(id) {

        return this._resource
            .get({ id }) // traz através do Id os dados da foto
            .then(res => res.json());
    }
}