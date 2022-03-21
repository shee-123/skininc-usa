function processSkin(el, key) {
  this.apikey = key;
  this.css = '';
  this.pagewrapper = '';
  this.skinContainer = el; // skin id container element
  this.nodeanswers = [];
  this.answers = [];
  this.questionanswers = [];
  this.content_landingpage = '';
  this.bodyContainer = 'g-content';
  this.bodyLandingPageContainer = 'landingpage-start';
  this.nodes = null;
  this.payloadurl = null;
  this.sessionid = null;
  this.processinglock = false;
  this.multichoicecontinuebtn = 'multi-question-';
  this.xhractionlock = [];
  this.skiptable = [];
  this.trackingquestions = [];
  this.mediaurl = '';
  this.dataurl = '';
  this.skinidicon = '';
  this.icon_1 = '';
  this.showheader = 1;
  this.question_head = '';
  this.bottles = [];
  this.selectedAnswers = [];

  this.body = document.getElementsByTagName('body')[0];
  this.OSName = 'Unknown';
  this.navigatorAppVersion = navigator.appVersion;

  // Nodes id (this is not current question id)
  // questionid = nodes[currentquestion]['question_id']
  this.currentquestion = null;

  // stores the questions and answers so far
  this.questions = [];

  var skinParent = this;

  this.bootstrap = function() {
    this.loaderWrappers();
  }

  this.setLandingPageContent = function($content){
    skinParent.content_landingpage = $content;
  }


  this.setPayloadUrl = function(url){
    skinParent.payloadurl = url;
  }


  this.setSessionId = function(sessionid){
    skinParent.sessionid = sessionid;
  }

  /*
   * Set skip table
   */
  this.setSkipTable = function(skiptable){
    skinParent.skiptable = skiptable;

  }

  /*
   * Get Current Node
   */
  this.getCurrentNode = function(){
    return skinParent.currentnode;
  }

  /*
   * Set Current Node
   */
  this.setCurrentNode = function(node){
    skinParent.currentnode =  node;
  }


  /*
   * Set Current Node
   */
  this.setNodes = function(nodes){
    skinParent.nodes =  nodes;
  }

  this.pageWrapper = function(id) {
    var wrapper = document.createElement('div');
    wrapper.className = 'g-wrap';
    wrapper.setAttribute("id", "g-wrap");

    var mainwrapper = document.createElement('div');
    mainwrapper.className = 'g-wrap__main';
    mainwrapper.setAttribute("id", "g-wrap__main");


    wrapper.append(mainwrapper);
    skinParent.skinContainer.append(wrapper);
  }

  this.loadCss = function() {
    var head = document.head;
    var cssel = document.createElement('style');
    var css = this.css;
    cssel.append(css);
    head.append(cssel);
  }

  /*
   * Set skin css passed from backend
   */
  this.setCss = function(css) {
    skinParent.css = css;
  }

  /*
   * Build page layout
   */
  this.buildLayout = function() {
    var mainwrap = document.getElementById('g-wrap__main');


    var bodywrapper = document.createElement('div');
    bodywrapper.className = 'g-main';
    bodywrapper.setAttribute("id", "g-main");

    var bodydataContainer = document.createElement('div');
    bodydataContainer.className = 'g-content';
    bodydataContainer.setAttribute("id", "g-content");
    bodywrapper.append(bodydataContainer);


    var footerwrapper = document.createElement('div');
    footerwrapper.className = 'footer';

    var headerwrapper = document.createElement('div');
    headerwrapper.className = 'g-header';
    headerwrapper.setAttribute("id", "g-header");
    mainwrap.append(headerwrapper);

    var printarea = document.createElement('div');
    printarea.className = 'print-area';
    printarea.setAttribute("id", "section-to-print");
    printarea.setAttribute("style", "visibility: hidden;");

    mainwrap.append(bodywrapper);
    mainwrap.append(footerwrapper);

    var documentbody = document.body;
    documentbody.append(printarea);
  }


  /*
   * Build question layout
   */
  this.buildQuestionLayout = function(){
    var bodydata = document.getElementById(skinParent.bodyContainer);
    bodydata.innerHTML = '';

    var content_progressbar = document.createElement('div');
    content_progressbar.className = 'g-content__progress';

    var mobilebarcode = document.createElement('div');
    mobilebarcode.className = 'sidebar-progress';
    mobilebarcode.setAttribute("id", "content_sidebar_barcode");
    content_progressbar.append(mobilebarcode);

    bodydata.append(content_progressbar);



    var innercontainer = document.createElement('div');
    innercontainer.className = 'g-content__inner';

    var sectionresult = document.createElement('div');
    sectionresult.className = 'section-container section-result';
    innercontainer.append(sectionresult);

    var swrap = document.createElement('div');
    swrap.className = 's-wrap';

    var output = '';

    if(skinParent.question_head!='' || skinParent.question_head!=null){
      output += skinParent.question_head;
    }

    output += '<div class="s-part container">';
    output += '<div class="s-part__number h1" id="question_number">1</div>';
    output += '<div class="s-part__inner s-title">';
    output += '<div id="section-title" class="s-subttl"></div>';
    output += '<div id="question-title" class="s-ttl h2"></div>';
    output += '</div>';
    output += '</div>';
    output += '<div class="s-part container">';
    output += '<div class="s-part__empty"></div>';
    output += '<div class="s-part__inner">';
    output += '<div id="question-description" class="s-txt"></div>';
    output += '</div>';
    output += '</div>';

    output += '<div class="s-part container">';
    output += '<div class="s-part__empty"></div>';
    output += '<div class="s-part__inner">';
    output += '<div id="s-list-questions" class="s-list-question"></div>';
    output += '</div>';

    swrap.innerHTML = output;


    var spart = document.createElement('div');
    spart.className = 's-part container';
    spart.setAttribute("id", "questions-container-action");
    swrap.append(spart);

    sectionresult.append(swrap);
    bodydata.append(innercontainer);


    var gcpag = document.createElement('div');
    gcpag.className = 'g-content__pagination';
    gcpag.setAttribute("id", "g-content__pagination");

    var output = '<div class="section-container section-pagination">';
    output += '<div class="container">';
    output += '<div class="s-wrap" id="question-actions">';
    output += '</div></div></div>';


    gcpag.innerHTML = output;
    bodydata.append(gcpag);


    var steps = document.createElement('div');
    steps.className = 'g-content__steps';

    var output = '<div class="section-container section-steps">';
    output += '<div class="container">';
    output += '<div class="s-wrap"><div id="question-numbers" class="s-wrap__inner"></div>';
    output += '</div></div></div>';


    steps.innerHTML = output;
    bodydata.append(steps);

  }


  /*
   * create sidebae Layout
   */
  this.sidebarLayout = function()
  {
    var gmain = document.getElementById('g-main');
    gmain.classList.add('aside');

    var sidebar = document.createElement('div');
    sidebar.className = 'g-sidebar init';

    var sidebarwrap = document.createElement('div');
    sidebarwrap.className = 'g-sidebar__wrap';
    sidebar.append(sidebarwrap);

    var sbinner = document.createElement('div');
    sbinner.className = 'g-sidebar__inner';

    var sidebarinner = '<div class="sidebar-product">';
    sidebarinner += '<div class="container">';
    sidebarinner += '<div class="sidebar-product__description">';
    sidebarinner += '<div class="product-pic"><img id="bottle-pic" src="'+skinParent.mediaurl+'/images/bottle.png" alt="product"></div>';
    sidebarinner += '<div class="product-name">';
    sidebarinner += '<div class="product-name__ttl" id="product-name-ttl" ></div>';
    sidebarinner += '<div class="product-name__txt" id="product-short-description"></div>';
    sidebarinner += '</div>';
    sidebarinner += '<div class="product-price">';
    sidebarinner += '<div class="product-price__ttl" id="product-price__ttl"></div>';
    //sidebarinner += '<div class="product-price__txt">SAVE $51.00</div>';
    sidebarinner += '</div>';
    sidebarinner += '</div> <!-- end of sidebar-product__description -->';
    sidebarinner += '<form class="sidebar-product__form" id="add-to-cart-form">';
    sidebarinner += '<div class="form-group">';
    sidebarinner += '<label class="form-name">Bottle colour:</label>';
    sidebarinner += '<div class="checkbox-color">';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-pink" type="radio" name="color" value="pink">';
    sidebarinner += '<div style="background-color: #F273B9;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-orange" type="radio" name="color" value="orange">';
    sidebarinner += '<div style="background-color: #F8BE83;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-yellow" type="radio" name="color" value="yellow">';
    sidebarinner += '<div style="background-color: #FEF585;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-green" type="radio" name="color" value="green">';
    sidebarinner += '<div style="background-color: #B9DB91;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-teal" type="radio" name="color" value="teal">';
    sidebarinner += '<div style="background-color: #C8E8E9;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-blue" type="radio" name="color" value="blue">';
    sidebarinner += '<div style="background-color: #76C8EB;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '<label class="color-box">';
    sidebarinner += '<input id="color-box-gold" type="radio" name="color" value="gold">';
    sidebarinner += '<div style="background-color: #D4AF37;" class="box-view"></div>';
    sidebarinner += '</label>';
    sidebarinner += '</div>';
    sidebarinner += '</div>';
    sidebarinner += '<div class="form-group">';
    sidebarinner += '<label class="form-name">Your Name:</label>';
    sidebarinner += '<input type="text" placeholder="Enter your name here..." required class="form-control" id="skinid_name">';
    sidebarinner += '</div>';
    sidebarinner += '<div class="form-group">';
    sidebarinner += '<label class="form-name">Your Email:</label>';
    sidebarinner += '<input type="email" placeholder="Enter email..." required class="form-control" id="skinid_email">';
    sidebarinner += '</div>';
    sidebarinner += '<div class="form-group" id="add-to-cart-container">';
    sidebarinner += '<button type="submit" class="btn btn-bag" data-status="disable" id="add-to-cart-btn"><span>Add to bag</span></button>';
    sidebarinner += '</div>';
    sidebarinner += '<div class="form-group">';
    sidebarinner += '<div class="controls-buttons" id="controls-buttons">';
    sidebarinner += '</div>';
    sidebarinner += '</div>';
    sidebarinner += '</form>';
    sidebarinner += '</div>';
    sidebarinner += '</div>';
    sbinner.innerHTML = sidebarinner;

    sidebarwrap.append(sbinner);


    var sbprogresswrap = document.createElement('div');
    sbprogresswrap.className = 'g-sidebar__progress';
    sidebarwrap.append(sbprogresswrap);


    var sbprogress = document.createElement('div');
    sbprogress.className = 'sidebar-progress';
    sbprogresswrap.append(sbprogress);

    var progressoutput = '<div id="sidebar-barcode" class="sidebar-progress">';
    progressoutput += '<div style="background-image: url(&quot;'+skinParent.mediaurl+'/images/progress-placeholder.svg&quot;)" class="progress__placeholder"></div>';
    progressoutput += '</div>';
    sbprogress.innerHTML = progressoutput;


    gmain.append(sidebar);

  }



  /*
   * add color to the questions
   */
  this.addQuestionColor = function(){
    var primary = skinParent.nodes[skinParent.currentquestion]['primary_color'];
    var secondary = skinParent.nodes[skinParent.currentquestion]['secondary_color'];

    var gmain = document.getElementById('g-main');
    var classList = gmain.classList;
    for (i = 0; i < classList.length; i++) {
      if(classList[i].indexOf("theme-")!=-1){
        gmain.classList.remove(classList[i]);
      }
    }



    gmain.classList.add(primary);
  }

  /*
   * generate Barcode Layout
   * deprecated
   */
  this.generateBarcodeLayout = function() {
    var bccontainer = document.createElement('div');
    bccontainer.className = 'barcodecontainer';
    bccontainer.setAttribute("id", "sidebar-barcode");
  }

  /*
   * Clear Barcode
   */
  this.clearBarcode = function()
  {
    var bccontainer = document.getElementById('sidebar-barcode');
    bccontainer.innerHTML = '';

    var mobilebccontainer = document.getElementById('content_sidebar_barcode');
    mobilebccontainer.innerHTML = '';
  }


  /*
   * Clear Numbering
   */
  this.clearNumbering = function()
  {
    var bccontainer = document.getElementById('question-numbers');
    bccontainer.innerHTML = '';
  }


  /*
   * generate Barcode based on Answers
   */
  this.generateBarcodeLine = function(size, color) {
    var bccontainer = document.getElementById('sidebar-barcode');

    var mobilebccontainer = document.getElementById('content_sidebar_barcode');

    var bcsize = 'line-large';
    if(size=='M'){
      bcsize = 'line-medium';
    } else if(size=='S'){
      bcsize = 'line-small';
    }

    var bar = document.createElement('i');
    bar.className = bcsize;
    bar.setAttribute("style", "background-color:"+color+";");
    bar.setAttribute("data-color", color);
    bar.setAttribute("data-line", bcsize);
    bccontainer.append(bar);

    var bar = document.createElement('i');
    bar.className = bcsize;
    bar.setAttribute("style", "background-color:"+color+";");
    bar.setAttribute("data-color", color);
    bar.setAttribute("data-line", bcsize);
    mobilebccontainer.append(bar);

  }


  /*
   * Get node Id from question id
   */
  this.getNodeIdByQuestionId = function(questionid)
  {
    for (var num = 0; num < skinParent.nodes.length; num++) {
      if(skinParent.nodes[num]['question_id']==questionid) {
        return num;
      }
    }
    return false;
  }

  /*
   * Render loader wrapper
   */
  this.loaderWrappers = function() {
    var colors = 8;
    var head = document.head;
    var cssel = document.createElement('style');
    var css = ".loading-wrapper{height:100%;width:100%;position:fixed;top:0px;z-index:200;background-color:rgba(250,250,250,0.9);}";

    var css11 = "*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.loading-wrapper{padding:40px 0}.loading-wrapper.dark{background:#313134}div.spinner{top:50%;-moz-animation:rotate 10s infinite linear;-webkit-animation:rotate 10s infinite linear;animation:rotate 10s infinite linear;position:relative;display:block;margin:auto;width:142px;height:142px}div.spinner i{-moz-animation:rotate 3s infinite cubic-bezier(.09,.6,.8,.03);-webkit-animation:rotate 3s infinite cubic-bezier(.09,.6,.8,.03);animation:rotate 3s infinite cubic-bezier(.09,.6,.8,.03);-moz-transform-origin:50% 100% 0;-webkit-transform-origin:50% 100% 0;transform-origin:50% 100% 0;position:absolute;display:inline-block;top:50%;left:50%;border:6px solid transskinincparent;border-bottom:none}div.spinner i:nth-child(1){-moz-animation-timing-function:cubic-bezier(.09,.3,.12,.03);-webkit-animation-timing-function:cubic-bezier(.09,.3,.12,.03);animation-timing-function:cubic-bezier(.09,.3,.12,.03);width:44px;height:22px;margin-top:-22px;margin-left:-22px;border-color:#2172b8;border-top-left-radius:36px;border-top-right-radius:36px}div.spinner i:nth-child(2){-moz-animation-timing-function:cubic-bezier(.09,.6,.24,.03);-webkit-animation-timing-function:cubic-bezier(.09,.6,.24,.03);animation-timing-function:cubic-bezier(.09,.6,.24,.03);width:58px;height:29px;margin-top:-29px;margin-left:-29px;border-color:#18a39b;border-top-left-radius:42px;border-top-right-radius:42px}div.spinner i:nth-child(3){-moz-animation-timing-function:cubic-bezier(.09,.9,.36,.03);-webkit-animation-timing-function:cubic-bezier(.09,.9,.36,.03);animation-timing-function:cubic-bezier(.09,.9,.36,.03);width:72px;height:36px;margin-top:-36px;margin-left:-36px;border-color:#82c545;border-top-left-radius:48px;border-top-right-radius:48px}div.spinner i:nth-child(4){-moz-animation-timing-function:cubic-bezier(.09,1.2,.48,.03);-webkit-animation-timing-function:cubic-bezier(.09,1.2,.48,.03);animation-timing-function:cubic-bezier(.09,1.2,.48,.03);width:86px;height:43px;margin-top:-43px;margin-left:-43px;border-color:#f8b739;border-top-left-radius:54px;border-top-right-radius:54px}div.spinner i:nth-child(5){-moz-animation-timing-function:cubic-bezier(.09,1.5,.6,.03);-webkit-animation-timing-function:cubic-bezier(.09,1.5,.6,.03);animation-timing-function:cubic-bezier(.09,1.5,.6,.03);width:100px;height:50px;margin-top:-50px;margin-left:-50px;border-color:#f06045;border-top-left-radius:60px;border-top-right-radius:60px}div.spinner i:nth-child(6){-moz-animation-timing-function:cubic-bezier(.09,1.8,.72,.03);-webkit-animation-timing-function:cubic-bezier(.09,1.8,.72,.03);animation-timing-function:cubic-bezier(.09,1.8,.72,.03);width:114px;height:57px;margin-top:-57px;margin-left:-57px;border-color:#ed2861;border-top-left-radius:66px;border-top-right-radius:66px}div.spinner i:nth-child(7){-moz-animation-timing-function:cubic-bezier(.09,2.1,.84,.03);-webkit-animation-timing-function:cubic-bezier(.09,2.1,.84,.03);animation-timing-function:cubic-bezier(.09,2.1,.84,.03);width:128px;height:64px;margin-top:-64px;margin-left:-64px;border-color:#c12680;border-top-left-radius:72px;border-top-right-radius:72px}div.spinner i:nth-child(8){-moz-animation-timing-function:cubic-bezier(.09,2.4,.96,.03);-webkit-animation-timing-function:cubic-bezier(.09,2.4,.96,.03);animation-timing-function:cubic-bezier(.09,2.4,.96,.03);width:142px;height:71px;margin-top:-71px;margin-left:-71px;border-color:#5d3191;border-top-left-radius:78px;border-top-right-radius:78px}@-moz-keyframes rotate{to{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{to{-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";
    css += '.spinner{display:inline-block;position:relative;width:64px;height:64px;margin:0 auto 0 -32px;top:45%;left:50%}.spinner div{animation:spinner 1.2s cubic-bezier(.5,0,.5,1) infinite;transform-origin:32px 32px}.spinner div:after{content:" ";display:block;position:absolute;width:6px;height:6px;border-radius:50%;background:#fff;margin:-3px 0 0 -3px}.spinner div:nth-child(1){animation-delay:-36ms}.spinner div:nth-child(1):after{top:50px;left:50px;background-color:#ff0}.spinner div:nth-child(2){animation-delay:-72ms}.spinner div:nth-child(2):after{top:54px;left:45px;background-color:purple}.spinner div:nth-child(3){animation-delay:-108ms}.spinner div:nth-child(3):after{top:57px;left:39px;background-color:#000079}.spinner div:nth-child(4){animation-delay:-144ms}.spinner div:nth-child(4):after{top:58px;left:32px;background-color:#ea8400}.spinner div:nth-child(5){animation-delay:-.18s}.spinner div:nth-child(5):after{top:57px;left:25px;background-color:#f0f}.spinner div:nth-child(6){animation-delay:-216ms}.spinner div:nth-child(6):after{top:54px;left:19px;background-color:#19aaff}.spinner div:nth-child(7){animation-delay:-252ms}.spinner div:nth-child(7):after{top:50px;left:14px;background-color:#18a39b}.spinner div:nth-child(8){animation-delay:-288ms}.spinner div:nth-child(8):after{top:45px;left:10px;background-color:#2172b8}@keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}';


    cssel.innerHTML = css;
    head.append(cssel);


    var lel = document.createElement('div');
    lel.className = 'loading-wrapper';
    lel.setAttribute("id", "loadingwrapper");

    var spinner = document.createElement('div');
    spinner.className = 'spinner';

    for (step = 0; step < colors; step++) {
      var stp = document.createElement('div');
      stp.style.backgroundColor = colors[step];
      spinner.append(stp);
    }

    lel.append(spinner);
    skinParent.skinContainer.append(lel);

    this.pageWrapper();
    this.buildLayout();
  }

  /*
   * Show loading animation
   */
  this.loading = function(state) {
    if (state==true) {
      document.getElementById("loadingwrapper").style.display = 'block';
    } else {
      document.getElementById("loadingwrapper").style.display = 'none'
    }
  }

  /*
   * Show landing page in application
   * build question layout
   * add click event listner to btn-start application
   *
   */
  this.showLandingPage = function(){
    var bodywrapper = document.getElementById(skinParent.bodyContainer);

    var landingfullpage = document.createElement('div');
    landingfullpage.className = 'g-content__inner inner-full';


    if(skinParent.showheader==0){
      document.getElementById('g-header').style.display = 'none'
      document.getElementById('g-main').style.paddingTop = '0px';



      var cssel = document.createElement('style');
      var css = ".g-content .g-content__progress{top:0px;}@media (min-width: 1024px){.g-sidebar .g-sidebar__wrap{padding-top:0px;}}";
      cssel.innerHTML = css;
      document.head.append(cssel);
    }

    var sectionhero = document.createElement('div');
    sectionhero.className = 'section-hero';
    landingfullpage.append(sectionhero);

    var containerwrap = document.createElement('div');
    containerwrap.className = 'container s-wrap';


    var output = '<div class="s-part s-part__first">';
    output += '<div class="s-subtitle">Skin ID</div>';
    output += '<div class="s-title">';
    output += '<div class="s-title__ttl h1">Customize your skincare in minutes</div>';
    output += '<div class="s-title__pic"><img src="'+skinParent.skinidicon+'"></div>';
    output += '</div>';
    output += '<div class="s-info"><span class="icon ic2-icon-clock"></span><span>Time: 2-3 minutes</span></div>';
    output += '<div class="s-description">'+skinParent.content_landingpage+'</div>';
    output += '<div class="s-buttons">';
    output += '<button type="button" id="btn-start" class="btn btn-default btn-start"><span>Start quiz now</span></button>';
    output += '<div class="s-buttons__txt">or</div>';
    output += '<button type="button" class="btn btn-index" id="reorder-daily-dose"><span>Re-order my daily dose</span></button>';
    output += '</div>';
    output += '</div>';
    output += '<div class="s-part s-part__second">';
    output += '<div class="s-pic"><img src="'+skinParent.mediaurl+'/images/hero-image.png"></div>';
    output += '</div>';

    containerwrap.innerHTML = output;

    sectionhero.append(containerwrap);
    bodywrapper.append(landingfullpage);
  }


  /*
   * Skip question  based on previous questions and answers
   * check skinParent.currentquestion
   *
   */
  this.processSkipTable = function()
  {
    for (step = 0; step < skinParent.skiptable.length; step++) {
      if(skinParent.currentquestion>0) {
        if(skinParent.skiptable[step]['skip_question_id']==skinParent.nodes[skinParent.currentquestion]['question_id']){
          for (qstep = 0; qstep < skinParent.questions.length; qstep++) {
            if((skinParent.questions[qstep]['question_id']==skinParent.skiptable[step]['question_id']) &&
              (skinParent.questions[qstep]['answers'][0]==skinParent.skiptable[step]['answer_id'])){
              var skips=parseInt(skinParent.skiptable[step]['skips']);
              skinParent.currentquestion += skips;
            }
          }
        }
      }
    }
  }


  /*
   * Open the given question.
   * if skinParent.currentquestion is null Show first question
   *
   */
  this.openQuestion = function(){
    skinParent.answers = [];

    if(skinParent.currentquestion==null){
      skinParent.currentquestion = 0;
    }

    skinParent.processSkipTable();
    var questiondata = skinParent.nodes[skinParent.currentquestion];

    var qtitle = document.getElementById('question-title');
    qtitle.innerHTML = questiondata['question_title'];

    var qnumber = document.getElementById('question_number');
    qnumber.innerHTML = skinParent.questions.length + 1;

    var stitle = document.getElementById('section-title');
    stitle.innerHTML = questiondata['section_title'];

    var sdes = document.getElementById('question-description');
    sdes.innerHTML = questiondata['question_description'];
    var output = '';

    if(questiondata['question_type']==1) {
      output += skinParent.prepSingleQuestionType();
    } else {
      output += skinParent.prepMultipleQuestionType();
    }

    var cleft = document.getElementById('s-list-questions');
    cleft.innerHTML = output;

    if(questiondata['question_type']!=1) {
      skinParent.setMultiquestionActions();
    }

    skinParent.addQuestionColor();
  }


  /*
   * Open Result, if skinParent.currentquestion is null
   * Show first question
   */
  this.openResult = function(){
    var bodydata = document.getElementById(skinParent.bodyContainer);
    bodydata.innerHTML = '';

    var content_progressbar = document.createElement('div');
    content_progressbar.className = 'g-content__progress';

    var mobilebarcode = document.createElement('div');
    mobilebarcode.className = 'sidebar-progress';
    mobilebarcode.setAttribute("id", "content_sidebar_barcode");
    content_progressbar.append(mobilebarcode);

    bodydata.append(content_progressbar);



    var innercontainer = document.createElement('div');
    innercontainer.className = 'g-content__inner';

    var sectionresult = document.createElement('div');
    sectionresult.className = 'section-container section-result';
    sectionresult.setAttribute("id", "result_section");
    innercontainer.append(sectionresult);

    var swrap = document.createElement('div');
    swrap.className = 's-wrap';

    // skin problem title goes here
    var output = '<div class="s-part container"><div class="s-part__inner s-title"><div id="result-s-title" class="s-ttl h2"></div></div></div>';
    output += '<div class="s-part container"><div class="s-part__inner"><div id="result-s-description" class="s-txt"></div></div></div>';

    // serum benifit goes here
    output += '<div class="s-part container"><div class="s-part__inner"><div class="s-list">';


    // item one
    output += '<div class="s-list__item"><div class="item-pic" id="r-serum-one-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="r-serum-one-ttl"></div><div class="item-descr__txt" id="r-serum-one-txt"></div></div>';
    output += '</div>';

    // item two
    output += '<div class="s-list__item"><div class="item-pic" id="r-serum-two-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="r-serum-two-ttl"></div><div class="item-descr__txt" id="r-serum-two-txt"></div></div>';
    output += '</div>';

    // item three
    output += '<div class="s-list__item"><div class="item-pic" id="r-serum-three-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="r-serum-three-ttl"></div><div class="item-descr__txt" id="r-serum-three-txt"></div></div>';
    output += '</div>';

    output += '</div></div></div>';

    swrap.innerHTML = output;
    sectionresult.append(swrap);


    // s-wrap for identity
    var swraptwo = document.createElement('div');
    swraptwo.className = 's-wrap';

    // identity title and description goes here
    var output = '<div class="s-part container"><div class="s-part__inner s-title"><div id="result-i-title" class="s-ttl h2"></div></div></div>';
    output += '<div class="s-part container"><div class="s-part__inner"><div id="result-i-description" class="s-txt"></div></div></div>';
    // identity content goes here
    output += '<div class="s-part container"><div class="s-part__inner"><div class="s-list">';

    output += '<div class="s-list__item item-big"><div class="item-pic" id="r-identity-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="r-identity-ttl"></div><div class="item-descr__txt" id="r-identity-txt"></div></div>';
    output += '</div>';


    output += '</div></div></div>';


    swraptwo.innerHTML = output;
    sectionresult.append(swraptwo);


    // s-wrap for daily dose
    var swrapthree = document.createElement('div');
    swrapthree.className = 's-wrap';

    // daily dose title and description goes here
    var output = '<div class="s-part container"><div class="s-part__inner s-title"><div class="s-subttl">Results</div><div id="result-dose-title" class="s-ttl h2"></div></div></div>';
    output += '<div class="s-part container"><div class="s-part__inner"><div id="result-dose-description" class="s-txt"></div></div></div>';

    // daily dose goes here
    output += '<div class="s-part container"><div class="ic2-icon-equal"></div><div class="s-part__inner"><div class="s-list-dose">';

    // dose one
    output += '<div class="s-list__item"><div class="item-pic" id="dose-one-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="dose-one-ttl"></div><div class="item-descr__txt" id="dose-one-txt"></div></div>';
    output += '</div>';

    // dose two
    output += '<div class="s-list__plus"></div>';
    output += '<div class="s-list__item"><div class="item-pic" id="dose-two-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="dose-two-ttl"></div><div class="item-descr__txt" id="dose-two-txt"></div></div>';
    output += '</div>';

    // dose three
    output += '<div class="s-list__plus"></div>';
    output += '<div class="s-list__item"><div class="item-pic" id="dose-three-pic"><img src="images/results/skin-problem.png"></div>';
    output += '<div class="item-descr"><div class="item-descr__ttl" id="dose-three-ttl"></div><div class="item-descr__txt" id="dose-three-txt"></div></div>';
    output += '</div>';

    output += '</div></div></div>';

    swrapthree.innerHTML = output;
    sectionresult.append(swrapthree);



    innercontainer.append(sectionresult);
    bodydata.append(innercontainer);
  }


  /*
   * Check next node index.
   * If last node send false
   * Else send node index
   */
  this.getNextNode = function(){
    var index =  parseInt(skinParent.currentquestion) + 1;

    if(typeof skinParent.nodes[index] === 'undefined') {
      return false;
    }
    else {
      return index;
    }
  }


  /*
   * Prepare Single Question Block
   */
  this.prepSingleQuestionType = function(){
    return skinParent.prepSingleQuestionAnswers(skinParent.nodes[skinParent.currentquestion]['answers']);
  }

  /*
   * Prepare Multiple Question Block
   */
  this.prepMultipleQuestionType = function(){
    return skinParent.prepMultipleQuestionAnswers(skinParent.nodes[skinParent.currentquestion]['answers']);
  }

  /*
   * Prepare Multiple Question Block
   */
  this.prepMultipleQuestionAnswers = function(answers){
    var qcon = document.getElementById('questions-container-action');
    qcon.innerHTML = '';

    var output = '';
    output = '';

    for (step = 0; step < answers.length; step++) {
      output += '<div class="s-list__item-wrap">';
      output += '<div id="answer_'+answers[step]['answer_id']+'" class="answer s-list__item';
      for (selected = 0; selected < skinParent.selectedAnswers.length; selected++) {
        if(skinParent.selectedAnswers[selected]==answers[step]['answer_id']){
          output += ' selected';
        }
      }
      output += '"';
      output += 'data-questiontype="multiple" data-serums="'+answers[step]['answer_serums']+'"';
      output += ' data-lines="'+answers[step]['answer_lines']+'" data-answerid="'+answers[step]['answer_id']+'">'
      if(answers[step]['answer_svg']!=''){
        output += '<div class="item-pic">'+answers[step]['answer_svg']+'</div>';
      }
      output += '<div class="item-txt"><div class="item-txt-wrap">'+answers[step]['answer_title']+'</div></div>';
      output += '</div></div>';
    }

    return output;
  }

  /*
   * Prepare Multiple Question Action block
   * Add Continue button
   */
  this.setMultiquestionActions = function(){
    var qcon = document.getElementById('questions-container-action');
    qcon.innerHTML = '';

    qoutput = '<div class="s-part__empty"></div>';
    qoutput += '<div class="s-part__inner">';
    qoutput += '	<div class="s-list-question" style="float:right;">';
    qoutput += ' <div class="s-list__item-wrap" style="width:100%;max-width:100%;">';
    qoutput += ' <div class="s-list__item s_invert multiquestion-continue btn-disable" data-btntype="continue" data-status="disable"';
    qoutput += ' id="'+skinParent.multichoicecontinuebtn+skinParent.nodes[skinParent.currentquestion]["question_id"]+'" style="min-height:30px !important; padding:10px 40px;">';
    qoutput += ' 	<div class="item-txt">CONTINUE</div>';
    qoutput += ' 	</div>';
    qoutput += '</div></div></div>';

    qcon.innerHTML = qoutput;
  }

  /*
   * Prepare Multiple Question Block
   */
  this.prepSingleQuestionAnswers = function(answers){
    var qcon = document.getElementById('questions-container-action');
    qcon.innerHTML = '';


    var output = '';
    for (step = 0; step < answers.length; step++) {
      output += '<div id="answer_'+answers[step]['answer_id']+'" ';
      output += 'data-serums="'+answers[step]['answer_serums']+'" ';
      output += 'data-lines="'+answers[step]['answer_lines']+'" class="answer s-list__item-wrap" ';
      output += 'data-questiontype="single" data-answerid="'+answers[step]['answer_id']+'">';
      output += '<div class="s-list__item';
      for (selected = 0; selected < skinParent.selectedAnswers.length; selected++) {
        if(skinParent.selectedAnswers[selected]==answers[step]['answer_id']){
          output += ' selected';
        }
      }
      output += '">';
      if(answers[step]['answer_svg']!=''){
        output += '<div class="item-pic">'+answers[step]['answer_svg']+'</div>';
      }
      output += '<div class="item-txt"><div class="item-txt-wrap">'+answers[step]['answer_title']+'</div></div>';
      output += '</div></div>';
    }
    output += '';
    return output;
  }


  /*
   * prepare payload before send
   */
  this.prepPayload = function(load) {
    var data = {
      "apikey" : skinParent.apikey,
      "payload" : load
    }
    var jsonstring = JSON.stringify(data);
    return skinParent.payloadurl + "/" + jsonstring + "/";
  }

  /*
   * post data to payload url
   */
  this.getResponse = function(payload, callback, disableNextAnswers){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {

        var obj = JSON.parse(this.responseText);

        if (obj) {

          skinParent.response = obj;

          callback();

        } else {

          skinParent.showError(xhr.statusText);

        }

      } else {

        skinParent.showError(xhr.statusText);

      }

    };

    if(disableNextAnswers) {
      skinParent.disableNextAnswer();
    }

    skinParent.response = null;

    xhr.open("GET", skinParent.prepPayload(payload), true);

    xhr.send();
  }

  /*
   * Show error
   */
  this.showError = function(){
    console.log("Waiting Action");
  }


  // is touch
  this.isTouch = function() {
    if (!!('ontouchstart' in window)) {
      skinParent.body.classList.remove('touch-no');
      skinParent.body.classList.add('touch-yes');
    } else {
      skinParent.body.classList.remove('touch-yes');
      skinParent.body.classList.add('touch-no');
    }
  }

  // identify РћРЎ
  this.setOS = function() {
    if (skinParent.navigatorAppVersion.indexOf('Win') !== -1) {
      skinParent.OSName = 'Windows';
    } else if (skinParent.navigatorAppVersion.indexOf('Mac') !== -1) {
      if (skinParent.navigatorAppVersion.indexOf('iPhone') !== -1 || skinParent.navigatorAppVersion.indexOf('iPad') !== -1) {
        skinParent.OSName = 'IOS';
      } else {
        skinParent.OSName = 'Mac';
      }
    } else if (skinParent.navigatorAppVersion.indexOf('Android') !== -1) {
      skinParent.OSName = 'Android';
    } else if (skinParent.navigatorAppVersion.indexOf('X11') !== -1) {
      if (skinParent.navigatorAppVersion.indexOf('Linux') !== -1) {
        skinParent.OSName = 'Linux';
      } else {
        skinParent.OSName = 'UNIX';
      }
    } else if (skinParent.navigatorAppVersion.indexOf('Linux') !== -1) {
      skinParent.OSName = 'Linux';
    }
  }

}

