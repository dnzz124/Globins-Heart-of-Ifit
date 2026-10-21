const $ = id => document.getElementById(id);

const screens = {
    menu: $('menu'),
    intro: $('introScreen'),
    characters: $('characterScreen'),
    mood: $('moodScreen'),
    game: $('gameScreen'),
    ending: $('endingScreen')
};

const canvas = $('gameCanvas');
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;


/* =========================
   PERSONAGENS
========================= */

const characters = [
    {
        name:'Ttu Tanno',
        element:'TERRA',
        description:'Ligado à terra e às raízes do mundo.',
        image:'images/ttu.png',
        weapon:1,
        route:['Floresta','Vila Verde','Caverna','Mina Antiga','Rio','Ruinas']
    },

    {
        name:'Ecca',
        element:'NATUREZA',
        description:'Uma presença silenciosa entre pedras e raízes.',
        image:'images/ecca.png',
        weapon:0,
        route:['Caverna','Mina Antiga','Vila Verde','Floresta','Rio','Ruinas']
    },

    {
        name:'Mangália',
        element:'VIDA',
        description:'Encontrou no rio um lugar para chamar de casa.',
        image:'images/mangalia.png',
        weapon:2,
        route:['Rio','Vila Verde','Floresta','Caverna','Mina Antiga','Ruinas']
    },

    {
        name:'Pi Tombio',
        element:'AREIA',
        description:'Pequeno, curioso e sempre pronto para explorar.',
        image:'images/tombio.png',
        weapon:3,
        route:['Floresta','Rio','Vila Verde','Mina Antiga','Caverna','Ruinas']
    },

    {
        name:'Kuzko',
        element:'TERRA',
        description:'Resistente como as pedras que atravessa.',
        image:'images/kuzko.png',
        weapon:1,
        route:['Caverna','Mina Antiga','Rio','Vila Verde','Floresta','Ruinas']
    },
];


/* =========================
   HUMORES
========================= */

const moods = {

    feliz:{
        name:'FELIZ',
        speed:3.2
    },

    calmo:{
        name:'CALMO',
        speed:1.8
    },

    curioso:{
        name:'CURIOSO',
        speed:2.4
    },

    triste:{
        name:'TRISTE',
        speed:1.4
    },

    corajoso:{
        name:'CORAJOSO',
        speed:3.6
    }

};


/* =========================
   CENÁRIOS
========================= */

const backgrounds = {

    Floresta:{
        sky:'#182a1d',
        ground:'#3d5538',
        grass:'#526c43'
    },

    Caverna:{
        sky:'#101519',
        ground:'#292f31',
        grass:'#3b4545'
    },

    Rio:{
        sky:'#132c35',
        ground:'#486047',
        grass:'#607653'
    },

    Ruinas:{
        sky:'#29251f',
        ground:'#4a4338',
        grass:'#655a48'
    },

    'Vila Verde':{
        sky:'#263d36',
        ground:'#4d6945',
        grass:'#66804b'
    },

    'Mina Antiga':{
        sky:'#111b1c',
        ground:'#343b37',
        grass:'#52604c'
    }

};


/* =========================
   DIÁLOGOS
========================= */

const dialogues = {

    Floresta:[
        [
            'NARRADOR',
            'As árvores se movem com o vento. Existem várias saídas à sua frente.'
        ],

        [
            'NARRADOR',
            'As folhas balançam suavemente enquanto você observa o ambiente.'
        ],

        [
            '???',
            'O vento parece apontar para algum lugar além das árvores.'
        ]
    ],

    Caverna:[
        [
            'NARRADOR',
            'As paredes guardam marcas antigas e túneis esquecidos.'
        ],

        [
            '???',
            'O som da água ecoa pela caverna.'
        ],

        [
            'NARRADOR',
            'Pequenos cristais brilham entre as pedras.'
        ]
    ],

    Rio:[
        [
            'NARRADOR',
            'A correnteza atravessa a região e nunca parece ficar parada.'
        ],

        [
            'NARRADOR',
            'A água reflete a luz enquanto pequenas ondas passam pela margem.'
        ],

        [
            '???',
            'Talvez o caminho mais óbvio não seja o único.'
        ]
    ],

    Ruinas:[
        [
            'NARRADOR',
            'Ruínas antigas surgem entre a vegetação.'
        ],

        [
            'NARRADOR',
            'O tempo tomou conta das pedras e das antigas construções.'
        ],

        [
            '???',
            'Você encontra marcas que parecem pertencer a outros viajantes.'
        ]
    ],

    'Vila Verde':[
        ['NARRADOR','A Vila Verde parece tranquila, mas cada rua guarda uma história. Os caminhos levam à praça, ao rio e às casas antigas.'],
        ['MORADORA','Se for procurar baús, entre nas casas abandonadas. Os Mimics se escondem onde ninguém espera encontrar um tesouro.'],
        ['NARRADOR','O cheiro de pão vem da praça, bandeirolas dançam no vento e, por trás das janelas, ainda há coisas esquecidas.']
    ],

    'Mina Antiga':[
        ['NARRADOR','A entrada da antiga mineradora range atrás de você. Trilhos enferrujados desaparecem na escuridão.'],
        ['NARRADOR','Cristais presos às paredes pulsam com uma luz fraca. Há marcas de ferramentas e pegadas recentes na poeira.'],
        ['???','Se houver um baú aqui, alguém o deixou por um motivo... ou algo está esperando que você o abra.']
    ]

};

/*
 * O viajante idoso tem três conversas.
 * Cada vez que o jogador fala com ele, a conversa avança.
 */
const oldManConversations = [
    [
        [
            'VIAJANTE IDOSO',
            'Ah... mais alguém atravessando a floresta. Não caminhe olhando só para frente.'
        ],
        [
            'VIAJANTE IDOSO',
            'As coisas mais perigosas desta ilha costumam parecer inofensivas.'
        ],
        [
            'VIAJANTE IDOSO',
            'Se encontrar um baú sozinho, observe a fechadura. Se ela piscar... afaste-se.'
        ]
    ],
    [
        [
            'VIAJANTE IDOSO',
            'Você voltou. Então talvez tenha ouvido meu aviso.'
        ],
        [
            'VIAJANTE IDOSO',
            'Chamam aquela criatura de Mimic. Ela se disfarça de baú comum, esperando alguém se aproximar.'
        ],
        [
            'VIAJANTE IDOSO',
            'Não se aproxime sem estar pronto para lutar. Nem todo tesouro vale o risco.'
        ]
    ],
    [
        [
            'VIAJANTE IDOSO',
            'Eu já vi aventureiros correrem atrás de riquezas e esquecerem por que entraram na ilha.'
        ],
        [
            'VIAJANTE IDOSO',
            'As ruínas apontam para o coração da ilha, mas os caminhos mudam conforme quem os percorre.'
        ],
        [
            'VIAJANTE IDOSO',
            'Leve sua arma à mão. Quando o baú respirar, você já estará perto demais.'
        ]
    ]
];


/* =========================
   ESTADO
========================= */

const game = {

    character:null,
    mood:null,

    location:null,
    routeIndex:0,

    running:false,
    finished:false,

    dialogueOpen:false,
    dialogueIndex:0,
    activeDialogueList:null,
    npcConversationIndex:0,
    dialogueMode:'linear',
    dialogueNode:null,
    dialogueReturnToChoices:false,
    afterDialogueAction:null,
    dialogueActionExecutedIndex:-1,
    actionAtDialogueIndex:-1,
    oldManFlags:{mimicHint:false,ruinsHint:false,receivedHerb:false,askedAboutIsland:false,askedAboutHeart:false,askedIdentity:false},
    forceMimic:false,
    chestStates:{},
    chestBattleId:null,
    itemsFound:[],
    discoveredLocations:[],
    mapOpen:false,
    mapMode:'world',

    routeOpen:false,

    battle:false,
    defending:false,

    enemy:null,

    exitCooldown:0,

    paused:false,

    animationTime:0

};


const player = {

    x:55,
    y:240,

    width:34,
    height:46,

    direction:'right',

    moving:false,

    frame:0,
    timer:0,

    walkOffset:0,

    jumping:false,
    jumpTime:0,

    hp:100,
    maxHP:100

};


const keys = {
    up:false,
    down:false,
    left:false,
    right:false
};

// Baús posicionados no cenário. Os Mimics parecem baús comuns até o jogador interagir.
const chestSpots = [
    // Baús fixos: só dentro de casas e da antiga mineradora. Nunca surgem aleatoriamente no chão.
    {id:'vila-casa-2',scene:'Vila Verde',house:'casa-2',x:650,y:375,mapX:225,mapY:112,kind:'normal'},
    {id:'vila-casa-3-mimic',scene:'Vila Verde',house:'casa-3',x:480,y:365,mapX:675,mapY:115,kind:'mimic'},
    {id:'vila-casa-5',scene:'Vila Verde',house:'casa-5',x:455,y:370,mapX:130,mapY:335,kind:'normal'},
    {id:'vila-casa-6-mimic',scene:'Vila Verde',house:'casa-6',x:465,y:370,mapX:590,mapY:330,kind:'mimic'},
    {id:'mina-baú-1',scene:'Mina Antiga',house:'mina',x:330,y:365,mapX:0,mapY:0,kind:'normal'},
    {id:'mina-baú-2-mimic',scene:'Mina Antiga',house:'mina',x:690,y:355,mapX:0,mapY:0,kind:'mimic'}
];

const worldMapNodes = [
    {name:'Floresta',x:115,y:100},
    {name:'Caverna',x:265,y:220},
    {name:'Vila Verde',x:385,y:105},
    {name:'Rio',x:495,y:235},
    {name:'Ruinas',x:555,y:95},
    {name:'Mina Antiga',x:385,y:285}
];


/* =========================
   IMAGENS
========================= */

const playerImage = new Image();
let playerImageLoaded = false;

const enemyImage = new Image();
let enemyImageLoaded = false;
const enemyBattleImage = $('enemyImage');

// Arte original do Mimic enviada pela equipe.
const mimicImage = new Image();
let mimicImageLoaded = false;

const oldPersonImage = new Image();
let oldPersonLoaded = false;

const weaponImage = new Image();
let weaponImageLoaded = false;

const enemyPortrait = document.createElement('span');
enemyPortrait.id = 'enemyPortraitEmoji';
enemyPortrait.textContent = '📦👁️';
enemyPortrait.style.cssText = [
    'display:none',
    'width:42px',
    'height:42px',
    'align-items:center',
    'justify-content:center',
    'font-size:25px',
    'image-rendering:pixelated'
].join(';');
enemyBattleImage.insertAdjacentElement('afterend', enemyPortrait);

enemyImage.src = 'images/inimigo.png';
mimicImage.src = 'images/mimics.png';
oldPersonImage.src = 'images/Old_person.png';
weaponImage.src = 'images/weapons.png';

playerImage.onload = () => {
    playerImageLoaded = true;
};

playerImage.onerror = () => {
    playerImageLoaded = false;
};

enemyImage.onload = () => {
    enemyImageLoaded = true;
};

enemyImage.onerror = () => {
    enemyImageLoaded = false;
};

mimicImage.onload = () => {
    mimicImageLoaded = true;
};

mimicImage.onerror = () => {
    mimicImageLoaded = false;
};

oldPersonImage.onload = () => {
    oldPersonLoaded = true;
};

oldPersonImage.onerror = () => {
    oldPersonLoaded = false;
};

weaponImage.onload = () => {
    weaponImageLoaded = true;
};

weaponImage.onerror = () => {
    weaponImageLoaded = false;
};


/* =========================
   FOLHAS E ELEMENTOS
========================= */

const forestLeaves = [

    {x:70,y:125,s:0.7,p:0.0},
    {x:150,y:105,s:1.0,p:1.4},
    {x:245,y:145,s:0.8,p:2.1},
    {x:330,y:115,s:1.1,p:3.2},
    {x:430,y:135,s:0.9,p:4.4},
    {x:520,y:105,s:0.75,p:5.1},
    {x:625,y:150,s:1.05,p:0.9},
    {x:720,y:118,s:0.85,p:2.8},
    {x:815,y:142,s:1.15,p:4.8},
    {x:900,y:110,s:0.8,p:1.9}

];


const forestGrass = [

    {x:25,y:270,p:0.3},
    {x:90,y:300,p:1.2},
    {x:180,y:280,p:2.4},
    {x:275,y:310,p:0.8},
    {x:370,y:285,p:3.4},
    {x:475,y:315,p:1.7},
    {x:585,y:275,p:4.1},
    {x:690,y:305,p:2.6},
    {x:790,y:285,p:0.5},
    {x:880,y:315,p:3.0},
    {x:945,y:275,p:1.0}

];


const riverBubbles = [

    {x:60,y:235,w:20,s:0.8,p:0},
    {x:180,y:255,w:30,s:1.1,p:1.2},
    {x:300,y:225,w:18,s:0.9,p:2.3},
    {x:430,y:265,w:28,s:1.2,p:3.5},
    {x:570,y:235,w:24,s:0.7,p:4.4},
    {x:700,y:260,w:35,s:1.0,p:2.2},
    {x:835,y:230,w:22,s:1.15,p:5.0}

];


/* =========================
   TELAS
========================= */

function showScreen(name){
    Object.values(screens).forEach(screen => { if(screen) screen.classList.add('hidden'); });
    if(screens[name]) screens[name].classList.remove('hidden');
}


function resetKeys(){

    Object.keys(keys).forEach(
        key => keys[key] = false
    );

}


function goMenu(){

    introRunning = false;
    if (typeof introAnimFrame !== 'undefined') cancelAnimationFrame(introAnimFrame);
    game.running = false;
    game.battle = false;
    game.routeOpen = false;
    game.dialogueOpen = false;
    game.paused = false;

    resetKeys();

    $('pauseOverlay').classList.add('hidden');
    $('routeButtons').classList.add('hidden');
    $('battleUI').classList.add('hidden');
    $('enemyHealth').classList.add('hidden');
    $('dialogue').classList.add('hidden');
    if($('dialogueChoices')) $('dialogueChoices').classList.add('hidden');

    showScreen('menu');

}


/* =========================
   PERSONAGENS
========================= */

function createCharacterCards(){

    const container = $('characters');

    container.innerHTML = '';

    characters.forEach((character,index)=>{

        const card =
            document.createElement('button');

        card.className =
            'character-card';

        card.type =
            'button';

        card.innerHTML = `

            <span class="character-number">
                0${index + 1}
            </span>

            <img
                class="character-image"
                src="${character.image}"
                alt="${character.name}"
                draggable="false">

            <h2>
                ${character.name}
            </h2>

            <div class="character-element">
                ${character.element}
            </div>

            <p class="character-description">
                ${character.description}
            </p>

        `;

        card.addEventListener(
            'click',
            ()=>{

                document
                    .querySelectorAll('.character-card')
                    .forEach(
                        element =>
                            element.classList.remove(
                                'selected'
                            )
                    );

                card.classList.add('selected');

                game.character = character;

                introWaitingForCharacter = false;
                setTimeout(()=>showScreen('mood'),100);

            }
        );

        container.appendChild(card);

    });

}


/* =========================
   MENU
========================= */

$('startButton').addEventListener('click', beginAdventure);

function beginAdventure(){
    introRunning = false;
    clearTimeout(introAdvanceTimer);
    introWaitingForCharacter = false;
    game.character = null;
    startCinematicIntro(0);
}


/* =========================
   INTRO CINEMATOGRÁFICA
   As falas possuem data-voice-key para futura dublagem.
   Avançar: botão, toque na área de cena, Enter ou Espaço.
========================= */
const introCanvas = $('introCanvas');
const introCtx = introCanvas.getContext('2d');
introCtx.imageSmoothingEnabled = false;
const introTitle = $('introSceneTitle');
const introNarration = $('introNarration');
const introCounter = $('introCounter');
const introChapter = $('introChapter');
const introProgress = $('introProgress');
const introNextButton = $('introNextButton');
const introSkipButton = $('skipIntroButton');
const introSpeakerLabel = (()=>{ const el=document.createElement('span'); el.id='introSpeakerLabel'; el.className='intro-speaker-label'; el.textContent='NARRADOR'; introTitle.parentElement.insertBefore(el,introTitle); return el; })();
let introSceneIndex = 0;
let introAnimFrame = 0;
let introStartTime = 0;
let introLastTime = 0;
let introParticles = [];
let introRunning = false;
let introRevealTimer = null;
let introAdvanceTimer = null;
let introTextFullyShown = false;
const INTRO_SCENE_DURATION = 8200; // cenas curtas e automáticas; CONTINUAR e PULAR seguem disponíveis
let introWaitingForCharacter = false;

const introScenes = [
 {chapter:'ABERTURA',title:'Um Mundo, Vários Caminhos',voice:'intro_banner_00',text:'Cinco irmãos. Cinco dimensões. Uma jornada entre mundos, laços e segredos. Tudo começa em uma floresta que guarda um livro antigo.',kind:'banner'},
 {chapter:'PRÓLOGO',title:'Cinco irmãos, uma floresta',voice:'intro_hunt_01',text:'Cinco irmãos goblins costumavam sair juntos para caçar. Conheciam os sons da mata, dividiam o que encontravam e sempre voltavam para casa lado a lado.',kind:'hunt'},
 {chapter:'A DESCOBERTA',title:'O livro entre as raízes',voice:'intro_book_02',text:'Em uma caçada, encontraram um livro antigo escondido sob as raízes de uma árvore. A capa pulsava com uma luz que nenhum deles jamais tinha visto.',kind:'book'},
 {chapter:'O VERSO',title:'Uma frase que não deveria ser lida',voice:'intro_verse_03',speaker:'NARRADOR',text:'As páginas se abriram sozinhas. Um verso parecia chamar por uma voz. O irmão que você escolher será aquele que vai recitá-lo.',kind:'choose'},
 {chapter:'ANTES DO FEITIÇO',title:'Ninguém deveria ler em voz alta',voice:'intro_sibling_03b',speaker:'IRMÃO MAIS VELHO',text:'“Não toque nas letras. Esse livro estava escondido por alguma razão.” Um dos irmãos tentou fechar a capa, mas as páginas não obedeceram.',kind:'book'},
 {chapter:'A RESPOSTA DO LIVRO',title:'As palavras já tinham sido ouvidas',voice:'intro_sibling_03c',speaker:'IRMÃO ESCOLHIDO',text:'“Raízes que prendem, caminhos que chamam; abram-se os mundos, que os cinco encontrem suas chamas...” O irmão escolhido recitou o verso. As letras começaram a brilhar antes mesmo que ele terminasse.',kind:'spell'},
 {chapter:'O FEITIÇO',title:'A voz do irmão escolhido',voice:'intro_spell_04',text:'Assim que o irmão escolhido pronunciou as palavras, as letras saíram do papel e giraram ao redor dos cinco. O chão tremeu. O livro estava lançando um feitiço.',kind:'spell'},
 {chapter:'A RUPTURA',title:'Cinco portais se abriram',voice:'intro_portals_05',text:'A magia rasgou o ar em cinco portais. Os irmãos tentaram alcançar uns aos outros, mas cada portal os puxou em uma direção diferente.',kind:'portals'},
 {chapter:'AS DIMENSÕES',title:'Cada irmão, um mundo',voice:'intro_biomes_06',text:'Um foi lançado na floresta sem fim; outro, em cavernas profundas; os demais despertaram entre rios, dunas e ruínas. Eram biomas separados, como dimensões diferentes.',kind:'biomes'},
 {chapter:'SOZINHOS',title:'Longe de casa',voice:'intro_alone_07',text:'Pela primeira vez, os cinco estavam sozinhos. O livro desapareceu, mas uma página ficou marcada na memória: para voltar, precisariam encontrar o caminho de volta uns aos outros.',kind:'alone'},
 {chapter:'O VERDADEIRO OBJETIVO',title:'O Coração da Ilha',voice:'intro_heart_08',text:'A magia também revelou um segredo: o Coração da Ilha está enfraquecendo. Se os irmãos conseguirem se reunir, talvez possam encontrar o Coração e salvar a ilha antes que seja tarde.',kind:'heart'},
 {chapter:'CINCO CAMINHOS',title:'Pistas espalhadas por cinco dimensões',voice:'intro_paths_09',text:'Cada irmão terá de explorar seu próprio mundo, superar perigos e descobrir pistas. Nenhum deles sabe exatamente onde os outros foram parar.',kind:'paths'},
 {chapter:'O COMEÇO',title:'Um Mundo, Vários Caminhos',voice:'intro_title_10',text:'Cinco irmãos. Cinco dimensões. Um reencontro que pode salvar a ilha. Sua jornada começa agora.',kind:'title'}
];

const introStartButton = $('introStartButton');
const introBannerImage = new Image();
let introBannerLoaded = false;
introBannerImage.onload = () => { introBannerLoaded = true; };
introBannerImage.onerror = () => { introBannerLoaded = false; };
introBannerImage.src = 'images/banner_intro.png';

function startCinematicIntro(startAt = 0){
    clearTimeout(introRevealTimer);
    clearTimeout(introAdvanceTimer);
    cancelAnimationFrame(introAnimFrame);
    introSceneIndex = 0;
    introRunning = true;
    introStartTime = performance.now();
    introLastTime = introStartTime;
    // Leaves use stable random properties and only move during the animation.
    introParticles = Array.from({length:30},(_,i)=>({
        x:Math.random()*960, y:Math.random()*540,
        r:2+Math.random()*4, s:.22+Math.random()*.62,
        p:Math.random()*Math.PI*2, type:i%5,
        drift:8+Math.random()*19, alpha:.25+Math.random()*.48
    }));
    showScreen('intro');
    const introScreen = $('introScreen');
    introScreen.classList.add('banner-only');
    $('menu').classList.add('hidden');
    if(introStartButton) introStartButton.hidden = false;
    if(introSkipButton) introSkipButton.hidden = true;
    const topline = introScreen.querySelector('.cinema-topline');
    const caption = introScreen.querySelector('.cinema-caption');
    const vignette = introScreen.querySelector('.cinema-vignette');
    if(topline) topline.hidden = true;
    if(caption) caption.hidden = true;
    if(vignette) vignette.hidden = true;
    introAnimFrame = requestAnimationFrame(drawCinematicIntro);
}

function setIntroScene(index){
    introSceneIndex = Math.max(0,Math.min(index,introScenes.length-1));
    const scene = introScenes[introSceneIndex];
    introChapter.textContent = scene.chapter;
    introTitle.textContent = scene.title;
    introSpeakerLabel.textContent = scene.speaker || (scene.kind==='character' ? scene.character || 'NARRADOR' : 'NARRADOR');
    introNarration.textContent = scene.text;
    introNarration.dataset.voiceKey = scene.voice;
    introCounter.textContent = `CENA ${introSceneIndex+1} / ${introScenes.length}`;
    introProgress.style.width = `${((introSceneIndex+1)/introScenes.length)*100}%`;
    introNextButton.innerHTML = introSceneIndex === introScenes.length-1 ? 'ESCOLHER PERSONAGEM <span aria-hidden="true">→</span>' : 'CONTINUAR <span aria-hidden="true">→</span>';
    introTextFullyShown = true;
    introNarration.style.opacity = '0';
    introTitle.style.opacity = '0';
    requestAnimationFrame(()=>{
        introNarration.style.transition = 'opacity .5s ease';
        introTitle.style.transition = 'opacity .5s ease';
        introNarration.style.opacity = '1';
        introTitle.style.opacity = '1';
    });
    // A abertura nunca fica parada esperando o jogador descobrir o botão.
    // A cena do livro dá tempo para escolher um irmão; depois a história continua.
    clearTimeout(introAdvanceTimer);
    if(introRunning){
        introAdvanceTimer = setTimeout(()=>{
            if(introRunning && introSceneIndex === index) advanceCinematicIntro();
        }, INTRO_SCENE_DURATION);
    }
}

function startIntroStory(){
    if(!introRunning) return;
    const introScreen = $('introScreen');
    introScreen.classList.remove('banner-only','is-fading');
    if(introStartButton) introStartButton.hidden = true;
    if(introSkipButton) introSkipButton.hidden = false;
    const topline = introScreen.querySelector('.cinema-topline');
    const caption = introScreen.querySelector('.cinema-caption');
    const vignette = introScreen.querySelector('.cinema-vignette');
    if(topline) topline.hidden = false;
    if(caption) caption.hidden = false;
    if(vignette) vignette.hidden = false;
    setIntroScene(0);
}

function advanceCinematicIntro(){
    if(!introRunning) return;
    if($('introScreen').classList.contains('banner-only')){
        startIntroStory();
        return;
    }
    if(introSceneIndex < introScenes.length - 1){
        setIntroScene(introSceneIndex + 1);
        return;
    }
    finishCinematicIntro();
}

function finishCinematicIntro(){
    if(!introRunning) return;
    introRunning = false;
    cancelAnimationFrame(introAnimFrame);
    clearTimeout(introRevealTimer);
    clearTimeout(introAdvanceTimer);
    const introScreen = $('introScreen');
    if(introScreen){
        introScreen.classList.remove('banner-only');
        introScreen.classList.add('is-fading');
    }
    if(introStartButton) introStartButton.hidden = true;
    if(introSkipButton) introSkipButton.hidden = true;
    introWaitingForCharacter = false;
    setTimeout(()=>{
        createCharacterCards();
        if(game.character) showScreen('mood');
        else { showScreen('characters'); screens.characters.classList.add('screen-entering'); setTimeout(()=>screens.characters.classList.remove('screen-entering'),700); }
        if(introScreen) introScreen.classList.remove('is-fading');
    },850);
}

introNextButton.addEventListener('click',advanceCinematicIntro);
introSkipButton.addEventListener('click',finishCinematicIntro);
if(introStartButton) introStartButton.addEventListener('click',startIntroStory);
// The banner is deliberately not clickable as a whole: only the CTA advances it.
document.addEventListener('keydown',event=>{
    if(!introRunning) return;
    if(['Enter','Space','ArrowRight'].includes(event.code)){
        event.preventDefault();
        if($('introScreen').classList.contains('banner-only')) startIntroStory(); else advanceCinematicIntro();
    } else if(event.code === 'Escape'){
        event.preventDefault();
        finishCinematicIntro();
    }
});

function drawCinematicIntro(timestamp){
    if(!introRunning) return;
    const c = introCtx;
    const dt = Math.min(40, timestamp-introLastTime || 16);
    introLastTime = timestamp;
    const time = (timestamp-introStartTime)/1000;
    c.clearRect(0,0,960,540);

    // Draw the original banner as a completely still background, cropped only enough
    // to fill the cinematic frame without stretching the artwork.
    if(introBannerLoaded){
        const iw=introBannerImage.naturalWidth, ih=introBannerImage.naturalHeight;
        const scale=Math.max(960/iw,540/ih);
        const dw=iw*scale, dh=ih*scale;
        c.drawImage(introBannerImage,(960-dw)/2,(540-dh)/2,dw,dh);
    }else{
        const fallback=c.createLinearGradient(0,0,0,540);
        fallback.addColorStop(0,'#092a2b'); fallback.addColorStop(1,'#103d32');
        c.fillStyle=fallback;c.fillRect(0,0,960,540);
        c.fillStyle='#f4e9bf';c.textAlign='center';c.font='bold 42px Georgia';
        c.fillText('UM MUNDO, VÁRIOS CAMINHOS',480,260);
    }

    // Soft shafts of sunlight slipping through gaps in the canopy. Their position and
    // intensity shift very slowly; the banner art itself never moves.
    c.save();
    c.globalCompositeOperation='screen';
    const rays=[
        {x:215,w:105,shift:18,phase:.2},
        {x:375,w:90,shift:-15,phase:1.8},
        {x:540,w:120,shift:22,phase:3.2},
        {x:705,w:88,shift:-18,phase:4.6},
        {x:825,w:72,shift:14,phase:5.3}
    ];
    for(const ray of rays){
        const sway=Math.sin(time*.24+ray.phase)*ray.shift;
        const pulse=.035+.035*(.5+.5*Math.sin(time*.72+ray.phase));
        const x=ray.x+sway;
        const grad=c.createLinearGradient(x,45,x+ray.w*.45,495);
        grad.addColorStop(0,`rgba(200,255,163,${pulse*.24})`);
        grad.addColorStop(.48,`rgba(178,255,154,${pulse})`);
        grad.addColorStop(1,'rgba(155,255,164,0)');
        c.fillStyle=grad;
        c.beginPath();
        c.moveTo(x-ray.w*.16,0);
        c.lineTo(x+ray.w*.18,0);
        c.lineTo(x+ray.w*.5+sway*.22,500);
        c.lineTo(x-ray.w*.55+sway*.12,500);
        c.closePath();c.fill();
    }
    // A gentle patch of light breathes in the opening between the trees.
    const glowAlpha=.035+.025*(.5+.5*Math.sin(time*.55));
    const glow=c.createRadialGradient(500,295,12,500,295,360);
    glow.addColorStop(0,`rgba(176,255,163,${glowAlpha})`);
    glow.addColorStop(1,'rgba(176,255,163,0)');
    c.fillStyle=glow;c.fillRect(0,0,960,540);
    c.restore();

    // Falling leaves: small pixel-like shapes drift down with a gentle sideways sway.
    for(let i=0;i<introParticles.length;i++){
        const leaf=introParticles[i];
        const y=(leaf.y + time*(17+leaf.s*17))%590-25;
        const x=(leaf.x + Math.sin(time*.65+leaf.p)*leaf.drift + time*(leaf.type%2?3:-2)+1000)%1000-20;
        const rot=Math.sin(time*.9+leaf.p)*.85;
        const colors=['#b7e78b','#75c875','#d0efa1','#48a879','#d7e9a0'];
        c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha=leaf.alpha;
        c.fillStyle=colors[leaf.type];
        c.fillRect(-leaf.r,-leaf.r*.45,leaf.r*2,leaf.r*.9);
        c.fillRect(-leaf.r*.25,-leaf.r*.9,leaf.r*.8,leaf.r*1.8);
        c.fillStyle='rgba(238,255,189,.55)';c.fillRect(-leaf.r*.5,-leaf.r*.15,leaf.r,1);
        c.restore();
    }

    // Fine dust glints catch the light between the leaves, not over the whole title.
    for(let i=0;i<22;i++){
        const x=(i*137+Math.sin(time*.3+i)*22+960)%960;
        const y=(i*71-time*(5+(i%4)*2)+900)%490+20;
        const twinkle=.15+.45*(.5+.5*Math.sin(time*1.8+i*1.7));
        c.fillStyle=`rgba(225,255,190,${twinkle*.45})`;
        c.fillRect(x,y,2,2);
    }

    if(introRunning) introAnimFrame=requestAnimationFrame(drawCinematicIntro);
}

