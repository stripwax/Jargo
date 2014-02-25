function program_command_cell_click(i,j)
{
  var c = document.getElementById("PROG_CELL_"+i+"_"+j);
  var cmd = program.program_data[i][j];
  for(var x=0;x<CMD_CHOICES.length;x++)
  {
    if(CMD_CHOICES[x] == cmd.Cmd)
    {
      var y = (x+1) % CMD_CHOICES.length;
      cmd.Cmd = CMD_CHOICES[y];
      break;
    }
  }

  if(cmd.Cmd == "None")
    cmd.Cond = "None";

  program.animate();

  program.save_to_cookie();

  return(false);
}

function program_condition_cell_click(i,j)
{
  var c = document.getElementById("COND_CELL_"+i+"_"+j);
  var cmd = program.program_data[i][j];

  // can't set a conditional if no command..
  // I mean, I could let you do it, but it's redundant and confusing!
  if(cmd.Cmd == "None" )
    return;

  for(var x=0;x<COND_CHOICES.length;x++)
  {
    if(COND_CHOICES[x] == cmd.Cond)
    {
      var y = (x+1) % COND_CHOICES.length;
      cmd.Cond = COND_CHOICES[y];
      break;
    }
  }
  program.animate();

  program.save_to_cookie();

  return(false);
}

function drop()
{
}

function drag()
{
}

