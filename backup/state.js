var initial_state = new Array();
var initial_state_boxes = new Array();
var goal_state = new Array();
var goal_state_boxes = new Array();
var current_state = new Array();
var current_state_boxes = new Array();

function check_goal_state()
{
  var match=true;
  for( var i=0; i<goal_state.length; i++)
  {
    if( current_state[i].length != goal_state[i].length )
    {
      match = false;
      break;
    }
    for( var j=0; j<current_state[i].length; j++ )
    {
      if( current_state[i][j].type != goal_state[i][j].type )
      {
        match = false;
        break;
      }
    }
  }

  if( match )
  {
    alert( "yay!");
    game_stop();
  }
}

function reset_state()
{
  current_state = [];
  current_state_boxes = [];

  for( var i = 0; i < initial_state.length; i++ )
  {
    current_column = [];
    for( var j = 0; j < initial_state[i].length; j++ )
    {
      box_info = initial_state[i][j].clone();
      current_column.push( box_info );
      current_state_boxes.push( box_info );
    }
    current_state.push( current_column );
  }
}

