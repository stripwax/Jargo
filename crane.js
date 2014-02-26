function Crane()
{
  this.x = 0;
  this.y = MAX_BOXES_HEIGHT;
  this.state = "None";
  this.box = "None";
  this.fast = false;

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
    this.is_animating = false;
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
      }
      else
      {
        game_end( "Went too far right!" );
      }
    }

    if( this.box != "None" )
      this.box.move_to(this.x,this.y);
  }

  this.tick = function()
  {
    if( this.state != "grabbing down" && this.state != "grabbing up" )
    {
      this.state = "none";
      this.is_animating = false;
      return(false);
    }

    if( this.state === "grabbing down" )
    {
      // this logic is not obvious!
      // if the claw is holding a box, the crane can't go any lower than one space ABOVE the top of the current pile
      // if the claw is NOT holding a box, the crane can't go any lower than the top of the pile
      // and, whether the claw is holding a box or not, the crane cannot go below the ground (= 0)
      //
      // 'fast' mode means we do one single step for the whole grab down / grab up animation
      if( this.y > 0 && (this.box == "None" && this.y >= current_state[this.x].length ) || ( this.box != "None" && this.y > current_state[this.x].length ) )
      {
        if( this.fast )
        {
          this.is_animating=false;
          if( this.box == "None" )
          {
            this.y = Math.max( 0, current_state[this.x].length - 1 );
          }
          else
          {
            this.y = current_state[this.x].length;
          }
        }
        else
        {
          this.y = this.y - 1;
        }
      }
      else
      {
        this.is_animating=false;
      }

      // update the box if we are holding one.
      // we do this BEFORE this below 'drop the box' logic
      if( this.box != "None" )
        this.box.move_to(this.x,this.y);

      // should we drop the box? if this.is_animating is false, it means
      // the grabbing_down animation has finished. Meaning: we're at the bottom. so drop the box.
      if( !this.is_animating )
      {
        // end state (crane arm at bottom of its reach, regardless of how / whether fast or not / etc)
        if( this.box === "None" )
        {
          // not holding anything? pick up a box, if there's one there.
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

        // because we now do the grabbing up animation, we immediately set is_animating back to true
        this.state = "grabbing up";
        this.is_animating = true;
      }
    }

    if( this.state === "grabbing up" )
    {
      if( this.y < MAX_BOXES_HEIGHT )
      {
        if( this.fast )
        {
          this.y = MAX_BOXES_HEIGHT;
          this.is_animating=false;
        }
        else
        {
          this.y = this.y + 1;
        }

        // this.y changed so change box.y if crane is carrying a box
        if( this.box != "None" )
          this.box.move_to(this.x,this.y);
      }
      else
      {
        this.is_animating=false;
      }
    }

    if(!this.is_animating)
      this.state = "none";

    return( this.is_animating );
  }

// end Crane
}
