(function(){
    var httpRequest = new XMLHttpRequest();
    function p(x){
        document.getElementById('logger').innerHTML+="<li>"+x+"</li>";
    }
    function simple_template_engine(template,data){
        return template.replace(/\#\w+/gi, function(match){
            return data[match.substring(1)]||""
        }) 

    }
    function activate_myauto(user_records){
        function show_selection_with_alert(selected){
            alert(selected)
        }    
        function show_selection(selected){
            var template=document.getElementById('show_user_tempalate').innerHTML;
            var index=usernames.indexOf(selected)
            var data=user_records[index];
            var usercard=simple_template_engine(template,data);
            document.getElementById('usercard').innerHTML=usercard;
        }      
        function calc_usernames(){
            var ans=[];
            for (var i=0;i<user_records.length;i++)
                ans.push(user_records[i].username)
            //p(ans)
            return ans;
        }  
        var usernames=calc_usernames();
        myauto_set('myauto_demo',usernames,show_selection);
    }
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState!=4)
            return;
        var user_records = JSON.parse(httpRequest.responseText) ;;//no var decleration so it it global
        activate_myauto(user_records)

    }
    httpRequest.open('GET','users.json', true);
    httpRequest.send(null);
})()