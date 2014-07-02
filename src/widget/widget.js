/**
 * widget对象
 * 所有的UI组件都是widget对象
 */

define( function ( require ) {

    var prefix = '_fui_',
        uid = 0,
        CONF = require( "base/sysconf" ),
        $ = require( "base/jquery" ),
        Utils = require( "base/utils" );

    return require( "base/utils" ).Clazz.createClass( "Widget", {

        /**
         * 构件类型, 取值为: widget和container, 用以区别普通构件和容器类构件
         */
        __widgetType: 'widget',

        /**
         * 原始模板内容
         */
        __tpl: '',

        /**
         * 已编译模板内容
         */
        __compiledTpl: '',

        /**
         * 当前构件参数项
         */
        __options: null,

        /**
         * 构件默认参数项
         */
        __defaultOptions: {
            disabled: false,
            rendered: false
        },

        /**
         * 事件控制列表, 列表中出现的事件才会被监听
         */
        __events: [ "click" ],

        /**
         * 构件dom元素
         */
        __element: null,

        /**
         * 构件名称
         */
        widgetName: 'Widget',

        constructor: function ( options ) {

            this.__uid = generatorId();
            this.__options = $.extend( true, {}, this.__defaultOptions, options );

        },

        /**
         * 根据模板渲染构件, 如果该构件已经渲染过, 则不会进行二次渲染
         * @returns {Widget}
         */
        render: function () {

            var $ele = null;

            if ( this.__options.rendered ) {
                return this;
            }

            this.__options.rendered = true;

            this.__compiledTpl = Utils.Tpl.compile( this.__tpl, this.__options );
            this.__element = $( this.__compiledTpl )[ 0 ];

            $ele = $( this.__element );

            if ( this.__options.disabled ) {
                $ele.addClass( CONF.classPrefix + "disabled" );
            }

            $ele.addClass( CONF.classPrefix + "widget" );

            this.__delegate();

            return this;

        },

        /**
         * 当前构件是否是处于禁用状态
         * @returns {boolean|disabled|jsl.$.disabled|id.disabled}
         */
        isDisabled: function () {
            return this.__options.disabled;
        },

        /**
         * 启用当前构件
         * @returns {Widget}
         */
        enable: function () {
            this.__options.disabled = false;
            $( this.__element ).removeClass( CONF.classPrefix + "disabled" );
            return this;
        },

        /**
         * 禁用当前构件
         * @returns {Widget}
         */
        disable: function () {
            this.__options.disabled = true;
            $( this.__element ).addClass( CONF.classPrefix + "disabled" );
            return this;
        },

        /**
         * 获取
         * @returns {null}
         */
        getElement: function () {
            return this.__element;
        },

        appendTo: function ( container ) {

            if ( Utils.Widget.isContainer( container ) ) {

                container.appendWidget( this );

            } else if ( Utils.isElement( container ) ) {

                container.appendChild( this.__element );

            } else {

                throw new Error( 'TypeError: Widget.appendTo()' );

            }

        },

        on: function ( type, cb ) {

            var _self = this;

            cb.__fui_listener = function ( e ) {

                e.stopPropagation();
                e.type = type;

                if ( !_self.isDisabled() ) {
                    cb.apply( _self, arguments );
                }

            };

            $( this.__element ).on( CONF.eventPrefix + type, cb.__fui_listener );

        },

        off: function ( type, cb ) {

            $( this.__element ).off( CONF.eventPrefix + type, cb && cb.__fui_listener )

        },

        trigger: function ( type, params ) {

            var eventList = $._data( this.__element, "events" );

            type = CONF.eventPrefix + type;

            if ( eventList[ type ] ) {
                $( this.__element ).trigger( type, [].slice.call( arguments, 1 ) );
            }


        },

        /**
         * 代理构件所有事件, 集中控制
         * @private
         */
        __delegate: function () {

            var _self = this;

            $( this.__element ).on( this.__events.join( " " ), function ( e ) {

                e.stopPropagation();
                _self.trigger( e.type );

            } );

        }

    } );

    // 为widget生成唯一id
    function generatorId () {

        uid++;
        return prefix + uid;

    }

} );