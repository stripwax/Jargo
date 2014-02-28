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
    var pcount = program.get_instruction_count();
    var score = level_score(pcount);
    current_level_highscore=score;
    setCookie("score_"+current_level_category+"_"+current_level_name, ""+score /* cast score to string */ );
    animate_highscore();

    message = "<H1>Well Done!</H1>You solved it using " + pcount + " instructions.<br>";
    message += "That's worth " + score + " stars!<br>";
    message += "<center>";
    message += stars_innerhtml("big_star",score,4);
    message += "</center><br>";
    if( score==4 )
    {
      message += "That's the best possible score, because that's the fewest instructions!"
    }
    else
    {
      message += "If you use fewer instructions to solve this, you'll get more stars! Are you up to the challenge?";
    }
    new_popup(
      "score",
      message
    );

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

