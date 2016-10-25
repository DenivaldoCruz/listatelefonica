		angular.module("listaTelefonica").controller("listaTelefonicaCtrl", listaTelefonicaCtrl);

		var listaTelefonicaCtrl = listaTelefonicaCtrl;

		function listaTelefonicaCtrl($scope, $log, $filter, uppercaseFilter, contatoService, operadoraService) {

			var vm = this;

			vm.mostrarContato = mostrarContato;
			vm.salvarContato = salvarContato;
			vm.redefinirForm = redefinirForm;
			vm.apagarContatos = apagarContatos;
			vm.isContatoSelecionado = isContatoSelecionado;

			$scope.titulo = "Lista Telefonica";
			$scope.contatos = [];
			$scope.operadoras = [];

			var carregarContatos = function() {
				contatoService.carregarContatos().success(function (data, status) {
					$scope.contatos = data;
				});
			};		

			var carregarOperadoras = function() {
				operadoraService.carregarOperadoras().success(function (data, status) {
					$scope.operadoras = data;
				});
			};
			
			function salvarContato(contato) {
				var successCallback = function(data) {
					$scope.contatoForm.$setPristine();
					delete $scope.contato;
					carregarContatos();
				};

				var errorCallback = function(data) {
					$scope.message = "Aconteceu um problema: " + data;
				};

				if(!contato.id) {
					contato.id = $scope.contatos.length + 1;
					contato.data = new Date();
					$scope.contatos.push(angular.copy(contato));
					contatoService.criarContato(contato).success(successCallback).error(errorCallback);
				} else {
					//var id = $scope.contatos[contato.id-1].id-1;
					//$scope.contatos[id] = angular.copy(contato);
					contatoService.atualizarContato(contato).success(successCallback).error(errorCallback);
				}
			};

			function mostrarContato(contato) {
				$scope.contato = angular.copy(contato);
				// $log.log(contato);
			};

			function redefinirForm() {
				delete $scope.contato;
			};		


			// $scope.selecionado = 'selecionado';

			function apagarContatos(contatos) {
				/*
				$scope.contatos = contatos.filter(function(contato){
					if(!contato.selecionado) {
						return contato;
					}
				});
				delete $scope.contato;
				*/
				var contatosSelecionados = contatos.filter(function(contato){
					if(contato.selecionado) {
						return contato;
					}
				});

				for (var i = contatosSelecionados.length - 1; i >= 0; i--) {
					contatoService.deletarContato(contatosSelecionados[i]);
				};

				carregarContatos();
				
			}

			function isContatoSelecionado(contatos) {
				return contatos.some(function(contato){
					return contato.selecionado;
				})
			}

			$scope.direcaoOrdenacao = true;
			$scope.ordernarPor = function(campo) {
				$scope.campoOrdenacao = campo;
				$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
			};

			carregarContatos();
			carregarOperadoras();

		};	
