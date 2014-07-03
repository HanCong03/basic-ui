/*!
 * 启动代码
 */

define( 'kf.start', function ( require ) {

    window.FUI = {

        Widget: require( "widget/widget" ),
        Container: require( "widget/container" ),
        Panel: require( "widget/panel" ),
        Label: require( "widget/label" ),
        Button: require( "widget/button" ),
        ToggleButton: require( "widget/toggle-button" ),
        Buttonset: require( "widget/button-set" )

    };

} );