function drawGoblin(c,x,y,scale,color,t,pose=0){
    c.save(); c.translate(x,y); c.scale(scale,scale);
    const bob=Math.sin(t*2.5+x*.02)*2;
    c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0,32,19,5,0,0,Math.PI*2); c.fill();
    // feet and tunic
    c.fillStyle='#3b3027'; c.fillRect(-11,17+bob,8,13); c.fillRect(4,17+bob,8,13);
    c.fillStyle=color; c.fillRect(-15,-7+bob,30,27); c.fillRect(-11,-13+bob,22,9);
    // ears
    c.fillStyle=color; c.beginPath(); c.moveTo(-12,-25+bob); c.lineTo(-29,-36+bob); c.lineTo(-24,-14+bob); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(12,-25+bob); c.lineTo(29,-36+bob); c.lineTo(24,-14+bob); c.closePath(); c.fill();
    // head and hair
    c.fillStyle=color; c.fillRect(-17,-35+bob,34,29);
    c.fillStyle='#243027'; c.fillRect(-17,-37+bob,34,8); c.fillRect(-14,-42+bob,8,6); c.fillRect(4,-42+bob,8,6);
    c.fillStyle='#f4e9bf'; c.fillRect(-10,-24+bob,5,6); c.fillRect(5,-24+bob,5,6);
    c.fillStyle='#1a211b'; c.fillRect(-8,-22+bob,2,4); c.fillRect(7,-22+bob,2,4);
    c.fillStyle='#26352a'; c.fillRect(-4,-12+bob,9,2);
    // hunting spear / small satchel
    c.fillStyle='#8c6845';
    if(pose===1){ c.fillRect(18,-28+bob,3,58); c.fillStyle='#c5c7b4'; c.fillRect(16,-34+bob,7,8); }
    else { c.fillRect(-22,-1+bob,8,12); c.fillStyle='#c4a56a'; c.fillRect(-24,0+bob,12,3); }
    c.restore();
}

function drawGoblinHunt(c,t){
    drawIntroIsland(c,t,false);
    c.fillStyle='rgba(8,15,10,.18)'; c.fillRect(0,0,960,540);
    const colors=['#78a95e','#79b7a2','#c78ab1','#c8a065','#a5a16a'];
    for(let i=0;i<5;i++) drawGoblin(c,250+i*115,375+(i%2)*12,1.12,colors[i],t+i*.3,i===2?1:0);
    // drifting leaves and little movement marks
    for(let i=0;i<14;i++){const x=(i*83+t*18)%960,y=130+(i*37)%220; c.fillStyle='rgba(185,218,139,.65)';c.fillRect(x,y,5,2);}
    c.fillStyle='#f1e8cb';c.font='bold 15px monospace';c.textAlign='center';c.fillText('A CAÇADA DOS CINCO IRMÃOS',480,95);
}

function drawMagicBookScene(c,t,asking){
    drawIntroIsland(c,t,false);
    c.fillStyle='rgba(4,10,7,.42)';c.fillRect(0,0,960,540);
    // root nest
    c.strokeStyle='#4c6841';c.lineWidth=12;c.lineCap='round';
    for(let i=0;i<7;i++){c.beginPath();c.moveTo(300+i*50,390);c.quadraticCurveTo(390+i*25,330+Math.sin(t+i)*8,350+i*52,300);c.stroke();}
    c.save();c.translate(480,310+Math.sin(t*1.5)*4);c.rotate(Math.sin(t*.7)*.025);
    const glow=.5+.5*Math.sin(t*2.2);
    c.fillStyle=`rgba(112,206,177,${.12+.16*glow})`;c.beginPath();c.arc(0,0,105+glow*12,0,Math.PI*2);c.fill();
    c.fillStyle='#52372c';c.fillRect(-82,-56,164,118);c.fillStyle='#c8b27e';c.fillRect(-75,-61,70,110);c.fillRect(5,-61,70,110);
    c.fillStyle='#e8dbad';c.fillRect(-68,-54,60,96);c.fillRect(8,-54,60,96);
    c.strokeStyle='#5f7956';c.lineWidth=2;c.strokeRect(-61,-46,47,78);c.strokeRect(15,-46,47,78);
    c.fillStyle='#3f765b';c.font='bold 26px serif';c.textAlign='center';c.fillText('✦',-38,-5);c.fillText('✧',38,18);
    c.strokeStyle=`rgba(151,245,213,${.45+.45*glow})`;c.lineWidth=2;c.beginPath();c.arc(0,0,88+glow*8,0,Math.PI*2);c.stroke();c.restore();
    if(asking){
      const cols=['#78a95e','#79b7a2','#c78ab1','#c8a065','#a5a16a'];
      for(let i=0;i<5;i++) drawGoblin(c,260+i*110,425,0.66,cols[i],t+i*.3,i===2?1:0);
      c.fillStyle='#fff0b6';c.font='bold 15px monospace';c.textAlign='center';c.fillText('QUAL DELES VAI RECITAR O VERSO?',480,180);
    }
}

function drawGoblinSpell(c,t,chosen){
    const bg=c.createLinearGradient(0,0,0,540);bg.addColorStop(0,'#17172c');bg.addColorStop(1,'#304b3a');c.fillStyle=bg;c.fillRect(0,0,960,540);
    for(let i=0;i<5;i++){const a=i*1.256+t*.25,x=480+Math.cos(a)*190,y=270+Math.sin(a)*90;c.fillStyle=`rgba(137,235,200,${.3+.3*Math.sin(t*2+i)})`;c.beginPath();c.arc(x,y,4+Math.sin(t*2+i)*2,0,Math.PI*2);c.fill();}
    drawGoblin(c,480,360,2.1,({ 'Ttu Tanno':'#78a95e','Ecca':'#79b7a2','Mangália':'#c78ab1','Pi Tombio':'#c8a065','Kuzko':'#a5a16a' })[chosen?.name]||'#78a95e',t,1);
    // floating runes circle
    c.strokeStyle=`rgba(160,255,213,${.55+.3*Math.sin(t*3)})`;c.lineWidth=3;c.beginPath();c.ellipse(480,270,130+Math.sin(t*2)*8,55+Math.sin(t*2)*5,0,0,Math.PI*2);c.stroke();
    c.fillStyle='#e5ffd9';c.font='bold 19px serif';c.textAlign='center';c.fillText('ᚠ ᚱ ᚨ  ✦  ᚲ ᚢ ᚾ',480,277);
    c.fillStyle='#c5ffe3';c.font='bold 13px monospace';c.fillText((chosen?.name||'O IRMÃO ESCOLHIDO').toUpperCase()+' RECITA O VERSO',480,115);
}

function drawGoblinPortals(c,t){
    drawIntroIsland(c,t,true);c.fillStyle='rgba(7,8,20,.42)';c.fillRect(0,0,960,540);
    const cols=['#77d49a','#87bde9','#68d5e1','#e2bd72','#b7a2ef'];
    const names=['FLORESTA','CAVERNA','RIO','DUNAS','RUÍNAS'];
    for(let i=0;i<5;i++){
      const x=105+i*187,y=290+Math.sin(t*1.5+i)*5;
      c.fillStyle=cols[i]+'22';c.beginPath();c.ellipse(x,y,63+Math.sin(t*2+i)*4,108+Math.sin(t*2+i)*6,0,0,Math.PI*2);c.fill();
      c.strokeStyle=cols[i];c.lineWidth=5;c.beginPath();c.ellipse(x,y,42+Math.sin(t*2+i)*3,83+Math.sin(t*2+i)*4,0,0,Math.PI*2);c.stroke();
      c.strokeStyle=cols[i]+'99';c.lineWidth=2;c.beginPath();c.ellipse(x,y,27,65,Math.sin(t+i)*.1,0,Math.PI*2);c.stroke();
      drawGoblin(c,x,y+27,.64,cols[i],t+i*.4,i===2?1:0);
      c.fillStyle='#f2ecd8';c.font='bold 11px monospace';c.textAlign='center';c.fillText(names[i],x,408);
    }
}

function drawGoblinBiomes(c,t,alone){
    const panels=[
      {x:0,color:'#477d4e',label:'FLORESTA'},
      {x:192,color:'#464c5c',label:'CAVERNA'},
      {x:384,color:'#377e94',label:'RIO'},
      {x:576,color:'#ba9a58',label:'DUNAS'},
      {x:768,color:'#756b87',label:'RUÍNAS'}
    ];
    panels.forEach((p,i)=>{
      const g=c.createLinearGradient(0,0,0,540);g.addColorStop(0,'#18232c');g.addColorStop(1,p.color);c.fillStyle=g;c.fillRect(p.x,0,192,540);
      c.fillStyle='rgba(0,0,0,.16)';c.fillRect(p.x,0,192,540);
      if(i===0){for(let k=0;k<5;k++)drawIntroTree(c,p.x+20+k*42,370,.65,t+k);}
      if(i===1){c.fillStyle='#292e3a';for(let k=0;k<4;k++){c.beginPath();c.moveTo(p.x+k*55,0);c.lineTo(p.x+k*55+25,55);c.lineTo(p.x+k*55+48,0);c.fill();}}
      if(i===2){c.fillStyle='#75d2da';c.fillRect(p.x,370+Math.sin(t*2)*5,192,170);}
      if(i===3){c.fillStyle='#e5c681';for(let k=0;k<4;k++){c.beginPath();c.ellipse(p.x+30+k*50,420,50,18,0,0,Math.PI*2);c.fill();}}
      if(i===4){c.fillStyle='#9c92aa';for(let k=0;k<4;k++)c.fillRect(p.x+20+k*42,320-(k%2)*25,22,130);}
      drawGoblin(c,p.x+96,360,.9,['#78a95e','#79b7a2','#c78ab1','#c8a065','#a5a16a'][i],t+i*.35,i===2?1:0);
      c.fillStyle='#f4edda';c.font='bold 11px monospace';c.textAlign='center';c.fillText(p.label,p.x+96,480);
      if(alone){c.fillStyle='rgba(0,0,0,.25)';c.fillRect(p.x,0,192,540);c.fillStyle='#f4edda';c.font='bold 11px monospace';c.fillText('SOZINHO',p.x+96,510);}
    });
    c.fillStyle='rgba(0,0,0,.18)';c.fillRect(0,0,960,540);
}

function drawIntroStars(c,t,night){
    for(let i=0;i<55;i++){
        const x=(i*173+31)%960, y=(i*67+19)%300;
        const a=.25+.55*(.5+.5*Math.sin(t*1.7+i));
        c.fillStyle=night?`rgba(238,231,185,${a})`:`rgba(226,241,206,${a*.55})`;
        c.fillRect(x,y,2,2);
    }
    const sunX=700+Math.sin(t*.16)*22, sunY=110+Math.cos(t*.2)*7;
    c.fillStyle=night?'rgba(231,202,144,.13)':'rgba(255,228,143,.12)';c.beginPath();c.arc(sunX,sunY,65,0,Math.PI*2);c.fill();
    c.fillStyle=night?'#d4caa2':'#f3d991';c.beginPath();c.arc(sunX,sunY,25,0,Math.PI*2);c.fill();
}

function drawIntroIsland(c,t,heart){
    // Layered mountains and island silhouette.
    c.fillStyle='#304b42';c.beginPath();c.moveTo(0,330);c.lineTo(120,220);c.lineTo(220,305);c.lineTo(370,170);c.lineTo(520,300);c.lineTo(690,190);c.lineTo(850,295);c.lineTo(960,230);c.lineTo(960,540);c.lineTo(0,540);c.closePath();c.fill();
    c.fillStyle='#243b31';c.beginPath();c.moveTo(0,390);c.lineTo(155,300);c.lineTo(280,370);c.lineTo(450,270);c.lineTo(610,375);c.lineTo(780,285);c.lineTo(960,365);c.lineTo(960,540);c.lineTo(0,540);c.closePath();c.fill();
    // River, village, and forest tiles.
    c.fillStyle='#78b6a0';c.beginPath();c.moveTo(465,540);c.bezierCurveTo(430,470,560,440,520,385);c.bezierCurveTo(500,350,565,335,585,310);c.lineTo(612,312);c.bezierCurveTo(594,375,550,390,566,425);c.bezierCurveTo(610,475,535,510,550,540);c.closePath();c.fill();
    for(let i=0;i<34;i++){
        const x=(i*97+20)%960, y=330+(i*47)%160;
        drawIntroTree(c,x,y,.65+(i%3)*.16,t+i*.4);
    }
    for(let i=0;i<5;i++){
        const x=350+i*48,y=365+(i%2)*10;
        c.fillStyle='#c6a77a';c.fillRect(x,y,28,24);c.fillStyle='#61483b';c.beginPath();c.moveTo(x-4,y);c.lineTo(x+14,y-15);c.lineTo(x+32,y);c.closePath();c.fill();c.fillStyle='#e4d5a4';c.fillRect(x+10,y+9,7,15);
    }
    // The island heart floats over the far ruins.
    const hx=690,hy=274+Math.sin(t*1.4)*5;
    c.save();c.translate(hx,hy);
    c.fillStyle=heart?'rgba(237,89,96,.18)':'rgba(243,218,128,.16)';c.beginPath();c.arc(0,0,48+Math.sin(t*2)*4,0,Math.PI*2);c.fill();
    c.fillStyle=heart?'#d96765':'#f1d884';c.beginPath();c.moveTo(0,18);c.bezierCurveTo(-37,-3,-20,-27,0,-11);c.bezierCurveTo(20,-27,37,-3,0,18);c.fill();
    c.strokeStyle=heart?'#ef8c86':'#fff0b0';c.lineWidth=2;c.beginPath();c.arc(0,0,33+Math.sin(t*2)*3,0,Math.PI*2);c.stroke();
    if(heart){c.strokeStyle='rgba(25,12,20,.9)';c.lineWidth=3;c.beginPath();c.moveTo(-5,-12);c.lineTo(4,-1);c.lineTo(-4,7);c.lineTo(8,17);c.stroke();}
    c.restore();
    if(heart){c.fillStyle='rgba(9,8,17,.24)';c.fillRect(0,0,960,540);}
}

function drawIntroTree(c,x,y,s,t){
    const sway=Math.sin(t*1.2+x*.04)*3*s;
    c.fillStyle='#473e2d';c.fillRect(x-3*s,y-3*s,7*s,25*s);
    c.fillStyle='#213f30';c.beginPath();c.moveTo(x+sway,y-45*s);c.lineTo(x-24*s+sway,y-5*s);c.lineTo(x+22*s+sway,y-5*s);c.closePath();c.fill();
    c.fillStyle='#356346';c.beginPath();c.moveTo(x+sway,y-34*s);c.lineTo(x-20*s+sway,y+5*s);c.lineTo(x+20*s+sway,y+5*s);c.closePath();c.fill();
    c.fillStyle='#71945b';c.fillRect(x-5*s+sway,y-31*s,3*s,13*s);
}

function drawIntroMap(c,t){
    // Parchment and animated glowing route lines.
    c.fillStyle='rgba(3,8,7,.28)';c.fillRect(0,0,960,540);
    c.save();c.translate(480,265);c.rotate(Math.sin(t*.3)*.015);
    c.fillStyle='#bba779';c.fillRect(-240,-160,480,320);c.fillStyle='#e1d1a7';c.fillRect(-228,-148,456,296);
    c.strokeStyle='#89774e';c.lineWidth=2;c.strokeRect(-228,-148,456,296);
    c.fillStyle='#8eaa83';c.beginPath();c.moveTo(-175,-70);c.lineTo(-95,-125);c.lineTo(-30,-70);c.lineTo(25,-100);c.lineTo(95,-28);c.lineTo(170,-52);c.lineTo(145,70);c.lineTo(70,95);c.lineTo(-5,65);c.lineTo(-85,115);c.lineTo(-160,45);c.closePath();c.fill();
    c.strokeStyle='#4b9d9c';c.lineWidth=7;c.beginPath();c.moveTo(-25,140);c.bezierCurveTo(-80,75,5,30,-35,-5);c.bezierCurveTo(-65,-40,15,-65,35,-145);c.stroke();
    const nodes=[[-150,-35],[-65,45],[10,-20],[95,45],[140,-65],[0,-120]];
    c.setLineDash([5,7]);c.strokeStyle=`rgba(161,91,49,${.5+.4*Math.sin(t*2)})`;c.lineWidth=3;c.beginPath();c.moveTo(...nodes[0]);nodes.slice(1).forEach(n=>c.lineTo(...n));c.stroke();c.setLineDash([]);
    nodes.forEach((n,i)=>{c.fillStyle=i===2?'#f4d36d':'#825e43';c.beginPath();c.arc(n[0],n[1],i===2?9:5,0,Math.PI*2);c.fill();});
    c.restore();
}

function drawIntroCharacter(c,t,scene){
    drawIntroIsland(c,t,false);
    // Focus spotlight behind each adventurer.
    c.fillStyle='rgba(5,10,8,.45)';c.fillRect(0,0,960,540);
    const x=480,y=330+Math.sin(t*2)*3, color=scene.color;
    c.fillStyle=`${color}22`;c.beginPath();c.ellipse(x,y-45,130,150,0,0,Math.PI*2);c.fill();
    // Pixel-style original placeholder figure, replaced by the selected character's real sprite in-game.
    c.fillStyle='#22251f';c.fillRect(x-30,y+42,22,36);c.fillRect(x+8,y+42,22,36);
    c.fillStyle=color;c.fillRect(x-43,y-30,86,80);c.fillRect(x-33,y-50,66,30);
    c.fillStyle='#d9b995';c.fillRect(x-25,y-88,50,42);c.fillStyle='#453a32';c.fillRect(x-28,y-95,56,15);
    c.fillStyle='#292c25';c.fillRect(x-17,y-72,6,6);c.fillRect(x+11,y-72,6,6);
    c.fillStyle='#e4d6b0';c.fillRect(x-9,y-57,18,3);
    c.fillStyle='#ddd0a5';c.fillRect(x-55,y-15,13,58);c.fillRect(x+42,y-15,13,58);
    // Character-specific small prop/symbol.
    c.fillStyle=scene.color;c.fillRect(x+66,y-35,8,65);c.fillStyle='#ead9a0';c.fillRect(x+61,y-43,18,10);
    c.fillStyle='#f1e7ca';c.font='bold 16px Arial';c.textAlign='center';c.fillText(scene.sub.toUpperCase(),x,430);
    c.fillStyle='#f3d987';c.fillRect(x-65,455,130,2);
    for(let i=0;i<7;i++){
        const px=x-110+(i*37+Math.sin(t+i)*8), py=360+Math.cos(t*1.2+i)*45;
        c.fillStyle=`rgba(236,225,160,${.35+.4*Math.sin(t+i)})`;c.fillRect(px,py,3,3);
    }
}

function drawIntroPaths(c,t){
    drawIntroIsland(c,t,false);
    c.fillStyle='rgba(7,12,10,.3)';c.fillRect(0,0,960,540);
    const center={x:480,y:310};
    const ends=[{x:110,y:220},{x:260,y:155},{x:445,y:110},{x:650,y:150},{x:840,y:210},{x:480,y:70}];
    ends.forEach((e,i)=>{
        c.strokeStyle=['#8bc28c','#83b8d0','#d9b97b','#d9a6c1','#b4c88b','#dfd6a0'][i];c.lineWidth=5;c.beginPath();c.moveTo(center.x,center.y);c.quadraticCurveTo((center.x+e.x)/2+(i-2)*15,(center.y+e.y)/2+Math.sin(t+i)*8,e.x,e.y);c.stroke();
        c.fillStyle=c.strokeStyle;c.beginPath();c.arc(e.x,e.y,8+Math.sin(t*2+i)*2,0,Math.PI*2);c.fill();
    });
    // Convergence pulse.
    c.strokeStyle=`rgba(255,230,150,${.35+.4*Math.sin(t*2)})`;c.lineWidth=3;c.beginPath();c.arc(center.x,center.y,35+Math.sin(t*2)*9,0,Math.PI*2);c.stroke();
    c.fillStyle='#f1d884';c.beginPath();c.moveTo(center.x,center.y+15);c.bezierCurveTo(center.x-30,center.y-5,center.x-15,center.y-25,center.x,center.y-10);c.bezierCurveTo(center.x+15,center.y-25,center.x+30,center.y-5,center.x,center.y+15);c.fill();
    const names=['TTU TANNO','ECCA','MANGÁLIA','PI TOMBIO','KUZKO','RISSA'];
    c.font='bold 12px Arial';c.textAlign='center';ends.forEach((e,i)=>{c.fillStyle='#f4ecd1';c.fillText(names[i],e.x,e.y+24);});
}

function drawIntroTitleScene(c,t){
    drawIntroIsland(c,t,true);
    c.fillStyle='rgba(5,9,8,.54)';c.fillRect(0,0,960,540);
    const pulse=.5+.5*Math.sin(t*1.6);
    c.strokeStyle=`rgba(230,209,132,${.35+pulse*.4})`;c.lineWidth=2;c.beginPath();c.arc(480,220,68+pulse*7,0,Math.PI*2);c.stroke();
    c.fillStyle='#f1d884';c.beginPath();c.moveTo(480,243);c.bezierCurveTo(432,209,454,175,480,198);c.bezierCurveTo(506,175,528,209,480,243);c.fill();
    c.textAlign='center';c.shadowColor='#000';c.shadowBlur=12;c.fillStyle='#f2e9ca';c.font='bold 44px Georgia';c.fillText('UM MUNDO',480,340);c.fillStyle='#e0c779';c.font='bold 28px Georgia';c.fillText('VÁRIOS CAMINHOS',480,382);c.shadowBlur=0;
}

function drawIntroFloatingParticles(c,t,dt,dark){
    introParticles.forEach((p,i)=>{
        p.y-=p.s*dt*.025;
        p.x+=Math.sin(t+p.p)*.15;
        if(p.y<-5){p.y=545;p.x=Math.random()*960;}
        c.fillStyle=dark?`rgba(248,139,132,${.15+.3*(.5+.5*Math.sin(t*2+i))})`:`rgba(224,229,167,${.12+.32*(.5+.5*Math.sin(t*1.5+p.p))})`;
        c.fillRect(p.x,p.y,p.r,p.r);
    });
}


$('restartButton').addEventListener(
    'click',
    ()=>{

        game.character = null;
        game.mood = null;

        createCharacterCards();

        showScreen('characters');

    }
);


$('endingMenuButton').addEventListener(
    'click',
    goMenu
);


$('gameMenuButton').addEventListener(
    'click',
    ()=>{

        if(
            game.running &&
            !game.finished
        ){

            game.paused = true;

            $('pauseOverlay')
                .classList
                .remove('hidden');

            resetKeys();

        }

    }
);


$('resumeButton').addEventListener(
    'click',
    ()=>{

        game.paused = false;

        $('pauseOverlay')
            .classList
            .add('hidden');

    }
);


$('pauseMenuButton').addEventListener(
    'click',
    goMenu
);


/* =========================
   VOLTAR
========================= */

document
    .querySelectorAll('[data-back]')
    .forEach(
        button =>
            button.addEventListener(
                'click',
                ()=>{

                    const target =
                        button.dataset.back;

                    if(target === 'menu'){
                        showScreen('menu');
                    }

                    if(target === 'characters'){

                        createCharacterCards();

                        showScreen(
                            'characters'
                        );

                    }

                }
            )
    );


/* =========================
   HUMORES
========================= */

document
    .querySelectorAll('.moods button')
    .forEach(
        button =>
            button.addEventListener(
                'click',
                ()=>{

                    game.mood =
                        moods[
                            button.dataset.mood
                        ];

                    startGame();

                }
            )
    );


/* =========================
   INICIAR
========================= */

function startGame(){

    if(
        !game.character ||
        !game.mood
    ){

        return;

    }


    game.location =
        game.character.route[0];

    game.routeIndex = 0;

    game.running = true;

    game.finished = false;

    game.dialogueOpen = false;

    game.dialogueIndex = 0;
    game.activeDialogueList = null;
    game.npcConversationIndex = 0;
    game.dialogueMode = 'linear';
    game.dialogueNode = null;
    game.dialogueReturnToChoices = false;
    game.afterDialogueAction = null;
    game.dialogueActionExecutedIndex = -1;
    game.actionAtDialogueIndex = -1;
    game.oldManFlags = {mimicHint:false,ruinsHint:false,receivedHerb:false,askedAboutIsland:false,askedAboutHeart:false,askedIdentity:false};
    game.forceMimic = false;
    game.chestStates = {};
    game.chestBattleId = null;
    game.itemsFound = [];
    game.discoveredLocations = [game.location];
    game.mapOpen = false;
    game.mapMode = 'world';
    $('worldMapTab').classList.add('active');
    $('villageMapTab').classList.remove('active');
    $('mapOverlay').classList.add('hidden');

    game.routeOpen = false;

    game.battle = false;

    game.defending = false;

    game.enemy = null;

    game.exitCooldown = 0;

    game.paused = false;

    game.animationTime = 0;

    lastFrameTime = 0;


    player.hp =
        player.maxHP;

    playerImageLoaded = false;

    playerImage.src =
        game.character.image;

    resetPlayer();


    $('characterName').textContent =
        game.character.name;

    $('battlePlayerName').textContent =
        game.character.name;

    $('moodName').textContent =
        game.mood.name;

    $('locationName').textContent =
        game.location;


    $('pauseOverlay')
        .classList
        .add('hidden');

    $('routeButtons')
        .classList
        .add('hidden');

    $('battleUI')
        .classList
        .add('hidden');

    $('enemyHealth')
        .classList
        .add('hidden');


    updatePlayerHealth();

    showScreen('game');

    showDialogue();

    requestAnimationFrame(gameLoop);

}


function resetPlayer(){

    player.x = 45;

    // Começa na margem superior do rio para que a ponte seja usada para atravessar.
    player.y = game.location === 'Rio'
        ? 155
        : canvas.height / 2 - player.height / 2;

    player.jumpTime = 0;
    player.jumping = false;

    player.direction =
        'right';

    player.moving =
        false;

    player.frame =
        0;

    player.timer =
        0;

    player.walkOffset =
        0;

}


/* =========================
   CONTROLES
========================= */

function setKey(key,value){

    keys[key] =
        value;

}


document.addEventListener(
    'keydown',
    event=>{

        const key =
            event.key.toLowerCase();


        if(key === 'escape'){

            event.preventDefault();


            if(game.running){

                if(game.mapOpen){
                    closeMap();
                }
                else if(game.routeOpen){

                    closeRoutes();

                }

                else if(game.paused){

                    game.paused = false;

                    $('pauseOverlay')
                        .classList
                        .add('hidden');

                }

                else{

                    $('pauseOverlay')
                        .classList
                        .remove('hidden');

                    game.paused = true;

                    resetKeys();

                }

            }

            return;

        }


        if(key === 'e'){

            event.preventDefault();

            interact();

            return;

        }

        if(key === ' ' || key === 'spacebar'){
            event.preventDefault();
            if(!event.repeat) jumpPlayer();
            return;
        }

        if(
            key === 'w' ||
            key === 'arrowup'
        ){

            setKey('up',true);

        }


        if(
            key === 's' ||
            key === 'arrowdown'
        ){

            setKey('down',true);

        }


        if(
            key === 'a' ||
            key === 'arrowleft'
        ){

            setKey('left',true);

        }


        if(
            key === 'd' ||
            key === 'arrowright'
        ){

            setKey('right',true);

        }

    }
);


document.addEventListener(
    'keyup',
    event=>{

        const key =
            event.key.toLowerCase();


        if(
            key === 'w' ||
            key === 'arrowup'
        ){

            setKey('up',false);

        }


        if(
            key === 's' ||
            key === 'arrowdown'
        ){

            setKey('down',false);

        }


        if(
            key === 'a' ||
            key === 'arrowleft'
        ){

            setKey('left',false);

        }


        if(
            key === 'd' ||
            key === 'arrowright'
        ){

            setKey('right',false);

        }

    }
);


document.addEventListener(
    'visibilitychange',
    ()=>{

        if(document.hidden){

            resetKeys();

        }

    }
);


/* =========================
   CONTROLES MOBILE
========================= */

document
    .querySelectorAll('.touch-button')
    .forEach(
        button=>{

            const direction =
                button.dataset.key;


            const press =
                event=>{

                    event.preventDefault();

                    setKey(
                        direction,
                        true
                    );

                    button.classList.add(
                        'pressed'
                    );

                    try{

                        button.setPointerCapture(
                            event.pointerId
                        );

                    }catch{}

                };


            const release =
                event=>{

                    event.preventDefault();

                    setKey(
                        direction,
                        false
                    );

                    button.classList.remove(
                        'pressed'
                    );

                };


            button.addEventListener(
                'pointerdown',
                press
            );

            button.addEventListener(
                'pointerup',
                release
            );

            button.addEventListener(
                'pointercancel',
                release
            );

            button.addEventListener(
                'lostpointercapture',
                release
            );

        }
    );


