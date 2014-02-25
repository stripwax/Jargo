var CURRENT_SCALE = 10;
var PAD_RATIO = 0.5;
var GOAL_SCALE = 10;
var OOB_PAD = 0.5; // this means 'how many boxes-worth of padding do we ALWAYS show as out-of-bounds on the far left and right of the warehouse'
var PALLET_RATIO = 0.5; // this means 'how many boxes-worth of size do we pad below with, to show the pallet (stacking column) numbers'
var DIV_BORDER_PX = 6; // how many pixels wide is the border in the .current css style. I suppose I could get this from the DOM really, although oddly this is 1+ the value I set in the css stylesheet..

function render_set_scale()
{
  var page_container_div = document.getElementById("div_page_container");
  var above_div = document.getElementById("div_lhs_everything_else");
  var div = document.getElementById("div_current_container");

  var page_height = page_container_div.clientHeight;
  var above_height = above_div.clientHeight;
  var height = page_height - above_height - (2*DIV_BORDER_PX);
  var width = above_div.clientWidth - (2*DIV_BORDER_PX);

  var tall = MAX_BOXES_HEIGHT+1.5+PALLET_RATIO;
  var wide = MAX_BOXES_WIDTH*(1+PAD_RATIO)+(OOB_PAD*2);
  var scale_by_tall = Math.floor((height/tall)-0.5);
  var scale_by_wide = Math.floor((width/wide)-0.5);

  CURRENT_SCALE = Math.min(scale_by_tall, scale_by_wide);
  div.width=CURRENT_SCALE*wide + "px";
  div.height=CURRENT_SCALE*tall + "px";

  GOAL_SCALE = CURRENT_SCALE / 2;
}

// redraw returns the number of ms between now and the next animation frame
function redraw()
{
  render_current_state();
  render_crane();

  if( crane.is_animating )
  {
    return( 50 );
  }
  else
  {
    return( 50 );
  }
}

function render_on_resize()
{
  render_set_scale();
  render_deinitialise();
  render_initialise();
  animate_game();
}

function render_deinitialise()
{
  var parent_current=document.getElementById("div_current");
  var parent_goal=document.getElementById("div_goal");

  for( var i = 0; i < current_state_boxes.length; i++ )
  {
    var box = current_state_boxes[i];
    var child = document.getElementById("div_current_"+box.id);
    parent_current.removeChild(child);

    var box = goal_state_boxes[i];
    var child = document.getElementById("div_goal_"+box.id);
    parent_goal.removeChild(child);
  }

  for( var i=warehouse_first_column;i<=warehouse_last_column;i++)
  {
    var child = document.getElementById("div_pallet_"+i);
    if(child!=null)
      parent_current.removeChild(child);
    var child = document.getElementById("div_goal_pallet_"+i);
    if(child!=null)
      parent_goal.removeChild(child);
  }
}

