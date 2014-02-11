function level_categories()
{
  return( levels_data_all_categories );
}
function level_get_names( category )
{
  names = [];
  for( var i = 0; i < levels_data.length; i++ )
  {
    if( levels_data[ i ].rating === category )
      names.push( levels_data[ i ].title );
  }
  return( names );
}
