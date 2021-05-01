// This file has functions to create all elements



    //creates all elements
        function p (id, text){
            let para = document.createElement('p');

          if(id)  para.setAttribute('id' , '' + id);
            if(text) para.textContent = text + '';


            return para;
        }

        function h1 (id, text){
            let h = document.createElement('h1');
           if(id) h.setAttribute('id', '' + id);
            if(text) h.textContent = text;
            return h;
        }

        function ul (id){
            let ul = document.createElement('ul');
           if(id) ul.setAttribute('id', '' + id);
            return ul;
        }

        function li (id, text){
            let li1 = document.createElement('li');
           if(id) li1.setAttribute('id', '' + id);
            if(text) li1.textContent = text;
            return li1;
        }

        function a (id, text,href){
            let a = document.createElement('a',);
            if(href) a.href = href;
           if(id) a.setAttribute('id', '' + id);
            if(text) a.textContent = text;
            return a;
        }

        function div(id){
            let div = document.createElement('div');
           if(id) div.setAttribute('id', '' + id);
            return div;
        }
        function img(id,src){
            let img = document.createElement('img');
         if(id)   img.setAttribute('id', ''+ id);
            img.src = src;
            return img;
        }
        function span(id,text){
            let span1 = document.createElement('span');
            if(id) span1.setAttribute('id', ''+ id);
            if(text) span1.textContent = text + '';
            return span1;
        }
        function button(id, type, text){
            let button1 = document.createElement('button');
            if(id) button1.setAttribute('id', '' + id);
            if(type) button1.setAttribute('type', '' + type);
            if(text) button1.textContent = text + "";
            return button1;
        }





        //function that appends elements to elements
        function appendElements(appendor, appendees){
            for(let i = 0; i < appendees.length; i++){
                appendor.appendChild(appendees[i]);
            }

            
        }

        