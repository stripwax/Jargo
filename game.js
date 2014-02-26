var game_state = "STOPPED";
var game_reset_next = true;
var run_timer = null;
var animating = false;
var current_level_category = null;
var current_level_name = null;

var program = new Program();
var crane = new Crane();

function on_load()
{
  render_set_scale(); 
  add_resize_handler();

  var categories = level_categories();
  var category_node = document.getElementById("category");
  for( var i=0;i<categories.length;i++)
  {
    category_node.innerHTML += "<option value=" + categories[i] + ">" + categories[i]+ "</option>";
  }

  category_node.selectedIndex = 0;
  selected_category = categories[ category_node.selectedIndex ];
  level_select_refresh();

  if( current_level_category == null || current_level_name == null )
  {
    var level_node = document.getElementById("level_select");
    current_level_category = selected_category;
    current_level_name = level_node.options[level_node.selectedIndex].text;
    load_level_select();
    game_reset();
    program.reset();
  }
}

function level_select_refresh()
{
  var level_node = document.getElementById("level_select");
  while(level_node.length)
  {
    level_node.remove(0);
  }

  var category_node = document.getElementById("category");
  selected_category = category_node.options[ category_node.selectedIndex ].text;
  console.log("selected category is:" + selected_category );
  var level_names = level_get_names( selected_category );
  for( var i=0;i<level_names.length;i++)
  {
    level_node.innerHTML += "<option value='"+level_names[i]+"'>" + level_names[i]+ "</option>";
  }
}

function game_reset()
{
  animating = false;
  if( game_state == "RUNNING" || game_state == "STEPPING" )
    game_stop();

  game_state = "READY TO RUN!";
  var x = document.getElementById("step_button");
  x.disabled = false;
  x = document.getElementById("run_button");
  x.disabled = false;

  program.reset();
  reset_state();
  crane.reset();

  animate_game();
  game_reset_next = false;
}

function program_clear()
{
  program.clear_interactive();
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
  if( game_state == "PROGRAM ENDED" )
    return;

  if(!crane.is_animating)
  {
    program.step_pre();
    crane.step_pre();
  }

  crane.tick();

  if(crane.is_animating)
  {
    animate_game();
    return;
  }

  program.step_post();

  if( game_state === "STEPPING" )
  {
    game_state = "PAUSED";
    program.pause();
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
  
  game_tick();
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
  next_timeout = redraw();
  program.animate();

  if( game_state === "RUNNING" || game_state === "STEPPING" )
    run_timer = setTimeout(function(){game_tick()}, next_timeout); 
}
