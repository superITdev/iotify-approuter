function CSDBStorage() {
	const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	if ( indexedDB === undefined ) {
		console.warn( 'CSDBStorage: IndexedDB not available.' );
		return { init: function () {}, get: function () {}, set: function () {}, clear: function () {} };
	}

	const dbname = 'IoTIFY-AppRouter';
	const version = 1;
	const storename = 'appRouterStore';
	
	let database;
	return {
		init: function ( callback ) {
			let request = indexedDB.open( dbname, version );
			request.onupgradeneeded = function ( event ) {
				let db = event.target.result;
				if ( db.objectStoreNames.contains( storename ) === false ) {
					db.createObjectStore( storename );
				}
			};
			request.onsuccess = function ( event ) {
				database = event.target.result;
				if (callback) callback();
			};
			request.onerror = function ( event ) {
				console.error( 'IndexedDB', event );
			};
		},
		get: function ( callback ) {
			let transaction = database.transaction( [ storename ], 'readwrite' );
			let objectStore = transaction.objectStore( storename );
			let request = objectStore.get( 0 );
			request.onsuccess = function ( event ) {
				callback( event.target.result );
			};
		},
		set: function ( data ) {
			let start = performance.now();

			let transaction = database.transaction( [ storename ], 'readwrite' );
			let objectStore = transaction.objectStore( storename );
			let request = objectStore.put( data, 0 );
			request.onsuccess = function () {
				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved state to IndexedDB. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );
			};
		},
		clear: function () {
			if ( database === undefined ) return;

			let transaction = database.transaction( [ storename ], 'readwrite' );
			let objectStore = transaction.objectStore( storename );
			let request = objectStore.clear();
			request.onsuccess = function () {
				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Cleared IndexedDB.' );
			};
		}
	};
}

export default CSDBStorage;