$('mobileInteract')
    .addEventListener(
        'pointerdown',
        event=>{

            event.preventDefault();

            interact();

        }
    );


$('mobileJump').addEventListener('pointerdown', event => {
    event.preventDefault();
    jumpPlayer();
});

function jumpPlayer(){
    if(!game.running || game.dialogueOpen || game.routeOpen || game.battle || game.finished || game.paused) return;
    if(player.jumpTime > 0) return;
    player.jumpTime = 480;
    player.jumping = true;
}

/* =========================
   MOVIMENTO
========================= */

function updatePlayer(){

    if(
        game.dialogueOpen ||
        game.mapOpen ||
        game.routeOpen ||
        game.battle ||
        game.finished ||
        game.paused
    ){

        player.moving = false;

        return;

    }


    let dx =
        (keys.right ? 1 : 0) -
        (keys.left ? 1 : 0);


    let dy =
        (keys.down ? 1 : 0) -
        (keys.up ? 1 : 0);


    player.moving =
        dx !== 0 ||
        dy !== 0;


    if(!player.moving){

        player.walkOffset = 0;

        return;

    }


    if(dx < 0){

        player.direction =
            'left';

    }

    else if(dx > 0){

        player.direction =
            'right';

    }

    else if(dy < 0){

        player.direction =
            'up';

    }

    else if(dy > 0){

        player.direction =
            'down';

    }


    if(dx && dy){

        dx *= 0.707;
        dy *= 0.707;

    }


    const oldY = player.y;
    let nextX = player.x + dx * game.mood.speed;
    let nextY = player.y + dy * game.mood.speed;

    // No cenário do rio, a ponte é a passagem segura entre as duas margens.
    if(game.location === 'Rio') {
        const bridgeMinX = 420;
        const bridgeMaxX = 540;
        const playerCenterX = nextX + player.width / 2;
        const onBridge = playerCenterX >= bridgeMinX && playerCenterX <= bridgeMaxX;
        const upperBank = 202;
        const lowerBank = 294;

        if(!onBridge) {
            if(oldY <= upperBank && nextY > upperBank) nextY = upperBank;
            if(oldY >= lowerBank && nextY < lowerBank) nextY = lowerBank;
            // Safety recovery if a save or route transition leaves the player in the water.
            if(oldY > upperBank && oldY < lowerBank) {
                nextY = oldY < (upperBank + lowerBank) / 2 ? upperBank : lowerBank;
            }
        }
    }

    // Colisões fixas da vila e das árvores são aplicadas no ajuste final de movimento.

    player.x = nextX;
    player.y = nextY;


    player.x =
        Math.max(
            8,
            Math.min(
                canvas.width -
                player.width -
                8,
                player.x
            )
        );


    player.y =
        Math.max(
            78,
            Math.min(
                canvas.height -
                player.height -
                8,
                player.y
            )
        );


    player.timer++;


    if(player.timer >= 7){

        player.timer = 0;

        player.frame =
            (player.frame + 1) % 4;

    }


    player.walkOffset =
        Math.sin(
            player.frame *
            Math.PI /
            2
        ) * 2;


    if(
        player.x >
        canvas.width - 80 &&
        game.exitCooldown <= 0
    ){

        openRoutes();

    }


    if(game.exitCooldown > 0){

        game.exitCooldown--;

    }

}


/* =========================
   SAÍDAS
========================= */

function openRoutes(){

    game.routeOpen =
        true;

    $('pathHint')
        .classList
        .remove('hidden');

    $('routeButtons')
        .classList
        .remove('hidden');

    resetKeys();

}


function closeRoutes(){

    game.routeOpen =
        false;

    $('pathHint')
        .classList
        .add('hidden');

    $('routeButtons')
        .classList
        .add('hidden');

}


$('closeRoutes')
    .addEventListener(
        'click',
        closeRoutes
    );


document
    .querySelectorAll(
        '#routeButtons [data-route]'
    )
    .forEach(
        button =>
            button.addEventListener(
                'click',
                ()=>chooseRoute(
                    button.dataset.route
                )
            )
    );


function chooseRoute(type){

    closeRoutes();

    game.exitCooldown =
        45;


    if(type === 'safe'){

        nextLocation(
            'Você escolheu uma passagem tranquila e continuou sua jornada.'
        );

        return;

    }


    if(type === 'battle'){

        startBattle();

        return;

    }


    if(type === 'explore'){
        const clues = {
            'Floresta':'Entre as raízes, você encontra uma fita antiga presa a um galho. Ela parece pertencer a um dos seus irmãos.',
            'Caverna':'Marcas de ossos e ferramentas indicam que alguém passou por aqui há muito tempo.',
            'Rio':'A luz refletida na água revela símbolos na pedra da margem.',
            'Vila Verde':'Uma anotação esquecida indica que os moradores escondiam itens dentro das casas.',
            'Mina Antiga':'Você encontra um pequeno fragmento de cristal junto aos trilhos.',
            'Lago Escondido':'A superfície do lago reflete uma constelação que não aparece no céu.'
        };
        showTemporaryDialogue('NARRADOR', clues[game.location] || 'Você descobre marcas antigas, mas o caminho continua nesta mesma região.');
        if(typeof addInventoryItem === 'function') addInventoryItem('Anotação antiga','Uma pista encontrada durante a exploração.',1,'missão');
        return;
    }


    if(type === 'hidden'){

        if(
            game.routeIndex + 1 <
            game.character.route.length
        ){

            game.routeIndex++;

            game.location =
                game.character.route[
                    game.routeIndex
                ];

            $('locationName')
                .textContent =
                game.location;
            if(!game.discoveredLocations.includes(game.location)) game.discoveredLocations.push(game.location);
            if(game.mapOpen) drawMap();

            resetPlayer();

            showTemporaryDialogue(
                '???',
                'A passagem escondida levou você por um atalho inesperado.'
            );

        }

        else{

            finishGame();

        }

        return;

    }


    showTemporaryDialogue(
        'NARRADOR',
        'Você observa o ambiente antes de agir e percebe que o próximo caminho será diferente para cada viajante.'
    );

}


function nextLocation(message){

    game.routeIndex++;


    if(
        game.routeIndex >=
        game.character.route.length
    ){

        finishGame();

        return;

    }


    game.location =
        game.character.route[
            game.routeIndex
        ];


    $('locationName')
        .textContent =
        game.location;
    if(!game.discoveredLocations.includes(game.location)) game.discoveredLocations.push(game.location);
    if(game.mapOpen) drawMap();

    resetPlayer();


    if(message){

        showTemporaryDialogue(
            'NARRADOR',
            message
        );

    }

    else{

        showDialogue();

    }

}


/* =========================
   DIÁLOGOS
========================= */

function interact(){

    if(
        !game.running ||
        game.battle ||
        game.paused
    ){

        return;

    }


    if(game.dialogueOpen){

        if(game.dialogueMode === 'choices'){
            return;
        }

        nextDialogue();

    }

    else if(game.routeOpen){

        closeRoutes();

    }

    else if(game.mapOpen){
        closeMap();
    }

    else if(openNearbyChest()){
        return;
    }

    else if(isNearOldMan()){

        showOldManDialogue();

    }

    else{

        showDialogue();

    }

}


function isNearOldMan(){

    if(game.location !== 'Floresta'){
        return false;
    }

    // Centro real do sprite desenhado abaixo; mantém o alcance de interação alinhado.
    const oldManCenterX = 512;
    const oldManCenterY = 267;
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;

    return Math.hypot(
        playerCenterX - oldManCenterX,
        playerCenterY - oldManCenterY
    ) < 82;
}


function showOldManDialogue(){
    game.dialogueOpen = true;
    game.dialogueMode = 'choices';
    game.dialogueIndex = 0;
    game.activeDialogueList = null;
    game.dialogueReturnToChoices = false;
    game.afterDialogueAction = null;
    game.actionAtDialogueIndex = -1;

    $('dialogue').classList.remove('hidden');
    $('dialogueContinue').classList.add('hidden');

    const hasTalked = game.oldManFlags.askedAboutIsland || game.oldManFlags.askedIdentity || game.oldManFlags.ruinsHint || game.oldManFlags.mimicHint || game.oldManFlags.receivedHerb;
    const greeting = !hasTalked
        ? 'O viajante apoia o cajado no chão e observa você com atenção. “Você não parece conhecer esta ilha. Antes de seguir, talvez seja melhor conversar.”'
        : game.oldManFlags.mimicHint
            ? 'O idoso baixa a voz e olha para as árvores. “Ainda está por aqui? Espero que não tenha encontrado outro baú suspeito...”'
            : game.oldManFlags.receivedHerb
                ? 'O idoso sorri de leve ao reconhecer você. “Como está se saindo? Não tenho muitas coisas para oferecer, mas posso responder mais uma pergunta.”'
                : 'O idoso reconhece você e faz um gesto para se aproximar. “Pensei no que conversamos. O que mais quer saber?”';
    renderOldManChoices('VIAJANTE IDOSO', greeting);
}

const oldManChoiceSets = {
    main: [
        { label:'Quem é você?', id:'identity', player:'Desculpe interromper. Quem é você, afinal?', reply:'Meu nome já não importa muito. Eu era um explorador, como você. A diferença é que nunca consegui encontrar o caminho de volta.', next:'main', action:'identity' },
        { label:'O que devo temer?', id:'mimic', player:'Encontrei coisas estranhas por aqui. O que devo evitar?', reply:'Baús que aparecem longe de qualquer construção. Um Mimic copia madeira, dobradiças e fechaduras... mas não consegue ficar completamente imóvel.', next:'main', action:'mimicHint' },
        { label:'Você tem algo para ajudar?', id:'help', player:'Não vou mentir: uma ajuda seria bem-vinda. Tem alguma coisa sobrando?', reply:'Tenho uma erva medicinal. Guarde-a; a floresta cobra caro de quem se distrai.', next:'main', action:'herb' },
        { label:'O que são aquelas ruínas?', id:'ruins', player:'Vi ruínas mais adiante. Por que ninguém parece querer falar delas?', reply:'Porque as pedras não contam a mesma história para todo mundo. Procure símbolos repetidos. Eles apontam para o coração da ilha.', next:'main', action:'ruinsHint' }
    ],
    afterHint: [
        { label:'Por que você ficou aqui?', id:'past', player:'Se é explorador, por que continua preso nesta ilha?', reply:'Porque um dia segui uma luz entre as árvores. Encontrei as ruínas, perdi meus companheiros e, desde então, os caminhos nunca mais me levaram para fora.', next:'main', action:'past' },
        { label:'O coração da ilha é real?', id:'heart', player:'Você acredita mesmo que exista um coração no centro da ilha?', reply:'Acredito. À noite, sinto o chão vibrar como se algo enorme estivesse dormindo sob as raízes. Não sei se é uma bênção ou um aviso.', next:'main', action:'heart' },
        { label:'Investigar o baú suspeito', id:'mimicBattle', player:'Aquele baú se mexeu. Vou me aproximar e descobrir o que é.', reply:'Não! Espere— olhe a tampa! Ela está se abrindo sozinha!', next:'battle', action:'mimicBattle' },
        { label:'Encerrar conversa', id:'bye', player:'Obrigado por me ouvir. Vou continuar com mais cuidado.', reply:'Boa sorte. E, se ouvir madeira estalando quando não há vento, corra primeiro e pense depois.', next:'close' }
    ]
};

