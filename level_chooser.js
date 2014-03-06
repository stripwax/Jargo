var CATEGORY_SENTINEL = "--Choose A Difficulty--";
var LEVEL_NAME_SENTINEL = "--Choose A Level--";

function level_categories()
{
  var levels = deepObjCopy(levels_data_all_categories);
  levels.unshift( CATEGORY_SENTINEL );
  return( levels );
}
function level_get_names( category )
{
  names = [ LEVEL_NAME_SENTINEL ];

  for( var i = 0; i < levels_data.length; i++ )
  {
    if( levels_data[ i ].rating === category )
      names.push( levels_data[ i ].title );
  }
  return( names );
}
