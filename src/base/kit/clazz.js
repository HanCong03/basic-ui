define( function ( require ) {

    var $ = require( "base/jquery" ),
        extend = require( "base/kit/extend" );

    function createClass ( name, defines ) {

        var constructor = getConstructor( defines );

        constructor = inherit( constructor, defines );

        constructor.__className = name;

        return constructor;

    }

    function getConstructor ( defines ) {

        return defines.constructor || getDefaultConstructor();

    }

    function inherit ( clazz, defines ) {

        var Base = defines.base || ObjectClass,
            clazzChain = new Base(),
            baseFields = Base.prototype.__fields,
            currentFields = getFields( defines );

        for ( var key in clazzChain ) {
            if ( !isOwnerFunction( key, clazzChain )  ) {
                delete clazzChain[ key ];
            }
        }

        // 方法继承
        for ( var key in defines ) {

            if ( defines.hasOwnProperty( key ) ) {

                // 如果原型链中已经存在同名方法, 则覆盖并记录
                if ( isFunction( clazzChain[ key ] ) ) {
                    defines[ key ].__super = clazzChain[ key ];
                }

                clazzChain[ key ] = defines[ key ];

            }

        }

        currentFields = extend( {}, baseFields, currentFields );

        clazzChain.__fields = currentFields;
        clazzChain.constructor = clazz;

        clazz.prototype = clazzChain;
        WrapperClass.prototype = clazzChain;
        WrapperClass.__baseClass = Base;

        function WrapperClass () {

            this.__initField();
            this.__callBase.apply( this, arguments );
            clazz.apply( this, arguments );

        }

        return WrapperClass;

    }

    function getDefaultConstructor () {

        var tmp = function () {};
        tmp.prototype = new ObjectClass();
        tmp.constructor = tmp;

        return tmp;

    }

    function isOwnerFunction ( key, obj ) {

        if ( !obj.hasOwnProperty( key ) ) {
            return false;
        }

        if ( typeof obj[ key ] !== "function" ) {
            return false;
        }

        return true;

    }

    function isFunction ( target ) {
        return typeof target === "function";
    }

    function getFields ( defines ) {

        var fields = {};

        for ( var key in defines ) {

            if ( defines.hasOwnProperty( key ) && typeof defines[ key ] !== "function" ) {

                fields[ key ] = defines[ key ];
                delete defines[ key ];

            }

        }

        return fields;

    }

    /*---------------- 根类定义*/
    function ObjectClass () {
        this.__initField();
        this.__callBase();
    }

    $.extend( ObjectClass.prototype, {

        /**
         * 不允许访问
         */
        __fields: {},

        /**
         * 不允许手动调用
         * @private
         */
        __callBase: function () {
            var constructor = arguments.callee.caller;
            if ( constructor.__baseClass ) {
                constructor.__baseClass.apply( this, arguments );
            }
        },

        /**
         * 不允许手动调用
         * @private
         */
        __initField: function () {

            var fields = this.__fields;

            extend( this, fields );

        },

        /**
         * 方法中可以调用,构造器中禁止调用该方法
         * 调用该方法可以invoke 父类的同名方法, 以实现继承super功能
         */
        callBase: function () {

            var method = arguments.callee.caller;

            if ( method.__super ) {
                method.__super.apply( this, arguments );
            }

        }

    } );

    return {

        createClass: createClass

    }

} );