function renderOldManChoices(speaker, text){
    game.dialogueMode = 'choices';
    game.dialogueNode = game.oldManFlags.mimicHint ? 'afterHint' : 'main';
    const nameEl = $('dialogueName');
    nameEl.textContent = speaker;
    nameEl.dataset.speakerId = 'viajante-idoso';
    $('dialogueText').textContent = text;
    $('dialogueText').dataset.voiceKey = 'viajante-idoso';
    $('dialogueContinue').classList.add('hidden');
    const choices = $('dialogueChoices');
    choices.innerHTML = '';
    choices.classList.remove('hidden');
    const list = oldManChoiceSets[game.dialogueNode] || oldManChoiceSets.main;
    list.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${index + 1}. ${option.label}`;
        button.setAttribute('aria-label', option.label);
        button.addEventListener('click', () => selectOldManChoice(option));
        choices.appendChild(button);
    });
}

function selectOldManChoice(option){
    if(!game.dialogueOpen || game.dialogueMode !== 'choices') return;
    // Cada tópico muda depois da primeira pergunta para evitar falas repetidas.
    option = {...option};
    if(option.id === 'identity' && game.oldManFlags.askedIdentity){
        option.player = 'Você disse que já foi explorador. O que aconteceu com os outros?';
        option.reply = 'Seguimos luzes diferentes entre as árvores. Ao amanhecer, eu era o único que lembrava o caminho de volta ao acampamento.';
        option.action = 'past';
    }
    if(option.id === 'ruins' && game.oldManFlags.ruinsHint){
        option.player = 'Voltei a pensar nos símbolos das ruínas. Há algum detalhe que eu deva procurar?';
        option.reply = 'Procure a espiral dentro de uma folha. Se a encontrar repetida em portas diferentes, observe qual delas tem marcas recentes no chão.';
        option.action = 'heart';
    }
    if(option.id === 'help' && game.oldManFlags.receivedHerb){
        option.player = 'A erva que você me deu ajudou. Não teria mais alguma coisa para a jornada?';
        option.reply = 'Infelizmente não. Posso lhe dar um conselho, porém: nunca gaste toda a sua energia numa única luta.';
        option.action = null;
    }
    if(option.id === 'mimic' && game.oldManFlags.mimicHint){
        option.player = 'Lembrei do seu aviso sobre o Mimic. Existe algum jeito seguro de lidar com ele?';
        option.reply = 'Ataque quando ele abrir a boca para avançar e recue antes que a tampa se feche. Não tente pegar o tesouro durante a luta.';
        option.action = null;
    }
    // Falas iniciais próprias para cada protagonista, prontas para receber dublagem individual.
    const characterLines = {
        'Ttu Tanno': {
            identity:'Não quero ser rude, mas preciso saber com quem estou falando. Quem é você?',
            mimic:'Senti algo estranho perto de um baú. Como posso saber se é uma criatura?',
            help:'Estou tentando proteger quem encontrar pelo caminho. Você pode me ajudar?',
            ruins:'Essas ruínas parecem antigas até para esta ilha. O que elas escondem?'
        },
        'Ecca': {
            identity:'Você parece conhecer cada trilha daqui. Há quanto tempo vive nesta floresta?',
            mimic:'Aquele baú não parecia fazer parte da floresta. Que sinais devo observar?',
            help:'Não quero tomar algo de que você precise, mas poderia dividir algum remédio?',
            ruins:'As raízes estão crescendo entre as pedras das ruínas. Isso acontece sempre?'
        },
        'Mangália': {
            identity:'Você fala como alguém que já perdeu muito por aqui. Posso saber sua história?',
            mimic:'Se essa criatura engana os olhos, como faço para não colocar ninguém em perigo?',
            help:'Ainda tenho um caminho longo pela frente. Teria alguma erva ou conselho para mim?',
            ruins:'Sinto que aquelas ruínas guardam algo importante. Você sabe o quê?'
        },
        'Pi Tombio': {
            identity:'Oi! Você mora aqui? Quer dizer... alguém consegue morar numa ilha dessas?',
            mimic:'Espera, então alguns baús são monstros?! Como eu reconheço um desses?',
            help:'Você tem alguma coisa útil? Prometo não gastar tudo de uma vez... talvez.',
            ruins:'Eu vi umas pedras com desenhos esquisitos. Elas são um mapa ou alguma coisa assim?'
        },
        'Kuzko': {
            identity:'Antes de continuar, quero saber se posso confiar em você. Quem é você?',
            mimic:'Não tenho medo de um baú, mas prefiro saber como essa coisa ataca.',
            help:'Se tiver algum recurso sobrando, agora seria uma boa hora para dividir.',
            ruins:'As ruínas podem ser perigosas. Diga o que sabe para eu não entrar despreparado.'
        },
        'Rissa': {
            identity:'Você parece ter visto muita coisa por aqui. Qual é a sua história?',
            mimic:'Uma criatura que finge ser um baú? Certo... como percebo o truque antes que seja tarde?',
            help:'Não costumo pedir ajuda, mas desta vez aceito qualquer coisa que possa ser útil.',
            ruins:'Quero ver essas ruínas com meus próprios olhos. O que devo procurar lá?'
        }
    };
    const chosenLines = characterLines[game.character ? game.character.name : ''] || {};
    const firstTimeForTopic = (option.id === 'identity' && !game.oldManFlags.askedIdentity)
        || (option.id === 'mimic' && !game.oldManFlags.mimicHint)
        || (option.id === 'ruins' && !game.oldManFlags.ruinsHint)
        || (option.id === 'help' && !game.oldManFlags.receivedHerb);
    if(firstTimeForTopic && chosenLines[option.id]) option.player = chosenLines[option.id];

    game.oldManFlags.askedAboutIsland = true;
    if(option.id === 'identity') game.oldManFlags.askedIdentity = true;
    if(option.id === 'heart') game.oldManFlags.askedAboutHeart = true;
    $('dialogueChoices').classList.add('hidden');
    $('dialogueChoices').innerHTML = '';
    game.dialogueMode = 'linear';
    game.dialogueReturnToChoices = option.next === 'main';
    game.afterDialogueAction = option.action || null;
    game.actionAtDialogueIndex = -1;
    game.dialogueActionExecutedIndex = -1;
    game.activeDialogueList = [];
    const playerName = game.character ? game.character.name : 'PERSONAGEM';
    game.activeDialogueList.push([playerName, option.player]);
    game.activeDialogueList.push(['VIAJANTE IDOSO', option.reply]);

    // As ações acontecem no fluxo da conversa, e não antes de o jogador falar.
    if(option.action === 'herb'){
        if(!game.oldManFlags.receivedHerb){
            game.activeDialogueList.push(['NARRADOR', 'O viajante tira uma pequena erva do bolso e a entrega a você.']);
            game.actionAtDialogueIndex = 2;
        } else {
            game.activeDialogueList[1][1] = 'Já lhe dei minha última erva. Guarde seus recursos para quando realmente precisar.';
            game.afterDialogueAction = null;
        }
    } else if(option.action === 'mimicHint'){
        game.activeDialogueList.push(['NARRADOR', 'Você memoriza os sinais: uma fechadura que pisca, uma tampa que respira ou madeira que se move sem vento.']);
        game.actionAtDialogueIndex = 2;
    } else if(option.action === 'ruinsHint'){
        game.activeDialogueList.push(['NARRADOR', 'Você registra a pista sobre os símbolos repetidos das ruínas no seu diário.']);
        game.actionAtDialogueIndex = 2;
    } else if(option.action === 'mimicBattle'){
        game.activeDialogueList.push(['NARRADOR', 'Um estalo vem de dentro do baú. A tampa se ergue, revelando dentes e uma língua comprida.']);
        game.activeDialogueList.push(['VIAJANTE IDOSO', 'Eu avisei! Prepare-se para lutar!']);
    } else if(option.action === 'identity'){
        game.activeDialogueList.push(['VIAJANTE IDOSO', 'Se quiser me chamar de alguma coisa, chame de velho teimoso. É o que dizem por aqui.']);
    } else if(option.action === 'past'){
        game.activeDialogueList.push(['VIAJANTE IDOSO', 'Às vezes penso que a ilha me mantém aqui porque ainda falta alguma coisa que eu precise encontrar.']);
    } else if(option.action === 'heart'){
        game.activeDialogueList.push(['VIAJANTE IDOSO', 'Se chegar às ruínas, procure um símbolo que parece uma espiral dentro de uma folha.']);
    }

    game.dialogueIndex = 0;
    game.dialogueNode = option.next || 'main';
    $('dialogueContinue').classList.remove('hidden');
    $('dialogue').classList.remove('hidden');
    updateDialogue();

    if(option.action === 'mimicHint') game.oldManFlags.mimicHint = true;
    if(option.action === 'ruinsHint') game.oldManFlags.ruinsHint = true;
    if(option.action === 'identity' || option.action === 'past') game.oldManFlags.askedIdentity = true;
    if(option.action === 'heart') game.oldManFlags.askedAboutHeart = true;
}


function showDialogue(){

    game.dialogueMode = 'linear';
    game.dialogueReturnToChoices = false;
    game.afterDialogueAction = null;
    $('dialogueChoices').classList.add('hidden');
    $('dialogueContinue').classList.remove('hidden');

    const list =
        dialogues[game.location];


    if(!list){

        return;

    }


    game.dialogueOpen =
        true;

    game.dialogueIndex =
        0;

    game.activeDialogueList = list;


    $('dialogue')
        .classList
        .remove('hidden');


    updateDialogue();

}


function updateDialogue(){
    const list = game.activeDialogueList || dialogues[game.location];
    if(!list) return;
    const current = list[game.dialogueIndex];
    if(!current) return;

    const nameEl = $('dialogueName');
    nameEl.textContent = current[0];
    nameEl.dataset.speakerId = String(current[0]).toLowerCase().replace(/[^a-z0-9]+/g,'-');
    $('dialogueText').textContent = current[1];
    $('dialogueText').dataset.voiceKey = nameEl.dataset.speakerId;

    $('dialogueChoices').classList.add('hidden');
    $('dialogueContinue').classList.remove('hidden');
    $('dialogueContinue').textContent = game.dialogueIndex >= list.length - 1
        ? (game.dialogueReturnToChoices ? 'RESPONDER →' : 'FECHAR ✦')
        : 'CONTINUAR →';
}

function applyConversationAction(){
    if(game.actionAtDialogueIndex !== game.dialogueIndex || game.dialogueActionExecutedIndex === game.dialogueIndex) return;
    game.dialogueActionExecutedIndex = game.dialogueIndex;
    if(game.afterDialogueAction === 'herb' && !game.oldManFlags.receivedHerb){
        game.oldManFlags.receivedHerb = true;
        player.hp = Math.min(player.maxHP, player.hp + 25);
        updatePlayerHealth();
    }
    if(game.afterDialogueAction === 'mimicHint') game.oldManFlags.mimicHint = true;
    if(game.afterDialogueAction === 'ruinsHint') game.oldManFlags.ruinsHint = true;
}

function nextDialogue(){
    if(game.dialogueMode === 'choices') return;
    const list = game.activeDialogueList || dialogues[game.location];
    if(!list){ closeDialogue(); return; }

    applyConversationAction();
    if(game.dialogueIndex < list.length - 1){
        game.dialogueIndex++;
        updateDialogue();
        applyConversationAction();
        return;
    }

    const action = game.afterDialogueAction;
    const returnToChoices = game.dialogueReturnToChoices;
    const nextNode = game.dialogueNode;
    game.afterDialogueAction = null;
    game.dialogueReturnToChoices = false;
    game.actionAtDialogueIndex = -1;

    if(action === 'mimicBattle' || nextNode === 'battle'){
        closeDialogue();
        game.forceMimic = true;
        startBattle();
        $('battleMessage').textContent = 'O baú se abre de repente! É um MIMIC!';
        return;
    }
    if(nextNode === 'close'){
        game.oldManFlags.askedAboutIsland = true;
        closeDialogue();
        return;
    }
    if(returnToChoices){
        game.activeDialogueList = null;
        game.dialogueIndex = 0;
        const followUp = action === 'herb'
            ? (game.oldManFlags.receivedHerb ? 'O viajante observa você guardar a erva. “Não tenho mais nenhuma. Quer me perguntar outra coisa?”' : '“Seja cuidadoso. O que mais gostaria de saber?”')
            : action === 'mimicHint'
                ? '“Agora você sabe reconhecer alguns sinais. Ainda há mais coisas que posso contar.”'
                : action === 'ruinsHint'
                    ? '“Lembre-se dos símbolos nas pedras. Que outra coisa quer saber?”'
                    : 'O idoso ajeita o cajado. “Pode perguntar mais uma coisa antes de partir.”';
        renderOldManChoices('VIAJANTE IDOSO', followUp);
        return;
    }
    closeDialogue();
}

function closeDialogue(){
    game.dialogueOpen = false;
    game.dialogueMode = 'linear';
    game.activeDialogueList = null;
    game.dialogueNode = null;
    game.dialogueReturnToChoices = false;
    game.afterDialogueAction = null;
    game.actionAtDialogueIndex = -1;
    game.dialogueActionExecutedIndex = -1;
    $('dialogueChoices').classList.add('hidden');
    $('dialogueChoices').innerHTML = '';
    $('dialogueContinue').classList.remove('hidden');
    $('dialogue').classList.add('hidden');
}


function showTemporaryDialogue(
    name,
    text
){

    game.dialogueMode = 'linear';
    $('dialogueChoices').classList.add('hidden');
    $('dialogueContinue').classList.remove('hidden');
    game.dialogueOpen =
        true;

    game.dialogueIndex =
        0;

    game.activeDialogueList = [[name, text]];


    $('dialogueName').textContent = name;
    $('dialogueName').dataset.speakerId = String(name).toLowerCase().replace(/[^a-z0-9]+/g,'-');

    $('dialogueText').textContent = text;
    $('dialogueText').dataset.voiceKey = $('dialogueName').dataset.speakerId;


    $('dialogueContinue')
        .textContent =
        'CONTINUAR →';


    $('dialogue')
        .classList
        .remove('hidden');

}


$('dialogueContinue')
    .addEventListener(
        'click',
        nextDialogue
    );


/* =========================
   BATALHA
========================= */

function createEnemy(){

    const types = [

        {
            name:'CRIATURA DA FLORESTA',
            hp:90,
            damage:9,
            kind:'normal'
        },

        {
            name:'GUARDIÃO DAS RUÍNAS',
            hp:120,
            damage:11,
            kind:'normal'
        },

        {
            name:'SOMBRA DA CAVERNA',
            hp:105,
            damage:10,
            kind:'normal'
        },

        {
            name:'MIMIC',
            hp:140,
            damage:15,
            kind:'mimic'
        }

    ];


    const type = game.forceMimic
        ? types.find(enemyType => enemyType.kind === 'mimic')
        : types[Math.floor(Math.random() * types.length)];
    game.forceMimic = false;


    game.enemy = {

        name:type.name,

        hp:type.hp,

        maxHP:type.hp,

        damage:type.damage,
        kind:type.kind,

        attacking:false,

        attackTimer:0,

        hitFlash:0

    };


    $('enemyName')
        .textContent =
        type.name;


    $('battleEnemyTitle')
        .textContent =
        type.name;

    if(type.kind === 'mimic'){
        // Exibe a arte própria do Mimic no painel de batalha.
        enemyBattleImage.style.display = 'block';
        enemyPortrait.style.display = 'none';
        enemyBattleImage.src = 'images/mimics.png';
    }
    else{
        enemyBattleImage.style.display = 'block';
        enemyPortrait.style.display = 'none';
        enemyBattleImage.src = 'images/inimigo.png';
    }

}


function startBattle(){

    game.battle =
        true;

    game.defending =
        false;


    createEnemy();


    $('battleUI')
        .classList
        .remove('hidden');


    $('enemyHealth')
        .classList
        .remove('hidden');


    $('battleMessage')
        .textContent =
        'Uma criatura apareceu!';


    updateEnemyHealth();

    updatePlayerHealth();

}


$('attackButton')
    .addEventListener(
        'click',
        playerAttack
    );


$('defendButton')
    .addEventListener(
        'click',
        playerDefend
    );


$('runButton')
    .addEventListener(
        'click',
        runFromBattle
    );


function playerAttack(){

    if(
        !game.battle ||
        !game.enemy
    ){

        return;

    }


    const damage =
        10 +
        Math.floor(
            Math.random() * 17
        );


    game.enemy.hp =
        Math.max(
            0,
            game.enemy.hp -
            damage
        );


    game.enemy.hitFlash =
        8;


    $('battleMessage')
        .textContent =
        `${game.character.name} causou ${damage} de dano!`;


    updateEnemyHealth();


    if(game.enemy.hp <= 0){

        winBattle();

        return;

    }


    setTimeout(
        enemyAttack,
        500
    );

}


function playerDefend(){

    if(!game.battle){

        return;

    }


    game.defending =
        true;


    $('battleMessage')
        .textContent =
        'Você se preparou para defender!';


    setTimeout(
        enemyAttack,
        450
    );

}


function enemyAttack(){

    if(
        !game.battle ||
        !game.enemy
    ){

        return;

    }


    game.enemy.attacking =
        true;


    game.enemy.attackTimer =
        0;


    let damage =
        game.enemy.damage +
        Math.floor(
            Math.random() * 5
        );


    if(game.defending){

        damage =
            Math.ceil(
                damage / 2
            );

        game.defending =
            false;

    }


    player.hp =
        Math.max(
            0,
            player.hp -
            damage
        );


    $('battleMessage')
        .textContent =
        `${game.enemy.name} causou ${damage} de dano!`;


    updatePlayerHealth();


    setTimeout(
        ()=>{

            if(game.enemy){

                game.enemy.attacking =
                    false;

            }

        },
        300
    );


    if(player.hp <= 0){

        setTimeout(
            loseBattle,
            400
        );

    }

}


function runFromBattle(){

    if(!game.battle){

        return;

    }


    if(
        Math.random() <
        0.7
    ){

        $('battleMessage')
            .textContent =
            'Você encontrou uma abertura e escapou!';


        setTimeout(
            ()=>{
                const wasChestMimic = Boolean(game.chestBattleId);
                endBattle();
                if(wasChestMimic){
                    game.chestBattleId = null;
                    showTemporaryDialogue('FUGA', 'Você conseguiu escapar do Mimic. O baú continua perigoso; talvez seja melhor voltar preparado.');
                    return;
                }
                nextLocation();
            },
            600
        );

    }

    else{

        $('battleMessage')
            .textContent =
            'A saída estava bloqueada!';


        setTimeout(
            enemyAttack,
            400
        );

    }

}


function winBattle(){
    if(!game.battle || !game.enemy) return;
    const defeated = game.enemy;
    $('battleMessage').textContent = 'Você venceu o encontro!';
    setTimeout(()=>{
        endBattle();
        if(game.chestBattleId){
            const chest = chestSpots.find(item => item.id === game.chestBattleId);
            if(chest) game.chestStates[chest.id] = 'opened';
            game.chestBattleId = null;
            const reward = giveChestReward();
            showTemporaryDialogue('BAÚ RECUPERADO', `O Mimic foi derrotado! Dentro do baú havia ${reward}.`);
            renderInventory();
            return;
        }
        if(defeated.kind === 'skeleton' && game.activeSkeletonId){
            game.skeletonsDefeated = game.skeletonsDefeated || [];
            if(!game.skeletonsDefeated.includes(game.activeSkeletonId)) game.skeletonsDefeated.push(game.activeSkeletonId);
            game.activeSkeletonId = null;
            showTemporaryDialogue('NARRADOR', 'Os ossos caem no chão da caverna. O caminho continua aberto; você não foi levado para outra região.');
            return;
        }
        // A victory ends only the battle. Changing scenery requires choosing an exit.
        showTemporaryDialogue('NARRADOR', `Você derrotou ${defeated.name.toLowerCase()}. A região permanece a mesma; escolha uma saída quando estiver pronto.`);
    },450);
}


function loseBattle(){

    const wasChestMimic = Boolean(game.chestBattleId);
    endBattle();
    if(wasChestMimic) game.chestBattleId = null;

    player.hp =
        player.maxHP;

    resetPlayer();


    showTemporaryDialogue(
        'NARRADOR',
        'Você recuou para o início da área. Talvez outra saída seja melhor desta vez.'
    );

}


function endBattle(){

    game.battle =
        false;

    game.enemy =
        null;

    game.defending =
        false;


    $('battleUI')
        .classList
        .add('hidden');


    $('enemyHealth')
        .classList
        .add('hidden');


    updatePlayerHealth();

}


function updatePlayerHealth(){

    const percentage =
        (player.hp /
        player.maxHP) *
        100;


    $('playerHealthFill')
        .style
        .width =
        `${percentage}%`;


    $('playerHPText')
        .textContent =
        `${player.hp} / ${player.maxHP}`;

}


function updateEnemyHealth(){

    if(!game.enemy){

        return;

    }


    const percentage =
        (game.enemy.hp /
        game.enemy.maxHP) *
        100;


    $('enemyHealthFill')
        .style
        .width =
        `${percentage}%`;


    $('enemyHPText')
        .textContent =
        `${game.enemy.hp} / ${game.enemy.maxHP}`;

}


/* =========================
   MAPAS DO MUNDO E DA VILA
========================= */
const mapCanvas = $('mapCanvas');
const mapCtx = mapCanvas.getContext('2d');
mapCtx.imageSmoothingEnabled = false;
$('mapButton').addEventListener('click', toggleMap);
$('mobileMap').addEventListener('click', toggleMap);
$('closeMap').addEventListener('click', closeMap);
$('worldMapTab').addEventListener('click', () => { game.mapMode = 'world'; $('worldMapTab').classList.add('active'); $('villageMapTab').classList.remove('active'); drawMap(); });
$('villageMapTab').addEventListener('click', () => { game.mapMode = 'village'; $('villageMapTab').classList.add('active'); $('worldMapTab').classList.remove('active'); drawMap(); });

function toggleMap(){
    if(!game.running || game.battle || game.dialogueOpen || game.routeOpen || game.paused) return;
    game.mapOpen = !game.mapOpen;
    $('mapOverlay').classList.toggle('hidden', !game.mapOpen);
    resetKeys();
    if(game.mapOpen) drawMap();
}
function closeMap(){
    game.mapOpen = false;
    $('mapOverlay').classList.add('hidden');
    resetKeys();
}
function drawMap(){
    if(!mapCtx) return;
    const c = mapCtx, w = mapCanvas.width, h = mapCanvas.height;
    c.clearRect(0,0,w,h);
    c.fillStyle = '#17241d'; c.fillRect(0,0,w,h);
    if(game.mapMode === 'village'){
        c.fillStyle='#38583b'; c.fillRect(12,12,w-24,h-24);
        // roads and plaza
        c.fillStyle='#a68b5d'; c.fillRect(25,160,w-50,42); c.fillRect(285,28,48,h-56); c.fillRect(125,65,330,34);
        c.fillStyle='#c8ad78'; c.fillRect(275,25,68,h-50); c.fillRect(28,151,w-56,58);
        // village square and well
        c.fillStyle='#6d8050'; c.fillRect(260,135,110,90);
        c.fillStyle='#5a4a35'; c.fillRect(298,162,34,30); c.fillStyle='#aab3a0'; c.fillRect(303,166,24,21); c.fillStyle='#24444a'; c.fillRect(307,170,16,13);
        // houses
        const houses=[[45,40,75,58],[415,38,80,58],[50,238,88,62],[420,235,100,65],[180,38,65,50]];
        houses.forEach(([x,y,ww,hh])=>{c.fillStyle='#49382b';c.fillRect(x,y+15,ww,hh-15);c.fillStyle='#824d37';c.fillRect(x-5,y+7,ww+10,15);c.fillStyle='#b88a54';c.fillRect(x+ww/2-9,y+hh-21,18,21);c.fillStyle='#c6b17b';c.fillRect(x+10,y+27,12,12);});
        // chests, unidentified ones show ?; discovered Mimics show an eye mark
        chestSpots.filter(ch=>ch.scene==='Vila Verde').forEach(ch=>{
            const state=game.chestStates[ch.id]||'unknown';
            const px=(ch.mapX ?? ch.x)/960*(w-40)+20, py=(ch.mapY ?? ch.y)/540*(h-40)+20;
            c.fillStyle=state==='opened'?'#554b35':'#b98443'; c.fillRect(px-8,py-5,16,11);
            c.fillStyle='#4a3022'; c.fillRect(px-8,py-7,16,4); c.fillStyle='#e4c66c'; c.fillRect(px-1,py-2,3,4);
            if(state==='known-mimic'){c.fillStyle='#f05d54';c.fillRect(px-2,py-2,4,3);}
            else if(state!=='opened'){c.fillStyle='#fff0bd';c.font='bold 9px monospace';c.textAlign='center';c.fillText('?',px,py-10);}
        });
        // player marker
        c.fillStyle='#e9f39b'; c.beginPath(); c.arc(20+player.x/canvas.width*(w-40),20+player.y/canvas.height*(h-40),5,0,Math.PI*2); c.fill();
        c.fillStyle='#f3edcf';c.font='bold 13px monospace';c.textAlign='left';c.fillText('VILA VERDE',22,h-15);
        c.font='10px monospace';c.fillStyle='#c9d4b8';c.fillText('● Você   ■ Baú   ? Não investigado',22,h-30);
    } else {
        // connections between biomes
        c.strokeStyle='#6c8a65'; c.lineWidth=5; c.beginPath(); c.moveTo(115,100);c.lineTo(265,220);c.lineTo(385,105);c.lineTo(495,235);c.lineTo(555,95);c.stroke();
        c.strokeStyle='#a9b889'; c.lineWidth=2; c.beginPath(); c.moveTo(115,100);c.lineTo(385,105);c.lineTo(555,95);c.stroke();
        c.setLineDash([5,5]); c.strokeStyle='#8a9c71'; c.beginPath(); c.moveTo(265,220); c.lineTo(385,285); c.lineTo(555,95); c.stroke(); c.setLineDash([]);
        worldMapNodes.forEach(node=>{
            const seen = game.discoveredLocations.includes(node.name);
            c.fillStyle=seen?'#d8c47c':'#526455'; c.beginPath(); c.arc(node.x,node.y,seen?12:9,0,Math.PI*2);c.fill();
            c.strokeStyle=seen?'#f5e7b2':'#718272';c.lineWidth=2;c.stroke();
            c.fillStyle=seen?'#f4efd8':'#9ba99a';c.font='12px monospace';c.textAlign='center';c.fillText(seen?node.name:'???',node.x,node.y+28);
        });
        const current=worldMapNodes.find(n=>n.name===game.location);
        if(current){c.strokeStyle='#fff7a9';c.lineWidth=3;c.beginPath();c.arc(current.x,current.y,18+Math.sin(game.animationTime*.008)*2,0,Math.PI*2);c.stroke();}
        c.fillStyle='#e6e1c9';c.font='bold 13px monospace';c.textAlign='left';c.fillText('MAPA DAS DIMENSÕES',20,h-18);
        c.font='10px monospace';c.fillStyle='#c3d1bc';c.fillText('Verde claro = região descoberta',20,h-34);
    }
}

/* =========================
   VILA VERDE, BAÚS E MIMICS
========================= */
function drawVillage(){
    const t=game.animationTime*.001;
    // paths and central square
    ctx.fillStyle='#a88a5b';ctx.fillRect(0,190,canvas.width,38);ctx.fillRect(285,75,42,canvas.height-75);ctx.fillRect(120,125,340,24);
    ctx.fillStyle='#c1a271';ctx.fillRect(280,75,52,canvas.height-75);ctx.fillRect(0,184,canvas.width,50);
    // homes around the square; central paths remain open
    const houses=[{x:55,y:105,w:108,h:75},{x:195,y:95,w:70,h:62},{x:615,y:100,w:112,h:74},{x:785,y:135,w:110,h:72},{x:80,y:305,w:110,h:75},{x:545,y:300,w:100,h:70}];
    houses.forEach((h,i)=>{
        ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(h.x+7,h.y+h.h-3,h.w,h.h*.18);
        ctx.fillStyle=i%2?'#69462f':'#79513a';ctx.fillRect(h.x,h.y+22,h.w,h.h-22);
        ctx.fillStyle=i%2?'#a86d45':'#b77b4e';ctx.fillRect(h.x-8,h.y+12,h.w+16,18);
        ctx.fillStyle='#4c3427';ctx.fillRect(h.x+h.w/2-13,h.y+h.h-28,26,28);
        ctx.fillStyle='#e1bd78';ctx.fillRect(h.x+13,h.y+35,17,16);ctx.fillRect(h.x+h.w-30,h.y+35,17,16);
        ctx.fillStyle='#e6c77e';ctx.fillRect(h.x+h.w/2-2,h.y+22,4, h.h-50);
    });
    // village well
    ctx.fillStyle='#777e6b';ctx.fillRect(427,162,62,45);ctx.fillStyle='#b5b7a1';ctx.fillRect(432,157,52,10);ctx.fillStyle='#244a4b';ctx.fillRect(439,169,38,25);
    ctx.fillStyle='#5c422c';ctx.fillRect(424,151,5,20);ctx.fillRect(486,151,5,20);ctx.fillRect(424,149,67,5);
    // festival pennants and warm torches
    for(let i=0;i<7;i++){const x=340+i*38;ctx.fillStyle=['#c5a75e','#9fbe76','#c77a5b'][i%3];ctx.beginPath();ctx.moveTo(x,86);ctx.lineTo(x+18,86);ctx.lineTo(x+9,101+Math.sin(t*2+i)*2);ctx.closePath();ctx.fill();}
    [[25,172],[925,175],[500,270],[270,270],[680,265]].forEach(([x,y],i)=>{ctx.fillStyle='#5b412b';ctx.fillRect(x,y,5,22);ctx.fillStyle='#e6ad54';ctx.fillRect(x-2,y-8,9,10);ctx.fillStyle=`rgba(255,187,82,${.2+Math.sin(t*5+i)*.08})`;ctx.fillRect(x-7,y-14,19,22);});
    ctx.fillStyle='#f1e5bd';ctx.font='bold 14px monospace';ctx.fillText('VILA VERDE',22,100);
}
function drawChests(){
    for(const chest of chestSpots){
        if(chest.scene!==game.location) continue;
        const state=game.chestStates[chest.id]||'unknown';
        if(state==='opened'){
            ctx.fillStyle='#5c422d';ctx.fillRect(chest.x-15,chest.y-5,30,15);ctx.fillStyle='#9a7547';ctx.fillRect(chest.x-13,chest.y-3,26,10);continue;
        }
        const wobble=chest.kind==='mimic'?Math.sin(game.animationTime*.006+chest.x)*1.2:0;
        ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(chest.x-17,chest.y+10,36,7);
        ctx.fillStyle='#4b3020';ctx.fillRect(chest.x-17,chest.y-3+wobble,34,16);
        ctx.fillStyle='#9b6739';ctx.fillRect(chest.x-14,chest.y-1+wobble,28,11);
        ctx.fillStyle='#bd8a4b';ctx.fillRect(chest.x-17,chest.y-7+wobble,34,8);
        ctx.fillStyle='#e6c66b';ctx.fillRect(chest.x-2,chest.y-1+wobble,4,7);
        // A Mimic has a subtle breathing lid/eye, but remains chest-shaped until interacted with.
        if(chest.kind==='mimic' && Math.sin(game.animationTime*.004+chest.x)>0.88){
            ctx.fillStyle='#ed5d52';ctx.fillRect(chest.x-3,chest.y-5+wobble,6,3);
        }
        if(Math.hypot(player.x+player.width/2-chest.x,player.y+player.height/2-chest.y)<58){
            ctx.fillStyle='#11170f';ctx.fillRect(chest.x-9,chest.y-29,18,17);ctx.strokeStyle='#d7ba3f';ctx.strokeRect(chest.x-9,chest.y-29,18,17);ctx.fillStyle='#d7ba3f';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText('E',chest.x,chest.y-17);ctx.textAlign='start';
        }
    }
}
function nearestChest(){
    let nearest=null,best=58;
    for(const chest of chestSpots){
        if(chest.scene!==game.location || game.chestStates[chest.id]==='opened') continue;
        const d=Math.hypot(player.x+player.width/2-chest.x,player.y+player.height/2-chest.y);
        if(d<best){nearest=chest;best=d;}
    }
    return nearest;
}
function openNearbyChest(){
    const chest=nearestChest();
    if(!chest) return false;
    if(chest.kind==='mimic'){
        game.chestStates[chest.id]='known-mimic';
        game.chestBattleId=chest.id;
        game.forceMimic=true;
        startBattle();
        $('battleMessage').textContent='O baú estremece, abre a tampa e revela dentes afiados: é um MIMIC!';
        return true;
    }
    game.chestStates[chest.id]='opened';
    const reward=giveChestReward();
    showTemporaryDialogue('BAÚ ENCONTRADO',`Você abriu um baú comum e encontrou ${reward}.`);
    return true;
}
function giveChestReward(){
    const rewards=[
        {name:'uma fruta doce (+20 de vida)',apply:()=>{player.hp=Math.min(player.maxHP,player.hp+20);updatePlayerHealth();}},
        {name:'uma poção de cura (+35 de vida)',apply:()=>{player.hp=Math.min(player.maxHP,player.hp+35);updatePlayerHealth();}},
        {name:'cristais brilhantes para trocar mais tarde',apply:()=>{}},
        {name:'uma flecha antiga que poderá ser útil',apply:()=>{}}
    ];
    const reward=rewards[Math.floor(Math.random()*rewards.length)];
    game.itemsFound.push(reward.name);
    reward.apply();
    return reward.name;
}

/* =========================
   FUNDO
========================= */

function drawBackground(){

    const bg =
        backgrounds[
            game.location
        ] ||
        backgrounds.Floresta;


    ctx.fillStyle =
        bg.sky;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle =
        bg.ground;


    ctx.fillRect(
        0,
        75,
        canvas.width,
        canvas.height - 75
    );


    drawAmbientTexture(bg);


    if(
        game.location ===
        'Floresta'
    ){

        drawForest();

    }


    if(
        game.location ===
        'Caverna'
    ){

        drawCave();

    }


    if(
        game.location ===
        'Rio'
    ){

        drawRiver();

    }


    if(
        game.location ===
        'Ruinas'
    ){

        drawRuins();

    }

    if(game.location === 'Vila Verde') drawVillage();

    drawExit();

}


/* =========================
   TEXTURA DO CHÃO
========================= */

function drawAmbientTexture(bg){

    ctx.fillStyle =
        bg.grass;


    for(
        let x = 0;
        x < canvas.width;
        x += 45
    ){

        for(
            let y = 95;
            y < canvas.height;
            y += 45
        ){

            const variation =
                (x * 7 +
                y * 3) %
                17;


            ctx.fillRect(
                x + variation,
                y,
                5,
                3
            );

        }

    }

}


/* =========================
   FLORESTA
   FOLHAS + CAPIM ANIMADOS
========================= */

function drawForest(){

    const t =
        game.animationTime *
        0.001;


    /* árvores distantes */

    ctx.fillStyle =
        '#1d3222';


    for(
        let x = 20;
        x < canvas.width;
        x += 82
    ){

        const h =
            72 +
            ((x * 13) % 70);


        ctx.fillRect(
            x,
            72,
            18,
            h
        );


        ctx.fillRect(
            x - 15,
            65,
            48,
            18
        );


        ctx.fillRect(
            x - 8,
            45,
            35,
            25
        );

    }


    /* árvores grandes */

    const trees = [

        {
            x:85,
            y:115
        },

        {
            x:305,
            y:108
        },

        {
            x:555,
            y:125
        },

        {
            x:790,
            y:105
        },

        {
            x:930,
            y:130
        }

    ];


    trees.forEach(
        (tree,index)=>{

            const sway =
                Math.sin(
                    t * 1.15 +
                    index * 1.7
                ) *
                2.5;


            ctx.save();


            ctx.translate(
                sway,
                0
            );


            /* tronco */

            ctx.fillStyle =
                '#4a3525';


            ctx.fillRect(
                tree.x,
                tree.y,
                18,
                88
            );


            ctx.fillRect(
                tree.x + 10,
                tree.y + 5,
                7,
                75
            );


            /* copa */

            ctx.fillStyle =
                '#1b3822';


            ctx.fillRect(
                tree.x - 22,
                tree.y - 15,
                58,
                25
            );


            ctx.fillRect(
                tree.x - 10,
                tree.y - 35,
                45,
                28
            );


            ctx.fillRect(
                tree.x + 2,
                tree.y - 52,
                25,
                24
            );


            ctx.fillStyle =
                '#2b522b';


            ctx.fillRect(
                tree.x - 10,
                tree.y - 22,
                25,
                12
            );


            ctx.fillRect(
                tree.x + 15,
                tree.y - 12,
                20,
                10
            );


            ctx.fillRect(
                tree.x + 4,
                tree.y - 38,
                12,
                8
            );


            ctx.restore();

        }
    );


    /* folhas caindo */

    forestLeaves.forEach(
        (leaf,index)=>{

            const sway =
                Math.sin(
                    t * 1.7 +
                    leaf.p
                ) *
                10 *
                leaf.s;


            const fall =
                (
                    t *
                    (7 + leaf.s * 2) +
                    leaf.p * 35
                ) %
                230;


            const x =
                (
                    leaf.x +
                    sway +
                    canvas.width
                ) %
                canvas.width;


            const y =
                95 +
                fall;


            const rotation =
                Math.sin(
                    t * 2 +
                    leaf.p
                ) *
                0.5;


            ctx.save();


            ctx.translate(
                x,
                y
            );


            ctx.rotate(
                rotation
            );


            ctx.fillStyle =
                index % 2
                    ? '#758f4d'
                    : '#91a85c';


            ctx.fillRect(
                -3,
                -1,
                7,
                3
            );


            ctx.fillRect(
                0,
                -4,
                3,
                8
            );


            ctx.restore();

        }
    );


    /* capim */

    forestGrass.forEach(
        (grass,index)=>{

            const sway =
                Math.sin(
                    t * 2.1 +
                    grass.p
                ) *
                4;


            ctx.strokeStyle =
                index % 2
                    ? '#66804b'
                    : '#789257';


            ctx.lineWidth =
                2;


            ctx.beginPath();

            ctx.moveTo(
                grass.x,
                grass.y + 8
            );

            ctx.lineTo(
                grass.x + sway,
                grass.y - 7
            );

            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(
                grass.x + 3,
                grass.y + 8
            );

            ctx.lineTo(
                grass.x +
                6 +
                sway * 0.6,
                grass.y - 5
            );

            ctx.stroke();

        }
    );


    /* plantas pequenas */

    for(
        let x = 35;
        x < canvas.width;
        x += 65
    ){

        const y =
            300 -
            ((x * 9) % 45);


        const sway =
            Math.sin(
                t * 2 +
                x
            ) *
            2;


        ctx.fillStyle =
            '#708950';


        ctx.fillRect(
            x,
            y,
            3,
            12
        );


        ctx.fillRect(
            x + sway,
            y + 2,
            9,
            3
        );


        ctx.fillRect(
            x - 5 + sway,
            y + 6,
            7,
            3
        );

    }

}


/* =========================
   CAVERNA
========================= */

function drawCave(){

    const t =
        game.animationTime *
        0.001;


    /* teto */

    ctx.fillStyle =
        '#0b1012';


    ctx.fillRect(
        0,
        70,
        canvas.width,
        30
    );


    for(
        let x = 0;
        x < canvas.width;
        x += 48
    ){

        const height =
            12 +
            ((x * 7) % 25);


        ctx.fillRect(
            x,
            85,
            22,
            height
        );

    }


    /* paredes */

    ctx.fillStyle =
        '#171d20';


    ctx.fillRect(
        0,
        70,
        35,
        220
    );


    ctx.fillRect(
        canvas.width - 35,
        70,
        35,
        220
    );


    /* pedras */

    ctx.fillStyle =
        '#444d4d';


    for(
        let x = 50;
        x < canvas.width - 50;
        x += 70
    ){

        const y =
            95 +
            ((x * 5) % 55);


        ctx.fillRect(
            x,
            y,
            18,
            11
        );


        ctx.fillRect(
            x + 5,
            y - 8,
            9,
            9
        );

    }


    /* estalactites */

    ctx.fillStyle =
        '#4d5755';


    for(
        let x = 70;
        x < canvas.width - 60;
        x += 105
    ){

        ctx.fillRect(
            x,
            88,
            9,
            20
        );


        ctx.fillRect(
            x + 2,
            104,
            5,
            9
        );

    }


    /* cristais pulsando */

    const pulse =
        0.5 +
        Math.sin(
            t * 2.2
        ) *
        0.5;


    ctx.globalAlpha =
        0.45 +
        pulse *
        0.4;


    ctx.fillStyle =
        '#78918b';


    for(
        let x = 100;
        x < canvas.width - 70;
        x += 150
    ){

        ctx.fillRect(
            x,
            235,
            8,
            25
        );


        ctx.fillRect(
            x + 8,
            242,
            7,
            18
        );


        ctx.fillRect(
            x + 4,
            226,
            7,
            16
        );

    }


    ctx.globalAlpha =
        1;


    /* poças */

    ctx.fillStyle =
        '#263c3f';


    for(
        let x = 55;
        x < canvas.width - 50;
        x += 120
    ){

        ctx.fillRect(
            x,
            272,
            55,
            8
        );


        ctx.fillStyle =
            '#5c7776';


        const shine =
            (
                Math.sin(
                    t * 1.8 +
                    x
                ) +
                1
            ) *
            0.5;


        ctx.globalAlpha =
            0.25 +
            shine *
            0.5;


        ctx.fillRect(
            x + 10,
            274,
            18,
            2
        );


        ctx.globalAlpha =
            1;


        ctx.fillStyle =
            '#263c3f';

    }

}


/* =========================
   RIO
   ÁGUA ANIMADA
========================= */

function drawRiver(){

    const t =
        game.animationTime *
        0.001;


    /* margens */

    ctx.fillStyle =
        '#3d533d';


    ctx.fillRect(
        0,
        202,
        canvas.width,
        12
    );


    ctx.fillRect(
        0,
        286,
        canvas.width,
        8
    );


    /* água */

    ctx.fillStyle =
        '#153b45';


    ctx.fillRect(
        0,
        214,
        canvas.width,
        72
    );


    /* correnteza */

    for(
        let row = 0;
        row < 4;
        row++
    ){

        const y =
            224 +
            row * 17;


        const speed =
            45 +
            row * 13;


        const offset =
            (
                t *
                speed
            ) %
            130;


        ctx.fillStyle =
            row % 2
                ? '#3c6970'
                : '#4a7578';


        for(
            let x = -130 + offset;
            x < canvas.width + 130;
            x += 130
        ){

            const width =
                35 +
                ((row * 17) % 25);


            ctx.fillRect(
                x,
                y,
                width,
                3
            );

        }

    }


    /* reflexos */

    ctx.fillStyle =
        '#86aaa0';


    riverBubbles.forEach(
        (bubble,index)=>{

            const x =
                (
                    bubble.x +
                    t *
                    (35 + index * 5) *
                    bubble.s
                ) %
                (canvas.width + 60) -
                30;


            const y =
                bubble.y +
                Math.sin(
                    t * 1.4 +
                    bubble.p
                ) *
                2;


            const alpha =
                0.35 +
                (
                    Math.sin(
                        t * 2 +
                        bubble.p
                    ) +
                    1
                ) *
                0.2;


            ctx.globalAlpha =
                alpha;


            ctx.fillRect(
                x,
                y,
                bubble.w,
                2
            );

        }
    );


    ctx.globalAlpha =
        1;


    /* pedras */

    ctx.fillStyle =
        '#5c6656';


    for(
        let x = 25;
        x < canvas.width;
        x += 85
    ){

        ctx.fillRect(
            x,
            194,
            25,
            10
        );


        ctx.fillRect(
            x + 5,
            189,
            15,
            7
        );


        ctx.fillRect(
            x + 35,
            286,
            28,
            8
        );

    }


    /* plantas da margem */

    for(
        let x = 10;
        x < canvas.width;
        x += 60
    ){

        const sway =
            Math.sin(
                t * 2 +
                x * 0.08
            ) *
            3;


        ctx.strokeStyle =
            '#45663b';


        ctx.lineWidth =
            3;


        ctx.beginPath();

        ctx.moveTo(
            x,
            205
        );

        ctx.lineTo(
            x + sway,
            178
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            x + 5,
            205
        );

        ctx.lineTo(
            x + 10 + sway,
            184
        );

        ctx.stroke();

    }

    drawRiverBridge();

}

function drawRiverBridge(){
    const x = 420;
    const y = 198;
    const w = 120;
    const h = 100;

    ctx.save();

    // Sombra da ponte sobre a água.
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(x + 7, y + 5, w, h);

    // Vigas de sustentação.
    ctx.fillStyle = '#4b3424';
    ctx.fillRect(x - 5, y + 3, 8, h - 4);
    ctx.fillRect(x + w - 3, y + 3, 8, h - 4);

    // Tábuas do caminho.
    ctx.fillStyle = '#805b38';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#a77a4b';
    for(let plankY = y + 4; plankY < y + h - 2; plankY += 10){
        ctx.fillRect(x + 4, plankY, w - 8, 6);
    }
    ctx.fillStyle = '#5d412c';
    ctx.fillRect(x, y, 5, h);
    ctx.fillRect(x + w - 5, y, 5, h);

    // Pregos pixelados e linhas das tábuas.
    ctx.fillStyle = '#d0b17a';
    for(let plankY = y + 7; plankY < y + h - 3; plankY += 10){
        ctx.fillRect(x + 9, plankY, 3, 2);
        ctx.fillRect(x + w - 12, plankY, 3, 2);
    }

    // Corrimãos dos dois lados para deixar a travessia legível.
    ctx.fillStyle = '#563c29';
    ctx.fillRect(x - 3, y - 2, 5, h + 4);
    ctx.fillRect(x + w - 2, y - 2, 5, h + 4);
    ctx.fillStyle = '#c49a63';
    ctx.fillRect(x - 7, y - 3, 13, 5);
    ctx.fillRect(x + w - 6, y - 3, 13, 5);
    ctx.fillRect(x - 7, y + h - 2, 13, 5);
    ctx.fillRect(x + w - 6, y + h - 2, 13, 5);

    // Placa discreta na margem.
    ctx.fillStyle = '#60452d';
    ctx.fillRect(x + 38, y - 24, 44, 17);
    ctx.fillStyle = '#ead7a5';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PONTE', x + w / 2, y - 12);

    ctx.restore();
}


/* =========================
   RUÍNAS
========================= */

function drawRuins(){

    const t =
        game.animationTime *
        0.001;


    /* construções */

    ctx.fillStyle =
        '#302c25';


    for(
        let x = 70;
        x < canvas.width;
        x += 150
    ){

        ctx.fillRect(
            x,
            95,
            35,
            80
        );


        ctx.fillRect(
            x - 12,
            90,
            60,
            12
        );

    }


    /* blocos */

    ctx.fillStyle =
        '#5b5244';


    ctx.fillRect(
        400,
        105,
        95,
        12
    );


    ctx.fillRect(
        410,
        117,
        14,
        60
    );


    ctx.fillRect(
        470,
        117,
        14,
        60
    );


    /* estrutura */

    ctx.fillStyle =
        '#756b55';


    ctx.fillRect(
        700,
        105,
        80,
        15
    );


    ctx.fillRect(
        730,
        120,
        15,
        65
    );


    /* pedras */

    ctx.fillStyle =
        '#756b55';


    for(
        let x = 35;
        x < canvas.width;
        x += 115
    ){

        const y =
            245 +
            ((x * 3) % 28);


        ctx.fillRect(
            x,
            y,
            25,
            12
        );


        ctx.fillRect(
            x + 7,
            y - 7,
            13,
            8
        );

    }


    /* vegetação */

    for(
        let x = 80;
        x < canvas.width;
        x += 130
    ){

        const sway =
            Math.sin(
                t * 1.8 +
                x * 0.05
            ) *
            3;


        ctx.strokeStyle =
            '#3d5936';


        ctx.lineWidth =
            4;


        ctx.beginPath();

        ctx.moveTo(
            x,
            220
        );

        ctx.lineTo(
            x + sway,
            165
        );

        ctx.stroke();


        ctx.lineWidth =
            3;


        ctx.beginPath();

        ctx.moveTo(
            x + 5,
            205
        );

        ctx.lineTo(
            x + 18 + sway,
            180
        );

        ctx.stroke();

    }


    /* folhas no chão */

    for(
        let x = 40;
        x < canvas.width;
        x += 90
    ){

        const y =
            215 +
            ((x * 11) % 65);


        const sway =
            Math.sin(
                t * 2.2 +
                x
            ) *
            2;


        ctx.fillStyle =
            '#536c43';


        ctx.fillRect(
            x + sway,
            y,
            10,
            3
        );


        ctx.fillRect(
            x - 2 + sway,
            y + 5,
            7,
            3
        );

    }

}


/* =========================
   SAÍDA
   SEM CAMINHO
========================= */

function drawExit(){

    if(
        game.routeOpen ||
        game.battle
    ){

        return;

    }


    const pulse =
        0.55 +
        (
            Math.sin(
                game.animationTime *
                0.004
            ) +
            1
        ) *
        0.2;


    ctx.globalAlpha =
        pulse;


    ctx.fillStyle =
        game.exitCooldown > 0
            ? '#6c684d'
            : '#d7ba3f';


    /*
        IMPORTANTE:

        Aqui existe somente o marcador
        da saída.

        NÃO existe mais nenhuma faixa
        de caminho no cenário.
    */

    ctx.fillRect(
        canvas.width - 18,
        135,
        6,
        80
    );


    ctx.fillRect(
        canvas.width - 34,
        135,
        22,
        6
    );


    ctx.globalAlpha =
        1;

}


/* =========================
   VIAJANTE IDOSO
========================= */

function drawOldMan(){

    if(game.location !== 'Floresta'){
        return;
    }

    // Sprite sheet: 22 x 117 px, dividido em três quadros de 22 x 39.
    const x = 490;
    const y = 228;
    const frame = 0; // Mantém o quadro estável; o sprite original pisca nos quadros alternados.
    const drawW = 44;
    const drawH = 78;

    // Sombra no chão.
    ctx.fillStyle = 'rgba(0,0,0,.28)';
    ctx.fillRect(x + 4, y + 68, 36, 7);

    if(oldPersonLoaded){
        ctx.drawImage(
            oldPersonImage,
            0,
            frame * 39,
            22,
            39,
            x,
            y,
            drawW,
            drawH
        );
    }
    else{
        // Silhueta alternativa caso a imagem ainda não esteja na pasta images.
        ctx.fillStyle = '#d4c7a1';
        ctx.fillRect(x + 13, y + 5, 18, 20);
        ctx.fillStyle = '#777b69';
        ctx.fillRect(x + 9, y + 25, 27, 34);
        ctx.fillStyle = '#a2a53c';
        ctx.fillRect(x + 9, y + 40, 27, 20);
        ctx.fillStyle = '#6b5138';
        ctx.fillRect(x + 33, y + 31, 4, 32);
    }

    if(isNearOldMan() && !game.dialogueOpen && !game.battle){
        const pulse = 1 + Math.sin(game.animationTime * 0.008) * 1.5;
        ctx.fillStyle = '#171b14';
        ctx.fillRect(x + 12, y - 24 - pulse, 20, 19);
        ctx.strokeStyle = '#d7ba3f';
        ctx.strokeRect(x + 12, y - 24 - pulse, 20, 19);
        ctx.fillStyle = '#d7ba3f';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('E', x + 22, y - 10 - pulse);
        ctx.textAlign = 'start';
    }

}


/* =========================
   ARMA DO JOGADOR
========================= */

function drawPlayerWeapon(){

    if(!game.character){
        return;
    }

    const spriteIndex = Number.isInteger(game.character.weapon)
        ? game.character.weapon
        : 1;

    const frameWidth = 13;
    const frameHeight = 35;

    const baseX = player.x - 15;
    const baseY = player.y - 15 + (player.moving ? player.walkOffset : 0);

    let weaponX = baseX + 39;
    let weaponY = baseY + 16;

    if(player.direction === 'left'){
        weaponX = baseX - 2;
    }
    else if(player.direction === 'up'){
        weaponX = baseX + 12;
        weaponY = baseY - 3;
    }
    else if(player.direction === 'down'){
        weaponX = baseX + 33;
        weaponY = baseY + 25;
    }

    if(weaponImageLoaded){
        ctx.drawImage(
            weaponImage,
            spriteIndex * frameWidth,
            0,
            frameWidth,
            frameHeight,
            weaponX,
            weaponY,
            21,
            48
        );
    }
    else{
        // Arma simples de reserva se weapons.png não estiver na pasta images.
        ctx.fillStyle = spriteIndex === 0 || spriteIndex === 2
            ? '#9b7ac5'
            : '#b5b7ae';
        ctx.fillRect(weaponX + 7, weaponY, 5, 37);
        ctx.fillStyle = '#5b4630';
        ctx.fillRect(weaponX + 4, weaponY + 27, 11, 4);
    }

}


/* =========================
   JOGADOR
========================= */

function drawPlayer(){

    ctx.save();


    const bob =
        player.moving
            ? player.walkOffset
            : 0;


    const x =
        player.x - 15;


    const jumpHeight = player.jumpTime > 0
        ? Math.sin((1 - player.jumpTime / 480) * Math.PI) * 24
        : 0;

    const y =
        player.y - 15 +
        bob - jumpHeight;


    const width =
        65;


    const height =
        65;


    if(
        player.direction ===
        'left'
    ){

        ctx.translate(
            x + width / 2,
            0
        );


        ctx.scale(
            -1,
            1
        );


        ctx.translate(
            -(x + width / 2),
            0
        );

    }


    if(playerImageLoaded){

        ctx.drawImage(
            playerImage,
            x,
            y,
            width,
            height
        );

    }

    else{

        ctx.fillStyle =
            '#151817';


        ctx.fillRect(
            x + 15,
            y + 10,
            34,
            46
        );


        ctx.fillStyle =
            '#657a3f';


        ctx.fillRect(
            x + 20,
            y + 18,
            24,
            25
        );

    }


    ctx.restore();

}


/* =========================
   INIMIGO
========================= */

function drawEnemy(){

    if(
        !game.battle ||
        !game.enemy
    ){

        return;

    }


    ctx.save();


    let x =
        650;


    const y =
        205;


    if(
        game.enemy.attacking
    ){

        game.enemy.attackTimer++;


        x +=
            Math.sin(
                game.enemy.attackTimer /
                2
            ) *
            10;

    }


    if(
        game.enemy.hitFlash >
        0
    ){

        game.enemy.hitFlash--;


        ctx.globalAlpha =
            game.enemy.hitFlash % 2
                ? 0.45
                : 1;

    }


    if(game.enemy.kind === 'mimic'){

        if(mimicImageLoaded){
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(mimicImage, x, y - 5, 72, 86);
        } else {
            drawMimic(x, y);
        }

    }

    else if(enemyImageLoaded){

        ctx.drawImage(
            enemyImage,
            x,
            y,
            70,
            70
        );

    }

    else{

        ctx.fillStyle =
            '#6c5747';


        ctx.fillRect(
            x,
            y,
            50,
            50
        );

    }


    ctx.restore();

}


/* =========================
   MIMIC
========================= */

function drawMimic(x, y){

    const t = Math.sin(game.animationTime * 0.012) * 2;

    // Corpo do baú.
    ctx.fillStyle = '#4a2d20';
    ctx.fillRect(x + 2, y + 29 + t, 78, 43);

    ctx.fillStyle = '#8b5a32';
    ctx.fillRect(x + 7, y + 34 + t, 68, 31);

    ctx.fillStyle = '#b17a42';
    ctx.fillRect(x + 7, y + 34 + t, 68, 6);

    // Tampa aberta, como uma mandíbula.
    ctx.fillStyle = '#392117';
    ctx.fillRect(x, y + 13 + t, 82, 22);

    ctx.fillStyle = '#8b5a32';
    ctx.fillRect(x + 5, y + 16 + t, 72, 13);

    // Olhos brilhantes.
    ctx.fillStyle = '#f0d75a';
    ctx.fillRect(x + 20, y + 19 + t, 10, 8);
    ctx.fillRect(x + 53, y + 19 + t, 10, 8);

    ctx.fillStyle = '#181510';
    ctx.fillRect(x + 24, y + 21 + t, 4, 5);
    ctx.fillRect(x + 57, y + 21 + t, 4, 5);

    // Dentes.
    ctx.fillStyle = '#eee4bf';
    ctx.fillRect(x + 14, y + 31 + t, 7, 9);
    ctx.fillRect(x + 28, y + 31 + t, 7, 8);
    ctx.fillRect(x + 47, y + 31 + t, 7, 8);
    ctx.fillRect(x + 61, y + 31 + t, 7, 9);

    // Fechadura e faixas metálicas.
    ctx.fillStyle = '#c1a85e';
    ctx.fillRect(x + 38, y + 35 + t, 8, 15);
    ctx.fillStyle = '#252722';
    ctx.fillRect(x + 40, y + 39 + t, 4, 7);

    ctx.fillStyle = '#6c482b';
    ctx.fillRect(x + 8, y + 68 + t, 14, 7);
    ctx.fillRect(x + 59, y + 68 + t, 14, 7);

}


/* =========================
   FINAL
========================= */

function finishGame(){

    if(game.finished){

        return;

    }


    game.finished =
        true;

    game.running =
        false;


    $('endingText')
        .textContent =
        `${game.character.name} chegou ao ponto onde todas as jornadas se encontram. As novas saídas levaram por ambientes diferentes, cada um com seus próprios perigos e descobertas. Mesmo com escolhas diferentes, a jornada termina no mesmo encontro.`;


    showScreen(
        'ending'
    );

}


/* =========================
   LOOP
========================= */

let lastFrameTime =
    0;


function gameLoop(timestamp){

    if(!game.running){

        return;

    }


    if(!lastFrameTime){

        lastFrameTime =
            timestamp;

    }


    const delta =
        Math.min(
            50,
            timestamp -
            lastFrameTime
        );


    lastFrameTime =
        timestamp;


    game.animationTime +=
        delta;

    if(player.jumpTime > 0){
        player.jumpTime = Math.max(0, player.jumpTime - delta);
        player.jumping = player.jumpTime > 0;
    }

    updatePlayer();

    drawGame();


    requestAnimationFrame(
        gameLoop
    );

}


function drawGame(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawBackground();

    drawChests();

    drawOldMan();

    drawPlayer();

    drawPlayerWeapon();

    drawEnemy();

}


/* =========================
   CELULAR
========================= */

function checkOrientation(){

    const mobile =
        window.matchMedia(
            '(pointer:coarse)'
        ).matches ||
        window.innerWidth <= 900;


    const portrait =
        window.innerHeight >
        window.innerWidth;


    if(
        mobile &&
        portrait &&
        game.running
    ){

        $('rotateScreen')
            .classList
            .remove('hidden');

    }

    else{

        $('rotateScreen')
            .classList
            .add('hidden');

    }

}


window.addEventListener(
    'resize',
    checkOrientation
);


window.addEventListener(
    'orientationchange',
    ()=>{
        setTimeout(
            checkOrientation,
            100
        );
    }
);


/* =========================
   INICIALIZAÇÃO
========================= */

createCharacterCards();

/* =========================================================
   ATUALIZAÇÃO DE EXPLORAÇÃO — VILA, MINA, MERCADOR E INVENTÁRIO
   Preserva os sprites originais de personagens, armas e Mimics.
========================================================= */
game.interiorHouse = null;
game.coins = 35;
game.inventory = [
    {name:'Arma equipada', detail:'Acompanha o personagem durante a caminhada.', type:'equipamento', qty:1},
    {name:'Poção de cura', detail:'Recupera 35 pontos de vida.', type:'consumível', qty:1},
    {name:'Fruta silvestre', detail:'Recupera 20 pontos de vida.', type:'consumível', qty:2}
];
game.shopOpen = false;
game.visitedRooms = [];
game.npcTalk = {};
game.caveExitChoice = false;

// Mantém os caminhos originais das artes. A imagem própria de mimics.png continua sendo usada.
const villageHouses = [
    {id:'casa-1',x:55,y:105,w:108,h:75,doorX:122,doorY:183,label:'Casa da artesã'},
    {id:'casa-2',x:195,y:95,w:70,h:62,doorX:230,doorY:163,label:'Casa do cartógrafo',chest:'vila-casa-2'},
    {id:'casa-3',x:615,y:100,w:112,h:74,doorX:671,doorY:174,label:'Casa abandonada',chest:'vila-casa-3-mimic'},
    {id:'casa-4',x:785,y:135,w:110,h:72,doorX:840,doorY:207,label:'Casa do pescador'},
    {id:'casa-5',x:80,y:305,w:110,h:75,doorX:135,doorY:380,label:'Casa da curandeira',chest:'vila-casa-5'},
    {id:'casa-6',x:545,y:300,w:100,h:70,doorX:595,doorY:370,label:'Casa fechada',chest:'vila-casa-6-mimic'}
];

// Inventory/shop panels are created inside the existing game frame, so they scale with mobile/tablet.
const gameFrame = $('gameFrame');
const inventoryButton = document.createElement('button');
inventoryButton.id='inventoryButton'; inventoryButton.className='inventory-button'; inventoryButton.type='button'; inventoryButton.innerHTML='🎒 <span>INVENTÁRIO</span> <small>(I)</small>';
$('mapButton').insertAdjacentElement('afterend', inventoryButton);
const inventoryOverlay = document.createElement('div');
inventoryOverlay.id='inventoryOverlay'; inventoryOverlay.className='game-modal hidden';
inventoryOverlay.innerHTML=`<section class="game-modal-card" role="dialog" aria-modal="true" aria-labelledby="inventoryTitle"><header><div><small>PERTENCES DO VIAJANTE</small><h2 id="inventoryTitle">INVENTÁRIO</h2></div><button type="button" data-close-inventory aria-label="Fechar">×</button></header><div id="inventoryStats" class="inventory-stats"></div><div id="inventoryItems" class="inventory-items"></div><p class="modal-help">A arma equipada permanece visível enquanto você anda. No teclado: I ou ESC para fechar.</p></section>`;
gameFrame.appendChild(inventoryOverlay);
const shopOverlay = document.createElement('div'); shopOverlay.id='shopOverlay'; shopOverlay.className='game-modal hidden';
shopOverlay.innerHTML=`<section class="game-modal-card shop-card" role="dialog" aria-modal="true" aria-labelledby="shopTitle"><header><div><small>MERCADOR AMBULANTE</small><h2 id="shopTitle">MERCADOR DO RIO</h2></div><button type="button" data-close-shop aria-label="Fechar">×</button></header><p class="shop-intro">“Viajo pelas margens há anos. Tenho provisões, mas nada é de graça.”</p><div class="shop-coins" id="shopCoins"></div><p id="shopFeedback" class="shop-feedback" aria-live="polite">Escolha um item para comprar.</p><div class="shop-items"><button type="button" data-buy="potion"><b>🧪 Poção de cura</b><span>Recupera 35 PV</span><strong>15 moedas</strong></button><button type="button" data-buy="fruit"><b>🍎 Fruta silvestre</b><span>Recupera 20 PV</span><strong>8 moedas</strong></button><button type="button" data-buy="crystal"><b>💎 Cristal de rota</b><span>Item de troca e exploração</span><strong>12 moedas</strong></button></div><p class="modal-help">A loja só fica disponível na região do Rio.</p></section>`;
gameFrame.appendChild(shopOverlay);

function addInventoryItem(name, detail, qty=1, type='item'){
    const found=game.inventory.find(i=>i.name===name);
    if(found) found.qty+=qty; else game.inventory.push({name,detail,qty,type});
    renderInventory();
}
function renderInventory(){
    const list=$('inventoryItems'); if(!list) return;
    $('inventoryStats').innerHTML=`<span>❤️ Vida: <b>${player.hp}/${player.maxHP}</b></span><span>🪙 Moedas: <b>${game.coins||0}</b></span><span>📍 Local: <b>${game.location||'—'}</b></span>`;
    list.innerHTML='';
    if(!game.inventory.length){list.innerHTML='<p class="empty-inventory">Sua mochila está vazia.</p>';return;}
    game.inventory.forEach(item=>{const card=document.createElement('article');card.className='inventory-item';card.innerHTML=`<div><strong>${item.name}</strong><small>${item.detail||'Item coletado durante a jornada.'}</small></div><b>×${item.qty}</b>`;list.appendChild(card);});
}
function toggleInventory(force){
    const isOpen=!inventoryOverlay.classList.contains('hidden');
    if(!game.running || game.battle || game.dialogueOpen || game.routeOpen || game.mapOpen || (game.paused&&!isOpen)) return;
    const open=typeof force==='boolean'?force:!isOpen;
    inventoryOverlay.classList.toggle('hidden',!open);
    game.paused=open; resetKeys(); renderInventory();
}
inventoryButton.addEventListener('click',()=>toggleInventory());
inventoryOverlay.querySelector('[data-close-inventory]').addEventListener('click',()=>toggleInventory(false));
shopOverlay.querySelector('[data-close-shop]').addEventListener('click',closeShop);
function openShop(){
    if(game.location!=='Rio') return;
    game.shopOpen=true; game.paused=true; shopOverlay.classList.remove('hidden'); updateShopCoins(); resetKeys();
}
function closeShop(){game.shopOpen=false;game.paused=false;shopOverlay.classList.add('hidden');resetKeys();}
function updateShopCoins(){ $('shopCoins').textContent=`Você tem ${game.coins||0} moedas.`; }
function buyShopItem(kind){
    const products={potion:{price:15,name:'Poção de cura',detail:'Recupera 35 pontos de vida.',type:'consumível'},fruit:{price:8,name:'Fruta silvestre',detail:'Recupera 20 pontos de vida.',type:'consumível'},crystal:{price:12,name:'Cristal de rota',detail:'Um cristal útil para trocas e caminhos secretos.',type:'material'}};
    const item=products[kind]; if(!item)return;
    if(game.coins<item.price){$('shopFeedback').textContent='Você ainda não tem moedas suficientes. Volte quando encontrar mais.';return;}
    game.coins-=item.price; addInventoryItem(item.name,item.detail,1,item.type); updateShopCoins(); renderInventory();
    $('shopFeedback').textContent=`Boa escolha! ${item.name} foi colocado na sua mochila.`;
}
shopOverlay.querySelectorAll('[data-buy]').forEach(b=>b.addEventListener('click',()=>buyShopItem(b.dataset.buy)));

function isNearPoint(x,y,r=58){return Math.hypot(player.x+player.width/2-x,player.y+player.height/2-y)<r;}
function nearestVillageDoor(){
    if(game.location!=='Vila Verde' || game.interiorHouse) return null;
    return villageHouses.find(h=>isNearPoint(h.doorX,h.doorY,56))||null;
}
function nearestVillageNPC(){
    if(game.location!=='Vila Verde' || game.interiorHouse) return null;
    const npcs=[{id:'mara',x:360,y:265,name:'Mara, a moradora'},{id:'timo',x:730,y:280,name:'Timo, o aprendiz'},{id:'nilo',x:460,y:315,name:'Nilo, o jardineiro'}];
    return npcs.find(n=>isNearPoint(n.x,n.y,58))||null;
}
function enterHouse(house){
    game.interiorHouse=house.id; if(!game.visitedRooms.includes(house.id)) game.visitedRooms.push(house.id);
    player.x=460;player.y=405;player.direction='up';
    showTemporaryDialogue('NARRADOR',`${house.label}. O interior está quieto, coberto por uma fina camada de poeira. Procure com cuidado e pressione E perto do baú ou da porta para sair.`);
}
function exitHouse(){game.interiorHouse=null;player.x=houseExitPosition.x;player.y=houseExitPosition.y;player.direction='down';}
let houseExitPosition={x:122,y:210};
function nearestInteriorChest(){
    if(game.location!=='Vila Verde' || !game.interiorHouse) return null;
    return chestSpots.find(ch=>ch.scene==='Vila Verde' && ch.house===game.interiorHouse && game.chestStates[ch.id]!=='opened')||null;
}
function isNearMerchant(){return game.location==='Rio' && !game.interiorHouse && isNearPoint(790,345,75);}
function interactWithVillage(){
    if(game.location==='Vila Verde' && game.interiorHouse){
        if(isNearPoint(460,445,70)){const house=villageHouses.find(h=>h.id===game.interiorHouse);houseExitPosition={x:house?house.doorX:122,y:house?house.doorY+18:210};game.interiorHouse=null;player.x=houseExitPosition.x-17;player.y=houseExitPosition.y;player.direction='down';return true;}
        const chest=nearestInteriorChest();
        if(chest && isNearPoint(chest.x,chest.y,62)) return openNearbyChest();
        showTemporaryDialogue('NARRADOR','Você examina o cômodo. O pó se move sob seus pés, mas nada mais chama sua atenção.'); return true;
    }
    const door=nearestVillageDoor();
    if(door){houseExitPosition={x:door.doorX,y:door.doorY+14};enterHouse(door);return true;}
    const npc=nearestVillageNPC();
    if(npc){
        const lines={mara:['MORADORA','A praça tem várias saídas, mas as casas antigas escondem o que os moradores deixaram para trás.'],timo:['APRENDIZ','Vi luzes na entrada da mineradora. Se for até lá, siga os trilhos e não confie em todo baú.'],nilo:['JARDINEIRO','As bandeirolas ainda balançam, mas as raízes estão ficando escuras. O Coração da Ilha está mudando tudo.']};
        const line=lines[npc.id]; showTemporaryDialogue(line[0],line[1]);game.npcTalk[npc.id]=(game.npcTalk[npc.id]||0)+1;return true;
    }
    return false;
}

const originalInteractForExploration=interact;
interact=function(){
    if(game.shopOpen){closeShop();return;}
    if(!inventoryOverlay.classList.contains('hidden')){toggleInventory(false);return;}
    if(game.interiorHouse){interactWithVillage();return;}
    if(game.location==='Vila Verde' && interactWithVillage()) return;
    if(isNearMerchant()){openShop();return;}
    originalInteractForExploration();
};

// Draw enterable rooms; the village exterior continues to use the same animated scenery.
const originalDrawBackgroundForExploration=drawBackground;
drawBackground=function(){
    if(game.location==='Vila Verde' && game.interiorHouse){drawHouseInterior();return;}
    if(game.location==='Mina Antiga'){drawMine();return;}
    originalDrawBackgroundForExploration();
    if(game.location==='Caverna') drawCaveExitMarkers();
};
function drawCaveExitMarkers(){
    // Three visually distinct portals: upper, lower, and right-hand tunnel.
    ctx.fillStyle='#080d0f';ctx.fillRect(410,76,105,24);ctx.fillRect(410,485,105,45);ctx.fillRect(905,220,55,115);
    ctx.fillStyle='#6b7770';ctx.fillRect(420,78,85,5);ctx.fillRect(420,485,85,5);ctx.fillRect(907,230,5,95);
    ctx.fillStyle='#8db8a0';ctx.globalAlpha=.35+Math.sin(game.animationTime*.004)*.12;ctx.fillRect(430,82,65,10);ctx.fillRect(430,489,65,12);ctx.fillRect(913,242,30,70);ctx.globalAlpha=1;
    ctx.fillStyle='#d5dfc1';ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillText('↑ VILA',462,116);ctx.fillText('↓ MINA',462,478);ctx.fillText('LAGO →',875,278);ctx.textAlign='left';
}
function drawHouseInterior(){
    const t=game.animationTime*.001;
    ctx.fillStyle='#1b2822';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#4a3d2d';ctx.fillRect(25,75,910,430);
    ctx.fillStyle='#806444';ctx.fillRect(45,95,870,390);
    ctx.fillStyle='#9a7b53';ctx.fillRect(60,110,840,355);
    ctx.fillStyle='#4d3b2a';ctx.fillRect(60,110,840,15);ctx.fillRect(60,450,840,15);ctx.fillRect(60,110,15,355);ctx.fillRect(885,110,15,355);
    // timber floorboards
    for(let y=140;y<445;y+=34){ctx.fillStyle=y%2?'#b28b5b':'#a78252';ctx.fillRect(80,y,800,3);}
    // shelves and furniture, animated lantern glow
    ctx.fillStyle='#553b29';ctx.fillRect(110,145,190,65);ctx.fillStyle='#7b5637';ctx.fillRect(118,151,174,12);ctx.fillRect(118,178,174,10);
    ctx.fillStyle='#5d402b';ctx.fillRect(700,150,125,80);ctx.fillStyle='#b28a55';ctx.fillRect(710,160,105,8);ctx.fillRect(710,187,105,8);
    ctx.fillStyle='#61442e';ctx.fillRect(360,300,190,55);ctx.fillStyle='#987149';ctx.fillRect(350,290,210,15);ctx.fillRect(375,350,10,45);ctx.fillRect(525,350,10,45);
    ctx.fillStyle=`rgba(255,190,84,${.15+Math.sin(t*3)*.06})`;ctx.fillRect(445,130,70,90);ctx.fillStyle='#e7bd68';ctx.fillRect(474,147,10,22);ctx.fillStyle='#fff0b0';ctx.fillRect(477,139,4,9);
    // visible exit marker
    ctx.fillStyle='#2c2118';ctx.fillRect(420,430,80,50);ctx.fillStyle='#d9bd7e';ctx.font='bold 13px monospace';ctx.textAlign='center';ctx.fillText('E  SAIR',460,475);ctx.textAlign='left';
    const chest=chestSpots.find(ch=>ch.scene==='Vila Verde'&&ch.house===game.interiorHouse);
    if(chest && game.chestStates[chest.id]!=='opened'){
        ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(chest.x-22,chest.y+11,44,8);ctx.fillStyle='#4b3020';ctx.fillRect(chest.x-22,chest.y-8,44,24);ctx.fillStyle='#9b6739';ctx.fillRect(chest.x-18,chest.y-5,36,18);ctx.fillStyle='#bd8a4b';ctx.fillRect(chest.x-22,chest.y-12,44,8);ctx.fillStyle='#e6c66b';ctx.fillRect(chest.x-3,chest.y-4,6,10);
        if(chest.kind==='mimic'&&Math.sin(t*4)>0.65){ctx.fillStyle='#f4df7a';ctx.fillRect(chest.x-11,chest.y-7,5,3);ctx.fillRect(chest.x+6,chest.y-7,5,3);}
        if(isNearPoint(chest.x,chest.y,62)){ctx.fillStyle='#15180f';ctx.fillRect(chest.x-10,chest.y-36,20,18);ctx.strokeStyle='#e5c969';ctx.strokeRect(chest.x-10,chest.y-36,20,18);ctx.fillStyle='#e5c969';ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillText('E',chest.x,chest.y-23);ctx.textAlign='left';}
    } else {ctx.fillStyle='#d7c6a0';ctx.font='12px monospace';ctx.fillText('O cômodo foi vasculhado.',350,250);}
    ctx.fillStyle='#f3edcf';ctx.font='bold 15px monospace';ctx.fillText((villageHouses.find(h=>h.id===game.interiorHouse)||{label:'INTERIOR'}).label.toUpperCase(),90,90);
}
function drawMine(){
    const t=game.animationTime*.001;ctx.fillStyle='#101616';ctx.fillRect(0,0,960,540);ctx.fillStyle='#303a35';ctx.fillRect(0,75,960,465);
    // cavernous ceiling, rock ledges and fixed rails
    for(let x=0;x<960;x+=52){ctx.fillStyle=x%2?'#1b2523':'#232d29';ctx.fillRect(x,72,30,24+(x*7%25));ctx.fillRect(x+6,98,16,14);}
    ctx.fillStyle='#5b4a37';ctx.fillRect(0,375,960,18);ctx.fillStyle='#806646';ctx.fillRect(0,382,960,4);ctx.fillRect(0,410,960,4);
    for(let x=-20;x<980;x+=82){ctx.fillStyle='#514433';ctx.fillRect(x,375,7,40);ctx.fillRect(x+36,375,7,40);}
    // branching rails make the chamber feel larger
    ctx.strokeStyle='#9b825b';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(450,405);ctx.lineTo(270,300);ctx.lineTo(120,300);ctx.moveTo(450,405);ctx.lineTo(650,300);ctx.lineTo(850,300);ctx.stroke();
    for(let i=0;i<8;i++){const x=100+i*108;ctx.fillStyle='#4f7b67';ctx.globalAlpha=.45+Math.sin(t*2+i)*.2;ctx.fillRect(x,220+(i%3)*35,7,15);ctx.fillRect(x+7,228+(i%3)*35,5,9);}ctx.globalAlpha=1;
    // old mine entrance and torch glow
    [[90,260],[865,250],[475,145]].forEach(([x,y],i)=>{ctx.fillStyle='#5b4029';ctx.fillRect(x,y,7,33);ctx.fillStyle='#f4a64b';ctx.fillRect(x-3,y-8,13,13);ctx.fillStyle=`rgba(244,166,75,${.16+Math.sin(t*5+i)*.07})`;ctx.fillRect(x-12,y-18,31,35);});
    ctx.fillStyle='#eee2bd';ctx.font='bold 14px monospace';ctx.fillText('MINA ANTIGA',25,100);drawMineExits();
}
function drawMineExits(){ctx.fillStyle='#171e1a';ctx.fillRect(10,245,50,105);ctx.fillRect(900,245,50,105);ctx.fillStyle='#c2a46a';ctx.font='bold 11px monospace';ctx.fillText('ENTRADA',12,235);ctx.fillText('TÚNEL',900,235);}

// Villagers and the traveling merchant are pixel-drawn, matching the game's art style.
function drawPixelNPC(x,y,palette,kind='villager'){
    const bob=Math.sin(game.animationTime*.004+x)*1.5;ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(x-2,y+42,30,6);
    ctx.fillStyle=palette.hair;ctx.fillRect(x+5,y+3+bob,18,12);ctx.fillRect(x+2,y+8+bob,4,8);ctx.fillRect(x+22,y+8+bob,4,8);
    ctx.fillStyle=palette.skin;ctx.fillRect(x+7,y+9+bob,14,13);ctx.fillStyle='#18201b';ctx.fillRect(x+10,y+15+bob,3,3);ctx.fillRect(x+17,y+15+bob,3,3);
    ctx.fillStyle=palette.cloth;ctx.fillRect(x+4,y+22+bob,20,17);ctx.fillStyle=palette.trim;ctx.fillRect(x+4,y+30+bob,20,4);
    ctx.fillStyle=palette.boot;ctx.fillRect(x+5,y+38+bob,6,7);ctx.fillRect(x+17,y+38+bob,6,7);
    if(kind==='merchant'){ctx.fillStyle='#6a4b2c';ctx.fillRect(x+1,y+1+bob,26,5);ctx.fillRect(x+7,y-4+bob,14,6);ctx.fillStyle='#bd8c47';ctx.fillRect(x+20,y+25+bob,10,13);ctx.fillStyle='#e5c969';ctx.fillRect(x+22,y+28+bob,6,4);}
}
function drawVillageNPCs(){
    if(game.location==='Vila Verde'&&!game.interiorHouse){
        drawPixelNPC(346,244,{hair:'#6d4329',skin:'#d7b18a',cloth:'#6d9c6a',trim:'#c6d88d',boot:'#352b24'});
        drawPixelNPC(716,257,{hair:'#d6a95f',skin:'#d6a883',cloth:'#567f9b',trim:'#e0c67d',boot:'#302b26'});
        drawPixelNPC(448,292,{hair:'#493b2c',skin:'#d4a27c',cloth:'#b16b4e',trim:'#ead7a0',boot:'#302b26'});
        const near=nearestVillageNPC();if(near&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(near.x,near.y-20);
        const door=nearestVillageDoor();if(door&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(door.doorX,door.doorY-28);
    }
    if(game.location==='Rio'&&!game.interiorHouse){
        drawPixelNPC(778,315,{hair:'#3a3027',skin:'#d2a77f',cloth:'#a16c39',trim:'#e3c46b',boot:'#2a2924'},'merchant');
        if(isNearMerchant()&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(790,290);
    }
}
function drawInteractionMarker(x,y){const p=Math.sin(game.animationTime*.008)*2;ctx.fillStyle='#161a13';ctx.fillRect(x-10,y-19-p,20,17);ctx.strokeStyle='#dfc65f';ctx.strokeRect(x-10,y-19-p,20,17);ctx.fillStyle='#dfc65f';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText('E',x,y-7-p);ctx.textAlign='left';}

// Animate environmental details on top of the village/mineshaft background.
const originalDrawGameForExploration=drawGame;
drawGame=function(){
    originalDrawGameForExploration();
    drawVillageNPCs();
    if(game.interiorHouse){ctx.fillStyle='rgba(13,18,14,.78)';ctx.fillRect(12,510,936,24);ctx.fillStyle='#e7dfbf';ctx.font='12px monospace';ctx.textAlign='center';ctx.fillText('E — ABRIR BAÚ / SAIR PELA PORTA',480,526);ctx.textAlign='left';}
    if(game.location==='Mina Antiga'&&!game.battle){drawChests();}
    if(game.shopOpen){/* modal is HTML; world is paused behind it */}
};

// In the mine, fixed chests are visible along the rail ends; in the village, only the matching room's chest appears.
drawChests=function(){
    let visible=[];
    if(game.location==='Vila Verde'&&game.interiorHouse) visible=chestSpots.filter(ch=>ch.scene==='Vila Verde'&&ch.house===game.interiorHouse);
    if(game.location==='Mina Antiga') visible=chestSpots.filter(ch=>ch.scene==='Mina Antiga');
    for(const chest of visible){
        const state=game.chestStates[chest.id]||'unknown';
        if(state==='opened'){ctx.fillStyle='#5c422d';ctx.fillRect(chest.x-18,chest.y-2,36,13);ctx.fillStyle='#9a7547';ctx.fillRect(chest.x-15,chest.y,30,8);continue;}
        const wobble=chest.kind==='mimic'?Math.sin(game.animationTime*.006+chest.x)*1.1:0;
        ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(chest.x-22,chest.y+13,44,8);ctx.fillStyle='#4b3020';ctx.fillRect(chest.x-22,chest.y-7+wobble,44,23);ctx.fillStyle='#9b6739';ctx.fillRect(chest.x-18,chest.y-4+wobble,36,17);ctx.fillStyle='#bd8a4b';ctx.fillRect(chest.x-22,chest.y-12+wobble,44,8);ctx.fillStyle='#e6c66b';ctx.fillRect(chest.x-3,chest.y-3+wobble,6,10);
        if(chest.kind==='mimic'&&Math.sin(game.animationTime*.004+chest.x)>0.8){ctx.fillStyle='#f4df7a';ctx.fillRect(chest.x-11,chest.y-7+wobble,5,3);ctx.fillRect(chest.x+6,chest.y-7+wobble,5,3);}
        if(isNearPoint(chest.x,chest.y,62)&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(chest.x,chest.y-8);
    }
};
nearestChest=function(){
    const visible=game.location==='Vila Verde'&&game.interiorHouse
        ? chestSpots.filter(ch=>ch.scene==='Vila Verde'&&ch.house===game.interiorHouse)
        : game.location==='Mina Antiga'
            ? chestSpots.filter(ch=>ch.scene==='Mina Antiga') : [];
    let nearest=null,best=62;
    for(const chest of visible){if(game.chestStates[chest.id]==='opened')continue;const d=Math.hypot(player.x+player.width/2-chest.x,player.y+player.height/2-chest.y);if(d<best){nearest=chest;best=d;}}
    return nearest;
};
openNearbyChest=function(){
    const chest=nearestChest();if(!chest)return false;
    if(chest.kind==='mimic'){
        game.chestStates[chest.id]='known-mimic';game.chestBattleId=chest.id;game.forceMimic=true;startBattle();
        $('battleMessage').textContent='A tampa se ergue e a arte do Mimic revela a criatura escondida! Prepare-se para lutar.';return true;
    }
    game.chestStates[chest.id]='opened';
    const reward=giveChestReward();showTemporaryDialogue('BAÚ ENCONTRADO',`Você encontrou ${reward} dentro do baú guardado nesta construção.`);renderInventory();return true;
};

// Fixed mine and village chests only: remove any stale outside-the-house entries if an old save/script injected them.
chestSpots.splice(0,chestSpots.length,
    {id:'vila-casa-2',scene:'Vila Verde',house:'casa-2',x:650,y:375,mapX:225,mapY:112,kind:'normal'},
    {id:'vila-casa-3-mimic',scene:'Vila Verde',house:'casa-3',x:480,y:365,mapX:675,mapY:115,kind:'mimic'},
    {id:'vila-casa-5',scene:'Vila Verde',house:'casa-5',x:455,y:370,mapX:130,mapY:335,kind:'normal'},
    {id:'vila-casa-6-mimic',scene:'Vila Verde',house:'casa-6',x:465,y:370,mapX:590,mapY:330,kind:'mimic'},
    {id:'mina-baú-1',scene:'Mina Antiga',house:'mina',x:330,y:365,mapX:0,mapY:0,kind:'normal'},
    {id:'mina-baú-2-mimic',scene:'Mina Antiga',house:'mina',x:690,y:355,mapX:0,mapY:0,kind:'mimic'}
);

// Cave exits: three distinct choices lead to three different destinations instead of a forced fight.
const originalOpenRoutesForCave=openRoutes;
openRoutes=function(){
    originalOpenRoutesForCave();
    if(game.location==='Caverna'){
        game.caveExitChoice=true;
        const buttons=[...document.querySelectorAll('#routeButtons [data-route]')];
        const config=[['safe','SAÍDA SUPERIOR','Leva à Vila Verde'],['battle','TÚNEL INFERIOR','Desce para a Mina Antiga'],['explore','PASSAGEM À DIREITA','Segue para o Rio']];
        buttons.forEach((button,i)=>{
            if(i<3){button.classList.remove('hidden');button.querySelector('span').textContent=config[i][1];button.querySelector('small').textContent=config[i][2];button.querySelector('b').textContent=`0${i+1}`;}
            else button.classList.add('hidden');
        });
        $('pathHint').textContent='TRÊS SAÍDAS — ESCOLHA UM CAMINHO';
        const p=$('#routeButtons > p'); if(p)p.textContent='Cada túnel leva a uma região diferente. Você pode voltar e explorar os outros caminhos.';
    } else {
        game.caveExitChoice=false;
        document.querySelectorAll('#routeButtons [data-route]').forEach((b,i)=>{b.classList.remove('hidden');const spans=b.querySelectorAll('span,small,b');});
        $('pathHint').textContent='ESCOLHA UMA SAÍDA';
    }
};
const originalChooseRouteForCave=chooseRoute;
chooseRoute=function(type){
    if(game.location==='Caverna' && game.caveExitChoice){
        const destinations={safe:'Vila Verde',battle:'Mina Antiga',explore:'Rio'};
        const target=destinations[type]; if(!target)return;
        closeRoutes();game.caveExitChoice=false;game.exitCooldown=50;
        const index=game.character.route.indexOf(target);if(index>=0)game.routeIndex=index;
        game.location=target;$('locationName').textContent=target;
        if(!game.discoveredLocations.includes(target))game.discoveredLocations.push(target);
        resetPlayer();showTemporaryDialogue('NARRADOR',`Você escolheu uma das três saídas da caverna. O túnel termina em ${target==='Vila Verde'?'uma vila iluminada':target==='Mina Antiga'?'uma antiga mineradora':'uma margem de rio'}.`);return;
    }
    originalChooseRouteForCave(type);
};
const originalUpdatePlayerForCave=updatePlayer;
updatePlayer=function(){
    originalUpdatePlayerForCave();
    if(!game.running||game.location!=='Caverna'||game.dialogueOpen||game.battle||game.paused||game.routeOpen)return;
    // Top exit, bottom exit, and the straight/right tunnel all have a visible threshold.
    if(player.y<=82 || player.y+player.height>=canvas.height-58 || player.x+player.width>=canvas.width-70){openRoutes();}
};

// River barrier is solid outside the bridge; jumping does not bypass the current.
// The bridge remains the only safe route across the water.
const oldUpdatePlayerRiverBarrier=updatePlayer;
updatePlayer=function(){
    const before={x:player.x,y:player.y};oldUpdatePlayerRiverBarrier();
    if(game.location==='Rio'&&!game.dialogueOpen&&!game.battle&&!game.routeOpen&&!game.paused){
        const center=player.x+player.width/2;const overBridge=center>=420&&center<=540;
        const inWater=player.y+player.height>214&&player.y<286;
        if(inWater&&!overBridge){player.x=before.x;player.y=before.y;player.jumpTime=0;player.jumping=false;}
    }
};

// Keyboard shortcuts for the map and inventory, plus escape handling for the two panels.
document.addEventListener('keydown',event=>{
    if(!game.running)return;
    const k=event.key.toLowerCase();
    if(k==='m'){event.preventDefault();if(!game.dialogueOpen&&!game.battle&&!game.routeOpen&&!game.paused)toggleMap();}
    if(k==='i'){event.preventDefault();if(shopOverlay.classList.contains('hidden'))toggleInventory();}
    if(k==='escape'){
        if(game.shopOpen){event.preventDefault();closeShop();}
        else if(!inventoryOverlay.classList.contains('hidden')){event.preventDefault();toggleInventory(false);}
    }
});

// Make the inventory accessible on touch devices as well.
const mobileActions=document.querySelector('.mobile-action-buttons');
if(mobileActions){const mobileInventory=document.createElement('button');mobileInventory.id='mobileInventory';mobileInventory.className='map-touch-button';mobileInventory.type='button';mobileInventory.title='Inventário';mobileInventory.setAttribute('aria-label','Abrir inventário');mobileInventory.textContent='🎒';mobileActions.insertBefore(mobileInventory,$('mobileJump'));mobileInventory.addEventListener('click',()=>toggleInventory());}

// NPC interactions have priority over ambient flavour dialogue.
const previousDrawVillage=drawVillage;
// Existing drawVillage keeps the animated trees/flags/lanterns. Add extra side paths and environmental movement.
drawVillage=function(){
    previousDrawVillage();const t=game.animationTime*.001;
    ctx.fillStyle='#9b8156';ctx.fillRect(0,245,220,25);ctx.fillRect(700,235,260,23);ctx.fillRect(455,380,55,160);
    ctx.fillStyle='#c3a36d';ctx.fillRect(0,251,220,5);ctx.fillRect(700,241,260,5);ctx.fillRect(479,380,5,160);
    // grass, tiny flowers and wind-blown leaves create the same ambient motion as the other regions
    for(let i=0;i<18;i++){const x=(i*59+(t*12*(i%2?1:-1))+960)%960;const y=390+(i*17%130);ctx.fillStyle=i%3?'#7b9c56':'#d2bd70';ctx.globalAlpha=.55+Math.sin(t*2+i)*.25;ctx.fillRect(x,y,4,3);}
    ctx.globalAlpha=1;
};

// Make all item rewards useful in the persistent inventory.
const oldGiveChestReward=giveChestReward;
giveChestReward=function(){
    const reward=oldGiveChestReward();
    if(reward.includes('fruta'))addInventoryItem('Fruta silvestre','Recupera 20 pontos de vida.',1,'consumível');
    else if(reward.includes('poção'))addInventoryItem('Poção de cura','Recupera 35 pontos de vida.',1,'consumível');
    else if(reward.includes('cristais'))addInventoryItem('Cristais brilhantes','Podem ser trocados com viajantes.',1,'material');
    else if(reward.includes('flecha'))addInventoryItem('Flecha antiga','Uma munição encontrada em uma construção antiga.',1,'munição');
    return reward;
};

// Give the merchant access prompt an explicit narrator line when first approached.
const originalInteractWithMerchant=interact;
// Render the inventory on first load; all original images remain referenced in images/.
renderInventory();


const startGameWithExplorationReset=startGame;
startGame=function(){
    game.interiorHouse=null;game.shopOpen=false;game.coins=35;
    game.inventory=[
        {name:'Arma equipada',detail:game.character?`Arma de ${game.character.name}; permanece visível durante a caminhada.`:'Arma equipada.',type:'equipamento',qty:1},
        {name:'Poção de cura',detail:'Recupera 35 pontos de vida.',type:'consumível',qty:1},
        {name:'Fruta silvestre',detail:'Recupera 20 pontos de vida.',type:'consumível',qty:2}
    ];
    inventoryOverlay.classList.add('hidden');shopOverlay.classList.add('hidden');
    startGameWithExplorationReset();renderInventory();
};


// Time of day advances only while the game is being played, so longer exploration
// naturally changes the light reflected on the river.
if(!('worldClockMs' in game)) game.worldClockMs=0;
const oldGameLoopForWorldClock = gameLoop;
gameLoop = function(timestamp){
    if(game.running && !game.paused && !game.dialogueOpen && !game.battle && !game.routeOpen && !game.mapOpen && !game.shopOpen){
        const dt = lastFrameTime ? Math.min(50, timestamp-lastFrameTime) : 0;
        game.worldClockMs = (game.worldClockMs||0) + Math.max(0,dt);
    }
    oldGameLoopForWorldClock(timestamp);
};
const baseDrawRiverForReflection = drawRiver;
drawRiver = function(){
    baseDrawRiverForReflection();
    const c=ctx;
    const seconds=(game.worldClockMs||game.animationTime||0)/1000;
    const phase=(seconds%360)/360; // one full in-game cycle takes six minutes of active play
    const night=phase>=0.62;
    const celestialX=night?290:690;
    const celestialY=night?142:128;
    c.save();
    if(night){
        c.fillStyle='rgba(12,20,43,.17)'; c.fillRect(0,75,960,135);
        c.fillStyle='#d8e5f4'; c.beginPath(); c.arc(celestialX,celestialY,14,0,Math.PI*2); c.fill();
        c.fillStyle='#26364b'; c.beginPath(); c.arc(celestialX+6,celestialY-4,12,0,Math.PI*2); c.fill();
        for(let i=0;i<4;i++){c.fillStyle='rgba(200,222,242,.65)';c.fillRect(celestialX+22+(i*13),celestialY-20+(i%2)*9,2,2);}
    }else{
        c.fillStyle='rgba(255,220,125,.15)'; c.beginPath(); c.arc(celestialX,celestialY,27,0,Math.PI*2); c.fill();
        c.fillStyle='#f8dc83'; c.beginPath(); c.arc(celestialX,celestialY,15,0,Math.PI*2); c.fill();
        c.fillStyle='rgba(255,228,151,.55)'; c.fillRect(celestialX-25,celestialY-2,50,3);
    }
    // Long, broken reflection moves with the river current.
    const shimmer=night?'rgba(172,205,237,.48)':'rgba(255,226,139,.58)';
    c.fillStyle=night?'rgba(146,186,225,.12)':'rgba(255,224,135,.13)';
    c.fillRect(celestialX-19,214,38,72);
    for(let i=0;i<9;i++){
        const yy=218+((i*9+seconds*10)%66);
        const width=8+((i*7)%24);
        c.fillStyle=shimmer; c.fillRect(celestialX-width/2+Math.sin(seconds*1.8+i)*8,yy,width,2+(i%2));
    }
    c.restore();
};

// Additional locations and fixed gather points in Vila Verde. These are not chests.
const villageSeedSpots=[{id:'seed-a',x:310,y:360},{id:'seed-b',x:830,y:420},{id:'seed-c',x:495,y:128}];
const villageQuestDefinitions={
    mara:{name:'Mara, a moradora',title:'A lembrança do pescador',brief:'O pescador deixou uma lembrança na antiga casa dele. Entre na Casa do Pescador e procure perto da janela.',reward:18,rewardName:'Concha entalhada'},
    timo:{name:'Timo, o aprendiz',title:'O baú que respira',brief:'Um Mimic se esconde em uma das casas abandonadas. Derrote um deles e volte para contar o que viu.',reward:24,rewardName:'Chave enferrujada'},
    nilo:{name:'Nilo, o jardineiro',title:'Sementes de luz',brief:'Três brotos luminosos surgiram nos caminhos da vila. Encontre os três pontos brilhantes e recolha as sementes.',reward:16,rewardName:'Sementes luminosas'},
    lia:{name:'Lia, a cartógrafa',title:'Um mapa mais completo',brief:'Explore pelo menos três regiões diferentes. Volte quando o seu mapa tiver novos lugares descobertos.',reward:20,rewardName:'Mapa anotado'},
    bento:{name:'Bento, o padeiro',title:'Um pão para o viajante',brief:'Leve este pão ao viajante idoso que costuma ficar na Floresta e fale com ele.',reward:14,rewardName:'Broa dourada'}
};
let villageQuestStatus={mara:'available',timo:'available',nilo:'available',lia:'available',bento:'available'};
let villageSeedsCollected=[];
let maraRelicFound=false;
function resetVillageQuests(){
    villageQuestStatus={mara:'available',timo:'available',nilo:'available',lia:'available',bento:'available'};
    villageSeedsCollected=[]; maraRelicFound=false; game.worldClockMs=0;
}
function questIsComplete(id){
    if(id==='timo') return chestSpots.some(ch=>ch.kind==='mimic' && game.chestStates[ch.id]==='opened');
    if(id==='lia') return (game.discoveredLocations||[]).length>=3;
    if(id==='nilo') return villageSeedsCollected.length>=3;
    if(id==='mara') return maraRelicFound;
    return villageQuestStatus[id]==='completed';
}
function completeVillageQuest(id, quiet=false){
    if(villageQuestStatus[id]==='completed') return;
    villageQuestStatus[id]='completed';
    const q=villageQuestDefinitions[id]; if(!q)return;
    game.coins=(game.coins||0)+q.reward;
    addInventoryItem(q.rewardName,`Recompensa da missão: ${q.title}.`,1,'missão');
    renderInventory();
    if(!quiet) showTemporaryDialogue(q.name,`Você conseguiu! Missão concluída: ${q.title}. Recebeu ${q.reward} moedas e ${q.rewardName}.`);
}
function openVillageNpcMenu(npc){
    const q=villageQuestDefinitions[npc.id];
    if(villageQuestStatus[npc.id]==='active' && questIsComplete(npc.id)) completeVillageQuest(npc.id,true);
    const status=villageQuestStatus[npc.id];
    const intro={
        mara:'Mara aperta o avental e olha para as casas antigas. “A vila ainda guarda lembranças de quem precisou partir.”',
        timo:'Timo fala baixinho, olhando de vez em quando para os baús. “Eu juro que vi um deles respirar...”',
        nilo:'Nilo limpa a terra das mãos. “A grama está mudando desde que o Coração enfraqueceu.”',
        lia:'Lia abre seu caderno de mapas. “Cada dimensão muda um pouco quando alguém a atravessa.”',
        bento:'Bento segura uma cesta de pães recém-assados. “Uma pequena gentileza pode ajudar alguém a continuar a jornada.”'
    }[npc.id]||'O morador cumprimenta você.';
    game.dialogueOpen=true; game.dialogueMode='choices'; game.activeDialogueList=null; game.dialogueReturnToChoices=false;
    $('dialogueName').textContent=q.name; $('dialogueName').dataset.speakerId=npc.id; $('dialogueText').textContent=intro;
    $('dialogueText').dataset.voiceKey=`vila_${npc.id}_greeting`; $('dialogue').classList.remove('hidden'); $('dialogueContinue').classList.add('hidden');
    const box=$('dialogueChoices'); box.innerHTML=''; box.classList.remove('hidden');
    const addChoice=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);box.appendChild(b);};
    addChoice('Conversar',()=>showTemporaryDialogue(q.name,({mara:'“Se olhar com cuidado, até as casas vazias contam histórias.”',timo:'“Não confie em todo baú. Alguns imitam até o silêncio.”',nilo:'“Os brotos brilhantes crescem onde a grama recebe luz.”',lia:'“O mapa só revela os caminhos que você já percorreu.”',bento:'“O viajante idoso costuma descansar perto das árvores antigas.”'})[npc.id]));
    if(status==='completed') addChoice('Missão concluída ✓',()=>showTemporaryDialogue(q.name,`Você já concluiu “${q.title}”. Obrigado por ajudar a vila!`));
    else if(status==='active') addChoice('Ver missão',()=>{
        if(questIsComplete(npc.id)){completeVillageQuest(npc.id);return;}
        showTemporaryDialogue(q.name,`MISSÃO: ${q.title}. ${q.brief}${npc.id==='nilo'?` Progresso: ${villageSeedsCollected.length}/3.`:''}`);
    });
    else addChoice('Aceitar mini missão',()=>{
        villageQuestStatus[npc.id]='active';
        if(npc.id==='bento') addInventoryItem('Pão da vila','Entregue ao viajante idoso na Floresta.',1,'missão');
        if(questIsComplete(npc.id)){completeVillageQuest(npc.id);return;}
        showTemporaryDialogue(q.name,`MISSÃO ACEITA: ${q.title}. ${q.brief}`);
    });
    addChoice('Fechar conversa',closeDialogue);
}
function interactVillageSeed(){
    if(game.location!=='Vila Verde'||game.interiorHouse||villageQuestStatus.nilo!=='active')return false;
    const spot=villageSeedSpots.find(s=>!villageSeedsCollected.includes(s.id)&&isNearPoint(s.x,s.y,48));
    if(!spot)return false;
    villageSeedsCollected.push(spot.id);
    addInventoryItem('Brote luminoso','Uma pequena semente encontrada na Vila Verde.',1,'missão');
    if(villageSeedsCollected.length>=3){completeVillageQuest('nilo');}
    else showTemporaryDialogue('NARRADOR',`Você recolheu um broto luminoso. ${villageSeedsCollected.length}/3 sementes encontradas.`);
    return true;
}

const nearestVillageNPCBeforeQuestUpdate=nearestVillageNPC;
nearestVillageNPC=function(){
    if(game.location!=='Vila Verde'||game.interiorHouse)return null;
    const npcs=[
        {id:'mara',x:360,y:265,name:'Mara, a moradora'},
        {id:'timo',x:730,y:280,name:'Timo, o aprendiz'},
        {id:'nilo',x:460,y:315,name:'Nilo, o jardineiro'},
        {id:'lia',x:269,y:270,name:'Lia, a cartógrafa'},
        {id:'bento',x:574,y:265,name:'Bento, o padeiro'}
    ];
    return npcs.find(n=>isNearPoint(n.x,n.y,60))||null;
};
const interactWithVillageBeforeQuestUpdate=interactWithVillage;
interactWithVillage=function(){
    if(game.location==='Vila Verde' && game.interiorHouse){
        if(game.interiorHouse==='casa-4' && villageQuestStatus.mara==='active' && !maraRelicFound && isNearPoint(650,320,58)){
            maraRelicFound=true; completeVillageQuest('mara'); return true;
        }
        return interactWithVillageBeforeQuestUpdate();
    }
    if(game.location==='Vila Verde' && interactVillageSeed()) return true;
    const npc=nearestVillageNPC();
    if(npc){openVillageNpcMenu(npc);return true;}
    return interactWithVillageBeforeQuestUpdate();
};

// Extra locations: a market stall, a small shrine, a garden and a side trail.
const villageDrawBeforeLocations=drawVillage;
drawVillage=function(){
    villageDrawBeforeLocations();
    if(game.interiorHouse)return;
    const c=ctx,t=game.animationTime*.001;
    // Side roads leading to new points of interest.
    c.fillStyle='#92794e'; c.fillRect(0,245,210,22); c.fillRect(710,235,250,24); c.fillRect(460,385,48,155); c.fillRect(320,75,25,65);
    c.fillStyle='#c1a271'; c.fillRect(0,250,210,4); c.fillRect(710,240,250,4); c.fillRect(481,385,4,155);
    // Small market stall.
    c.fillStyle='#4a3526'; c.fillRect(315,112,62,40); c.fillStyle='#8d633b'; c.fillRect(308,105,76,12);
    for(let i=0;i<5;i++){c.fillStyle=i%2?'#a8c879':'#c8795b';c.fillRect(310+i*14,105,7,11);}
    c.fillStyle='#e4d3a3';c.fillRect(326,128,12,13);c.fillRect(348,128,12,13);
    // Shrine at the far end of the central lane.
    c.fillStyle='#5c6850';c.fillRect(465,77,45,37);c.fillStyle='#a7b783';c.fillRect(459,71,57,8);c.fillStyle='#263d32';c.fillRect(479,91,17,23);
    c.fillStyle=`rgba(206,235,141,${.22+Math.sin(t*2)*.1})`;c.fillRect(471,84,34,30);
    // Garden beds and a little pond beside the eastern trail.
    c.fillStyle='#38583a';c.fillRect(770,385,105,48);c.fillStyle='#6d8747';c.fillRect(777,391,90,36);
    for(let i=0;i<7;i++){const x=783+i*12,y=397+(i%2)*14;const sway=Math.sin(t*2+i)*2;c.fillStyle=i%2?'#b2d86a':'#e1d989';c.fillRect(x+sway,y,4,7);c.fillRect(x-2+sway,y+3,8,3);}
    c.fillStyle='#28555a';c.fillRect(855,300,48,27);c.fillStyle='#4e8881';for(let i=0;i<3;i++)c.fillRect(860+i*13,306+Math.sin(t*2+i)*2,8,2);
    // Falling leaves, tiny flowers and grass sway through the whole village.
    for(let i=0;i<24;i++){const x=(i*71+Math.sin(t*.9+i)*21+t*(10+i%3*3))%990-15;const y=(i*43+t*(13+i%4*4))%545; c.save();c.translate(x,y);c.rotate(Math.sin(t+i)*.6);c.fillStyle=['#8fbe5e','#5b9a5b','#c9d67b'][i%3];c.fillRect(-3,-2,7,4);c.fillRect(-1,-4,3,8);c.restore();}
    for(let i=0;i<64;i++){const x=i*16-4,sway=Math.sin(t*2+i*.7)*3;c.fillStyle=i%3===0?'#8db85a':i%3===1?'#527f43':'#b5c76a';c.fillRect(x,529,4,11);c.fillRect(x+sway,520-(i%3)*2,3,10);}
    c.fillStyle='#f1e5bd';c.font='bold 10px monospace';c.fillText('MERCADO',306,98);c.fillText('SANTUÁRIO',449,64);c.fillText('HORTA',786,379);c.fillText('TRILHA DO RIO →',755,228);
};

// Extra villagers use the same pixel-art drawing style as the old man and existing NPCs.
const drawVillageNPCsBeforeQuestUpdate=drawVillageNPCs;
drawVillageNPCs=function(){
    drawVillageNPCsBeforeQuestUpdate();
    if(game.location==='Vila Verde'&&!game.interiorHouse){
        drawPixelNPC(255,250,{hair:'#b7b0a0',skin:'#d8b58d',cloth:'#8874a8',trim:'#ded0ef',boot:'#302b26'}); // Lia
        drawPixelNPC(560,245,{hair:'#70452b',skin:'#d2a27d',cloth:'#b88b48',trim:'#f0d17a',boot:'#302b26'}); // Bento
        for(const spot of villageSeedSpots){
            if(villageQuestStatus.nilo==='active'&&!villageSeedsCollected.includes(spot.id)){
                const pulse=1+Math.sin(game.animationTime*.006+spot.x)*1.5;
                ctx.fillStyle='rgba(190,235,117,.18)';ctx.fillRect(spot.x-10,spot.y-8,20,16);
                ctx.fillStyle='#bde86e';ctx.fillRect(spot.x-2,spot.y-5-pulse,4,7);ctx.fillRect(spot.x-7,spot.y-1,5,3);ctx.fillRect(spot.x+3,spot.y-2,5,3);
                if(isNearPoint(spot.x,spot.y,48)&&!game.dialogueOpen)drawInteractionMarker(spot.x,spot.y-12);
            }
        }
        const near=nearestVillageNPC();if(near&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(near.x,near.y-20);
    }
};

// A keepsake appears only when Mara's mission is active, inside the fisherman's house.
const drawHouseInteriorBeforeMaraQuest=drawHouseInterior;
drawHouseInterior=function(){
    drawHouseInteriorBeforeMaraQuest();
    if(game.interiorHouse==='casa-4'&&villageQuestStatus.mara==='active'&&!maraRelicFound){
        const t=game.animationTime*.004;ctx.fillStyle=`rgba(245,226,146,${.15+Math.sin(t)*.1})`;ctx.fillRect(631,298,38,30);
        ctx.fillStyle='#e7d4a0';ctx.fillRect(642,309,17,8);ctx.fillRect(646,304,9,18);ctx.fillStyle='#8a9e78';ctx.fillRect(639,312,4,3);
        if(isNearPoint(650,320,58)&&!game.dialogueOpen)drawInteractionMarker(650,294);
        ctx.fillStyle='#f0dfb5';ctx.font='10px monospace';ctx.fillText('LEMBRANÇA',620,287);
    }
};

// Deliver Bento's bread to the wandering old man.
const interactBeforeBreadQuest=interact;
interact=function(){
    if(game.running&&!game.dialogueOpen&&!game.battle&&!game.paused&&game.location==='Floresta'&&isNearOldMan()&&villageQuestStatus.bento==='active'){
        const bread=game.inventory.find(i=>i.name==='Pão da vila'&&i.qty>0);
        if(bread){bread.qty--;if(!bread.qty)game.inventory=game.inventory.filter(i=>i!==bread);completeVillageQuest('bento');renderInventory();return;}
    }
    interactBeforeBreadQuest();
};

// Missions that depend on exploration or a Mimic can be turned in by speaking to the NPC again.
const oldOpenVillageNpcMenuForTurnIn=openVillageNpcMenu;
openVillageNpcMenu=function(npc){
    if(villageQuestStatus[npc.id]==='active'&&questIsComplete(npc.id)) completeVillageQuest(npc.id,true);
    oldOpenVillageNpcMenuForTurnIn(npc);
};

const startGameBeforeQuestReset=startGame;
startGame=function(){
    resetVillageQuests();
    startGameBeforeQuestReset();
};

// Add new places to the village map and label the quest-givers.
const drawMapBeforeVillagePOI=drawMap;
drawMap=function(){
    drawMapBeforeVillagePOI();
    if(game.mapMode!=='village')return;
    const c=mapCtx;
    c.fillStyle='#8b6740';c.fillRect(295,72,38,35);c.fillStyle='#d3b46e';c.fillRect(291,68,46,8);
    c.fillStyle='#e4d7a3';c.font='10px monospace';c.textAlign='center';c.fillText('MERCADO',314,60);
    c.fillStyle='#8da86c';c.fillRect(470,56,33,28);c.fillStyle='#d4e79b';c.fillRect(480,61,12,17);c.fillText('SANTUÁRIO',486,48);
    c.fillStyle='#4c8980';c.fillRect(545,180,38,19);c.fillText('LAGO',564,174);
    c.fillStyle='#bde86e';c.fillRect(515,245,8,8);c.fillRect(540,245,8,8);c.fillRect(565,245,8,8);c.fillText('HORTA',546,238);
    const nps=[['MARA',360,265],['TIMO',730,280],['NILO',460,315],['LIA',269,270],['BENTO',574,265]];
    c.font='9px monospace';nps.forEach(([name,x,y],i)=>{const px=20+x/960*(mapCanvas.width-40),py=20+y/540*(mapCanvas.height-40);c.fillStyle=['#e9bf8a','#e6c16f','#d6dc8c','#c8b9e5','#e8b56f'][i];c.fillRect(px-3,py-3,6,6);c.fillStyle='#f4efd8';c.fillText(name,px,py-7);});
};


/* =========================================================
   CORREÇÕES DE EXPLORAÇÃO — versão estável
   Mantém todas as artes originais em images/.
========================================================= */

// Cada cenário é persistente; derrotar inimigos não chama nextLocation.
if(!game.skeletonsDefeated) game.skeletonsDefeated=[];
if(!game.worldClockMs) game.worldClockMs=0;

// As cinco rotas podem descobrir o lago como uma área lateral antes das ruínas.
characters.forEach(ch=>{
    if(!ch.route.includes('Lago Escondido')){
        const ruinsIndex=ch.route.indexOf('Ruinas');
        ch.route.splice(ruinsIndex>=0?ruinsIndex:ch.route.length,0,'Lago Escondido');
    }
});
if(!backgrounds['Lago Escondido']) backgrounds['Lago Escondido']={sky:'#142b36',ground:'#2e514b',grass:'#527a64'};
if(!worldMapNodes.some(n=>n.name==='Lago Escondido')) worldMapNodes.push({name:'Lago Escondido',x:515,y:305});

// Layout fixo: as casas ficam lado a lado ao longo da rua principal; a forja tem lugar permanente.
villageHouses.splice(0,villageHouses.length,
    {id:'casa-1',x:25,y:100,w:110,h:90,doorX:80,doorY:164,label:'Casa da artesã'},
    {id:'casa-2',x:155,y:100,w:110,h:90,doorX:210,doorY:164,label:'Casa do cartógrafo',chest:'vila-casa-2'},
    {id:'casa-3',x:285,y:100,w:110,h:90,doorX:340,doorY:164,label:'Casa abandonada',chest:'vila-casa-3-mimic'},
    {id:'casa-4',x:415,y:100,w:110,h:90,doorX:470,doorY:164,label:'Casa do pescador'},
    {id:'casa-5',x:545,y:100,w:110,h:90,doorX:600,doorY:164,label:'Casa da curandeira',chest:'vila-casa-5'},
    {id:'casa-6',x:675,y:100,w:110,h:90,doorX:730,doorY:164,label:'Casa fechada',chest:'vila-casa-6-mimic'}
);

// Keep the existing chest art and chest locations, but only allow the chest in the current room.
nearestChest=function(){
    let nearest=null,best=62;
    for(const chest of chestSpots){
        if(chest.scene!==game.location || game.chestStates[chest.id]==='opened') continue;
        if(game.location==='Vila Verde' && chest.house!==game.interiorHouse) continue;
        if(game.location==='Vila Verde' && !game.interiorHouse) continue;
        const d=Math.hypot(player.x+player.width/2-chest.x,player.y+player.height/2-chest.y);
        if(d<best){nearest=chest;best=d;}
    }
    return nearest;
};

// Usable inventory items: potions and fruit restore HP while the inventory stays open.
renderInventory=function(){
    const list=$('inventoryItems'); if(!list)return;
    $('inventoryStats').innerHTML=`<span>❤️ Vida: <b>${player.hp}/${player.maxHP}</b></span><span>🪙 Moedas: <b>${game.coins||0}</b></span><span>📍 Local: <b>${game.location||'—'}</b></span>`;
    list.innerHTML='';
    if(!game.inventory.length){list.innerHTML='<p class="empty-inventory">Sua mochila está vazia.</p>';return;}
    game.inventory.forEach((item,index)=>{
        const card=document.createElement('article');card.className='inventory-item';
        const usable=item.type==='consumível' || /poção|fruta|elixir/i.test(item.name);
        const info=document.createElement('div');
        const name=document.createElement('strong');name.textContent=item.name;
        const detail=document.createElement('small');detail.textContent=item.detail||'Item coletado durante a jornada.';
        info.append(name,detail);card.append(info);
        const qty=document.createElement('b');qty.textContent=`×${item.qty}`;card.append(qty);
        if(usable){
            const use=document.createElement('button');use.type='button';use.className='inventory-use-button';use.textContent='USAR';use.disabled=player.hp>=player.maxHP;
            use.addEventListener('click',()=>useInventoryItem(item));card.append(use);
        }
        list.appendChild(card);
    });
};
function useInventoryItem(item){
    if(!item || item.qty<1)return;
    let heal=0;
    if(/poção/i.test(item.name))heal=35;
    else if(/fruta/i.test(item.name))heal=20;
    else if(/elixir/i.test(item.name))heal=50;
    if(!heal){$('shopFeedback') && ($('shopFeedback').textContent='Este item não pode ser usado agora.');return;}
    if(player.hp>=player.maxHP){
        const stat=$('inventoryStats');if(stat)stat.insertAdjacentHTML('beforeend','<span class="inventory-note">Sua vida já está cheia.</span>');return;
    }
    const actual=Math.min(heal,player.maxHP-player.hp);player.hp+=actual;item.qty--;
    if(item.qty<=0)game.inventory=game.inventory.filter(i=>i!==item);
    updatePlayerHealth();renderInventory();
    const stat=$('inventoryStats');if(stat)stat.insertAdjacentHTML('beforeend',`<span class="inventory-note">Você recuperou ${actual} PV.</span>`);
}

// Merchant itinerary rotates by active play time: river, village, then the mine.
function currentMerchantSpot(){
    const phase=Math.floor(((game.worldClockMs||0)/60000)%3);
    if(phase===0)return {scene:'Rio',x:790,y:345};
    if(phase===1)return {scene:'Vila Verde',x:515,y:275};
    return {scene:'Mina Antiga',x:790,y:345};
}
isNearMerchant=function(){
    const m=currentMerchantSpot();
    return game.location===m.scene && !game.interiorHouse && isNearPoint(m.x,m.y,76);
};
openShop=function(){
    const m=currentMerchantSpot();
    if(game.location!==m.scene || game.interiorHouse)return;
    game.shopOpen=true;game.paused=true;shopOverlay.classList.remove('hidden');
    $('shopTitle').textContent= m.scene==='Rio'?'MERCADOR DO RIO':m.scene==='Vila Verde'?'MERCADOR DA VILA':'MERCADOR DA MINA';
    $('shopFeedback').textContent='“Estou sempre de passagem. Aproveite enquanto estou por aqui.”';
    updateShopCoins();resetKeys();
};

// Fixed house row, forge, main street, and side trails. Nothing in the village is randomly placed.
drawVillage=function(){
    const c=ctx,t=game.animationTime*.001;
    c.fillStyle='#3e6040';c.fillRect(0,75,960,465);
    // Main road with fixed branches.
    c.fillStyle='#9d8055';c.fillRect(0,192,960,62);c.fillRect(0,254,36,130);c.fillRect(790,254,36,180);c.fillRect(385,254,38,286);
    c.fillStyle='#c0a16d';c.fillRect(0,207,960,5);c.fillRect(12,254,5,120);c.fillRect(802,254,5,165);c.fillRect(400,254,5,286);
    // Front row of neighboring houses, aligned with interaction/collision coordinates.
    villageHouses.forEach((h,i)=>{
        c.fillStyle='rgba(0,0,0,.23)';c.fillRect(h.x+5,h.y+h.h-1,h.w,h.h*.18);
        c.fillStyle=i%2?'#69462f':'#79513a';c.fillRect(h.x,h.y+22,h.w,h.h-22);
        c.fillStyle=i%2?'#a86d45':'#b77b4e';c.fillRect(h.x-5,h.y+10,h.w+10,18);
        c.fillStyle='#3a2a21';c.fillRect(h.doorX-13,h.y+h.h-28,26,28);
        c.fillStyle='#d4b46d';c.fillRect(h.doorX-2,h.y+h.h-25,4,24);
        c.fillStyle='#e1bd78';c.fillRect(h.x+12,h.y+36,17,16);c.fillRect(h.x+h.w-29,h.y+36,17,16);
        c.fillStyle='#513c2a';c.fillRect(h.x+8,h.y+32,25,3);c.fillRect(h.x+h.w-33,h.y+32,25,3);
        c.fillStyle='#d9c18a';c.font='9px monospace';c.textAlign='center';c.fillText(h.label.toUpperCase(),h.x+h.w/2,h.y-1);
    });
    // Forge at the end of the row, with chimney, anvil, and a pulsing furnace.
    c.fillStyle='#59402d';c.fillRect(812,121,100,69);c.fillStyle='#72452f';c.fillRect(805,110,114,19);c.fillStyle='#302c28';c.fillRect(835,138,28,32);c.fillStyle=`rgba(255,125,49,${.35+Math.sin(t*4)*.16})`;c.fillRect(840,145,18,20);c.fillStyle='#a8a29a';c.fillRect(868,164,30,8);c.fillRect(877,155,12,9);c.fillStyle='#51402e';c.fillRect(891,80,13,37);c.fillStyle='#77716a';c.fillRect(887,74,21,7);c.fillStyle='#f0d6a1';c.font='bold 10px monospace';c.textAlign='center';c.fillText('FORJA',861,102);
    // Plaza and well.
    c.fillStyle='#7d805f';c.fillRect(270,270,220,84);c.fillStyle='#a9aa90';c.fillRect(288,285,54,46);c.fillStyle='#31565a';c.fillRect(296,293,38,29);c.fillStyle='#5c422c';c.fillRect(286,277,5,19);c.fillRect(339,277,5,19);c.fillRect(286,275,58,5);
    // A fixed market stall and a small shrine along the southern path.
    c.fillStyle='#4a3526';c.fillRect(70,302,72,39);c.fillStyle='#8d633b';c.fillRect(63,294,86,13);for(let i=0;i<6;i++){c.fillStyle=i%2?'#a8c879':'#c8795b';c.fillRect(66+i*13,294,7,12);}c.fillStyle='#f1e5bd';c.font='bold 10px monospace';c.fillText('MERCADO',106,287);
    c.fillStyle='#5c6850';c.fillRect(515,306,45,37);c.fillStyle='#a7b783';c.fillRect(509,300,57,8);c.fillStyle='#263d32';c.fillRect(529,320,17,23);c.fillStyle=`rgba(206,235,141,${.22+Math.sin(t*2)*.1})`;c.fillRect(521,312,34,30);c.fillStyle='#f1e5bd';c.fillText('SANTUÁRIO',542,291);
    // Pond and garden trail.
    c.fillStyle='#244f56';c.fillRect(825,355,85,45);c.fillStyle='#4e8881';for(let i=0;i<4;i++)c.fillRect(832+i*18,364+Math.sin(t*2+i)*2,11,2);c.fillStyle='#537e43';c.fillRect(815,410,105,40);for(let i=0;i<8;i++){let x=823+i*12,sway=Math.sin(t*2+i)*2;c.fillStyle=i%2?'#b2d86a':'#e1d989';c.fillRect(x+sway,417+(i%2)*13,4,7);c.fillRect(x-2+sway,420+(i%2)*13,8,3);}
    // Pennants, torch flicker, leaves and animated grass.
    for(let i=0;i<7;i++){const x=280+i*35;c.fillStyle=['#c5a75e','#9fbe76','#c77a5b'][i%3];c.beginPath();c.moveTo(x,76);c.lineTo(x+18,76);c.lineTo(x+9,91+Math.sin(t*2+i)*2);c.closePath();c.fill();}
    [[18,174],[935,176],[260,263],[670,264],[780,300]].forEach(([x,y],i)=>{c.fillStyle='#5b412b';c.fillRect(x,y,5,22);c.fillStyle='#e6ad54';c.fillRect(x-2,y-8,9,10);c.fillStyle=`rgba(255,187,82,${.2+Math.sin(t*5+i)*.08})`;c.fillRect(x-7,y-14,19,22);});
    for(let i=0;i<26;i++){const x=(i*71+Math.sin(t*.9+i)*21+t*(10+i%3*3))%990-15;const y=(i*43+t*(13+i%4*4))%545;c.save();c.translate(x,y);c.rotate(Math.sin(t+i)*.6);c.fillStyle=['#8fbe5e','#5b9a5b','#c9d67b'][i%3];c.fillRect(-3,-2,7,4);c.fillRect(-1,-4,3,8);c.restore();}
    for(let i=0;i<64;i++){const x=i*16-4,sway=Math.sin(t*2+i*.7)*3;c.fillStyle=i%3===0?'#8db85a':i%3===1?'#527f43':'#b5c76a';c.fillRect(x,529,4,11);c.fillRect(x+sway,520-(i%3)*2,3,10);}
    c.fillStyle='#f1e5bd';c.font='bold 14px monospace';c.textAlign='left';c.fillText('VILA VERDE',20,91);c.textAlign='start';
};

// A shelf display makes household items visible before they are collected.
function drawInteriorShelfItems(){
    if(!game.interiorHouse)return;
    const c=ctx;
    // Left shelf jars, folded cloth, books and food tins.
    const objects=[
        [132,158,'#b9d17a','jar'],[166,158,'#c58a55','jar'],[204,158,'#d7d1a3','book'],[242,158,'#91b9b1','jar'],
        [132,190,'#d8b86a','bread'],[169,190,'#9fb36c','jar'],[208,190,'#c8b8d8','book'],[744,171,'#b5d67c','jar'],
        [778,171,'#c5a5a0','book'],[744,201,'#d5c78c','bread'],[780,201,'#92b4b0','jar']
    ];
    objects.forEach(([x,y,color,type])=>{
        c.fillStyle=color;
        if(type==='jar'){c.fillRect(x,y+4,12,13);c.fillRect(x+2,y,8,5);c.fillStyle='#e8dca9';c.fillRect(x+3,y+7,6,3);}
        else if(type==='book'){c.fillRect(x,y+3,15,11);c.fillStyle='#eee0b7';c.fillRect(x+6,y+4,2,9);}
        else {c.fillRect(x,y+7,17,7);c.fillRect(x+3,y+3,10,4);}
    });
    c.fillStyle='#f1e5bd';c.font='10px monospace';c.fillText('ITENS NAS PRATELEIRAS',108,137);
}

// Forge blacksmith: interactive prompt and fixed anvil area.
function isNearBlacksmith(){return game.location==='Vila Verde'&&!game.interiorHouse&&isNearPoint(862,174,70);}
const interactBeforeForgeFix=interact;
interact=function(){
    if(game.running&&!game.dialogueOpen&&!game.battle&&!game.paused&&isNearBlacksmith()){
        game.dialogueOpen=true;game.dialogueMode='choices';
        $('dialogueName').textContent='DORAN, O FERREIRO';$('dialogueText').textContent='Doran limpa a fuligem das mãos. “Posso reforçar sua arma ou vender alguns materiais. Ainda estou juntando minério.”';
        $('dialogueChoices').innerHTML='';$('dialogueChoices').classList.remove('hidden');$('dialogueContinue').classList.add('hidden');$('dialogue').classList.remove('hidden');
        const add=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);$('dialogueChoices').appendChild(b);};
        add('Comprar minério — 10 moedas',()=>{if((game.coins||0)<10)showTemporaryDialogue('DORAN, O FERREIRO','Você ainda não tem moedas suficientes.');else{game.coins-=10;addInventoryItem('Minério de ferro','Material comprado na forja.',1,'material');showTemporaryDialogue('DORAN, O FERREIRO','Aqui está. Guarde para uma melhoria futura.');}});
        add('Conversar sobre a ilha',()=>showTemporaryDialogue('DORAN, O FERREIRO','“As armas antigas foram feitas para proteger o Coração, não para conquistar terras.”'));
        add('Sair',closeDialogue);return;
    }
    if(game.location==='Caverna'&&!game.dialogueOpen&&!game.battle&&!game.paused){
        const skeleton=skeletonSpots.find(sk=>!game.skeletonsDefeated.includes(sk.id)&&isNearPoint(sk.x,sk.y,65));
        if(skeleton){game.activeSkeletonId=skeleton.id;game.forceSkeleton=true;startBattle();$('battleMessage').textContent='Um esqueleto antigo se ergue entre as pedras!';return;}
    }
    interactBeforeForgeFix();
};

// Pixel-art skeletons are fixed enemies in the cave, not random encounters.
const skeletonSpots=[{id:'cave-skeleton-1',x:235,y:345},{id:'cave-skeleton-2',x:700,y:375}];
function drawCaveSkeletons(){
    if(game.location!=='Caverna'||game.battle)return;
    skeletonSpots.forEach((sk,i)=>{
        if(game.skeletonsDefeated.includes(sk.id))return;
        const x=sk.x,y=sk.y,bob=Math.sin(game.animationTime*.003+i)*1.3;
        ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(x-5,y+35,33,6);
        ctx.fillStyle='#d7d6bd';ctx.fillRect(x+5,y+3+bob,18,17);ctx.fillStyle='#252b2a';ctx.fillRect(x+8,y+9+bob,4,5);ctx.fillRect(x+17,y+9+bob,4,5);ctx.fillRect(x+12,y+16+bob,5,3);
        ctx.fillStyle='#bcbca7';ctx.fillRect(x+8,y+21+bob,13,16);ctx.fillRect(x+3,y+23+bob,5,4);ctx.fillRect(x+21,y+23+bob,5,4);ctx.fillRect(x+8,y+37+bob,5,9);ctx.fillRect(x+17,y+37+bob,5,9);
        ctx.fillStyle='#d7d6bd';ctx.fillRect(x+1,y+24+bob,4,12);ctx.fillRect(x+23,y+24+bob,4,12);
        if(isNearPoint(sk.x+14,sk.y+22,65)&&!game.dialogueOpen)drawInteractionMarker(sk.x+14,sk.y-3);
    });
}

// Force a specific skeleton battle while preserving the existing custom Mimic battle sprite.
const createEnemyBeforeSkeletonFix=createEnemy;
createEnemy=function(){
    if(game.forceSkeleton){
        game.forceSkeleton=false;
        game.enemy={name:'ESQUELETO DA CAVERNA',hp:75,maxHP:75,damage:8,kind:'skeleton',attacking:false,attackTimer:0,hitFlash:0};
        $('enemyName').textContent=game.enemy.name;$('battleEnemyTitle').textContent=game.enemy.name;
        enemyBattleImage.src='images/inimigo.png';enemyBattleImage.style.display='block';enemyPortrait.style.display='none';
        return;
    }
    const requestedMimic=Boolean(game.forceMimic);
    createEnemyBeforeSkeletonFix();
    // Mimics only appear from the fixed chest locations; ordinary route fights cannot spawn them.
    if(!requestedMimic && game.enemy && game.enemy.kind==='mimic') {
        const ordinary=[{name:'CRIATURA DA FLORESTA',hp:90,damage:9,kind:'normal'},{name:'GUARDIÃO DAS RUÍNAS',hp:120,damage:11,kind:'normal'},{name:'SOMBRA DA CAVERNA',hp:105,damage:10,kind:'normal'}];
        const type=ordinary[Math.floor(Math.random()*ordinary.length)];
        game.enemy={name:type.name,hp:type.hp,maxHP:type.hp,damage:type.damage,kind:type.kind,attacking:false,attackTimer:0,hitFlash:0};
        $('enemyName').textContent=type.name;$('battleEnemyTitle').textContent=type.name;enemyBattleImage.src='images/inimigo.png';enemyBattleImage.style.display='block';enemyPortrait.style.display='none';
    }
};

const loseBattleBeforeSkeletonReset=loseBattle;
loseBattle=function(){
    const wasSkeleton=Boolean(game.enemy && game.enemy.kind==='skeleton');
    loseBattleBeforeSkeletonReset();
    if(wasSkeleton) game.activeSkeletonId=null;
};

// Hidden lake is a genuine extra area with its own exit choices and reflective water.
function drawHiddenLake(){
    const c=ctx,t=(game.worldClockMs||game.animationTime)/1000;
    c.fillStyle='#132c35';c.fillRect(0,0,960,540);
    c.fillStyle='#203c35';c.fillRect(0,75,960,465);
    // shore, moss and fixed trees
    c.fillStyle='#426246';c.fillRect(0,75,960,105);c.fillRect(0,405,960,135);c.fillRect(0,175,150,230);c.fillRect(810,175,150,230);
    c.fillStyle='#6b8750';for(let i=0;i<28;i++){const x=(i*37)%960,y=95+(i*29)%430;c.fillRect(x,y,5,3);}
    c.fillStyle='#24545e';c.fillRect(150,165,660,250);c.fillStyle='#36727a';c.fillRect(160,175,640,230);
    const phase=Math.floor(((game.worldClockMs||0)/60000)%6),night=phase>=4;
    const cx=night?480:650,cy=night?125:120;
    c.fillStyle=night?'#d6e3f1':'#f5d67c';c.beginPath();c.arc(cx,cy,night?13:17,0,Math.PI*2);c.fill();
    for(let i=0;i<16;i++){const x=210+((i*43+t*11)%540),y=190+((i*37+t*7)%205);c.fillStyle=night?'rgba(192,220,244,.55)':'rgba(255,226,146,.55)';c.fillRect(x+Math.sin(t+i)*8,y,10+(i%4)*5,2);}
    c.fillStyle='#102c32';c.fillRect(390,260,180,70);c.fillStyle='#6d9c80';c.fillRect(430,275,100,7);c.fillStyle='#c0e7a0';c.fillRect(478,286,6,18);c.fillStyle='#f0e5c3';c.font='bold 14px monospace';c.textAlign='center';c.fillText('LAGO ESCONDIDO',480,145);c.font='11px monospace';c.fillText('SAÍDA →',860,295);c.textAlign='start';
    // shoreline grass sways in the breeze
    for(let i=0;i<58;i++){const x=i*17,y=525+(i%3)*3,s=Math.sin(t*2+i*.5)*2;c.fillStyle=i%2?'#719751':'#a1b968';c.fillRect(x+s,y,3,12);}
    drawExit();
}
const drawBackgroundBeforeLakeFix=drawBackground;
drawBackground=function(){
    if(game.location==='Lago Escondido'){drawHiddenLake();return;}
    drawBackgroundBeforeLakeFix();
};

// Cave routes are distinct: upper exit to village, lower to mine, right-hand passage to hidden lake.
const openRoutesBeforeLakeFix=openRoutes;
openRoutes=function(){
    openRoutesBeforeLakeFix();
    if(game.location==='Caverna'){
        game.caveExitChoice=true;
        const btns=[...document.querySelectorAll('#routeButtons [data-route]')];
        const opts=[['SAÍDA SUPERIOR','Leva à Vila Verde'],['TÚNEL INFERIOR','Desce para a Mina Antiga'],['PASSAGEM À DIREITA','Descobre o Lago Escondido']];
        btns.forEach((b,i)=>{if(i<3){b.classList.remove('hidden');b.querySelector('span').textContent=opts[i][0];b.querySelector('small').textContent=opts[i][1];}else b.classList.add('hidden');});
        $('pathHint').textContent='TRÊS SAÍDAS — ESCOLHA UMA';
    }else if(game.location==='Lago Escondido'){
        game.lakeExitChoice=true;
        const btns=[...document.querySelectorAll('#routeButtons [data-route]')];
        const opts=[['VOLTAR À CAVERNA','Retornar pelo túnel'],['SEGUIR PARA O RIO','Encontrar a correnteza'],['IR ÀS RUÍNAS','Seguir as marcas antigas']];
        btns.forEach((b,i)=>{if(i<3){b.classList.remove('hidden');b.querySelector('span').textContent=opts[i][0];b.querySelector('small').textContent=opts[i][1];}else b.classList.add('hidden');});
        $('pathHint').textContent='O LAGO TEM TRÊS CAMINHOS';
    }
};
const chooseRouteBeforeLakeFix=chooseRoute;
chooseRoute=function(type){
    if(game.location==='Caverna'&&game.caveExitChoice){
        const dest={safe:'Vila Verde',battle:'Mina Antiga',explore:'Lago Escondido'}[type];if(!dest)return;
        closeRoutes();game.caveExitChoice=false;game.exitCooldown=50;game.location=dest;
        const idx=game.character.route.indexOf(dest);if(idx>=0)game.routeIndex=idx;
        $('locationName').textContent=dest;if(!game.discoveredLocations.includes(dest))game.discoveredLocations.push(dest);resetPlayer();
        showTemporaryDialogue('NARRADOR',dest==='Lago Escondido'?'A passagem à direita se abre para um lago escondido. A água reflete uma luz que parece vir de outra dimensão.':`A saída termina em ${dest==='Vila Verde'?'uma rua entre casas':'uma antiga mineradora'}.`);return;
    }
    if(game.location==='Lago Escondido'&&game.lakeExitChoice){
        const dest={safe:'Caverna',battle:'Rio',explore:'Ruinas'}[type];if(!dest)return;
        closeRoutes();game.lakeExitChoice=false;game.exitCooldown=50;game.location=dest;
        const idx=game.character.route.indexOf(dest);if(idx>=0)game.routeIndex=idx;
        $('locationName').textContent=dest;if(!game.discoveredLocations.includes(dest))game.discoveredLocations.push(dest);resetPlayer();
        showTemporaryDialogue('NARRADOR',`Você deixa o Lago Escondido e segue para ${dest==='Caverna'?'os túneis de pedra':dest==='Rio'?'a correnteza do rio':'as ruínas antigas'}.`);return;
    }
    chooseRouteBeforeLakeFix(type);
};

// Consistent collisions: trees in the forest, neighboring houses and forge in the village.
const updatePlayerBeforeSolidBarriers=updatePlayer;
updatePlayer=function(){
    const oldX=player.x,oldY=player.y;
    updatePlayerBeforeSolidBarriers();
    if(!game.running||game.dialogueOpen||game.battle||game.routeOpen||game.paused)return;
    const overlaps=(a,b)=>a.x< b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y;
    const playerBox={x:player.x+8,y:player.y+12,w:player.width-16,h:player.height-12};
    let blocked=false;
    if(game.location==='Floresta'){
        const trunks=[{x:85,y:115,w:18,h:88},{x:305,y:108,w:18,h:88},{x:555,y:125,w:18,h:88},{x:790,y:105,w:18,h:88},{x:930,y:130,w:18,h:88}];
        blocked=trunks.some(r=>!(r.x===930 && playerBox.x>850 && playerBox.y>118 && playerBox.y<222) && overlaps(playerBox,r));
    }
    if(game.location==='Vila Verde'&&!game.interiorHouse){
        const rects=villageHouses.map(h=>({x:h.x,y:h.y+22,w:h.w,h:h.h-22}));
        rects.push({x:812,y:121,w:100,h:69});
        const atDoor=villageHouses.some(h=>Math.abs((player.x+player.width/2)-h.doorX)<19 && player.y+player.height>h.doorY-8 && player.y<h.doorY+34);
        blocked=rects.some(r=>overlaps(playerBox,r))&&!atDoor;
    }
    if(blocked){player.x=oldX;player.y=oldY;player.moving=false;}
};

// Keep the weapon visibly attached to the player during every walking frame.
const drawGameBeforeWeaponSafety=drawGame;
drawGame=function(){
    drawGameBeforeWeaponSafety();
    if(game.interiorHouse)drawInteriorShelfItems();
    drawCaveSkeletons();
};

// Draw a consistent set of five village quest-givers and the traveling merchant at the current stop.
drawVillageNPCs=function(){
    if(game.location==='Vila Verde'&&!game.interiorHouse){
        const people=[
            {id:'mara',x:360,y:265,p:{hair:'#6d4329',skin:'#d7b18a',cloth:'#6d9c6a',trim:'#c6d88d',boot:'#352b24'}},
            {id:'timo',x:730,y:280,p:{hair:'#d6a95f',skin:'#d6a883',cloth:'#567f9b',trim:'#e0c67d',boot:'#302b26'}},
            {id:'nilo',x:460,y:315,p:{hair:'#493b2c',skin:'#d4a27c',cloth:'#b16b4e',trim:'#ead7a0',boot:'#302b26'}},
            {id:'lia',x:269,y:270,p:{hair:'#b7b0a0',skin:'#d8b58d',cloth:'#8874a8',trim:'#ded0ef',boot:'#302b26'}},
            {id:'bento',x:574,y:265,p:{hair:'#70452b',skin:'#d2a27d',cloth:'#b88b48',trim:'#f0d17a',boot:'#302b26'}}
        ];
        people.forEach(n=>drawPixelNPC(n.x-14,n.y-35,n.p));
        const near=nearestVillageNPC();if(near&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(near.x,near.y-20);
        const door=nearestVillageDoor();if(door&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(door.doorX,door.doorY-28);
    }
    const m=currentMerchantSpot();
    if(game.location===m.scene&&!game.interiorHouse){
        drawPixelNPC(m.x-14,m.y-35,{hair:'#3a3027',skin:'#d2a77f',cloth:'#a16c39',trim:'#e3c46b',boot:'#2a2924'},'merchant');
        if(isNearMerchant()&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(m.x,m.y-25);
    }
};

// Add items visible on shelves, and show the correct chest only inside its own house.
drawChests=function(){
    let visible=[];
    if(game.location==='Vila Verde'&&game.interiorHouse) visible=chestSpots.filter(ch=>ch.scene==='Vila Verde'&&ch.house===game.interiorHouse);
    if(game.location==='Mina Antiga') visible=chestSpots.filter(ch=>ch.scene==='Mina Antiga');
    for(const chest of visible){
        const state=game.chestStates[chest.id]||'unknown';
        if(state==='opened'){ctx.fillStyle='#5c422d';ctx.fillRect(chest.x-18,chest.y-2,36,13);ctx.fillStyle='#9a7547';ctx.fillRect(chest.x-15,chest.y,30,8);continue;}
        if(chest.kind==='mimic'&&mimicImageLoaded){ctx.drawImage(mimicImage,chest.x-25,chest.y-28,50,50);}
        else{ctx.fillStyle='#4b3020';ctx.fillRect(chest.x-22,chest.y-7,44,23);ctx.fillStyle='#9b6739';ctx.fillRect(chest.x-18,chest.y-4,36,17);ctx.fillStyle='#bd8a4b';ctx.fillRect(chest.x-22,chest.y-12,44,8);ctx.fillStyle='#e6c66b';ctx.fillRect(chest.x-3,chest.y-3,6,10);}
        if(isNearPoint(chest.x,chest.y,62)&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(chest.x,chest.y-8);
    }
};

// Fix map marker and cave exits if the player discovers the hidden lake.
const drawMapBeforeLakeNode=drawMap;
drawMap=function(){
    drawMapBeforeLakeNode();
    if(game.mapMode==='world'){
        const n=worldMapNodes.find(node=>node.name==='Lago Escondido');
        if(n){const c=mapCtx,seen=game.discoveredLocations.includes(n.name);c.fillStyle=seen?'#a8d8cf':'#526455';c.beginPath();c.arc(n.x,n.y,seen?11:8,0,Math.PI*2);c.fill();c.strokeStyle=seen?'#e4f4dc':'#718272';c.stroke();c.fillStyle=seen?'#f4efd8':'#9ba99a';c.font='12px monospace';c.textAlign='center';c.fillText(seen?n.name:'???',n.x,n.y+26);}
    }
};

// Reset all persistent per-run additions without changing the original art assets.
const startGameBeforeFinalReset=startGame;
startGame=function(){
    game.skeletonsDefeated=[];game.activeSkeletonId=null;game.forceSkeleton=false;game.caveExitChoice=false;game.lakeExitChoice=false;game.worldClockMs=0;
    startGameBeforeFinalReset();renderInventory();
};

/* =========================================================
   PATCH VILA VIVA — correções de interação, ambiente e caça
   Preserva os sprites e arquivos originais da pasta images/.
========================================================= */

// 1) Esqueletos são decoração ambiental: não iniciam combate e não exibem prompt de luta.
const passiveSkeletonSpots = [
    {id:'cave-skeleton-1',x:235,y:345},
    {id:'cave-skeleton-2',x:700,y:375}
];
drawCaveSkeletons = function(){
    if(game.location!=='Caverna') return;
    passiveSkeletonSpots.forEach((sk,i)=>{
        const x=sk.x,y=sk.y,bob=Math.sin(game.animationTime*.002+i)*.7;
        ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(x-5,y+35,33,6);
        ctx.fillStyle='#d7d6bd';ctx.fillRect(x+5,y+3+bob,18,17);
        ctx.fillStyle='#252b2a';ctx.fillRect(x+8,y+9+bob,4,5);ctx.fillRect(x+17,y+9+bob,4,5);ctx.fillRect(x+12,y+16+bob,5,3);
        ctx.fillStyle='#bcbca7';ctx.fillRect(x+8,y+21+bob,13,16);ctx.fillRect(x+3,y+23+bob,5,4);ctx.fillRect(x+21,y+23+bob,5,4);ctx.fillRect(x+8,y+37+bob,5,9);ctx.fillRect(x+17,y+37+bob,5,9);
        ctx.fillStyle='#d7d6bd';ctx.fillRect(x+1,y+24+bob,4,12);ctx.fillRect(x+23,y+24+bob,4,12);
        ctx.fillStyle='#8b8e7e';ctx.fillRect(x-4,y+45,38,3);
    });
};

// 2) Os brotos da missão ficam em locais claros, separados e com nome/número visível.
villageSeedSpots[0].x=315; villageSeedSpots[0].y=305;
villageSeedSpots[1].x=815; villageSeedSpots[1].y=350;
villageSeedSpots[2].x=475; villageSeedSpots[2].y=425;

// 3) Rotina diária fixa dos moradores: praça/mercado/horta e entrada de suas casas.
const villageLifeNPCs = [
    {id:'mara',name:'Mara, a moradora',home:'casa-1',doorX:80,a:{x:360,y:265},b:{x:145,y:265},p:{hair:'#6d4329',skin:'#d7b18a',cloth:'#6d9c6a',trim:'#c6d88d',boot:'#352b24'},job:'sweep',offset:0},
    {id:'timo',name:'Timo, o aprendiz',home:'casa-3',doorX:340,a:{x:730,y:280},b:{x:355,y:265},p:{hair:'#d6a95f',skin:'#d6a883',cloth:'#567f9b',trim:'#e0c67d',boot:'#302b26'},job:'sell',offset:17},
    {id:'nilo',name:'Nilo, o jardineiro',home:'casa-5',doorX:600,a:{x:820,y:405},b:{x:625,y:265},p:{hair:'#493b2c',skin:'#d4a27c',cloth:'#b16b4e',trim:'#ead7a0',boot:'#302b26'},job:'garden',offset:34},
    {id:'lia',name:'Lia, a cartógrafa',home:'casa-2',doorX:210,a:{x:265,y:270},b:{x:220,y:230},p:{hair:'#b7b0a0',skin:'#d8b58d',cloth:'#8874a8',trim:'#ded0ef',boot:'#302b26'},job:'map',offset:48},
    {id:'bento',name:'Bento, o padeiro',home:'casa-4',doorX:470,a:{x:560,y:265},b:{x:500,y:230},p:{hair:'#70452b',skin:'#d2a27d',cloth:'#b88b48',trim:'#f0d17a',boot:'#302b26'},job:'sell',offset:62}
];
function villageNPCState(npc){
    const sec=((game.worldClockMs||0)/1000+npc.offset)%84;
    const lerp=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
    const b={x:npc.doorX,y:230},door={x:npc.doorX,y:164};
    if(sec<18) return {...npc,...npc.a,inside:false,walking:false,activity:npc.job};
    if(sec<30) return {...npc,...lerp(npc.a,b,(sec-18)/12),inside:false,walking:true,activity:'walk'};
    if(sec<42) return {...npc,...b,inside:false,walking:false,activity:npc.job};
    if(sec<54) return {...npc,...lerp(b,door,(sec-42)/12),inside:false,walking:true,activity:'walk'};
    if(sec<72) return {...npc,x:620,y:255,inside:true,walking:false,activity:'inside'};
    if(sec<77) return {...npc,...lerp(door,b,(sec-72)/5),inside:false,walking:true,activity:'walk'};
    return {...npc,...lerp(b,npc.a,(sec-77)/7),inside:false,walking:true,activity:'walk'};
}
nearestVillageNPC=function(){
    if(game.location!=='Vila Verde') return null;
    for(const npc of villageLifeNPCs){
        const state=villageNPCState(npc);
        if(game.interiorHouse){
            if(state.inside&&state.home===game.interiorHouse&&isNearPoint(620,255,70)) return {...state,x:620,y:255};
        }else if(!state.inside&&isNearPoint(state.x,state.y,62)) return state;
    }
    return null;
};

drawVillageNPCs=function(){
    if(game.location!=='Vila Verde') return;
    for(const npc of villageLifeNPCs){
        const state=villageNPCState(npc);
        if(game.interiorHouse){
            if(state.inside&&state.home===game.interiorHouse){
                drawPixelNPC(606,220,state.p);
                ctx.fillStyle='#f4edce';ctx.font='10px monospace';ctx.fillText(npc.name.split(',')[0],598,214);
            }
            continue;
        }
        if(state.inside) continue;
        const bob=state.walking?Math.sin(game.animationTime*.025+npc.offset)*2:Math.sin(game.animationTime*.006+npc.offset)*.6;
        drawPixelNPC(state.x-14,state.y-35+bob,state.p);
        // Small job animations make the settlement feel inhabited.
        if(state.activity==='garden'){
            ctx.strokeStyle='#d5b16e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(state.x+12,state.y-5);ctx.lineTo(state.x+21,state.y+5+Math.sin(game.animationTime*.01)*3);ctx.stroke();ctx.fillStyle='#9c7547';ctx.fillRect(state.x+18,state.y+2,7,3);ctx.lineWidth=1;
        }else if(state.activity==='sell'){
            ctx.fillStyle='#6c482d';ctx.fillRect(state.x+12,state.y-3,8,8);ctx.fillStyle='#d9c16e';ctx.fillRect(state.x+14,state.y-1,4,4);
        }else if(state.activity==='sweep'){
            ctx.strokeStyle='#b99b6a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(state.x+14,state.y-4);ctx.lineTo(state.x+22,state.y+9);ctx.stroke();ctx.fillStyle='#c5a66a';ctx.fillRect(state.x+18,state.y+7,9,3);ctx.lineWidth=1;
        }else if(state.activity==='map'){
            ctx.fillStyle='#eee2b6';ctx.fillRect(state.x+10,state.y-5,10,9);ctx.strokeStyle='#8e9f75';ctx.beginPath();ctx.moveTo(state.x+12,state.y-1);ctx.lineTo(state.x+16,state.y-3);ctx.lineTo(state.x+18,state.y+2);ctx.stroke();
        }
        if(isNearPoint(state.x,state.y,62)&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(state.x,state.y-22);
    }
    const door=nearestVillageDoor();if(door&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(door.doorX,door.doorY-28);
    const m=currentMerchantSpot();
    if(game.location===m.scene&&!game.interiorHouse){
        drawPixelNPC(m.x-14,m.y-35,{hair:'#3a3027',skin:'#d2a77f',cloth:'#a16c39',trim:'#e3c46b',boot:'#2a2924'},'merchant');
        if(isNearMerchant()&&!game.dialogueOpen&&!game.battle)drawInteractionMarker(m.x,m.y-25);
    }
    if(!game.interiorHouse&&villageQuestStatus.nilo==='active'){
        villageSeedSpots.forEach((spot,i)=>{
            if(villageSeedsCollected.includes(spot.id)) return;
            const pulse=1+Math.sin(game.animationTime*.006+i*2)*2;
            ctx.fillStyle='rgba(190,235,117,.22)';ctx.beginPath();ctx.arc(spot.x,spot.y,17+pulse,0,Math.PI*2);ctx.fill();
            ctx.fillStyle='#bde86e';ctx.fillRect(spot.x-3,spot.y-7-pulse,6,12);ctx.fillRect(spot.x-10,spot.y-2,8,4);ctx.fillRect(spot.x+3,spot.y-3,8,4);
            ctx.fillStyle='#152013';ctx.fillRect(spot.x-37,spot.y-31,74,15);ctx.strokeStyle='#bde86e';ctx.strokeRect(spot.x-37,spot.y-31,74,15);ctx.fillStyle='#f0f3c9';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText(`BROTO ${i+1}`,spot.x,spot.y-20);ctx.textAlign='left';
            if(isNearPoint(spot.x,spot.y,48)&&!game.dialogueOpen)drawInteractionMarker(spot.x,spot.y-43);
        });
    }
};

// Indoor villagers can be spoken to, and furniture/shelves block the player instead of being walk-through.
const interactWithVillageBeforeIndoorNPCPatch=interactWithVillage;
interactWithVillage=function(){
    if(game.location==='Vila Verde'&&game.interiorHouse){
        const resident=nearestVillageNPC();
        if(resident){openVillageNpcMenu(resident);return true;}
    }
    return interactWithVillageBeforeIndoorNPCPatch();
};
const updatePlayerBeforeShelfCollisionPatch=updatePlayer;
updatePlayer=function(){
    const oldX=player.x,oldY=player.y;
    updatePlayerBeforeShelfCollisionPatch();
    if(!game.running||game.location!=='Vila Verde'||!game.interiorHouse||game.dialogueOpen||game.battle||game.paused)return;
    const box={x:player.x+8,y:player.y+12,w:player.width-16,h:player.height-12};
    const overlaps=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
    const solids=[
        {x:110,y:145,w:190,h:65}, // prateleira esquerda
        {x:700,y:150,w:125,h:80}, // prateleira direita
        {x:350,y:290,w:210,h:65}, // mesa central
        {x:375,y:350,w:10,h:45},{x:525,y:350,w:10,h:45},
        {x:45,y:110,w:855,h:15},{x:45,y:110,w:15,h:355},{x:885,y:110,w:15,h:355},
        {x:45,y:450,w:370,h:15},{x:505,y:450,w:395,h:15}
    ];
    if(solids.some(r=>overlaps(box,r))){player.x=oldX;player.y=oldY;player.moving=false;}
};

// 4) Torches with a soft pool of light, fireflies at night, and changing weather.
function currentWorldWeather(){
    const sec=(game.worldClockMs||0)/1000;
    const stage=Math.floor(sec/70)%4;
    return ['sol','nublado','chuva','sol'][stage];
}
function isWorldNight(){const phase=((game.worldClockMs||0)/1000%360)/360;return phase>=.62;}
function drawCaveTorches(){
    if(game.location!=='Caverna'&&game.location!=='Mina Antiga')return;
    const spots=game.location==='Caverna'?[[90,205],[300,300],[560,195],[850,325]]:[[110,245],[450,210],[820,290]];
    const t=game.animationTime*.001;
    spots.forEach(([x,y],i)=>{
        const flicker=.85+Math.sin(t*9+i*2)*.12;
        const g=ctx.createRadialGradient(x,y,3,x,y,86*flicker);g.addColorStop(0,'rgba(255,191,83,.27)');g.addColorStop(.45,'rgba(255,151,54,.10)');g.addColorStop(1,'rgba(255,130,35,0)');ctx.fillStyle=g;ctx.fillRect(x-90,y-90,180,180);
        ctx.fillStyle='#553b29';ctx.fillRect(x-3,y+2,6,25);ctx.fillStyle='#e58b39';ctx.fillRect(x-4,y-5-Math.sin(t*13+i)*2,8,10);ctx.fillStyle='#ffe6a0';ctx.fillRect(x-2,y-7-Math.sin(t*13+i)*2,4,6);
    });
}
function drawWeatherAndFireflies(){
    const seconds=(game.worldClockMs||0)/1000,night=isWorldNight(),weather=currentWorldWeather();
    if(!game.interiorHouse&&game.location!=='Caverna'&&game.location!=='Mina Antiga'){
        if(night){ctx.fillStyle='rgba(9,18,38,.16)';ctx.fillRect(0,70,960,470);}
        if(weather==='nublado'){
            ctx.fillStyle='rgba(35,45,48,.13)';ctx.fillRect(0,70,960,470);
            for(let i=0;i<5;i++){const x=(i*220+seconds*5)%1120-80;ctx.fillStyle='rgba(44,55,56,.28)';ctx.fillRect(x,88+(i%2)*17,130,18);ctx.fillRect(x+20,77+(i%2)*17,75,18);}
        }
        if(weather==='chuva'){
            ctx.fillStyle='rgba(15,28,40,.18)';ctx.fillRect(0,70,960,470);
            ctx.strokeStyle='rgba(177,211,220,.52)';ctx.lineWidth=1;
            for(let i=0;i<105;i++){const x=(i*97+seconds*180)%980-10;const y=(i*53+seconds*310)%480+65;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-5,y+12);ctx.stroke();}
        }
    }
    if(night&&(game.location==='Caverna'||game.location==='Mina Antiga'||game.location==='Floresta'||game.location==='Lago Escondido')){
        for(let i=0;i<26;i++){
            const x=(i*137+Math.sin(seconds*.7+i)*27+seconds*(4+i%3))%950+5;
            const y=100+(i*71+Math.sin(seconds*1.3+i*2)*20)%390;
            const a=.35+(.5+.5*Math.sin(seconds*4+i))* .55;
            const glow=ctx.createRadialGradient(x,y,1,x,y,12);glow.addColorStop(0,`rgba(208,255,125,${a})`);glow.addColorStop(1,'rgba(145,230,104,0)');ctx.fillStyle=glow;ctx.fillRect(x-12,y-12,24,24);ctx.fillStyle=`rgba(225,255,156,${a})`;ctx.fillRect(x-1,y-1,3,3);
        }
    }
    drawCaveTorches();
    // Compact indicator, visible without covering the HUD.
    if(game.running&&!game.dialogueOpen&&!game.battle){ctx.fillStyle='rgba(10,17,13,.68)';ctx.fillRect(795,78,145,20);ctx.fillStyle='#e5e2c4';ctx.font='10px monospace';ctx.textAlign='right';ctx.fillText(`${weather.toUpperCase()} · ${night?'NOITE':'DIA'}`,930,92);ctx.textAlign='left';}
}

// 5) Pixel animals wander in fixed habitats; hunting consumes arrows and gives useful items.
const huntAnimalDefs=[
    {id:'coelho-1',scene:'Floresta',x:225,y:410,type:'rabbit',loot:'Carne de caça'},
    {id:'coelho-2',scene:'Floresta',x:650,y:445,type:'rabbit',loot:'Carne de caça'},
    {id:'passaro-1',scene:'Floresta',x:420,y:365,type:'bird',loot:'Pena'},
    {id:'coelho-rio',scene:'Rio',x:180,y:350,type:'rabbit',loot:'Carne de caça'},
    {id:'passaro-lago',scene:'Lago Escondido',x:760,y:440,type:'bird',loot:'Pena'}
];
if(!game.huntedAnimals)game.huntedAnimals={};
function getHuntAnimalPosition(animal){
    const t=(game.worldClockMs||0)/1000;
    return {x:animal.x+Math.sin(t*.45+animal.x)*25,y:animal.y+Math.sin(t*.8+animal.y)*5};
}
function animalAvailable(animal){const stamp=game.huntedAnimals[animal.id];return stamp==null||(game.worldClockMs-stamp)>120000;}
function drawHuntAnimals(){
    if(!['Floresta','Rio','Lago Escondido'].includes(game.location)||game.interiorHouse)return;
    huntAnimalDefs.filter(a=>a.scene===game.location&&animalAvailable(a)).forEach((a,i)=>{
        const p=getHuntAnimalPosition(a),walk=Math.sin(game.animationTime*.02+i)*2;
        ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(p.x-12,p.y+11,25,5);
        if(a.type==='rabbit'){
            ctx.fillStyle='#b9a98b';ctx.fillRect(p.x-10,p.y-2+walk,18,12);ctx.fillRect(p.x+4,p.y-8+walk,9,9);ctx.fillRect(p.x+5,p.y-17+walk,3,10);ctx.fillRect(p.x+10,p.y-16+walk,3,9);ctx.fillStyle='#f0dfbf';ctx.fillRect(p.x+10,p.y-4+walk,2,2);ctx.fillStyle='#4d4138';ctx.fillRect(p.x+11,p.y-2+walk,2,2);ctx.fillStyle='#cfc2a7';ctx.fillRect(p.x-7,p.y+8+walk,5,5);ctx.fillRect(p.x+3,p.y+8+walk,5,5);
        }else{
            ctx.fillStyle='#536b68';ctx.fillRect(p.x-7,p.y-3+walk,16,9);ctx.fillRect(p.x+5,p.y-7+walk,7,7);ctx.fillStyle='#8aa59a';ctx.fillRect(p.x-4,p.y-6+walk,8,5);ctx.fillStyle='#d9c17a';ctx.fillRect(p.x+10,p.y-4+walk,2,2);const flap=Math.sin(game.animationTime*.04+i)*4;ctx.fillStyle='#78928a';ctx.fillRect(p.x-5,p.y-7+walk+flap,8,4);ctx.fillRect(p.x+1,p.y-9+walk-flap,8,4);
        }
        if(isNearPoint(p.x,p.y,52)&&!game.dialogueOpen&&!game.battle){drawInteractionMarker(p.x,p.y-18);ctx.fillStyle='#10170f';ctx.fillRect(p.x-35,p.y-42,70,13);ctx.fillStyle='#f1e8c5';ctx.font='9px monospace';ctx.textAlign='center';ctx.fillText('CAÇAR (E)',p.x,p.y-33);ctx.textAlign='left';}
    });
}
function tryHuntNearbyAnimal(){
    if(!['Floresta','Rio','Lago Escondido'].includes(game.location)||game.interiorHouse)return false;
    const animal=huntAnimalDefs.find(a=>a.scene===game.location&&animalAvailable(a)&&(()=>{const p=getHuntAnimalPosition(a);return isNearPoint(p.x,p.y,52);})());
    if(!animal)return false;
    const bowOwned=Boolean(game.hasBow||game.inventory.some(i=>i.name==='Arco de caça'&&i.qty>0));
    const arrows=game.inventory.find(i=>/flechas?/i.test(i.name)&&i.qty>0);
    if(!bowOwned||!arrows){showTemporaryDialogue('NARRADOR',!bowOwned?'Os animais são rápidos. Um arco e flechas ajudariam a caçar sem se aproximar demais.':'Você ficou sem flechas. O mercador costuma vender um pequeno pacote por poucas moedas.');return true;}
    arrows.qty--;if(arrows.qty<=0)game.inventory=game.inventory.filter(i=>i!==arrows);
    game.huntedAnimals[animal.id]=game.worldClockMs||0;
    addInventoryItem(animal.loot,animal.loot==='Pena'?'Uma pena recolhida durante a caça.':'Carne obtida na caça; pode ser útil em trocas.',1,'material');
    showTemporaryDialogue('CAÇA',`Você conseguiu caçar um ${animal.type==='rabbit'?'coelho':'pássaro'} e recolheu: ${animal.loot}.`);renderInventory();return true;
}

// 6) Add affordable bow and arrows to the traveling merchant at any of his stops.
const shopItemsForHunting=shopOverlay.querySelector('.shop-items');
if(shopItemsForHunting&&!shopItemsForHunting.querySelector('[data-buy="bow"]')){
    shopItemsForHunting.insertAdjacentHTML('beforeend',`<button type="button" data-buy="bow"><b>🏹 Arco de caça</b><span>Equipamento para caçar animais</span><strong>10 moedas</strong></button><button type="button" data-buy="arrows"><b>➶ 5 flechas</b><span>Usadas para caçar</span><strong>4 moedas</strong></button>`);
    shopItemsForHunting.querySelector('[data-buy="bow"]').addEventListener('click',()=>buyShopItem('bow'));
    shopItemsForHunting.querySelector('[data-buy="arrows"]').addEventListener('click',()=>buyShopItem('arrows'));
}
const buyShopItemBeforeHuntPatch=buyShopItem;
buyShopItem=function(kind){
    if(kind==='bow'||kind==='arrows'){
        const price=kind==='bow'?10:4;
        if((game.coins||0)<price){$('shopFeedback').textContent='Você não tem moedas suficientes para isso.';return;}
        game.coins-=price;
        if(kind==='bow'){
            game.hasBow=true;
            if(game.character)game.character.weapon=3;
            if(!game.inventory.some(i=>i.name==='Arco de caça'))addInventoryItem('Arco de caça','Arma equipada para caçar animais.',1,'equipamento');
            $('shopFeedback').textContent='Arco comprado e equipado! Ele ficará visível enquanto você anda.';
        }else{
            addInventoryItem('Flechas','Munição para caçar animais.',5,'munição');
            $('shopFeedback').textContent='Você comprou cinco flechas.';
        }
        updateShopCoins();renderInventory();return;
    }
    buyShopItemBeforeHuntPatch(kind);
};
shopOverlay.querySelector('.modal-help').textContent='O mercador ambulante muda de lugar entre o Rio, a Vila e a Mina. Arco e flechas são baratos para facilitar a caça.';

// Keep weapons attached to a stable hand anchor in every facing direction.
drawPlayerWeapon=function(){
    if(!game.character)return;
    const spriteIndex=Number.isInteger(game.character.weapon)?game.character.weapon:1;
    const px=player.x-15,py=player.y-15+(player.moving?player.walkOffset:0);
    let wx=px+42,wy=py+18,ww=18,wh=40;
    if(player.direction==='left'){wx=px-8;wy=py+18;}
    else if(player.direction==='up'){wx=px+23;wy=py-5;ww=16;wh=39;}
    else if(player.direction==='down'){wx=px+37;wy=py+29;ww=16;wh=37;}
    if(weaponImageLoaded){ctx.drawImage(weaponImage,spriteIndex*13,0,13,35,Math.round(wx),Math.round(wy),ww,wh);}
    else{ctx.fillStyle=spriteIndex===0||spriteIndex===2?'#9b7ac5':'#b5b7ae';ctx.fillRect(wx+7,wy,4,wh-4);ctx.fillStyle='#5b4630';ctx.fillRect(wx+3,wy+wh-12,12,4);}
};

// A final draw pass adds animals and atmospheric effects without changing the original art files.
const drawGameBeforeVillageLifeEffects=drawGame;
drawGame=function(){
    drawGameBeforeVillageLifeEffects();
    drawHuntAnimals();
    drawWeatherAndFireflies();
};

// Handle animal hunting before the older interaction chain; skeletons remain harmless scenery.
const interactBeforeVillageLifeEffects=interact;
interact=function(){
    if(game.running&&!game.dialogueOpen&&!game.battle&&!game.paused&&tryHuntNearbyAnimal())return;
    if(game.running&&!game.dialogueOpen&&!game.battle&&!game.paused&&game.location==='Caverna'){
        const sk=passiveSkeletonSpots.find(s=>isNearPoint(s.x+14,s.y+22,58));
        if(sk){showTemporaryDialogue('NARRADOR','São restos de antigos exploradores. Os esqueletos não representam perigo; você pode seguir sem lutar.');return;}
    }
    interactBeforeVillageLifeEffects();
};

// Start a fresh run with the animal hunt state reset; original character and art choices are preserved.
const startGameBeforeVillageLifeEffects=startGame;
startGame=function(){game.huntedAnimals={};game.hasBow=false;startGameBeforeVillageLifeEffects();};

