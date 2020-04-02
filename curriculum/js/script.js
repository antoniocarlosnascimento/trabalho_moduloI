// Anima ao Scroll
// ==================================
const selecaoElemento = document.querySelectorAll.bind(document);

function initAnimacaoScroll(elemento, classe) {
  
  if (elemento.length) {
    const windowMatade = window.innerHeight * 0.8;
    function animaScroll() {
      elemento.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const isSectionVisible = (sectionTop - windowMatade) < 0;
        if (isSectionVisible) {
          section.classList.add(classe);
        } else {
          section.classList.remove(classe);
        }
      })
    }
    animaScroll();
    window.addEventListener('scroll', animaScroll);
  }

}

initAnimacaoScroll(selecaoElemento('.js__scroll__direita'), 'ativo');
initAnimacaoScroll(selecaoElemento('.js__scroll__esquerda'), 'ativo');


// Trocar de folhas css
// ==================================
const botaoCss = document.querySelectorAll('button');
const folhaCss = document.querySelector('link[data-folhaCss=""]');
const host = window.location.host;

function trocarFolhaCss(){
  
  botaoCss.forEach((value, index) => {
    value.addEventListener('click', function(){
      folhaCss.setAttribute('href', "css/folha"+(index+1)+".css");
      // console.log(folhaCss)
    })
  });
}

trocarFolhaCss();

