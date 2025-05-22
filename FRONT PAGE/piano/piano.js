let synth;      
// arrays for mapping
let mykeys = [65,83,68,70,71,72,73,74,75,76,192,222]; // a - ä
let basenotes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
 
function setup() {
   
  createCanvas(window.innerWidth,window.innerHeight);
   
  initSynth();
   
}
 
 
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
 
 
function draw() {
  background(255,10);
}
 
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
 
function keyPressed(){
 
  
   
   
  let cnote = returnMappedNote(keyCode);
   
  //console.log(cnote);
   
   let now = Tone.now();
  synth.triggerAttackRelease( cnote, "4n", now );
 
 
}
 
 
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
 
function returnMappedNote(  _v ){
 
 
     let xdid = width/mykeys.length;
 
    for(let i=0; i< mykeys.length;i++){
     
        if( mykeys[i] == _v){
         
          //console.log("found key input" + _v );
          //console.log("this is the note: " +  basenotes[i]);
           
           
          noStroke();
          fill(0);
          rect( i*xdid,0,xdid,height );
           
           
          return basenotes[i] + "5";
           
           
        }
     
    }
   
   
  return false;
   
}
 
 
 
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
 
 
 
 
function initSynth(){
 
   
   synth = new Tone.PolySynth();
   synth.polyphony = 32;
   
   
   synth.options.envelope.attack = .03; 
   synth.options.envelope.release = .5;
   synth.options.envelope.sustain = .2;
   synth.options.envelope.decay = .1;
   
   
   synth.options.oscillator.modulationType = "sine";
   synth.options.oscillator.harmonicity = .5;
   synth.options.oscillator.type = "sine2";
   synth.options.oscillator.partials = [.9,.701 ];
   
   synth.volume.value = -8;
   
   synth.chain( Tone.Destination);
   
   console.log(synth);
   
  
}
