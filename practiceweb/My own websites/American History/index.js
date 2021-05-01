
var revyear = new Date(1775, 03,19,0,0,0);
var buildingyear = new Date(1787, 08, 17, 0, 0,0);
var civilyear = new Date(1861, 03, 12 ,0,0,0);
var immigrationyear = new Date(1880, 11, 30,0,0,0);
var ww1year = new Date(1914, 06, 28,0,0,0);
var greatyear = new Date(1929, 07, 30,0,0,0);

// Revolutionary War

var cyear = new Date();
 text = yearTime(revyear);

var revol = document.getElementById('rev');
var revmsg = text; 
revol.innerHTML = '<button class="hello">' + revmsg + '</button>';



var building = document.getElementById('building');
    building.innerHTML = '<button class="hello">' + yearTime(buildingyear) + '</button>';

    constitution = document.getElementById('constitution');
    constitutionhtml = document.getElementById('constitution').innerHTML;
    conmsg = constitutionhtml;
    conmsg += '<p>The Constitution of the United States established America\'s national government and fundamental laws, and guaranteed certain basic rights for its citizens. It was signed on September 17, 1787, by delegates to the Constitutional Convention in Philadelphia.</p>'
    constitution.innerHTML = conmsg;


//Functions
// prints time in years how long ago it was
function yearTime(year) {
  var fin = cyear.getFullYear() - year.getFullYear();
  return fin + ' Years Ago';
} 
function slideinYear(year) {
  var fin = cyear.getFullYear() - year.getFullYear();
  return fin;
}

function monthTime(year) {
  var fin = cyear.getMonth() - year.getMonth();
  return fin;
}

function dayTime(year) {
  var fin = Math.abs(cyear.getDay() - year.getDay());
  return fin;
}
function hourTime(year) {
  var fin = cyear.getHours() - year.getHours();
  return fin;
}


// article for civil war
// i am making the two <p> elements using javascript

civil = document.getElementById('civil');
civilhtml = document.getElementById('civil').innerHTML;
civilmsg = civilhtml + '<h1>Civil War</h1>';
civilmsg += '<p>' + yearTime(civilyear) + '</p>';
civilmsg += '<p>The war began when the Confederates bombarded Union soldiers at Fort Sumter, South Carolina on April 12, 1861. The war ended in Spring, 1865. Robert E. Lee surrendered the last major Confederate army to Ulysses S. Grant at Appomattox Courthouse on April 9, 1865.</p>';
civil.innerHTML = civilmsg;

//article for the Age of Immigration

// adding the <h1>

 var imh1 = document.createElement('h1');
 var imheading = 'The Age Of Immigration';
 var imh1text = document.createTextNode(imheading);
    imh1.appendChild(imh1text);
 imarticle = document.getElementById('immigration');
 imarticle.appendChild(imh1);
 
 // adding the elements using DOM manipulation

 // first paragraph
 var imp1 = document.createElement('p');
 var imp1text = yearTime(immigrationyear);
 var imp1textnode = document.createTextNode(imp1text);
 imp1.appendChild(imp1textnode);
 p1im = document.getElementById('immigration');
 p1im.appendChild(imp1);

// second paragraph
    imp2 = document.createElement('p');
    imp2text = 'The United States experienced major waves of immigration during the colonial era, the first part of the 19th century and from the 1880s to 1920. Many immigrants came to America seeking greater economic opportunity, while some, such as the Pilgrims in the early 1600s, arrived in search of religious freedom.';
    imp2textnode = document.createTextNode(imp2text);
    imp2.appendChild(imp2textnode);
    imp2fin = document.getElementById('immigration');
    imp2fin.appendChild(imp2);


    // World War 1

    //Adding the heading
    wwh1 = document.createElement('h1');
    wwh1text = 'World War 1';
    wwh1textnode = document.createTextNode(wwh1text);
    wwh1.appendChild(wwh1textnode);
    wwh1fin = document.getElementById('ww1');
    wwh1fin.appendChild(wwh1);

    //World WAr one elements

    ww1 = document.getElementById('ww1');
    ww1s = ww1.innerHTML;
    ww1date = yearTime(ww1year);
    ww1msg = ww1s + '<p>' + ww1date + '</p>';
    ww1msg += '<p>World War I began in 1914 after the assassination of Archduke Franz Ferdinand and lasted until 1918. During the conflict, Germany, Austria-Hungary, Bulgaria and the Ottoman Empire (the Central Powers) fought against Great Britain, France, Russia, Italy, Romania, Japan and the United States (the Allied Powers).</p>';
    ww1.innerHTML = ww1msg;

    //The Great Depression
    
    // Heading h1
    Greath1 = document.createElement('h1');
    greath1 = 'The Great Depression';
   greath1text = document.createTextNode(greath1);
    Greath1.appendChild(greath1text);
    greath1el = document.getElementById('great');
    greath1el.appendChild(Greath1);

   // rest of content of the Great Depression

   dep = document.getElementById('great');
   depyear = yearTime(greatyear);
   depinner = dep.innerHTML;
   depmsg = depinner + '<p>' + depyear + '</p>';
   depmsg += '<p>World War I began in 1914 after the assassination of Archduke Franz Ferdinand and lasted until 1918. During the conflict, Germany, Austria-Hungary, Bulgaria and the Ottoman Empire (the Central Powers) fought against Great Britain, France, Russia, Italy, Romania, Japan and the United States (the Allied Powers).</p>';
   dep.innerHTML = depmsg;



   // Slide Ins        
   //
   //

   // Revolution slidein

   revslidein = document.getElementById('revslidein');
   revyears = slideinYear(revyear);
   revmonths = monthTime(revyear);
   revdays = dayTime(revyear);
   revhours = hourTime(revyear);
   revslidein.innerHTML = '<h1> The Revolutionary War Was:</h1><ul><li> ' + revyears + ' Years,</li><li> ' + revmonths + ' Months,</li><li>' + revdays + ' Days, and</li><li>' + revhours + ' hours ago</li><p class="slideinbutton" id="slideinbutton">Close</p></ul>';


   // Event that causes the slidein for the rev

   function revChangeSlidein() {
     change12 = document.getElementById('revslidein');
     change12.setAttribute('class', 'notoriginal');
   }

   change1234 = document.getElementById('rev');
   change1234.addEventListener('click', revChangeSlidein, false);

   // Event that causes the slidinto close for rev

   function revSlideout() {
     slideout = document.getElementById('revslidein');
     slideout.setAttribute('class', 'original');
   }
   revslideout = document.getElementById('slideinbutton');
   revslideout.addEventListener('click', revSlideout, false);

   // Building of America slidein

  buildslidetime = document.getElementById('buildingslidein');
  buildyears = slideinYear(buildingyear);
  buildmonth = Math.abs(monthTime(buildingyear));
  buildday = dayTime(buildingyear);
  buildhour = hourTime(buildingyear);
  buildslidetime.innerHTML = '<h1>The Building of America Was</h1><ul><li>' + buildyears + ' Years,</li><li>' + buildmonth + ' Months</li><li>' + buildday + ' Days, and</li><li>' + buildhour + ' Hours ago</li></ul><p class="slideinbutton" id="slideinbutton1">Close</p>';
// Slide in
  function buildSlidein() {
    build = document.getElementById('buildingslidein');
    build.setAttribute('class', 'buildnotoriginal');
  }
  buildtarget = document.getElementById('building');
  buildtarget.addEventListener('click', buildSlidein, false);
//Slide out
function buildSlideout() {
  build = document.getElementById('buildingslidein');
  build.setAttribute('class', 'buildoriginal');
}
buildtargetb = document.getElementById('slideinbutton1');
buildtargetb.addEventListener('click', buildSlideout, false);