function render_initialise()
{
  var oob_left=document.getElementById("div_out_of_bounds_left");
  oob_left.style.width = (CURRENT_SCALE*((1+PAD_RATIO)*warehouse_first_column+OOB_PAD)) + "px";
  oob_left.style.left = "0px";
  var oob_right=document.getElementById("div_out_of_bounds_right");
  oob_right.style.width = (CURRENT_SCALE*((1+PAD_RATIO)*(MAX_BOXES_WIDTH-warehouse_last_column-1)+OOB_PAD)) + "px";
  oob_right.style.left = (CURRENT_SCALE*((1+PAD_RATIO)*(warehouse_last_column+1)+OOB_PAD)) + "px";

  var parent_current=document.getElementById("div_current");
  parent_current.style.position = "relative";
  parent_current.style.width = (CURRENT_SCALE*((1+PAD_RATIO)*MAX_BOXES_WIDTH+OOB_PAD*2)) + "px";
  parent_current.style.height = (CURRENT_SCALE*(MAX_BOXES_HEIGHT+1.5+PALLET_RATIO)) + "px";

  var parent_goal=document.getElementById("div_goal");
  parent_goal.style.position = "relative";
  parent_goal.style.width = (GOAL_SCALE*(1+PAD_RATIO)*MAX_BOXES_WIDTH) + "px";
  parent_goal.style.height = (GOAL_SCALE*(MAX_BOXES_HEIGHT+1.5+PALLET_RATIO)) + "px";

  for( var i = 0; i < current_state_boxes.length; i++ )
  {
    var box = current_state_boxes[i];
    child = box.getDiv();
    child.id = "div_current_" + box.id;
    child.style.position = "absolute";
    child.style.left = ((box.x*(1+PAD_RATIO)+OOB_PAD)*CURRENT_SCALE+(PAD_RATIO/2)*CURRENT_SCALE)+"px";
    child.style.top = ((MAX_BOXES_HEIGHT-box.y+0.5)*CURRENT_SCALE)+"px";
    child.style.width = CURRENT_SCALE+"px";
    child.style.height = CURRENT_SCALE+"px";
    parent_current.appendChild(child);
  }

  for( var i = warehouse_first_column; i <= warehouse_last_column; i++ )
  {
    child = document.createElement("div");
    child.id = "div_pallet_" + i;
    child.style.position = "absolute";
    child.style.left = ((i*(1+PAD_RATIO)+OOB_PAD)*CURRENT_SCALE+(PAD_RATIO/2)*CURRENT_SCALE)+"px";
    child.style.top = ((MAX_BOXES_HEIGHT+1.5)*CURRENT_SCALE)+"px";
    child.style.width = (CURRENT_SCALE)+"px";
    child.style.height = (CURRENT_SCALE*PALLET_RATIO)+"px";
    child.className = "pallet pallet_" + (1 + i - warehouse_first_column);
    parent_current.appendChild(child);

    child = document.createElement("div");
    child.id = "div_goal_pallet_" + i;
    child.style.position = "absolute";
    child.style.left = ((i*(1+PAD_RATIO))*GOAL_SCALE+(PAD_RATIO/2)*GOAL_SCALE)+"px";
    child.style.top = ((MAX_BOXES_HEIGHT+1.5)*GOAL_SCALE)+"px";
    child.style.width = GOAL_SCALE+"px";
    child.style.height = (GOAL_SCALE*PALLET_RATIO)+"px";
    child.className = "pallet pallet_" + (1 + i - warehouse_first_column);
    parent_goal.appendChild(child);
  }

  for( var i = 0; i < goal_state_boxes.length; i++ )
  {
    box = goal_state_boxes[ i ];
    child = box.getDiv();
    child.id = "div_goal_" + box.id;
    child.style.position = "absolute";
    child.style.left = ((box.x*(1+PAD_RATIO))*GOAL_SCALE+(PAD_RATIO/2)*GOAL_SCALE)+"px";
    child.style.top = ((MAX_BOXES_HEIGHT-box.y+0.5)*GOAL_SCALE)+"px";
    child.style.width = GOAL_SCALE+"px";
    child.style.height = GOAL_SCALE+"px";
    parent_goal.appendChild(child);
  }

  var goal_description = document.getElementById("goal_text");
  goal_description.innerHTML = "Your Goal: " + current_level_name;
}

function render_current_state()
{
  for( var i = 0; i < current_state_boxes.length; i++ )
  {
    var box = current_state_boxes[ i ];
    if(game_state!="RUNNING" || box.id==crane.box.id)
    {
      child = document.getElementById( "div_current_"+ box.id );
      child.style.left = (box.x*(1+PAD_RATIO)+OOB_PAD)*CURRENT_SCALE+(PAD_RATIO/2)*CURRENT_SCALE+"px";
      child.style.top = (MAX_BOXES_HEIGHT-box.y)*CURRENT_SCALE+(0.5*CURRENT_SCALE)+"px";
    }
  }
}

function render_crane()
{
  var arm = document.getElementById("arm");
  arm.style.position = "absolute";
  arm.style.top = "0px";
  arm.style.left = ((crane.x*(1+PAD_RATIO)+OOB_PAD) * CURRENT_SCALE + (PAD_RATIO/3)*CURRENT_SCALE)+"px";
  arm.style.height = ((MAX_BOXES_HEIGHT + 1 - crane.y) * CURRENT_SCALE)-(0.75*CURRENT_SCALE)+"px";
  arm.style.width = CURRENT_SCALE+"px";
	
  var claw = document.getElementById("claw");

  // the extra crane.y condition here ensures that the crane never looks like
  // it's closed when it's at the same height as a box (even if it hasn't "yet"
  // picked it up.
  // actually , length < crane.y is pretty sweet because it means the claw
  // opens up one square BEFORE the actual crate.  Like it's about to grab it.
  // you know, like in the real world.  IT IS NICE.
  if(crane.box === "None" && current_state[crane.x].length<crane.y)
  {
    var which_claw = "c_claw_shut";
  }
  else
  {
    var which_claw = "c_claw_open";
  }

  claw.style.position = "absolute";
  claw.style.left = ((crane.x * (1+PAD_RATIO)+OOB_PAD) * CURRENT_SCALE) + "px";
  claw.style.top = ((MAX_BOXES_HEIGHT - crane.y) * CURRENT_SCALE) + "px";
  claw.style.height = CURRENT_SCALE+"px";
  claw.style.width = CURRENT_SCALE * (1+PAD_RATIO)+"px";
  claw.className = which_claw;
}

