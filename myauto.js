


function myauto_set(id,selection_array,callback){
    var cur_line=-1;
    var num_items=0;
    var pattern="";
    var selected_item=null;
    var choices=null;
    var input=null;
    function trim(s){ 
      return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
    }   
    function call(item){
        choices.style.display='none';
        callback(item)
    }
    function onkeydown(event){
        console.log(event.keyCode)
        switch(event.keyCode){
            case 40://key down
                if (num_items>cur_line+1){
                    cur_line++;
                    render();
                    input.value=selected_item;
                }
                break;
            case 38://key up
                if (cur_line!=-1){
                    cur_line--;
                    render();
                    input.value=selected_item;
                }
                break;
            case 27://esc
                cur_line=-1;
                render();
                input.value=pattern; //to reset it back
                break;
            case 13://enter
                if (selection_array.indexOf(selected_item)!=-1){
                    call(selected_item);
                }
                break;
        }

    }
    function render(){ //also updates the selectde_item
        num_items=0;
        choices.style.display='none';         
        if (trim(pattern)=="")
            return;
        var html="";
        var re = new RegExp("(" + pattern + ")", "gi");
        var line=0
        for (var i=0;i<selection_array.length;i++){
            var item=selection_array[i];
            if (!item.match(re))
                continue;
            num_items++;
            var the_class="";
            if (cur_line==line){
                the_class="class=cur_line";
                selected_item=item;
            }

            html+='<li '+the_class+'>' +item.replace(re, "<b>$1</b>") + '</li>';
            line++;
        }
        if (html){
            choices.innerHTML=html;
            choices.style.display='block'; 
        }      
        if (cur_line>=num_items)
            cur_line=-1; //do no;t consuse the user  
    }
    input=document.querySelector("#"+id+' input');
    choices=document.querySelector("#"+id+' div');
    input.onkeydown=onkeydown;
    choices.onclick=function(event){
        //alert(event.toElement.innerText)
        var selected=event.target.textContent    
        //var selected=event.srcElement.innerText
        input.value=selected
        call(selected)
    }    
    input.onkeyup=function(event){
        if ([40,38,27,13].indexOf(event.keyCode)!=-1)
            return;
        pattern=input.value;
        render();
    }
}