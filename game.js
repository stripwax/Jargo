var game_state = "STOPPED";
var game_reset_next = true;
var run_timer = null;
var animating = false;

function on_load()
{
  render_set_scale(); 

  var categories = level_categories();
  var category_node = document.getElementById("category");
  for( var i=0;i<categories.length;i++)
  {
    category_node.innerHTML += "<option value=" + categories[i] + ">" + categories[i]+ "</option>";
  }

  category_node.selectedIndex = 0;
  selected_category = categories[ category_node.selectedIndex ];
  level_select_refresh();
}

function level_select_refresh()
{
  var level_node = document.getElementById("level_select");
  while(level_node.length)
  {
    level_node.remove(0);
  }

  var category_node = document.getElementById("category");
  selected_category = category_node.options[ category_node.selectedIndex ].value;
  var level_names = level_get_names( selected_category );
  for( var i=0;i<level_names.length;i++)
  {
    level_node.innerHTML += "<option value='"+level_names[i]+"'>" + level_names[i]+ "</option>";
  }

  load_level(0);
  game_reset();
}

function game_reset()
{
  animating = false;
  if( game_state == "RUNNING" )
    game_stop();

  game_state = "READY TO RUN!";
  var x = document.getElementById("step_button");
  x.disabled = false;
  x = document.getElementById("run_button");
  x.disabled = false;

  reset_program();
  reset_state();
  reset_crane();

  animate_game();

  game_reset_next = false;
}

function game_run()
{
  if( game_reset_next )
    game_reset();
  if( game_state == "RUNNING" )
    game_stop();

  var x = document.getElementById("run_button");
  x.disabled = true;

  game_state = "RUNNING";
  animate_game();
}

function game_tick()
{
  crane_tick();

  if(animating)
  {
    if(!crane_step_post())
    {
      animate_game();
      return;
    }
    animating=false;
    program_step_post();
  }
  else
  {
    program_step_pre();
    crane_step_pre();

    if(!crane_step_post())
    {
      animating=true;
      animate_game();
      return;
    }
    else
    {
      program_step_post();
    }
  }

  if( game_state === "STEPPING" )
  {
    game_state = "PAUSED";
    program_state = "PAUSED";
  }

  animate_game();
    
  check_goal_state();
  
  if( game_state === "GAME OVER" || game_state === "PROGRAM ENDED" )
  {  
    var x = document.getElementById("step_button");
    x.disabled = true;
  }

  if( game_state != "RUNNING" && run_timer != null )
  {
    clearInterval(run_timer);
    run_timer = null;
  }

  if( game_state == "PAUSED" )
  {
    var x = document.getElementById("step_button");
    x.disabled = false;
  }
}

function game_step()
{
  if( game_reset_next )
    game_reset();
  if( run_timer != null )
  {
    clearInterval(run_timer);
    run_timer = null;
  }

  game_state = "STEPPING";
  var x = document.getElementById("step_button");
  x.disabled = true;
  
  animate_game();
}

function game_stop()
{
  if( run_timer != null )
  {
    clearInterval(run_timer);
    run_timer = null;
  }

  game_state = "PROGRAM ENDED";
  game_reset_next = true;
  animate_game();
}

function game_end( why )
{
  if( run_timer != null )
  {
    clearInterval(run_timer);
    run_timer = null;
  }

  alert( why );
  game_state = "GAME OVER";
  game_reset_next = true;
}

function animate_game()
{
//  x = document.getElementById("game");
//  text = [];
//  text = text + game_state;
//  x.innerHTML = text;

  next_timeout = redraw();
  animate_program();

  if( game_state === "RUNNING" || game_state === "STEPPING" )
    run_timer = setTimeout(function(){game_tick()}, next_timeout); 
}
