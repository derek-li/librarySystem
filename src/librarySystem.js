//It should create a library object with dependent library names, callback function, and call counter.
//It should call the callback 
//It should apply the required libraries only when the library is called
//It should check if the library has already been called

(function() {
	
	var libraryStorage = {};

	function librarySystem(libraryName, array, callback) {
		var library = libraryStorage[libraryName];
		//Creates a new library if there is more than one arguments
		if (arguments.length > 1) {
			var newLibrary = {
				dependencies: array,
				callback: callback,
				alreadyCalled: false
			};
			libraryStorage[libraryName] = newLibrary;
		//Use library from storage
		} else {
			if (library === undefined) {
				throw new Error(libraryName + " is not available to be called.");
				return;
			}
			//Checks if library has already been called. Exits if the library has already been called
			if (library.alreadyCalled === true) {
				return;
			}
			library.alreadyCalled = true;
			//Check for dependencies
			if (Array.isArray(library.dependencies) === true) {
				//Set dependencies property to mapped array of required libraries
				library.dependencies = library.dependencies.map(function(requiredLibrary) {
					return librarySystem(requiredLibrary);
				});
				//Returns callback with applied dependent functions
			}
			return library.callback.apply(null, library.dependencies);
		}
	}

	window.librarySystem = librarySystem;

})();