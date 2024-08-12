document.addEventListener('DOMContentLoaded', function(){
    let alturaElement = document.querySelector('#bodyHeight');
    let pesoElement = document.querySelector('#bodyWeight');
    let sistemaMetrico = document.querySelector('#radioMetric');
    let sistemaImperial = document.querySelector('#radioImperial');
    let altura = 0;
    let peso = 0;
    let sistema = '';
    let resultado = '';

    sistemaMetrico.addEventListener('change', function() {
        if (sistemaMetrico.value == 'on') {
            sistema = 'metrico';
            document.getElementById('bodyHeightCMouINCH').innerHTML = 'cm';
            document.getElementById('bodyWeightKGouLB').innerHTML = 'kg';
            if (alturaElement.value > 0 && pesoElement.value > 0) {
                alturaElement.value *= 2.54;
                pesoElement.value /= 2.205;
            }
        }
    })
    sistemaImperial.addEventListener('change', function() {
        if (sistemaImperial.value == 'on') {
            sistema = 'imperial';
            document.getElementById('bodyHeightCMouINCH').innerHTML = 'in';
            document.getElementById('bodyWeightKGouLB').innerHTML = 'lb';
            if (alturaElement.value > 0 && pesoElement.value > 0) {
                alturaElement.value /= 2.54;
                pesoElement.value *= 2.205;
            }
        }
    })

    alturaElement.addEventListener("keypress", function(e) {
        
        if (sistema == 'metrico') {
            if(e.key === "," || e.key === ".") {
                e.preventDefault();
            }
        }
    });

    pesoElement.addEventListener("keypress", function(e) {
        
        if (sistema == 'metrico') {
            if(e.key === "," || e.key === ".") {
                e.preventDefault();
            }
        }
    });
    
    alturaElement.addEventListener('change', function() {
        altura = alturaElement.value;
        if (altura > 0 && peso > 0) {
            resultado = calcularIMC(altura, peso, sistema);
            exibeResultado(resultado);
        }
    })
    pesoElement.addEventListener('change', function() {
        peso = pesoElement.value;
        if (altura > 0 && peso > 0) {
            resultado = calcularIMC(altura, peso, sistema);
            exibeResultado(resultado);
        }
    })


    function calcularIMC(_altura, _peso, _sistema) {
        let imc = 0;
        if (_sistema === 'metrico') {
            _altura /= 100;
            imc = _peso / (_altura * _altura);
        } else if (_sistema === 'imperial') {
            imc = (_peso / (_altura * _altura)) * 703;
        } else {
            alert("Invalid system. Choose 'metric' or 'imperial'.");
            alturaElement.value = '';
            pesoElement.value = '';
            altura = 0;
            peso = 0;
            throw new Error("Invalid system. Choose 'metric' or 'imperial'.");
        }
    
        let classificacao, faixaSaudavel;
        
        if (imc < 18.5) {
            classificacao = 'Underweight';
            faixaSaudavel = 'Healthy BMI is between 18.5 and 24.9.';
        } else if (imc >= 18.5 && imc < 24.9) {
            classificacao = 'Normal weight';
            faixaSaudavel = 'Stay within this range!';
        } else if (imc >= 25 && imc < 29.9) {
            classificacao = 'Overweight';
            faixaSaudavel = 'Healthy BMI is between 18.5 and 24.9.';
        } else if (imc >= 30 && imc < 34.9) {
            classificacao = 'Class I obesity';
            faixaSaudavel = 'Healthy BMI is between 18.5 and 24.9.';
        } else if (imc >= 35 && imc < 39.9) {
            classificacao = 'Class II obesity';
            faixaSaudavel = 'Healthy BMI is between 18.5 and 24.9.';
        } else {
            classificacao = 'Class III obesity';
            faixaSaudavel = 'Healthy BMI is between 18.5 and 24.9.';
        }
    
        return {
            imc: imc.toFixed(2),
            classificacao: classificacao,
            faixaSaudavel: faixaSaudavel
        };
    }

    function exibeResultado(resultado) {
        document.getElementById('yourBMI').innerHTML = 'Your BMI is...';
        document.getElementById('BMI').innerHTML = resultado.imc;
        document.getElementById('suggests').innerHTML = `Classification: ${resultado.classificacao}<br>Healthy band: ${resultado.faixaSaudavel}`;
        console.log(`IMC: ${resultado.imc}`);
        console.log(`Classificação: ${resultado.classificacao}`);
        console.log(`Faixa saudável: ${resultado.faixaSaudavel}`);
    }
})
