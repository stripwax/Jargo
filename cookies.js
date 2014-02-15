function cookie_escape(string)
{
  // escape out escape character in key:
  var escaped = string.replace(/_/g," _ ");
  // escape out equals signs:
  escaped = escaped.replace(/=/g," __ =");
  // escape out semicolons:
  escaped = escaped.replace(/;/," ___ ");
  return(escaped);
};

function cookie_unescape(string)
{
  // just the reverse of the above
  var unescaped = string.replace(/ ___ /g,";");
  unescaped = unescaped.replace(/ __ /g,"=");
  unescaped = unescaped.replace(/ _ /g,"_");
  return(unescaped);
}

function setCookie(key, value)
{
  key = cookie_escape(key);
  value = cookie_escape(value);
  document.cookie = key + "=" + value;
}

// based on w3schools example
function getCookie(key)
{
  var name=cookie_escape(key)+"=";
  var split = document.cookie.split(";");
  for(var i=0;i<split.length;i++)
  {
    var c = split[i].trim();
    if(c.indexOf(name) == 0)
      return(cookie_unescape(c.substring(name.length,c.length)));
  }
}
