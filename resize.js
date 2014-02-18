// adapted from
// http://mbccs.blogspot.co.uk/2007/11/fixing-window-resize-event-in-ie.html
// and
// http://stackoverflow.com/questions/9769868/addeventlistener-not-working-in-ie8

function add_resize_handler()
{
  if( window.addEventListener )
  {
    window.addEventListener('resize', window_resize_callback); 
  }
  else
  {
    window.attachEvent('resize', window_resize_callback);
  }
}

var resizeTimeoutId;

function window_resize_callback( _event )
{
  window.clearTimeout(resizeTimeoutId);
  resizeTimeoutId = window.setTimeout('render_on_resize();', 10);
}
