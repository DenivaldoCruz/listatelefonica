angular.module("listaTelefonica").filter("ellipsis", ellipsisFilter);

function ellipsisFilter() {

	return function(input, size) {
		if(input.length > (size || 5)) {
			return input.substring(0, size || 5) + "...";
		} else {
			return input;
		}
		
	};
};


