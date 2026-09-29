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
        route:['Floresta','Vila Verde','Caverna','Rio','Ruinas']
    },

    {
        name:'Ecca',
        element:'NATUREZA',
        description:'Uma presença silenciosa entre pedras e raízes.',
        image:'images/ecca.png',
        weapon:0,
        route:['Caverna','Vila Verde','Floresta','Rio','Ruinas']
    },

    {
        name:'Mangália',
        element:'VIDA',
        description:'Encontrou no rio um lugar para chamar de casa.',
        image:'images/mangalia.png',
        weapon:2,
        route:['Rio','Vila Verde','Floresta','Ruinas','Caverna']
    },

    {
        name:'Pi Tombio',
        element:'AREIA',
        description:'Pequeno, curioso e sempre pronto para explorar.',
        image:'images/tombio.png',
        weapon:3,
        route:['Floresta','Vila Verde','Rio','Ruinas','Caverna']
    },

    {
        name:'Kuzko',
        element:'TERRA',
        description:'Resistente como as pedras que atravessa.',
        image:'images/kuzko.png',
        weapon:1,
        route:['Caverna','Vila Verde','Rio','Floresta','Ruinas']
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
        ['NARRADOR','A Vila Verde parece tranquila, mas há baús espalhados entre as casas. Alguns moradores dizem que nem todos guardam tesouros.'],
        ['MORADORA','Se for procurar baús, observe a tampa e a fechadura. Os baús comuns ficam quietos; os outros podem tentar morder!'],
        ['NARRADOR','A praça central liga as casas, a trilha do rio e a estrada para as outras dimensões.']
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
    {id:'vila-normal-1',scene:'Vila Verde',x:245,y:390,kind:'normal'},
    {id:'vila-mimic-1',scene:'Vila Verde',x:700,y:390,kind:'mimic'},
    {id:'vila-normal-2',scene:'Vila Verde',x:750,y:235,kind:'normal'},
    {id:'vila-mimic-2',scene:'Vila Verde',x:390,y:365,kind:'mimic'},
    {id:'floresta-normal-1',scene:'Floresta',x:760,y:405,kind:'normal'},
    {id:'floresta-mimic-1',scene:'Floresta',x:690,y:345,kind:'mimic'},
    {id:'caverna-normal-1',scene:'Caverna',x:740,y:400,kind:'normal'}
];

