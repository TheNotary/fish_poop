var IntegrationHelpers = {
  sendKey: function(keyChar) {
    var keyCode;

    switch(keyChar) {
      case "[space]":
        keyCode = 32;
        break;
      default:
        keyCode = keyChar.charCodeAt(0);
        break;
    }
    keyboard_func({ keyCode: keyCode, preventDefault: function(){} });
  }
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = IntegrationHelpers
}
