/*!
 * 启动代码
 */

define( 'kf.start', function ( require ) {

    window.FUI = {

        Widget: require( "widget/widget" ),

        Label: require( "widget/label" ),
        Button: require( "widget/button" ),
        ToggleButton: require( "widget/toggle-button" ),
        Separator: require( "widget/separator" ),

        // container widget
        Container: require( "widget/container" ),
        Panel: require( "widget/panel" ),
        Buttonset: require( "widget/button-set" ),
        LabelPanel: require( "widget/label-panel" )


    };

} );