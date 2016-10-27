angular.module("listaTelefonica").service("operadoraService", operadoraService);

function operadoraService($http, config) {
	this.carregarOperadoras = function() {
		return $http.get(config.baseUrl + "/operadoras");
	};
};
