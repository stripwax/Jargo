// object definition for a box
function Crate( x, y, type, id )
{
  this.x = x;
  this.y = y;
  this.type = type;
  this.id = id;
  
  this.getDiv = function()
  {
    child = document.createElement("div");
    child.className = "crate crate"+this.type;
    return(child);
  }
}

