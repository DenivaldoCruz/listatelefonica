angular.module("listaTelefonica").factory("contatoService", contatoService);

	function contatoService($http, config) {
		var carregarContatos = _carregarContatos;
		var criarContato = _criarContato;
		var atualizarContato = _atualizarContato;
		var deletarContato = _deletarContato;

		function _carregarContatos() {
			return $http.get(config.baseUrl + "/contatos");
		};

		function _criarContato(contato) {
			return $http.post(config.baseUrl + "/contatos", contato);
		};

		function _atualizarContato(contato) {
			return $http.put(config.baseUrl + "/contatos", contato);
		};

		function _deletarContato(contato) {
			return $http.delete(config.baseUrl + "/contatos/" + contato.id);
		}

		return {
			carregarContatos: carregarContatos,
			criarContato: criarContato,
			atualizarContato: atualizarContato,
			deletarContato: deletarContato
		};
	}
