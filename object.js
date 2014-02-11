// http://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript

Object.prototype.clone = function()
{
  var newObj = (this instanceof Array) ? [] : {};
  for( i in this )
  {
    if( i == "clone" ) continue;
    if( this[ i ] && typeof( this[ i ] ) == "object" )
    {
      newObj[ i ] = this[ i ].clone();
    }
    else
    {
      newObj[ i ] = this[ i ];
    }
  }
  return newObj;
}