function processSerum() {
  this.serum = {};
  this.serumRank = [];
  this.serumResults = [];
  this.slinesize = 5;
  this.mlinesize = this.smalllinesize * 2;
  this.llinesize = this.smalllinesize * 3;
  this.bc_container = 'barcode-container';
  this.colorcodedata = [];
  this.nodes = [];

  var serumParent = this;

  /*
   * Set serum and rank array for sorting
   */
  this.setSerum = function(data) {
    serumParent.serum = data;
    for (step = 0; step < serumParent.serum.length; step++) {
      serumParent.serumRank.push({
        id : serumParent.serum[step]['code'],
        rank : 0
      });
    }
    serumParent.getRankedSerums(true);
  }

  /*
   * rank serum based on serumuse
   */
  this.setSortSerum = function(serumuse) {
    if (Array.isArray(serumuse)) {
      for (step = 0; step < serumuse.length; step++) {
        for (st = 0; st < serumParent.serumRank.length; st++) {
          if (serumParent.serumRank[st]["id"] == serumuse[step]) {
            serumParent.serumRank[st]["rank"] += 1;
          }
        }
      }
    } else {
      for (st = 0; st < serumParent.serumRank.length; st++) {
        if (serumParent.serumRank[st]["id"] == serumuse) {
          serumParent.serumRank[st]["rank"] += 1;
        }
      }
    }
  }

  /*
   * Get Ranked serums or serum results
   */
  this.getRankedSerums = function(getproduct) {
    var byRank = serumParent.serumRank.slice(0);
    var sorted = byRank.sort(function(a, b) {
      return b.rank - a.rank;
    });

    if (getproduct) {
      for (i = 0; i < 3; i++) {
        for (st = 0; st < serumParent.serum.length; st++) {
          if (sorted[i]["id"] == serumParent.serum[st]["code"]) {
            serumParent.serumResults.push(serumParent.serum[st]);
          }
        }
      }
      return serumParent.serumResults;
    }
    return sorted;
  }

  /*
   * convert serum id and return secum code
   */
  this.convertSerumIdToCode = function(serumid) {
    for (st = 0; st < serumParent.serum.length; st++) {
      if(serumid==serumParent.serum[st]['serum_id']){
        return serumParent.serum[st]['code'];
      }
    }
  }


  /*
   * Get Serum details based on serum id
   */
  this.getSerumDetails = function(serumid) {
    for (st = 0; st < serumParent.serum.length; st++) {
      if(serumid==serumParent.serum[st]['serum_id']){
        return serumParent.serum[st];
      }
    }
  }
}




