/**
 * 通用工具包
 */

define( function ( require ) {

    var $ = require( "base/jquery" );

    return {

        isElement: function ( target ) {
            return target.nodeType === 1;
        },

        /**
         * 根据传递进来的key列表， 从source中获取对应的key， 并进行处理，最终生成一个css声明映射表
         * 该方法处理过的结果可以交由模板调用Helper.toCssText方法生成inline style样式规则
         * @param keys 可以是数组， 也可以是object。 如果是数组， 则最终生成的css声明映射中将以该数组中的元素作为其属性名；
         *              如果是object, 则取值时以object的key作为source中的key， 在生成css声明映射时，则以keys参数中的key所对应的值作为css声明的属性名.
         * @returns {{}}
         */
        getCssRules: function ( keys, source ) {

            var mapping = {},
                tmp = {},
                value = null;

            if ( $.isArray( keys ) ) {

                $.each( keys, function ( i, key ) {

                    tmp[ key ] = key;

                } );

                keys = tmp;

            }

            for ( var key in keys ) {

                if ( keys.hasOwnProperty( key ) ) {

                    value = source[ key ];

                    if ( value !== null && value !== undefined ) {

                        mapping[ keys[ key ] ] = value;

                    }

                }

            }

            return mapping;

        }

    }

} );