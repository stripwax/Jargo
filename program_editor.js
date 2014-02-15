function program_cell_click(i,j)
{
  var c = document.getElementById("PROG_CELL_"+i+"_"+j);
  var cmd = program[i][j];
  for(var x=0;x<CMD_CHOICES.length;x++)
  {
    if(CMD_CHOICES[x] == cmd.Cmd)
    {
      var y = (x+1) % CMD_CHOICES.length;
      cmd.Cmd = CMD_CHOICES[y];
      break;
    }
  }
  cmd.Cond = "None";
  program[i][j]=cmd;
  animate_program();
}

function drop()
{
}

function drag()
{
}

