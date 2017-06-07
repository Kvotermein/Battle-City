    var AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
    var UpdatePassword;
    var StringName='NIKITYUK_TANKS_RECORDS';
    var update;
    var Anon='Anonim'
    var InfoH=[];
    function RestoreInfo() 
    {
        $.ajax(
            {
                url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : StringName },
                success : ReadReady, error : ErrorHandler
            }
        );
    }
    
    function ReadReady(ResultH)
    {
        if ( ResultH.error!=undefined )
            alert(ResultH.error); 
        else if ( ResultH.result!="" )
        {
            var strName='';
                strScore='';
                InfoH=JSON.parse(ResultH.result);
                function compareScores(A,B) {
                    return B.score-A.score;
                }
                InfoH.sort(compareScores);
             function getFrom(V,I,A) {
               strName+=V.name+"<br />";
               strScore+=V.score+"<br />";
             }
              InfoH.forEach(getFrom)
              document.getElementById('recordsName').innerHTML=strName;
              document.getElementById('recordsScore').innerHTML=strScore;
        }
    }
    // RestoreInfo()
    function StoreInfo() 
    {
        UpdatePassword=Math.random();
        $.ajax(
            {
                url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : StringName, p : UpdatePassword },
                success : LockGetReady, error : ErrorHandler
            }
        );
    }
    function LockGetReady(ResultH) 
    {
        if ( ResultH.error!=undefined )
            alert(ResultH.error); 
        else
        {
            // нам всё равно, что было прочитано - 
            // всё равно перезаписываем
            var InfoA=
            {
                name : update,
                score : Scores
            }
            InfoH.push(InfoA)
            $.ajax(
                {
                    url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : StringName, v : JSON.stringify(InfoH), p : UpdatePassword },
                    success : UpdateReady, error : ErrorHandler
                }
            );
        }
    }
    
    function UpdateReady(ResultH) 
    {
        if ( ResultH.error!=undefined )
            alert(ResultH.error); 
    }
    
    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }