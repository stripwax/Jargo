function hello_screen()
{
  new_popup(
	"<H1>Hello!</H1>Welcome to your very own crate-stacking warehouse!<br>"+
        "If you've played before, I expect you just want to get stuck right in. But if "+
	"you're new or you'd like a quick refresher course, just click Next Help.<br><br>"+
        "You can always click the HELP button at any time too!",
        [ { text:"Let's play!" }, { text:"Next Help >", func:help_screen } ]
  )
}

function help_screen()
{
  new_popup( "Not done yet   :-(" );
}

