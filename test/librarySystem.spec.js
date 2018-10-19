tests({

	'it should store and retrieve libraries': function() {
		librarySystem('sampleLibrary', [], function() {
			return 'hello';
		});
		eq(librarySystem('sampleLibrary'), 'hello');
	},

	'it should be able to run dependent libraries before running the callback': function() {
		librarySystem('moniker', [], function() {
			return 'derek'
		});
		librarySystem('salutations', ['moniker'], function(moniker) {
			return 'hi ' + moniker;
		});
		eq(librarySystem('salutations'), 'hi derek');
	},

	'it should be able to store libraries with dependencies before storing the dependent functions': function() {
		librarySystem('greeting', ['name'], function(name) {
			return 'hi ' + name;
		});
		librarySystem('name', [], function() {
			return 'derek'
		});
		eq(librarySystem('greeting'), 'hi derek');
	},

	'it should allow each library to be called only once': function() {
		librarySystem('runOnlyOnce', [], function() {
			return 'This is the first call';
		});
		librarySystem('runOnlyOnce');
		eq(librarySystem('runOnlyOnce'), undefined);
	},

	'it should allow each library to be called only once INCLUDING dependencies': function() {
		librarySystem('animal', [], function() {
			return 'cat';
		});
		librarySystem('action', ['animal'], function(animal) {
			return 'pet ';
		});
		librarySystem('action');
		eq(librarySystem('animal'), undefined);
	},

	'it should throw an error if a library that is not in storage is called': function() {
		var error;
		try {
			librarySystem('fakeLibrary');
		} catch (e) {
			error = e;
		}
		eq(error.message, "fakeLibrary is not available to be called.")
	}

});
