var popup_buttons = null;

function popup_click_button(buttonid)
{
  popup_dismiss();
  if(popup_buttons != null && buttonid<popup_buttons.length && popup_buttons[buttonid].func != undefined )
    (popup_buttons[buttonid].func)();
}

function popup_dismiss()
{
  var popup = document.getElementById("popup");
  var page_mask = document.getElementById("page_mask");
  if(popup != undefined)
  {
    popup.hidden=true;
  }
  page_mask.hidden=true;
}

function new_popup(content,buttons)
{
  var page_mask = document.getElementById("page_mask");
  page_mask.hidden=false;

  var popup = document.getElementById("popup");
  if(popup == undefined)
  {
    popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup_style popup_hello";

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(popup);
  }

  popup.innerHTML = content + "<br>";

  // add an OK button to dismiss (or chain to the next popup).
  // do this after setting content; because setting innerHTML replaces all the inner html!
  if(buttons==null||buttons==undefined||buttons.length<1)
  {
    //default button is just an OK button that merely dismisses the popup and calls no callback
    buttons=[ {text:"OK!"} ];
  }
  popup_buttons = buttons;
  for(var i=0;i<buttons.length;i++)
  {
    var popup_button = document.createElement("button");
    popup_button.className = "popup_style popup_button";
    popup_button.id = "popup_ok_button";
    popup_button.innerHTML = buttons[i].text;
    popup_button.addEventListener('click',(function(x){return(function(){popup_click_button(x);})})(i) );
    popup.appendChild(popup_button);
  }

  popup.hidden = false;
}
