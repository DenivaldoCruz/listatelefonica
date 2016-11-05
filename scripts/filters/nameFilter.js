angular.module("listaTelefonica").filter("name", nameFilter);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function nameFilter() {

	return function(input) {
		var nomes = input.split(" ");
		for(var i=0; i < nomes.length; i++) {
        	nomes[i] = capitalizeFirstLetter(nomes[i]);
    	}
    	return nomes.join(" ");
	};
};


