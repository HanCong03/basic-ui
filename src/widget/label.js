/**
 * Label Widget
 */

define( function ( require ) {

    var Utils = require( "base/utils" ),
        $ = require( "base/jquery" );

    return Utils.Clazz.createClass( "Label", {

        base: require( "widget/widget" ),

        __tpl: require( "tpl/label" ),

        __defaultOptions: {
            content: '',
            width: null,
            height: null,
            padding: null,
            textAlgin: 'center'
        },

        constructor: function () {

            this.__initOptions();

        },

        setText: function ( text ) {

            this.__options.content = text;
            $( this.__element ).text( text );

            return this;

        },

        getText: function () {
            return this.__options.content;
        },

        /**
         * 初始化模板所用的css值
         * @private
         */
        __initOptions: function () {

            var cssMapping = {},
                options = this.__options,
                value = null;

            $.each( [ 'width', 'height', 'padding' ], function ( i, item ) {

                value = options[ item ];

                if ( value !== null && value !== undefined ) {
                    cssMapping[ item ] = value;
                }

            } );

            options.__css = cssMapping;

        }

    } );
} );
