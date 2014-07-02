define( function () {
return '<a unselectable="on" class="@(m.className ? @m.className + " " : "")fui-button-layout-@m.layout fui-button" style="padding: @m.padding;@h.toSpaceStyle( m )" @( m.text ? \'title="\' + m.text + \'"\' : \'\' )>' +
'@if ( (m.layout === \'left\' || m.layout === \'top\') && m.label ) {' +
'<span unselectable="on" class="fui-button-label">@m.label</span>' +
'}' +
'@if ( m.icon ) {' +
'<span unselectable="on" class="fui-button-icon">' +
'<img unselectable="on" src="@m.icon.src"@(m.icon.width ? \' width="\'+ m.icon.width +\'"\' : \'\')@(m.icon.height ? \' height="\'+ m.icon.height +\'"\' : \'\')>' +
'</span>' +
'}' +
'@if ( m.layout !== \'left\' && m.layout !== \'top\' && m.label ) {' +
'<span unselectable="on" class="fui-button-label">@m.label</span>' +
'}' +
'</a>'
} );