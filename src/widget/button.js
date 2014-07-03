/**
 * Button对象
 * 通用按钮构件
 */

define( function ( require ) {

    var prefix = '_fui_',
        $ = require( "base/jquery" ),
        Utils = require( "base/utils" );

    return require( "base/utils" ).Clazz.createClass( "Button", {

        base: require( "widget/widget" ),

        __tpl: require( 'tpl/button' ),

        __defaultOptions: {
            label: null,
            text: null,
            icon: null,
            // label相对icon的位置
            layout: 'right',
            width: null,
            height: null,
            padding: '2px'
        },

        widgetName: 'Button',

        constructor: function ( options ) {

            this.__initOptions();

        },

        __initOptions: function () {

            // icon options
            if ( typeof ( this.__options.icon ) === "string" ) {
                this.__options.icon = {
                    src: this.__options.icon
                }
            }

        }

    } );

} );