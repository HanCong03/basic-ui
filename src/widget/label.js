/**
 * Label Widget
 */

define( function ( require ) {

    var Utils = require( "base/utils" ),
        $ = require( "base/jquery" );

    return Utils.Clazz.createClass( "Label", {

        base: require( "widget/widget" ),

        __tpl: require( "tpl/label" ),

        __userEvents: [ "change" ],

        __defaultOptions: {
            text: '',
            width: null,
            height: null,
            padding: null,
            textAlign: 'center'
        },

        widgetName: 'Label',

        constructor: function () {

            this.__initOptions();

        },

        setText: function ( text ) {

            var oldtext = this.__options.text;

            this.__options.text = text;
            $( this.__element ).text( text );

            this.trigger( "change", {
                currentText: text,
                prevText: oldtext
            } );

            return this;

        },

        getText: function () {
            return this.__options.text;
        },

        /**
         * 初始化模板所用的css值
         * @private
         */
        __initOptions: function () {

            var cssMapping = {},
                options = this.__options,
                value = null;

            $.each( [ 'width', 'height', 'padding', 'textAlign' ], function ( i, item ) {

                value = options[ item ];

                if ( item === "textAlign" ) {
                    item = 'text-align';
                }

                if ( value !== null && value !== undefined ) {
                    cssMapping[ item ] = value;
                }

            } );

            options.__css = cssMapping;

        }

    } );
} );
