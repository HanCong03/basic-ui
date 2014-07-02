/**
 * 容器类： Panel
 */

define( function ( require ) {

    var Utils = require( "base/utils" ),
        $ = require( "base/jquery" );

    return Utils.Clazz.createClass( "Panel", {

        base: require( "widget/container" ),

        __defaultOptions: {
            className: null,
            padding: 0,
            margin: 0
        },

        __tpl: require( "tpl/panel" ),

        widgetName: 'Panel',

        appendWidget: function ( widget ) {

            var returnValue = this.callBase( widget );

            if ( this.__options.margin ) {
                widget.getElement().style.margin = this.__options.margin;
            }

            return returnValue;

        },

        insertWidget: function ( widget ) {

            var returnValue = this.callBase( widget );

            if ( this.__options.margin ) {
                widget.getElement().style.margin = this.__options.margin;
            }

            return returnValue;

        }

    } );

} );
