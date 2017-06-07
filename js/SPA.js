
  window.onhashchange=SwitchToStateFromURLHash;

  var SPAStateH={};

  function SwitchToStateFromURLHash()
  {
    var URLHash=window.location.hash;

    var StateStr=URLHash.substr(1);

    if ( StateStr!="" ) 
    {
      var PartsA=StateStr.split("_")
      SPAStateH={ pagename: PartsA[0] };
    }
    else
      SPAStateH={pagename:'Main'};

    console.log('Новое состояние приложения:');
    console.log(SPAStateH);

    var PageHTML="";
    switch ( SPAStateH.pagename )
    {
      case 'Main':
        PageHTML+='<div id="menu"> \
                    <div id="menuScene"></div>\
                      <div class="text" onclick="start()">Start</div>\
                      <div class="text" onclick="records()"">Records</div>\
                      <div class="text">Controls: Space and arrows</div>\
                  </div>';
        break;
      case 'records':
        PageHTML+='\
        <div id="records" >\
          <div id="recordsName"></div>\
          <div id="recordsScore"></div>\
        </div>';
        break;
      case 'start':
        PageHTML+='\
        <svg id="PP" width=600 height=600 xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"> \
          <rect id="blackfield" x=0 y=0 width=600 height=600 fill=black />\
          <svg id="field" width=600 height=600 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>\
        </svg>\
        <div id="viewTankEmount">Tanks:\
          <div id="enterTankEmount"></div>\
          Scores:\
          <div id="enterScore"></div>\
        </div>\
        ';
        break;
    }
    document.getElementById('wndow').innerHTML=PageHTML;
    if (SPAStateH.pagename==='start') {
      fieldFPS ()
        Start2();
        ClickSound2();
        tankEmount=40;
        Scores=0;
        Level='ok';
        Lrocket()
        GenerateTanks()
        document.getElementById('enterScore').innerHTML=Scores;
      window.onbeforeunload=BefUnload;

      function BefUnload(EO)
      {
        EO=EO||window.event;
          EO.returnValue='Game need refresh';
      };
        document.onmouseover = function() {
          window.innerDocClick = true;
      }

      document.onmouseleave = function() {
          window.innerDocClick = false;
      }

      window.onhashchange = function() {
          if (window.innerDocClick) {
              //Your own in-page mechanism triggered the hash change
          } else {
            alert("Игра требует перезагрузки")
              //Browser back button was clicked
          }
      }

    }
    if (SPAStateH.pagename==='records') { 
       RestoreInfo()
    }
  }

  function SwitchToState(NewStateH)
  {

    var StateStr=NewStateH.pagename;
    location.hash=StateStr;

  }

  function records()
  {
    SwitchToState( { pagename:'records' } );
  }

  function start()
  {
    SwitchToState( { pagename:'start' } );
  }
  SwitchToStateFromURLHash();