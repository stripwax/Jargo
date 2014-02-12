var MAX_BOXES_HEIGHT = 8; // how high can you stack a pile
var level = null;

function load_level_select()
{
  var category_node = document.getElementById("category");
  var level_names_node = document.getElementById("level_select");
  load_level_from_choice( category_node.options[ category_node.selectedIndex ].text, level_names_node.options[ level_names_node.selectedIndex ].text );
}
function load_level_from_choice( category, level_name )
{
  console.log( "Loading level: '" + category + "', '" + level_name + "'" );

  for( var i=0; i < levels_data.length; i++ )
  {
    if( levels_data[i].rating === category && levels_data[i].title === level_name )
      load_level(i);
  }
}

function load_level(x)
{
  prev_level=level;
  render_deinitialise();

  game_state = "stopped";
  console.log( "Loading level " + x );
  level = levels_data[ x ];
  initial_state = [];
  current_state = [];
  current_state_boxes = [];
  id = 0;
  for( var i = 0; i < level.initial_state.length; i++ )
  {
    initial_column = [];
    current_column = [];
    for( var j = 0; j < level.initial_state[i].length; j++ )
    {
      box_info = {x:i, y:j, type:level.initial_state[i][j], id:id };
      current_column.push( box_info );
      current_state_boxes.push( box_info );
      clone_box = box_info.clone();
      initial_column.push( clone_box );
      id = id + 1;
    }
    initial_state.push( initial_column );
    current_state.push( current_column );
  }

  goal_state = [];
  goal_state_boxes = [];
  id = 0;
  for( var i = 0; i < level.goal_state.length; i++ )
  {
    column = [];
    for( var j = 0; j < level.goal_state[i].length; j++ )
    {
      box_info = {x:i, y:j, type:level.goal_state[i][j], id:id };
      column.push( box_info );
      goal_state_boxes.push( box_info );
      id = id + 1;
    }
    goal_state.push( column );
  }

  initial_crane_x = level.crane_x;
 
  console.log("doing render initialize");
  render_initialise();
  console.log("done render initialize");

  game_reset();
}
