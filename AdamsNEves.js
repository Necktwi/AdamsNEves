/**
*Author: Gowtham Kudupudi
*Date: 1 Oct, 2017
*License: MIT
**/
AdamsNEves=[];
mammal = function() {
  if(!this.constructor===mammal){
    return;
  }
  this.doLove = function(mate) {
    if (mate && mate !== this && (mate.__proto__ instanceof mammal) && mate.sex !== this.sex) {
      var baby = {};
      baby.__proto__ = new mammal();
      for (var i in this) {
        baby[i] = this[i];
      }
      baby.babies = [];
      this.babyCount++;
      mate.babyCount++;
      baby.babyCount = 0;
      baby.name = "";
      if(this.sex == "male"){
        baby.dad=this;
        baby.mom=mate;
      }else{
        baby.dad=mate;
        baby.mom=this;
      }
      baby.dob = Date();
      baby.sex = parseInt(Math.random() * 10) >= 5 ? "male" : "female";
      this.babies.push(baby);
      mate.babies.push(baby);
      return baby;
    }
  };
  this.babyCount = 0;
  this.babies = [];
  this.sex = "";
  this.__defineSetter__("sex", function() {
    if (arguments.caller === this.doLove) {
      if (argument[0] === "male") {
        return "male";
      } else if (argument[0] === "female") {
        return "female";
      }
    }
  });
  this.__defineSetter__("mom", function() {
    var AdamNEve=false;
    var i=0;
    for(i=0;i < AdamsNEves.length; ++i){
      if(AdamsNEves[i]===this){
        AdamNEve=true;
        break;
      }
    }
    if(AdamNEve){
      AdamsNEves.splice(i, 1);

    }
    if(!this.mom){
      this.mom=arguments[0];
      this.mom.babies.push(this);
    }
  })
  this.__defineSetter__("dad", function(){
    var AdamNEve=false;
    var i=0;
    for(i=0;i < AdamsNEves.length; ++i){
      if(AdamsNEves[i]===this){
        AdamNEve=true;
        break;
      }
    }
    if(AdamNEve){
      AdamsNEves.splice(i, 1);

    }
    if(!this.dad){
      this.dad=arguments[0];
      this.dad.babies.push(this);
    }
  })
  this.daDaDaDa=function(){
    var dadadada=[];
    var dad=this.dad;
    while(!dad){
      dadadada.push(dad);
      dad=dad.dad;
    }
    return dadadada;
  }
  this.getOurGrandestDad=function(somemammal){
    var myDadadada = this.daDaDaDa();
    var itsDadadada = somemammal.daDaDaDa();
    var myDadaCount = myDadadada.length-1;
    var itsDadaCount = itsDadadada.length-1;
    var ourGreatestDad = (myDadadada[myDadaCount]==itsDadadada[itsDadaCount])?myDadadada[myDadaCount]:null;
    if(ourGreatestDad){
      var elder, younger;
      var elderDada, youngerDada;
      var elderDadaCount, youngerDadaCount;
      var ourYoungestGrandDad;
      if(myDadaCount<itsDadaCount){
        elder=this;
        elderDada=myDadadada;
        elderDadaCount=myDadaCount;
        younger=somemammal;
        youngerDada=itsDadadada;
        youngerDadaCount=itsDadaCount;
      }else{
        elder=somemammal;
        elderDada=itsDadadada;
        elderDadaCount=itsDadaCount;
        younger=this;
        youngerDada=myDadadada;
        youngerDadaCount=myDadaCount;
      }
      while(elderDadaCount>-1){
        if(elderDada[elderDadaCount]===youngerDada[youngerDadaCount]){
          ourYoungestGrandDad=elderDada[elderDadaCount];
          --elderDadaCount;
          --youngerDadaCount;

        }else{
          break;
        }
      }

    }
    if(ourYoungestGrandDad){
      return ourYoungestGrandDad;
    }
  }
  this.pathTo=function(someMammal){
    var boundary={};
    var content=new Set();
    boundary=new Map();
    var Track_ = function(){
      if(!this.constructor===Track_)return false;
      this.path=[];
      this.traceSet={};
    }
    boundary.set(this, new Track_());
    var currentNode=this;
    while(true){
      var track=boundary.get(currentNode);
      var NewTrack=new Track_();
      var Path=[];
      for(var i=0;i<track.path.length;i++)Path.push(track.path[i]);
      NewTrack.path=Path;
      if(!track.traceSet.Mom){
        if(!content.has(currentNode.Mom) && !boundary.has(currentNode.Mom)){
          boundary.set(currentNode.Mom, NewTrack);
        }
        track.traceSet.Mom=currentNode.Mom;
        NewTrack.path.push("Mom");
        if(currentNode.Mom===someMammal)break;
      }else if(!track.traceSet.Dad){
        if(!content.has(currentNode.Dad) && !boundary.has(currentNode.Mom)){
          boundary.set(currentNode.Dad, NewTrack);
        }
        track.traceSet.Dad=currentNode.Dad;
        NewTrack.path.push("Dad")
        if(currentNode.Dad===someMammal)break;
      }else if (!track.traceSet.babies || track.traceSet.babies.length<currentNode.babies.length) {
        if(!track.traceSet.babies){
          track.trackSet.babies=[];
          NewTrack.path.push("babies");
        }
        var babyIndex = track.trackSet.babies.length;
        if(!content.has(currentNode.babies[babyIndex]) || !boundary.has(currentNode.babies[babyIndex])){
          boundary.set(currentNode.babies[babyIndex],NewTrack);
        }
        track.traceSet.babies.push(currentNode.babies[babyIndex]);
        NewTrack.path.push(babyIndex);
        if(currentNode.babies[babyIndex]===someMammal)break;
      }else{
        content.add(currentNode);
        boundary.delete(currentNode);
        currentNode=boundary.keys().next().value;
      }
    }
    if(boundary.has(someMammal)){
      return boundary.get(someMammal).path;
    }
  }
}

