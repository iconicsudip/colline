if(window.location.hostname != "www.youtube.com" && window.location.hostname != "www.facebook.com" && window.location.hostname != "www.google.com" ){
    var count;
    var val;
    if(window.localStorage.getItem(window.location.href.toString())==null || window.localStorage.getItem(window.location.href.toString())==""){
        window.localStorage.removeItem(window.location.href.toString());
        val=[];
    }else{
        val=window.localStorage.getItem(window.location.href.toString());
    }
    if(window.localStorage.getItem(window.location.href.toString())!=null ){
        var s = window.localStorage.getItem(window.location.href.toString()).split(" /");
        for(var i=0;i<s.length;i++){
            try {
                const p = JSON.parse(s[i]);
                set_temp(p,p.id);
            } catch (error) {
                continue;
            }
        }
    }
    setInterval(mainfunc, 1000);
    function mainfunc() {
        var start = window.getSelection().baseOffset;
        var end= window.getSelection().focusOffset;
        if(end-start!=0){
            var parent = window.getSelection().baseNode.parentNode.localName.toString();
            $(document).ready(function(){
                $(parent).mouseup(function(){
                    $(this).after(setcode(parent,window.getSelection().toString()));
                });
            });
        }
    }
    var lines = document.getElementById("show_lines");
    function setcode(parent,string){
        var size = document.querySelectorAll(parent).length;
        var pos=-1;
        for(var i=0;i<size;i++){
            var st =  document.querySelectorAll(parent)[i].innerText.toString();
            if(st.includes(string)){
                pos=i;
                break;
            }
        }
        var default_color = "rgb(250, 213, 5)";
        var default_shadow = "#eded1f";
        var lid;
        if(window.localStorage.getItem(window.location.href.toString())==null){
            lid = 0;
        }else{
            var s=window.localStorage.getItem(window.location.href.toString()).split(" /");
            lid = JSON.parse(s[s.length-2]).id+1;
        }
        let start_code = `<colline id="${lid}"  style="background-color:${default_color};cursor:pointer;user-select:none">`;
        let end_code = `</colline><coloption id="options${lid}" style="position: absolute;padding: 4px;background: rgb(186, 191, 196);border-radius: 6px;margin-top: -30px;margin-left:-9.5rem;font-size: 10px;text-align: center;display: none;font-weight: 500;width: 12rem;z-index:99;user-select:none;"><coldel  style="display: grid;
        height: 1.5rem;
        text-align: center;
        border-radius: 50px;
        align-items: center;
        width: 100%;"><div id="del${lid}" style="background-color: red;
        border-radius: 50px;
        text-align: center;
        margin: auto;
        height: 1.5rem;
        grid-row: 2 / span 1;
        grid-column: 4;
        width: 2rem;cursor:pointer"><svg style="height:1rem;margin:auto;margin-top:3px;margin-bottom:3px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></div><div style="grid-column: 1 / span 2;
        grid-row: 2;border:1px solid black;width:9rem;border-radius: 13px;background-color: black;"><div style="
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        gap: 5px;user-select:none;
    ">
            <span class="pcolor" style="
        background-color: rgb(250, 213, 5);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(145, 242, 27);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(252, 73, 3);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(0, 123, 255);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(237, 2, 198);
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
        </div></div></coldel></coloption>`;
        var addcode = "";
        if(string.length!=0){
            addcode = start_code + string + end_code;
            create_highlight(lid,string,default_color,default_shadow,parent,pos);
            document.querySelectorAll(parent)[pos].innerHTML=document.querySelectorAll(parent)[pos].innerHTML.replace(string,addcode);
        }
    }
    function create_highlight(id,string,color,scolor,parent,pos){
        var notehl={id:id,string:string,color:color,scolor:scolor,parent:parent,pos:pos};
        var val2 = JSON.stringify(notehl)+" /";
        val=val + val2;
        window.localStorage.setItem(window.location.href.toString(),val.toString());
    }
    function set_temp(p,count){
        var color = p.color;
        var str = p.string;
        var pos = p.pos;
        var parent  = p.parent;
        let start_code = `<colline id="${count}" style="background-color:${color};cursor:pointer;user-select:none">`;
        let end_code = `</colline><coloption id="options${count}" style="position: absolute;padding: 4px;background: rgb(186, 191, 196);border-radius: 6px;margin-top: -30px;margin-left:-9.5rem;font-size: 10px;text-align: center;display: none;font-weight: 500;width: 12rem;z-index:99;user-select:none;"><coldel style="display: grid;
        height: 1.5rem;
        text-align: center;
        border-radius: 50px;
        align-items: center;
        width: 100%;"><div id="del${count}" style="background-color: red;
        border-radius: 50px;
        text-align: center;
        margin: auto;
        height: 1.5rem;
        grid-row: 2 / span 1;
        grid-column: 4;
        width: 2rem;cursor:pointer"><svg style="height:1rem;margin:auto;margin-top:3px;margin-bottom:3px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></div><div style="grid-column: 1 / span 2;
        grid-row: 2;border:1px solid black;width:9rem;border-radius: 13px;background-color: black;"><div style="
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        gap: 5px;user-select:none;
    ">
            <span class="pcolor" style="
        background-color: rgb(250, 213, 5);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color:rgb(145, 242, 27);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(252, 73, 3);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(0, 123, 255);
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
            <span class="pcolor" style="
        background-color: rgb(237, 2, 198);
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 50px;
        cursor:pointer;
    "></span>
        </div></div></coldel></coloption>`;
        var addcode = start_code + str + end_code;
        document.querySelectorAll(parent)[pos].innerHTML = document.querySelectorAll(parent)[pos].innerHTML.replace(str,addcode);
    }
    /* =======================================================  Delete from localstorage and hover ==========================================*/
    
    setInterval(get_id,1000);
    function get_id(){
        let sel_highlight = document.getElementsByTagName('colline');
        for(var i=0;i<sel_highlight.length;i++){
            sel_highlight[i].addEventListener("click",select);
        }
    }
    function select(){
        var s = window.localStorage.getItem(window.location.href.toString()).split(" /");
        for(var i=0;i<s.length;i++){
            try {
                const p = JSON.parse(s[i]);
                if(this.id == p.id.toString() ){
                    remove_pen(this.id,p.color,p.scolor);
                }
            } catch (error) {
                continue;
            }
        }
    }
    function remove_pen(id,color,scolor){
        if(document.getElementById(id).classList.contains("active1") === false){
            document.getElementById("options"+id).style.display = "initial";
            hov_del(id)
            document.getElementById(id).classList.add("active1");
            document.getElementById(id).style.backgroundColor = scolor;
        }else{
            document.getElementById(id).classList.remove("active1");
            document.getElementById("options"+id).style.display = "none";
            document.getElementById(id).style.backgroundColor = color;
        }
    }
    function hov_del(id){
        document.getElementById("del"+id).addEventListener("click", delhighlight);
        let pcolor = document.getElementsByClassName("pcolor");
        for(var i = 0;i<pcolor.length;i++){
            pcolor[i].addEventListener("click",pickcol);
        }
    }
    function pickcol(){
        var id = this.offsetParent.id.split("options")[1];
        var col = this.style.backgroundColor;
        console.log(col);
        switch(col){
            case "rgb(250, 213, 5)":
                var scolor = "#eded1f";
                document.getElementById(id).style.backgroundColor = scolor;
                setcol(col,scolor,id);
                break;
            case "rgb(145, 242, 27)":
                var scolor = "#87ef22";
                document.getElementById(id).style.backgroundColor = scolor;
                setcol(col,scolor,id);
                break;
            case "rgb(252, 73, 3)":
                var scolor = "#e19f24";
                document.getElementById(id).style.backgroundColor = scolor;
                setcol(col,scolor,id);
                break;
            case "rgb(0, 123, 255)":
                var scolor = "#668bcd";
                document.getElementById(id).style.backgroundColor = scolor;
                setcol(col,scolor,id);
                break;
            case "rgb(237, 2, 198)":
                var scolor = "#e72f93";
                document.getElementById(id).style.backgroundColor = scolor;
                setcol(col,scolor,id);
                break;
        }
    }
    function setcol(color,scolor,id){
        var s = window.localStorage.getItem(window.location.href.toString()).split(" /");
        for(var i=0;i<s.length;i++){
            try {
                const p = JSON.parse(s[i]);
                if(id == p.id.toString() ){
                    p.color = color;
                    p.scolor = scolor;
                    save_col(p,id);
                    break;
                }
            } catch (error) {
                continue;
            }
        }
    }
    function save_col(sp,id){
        var s = window.localStorage.getItem(window.location.href.toString()).split(" /");
        var final="";
        for(var i=0;i<s.length;i++){
            try {
                const p = JSON.parse(s[i]);
                console.log()
                if(id == p.id.toString() ){
                    final = final + JSON.stringify(sp) + " /";
                    continue;
                }else{
                    final = final + JSON.stringify(p) + " /";
                }
            } catch (error) {
                continue;
            }
        }
        window.localStorage.setItem(window.location.href.toString(),final);
    }
    function delhighlight(){
        console.log(this.id)
        var s = window.localStorage.getItem(window.location.href.toString()).split(" /");
        for(var i=0;i<s.length;i++){
            try {
                const p = JSON.parse(s[i]);
                if(this.id.split("del")[1] == p.id){
                    document.getElementById(p.id).replaceWith(p["string"]);
                    s.splice(i,1);
                    document.getElementById("options"+this.id.split("del")[1]).remove();
                    break;
                }
            } catch (error) {
                continue;
            }
        }
        var v = [];
        for(var i=0;i<s.length;i++){
            try {
                const p = JSON.parse(s[i]);
                var notehl={id:p.id,string:p.string,color:p.color,parent:p.parent,pos:p.pos};
                var val2 = JSON.stringify(notehl)+" /";
                v=v+ val2;
            } catch (error) {
                continue;
            }
        }
        if(window.localStorage.getItem(window.location.href.toString())==null || window.localStorage.getItem(window.location.href.toString())==""){
            window.localStorage.removeItem(window.location.href.toString());
            val=[];
        }else{
            window.localStorage.setItem(window.location.href.toString(),v.toString()); 
            if(v.toString()==""){
                window.localStorage.removeItem(window.location.href.toString());
                val=[];
            }else{
                val=window.localStorage.getItem(window.location.href.toString());
            }
        }
    }
}
