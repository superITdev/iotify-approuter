import { LoadingManager } from './LoadingManager.js';
import { LoaderUtils } from './LoaderUtils.js';

function Loader( handleJSON ) {

	var scope = this;

	this.texturePath = '';

	this.loadItemList = function ( items ) {

		LoaderUtils.getFilesFromItemList( items, function ( files, filesMap ) {

			scope.loadFiles( files, filesMap );

		} );

	};

	this.loadFiles = function ( files, filesMap ) {

		if ( files.length > 0 ) {

			var filesMap = filesMap || LoaderUtils.createFilesMap( files );

			var manager = new LoadingManager();
			manager.setURLModifier( function ( url ) {

				var file = filesMap[ url ];

				if ( file ) {

					console.log( 'Loading', url );

					return URL.createObjectURL( file );

				}

				return url;

			} );

			for ( var i = 0; i < files.length; i ++ ) {

				scope.loadFile( files[ i ], manager );

			}

		}

	};

	this.loadFile = function ( file, manager ) {

		var filename = file.name;
		var extension = filename.split( '.' ).pop().toLowerCase();

		var reader = new FileReader();
		reader.addEventListener( 'progress', function ( event ) {

			var size = '(' + Math.floor( event.total / 1000 ).format() + ' KB)';
			var progress = Math.floor( ( event.loaded / event.total ) * 100 ) + '%';

			console.log( 'Loading', filename, size, progress );

		} );

		switch ( extension ) {
			case 'json':
			default:
				reader.addEventListener( 'load', function ( event ) {
					var contents = event.target.result;
					var data;
					try {
						data = JSON.parse( contents );
					} catch ( error ) {
						alert( error );
						return;
					}
					handleJSON( data );
				}, false );
				reader.readAsText( file );
				break;
		}

	};
}

export { Loader };
