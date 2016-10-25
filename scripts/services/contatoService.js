angular.module("listaTelefonica").factory("contatoService", contatoService);

	function contatoService($http) {
		var carregarContatos = _carregarContatos;
		var criarContato = _criarContato;
		var atualizarContato = _atualizarContato;
		var deletarContato = _deletarContato;

		function _carregarContatos() {
			return $http.get("http://localhost/express-api/contatos");
		};

		function _criarContato(contato) {
			return $http.post("http://localhost/express-api/contatos", contato);
		};

		function _atualizarContato(contato) {
			return $http.put("http://localhost/express-api/contatos", contato);
		};

		function _deletarContato(contato) {
			return $http.delete("http://localhost/express-api/contatos/" + contato.id);
		}

		return {
			carregarContatos: carregarContatos,
			criarContato: criarContato,
			atualizarContato: atualizarContato,
			deletarContato: deletarContato
		};
	}
