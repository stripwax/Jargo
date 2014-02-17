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
    // we represent columns outside of the available warehouse space (i.e. before 'warehouse_first_column'
    // or after 'warehouse_last_column') as undefined. so don't try and compare the undefined things.
    if( undefined == goal_state[i] ) continue;

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
    var current_column = [];
    if(undefined != initial_state[i] )
    {
      for( var j = 0; j < initial_state[i].length; j++ )
      {
        var crate = initial_state[i][j].clone();
        current_column.push( crate );
        current_state_boxes.push( crate );
      }
      current_state[i] = current_column;
    }
  }
}

