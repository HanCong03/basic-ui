/**
 * Container类， 所有容器类的父类`
 * @abstract
 */

define( function ( require ) {

    var Utils = require( "base/utils" ),
        CONF = require( "base/sysconf" ),
        Widget = require( "widget/widget" ),
        $ = require( "base/jquery" );

    return Utils.Clazz.createClass( "Container", {

        base: Widget,

        // 不监听事件
        _events: [],

        __widgetType: 'container',

        /**
         * 容器内包含的子构件列表
         */
        __widgets: [],

        /**
         * 承载容器构件内容的dom元素
         */
        __contentElement: null,

        indexOf: function ( widget ) {

            return $.inArray( widget, this.__widgets );

        },

        render: function () {

            if ( this.__rendered ) {
                return this;
            }

            this.callBase();
            this.__contentElement = this.__element;

            $( this.__element ).addClass( CONF.classPrefix + "container" );

            return this;

        },

        disable: function () {

            this.callBase();

            $.each( this.__widgets, function ( index, widget ) {

                widget.disable();

            } );

        },

        enable: function () {

            this.callBase();

            $.each( this.__widgets, function ( index, widget ) {

                widget.enable();

            } );

        },

        getWidgets: function () {

            return this.__widgets;

        },

        appendWidget: function ( widget ) {

            if ( !this.__valid( widget ) ) {
                return null;
            }

            if ( this.__options.disabled ) {
                widget.disable();
            }

            this.__widgets.push( widget );
            widget.appendTo( this.__contentElement );

            return widget;

        },

        insertWidget: function ( index, widget ) {

            if ( !this.__valid( widget ) ) {
                return null;
            }

            if ( this.__options.disabled ) {
                widget.disable();
            }

            this.__widgets.splice( index, 0, widget );
            this.__contentElement.insertBefore( this.__widgets[ index ].getElement(), widget.getElement() );

            return widget;

        },

        getContentElement: function () {
            return this.__contentElement;
        },

        removeWidget: function ( widget ) {

            if ( typeof widget === "number" ) {
                widget = this.__widgets.splice( widget, 1 );
            } else {
                this.__widgets.splice( this.indexOf( widget ), 1 );

            }

            this.__contentElement.removeChild( widget.getElement() );

        },

        /**
         * 验证元素给定元素是否可以插入当前容器中
         * @param ele 需要验证的元素
         * @returns {boolean} 允许插入返回true, 否则返回false
         * @private
         */
        __valid: function ( ele ) {

            return ele instanceof Widget;

        }

    } );

} );
