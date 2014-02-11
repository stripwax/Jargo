// Cmd = one of LEFT, RIGHT, GRAB, F1, F2, F3, F4
// Cond = one of None, Empty, Red, Yellow, Green, Blue, Any

var program = new Array();
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
  if( program.length == 0 )
    default_program();
  program_state = "STOPPED";
}

function default_program()
{
  program = [
    [
	{ Cond:"None", Cmd:"GRAB" },
	{ Cond:"None", Cmd:"RIGHT" },
	{ Cond:"None", Cmd:"RIGHT" },
	{ Cond:"None", Cmd:"GRAB" },
	{ Cond:"None", Cmd:"LEFT" },
	{ Cond:"None", Cmd:"GRAB" },
	{ Cond:"None",Cmd:"LEFT" },
	{ Cond:"None",Cmd:"GRAB" },
	{ Cond:"None",Cmd:"RIGHT" },
	{ Cond:"None",Cmd:"RIGHT" },
	{ Cond:"None",Cmd:"GRAB" },
	{ Cond:"None",Cmd:"LEFT" },
	{ Cond:"None",Cmd:"GRAB" }
    ],
    [],
    [],
    []
  ];
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
