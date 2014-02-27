function last_help_screen()
{
  run_last_popup( /*default =*/ hello_screen );
}

function hello_screen()
{
  new_popup(
    "<H1>Hello!</H1>Welcome to your very own crate-stacking warehouse!<br>"+
    "If you've played before, I expect you just want to get stuck right in. But if "+
    "you're new or you'd like a quick refresher course, just click Next Help.<br><br>"+
    "You can always click the HELP button at any time too!",
    [ { text:"Let's play!" }, { text:"Next Help >", func:help_screen_1 } ]
  );
}

function help_screen_1()
{
  new_popup(
    "Ok, let's help you get familiarised with how to run your warehouse!<br>"+
    "On the left over there is a picture of what your warehouse looks like right now.<br>"+
    "There's a robot crane hanging from the ceiling and some wooden crates on the floor.<br><br>"+
    "On the right, at the top here, is a grid of white squares. You use these squares to "+
    "program the robot crane to tidy up the crates!",
    [ { text:"<< Exit Help" }, { text:"Back <", func:hello_screen }, {text:"Next Help >", func:help_screen_2 } ]
  );
}

function help_screen_2()
{
  new_popup(
    "See that picture labelled 'Your Goal:' at the bottom right down there?<br>"+
    "That's what your warehouse should look like. What you need to do is to figure out "+
    "what program to give your robot crane, for it to pick up and move the wooden crates to look like "+
    "that 'Your Goal:' picture. Makes sense so far?",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_1 }, {text:"Next Help >", func:help_screen_3 } ]
  );
}

function help_screen_3()
{
  new_popup(
    "The robot crane can only do a few things. It can go left, it can go right, and it can pick up or drop "+
    "one crate a time. The instruction to go left looks like a arrow pointing left, and the instruction to go "+
    "right looks like an arrow pointing right. The instruction to pick up a crate is the same as the "+
    "instruction to drop a crate, and it looks like an arrow pointing down. So, if the robot crane is holding a crate "+
    "then the down arrow will make it drop it. Otherwise it will make the crane pick up whatever crate is directly under the crane.",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_2 }, {text:"Next Help >", func:help_screen_4 } ]
  );
}

function help_screen_4()
{
  new_popup(
    "Ok, so the robot crane is a bit more powerful than that. It actually has four separate programs, called "+
    "<em>a</em>, <em>b</em>, <em>c</em> and <em>d</em>. You can see those four programs, they are labelled in light blue.<br>"+
    "When you hit the 'Go!' button, the robot crane will always run program <em>a</em>. But you can make one program "+
    "run any other program, even itself. The instructions to do that are simply <em>a</em>, <em>b</em>, <em>c</em> and <em>d</em>. Easy!",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_3 }, {text:"Next Help >", func:help_screen_5 } ]
  );
}

function help_screen_5()
{
  new_popup(
    "Here's where it gets a <em>teeny bit</em> more complicated. Each instruction for the robot crane can also have a "+
    "'choice' attached to it, called a 'conditional'. If you already know coding, think of it like an <code>IF</code> statement. "+
    "You can say 'go left IF the crane is holding a blue crate' or 'perform a grab IF the crane is not holding any crate'.<br>" +
    "Here's all the conditionals:<br>" +
    "<ul><li>Only if holding a Blue crate</li>"+
    "<li>Only if holding a Green crate</li>"+
    "<li>Only if holding a Red crate</li>"+
    "<li>Only if holding a Yellow crate</li>"+
    "<li>Only if holding a crate (of any colour)</li>"+
    "<li>Only if <em>NOT</em> holding a crate</li></ul>",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_4 }, {text:"Next Help >", func:help_screen_6} ]
  );
}

function help_screen_6()
{
  new_popup(
    "<H1>How to program the crane</H1>"+
    "Each program (<em>a</em> to <em>d</em>) is a list of instructions executed in order from left to right. Simply "+
    "click into any white square to set an instruction there. If you click into the top-half of a white square, you set a conditional. "+
    "If you click into the bottom-half of a white square, you set an instruction. Keep clicking to cycle through all the instructions and conditionals.",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_5 }, {text:"Next Help >", func:help_screen_7 } ]
  );
}

function help_screen_7()
{
  new_popup(
    "You're probably itching to play with the crane! So try this: at the top left is a level selector. Choose the 'Demo' "+
    "category, and the level named 'What A Mess!', and click the 'Load Level' button.<br><br>You'll need to exit help to do that. "+
    "Don't worry, I'll still be here when you come back. Don't forget, the giant HELP button is at the top of the screen.",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_6 }, {text:"Next Help >", func:help_screen_8} ]
  );
}

function help_screen_8()
{
  new_popup(
    "Ok, back so soon? If you haven't already done so, press the 'GO!' button to run that program and see what the crane does!<br>"+
    "Don't worry that the program for the crane doesn't actually tidy up the warehouse properly! It's just an example, so just play around with it.<br>"+
    "You'll need to Exit Help to get back to the game, but when you're finished experimenting, just click Help and you'll come straight back here again.", 
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_7 }, {text:"Next Help >", func:help_screen_9} ]
  );
}

function help_screen_9()
{
  new_popup(
    "Super, let's really start doing something now. Choose the level category called 'Tutorial' and pick the first level, "+
    "called Cargo 101. See if you can program the crane to give the Goal result. Get it right and I'll give you a score, and you can move onto the "+
    "next level!<br>"+
    "Here's a tip, if the program doesn't do the right thing and you need to start over, click Restart to put the crates back "+
    "how you found them, ready for you to try again.  And if your want to wipe your program, click Clear Program!",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_8 }, {text:"TELL ME A SECRET!", func:help_screen_10} ]
  );
}

function help_screen_10()
{
  new_popup(
    "<H1>Shhh! Don't tell anyone!</H1>"+
    "You can actually move onto the next level even if you get it wrong. I won't mind one little bit, and I'll still give you a score!",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_9 }, {text:"TELL ME ANOTHER SECRET!", func:help_screen_11} ]
  );
}

function help_screen_11()
{
  new_popup(
    "<H1>Another secret?!</H1>"+
    "Yeah.. about that scoring thing I just mentioned..<br>"+
    "I haven't actually done it yet. I'll get to it tomorrow.",
    [ { text:"<< Exit Help" }, { text:"Back <", func:help_screen_10 }, {text:"TELL ME ANOTHER SECRET!", func:help_screen_12} ]
  );
}

function help_screen_12()
{
  new_popup(
    "That's all the help I have for you!<br>You are on your own now!<br><br>Don't worry, the warehouse isn't "+
    "that dangerous really, and the robot crane is friendly when you get to know her.", 
    [ { text:"Back <", func:help_screen_11 }, { text:"Gee thanks! Well, here goes nothing..."} ]
  );
}

