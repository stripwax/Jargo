// Cmd = one of None,LEFT, RIGHT, GRAB, F1, F2, F3, F4
// Cond = one of None, Empty, Red, Yellow, Green, Blue, Any

var CMD_CHOICES=["None","LEFT","RIGHT","GRAB","F1","F2","F3","F4"];
var COND_CHOICES=["None","Empty","Red","Yellow","Green","Blue","Any"];

var COND_TYPE_MAP={Blue:0,Yellow:1,Red:2,Green:3};
var PROG_NAMES_FROM_F_MAP={F1:'A',F2:'B',F3:'C',F4:'D'};

var PROGRAM_MAX_FUNCS = 4;
var PROGRAM_FUNC_SIZE = [8,8,8,5]; // this is cargo bot

// object definition for the Program
function Program()
{
  this.program_data = null;
  this.program_data_lengths = [];
  this.PC = null;
  this.PC_ROW = null;
  this.callstack = [];
  this.execution_state = "STOPPED";
  this.next_PC = null;
  this.next_PC_ROW = null;
  this.do_func_return = false;

  this.reset = function()
  {
    this.PC = 0;
    this.PC_ROW = 0;
    this.next_PC = null;
    this.next_PC_ROW = null;
    this.do_func_return = false;
    this.callstack = [];

    this.execution_state = "STOPPED";
    if(this.program_data==null)
      this.load_from_cookie();

    this.animate();
  }

  this.pause = function()
  {
    this.execution_state = "PAUSED";
  }

  this.clear_interactive = function()
  {
    if(confirm("This will erase the program for the current level\nAre you sure?"))
    {
      this.clear();
    }
  }

  this.clear = function()
  {
    this.program_data = null;
    this.program_has_changed_so_check_and_fix_stuff();
    this.reset();
  }

  this.load_from_cookie = function()
  {
    this.program_data = null;

    var program_string = getCookie("program_"+current_level_category+"_"+current_level_name);
    if(program_string != null)
    {
      this.set_from_string(program_string);
    }
    else
    {
      this.set_from_string("");
    }
  }

  this.program_has_changed_so_check_and_fix_stuff = function()
  {
    if(this.program_data==null)
      this.program_data=[[],[],[],[]];

    for(var i=0;i<4;i++)
      this.program_data[i].length=PROGRAM_FUNC_SIZE[i];
 
    for(var i=0;i<this.program_data.length;i++)
    {
      for(var j=0;j<this.program_data[i].length;j++)
      {
        if(this.program_data[i][j]==null || this.program_data[i][j].Cmd=="None")
          this.program_data[i][j]={Cond:"None",Cmd:"None"};
      }
    }

    this.animate();
  }

  this.save_to_cookie = function()
  {
    if(this.program_data!=null)
      setCookie("program_"+current_level_category+"_"+current_level_name,this.to_string(),null);
  }

  this.to_string = function()
  {
    var string="";
    for(var i=0;i<Math.min(this.program_data.length,PROGRAM_MAX_FUNCS);i++)
    {
      var progfunc=this.program_data[i];
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

  this.set_from_string = function( string )
  {
    var i=0;
    var j=0;
    this.program_data=[ [],[],[],[] ];
    var func_split = string.split(':');
    for(var i=0;i<Math.min(func_split.length,PROGRAM_MAX_FUNCS);i++)
    {
      var progfunc=[];
      var cmd_split = (func_split[i]).split(',');
      for(var j=0;j<Math.min(cmd_split.length,PROGRAM_FUNC_SIZE[i]);j++)
      {
        if(cmd_split[j].length==0)
        {
          progfunc[j]=null;
          continue;
        }
        var cond_cmd=(cmd_split[j]).split('|');
        if(cond_cmd.length < 1 || cond_cmd.length > 2)
        {
          progfunc[j]=null;
          continue;
        }
        if(cond_cmd.length == 1)
        {
          if( -1 == CMD_CHOICES.indexOf(cond_cmd[0]) )
          {
            progfunc[j]=null;
            continue;
          }
          else
          {
            progfunc[j]={Cond : 'None', Cmd : cond_cmd[0]};
          }
        }
        else
        {
          if(-1 == CMD_CHOICES.indexOf(cond_cmd[1]) || -1 == COND_CHOICES.indexOf(cond_cmd[0]))
          {
            progfunc[j]=null;
            continue;
          }
          else
          {
            progfunc[j]={Cond : cond_cmd[0], Cmd : cond_cmd[1] };
          }
        }
      }
      this.program_data[i]=progfunc;
    }

    this.program_has_changed_so_check_and_fix_stuff();
    this.save_to_cookie();
  }

  this.step_pre = function()
  {
    // by definition, each command operates the crane
    // if there is nothing to do, the crane does nothing
    // so, by default, the crane is in a 'do nothing' state unless told otherwise
    // Setting this default here makes the logic simpler below/elsewhere
    crane.state = "none";

    // if we're stepping, we're executing.
    this.execution_state = "EXECUTING";

    // Similarly, we haven't reached the end of the current func,
    // although we may end it in the same instruction (See the end of this func)
    var end_function = false;
    this.next_PC = null;
    this.next_PC_ROW = null;

    var something_to_do = false;

    while( !something_to_do && this.PC_ROW < this.program_data.length && this.PC < this.program_data[ this.PC_ROW ].length )
    {
      var prog = this.program_data[ this.PC_ROW ][ this.PC ];
      var Cond = prog.Cond;
      var Cmd  = prog.Cmd;

      // optimise out empty program command slots 'as if they were not there'
      if( Cmd=="None" )
      {
        this.PC++;
        continue;
      }

      something_to_do = true;

      if( Cond === "None" )
      { 
        match = true;
      }
      else if( Cond === "Empty" )
      {
        match = ( crane.box === "None" );
      }
      else if( Cond === "Any" )
      {
        match = ( crane.box != "None" )
      }
      else if( COND_TYPE_MAP[Cond] === crane.box.type )
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
          crane.state = "going left";
        }
        else if( Cmd === "RIGHT" )
        {
          crane.state = "going right";
        }
        else if( Cmd === "GRAB" )
        {
          crane.state = "grabbing down";
        }
        else if( Cmd === "F1" )
        {
          this.next_PC_ROW = 0;
          this.next_PC = 0;
        }
        else if( Cmd === "F2" )
        {
          this.next_PC_ROW = 1;
          this.next_PC = 0;
        }
        else if( Cmd === "F3" )
        {
          this.next_PC_ROW = 2;
          this.next_PC = 0;
        }
        else if( Cmd === "F4" )
        {
          this.next_PC_ROW = 3;
          this.next_PC = 0;
        }
      }
    }

    // when we get here, we either have something to do, or we reached the end of the routine
    // Update our state accordingly.
    if( !something_to_do )
    {
      this.do_func_return = true;
    }
  }

  this.step_post = function()
  {
    if( this.do_func_return )
    {
      if( this.callstack.length > 0 )
      {
        // pop
        var pop = this.callstack.pop();
        this.PC = pop.PC;
        this.PC_ROW = pop.PC_ROW;
        this.do_func_return = false;
      }
      else
      {
        this.execution_state = "STOPPED";
        game_stop();
      }
    }
    else
    {
      if( this.next_PC == null )
      {
        this.PC = this.PC + 1;
      }
      else
      {
        // stack and push our return address. return address is 'one after' where we are right now (hence the +1 below)
        var return_address = {PC_ROW:this.PC_ROW, PC:this.PC+1};
        this.callstack.push(deepObjCopy(return_address));

        // then 'jump'
        this.PC = this.next_PC;
        this.PC_ROW = this.next_PC_ROW;
        this.next_PC = null;
        this.next_PC_ROW = null;
      }
    }
  }

  this.animate = function()
  {
    var x = document.getElementById("program");
    var text = "HERE IS THE PROGRAM TO OPERATE THE CRANE:<br>";
    text += '<div class="prog_container"><table class="prog_table" width="100%">';
    for( var i = 0; i < this.program_data.length; i++ )
    {
      text += '<tr>';
      text += '<td class="prog_name prog_name_F' +(i+1)+ '">&nbsp;</td>';
      for( var j = 0; j < this.program_data[ i ].length; j++ )
      {
        var prog = this.program_data[i][j];
        var Cmd = prog.Cmd;
        var Cond = prog.Cond;

        var div_class_extra = "";
        if( j == this.PC && i == this.PC_ROW )
        {
          if( this.execution_state == "EXECUTING" )
          {
            div_class_extra = "prog_cmd_slot_executing";
          }
          else
          {
            div_class_extra = "prog_cmd_slot_next";
          }
        }
        else if( j == this.PC - 1 && this.PC == this.program_data[ i ].length && i == this.PC_ROW )
        {
          div_class_extra = "prog_cmd_slot_last";
        }

        text += '<td class="prog_cmd_slot '+div_class_extra+'">';
        text += '<table class="prog_cmd_slot_inner_table"><tr><td class="prog_cond prog_cond_'+Cond+'" id="COND_CELL_'+i+'_'+j+'" onclick="program_condition_cell_click('+i+','+j+');">';
        text += '&nbsp;</td></tr>' // close cond

        text += '<tr><td class="prog_cmd prog_cmd_'+Cmd+'" id="PROG_CELL_'+i+'_'+j+'" onclick="program_command_cell_click('+i+','+j+');">';
        text += "&nbsp;</td></tr></table>";

        text += '</td>';
      }
      text += "</tr>";
    }
    text += "</table></div>";

    x.innerHTML = text;
  }

  this.get_instruction_count = function()
  {
    var pcount = 0;
    for(var i=0;i<this.program_data.length;i++)
    {
      for(var j=0;j<this.program_data[i].length;j++)
      {
        if(this.program_data[i][j].Cmd != "None" )
          pcount++;
      }
    }
    return(pcount);
  }
}
