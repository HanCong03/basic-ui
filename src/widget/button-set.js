/**
 * Button对象
 * 通用按钮构件
 */

define( function ( require ) {

    var $ = require( "base/jquery" ),
        CONF = require( "base/sysconf" ),
        ToggleButton = require( "widget/toggle-button" );

    return require( "base/utils" ).Clazz.createClass( "Buttonset", {

        base: require( "widget/panel" ),

        widgetName: 'Buttonset',

        // 前一次选中项
        __previousIndex: -1,

        // 当前选中项
        __currentIndex: -1,

        __defaultOptions: {
            // 初始选中项, -1表示不选中任何项
            selected: -1
        },

        __initButtons: function () {

            var _self = this,
                buttonWidget = null;

            $.each( this.__options.buttons, function ( index, buttonOption ) {

                // 禁止ToggleButton对象注册事件
                buttonOption.__clickToggle = false;

                buttonWidget = new ToggleButton( buttonOption ).render();

                // 切换
                buttonWidget.on( 'click', function () {

                    var currentWidget = this;

                    currentWidget.press();

                    // 弹起其他按钮
                    $.each( _self.__widgets, function ( i, otherWidget ) {

                        if ( otherWidget !== currentWidget ) {
                            otherWidget.bounce();
                        }

                    } );

                    _self.__options.__prevSelected = _self.__options.selected;
                    _self.__options.selected = $.inArray( this, _self.__widgets );

                    _self.trigger( 'change', {
                        currentIndex: _self.__options.selected,
                        prevIndex: _self.__options.__prevSelected,
                        currentButton: _self.getButton( _self.__options.selected ),
                        prevButton: _self.getButton( _self.__options.__prevSelected )
                    } );

                } );

                _self.appendWidget( buttonWidget );

            } );

        },

        getButtons: function () {
            return this.getWidgets();
        },

        getButton: function ( index ) {
            return this.getWidgets()[ index ] || null;
        },

        appendButton: function () {
            return this.appendWidget.apply( this, arguments );
        },

        insertButton: function () {
            return this.insertWidget.apply( this, arguments );
        },

        removeButton: function () {
            return this.removeWidget.apply( this, arguments );
        },

        render: function () {

            if ( this.__options.rendered ) {
                return this;
            }

            this.callBase();
            $( this.__element ).addClass( CONF.classPrefix + "buttonset" )

            this.__initButtons();
            this.__initSelect();

            return this;

        },

        __initSelect: function () {

            var selectedWidget = null;


            if ( this.__options.selected > 0 ) {
                selectedWidget = this.__widgets[ this.__options.selected ];
            }

            if ( this.__options.disabled ) {
                this.__options.selected = -1;
                return;
            }

            if ( selectedWidget ) {
                selectedWidget.trigger( "click" );
                this.__options.__prevSelected = -1;
            } else {
                this.__options.selected = -1;
            }

        },

        __valid: function ( ele ) {
            return ele instanceof ToggleButton;
        }

    } );

} );