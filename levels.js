var level = null;
var warehouse_first_column = 0;
var warehouse_last_column = 0;
var initial_state = [ [] ];
var current_state = [ [] ];
var goal_state = [ [] ];
var initial_crane_x = 0;

function load_level_select()
{
  var category_node = document.getElementById("category");
  var level_names_node = document.getElementById("level_select");
  load_level_from_choice( category_node.options[ category_node.selectedIndex ].text, level_names_node.options[ level_names_node.selectedIndex ].text );
}
function load_level_from_choice( category, level_name )
{
  if( category == CATEGORY_SENTINEL || level_name == LEVEL_NAME_SENTINEL )
    return;

  program.save_to_cookie();

  console.log( "Loading level: '" + category + "', '" + level_name + "'" );

  for( var i=0; i < levels_data.length; i++ )
  {
    if( levels_data[i].rating === category && levels_data[i].title === level_name )
      load_level(i);
  }

  current_level_highscore = getCookie( "score_" + current_level_category+"_"+current_level_name, 0 );
  if(current_level_highscore == undefined)
    current_level_highscore = 0;
  animate_highscore();
  program.load_from_cookie();
}

function level_check_sanity( x )
{
  level = levels_data[ x ];
  // perform some quick sanity checks on the level data
  if(level.initial_state.length != level.goal_state.length )
  {
    alert( "Bad level! initial_state and goal_state are different sizes!" );
    return;
  }
  var boxes_by_type = [];
  for(var i=0;i<TYPES_OF_BOXES;i++)
    boxes_by_type &= 0;
  for( var i = 0; i < level.initial_state.length; i++ )
  {
    for( var j = 0; j < level.initial_state[i].length; j++ )
    {
      var boxtype = level.initial_state[i][j];
      if( isNaN(boxtype) || boxtype < 0 || boxtype > TYPES_OF_BOXES - 1 )
      {
        alert( "Bad level! found a box type '" + boxtype + "'" );
        return;
      }
      boxes_by_type[boxtype]++;
    }
  }
  for( var i = 0; i < level.goal_state.length; i++ )
  {
    for( var j = 0; j < level.goal_state[i].length; j++ )
    {
      var boxtype = level.goal_state[i][j];
      if( isNaN(boxtype) || boxtype < 0 || boxtype > TYPES_OF_BOXES - 1 )
      {
        alert( "Bad level! found a box type '" + boxtype + "'" );
        return;
      }
      boxes_by_type[boxtype]--;
    }
  }
  for(var i=0;i<TYPES_OF_BOXES;i++)
  {
    if(Math.abs(boxes_by_type[i])>1e-4)
    {
      alert( "Bad level! found a different number of box type '" + i + "' in initial_state and goal_state\n" + boxes_by_type );
      return;
    }
  }
}

function load_level(x)
{
  render_deinitialise();

  game_state = "stopped";
  level = levels_data[ x ];
  level_check_sanity(x);

  // center the 'usable' part of the warehouse
  warehouse_first_column = Math.floor((MAX_BOXES_WIDTH-level.initial_state.length) /2 );
  warehouse_last_column = warehouse_first_column+level.initial_state.length - 1;

  initial_state = Array(MAX_BOXES_WIDTH);
  current_state = Array(MAX_BOXES_WIDTH);
  current_state_boxes = [];
  var id = 0;
  for( var i = 0; i < level.initial_state.length; i++ )
  {
    initial_column = [];
    current_column = [];
    for( var j = 0; j < level.initial_state[i].length; j++ )
    {
      var crate = new Crate( i + warehouse_first_column, j, level.initial_state[i][j], id );
      initial_column.push( crate );
      var clone_crate = crate.clone();
      current_column.push( clone_crate );
      current_state_boxes.push( clone_crate );
      id = id + 1;
    }
    initial_state[i + warehouse_first_column] = initial_column;
    current_state[i + warehouse_first_column] = current_column;
  }

  goal_state = Array(MAX_BOXES_WIDTH);
  goal_state_boxes = [];
  id = 0;
  for( var i = 0; i < level.goal_state.length; i++ )
  {
    column = [];
    for( var j = 0; j < level.goal_state[i].length; j++ )
    {
      var crate = new Crate(i + warehouse_first_column, j, level.goal_state[i][j], id );
      column.push( crate );
      goal_state_boxes.push( crate );
      id = id + 1;
    }
    goal_state[i+warehouse_first_column] = column;
  }

  initial_crane_x = level.crane_x + warehouse_first_column;
  current_level_category = level.rating;
  current_level_name = level.title;

  if( level.program != undefined )
    program.set_from_string(level.program);

  render_initialise();

  game_reset();
}

function level_score( pcount )
{
  var level3score = Math.max(level.score * 1.25,level.score+2);
  if(level.score3 != undefined )
    level3score = level.score3;
  level2score = Math.max(level3score * 1.25,level3score+2);

  if(pcount <= level.score)
  {
     return(4);
  }
  else if(pcount <= level3score )
  {
    return(3);
  }
  else if(pcount <= level2score )
  {
    return(2);
  }
  else
  {
    // the least you can get for solving a level is 1 star
    return(1);
  }
}
