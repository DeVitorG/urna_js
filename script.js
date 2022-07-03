let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
     for(let i=0;i<etapa.numeros;i++) {
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
     }
    seuVotoPara.style.display =  'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    console.log("Candidato", candidato);
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
           fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`; //parei aqui 03:24 03/07
        }else{
            fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`; //parei aqui 03:24 03/07
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
        }
    }
function clicou(n){
    
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }
    playAudio('urna_tecla');
}
function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;

    } else{
        alert("Para votar em branco não pode ter digitado nenhum número, por gentileza, corrigir e realizar novamente seu voto!!!");
    }
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if(votoBranco === true){
        votoConfirmado = true;
        console.log("Confirmando como Branco...");
    }   else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando como "+numero);
    }   else{
        alert("Por gentileza, digite o número de um candidato válido, para continuar corrija e tente novamente!");
    }
    playAudio('urna_fim1');
        if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            playAudio('urna_fim');
        }
    }
}
function playAudio(sound){
    var snd = new Audio(`./sound/${sound}.mp3`);
    snd.play();
}
comecarEtapa();