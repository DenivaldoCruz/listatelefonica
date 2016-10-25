angular.module("listaTelefonica").service("operadoraService", operadoraService);

function operadoraService($http) {
	this.carregarOperadoras = function() {
		return $http.get("http://localhost/express-api/operadoras");
	};
};