function Skininc(config) {
  this.apikey = config.apiKey;
  this.thisdomain = window.location.href;

  this.userid = config.platformuid;
  this.platformSessionId = config.platformsession;
  this.platform = config.platform;
  this.thishost = "https://skininc.staging.overdose.digital/pub/media/skinapi/";
  this.payloadurl = "https://skininc.staging.overdose.digital/rest/V1/skininc";

  this.skin = null;
  this.processskin = null;
  this.serum = null;
  this.node = null;
  this.logging = true;
  this.questions = null;
  this.sessionid = null;
  this.response = null;
  this.preloadData = null;

  this.sessionExpireBrowserClose = true;
  this.cookieExpProduction = (60 * 60 * 24 * 10);// 10 days
  this.cookieExpDeveloper = 30; // 30 seconds
  this.appmode = 'developer'; // set to "production"
  this.useLocalStorage = true; // set to yes will save preloadData in
  // cookie
  this.sessionIdentity = 'skininc_app';
  this.localStoreageId = 'skininc_app_storage';
  this.localStorage = window.localStorage;
  this.answers = [];
  this.question = null;
  this.answersactionClass = 'answer';
  this.finaxhrcheck = null;
  this.products = [];
  this.skinContainer = config.canvas;

  this.facebook_status = 0;
  this.facebook_sdk = '';
  this.facebook_url = '';
  this.facebook_title = '';
  this.facebook_description = '';
  this.facebook_appid = '';


  this.config = config;

  this.multiselectEventCheck = false;

  this.cookieExpire = (this.appmode == 'developer') ? (1000 * this.cookieExpDeveloper)
    : (1000 * this.cookieExpProduction);

  var skinincparent = this;
  var finalResults = null;

  /*
   * Bootstrap application to domLoadAfter Run this function after DOM content
   * load
   */
  this.domLoadAfter = function() {
    // here we load local storage data
    // or load
    this.loadAfter();
  }

  /*
   * Bootstrap application Run this function after DOM content load
   */
  this.bootstrap = function() {


    // load skeleton functions
    this.skin = new processSkin(skinincparent.skinContainer, skinincparent.apikey);
    this.skin.bootstrap();
    this.skin.setPayloadUrl(skinincparent.payloadurl);
    this.serum = new processSerum();
    this.loadBefore();


    this.doccontentLoad();
  }

  /*
   * Make sure DOM Content is complete and then run domLoadAfter
   */
  this.doccontentLoad = function() {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function() {
        skinincparent.domLoadAfter();
      }, false)
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
          skinincparent.domLoadAfter();
        }
      })
    }
  }

  /*
   * Logger setup
   */
  this.logger = function(data) {
    if (skinincparent.logging) {
      console.log(data);
    }
  }

  /*
   * prepare payload before send
   */
  this.prepPayload = function(load) {
    var data = {
      "apikey" : skinincparent.apikey,
      "payload" : load
    }

    var jsonstring = JSON.stringify(data);
    return skinincparent.payloadurl ;// + jsonstring + "/";
  }

  /*
   * prepare payload data
   */
  this.prepXhrParam = function(load) {

    var data = {
      "apikey" : skinincparent.apikey,
      "payload" : JSON.stringify(load)
    }

    var payload = {
      "data" : JSON.stringify(data)
    }

    var load = JSON.stringify(payload);

    return load;

  }


  /*
   * Load begining of domLoadAfter
   */
  this.loadBefore = function() {

    if (skinincparent.useLocalStorage) {
      var localdata = skinincparent.getLocalStorage();
      if (localdata) {
        skinincparent.response = localdata;
        skinincparent.preloadData = localdata;
      }
    }

    // check previous session
    var currentsession = skinincparent.getCookie(skinincparent.sessionIdentity);

    if (currentsession) {
      skinincparent.sessionid = currentsession;
    }

    if (!skinincparent.sessionid) {

      var phase = (skinincparent.preloadData && skinincparent.useLocalStorage) ? "session_only"
        : "start";
      var payload = {
        phase : phase,
        storeid : (typeof skinincparent.config.storeid !== 'undefined') ? skinincparent.config.storeid:null
      }
      this.getResponse(payload, this.initApplication)

    } else {
      if (!skinincparent.preloadData) {

        var payload = {
          phase : 'predata',
          storeid : (typeof skinincparent.config.storeid !== 'undefined') ? skinincparent.config.storeid:null,
          session_id : skinincparent.sessionid
        }
        this.getResponse(payload, this.initApplication)

      } else {

        skinincparent.initApplication();
      }
    }

  }

  /*
   * Application Main Initialization
   */
  this.initApplication = function() {

    skinincparent.skin.setOS();
    skinincparent.skin.isTouch();

    if (skinincparent.response) {

      if (skinincparent.response[0]['length'] > 0) {

        skinincparent.preloadData = skinincparent.response[0]['payload'];
        skinincparent.logger(skinincparent.preloadData);

        if (skinincparent.preloadData.sessionid) {
          skinincparent.sessionid = skinincparent.preloadData.sessionid;
          skinincparent.setCookie(skinincparent.sessionIdentity, skinincparent.sessionid);
        }

        if (skinincparent.useLocalStorage) {
          skinincparent.setLocalStorage(skinincparent.response);
        }

        if (skinincparent.preloadData.themecss) {
          skinincparent.skin.setCss(skinincparent.preloadData.themecss);
          skinincparent.skin.loadCss();
        }

        skinincparent.skin.setLandingPageContent(skinincparent.preloadData.landingpage);
        skinincparent.skin.setNodes(skinincparent.preloadData.node);
        skinincparent.skin.setSkipTable(skinincparent.preloadData.skiptable);
        skinincparent.skin.mediaurl = skinincparent.preloadData.mediaurl;
        skinincparent.skin.daturl = skinincparent.preloadData.dataurl;
        skinincparent.skin.skinidicon = skinincparent.preloadData.skinidicon;
        skinincparent.skin.icon_1 = skinincparent.preloadData.icon_1;
        skinincparent.skin.showheader = skinincparent.preloadData.showheader;
        skinincparent.skin.question_head = skinincparent.preloadData.question_head;
        skinincparent.skin.bottles = skinincparent.preloadData.bottles;

        skinincparent.facebook_status = skinincparent.preloadData.facebook_status;
        skinincparent.facebook_sdk = skinincparent.preloadData.facebook_sdk;
        skinincparent.facebook_url = skinincparent.preloadData.facebook_url;
        skinincparent.facebook_title = skinincparent.preloadData.facebook_title;
        skinincparent.facebook_description = skinincparent.preloadData.facebook_description;


        if (skinincparent.preloadData.serum) {
          skinincparent.serum.setSerum(skinincparent.preloadData.serum);
        }

        skinincparent.startApplication();
      }
    }
  }

  /*
   * send question and answer to backend
   */
  this.sendQuestionAnswer = function(tmpq) {
    if (tmpq.question_id && tmpq.answers) {
      var payload = {
        'phase' : 'answer',
        'session_id' : skinincparent.sessionid,
        'question_id' : tmpq.question_id,
        'answers' : tmpq.answers,
        'nextindex' : skinincparent.skin.getNextNode(),
        'platform' : skinincparent.platform,
        'platformsession' : encodeURI(skinincparent.platformSessionId),
        'platformuid' : skinincparent.userid,
        'storeid' : (typeof skinincparent.config.storeid !== 'undefined') ? skinincparent.config.storeid:null
      }

      skinincparent.skin.xhractionlock.push(skinincparent.skin.xhractionlock.length);


      if(!skinincparent.skin.getNextNode()){
        skinincparent.skin.loading(true);
        skinincparent.processBarcode();

        var barcodecolor = skinincparent.getBarcodeObject();
        payload.barcode = JSON.stringify(barcodecolor);


        skinincparent.getResponse(payload, skinincparent.showResults);

      } else {

        skinincparent.getResponse(payload, skinincparent.enableNextAnswer);

      }
    }
  }

  /*
   *
   * prepare barcode object
   *
   */
  this.getBarcodeObject = function()
  {
    var bc = document.getElementById('sidebar-barcode').childNodes;
    var obj = [];


    for (i = 0; i < bc.length; i++) {
      var line12 = bc[i].getAttribute('data-line');
      var color12 = bc[i].getAttribute('data-color');

      var tmpobj = {line: line12, color: color12};
      obj.push(tmpobj);
    }

    return obj;
  }

  /*
   * prepare answer,
   *
   * add answer to questions[]
   * add secum barcode questions
   * send answer to backend
   * close current block
   * open new question
   * save serum rank
   */
  this.prepAnswer = function(){
    // add answer to questions
    var tmpq = {
      'question_id' : skinincparent.skin.nodes[skinincparent.skin.currentquestion]['question_id'],
      'answers' : skinincparent.skin.answers
    }


    var hasquestion = false;
    for (var i = 0; i < skinincparent.skin.questions.length; i++) {
      if (skinincparent.skin.questions[i]["question_id"]==skinincparent.skin.nodes[skinincparent.skin.currentquestion]) {
        hasquestion = true;
        skinincparent.skin.questions[i]["answers"] = skinParent.answers;
      }
    }


    // get next status or next node
    var nextindex = skinincparent.skin.getNextNode();


    if(!hasquestion) {
      skinincparent.skin.questions.push(tmpq);
      skinincparent.processSerumRanking(skinincparent.skin.nodes[skinincparent.skin.currentquestion]['question_id']);
      skinincparent.processBarcode();
    }


    if(nextindex){

      skinincparent.sendQuestionAnswer(tmpq);
      skinincparent.skin.currentquestion = nextindex;
      skinincparent.openSkinQuestions();

    } else {

      skinincparent.finaxhrcheck = null;
      skinincparent.skin.loading(true);
      var intervalid = setInterval(function(){
        if(skinincparent.skin.xhractionlock.length<1){
          clearInterval(intervalid);
          skinincparent.sendQuestionAnswer(tmpq);
        }
      }, 50);

    }

  }

  /*
   * Add answer to question answers
   * You can't add answer until skinincparent.skin.xhractionlock is false
   * add answer id to answers[]
   * if multiple questions the set the question to active
   */
  this.addAnswer = function(el)
  {
    //if(skinincparent.skin.xhractionlock) return;

    var hasvalue = false;
    var multiselectRemove = false;
    var type = el.getAttribute('data-questiontype');
    var answerid = el.getAttribute('data-answerid');
    var questioninfo = skinincparent.skin.nodes[skinincparent.skin.currentquestion];
    var btncontinue = document.getElementById(skinincparent.skin.multichoicecontinuebtn+questioninfo['question_id']);
    el.classList.add('selected');

    for (var i = 0; i < skinincparent.skin.answers.length; i++) {
      if(skinincparent.skin.answers[i]==answerid) {
        hasvalue = true;

        if(type=='multiple'){
          multiselectRemove = true;
        } else {
          break;
        }
      }
    }


    if(multiselectRemove){
      // remove item from answers list
      el.classList.remove('selected');
      var itemremove = [];
      for (var i = 0; i < skinincparent.skin.answers.length; i++) {
        if(skinincparent.skin.answers[i]!=answerid) {
          itemremove.push(skinincparent.skin.answers[i]);
        }
      }
      skinincparent.skin.answers = itemremove;


      if(skinincparent.skin.answers.length<questioninfo['noof_answers'] && questioninfo['must_answer_all']==0){
        btncontinue.classList.add('btn-disable');
        btncontinue.setAttribute('data-status', 'disable');
      }


      return;
    }

    if(!hasvalue){

      skinincparent.skin.answers.push(answerid);


      if(type=='single'){

        if(skinincparent.skin.answers.length>0){
          skinincparent.prepAnswer();
        }

      } else {

        document.getElementById("answer_"+answerid).classList.add('active');


        var enableContinue = false;

        if(questioninfo['can_skip']==1){

          enableContinue = true;

        } else {


          if(questioninfo['must_answer_all']==1 && skinincparent.skin.answers.length==questioninfo['noof_answers'].length) {
            enableContinue = true;
          } else if(skinincparent.skin.answers.length>=questioninfo['noof_answers'] && questioninfo['must_answer_all']==0){
            enableContinue = true;
          }

        }


        if(enableContinue==true &&
          (btncontinue.getAttribute('data-status')=='disable')) {

          btncontinue.setAttribute('data-status', 'enable');
          btncontinue.classList.remove('btn-disable');


          if(!skinincparent.multiselectEventCheck){
            skinincparent.multiselectEventCheck = true;
            if(skinincparent.skin.isTouch){
              btncontinue.addEventListener("click", function(event){
                skinincparent.multiselectClick(this, event);
              });
            } else {
              btncontinue.addEventListener("touchstart", function(event){
                skinincparent.multiselectClick(this, event);
              });
            }
          }

        }
      }

    }
  }


  /*
   * Multiselect continue button
   */
  this.multiselectClick = function(el, event)
  {

    var datastatus = el.getAttribute('data-status');

    if(datastatus=='disable') {
      return;
    }

    // add answer to questions
    var tmpq = {
      'question_id' : skinincparent.skin.nodes[skinincparent.skin.currentquestion]['question_id'],
      'answers' : skinincparent.skin.answers
    }


    var hasquestion = false;
    for (var i = 0; i < skinincparent.skin.questions.length; i++) {
      if (skinincparent.skin.questions[i]["question_id"]==skinincparent.skin.nodes[skinincparent.skin.currentquestion]) {
        hasquestion = true;
        skinincparent.skin.questions[i]["answers"] = skinParent.answers;
      }
    }


    // get next status or next node
    var nextindex = skinincparent.skin.getNextNode();


    if(!hasquestion) {
      skinincparent.skin.questions.push(tmpq);
      skinincparent.processSerumRanking(skinincparent.skin.nodes[skinincparent.skin.currentquestion]['question_id']);
      skinincparent.processBarcode();
    }


    if(nextindex){

      skinincparent.skin.loading(true);
      skinincparent.sendQuestionAnswer(tmpq);
      skinincparent.skin.currentquestion = nextindex;

      skinincparent.openSkinQuestions();
      skinincparent.skin.loading(false);

    } else {

      skinincparent.finaxhrcheck = null;
      skinincparent.skin.loading(true);
      var intervalid = setInterval(function(){
        if(skinincparent.skin.xhractionlock.length<1){
          clearInterval(intervalid);
          skinincparent.sendQuestionAnswer(tmpq);
        }
      }, 50);

    }

  }


  /*
   *
   * Open question container and add click events to answers
   * After question is opened process serum
   */
  this.openSkinQuestions = function()
  {
    skinincparent.multiselectEventCheck = false;
    skinincparent.scrolltop(document.body, 0, 200);
    skinincparent.skin.openQuestion();
    skinincparent.actionButtons();

    var se = skinincparent.serum.getRankedSerums();


    var classname = document.getElementsByClassName("answer");
    for (var i = 0; i < classname.length; i++) {
      if(skinincparent.skin.isTouch){
        document.getElementById(classname[i].getAttribute('id')).addEventListener("click", function(){
          skinincparent.addAnswer(this);
        });
      } else {
        document.getElementById(classname[i].getAttribute('id')).addEventListener("touchstart", function(){
          skinincparent.addAnswer(this);
        });
      }
    }

    skinincparent.generateNumbering();
  }


  /*
   * Add to cart event listner
   */
  this.addToCartEventListner = function()
  {

    if(skinincparent.skin.currentquestion>=0){
      var btnel = document.getElementById('add-to-cart-form');

      btnel.addEventListener("submit", function(event){
        skinincparent.addToCartEvent(event);
      });
    }

  }

  /*
   * Add to cart event function
   */
  this.addToCartEvent = function(event)
  {
    event.preventDefault();
    var btnstatus = document.getElementById('add-to-cart-btn').getAttribute('data-status');
    if(btnstatus=='disable'){
      alert("Please finish the SKIN ID Wizard");
      return false;
    }


    var data_name = document.getElementById('skinid_name');
    var data_email = document.getElementById('skinid_email');
    if(data_name=='' || data_email==''){
      alert("Please enter your Name and Email");
      return false;
    }


    var bottlecolor = skinincparent.getSelectedBottleColor();
    var payload = {
      'phase' : 'result',
      'session_id' : skinincparent.sessionid,
      'name'	: data_name.value,
      'email'	: data_email.value,
      'platform' : skinincparent.platform,
      'platformsession' : encodeURI(skinincparent.platformSessionId),
      'platformuid' : skinincparent.userid,
      'bottlecolor' : bottlecolor,
      'storeid' : (typeof skinincparent.config.storeid !== 'undefined') ? skinincparent.config.storeid:null
    }

    skinincparent.getResponse(payload, skinincparent.addToCartPayload);
    return false;
  }

  /*
   * get selected bottle color
   */
  this.getSelectedBottleColor = function()
  {
    var bottlecolor = 'blue';
    var radios = document.getElementsByName('color');

    for (var i = 0, length = radios.length; i < length; i++)
    {
      if (radios[i].checked)
      {
        // do whatever you want with the checked radio
        bottlecolor = radios[i].value;

        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    return bottlecolor;
  }

  /*
   * get selected color
   */
  this.setSelectedColorImageClickEvent = function()
  {
    var radios = document.getElementsByName('color');

    for (var i = 0, length = radios.length; i < length; i++)
    {
      document.getElementById(radios[i].getAttribute('id')).addEventListener("click", function(event){

        for (var i = 0; i < skinincparent.skin.bottles.length; i++) {
          var name = skinincparent.skin.bottles[i]['name'];
          if(name.toLowerCase().indexOf(this.value)!=-1) {
            var img = skinincparent.skin.mediaurl+'/catalog/product'+skinincparent.skin.bottles[i]['image'];
            document.getElementById('bottle-pic').src = img
          }
        }
      });
    }

  }

  /*
   * check if given variable is a function
   */
  this.isFunction  = function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }


  /*
   * Payload Add to Cart
   */
  this.addToCartPayload =  function()
  {
    var data_name = document.getElementById('skinid_name');
    var data_email = document.getElementById('skinid_email');


    if(skinincparent.platform=='Shopify') {
      if(typeof skinincparent.response[0].payload.products !== 'undefined') {
        skinincparent.products = skinincparent.response[0].payload.products;
      }


      var payloadData = {
        name: data_name.value,
        email: data_email.value,
        bottlecolor: skinincparent.getSelectedBottleColor(),
        products: skinincparent.products

      }

      skinincparent.logger(payloadData);

      if(skinincparent.isFunction(skinincparent.config.onAddToCart)){
        skinincparent.config.onAddToCart(payloadData);
      }


      if(typeof skinincparent.response[0].payload.redirect_url !== 'undefined') {

        if(skinincparent.response[0].payload.redirect_url!==null) {
          location.href = skinincparent.response[0].payload.redirect_url;
        }

      }
    }
  }


  /*
   * Add action buttons for questions
   */
  this.actionButtons = function(){

    var qactions = document.getElementById('question-actions');
    qactions.innerHTML = '';

    if(skinincparent.skin.currentquestion>0){

      var qid = skinincparent.skin.questions[skinincparent.skin.questions.length - 1]['question_id'];
      var nodeid = skinincparent.skin.getNodeIdByQuestionId(qid);

      var backbtn = document.createElement('div');
      backbtn.className = 'btn btn-prev';
      backbtn.innerHTML = '<span class="icon ic2-chevron-prev"></span><span>Back</span>';
      backbtn.setAttribute("id", "q_question_id_"+ qid);
      backbtn.setAttribute("data-questionid", qid);
      backbtn.setAttribute("data-nodeid", nodeid);
      qactions.append(backbtn);

      backbtn.addEventListener("click", function(){
        skinincparent.changeCurrentNumber(this);
      });

      // if question can skip show skip button
      if(parseInt(skinincparent.skin.nodes[skinincparent.skin.currentquestion]['can_skip'])==1){
        var backbtn = document.createElement('div');
        backbtn.className = 'btn btn-prev';
        backbtn.innerHTML = '<span>Skip</span><span class="icon ic2-chevron-next"></span>';
        backbtn.setAttribute("id", "q_question_id_"+ qid);
        backbtn.setAttribute("data-questionid", qid);
        backbtn.setAttribute("data-nodeid", nodeid);
        qactions.append(backbtn);

        backbtn.addEventListener("click", function(){
          skinincparent.prepAnswer(this);
        });
      }
    }

  }


  /*
   * read questions array and create barcodes
   */
  this.processBarcode = function(){

    skinincparent.skin.clearBarcode();


    for (var i = 0; i < skinincparent.skin.questions.length; i++) {
      // go through questions answers and get serum details from node question id answers
      for (var qans = 0; qans < skinincparent.skin.questions[i].answers.length; qans++) {

        // go through the nodes and find question
        for (var step = 0; step < skinincparent.skin.nodes.length; step++) {

          if((skinincparent.skin.nodes[step]["question_id"]==skinincparent.skin.questions[i]["question_id"])) {

            // go through the nodes answers to find question answer id
            for (var nans = 0; nans < skinincparent.skin.nodes[step].answers.length; nans++) {

              if(skinincparent.skin.nodes[step].answers[nans]['answer_id']==skinincparent.skin.questions[i].answers[qans]){


                var serums = skinincparent.skin.nodes[step].answers[nans]['answer_serums'].split(",");
                var lines = (skinincparent.skin.nodes[step].answers[nans]['answer_lines']!==null) ? skinincparent.skin.nodes[step].answers[nans]['answer_lines'].split(",") : [];

                if(serums.length>0){
                  for (var j = 0; j < serums.length; j++) {

                    if(serums[j]==''){
                      continue;
                    }
                    var serumdetails = skinincparent.serum.getSerumDetails(serums[j]);
                    var llenght = (lines.length<serums.length && (j+1)>lines.length) ? '' : lines[j];

                    skinincparent.skin.generateBarcodeLine(llenght, serumdetails['color_code']);
                  }
                }

              }

            }

          }

        }
      }
    }
  }





  /*
   * read questions array and create serum ranking
   *
   */
  this.processSerumRanking = function(qid){

    for (var i = 0; i < skinincparent.skin.questions.length; i++) {
      for (var step = 0; step < skinincparent.skin.nodes.length; step++) {
        if((skinincparent.skin.nodes[step]["question_id"]==skinincparent.skin.questions[i]["question_id"]) &&
          (skinincparent.skin.questions[i]["question_id"]==qid)) {

          // go through questions answers and get serum details from node question id answers
          for (var qans = 0; qans < skinincparent.skin.questions[i].answers.length; qans++) {

            for (var nodeanswer = 0; nodeanswer < skinincparent.skin.nodes[step].answers.length; nodeanswer++) {

              if(skinincparent.skin.nodes[step].answers[nodeanswer]["answer_id"]==skinincparent.skin.questions[i].answers[qans]){
                var tmpserum = skinincparent.skin.nodes[step].answers[nodeanswer]['answer_serums'];

                var tmp = tmpserum.split(",");

                for (var scode = 0; scode < tmp.length; scode++) {

                  var tcode = skinincparent.serum.convertSerumIdToCode(tmp[scode]);
                  skinincparent.serum.setSortSerum(tcode);

                }

              }

            }

          }
        }
      }
    }

  }


  /*
   * Render numbers
   */
  this.generateNumbering = function(){
    skinincparent.skin.clearNumbering();
    var ncontainer = document.getElementById('question-numbers');

    if(skinincparent.skin.nodes.length<1){

      for (var num = 0; num < skinincparent.skin.nodes.length; num++) {
        var number = document.createElement('div');
        number.className = "s-step qnumbers";

        if(num==0) {
          number.className = "s-step active q_numbers";
        }
        number.innerHTML = num + 1;
        ncontainer.append(number);
      }

    } else {

      var counter = 0;
      for (var num = 0; num < skinincparent.skin.questions.length; num++) {
        counter++;
        var number = document.createElement('div');
        var nodeid = skinincparent.skin.getNodeIdByQuestionId(skinincparent.skin.questions[num]['question_id']);


        number.className = "s-step active q_numbers q_question_current_node_"+num;


        number.setAttribute("id", "q_question_id_"+ skinincparent.skin.questions[num]['question_id']);
        number.setAttribute("data-questionid", skinincparent.skin.questions[num]['question_id']);
        number.setAttribute("data-nodeid", nodeid);

        number.innerHTML = counter + '<div class="stripe"></div>';
        ncontainer.append(number);
        number.addEventListener("click", function(){
          skinincparent.changeCurrentNumber(this);
        });
      }

      var notogo = (skinincparent.skin.nodes.length - skinincparent.skin.currentquestion) + skinincparent.skin.questions.length;

      for (var i = skinincparent.skin.questions.length + 1; i <= notogo; i++) {
        var number = document.createElement('div');
        number.className = "s-step";
        number.setAttribute("id", "q_node_id_"+i);

        if((skinincparent.skin.questions.length<=0 && i==1) ||
          (i == skinincparent.skin.questions.length+1 )
        ) {
          number.setAttribute("class", "s-step active q_numbers_node" );
          number.innerHTML = i + '<div class="stripe"></div>';
        } else {
          number.setAttribute("class", "s-step q_numbers_node" );
          number.innerHTML = i;
        }

        ncontainer.append(number);

      }

    }
  }

  /*
   * Go to skinParent.currentquestion
   */
  this.changeCurrentNumber = function(el){
    var nodeid = el.getAttribute('data-nodeid');
    var qid = el.getAttribute('data-questionid');
    skinincparent.skin.currentquestion = nodeid;

    if(nodeid==0){
      skinincparent.skin.questions = [];
    } else {
      var newqid = 0;
      for (var i = 0; i < skinincparent.skin.questions.length; i++) {
        if(skinincparent.skin.questions[i]['question_id']==qid){
          newqid = i;
          skinincparent.skin.selectedAnswers = skinincparent.skin.questions[i]['answers']
        }
      }

      skinincparent.skin.questions.length = newqid;
    }

    skinincparent.processBarcode();
    skinincparent.openSkinQuestions();
  }


  /*
   * add redo quiz button
   */
  this.addRedoQuiz = function(){
    var controls = document.getElementById('controls-buttons');


    var redobutton = document.createElement('button');
    redobutton.className = 'btn';
    redobutton.setAttribute("type", "button");
    redobutton.setAttribute("id", "skinid-redo-button");
    redobutton.innerHTML = '<span class="icon ic2-btn-redo"></span><span>Redo quiz</span>';

    controls.append(redobutton);

    document.getElementById("skinid-redo-button").addEventListener("click", function(event){
      event.preventDefault();
      skinincparent.skin.loading(true);
      skinincparent.redoApplication();
    });

  }

  /*
   * Application redo
   */
  this.redoApplication = function(){
    skinincparent.skin.buildQuestionLayout();


    skinincparent.skin.currentquestion = 0;
    skinincparent.skin.questions = [];
    skinincparent.openSkinQuestions();
    skinincparent.skin.clearBarcode();
    skinincparent.skin.xhractionlock = [];

    skinincparent.skin.loading(false);
  }


  /*
   * Application Start,
   * add eventlistner to btn-start
   */
  this.startApplication = function(){
    skinincparent.skin.setSessionId(skinincparent.sessionid);
    skinincparent.skin.showLandingPage();

    document.getElementById("btn-start").addEventListener("click", function(){

      skinincparent.skin.buildQuestionLayout();
      skinincparent.skin.sidebarLayout();
      skinincparent.setSelectedColorImageClickEvent();

      skinincparent.addRedoQuiz();
      skinincparent.addFacebookShare();
      skinincparent.addPrint();

      skinincparent.skin.questions = [];
      skinincparent.openSkinQuestions();

      skinincparent.addToCartEventListner();
    });

    skinincparent.skin.loading(false);
  }

  /*
   * Add facebook share button
   */
  this.addFacebookShare = function(){
    if(skinincparent.facebook_status){

      if(skinincparent.facebook_sdk!=''){
        var scr = document.createElement('script');
        scr.append(skinincparent.facebook_sdk);
        document.head.append(scr);

      }


      var controls = document.getElementById('controls-buttons');
      var redobutton = document.createElement('button');
      redobutton.className = 'btn';
      redobutton.setAttribute("type", "button");
      redobutton.setAttribute("id", "skinid-facebook-button");
      redobutton.setAttribute("data-title", "Article Title");
      redobutton.setAttribute("data-desc", "Some description for this article");

      redobutton.innerHTML = '<span class="icon ic2-btn-share"></span><span>Share</span>';
      controls.append(redobutton);

      document.getElementById("skinid-facebook-button").addEventListener("click", function(event){
        event.preventDefault();


        FB.init({
          appId      : skinincparent.facebook_appid,
          xfbml      : true,
          version    : 'v3.2'
        });

        var obj = {
          method: 'feed',
          link: skinincparent.facebook_url,
          title: skinincparent.facebook_title,
          description: skinincparent.facebook_description,
        };
        FB.ui(obj);
      });

    }
  }

  /*
   * Add print button and cuntion
   */
  this.addPrint = function()
  {
    var controls = document.getElementById('controls-buttons');
    var redobutton = document.createElement('button');
    redobutton.className = 'btn';
    redobutton.setAttribute("type", "button");
    redobutton.setAttribute("id", "skinid-print-button");

    redobutton.innerHTML = '<span class="icon ic2-btn-print"></span><span>Print</span>';

    controls.append(redobutton);

    document.getElementById("skinid-print-button").addEventListener("click", function(event){
      event.preventDefault();
      skinincparent.generatePrint();
    });
  }

  /*
   * Add print function and cuntion
   */
  this.generatePrint = function()
  {
    var qcontainer = document.createElement('ul');


    if(skinincparent.skin.questions.length>0){
      for (var i = 0; i < skinincparent.skin.questions.length; i++) {

        var q  = skinincparent.getNodeQuestionByQuestionId(skinincparent.skin.questions[i]["question_id"]);
        var li = document.createElement('li');
        li.innerHTML = q.question_title;

        var answerslist = document.createElement('ul');
        if(skinincparent.skin.questions[i]["answers"].length<=0){

          var ansli = document.createElement('li');
          ansli.innerHTML = 'Skipped';
          answerslist.append(ansli);

        } else {

          for(var ans = 0; ans < skinincparent.skin.questions[i]["answers"].length; ans++) {


            for(var step = 0; step < q.answers.length; step++){

              if(skinincparent.skin.questions[i]["answers"][ans]==q.answers[step].answer_id){

                var ansli = document.createElement('li');
                ansli.innerHTML = q.answers[step].answer_title;
                answerslist.append(ansli);
              }

            }

          }

        }


        li.append(answerslist);
        qcontainer.append(li);
      }
    }


    var sectionprint = document.getElementById('section-to-print');
    sectionprint.innerHTML = '';

    var result_section = document.getElementById('result_section');

    if(result_section!=null){
      var sectionresult = document.createElement('div');
      sectionresult.className = 'section-container section-result';


      sectionprint.append(sectionresult);
      sectionresult.innerHTML = result_section.innerHTML;
    }


    sectionprint.append(qcontainer);
    window.print();
  }

  /*
   * Get Node question by question id
   */
  this.getNodeQuestionByQuestionId = function(qid)
  {

    for (var step = 0; step < skinincparent.skin.nodes.length; step++) {
      if((skinincparent.skin.nodes[step]["question_id"]==qid) ) {
        return skinincparent.skin.nodes[step];
      }
    }

    return false;
  }


  /*
   * facebook call back
   */
  this.FBCallback = function(){

  }


  /*
   * Load at the end of domLoadAfter
   */
  this.loadAfter = function(){

  }

  /*
   * Show error
   */
  this.showError = function(){
    console.log("Waiting Action");
  }

  /*
   * post data to payload url
   */
  this.getResponse = function(payload, callback, disableNextAnswers){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {

        var obj = JSON.parse(this.responseText);

        if (obj) {

          skinincparent.response = obj;

          callback();

        } else {

          skinincparent.showError(xhr.statusText);

        }

      } else {

        skinincparent.showError(xhr.statusText);

      }

    };

    if(disableNextAnswers) {
      skinincparent.disableNextAnswer();
    }

    skinincparent.response = null;


    var param = skinincparent.prepXhrParam(payload);

    xhr.open("POST", skinincparent.prepPayload(payload), true);

    xhr.setRequestHeader( "Content-Type", "application/json" );

    xhr.send(param);
  }

  /*
   * get cookie
   */
  this.getCookie = function(name) {

    var value = "; " + document.cookie;

    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));


    var parts = value.split("; " + name + "=");

    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  /*
   * save cookie
   */
  this.setCookie = function(cname, cvalue) {

    var d = new Date();

    d.setTime(d.getTime() + skinincparent.cookieExpire);

    var expires = "expires=" + d.toUTCString();
    if(skinincparent.sessionExpireBrowserClose){
      expires = "expires=false";
    }

    document.cookie = cname + "=" + cvalue + "; " + expires + ";";
  }


  /*
   * check if cookie exsist
   */
  this.hasCookie = function(cname) {
    var value = "; " + document.cookie;

    var parts = value.split("; " + cname + "=");
    if (parts.length == 2)
      return true;
    return false;
  }

  /*
   * get current session id
   */
  this.getCurrentSession = function(sessionid) {
    if (skinincparent.hasCookie(sessionid)) {
      return skinincparent.getCookie(sessionid);
    }
    return false;
  }

  /*
   * Get preload data in cookie
   */
  this.getLocalStorage = function() {
    if (skinincparent.apikey && skinincparent.hasCookie(skinincparent.localStoreageId)) {
      var data = skinincparent.getCookie(skinincparent.localStoreageId);
      var decodeData = decodeURIComponent(data);
      return JSON.parse(decodeData);
    }
    return false;
  }

  /*
   * Save data to local storage
   */
  this.setLocalStorage = function(value) {
    if (skinincparent.useLocalStorage) {
      var json = JSON.stringify(value);
      var tmp = encodeURIComponent(json);
      skinincparent.setCookie(skinincparent.localStoreageId, tmp);
    }
  }

  /*
   * disable answers in new questions this will enable when we have xhr back
   * from backend
   */
  this.disableNextAnswer = function() {
    var elements = document
      .getElementsByClassName(skinincparent.answersactionClass);

    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('btn-disable');
    }
  }

  /*
   * enable answers in new questions after response for last answer
   * check if last node, if so
   */
  this.enableNextAnswer = function() {
    skinincparent.skin.xhractionlock.pop();

    var elements = document
      .getElementsByClassName(skinincparent.answersactionClass);

  }

  /*
   * Scroll to top when question start
   */
  this.scrolltop = function(element, to, duration)
  {
    var start = element.scrollTop,
      change = to - start,
      increment = 20;

    var animateScroll = function(elapsedTime) {
      elapsedTime += increment;
      var position = skinincparent.easeInOut(elapsedTime, start, change, duration);
      element.scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(function() {
          animateScroll(elapsedTime);
        }, increment);
      }
    };

    animateScroll(0);
  }


  /*
   * easeInOut animation
   */
  this.easeInOut = function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }

  /*
   * Open results
   * Assign result data
   *
   * add display text array data
   * set serum skin problems
   * set serum images and data to daily dose
   */
  this.showResults = function(){
    skinincparent.skin.openResult();

    skinincparent.finalresult = skinincparent.response[0].payload;

    skinincparent.logger(skinincparent.finalresult);

    for (var i = 0; i < skinincparent.response[0].payload.displaytext.length; i++) {
      var bodydata = document.getElementById(skinincparent.response[0].payload.displaytext[i][0]);
      if(bodydata!=null){
        bodydata.innerHTML = skinincparent.response[0].payload.displaytext[i][1];
      }
    }

    for (var j = 0; j < skinincparent.response[0].payload.serumresults.length; j++) {
      var serumdetails = skinincparent.serum.getSerumDetails(skinincparent.response[0].payload.serumresults[j]['id']);
      if(j == 2) {
        var selector = 'three';
      } else if (j == 1){
        var selector = 'two';
      } else {
        var selector = 'one';
      }

      document.getElementById('dose-'+selector+'-pic').innerHTML = '<img src="'+skinincparent.skin.mediaurl+serumdetails.serum_icon+'" alt="'+serumdetails.title+'" />';
      document.getElementById('dose-'+selector+'-ttl').innerHTML = serumdetails.title;
      document.getElementById('dose-'+selector+'-txt').innerHTML = serumdetails.benefit;

      document.getElementById('r-serum-'+selector+'-pic').innerHTML = '<img src="'+skinincparent.skin.icon_1+'" alt="" />';
      document.getElementById('r-serum-'+selector+'-ttl').innerHTML = serumdetails.diagnosis;
      document.getElementById('r-serum-'+selector+'-txt').innerHTML = serumdetails.description;
    }

    var nci = skinincparent.skin.skinidicon;
    if(skinincparent.response[0].payload.barcodeimage!=''){
      nci = skinincparent.response[0].payload.barcodeimage;
    }

    document.getElementById('r-identity-pic').innerHTML = '<img src="'+nci+'" alt="" />';
    document.getElementById('add-to-cart-btn').setAttribute('data-status', 'enable');

    if(skinincparent.response[0].status=='success'){
      //append price to product-price__ttl
      if(skinincparent.response[0].payload.showprice==="1"){
        document.getElementById('product-price__ttl').append(skinincparent.response[0].payload.products.price);
      }
      skinincparent.products = skinincparent.response[0].payload.products.products;
    }
    skinincparent.processBarcode();
    skinincparent.skin.loading(false);
  }

  this.bootstrap();

}

    (function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


//initSkinid();
