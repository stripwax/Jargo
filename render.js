var CURRENT_SCALE = 10;
var PAD_RATIO = 0.5;
var GOAL_SCALE = 10;

function render_set_scale()
{
  var div = document.getElementById("div_current");

  var height = div.clientHeight;
  var width = div.clientWidth;
height=height*0.7; // this is a fudge. why doesn't above work correctly?
width=width*0.7;

  var tall = MAX_BOXES_HEIGHT+1.5;
  var wide = 7;
  var scale_by_tall = (height/tall)-1;
  var scale_by_wide = (width/wide)-1;

  console.log( "by tall = " + scale_by_tall + " , by wide = " + scale_by_wide );

  CURRENT_SCALE = Math.min(scale_by_tall, scale_by_wide);
  div.width=CURRENT_SCALE*wide + "px";
  div.height=CURRENT_SCALE*tall + "px";

  GOAL_SCALE = CURRENT_SCALE / 2;
}

function redraw()
{
  render_current_state();
  render_crane();

  if( crane_anim )
  {
    return( 50 );
  }
  else
  {
    return( 100 );
  }
}

function render_deinitialise()
{
  var parent_current=document.getElementById("div_current");
  var parent_goal=document.getElementById("div_goal");

  for( var i = 0; i < current_state_boxes.length; i++ )
  {
    console.log( "removing div_current_"+box.id );
    box = current_state_boxes[i];
    child = document.getElementById("div_current_"+box.id);
    parent_current.removeChild(child);

    box = goal_state_boxes[i];
    console.log( "removing div_goal_"+box.id );
    child = document.getElementById("div_goal_"+box.id);
    parent_goal.removeChild(child);
  }
}

function render_initialise()
{
  var parent_current=document.getElementById("div_current");
  parent_current.style.position = "relative";
  parent_current.style.width = (CURRENT_SCALE*(1+PAD_RATIO)*7) + "px";
  parent_current.style.height = (CURRENT_SCALE*9.5) + "px";

  var parent_goal=document.getElementById("div_goal");
  parent_goal.style.position = "relative";
  parent_goal.style.width = (GOAL_SCALE*(1+PAD_RATIO)*7) + "px";
  parent_goal.style.height = (GOAL_SCALE*9.5) + "px";

  for( var i = 0; i < current_state_boxes.length; i++ )
  {
    box = current_state_boxes[i];
    child = document.createElement("img");
    child.id = "div_current_" + box.id;
    child.class = "box";
    child.style.position = "absolute";
    child.style.left = (box.x*(1+PAD_RATIO)*CURRENT_SCALE+(PAD_RATIO/2)*CURRENT_SCALE)+"px";
    child.style.top = ((MAX_BOXES_HEIGHT-box.y)*CURRENT_SCALE)+(0.5*CURRENT_SCALE)+"px";
    child.style.width = CURRENT_SCALE+"px";
    child.style.height = CURRENT_SCALE+"px";
    child.src="crate"+box.type+".svg";
    parent_current.appendChild(child);
  }

  for( var i = 0; i < goal_state_boxes.length; i++ )
  {
    box = goal_state_boxes[ i ];
    child = document.createElement("img");
    child.id = "div_goal_" + box.id;
    child.style.position = "absolute";
    child.style.left = (box.x*(1+PAD_RATIO)*GOAL_SCALE+(PAD_RATIO/2)*GOAL_SCALE)+"px";
    child.style.top = ((MAX_BOXES_HEIGHT-box.y)*GOAL_SCALE)+(0.5*GOAL_SCALE)+"px";
    child.style.width = GOAL_SCALE+"px";
    child.style.height = GOAL_SCALE+"px";
    child.src="crate"+box.type+".svg";
    parent_goal.appendChild(child);
  }
}

function render_current_state()
{
  for( var i = 0; i < current_state_boxes.length; i++ )
  {
    box = current_state_boxes[ i ];
    child = document.getElementById( "div_current_"+ box.id );
    child.style.left = box.x*(1+PAD_RATIO)*CURRENT_SCALE+(PAD_RATIO/2)*CURRENT_SCALE+"px";
    child.style.top = (MAX_BOXES_HEIGHT-box.y)*CURRENT_SCALE+(0.5*CURRENT_SCALE)+"px";
  }
}

function render_crane()
{
  arm = document.getElementById("arm");
  arm.style.position = "absolute";
  arm.style.top = "0px";
  arm.style.left = (crane_x * (1+PAD_RATIO) * CURRENT_SCALE + (PAD_RATIO/3)*CURRENT_SCALE)+"px";
  arm.height = ((MAX_BOXES_HEIGHT + 1 - crane_y) * CURRENT_SCALE)-(0.75*CURRENT_SCALE);
  arm.width = CURRENT_SCALE;
	
  claw_open = document.getElementById("claw");
  claw_shut = document.getElementById("claw_shut");

  // the extra crane_y condition here ensures that the crane never looks like
  // it's closed when it's at the same height as a box (even if it hasn't "yet"
  // picked it up.
  // actually , length < crane_y is pretty sweet because it means the claw
  // opens up one square BEFORE the actual crate.  Like it's about to grab it.
  // you know, like in the real world.  IT IS NICE.
  if(crane_box === "None" && current_state[crane_x].length<crane_y)
  {
    var crane = claw_shut;
    var other = claw_open;
  }
  else
  {
    var crane = claw_open;
    var other = claw_shut;
  }
  var cranes=[claw_open,claw_shut];
  for(var i=0;i<2;i++)
  {
    cranes[i].style.position = "absolute";
    cranes[i].style.left = (crane_x * (1+PAD_RATIO) * CURRENT_SCALE) + "px";
    cranes[i].style.top = ((MAX_BOXES_HEIGHT - crane_y) * CURRENT_SCALE) + "px";
    cranes[i].height = CURRENT_SCALE;
    cranes[i].width = CURRENT_SCALE * (1+PAD_RATIO);
  }
  other.style.visibility="hidden";
  crane.style.visibility="visible";
}

