define( function ( require ) {

    var $ = require( "base/jquery" ),
        extend = require( "base/kit/extend" );

    /**
     * 创建一个类
     * @param className 类名
     * @param defines 类定义
     * @returns {*} 根据类定义创建的构造器
     */
    function createClass ( className, defines ) {

        var constructor = getConstructor( defines );

        constructor = inherit( className, constructor, defines );

        return constructor;

    }

    function getConstructor ( defines ) {

        return defines.constructor || getDefaultConstructor();

    }

    function inherit ( className, clazz, defines ) {

        var Base = defines.base || ObjectClass,
            InheritBaseClass = getInheritClass( Base ),
            clazzChain = new InheritBaseClass(),
            baseFields = Base.prototype.___fields,
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
                    defines[ key ].___super = clazzChain[ key ];
                }

                clazzChain[ key ] = defines[ key ];

            }

        }

        currentFields = extend( {}, baseFields, currentFields );

        clazzChain.___fields = currentFields;
        clazzChain.constructor = clazz;
        clazzChain.___className = className;
        clazz.___isConstuctor = true;
        clazz.___className = className;

        clazz.prototype = clazzChain;
        WrapperClass.prototype = clazzChain;
        WrapperClass.___baseClass = Base;
        WrapperClass.___className = className;

        function WrapperClass () {

            this.___callBase.apply( this, arguments );
            clazz.apply( this, arguments );

        }

        return WrapperClass;

    }

    /**
     * 获取继承链中的父类的代理类
     */
    function getInheritClass ( baseClass ) {

        function InheritBaseClass () {}

        InheritBaseClass.prototype = baseClass.prototype;

        return InheritBaseClass;

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
        this.___initField();
        this.___callBase();
    }

    $.extend( ObjectClass.prototype, {

        /**
         * 不允许访问
         */
        ___fields: {},

        /**
         * 不允许手动调用
         * @private
         */
        ___callBase: function () {
            var constructor = arguments.callee.caller;
            if ( constructor.___baseClass ) {
                constructor.___baseClass.apply( this, arguments );
            }
        },

        /**
         * 不允许手动调用
         * @private
         */
        ___initField: function () {

            var fields = this.___fields;

            extend( this, fields );

        },

        /**
         * 方法中可以调用,构造器中禁止调用该方法
         * 调用该方法可以invoke 父类的同名方法, 以实现继承super功能
         */
        callBase: function () {

            var method = arguments.callee.caller;

            if ( method.___super ) {
                method.___super.apply( this, arguments );
            }

        },

        /**
         * 判定本次方法调用是否是一次不安全的调用, 如果不安全, 返回true, 否则返回false
         */
        isBadCall: function () {

            var originClass = this.___className,
                // 待验证方法
                verifyMethod = arguments.callee.caller,
                // caller
                caller = verifyMethod.caller;

            return caller.___isConstuctor && originClass !== caller.___className;

        }

    } );

    return {

        createClass: createClass

    }

} );