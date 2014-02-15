// Cmd = one of LEFT, RIGHT, GRAB, F1, F2, F3, F4
// Cond = one of None, Empty, Red, Yellow, Green, Blue, Any

var PROGRAM_MAX_FUNCS = 4;
var PROGRAM_FUNC_SIZE = [8,8,8,5]; // this is cargo bot

var program = null;
var callstack = new Array();
var PC = 0;
var PC_ROW = 0;
var program_state = "STOPPED";

var next_PC = null;
var next_PC_ROW = null;

function reset_program()
{
  PC = 0;
  PC_ROW = 0;
  callstack = new Array();
  program_state = "STOPPED";
  if(program==null)
    program_load_from_cookie();
}

function program_load_from_cookie()
{
  program = null;

  program_string = getCookie("program_"+current_level_category+"_"+current_level_name);
  if(program_string != null)
    program_from_string(program_string);

  if(program==null)
    program=[[],[],[],[]];

  for(var i=0;i<3;i++)
    program[i].length=8;
  program[3].length=5;
 
  for(var i=0;i<program.length;i++)
  {
    for(var j=0;j<program[i].length;j++)
    {
      if(program[i][j]==null)
        program[i][j]={Cond:"None",Cmd:"None"};
    }
  }
}

function program_save_to_cookie()
{
  if(program!=null)
    setCookie("program_"+current_level_category+"_"+current_level_name,program_to_string(),null);
}

function program_to_string()
{
  string="";
  for(var i=0;i<Math.min(program.length,PROGRAM_MAX_FUNCS);i++)
  {
    progfunc=program[i];
    for(var j=0;j<Math.min(progfunc.length,PROGRAM_FUNC_SIZE[i]);j++)
    {
      if(progfunc[j]==null)
      {
        string += ","
      }
      else
      {
        string += "{"+progfunc[j].Cond+"|"+progfunc[j].Cmd+"},"; 
      }
      string += ":";
    }
  }
  return(string);
}

function program_from_string( string )
{
  var i=0;
  var j=0;
  program=[ [],[],[],[] ];
  var func_split = string.split(':');
  for(var i=0;i<Math.min(func_split.length,PROGRAM_MAX_FUNCS);i++)
  {
    progfunc=[];
    var cmd_split = (func_split[i]).split(',');
    for(var j=0;j<Math.min(cmd_split.length,PROGRAM_FUNC_SIZE[i]);j++)
    {
      if(cmd_split[j].length==0)
      {
        progfunc[j]=null;
        continue;
      }
      var cond_cmd=(cmd_split[j]).split('|');
      if(cond_cmd.length != 2)
      {
        progfunc[j]=null;
        continue;
      }
      progfunc[j]={Cond : cond_cmd[0], Cmd : cond_cmd[1] };
    }
    program[i]=progfunc;
  }
}

function program_step_pre()
{
  // by definition, each command operates the crane
  // if there is nothing to do, the crane does nothing
  // so, by default, the crane is in a 'do nothing' state unless told otherwise
  // Setting this default here makes the logic simpler below/elsewhere

  crane_state = "none";
  program_state = "EXECUTING";
  next_PC = null;
  next_PC_ROW = null;

  if( PC_ROW >= program.length || PC >= program[ PC_ROW ].length )
  {
    if( callstack.length > 0 )
    {
      // pop
      pop = callstack.pop();
      next_PC = pop.PC;
      next_PC_ROW = pop.PC_ROW;
    }
    else
    {
      program_state = "STOPPED";
      game_stop();
    }
  }
  else
  {
    Cond = program[ PC_ROW ][ PC ].Cond;
    Cmd  = program[ PC_ROW ][ PC ].Cmd;

    if( Cond === "None" )
    { 
      match = true;
    }
    else if( Cond === "Empty" && crane_box === "None" )
    {
      match = true;
    }
    else if( Cond === "Any" && crane_box != "None" )
    {
      match = true;
    }
    else if( Cond === crane_box )
    {
      match = true;
    }
    else
    { 
      match = false;
    }

    if( match )
    {
      if( Cmd === "LEFT" )
      {
        crane_state = "going left";
      }
      else if( Cmd === "RIGHT" )
      {
        crane_state = "going right";
      }
      else if( Cmd === "GRAB" )
      {
        crane_state = "grabbing down";
      }
      else if( Cmd === "F1" )
      {
        next_PC_ROW = 0;
        next_PC = 0;
      }
      else if( Cmd === "F2" )
      {
        next_PC_ROW = 1;
        next_PC = 0;
      }
      else if( Cmd === "F3" )
      {
        next_PC_ROW = 2;
        next_PC = 0;
      }
      else if( Cmd === "F4" )
      {
        next_PC_ROW = 3;
        next_PC = 0;
      }
    }
  }
}

function program_step_post()
{
  if( next_PC == null )
  {
    PC = PC + 1;
  }
  else
  {
    // stack and push our return address
    return_address = {PC_ROW:PC_ROW, PC:PC+1};
    callstack.push(return_address.clone());

    // then 'jump'
    PC = next_PC;
    PC_ROW = next_PC_ROW;
    next_PC = null;
    next_PC_ROW = null;
  };
}
function animate_program()
{
  var x = document.getElementById("program");
  var text = "HERE IS THE PROGRAM TO OPERATE THE CRANE:<br>";
  for( var i = 0; i < program.length; i++ )
  {
    text = text + "F" + (i+1) + ": ";
    for( var j = 0; j < program[ i ].length; j++ )
    {
      var Cmd = program[i][j].Cmd;
      var Cond = program[i][j].Cond;
 
      if( j == PC && i == PC_ROW )
      {
        if( program_state == "EXECUTING" )
        {
          text = text + "[";
        }
        else
        {
          text = text + ">";
        }
      }

      if( Cond != "None" )
        text = text + "if " + Cond + ", ";
      text = text + Cmd;

      if( j == PC && i == PC_ROW && program_state == "EXECUTING" )
      {
        text = text + "]";
      }
      
      text = text + "  ,  ";
    }
    if( j == PC && i == PC_ROW ) // this is one past the end of the program length for this row, i.e. the value of j AFTER the above for loop
      text = text + "||";

    text = text + "<br>";
  }
  
  x.innerHTML = text;
}
