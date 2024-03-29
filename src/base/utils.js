/**
 * utils类包， 提供常用操作的封装，补充jQuery的不足
 */

define( function ( require ) {

    var $ = require( "base/jquery" ),
        Utils = {
            Clazz: require( "base/kit/clazz" ),
            Tpl: require( "base/kit/compile" ),
            Widget: require( "base/kit/widget" )
        };

    return $.extend( Utils, require( "base/kit/common" ) );

} );
