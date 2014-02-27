var CATEGORY_SENTINEL = "--Pick A Difficulty--";
var LEVEL_NAME_SENTINEL = "--Choose A Level--";

function level_categories()
{
  var levels = levels_data_all_categories.clone();
  levels.unshift( CATEGORY_SENTINEL );
  return( levels );
}
function level_get_names( category )
{
  names = [];
  if( category != CATEGORY_SENTINEL )
    names = [ LEVEL_NAME_SENTINEL ];
  for( var i = 0; i < levels_data.length; i++ )
  {
    if( levels_data[ i ].rating === category )
      names.push( levels_data[ i ].title );
  }
  return( names );
}
