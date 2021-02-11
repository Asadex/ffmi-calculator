//Checking the posisiton for fixed calculator

function checkOffset() {
    var a=$(document).scrollTop()+window.innerHeight;
    var b=$('footer').offset().top;
    if (a<b) {
      $('#calculator').css('top', '4.8rem');
    } else {
      $('#calculator').css('top', (-.6*(a-b-10))+'px');
    }
  }

$(document).ready(checkOffset);

$(document).scroll(checkOffset);


// Calculator////////////////////////////////////

//INPUTS
const HEIGHT = document.getElementById('height');
const WEIGHT = document.getElementById('weight');
const FAT = document.getElementById('fat');

const HEIGHT_UNITS = document.getElementById('height-units');
const WEIGHT_UNITS = document.getElementById('weight-units');

//OUTPUTS
const FFMI = document.getElementById('ffmi');
const NFFMI = document.getElementById('nffmi');
const FFM = document.getElementById('ffm');
const BF = document.getElementById('bf');

const FFMI_UNITS = document.getElementById('ffmi-units');
const NFFMI_UNITS = document.getElementById('nffmi-units');
const FFM_UNITS = document.getElementById('ffm-units');
const BF_UNITS = document.getElementById('bf-units');


//EVENT LISTENERS
HEIGHT.onkeyup = () => calculate();
WEIGHT.onkeyup = () => calculate();
FAT.onkeyup = () => calculate();

HEIGHT_UNITS.onchange = () => calculate();
WEIGHT_UNITS.onchange = () => calculate();

FFMI_UNITS.onchange = () => calculate();
NFFMI_UNITS.onchange = () => calculate();
FFM_UNITS.onchange = () => calculate();
BF_UNITS.onchange = () => calculate();

//Calculate function
function calculate(){
  if(validateHeight() && validateWeight() && validateFat()){
    FFM.textContent = calculateFfm();
    BF.textContent = calculateBf();
    FFMI.textContent = calculateFfmi();
    NFFMI.textContent = calculateNffmi();
  }
}


// Validations
function validateHeight(){
  return true
}

function validateWeight(){
  return true
}

function validateFat(){
  return true
}


//Calculations
function calculateFfm(){
  let ffm;
  let weight = WEIGHT.value;
  let fat = FAT.value;
  let weight_units = WEIGHT_UNITS.value;
  let ffm_units = FFM_UNITS.value;
  
  if(weight_units === 'lb')
    weight = changeToKg(weight);

  ffm = (weight * (1 - (fat/100))).toFixed(1);
  return (ffm_units === 'kg') ? ffm  : changeToLb(ffm)
}

function calculateBf(){
  let bf;
  let weight = WEIGHT.value;
  let fat = FAT.value;
  let weight_units = WEIGHT_UNITS.value;
  let bf_units = BF_UNITS.value;
  
  if(weight_units === 'lb')
    weight = changeToKg(weight);

  bf = (weight * (fat/100)).toFixed(1);;
  return (bf_units === 'kg') ? bf  : changeToLb(bf)
}

function calculateFfmi(){
  let ffm = (FFM_UNITS.value === 'kg') ? FFM.textContent : changeToKg(FFM.textContent);
  let height = HEIGHT.value;
  let height_units = HEIGHT_UNITS.value;
  let ffmi = 0;

  if (height_units === 'cm')
     height = height / 100;
  
  ffmi = (ffm / (height * height)).toFixed(2);
  return (FFMI_UNITS.value === 'kg') ? (+ffmi).toFixed(1) : changeToLb(ffmi).toFixed(1);

}

function calculateNffmi(){
  let ffmi = (FFMI_UNITS.value === 'kg') ? (+FFMI.textContent) : +changeToKg(FFMI.textContent);
  let height = HEIGHT.value;
  let height_units = HEIGHT_UNITS.value;
  let nffmi = 0;

  if (height_units === 'cm')
     height = height / 100;
  
  nffmi = +(ffmi + (6.1 * (1.8 - height)));
  return (NFFMI_UNITS.value === 'kg') ? nffmi.toFixed(1) : changeToLb(nffmi).toFixed(1);

}


//Converters
function changeToLb(kg){
  return Math.round(kg * 2.2046)
}

function changeToKg(lb){
  return Math.round(lb / 2.2046)
}

/////////////////////////////////////////////////