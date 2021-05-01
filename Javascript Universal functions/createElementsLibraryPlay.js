export {EasyElement as elements};

    class EasyElement{
        constructor(){

        }
            //creates all elements
            p (id, text){
                let para = document.createElement('p');
    
              if(id)  para.setAttribute('id' , '' + id);
                if(text) para.textContent = text + '';

                return para;
            }
    
            h1 (id, text){
                let h = document.createElement('h1');
               if(id) h.setAttribute('id', '' + id);
                if(text) h.textContent = text;
                return h;
            }
    
            ul (id){
                let ul = document.createElement('ul');
               if(id) ul.setAttribute('id', '' + id);
                return ul;
            }
    
            li (id, text){
                let li1 = document.createElement('li');
               if(id) li1.setAttribute('id', '' + id);
                if(text) li1.textContent = text;
                return li1;
            }
    
            a (id, text,href){
                let a = document.createElement('a',);
                if(href) a.href = href;
               if(id) a.setAttribute('id', '' + id);
                if(text) a.textContent = text;
                return a;
            }
    
            div(id){
                let div = document.createElement('div');
               if(id) div.setAttribute('id', '' + id);
                return div;
            }
            img(id,src){
                let img = document.createElement('img');
             if(id)   img.setAttribute('id', ''+ id);
                img.src = src;
                return img;
            }
            span(id,text){
                let span1 = document.createElement('span');
                if(id) span1.setAttribute('id', ''+ id);
                if(text) span1.textContent = text + '';
                return span1;
            }
            button(id, type, text){
                let button1 = document.createElement('button');
                if(id) button1.setAttribute('id', '' + id);
                if(type) button1.setAttribute('type', '' + type);
                if(text) button1.textContent = text + "";
                return button1;
            }
            //function that appends elements to elements
             appendElements(appendor, appendees){
                for(let i = 0; i < appendees.length; i++){
                    appendor.appendChild(appendees[i]);
                }
            }
    }


        