// Cmd = one of None,LEFT, RIGHT, GRAB, F1, F2, F3, F4
// Cond = one of None, Empty, Red, Yellow, Green, Blue, Any

var CMD_CHOICES=["None","LEFT","RIGHT","GRAB","F1","F2","F3","F4"];
var COND_CHOICES=["None","Empty","Red","Yellow","Green","Blue","Any"];

var COND_TYPE_MAP={Blue:0,Yellow:1,Red:2,Green:3};
var PROG_NAMES_FROM_F_MAP={F1:'A',F2:'B',F3:'C',F4:'D'};

var PROGRAM_MAX_FUNCS = 4;
var PROGRAM_FUNC_SIZE = [8,8,8,5]; // this is cargo bot

var program = null;
var callstack = new Array();
var PC = 0;
var PC_ROW = 0;
var program_state = "STOPPED";

var next_PC = null;
var next_PC_ROW = null;
var do_func_return = false;

function reset_program()
{
  PC = 0;
  PC_ROW = 0;
  next_PC = null;
  next_PC_ROW = null;
  do_func_return = false;
  callstack = [];

  program_state = "STOPPED";
  if(program==null)
    program_load_from_cookie();

  animate_program();
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

  animate_program();
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
        string += progfunc[j].Cond+"|"+progfunc[j].Cmd+","; 
      }
    }
    string += ":";
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

  // if we're stepping, we're executing.
  program_state = "EXECUTING";

  // Similarly, we haven't reached the end of the current func,
  // although we may end it in the same instruction (See the end of this func)
  end_function = false;
  next_PC = null;
  next_PC_ROW = null;

  var something_to_do = false;

  while( !something_to_do && PC_ROW < program.length && PC < program[ PC_ROW ].length )
  {
    var Cond = program[ PC_ROW ][ PC ].Cond;
    var Cmd  = program[ PC_ROW ][ PC ].Cmd;

    // optimise out empty program command slots 'as if they were not there'
    if( Cmd=="None" )
    {
      PC++;
      continue;
    }

    something_to_do = true;

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
    else if( COND_TYPE_MAP[Cond] === crane_box.type )
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

  // when we get here, we either have something to do, or we reached the end of the routine
  // Update our state accordingly.
  if( !something_to_do )
  {
    do_func_return = true;
  }
}

function program_step_post()
{
  if( do_func_return )
  {
    if( callstack.length > 0 )
    {
      // pop
      pop = callstack.pop();
      PC = pop.PC;
      PC_ROW = pop.PC_ROW;
      do_func_return = false;
    }
    else
    {
      program_state = "STOPPED";
      game_stop();
    }
  }
  else
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
    }
  }
}

function animate_program()
{
  var x = document.getElementById("program");
  var text = "HERE IS THE PROGRAM TO OPERATE THE CRANE:<br>";
  text += '<div class="prog_container"><table class="prog_table" width="100%">';
  for( var i = 0; i < program.length; i++ )
  {
    text += '<tr>';
    text += '<td class="prog_name">' + PROG_NAMES_FROM_F_MAP["F"+(i+1)] + ":</td>";
    for( var j = 0; j < program[ i ].length; j++ )
    {
      var Cmd = program[i][j].Cmd;
      var Cond = program[i][j].Cond;

      var div_class_extra = "";
      if( j == PC && i == PC_ROW )
      {
        if( program_state == "EXECUTING" )
        {
          div_class_extra = "prog_cmd_slot_executing";
        }
        else
        {
          div_class_extra = "prog_cmd_slot_next";
        }
      }
      else if( j == PC - 1 && PC == program[ i ].length && i == PC_ROW )
      {
        div_class_extra = "prog_cmd_slot_last";
      }

      text += '<td class="prog_cmd_slot '+div_class_extra+'">';
      text += '<div class="prog_cond prog_cond_'+Cond+'" id="COND_CELL_'+i+'_'+j+'" onclick="program_condition_cell_click('+i+','+j+');">';
      text += '&nbsp;</div>'; // close cond

      text += '<div class="prog_cmd prog_cmd_'+Cmd+'" id="PROG_CELL_'+i+'_'+j+'" onclick="program_command_cell_click('+i+','+j+');">';
      if( Cmd != "None" && Cmd != "LEFT" && Cmd != "RIGHT" && Cmd != "GRAB" )
      {
        text += "<span>"+PROG_NAMES_FROM_F_MAP[Cmd]+"</span>";
      }
      else
      {
        // anything so long as it's not empty actually
        text += "<span>&nbsp;</span>";
      }

      text += '</div>'; // close cmd
      text += '</td>';
    }
    text += "</tr></div>";
  }
  text += "</table></div>";

  x.innerHTML = text;
}
