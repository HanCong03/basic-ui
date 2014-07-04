/**
 * Button对象
 * 通用按钮构件
 */

define( function ( require ) {

    var prefix = '_fui_',
        $ = require( "base/jquery" ),
        Icon = require( "widget/icon" ),
        Label = require( "widget/label" ),
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
            padding: null
        },

        // 组合对象: icon
        __iconWidget: null,

        // 组合对象: label
        __labelWidget: null,

        widgetName: 'Button',

        constructor: function ( options ) {

            if ( this.__options.label ) {
                this.__labelWidget = new Label( this.__options.label );
            }

            if ( this.__options.icon ) {
                this.__iconWidget = new Icon( this.__options.icon );
            }

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