kittyTheMotherOfAllCats = {
  __proto__: new mammal(),
  shout: function() {
    return "meow";
  },
  name: "kittyTheMotherOfAllCats",
  sex: "female"
};
kittuTheFatherOfAllCats = {
  __proto__: new mammal(),
  shout: function() {
    return "meow";
  },
  name: "kittuTheFatherOfAllCats",
  sex: "male"
};
humanCount=0;
function human(dialogue){
  if(this.constructor !== human){
    return;
  }
  this.__proto__ = new mammal();
  this.serial=humanCount++;
  this.relationWith= function(someOne){
    if(otherHuman.__proto__ instanceof human){
      var Path=pathTo(someOne);
      var Relation="self";
      var Relative=this;
      var PreRelation="self";
      for(int i=0;i<Path.length;i++){
        Relation=Path[i];
        Relative=Relative[Relation];
        if(PreRelation==="self"&&Relation==="Mom"){
          PreRelation="Mom";
        }else if(){
        return "mom";
      }else if(){
        return "dad";
      }else if(){
        return "momsis";
      }else if(){
        return "aunt";
      }else if(){
        return "dadbro";
      }else if(){
        return "uncle";
      }else if(){
        return "mapa";
      }else if(){
        return "mama";
      }else if(){
        return "papa";
      }else if(){
        return "pama";
      }else if(){
        return "bro";
      }else if(){
        return "sis";
      }else if(){
        return "bav";
      }else if(){
        return "mar";
      }else{
        return "noRelation";
      }
    }
  }
  }
}
function Adam(name){
  if(this.constructor === Adam){
    this.__proto__=new human();
    this.sex="male";
    this.name=name;
    AdamsNEves.push(this);
  }else{
    return null;
  }
}

function Eve(name){
  if(this.constructor === Eve){
    this.__proto__=new human();
    this.sex="female";
    this.name=name;
    AdamsNEves.push(this);
  }else{
    return null;
  }
}
