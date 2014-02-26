// object definition for a box
function Crate( x, y, type, id )
{
  this.x = x;
  this.y = y;
  this.type = type;
  this.id = id;
  this.needs_redrawing = false;

  this.move_to = function(x,y)
  {
    if(this.x != x || this.y != y)
      this.needs_redrawing = true;
    this.x = x;
    this.y = y;
  }
  
  this.getDiv = function()
  {
    child = document.createElement("div");
    child.className = "crate crate"+this.type;
    return(child);
  }
}

