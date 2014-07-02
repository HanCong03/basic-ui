/**
 * ToggleButton对象
 * 可切换按钮构件
 */

define( function ( require ) {

    var prefix = '_fui_',
        $ = require( "base/jquery" ),
        CONF = require( "base/sysconf" ),
        Utils = require( "base/utils" );

    return require( "base/utils" ).Clazz.createClass( "ToggleButton", {

        base: require( "widget/button" ),

        __defaultOptions: {
            // 按钮当前的状态: true->按下, false->未按下
            state: false,
            // 是否在click时切换状态
            __clickToggle: true
        },

        widgetName: 'ToggleButton',

        render: function () {

            if ( this.__options.rendered ) {
                return this;
            }

            this.callBase();

            $( this.__element ).addClass( CONF.classPrefix + "toggle-button" );

            if ( this.__options.state !== this.__defaultOptions.state ) {
                this.__updateState();
            }

            this.__initEvent();

            return this;

        },

        /**
         * 初始化事件监听, 控制状态的切换
         * @private
         */
        __initEvent: function () {

            if ( !this.__options.__clickToggle ) {
                return;
            }

            this.on( "click", function () {

                this.toggle();

            } );

        },

        /**
         * 当前按钮是否已按下
         */
        isPressed: function () {
            return this.__options.state;
        },

        /**
         * 按下按钮
         */
        press: function () {

            $( this.__element ).addClass( CONF.classPrefix + "button-pressed" );
            this.__updateState( true );

        },

        /**
         * 弹起按钮
         */
        bounce: function () {

            $( this.__element ).removeClass( CONF.classPrefix + "button-pressed" );
            this.__updateState( false );

        },

        toggle: function () {

            if ( this.__options.state ) {
                this.bounce();
            } else {
                this.press();
            }

        },

        __updateState: function ( state ) {

            state = !!state;
            this.__options.state = state;
            this.trigger( "toggle", state, !state );

        }

    } );

} );