/**
 * icon widget
 * 封装多种icon方式
 */

define( function ( require ) {

    var prefix = '_fui_',
        $ = require( "base/jquery" ),
        Utils = require( "base/utils" );

    return require( "base/utils" ).Clazz.createClass( "Icon", {

        base: require( "widget/widget" ),

        __tpl: require( 'tpl/icon' ),

        __userEvents: null,

        __defaultOptions: {
            width: null,
            height: null,
            img: null
        },

        widgetName: 'Icon',

        constructor: function ( options ) {

            this.__initOptions();

        },

        __initOptions: function () {

            if ( this.__options.img ) {
                this.__options.className = [];
            }

            this.__options.__css = Utils.getCssRules( [ 'width', 'height' ], this.__options );

        }

    } );

} );