var crane_x = 0;
var crane_y = MAX_BOXES_HEIGHT;
var crane_state = "None";
var crane_box = "None";

var crane_anim=false;

function reset_crane()
{
  crane_box = "None";
  crane_state = "None";
  if(level==null)
  {
    crane_x = 0;
  }
  else
  {
    crane_x = initial_crane_x;
  }
  crane_y = MAX_BOXES_HEIGHT;
}

function crane_step_pre()
{
  if( crane_state == "grabbing down" )
  {
    crane_target_y = current_state[ crane_x ].length;
    crane_anim = true;
  }
  else if( crane_state == "going left" )
  {
    if( crane_x > warehouse_first_column )
    {
      crane_x = crane_x - 1;
      if( crane_box != "None" )
        crane_box.x = crane_x;
    }
    else
    {
      game_end( "Went too far left!" );
    }
  }
  else if( crane_state == "going right" )
  {
    if( crane_x < warehouse_last_column )
    {
      crane_x = crane_x + 1;
      if( crane_box != "None" )
        crane_box.x = crane_x;
    }
    else
    {
      game_end( "Went too far right!" );
    }
  }
}

function crane_step_post()
{
  if( crane_anim )
  {
    return(false); // because we're still in the middle of animation
  }
  else if( crane_state == "grabbing down" )
  {
    crane_state = "grabbing up";
    next_program_step = false; // because we now do a new animation instead
    crane_anim = true;
  }
  else
  {
    crane_state = "none";
    next_program_step = true; // because we now go back to find out the next command
  }

  return( next_program_step );
}

function crane_tick()
{
  if( crane_state === "grabbing down" )
  {
    // this logic is not obvious!
    // if the claw is holding a box, the crane can't go any lower than one space ABOVE the top of the current pile
    // if the claw is NOT holding a box, the crane can't go any lower than the top of the pile
    // and, whether the claw is holding a box or not, the crane cannot go below the ground (= 0)
    if( crane_y > 0 && (crane_box == "None" && crane_y >= current_state[crane_x].length ) || ( crane_box != "None" && crane_y > current_state[crane_x].length ) )
    {
      crane_y = crane_y - 1;
      if( crane_box != "None" )
        crane_box.y = crane_y;
    }
    else
    {
      crane_anim=false;

      if( crane_box === "None" )
      {
        if( current_state[ crane_x ].length > 0 )
        {   
          // there are boxes in this stack (length > 0). pick up the top (the 'last' box) 
          crane_box = current_state[ crane_x ].pop();
        }
      }
      else
      {
        // crane is already holding a box. deposit it on top
        if( current_state[ crane_x ].length >= MAX_BOXES_HEIGHT )
        {
          game_end( "Pile too high!" );
        }
        else
        {
          current_state[ crane_x ].push( crane_box );
          crane_box = "None";
        }
      }
    }
  }
  else if( crane_state === "grabbing up" )
  {
    if( crane_y < MAX_BOXES_HEIGHT )
    {
      crane_y = crane_y + 1;
      if( crane_box != "None" )
        crane_box.y = crane_y;
    }
    else
    {
      crane_anim=false;
    }
  }
  else
  {
    crane_anim=false;
  }
}
function animate_crane()
{
  if( crane_state === "grabbing down" )
  {
    if( crane_y > 0 )
    {
      crane_y = crane_y - 1;
    }
    else
    {
      crane_anim=false;

      if( crane_box === "None" )
      {
        if( current_state[ crane_x ].length > 0 )
        {   
          // there are boxes in this stack (length > 0). pick up the top (the 'last' box) 
          crane_box = current_state[ crane_x ].pop();
        }
      }
      else
      {
        // crane is already holding a box. deposit it on top
        if( current_state[ crane_x ].length >= MAX_BOXES_HEIGHT )
        {
          game_end( "Pile too high!" );
        }
        else
        {
          current_state[ crane_x ].push( crane_box );
          crane_box = "None";
        }
      }
    }
  }
  else if( crane_state === "grabbing up" )
  {
    if( crane_y < MAX_BOXES_HEIGHT )
    {
      crane_y = crane_y + 1;
    }
    else
    {
      crane_anim=false;
    }
  }
  else
  {
    crane_anim=false;
  }
}

