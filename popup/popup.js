function clean_translation(txt)
{
  txt = txt.replace(/\[/g, "");
  txt = txt.replace(/\]/g, "");
  txt = txt.replace(/\"/g, "");
  txt = txt.split(",");
  translation = txt[0]
  if (translation === "null")
  {
    translation = "Please enter a website link to translate!"
  }
  return translation
}

function get_translate_type(){
  var selector = document.getElementById('type');
  var translateType = selector.value;

  return translateType
}

function get_language()
{
  var radios = document.getElementById('language');
  var language = radios.value;


  return language
}

function translate_click() {
  // en=english german=de spanish=es
  var text = document.getElementById('textinput').value;
  var type = get_translate_type();
  var lang = get_language();
  if(type == "translate"){
  let translateNow = browser.windows.create({
    url: `https://translate.google.com/?sl=auto&tl=${lang}&text=${text}&op=${type}`,
    type: "popup",
    });
  translateNow.then(onWindowCreated, onWindowCreatedError);
  }
  else if(type == "websites"){
    let translateNow = browser.windows.create({
      url: `https://translate.google.com/?sl=auto&tl=${lang}&hl=en&u=${text}&client=webapp`,
      type: "popup",
      });
    translateNow.then(onWindowCreated, onWindowCreatedError);
  }
}

function oncreate_addon()
{
  document.getElementById("btn").addEventListener("click", function(){translate_click();});
  document.getElementById("type").addEventListener("change", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      translate_click();
    }
  });
  document.getElementById("language").addEventListener("change", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      translate_click();
    }
  });
}

oncreate_addon()