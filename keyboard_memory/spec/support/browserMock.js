

function Document(theElements) {
  var elements = theElements;

  this.getElementById = function(id) {
    return elements[id];
  };
}


function Window() {
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
  module.exports = {
    Document: Document,
    Window: Window
  }
}
