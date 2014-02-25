function Crane()
{
  this.x = 0;
  this.y = MAX_BOXES_HEIGHT;
  this.state = "None";
  this.box = "None";

  this.is_animating=false;

  this.reset = function()
  {
    this.box = "None";
    this.state = "None";
    if(level==null)
    {
      this.x = 0;
    }
    else
    {
      this.x = initial_crane_x;
    }
    this.y = MAX_BOXES_HEIGHT;
  }

  this.step_pre = function()
  {
    if( this.state == "grabbing down" )
    {
      this.target_y = current_state[ this.x ].length;
      this.is_animating = true;
    }
    else if( this.state == "going left" )
    {
      if( this.x > warehouse_first_column )
      {
        this.x = this.x - 1;
        if( this.box != "None" )
          this.box.x = this.x;
      }
      else
      {
        game_end( "Went too far left!" );
      }
    }
    else if( this.state == "going right" )
    {
      if( this.x < warehouse_last_column )
      {
        this.x = this.x + 1;
        if( this.box != "None" )
          this.box.x = this.x;
      }
      else
      {
        game_end( "Went too far right!" );
      }
    }
  }

  this.step_post = function()
  {
    var next_program_step = false;
    if( this.is_animating )
    {
      return(false); // because we're still in the middle of animation
    }
    else if( this.state == "grabbing down" )
    {
      this.state = "grabbing up";
      next_program_step = false; // because we now do a new animation instead
      this.is_animating = true;
    }
    else
    {
      this.state = "none";
      next_program_step = true; // because we now go back to find out the next command
    }

    return( next_program_step );
  }

  this.tick = function()
  {
    if( this.state === "grabbing down" )
    {
      // this logic is not obvious!
      // if the claw is holding a box, the crane can't go any lower than one space ABOVE the top of the current pile
      // if the claw is NOT holding a box, the crane can't go any lower than the top of the pile
      // and, whether the claw is holding a box or not, the crane cannot go below the ground (= 0)
      if( this.y > 0 && (this.box == "None" && this.y >= current_state[this.x].length ) || ( this.box != "None" && this.y > current_state[this.x].length ) )
      {
        this.y = this.y - 1;
        if( this.box != "None" )
          this.box.y = this.y;
      }
      else
      {
        this.is_animating=false;

        if( this.box === "None" )
        {
          if( current_state[ this.x ].length > 0 )
          {
            // there are boxes in this stack (length > 0). pick up the top (the 'last' box) 
            this.box = current_state[ this.x ].pop();
          }
        }
        else
        {
          // crane is already holding a box. deposit it on top
          if( current_state[ this.x ].length >= MAX_BOXES_HEIGHT )
          {
            game_end( "The pile of crates got stacked up too high!" );
          }
          else
          {
            current_state[ this.x ].push( this.box );
            this.box = "None";
          }
        }
      }
    }
    else if( this.state === "grabbing up" )
    {
      if( this.y < MAX_BOXES_HEIGHT )
      {
        this.y = this.y + 1;
        if( this.box != "None" )
          this.box.y = this.y;
      }
      else
      {
        this.is_animating=false;
      }
    }
    else
    {
      this.is_animating=false;
    }
  }
}