const worldMapNodes = [
    {name:'Floresta',x:115,y:100},
    {name:'Caverna',x:265,y:220},
    {name:'Vila Verde',x:385,y:105},
    {name:'Rio',x:495,y:235},
    {name:'Ruinas',x:555,y:95}
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

                if(introWaitingForCharacter){
                    introWaitingForCharacter = false;
                    startCinematicIntro(0);
                }else{
                    setTimeout(()=>showScreen('mood'),100);
                }

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
    introWaitingForCharacter = true;
    createCharacterCards();
    const heading = document.querySelector('#characterScreen .screen-header h1');
    if(heading) heading.textContent = 'QUAL IRMÃO VAI LER O LIVRO?';
    showScreen('characters');
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
let introSceneIndex = 0;
let introAnimFrame = 0;
let introStartTime = 0;
let introLastTime = 0;
let introParticles = [];
let introRunning = false;
let introRevealTimer = null;
let introAdvanceTimer = null;
let introTextFullyShown = false;
const INTRO_SCENE_DURATION = 6500; // cenas curtas e automáticas; CONTINUAR e PULAR seguem disponíveis
let introWaitingForCharacter = false;

const introScenes = [
 {chapter:'PRÓLOGO',title:'Cinco irmãos, uma floresta',voice:'intro_hunt_01',text:'Cinco irmãos goblins costumavam sair juntos para caçar. Conheciam os sons da mata, dividiam o que encontravam e sempre voltavam para casa lado a lado.',kind:'hunt'},
 {chapter:'A DESCOBERTA',title:'O livro entre as raízes',voice:'intro_book_02',text:'Em uma caçada, encontraram um livro antigo escondido sob as raízes de uma árvore. A capa pulsava com uma luz que nenhum deles jamais tinha visto.',kind:'book'},
 {chapter:'O VERSO',title:'Uma frase que não deveria ser lida',voice:'intro_verse_03',text:'As páginas se abriram sozinhas. Um verso parecia chamar por uma voz. O irmão que você escolher será aquele que vai recitá-lo.',kind:'choose'},
 {chapter:'O FEITIÇO',title:'A voz do irmão escolhido',voice:'intro_spell_04',text:'Assim que o irmão escolhido pronunciou as palavras, as letras saíram do papel e giraram ao redor dos cinco. O chão tremeu. O livro estava lançando um feitiço.',kind:'spell'},
 {chapter:'A RUPTURA',title:'Cinco portais se abriram',voice:'intro_portals_05',text:'A magia rasgou o ar em cinco portais. Os irmãos tentaram alcançar uns aos outros, mas cada portal os puxou em uma direção diferente.',kind:'portals'},
 {chapter:'AS DIMENSÕES',title:'Cada irmão, um mundo',voice:'intro_biomes_06',text:'Um foi lançado na floresta sem fim; outro, em cavernas profundas; os demais despertaram entre rios, dunas e ruínas. Eram biomas separados, como dimensões diferentes.',kind:'biomes'},
 {chapter:'SOZINHOS',title:'Longe de casa',voice:'intro_alone_07',text:'Pela primeira vez, os cinco estavam sozinhos. O livro desapareceu, mas uma página ficou marcada na memória: para voltar, precisariam encontrar o caminho de volta uns aos outros.',kind:'alone'},
 {chapter:'O VERDADEIRO OBJETIVO',title:'O Coração da Ilha',voice:'intro_heart_08',text:'A magia também revelou um segredo: o Coração da Ilha está enfraquecendo. Se os irmãos conseguirem se reunir, talvez possam encontrar o Coração e salvar a ilha antes que seja tarde.',kind:'heart'},
 {chapter:'CINCO CAMINHOS',title:'Pistas espalhadas por cinco dimensões',voice:'intro_paths_09',text:'Cada irmão terá de explorar seu próprio mundo, superar perigos e descobrir pistas. Nenhum deles sabe exatamente onde os outros foram parar.',kind:'paths'},
 {chapter:'O COMEÇO',title:'Um Mundo, Vários Caminhos',voice:'intro_title_10',text:'Cinco irmãos. Cinco dimensões. Um reencontro que pode salvar a ilha. Sua jornada começa agora.',kind:'title'}
];

function startCinematicIntro(startAt = 0){
    clearTimeout(introRevealTimer);
    clearTimeout(introAdvanceTimer);
    cancelAnimationFrame(introAnimFrame);
    introSceneIndex = startAt;
    introRunning = true;
    introStartTime = performance.now();
    introLastTime = introStartTime;
    introParticles = Array.from({length:70},(_,i)=>({x:Math.random()*960,y:Math.random()*540,r:1+Math.random()*2.5,s:.2+Math.random()*.7,p:Math.random()*Math.PI*2,type:i%4}));
    showScreen('intro');
    setIntroScene(startAt);
    introAnimFrame = requestAnimationFrame(drawCinematicIntro);
}

function setIntroScene(index){
    introSceneIndex = Math.max(0,Math.min(index,introScenes.length-1));
    const scene = introScenes[introSceneIndex];
    introChapter.textContent = scene.chapter;
    introTitle.textContent = scene.title;
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

function advanceCinematicIntro(){
    if(!introRunning) return;
    clearTimeout(introAdvanceTimer);
    if(introSceneIndex >= introScenes.length-1){
        finishCinematicIntro();
        return;
    }
    setIntroScene(introSceneIndex+1);
}

function finishCinematicIntro(){
    introRunning = false;
    cancelAnimationFrame(introAnimFrame);
    clearTimeout(introRevealTimer);
    clearTimeout(introAdvanceTimer);
    createCharacterCards();
    if(game.character){
        showScreen('mood');
    }else{
        introWaitingForCharacter = false;
        showScreen('characters');
    }
}

introNextButton.addEventListener('click',advanceCinematicIntro);
introSkipButton.addEventListener('click',finishCinematicIntro);
introCanvas.addEventListener('pointerup',event=>{
    if(event.target === introCanvas && introRunning) advanceCinematicIntro();
});
document.addEventListener('keydown',event=>{
    if(!introRunning) return;
    if(['Enter','Space','ArrowRight'].includes(event.code)){
        event.preventDefault();
        advanceCinematicIntro();
    } else if(event.code === 'Escape'){
        event.preventDefault();
        finishCinematicIntro();
    }
});

function drawCinematicIntro(timestamp){
    if(!introRunning) return;
    try {
        const dt = Math.min(40, timestamp-introLastTime || 16);
        introLastTime = timestamp;
        const time = (timestamp-introStartTime)/1000;
        const scene = introScenes[introSceneIndex];
        const c = introCtx;
        if(!scene || !c) { finishCinematicIntro(); return; }
        c.clearRect(0,0,960,540);
        const skyTop = scene.kind==='heart' ? '#171a27' : scene.kind==='title' ? '#101a18' : '#172d2a';
        const skyBottom = scene.kind==='heart' ? '#47313a' : '#71865c';
        const sky = c.createLinearGradient(0,0,0,540);
        sky.addColorStop(0,skyTop); sky.addColorStop(1,skyBottom);
        c.fillStyle=sky;c.fillRect(0,0,960,540);
        drawIntroStars(c,time,scene.kind==='heart'||scene.kind==='title');
        if(scene.kind==='island'||scene.kind==='heart') drawIntroIsland(c,time,scene.kind==='heart');
        if(scene.kind==='map') drawIntroMap(c,time);
        if(scene.kind==='character') drawIntroCharacter(c,time,scene);
        if(scene.kind==='hunt') drawGoblinHunt(c,time);
        if(scene.kind==='book'||scene.kind==='choose') drawMagicBookScene(c,time,scene.kind==='choose');
        if(scene.kind==='spell') drawGoblinSpell(c,time,game.character);
        if(scene.kind==='portals') drawGoblinPortals(c,time);
        if(scene.kind==='biomes'||scene.kind==='alone') drawGoblinBiomes(c,time,scene.kind==='alone');
        if(scene.kind==='paths') drawIntroPaths(c,time);
        if(scene.kind==='title') drawIntroTitleScene(c,time);
        drawIntroFloatingParticles(c,time,dt,scene.kind==='heart');
        c.fillStyle='rgba(0,0,0,.20)';c.fillRect(0,0,960,14);c.fillRect(0,526,960,14);
    } catch(error) {
        // Mantém a tela utilizável mesmo se um desenho específico falhar.
        console.error('Erro ao desenhar a introdução:', error);
        introCtx.fillStyle='#14251c'; introCtx.fillRect(0,0,960,540);
        introCtx.fillStyle='#f2e9ca'; introCtx.textAlign='center';
        introCtx.font='bold 26px Georgia'; introCtx.fillText('UM MUNDO, VÁRIOS CAMINHOS',480,245);
        introCtx.font='16px Arial'; introCtx.fillText('Toque em CONTINUAR para seguir a história.',480,285);
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

    // Colisão simples com as casas da Vila Verde: o personagem não atravessa paredes.
    if(game.location === 'Vila Verde'){
        const houseRects = [
            {x:55,y:127,w:108,h:53},{x:195,y:117,w:70,h:40},
            {x:615,y:122,w:112,h:52},{x:785,y:157,w:110,h:50},
            {x:80,y:327,w:110,h:53},{x:545,y:322,w:100,h:48}
        ];
        const overlapsHouse = (x,y) => houseRects.some(h =>
            x + player.width > h.x && x < h.x + h.w &&
            y + player.height > h.y && y < h.y + h.h
        );
        if(overlapsHouse(nextX,nextY)){
            const canMoveX = !overlapsHouse(nextX,player.y);
            const canMoveY = !overlapsHouse(player.x,nextY);
            if(canMoveX) nextY = player.y;
            else if(canMoveY) nextX = player.x;
            else { nextX = player.x; nextY = player.y; }
        }
    }

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

        const found =
            Math.random() < 0.55;


        if(found){

            showTemporaryDialogue(
                'NARRADOR',
                'Você encontrou uma marca antiga escondida no ambiente. Ela indica uma passagem que outros viajantes ignoraram.'
            );

            setTimeout(
                ()=>nextLocation(),
                900
            );

        }

        else{

            nextLocation(
                'A exploração revelou apenas mais uma parte do ambiente.'
            );

        }

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

    $('battleMessage')
        .textContent =
        'Você venceu o encontro!';


    setTimeout(
        ()=>{

            endBattle();

            if(game.chestBattleId){
                const chest = chestSpots.find(item => item.id === game.chestBattleId);
                if(chest) game.chestStates[chest.id] = 'opened';
                game.chestBattleId = null;
                const reward = giveChestReward();
                showTemporaryDialogue('BAÚ RECUPERADO', `O Mimic foi derrotado! Dentro do baú havia ${reward}.`);
                return;
            }

            nextLocation();

        },
        700
    );

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
            const px=ch.x/960*(w-40)+20, py=ch.y/540*(h-40)+20;
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