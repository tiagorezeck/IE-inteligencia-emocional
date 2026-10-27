import { DimensionId, ClassificationBand, DimensionInterpretation } from '../types/assessment';

export const METAPHORS: Record<DimensionId, { name: string; tag: string; explanation: string }> = {
  autoconsciencia: {
    name: 'Bússola Emocional',
    tag: 'Autopercepção e Clareza Interna',
    explanation: 'Assim como uma bússola indica o norte magnético sob qualquer condição, a autoconsciência fornece as coordenadas dos seus sentimentos, reações e limites reais antes de você tomar qualquer decisão.'
  },
  gestao: {
    name: 'Farol na Tempestade',
    tag: 'Equilíbrio e Autocontrole sob Pressão',
    explanation: 'Como um farol que permanece firme e lúcido em meio a mares revoltos, a gestão das emoções sustenta a serenidade, prevenindo reações impulsivas e guiando suas condutas em momentos de estresse.'
  },
  automotivacao: {
    name: 'Jornada ao Horizonte',
    tag: 'Propósito, Resiliência e Foco Contínuo',
    explanation: 'Como quem caminha rumo a um horizonte distante mantendo o passo firme mesmo diante de terrenos íngremes, a automotivação sustenta a disciplina diária e o aprendizado com os obstáculos.'
  },
  empatia: {
    name: 'Ponte entre Perspectivas',
    tag: 'Sintonia, Escuta e Consideração do Outro',
    explanation: 'Como uma ponte que conecta duas margens separadas por um abismo, a empatia liga o seu universo interior ao dos outros, permitindo compreender motivações e necessidades distintas das suas.'
  },
  habilidades_sociais: {
    name: 'Rede de Conexões',
    tag: 'Articulação, Cooperação e Diálogo Construtivo',
    explanation: 'Como uma malha tecida com fios interdependentes, as habilidades sociais orquestram a cooperação, transformam divergências em aprendizado mútuo e mobilizam grupos em torno de propósitos compartilhados.'
  }
};

export const INTERPRETATIONS: Record<DimensionId, Record<ClassificationBand, DimensionInterpretation>> = {
  // ==========================================
  // DIMENSÃO 1: AUTOCONSCIÊNCIA (Bússola Emocional)
  // ==========================================
  autoconsciencia: {
    'Muito baixo': {
      oQueSugere: 'O resultado sugere que você tende a viver as emoções de forma difusa ou tardia, percebendo o impacto emocional apenas após ter reagido impulsivamente ou sofrido desgastes intensos. Há dificuldade habitual em nomear o que sente e em rastrear os gatilhos que antecedem momentos de estresse.',
      oQuePreservar: [
        'A espontaneidade nas interações do dia a dia.',
        'A disposição para vivenciar experiências sem excesso de racionalização inicial.'
      ],
      oQueDesenvolver: [
        'Capacidade de registrar e nomear emoções básicas em tempo real.',
        'Identificação prévia de situações gatilho que disparam ansiedade ou irritabilidade.',
        'Pausas deliberadas antes de respostas verbais ou tomadas de decisão sob tensão.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Em conversas familiares difíceis, interromper discussões assim que notar tensão corporal e fazer três respirações conscientes antes de continuar.',
        profissional: 'Antes de responder a um e-mail desafiador ou entrar em reunião tensa, notar a própria postura física e checar mentalmente o estado emocional dominante.'
      },
      recomendacoes: [
        'Mantenha um diário rápido de três linhas no fim do dia: o que senti hoje, em qual situação e como reagi.',
        'Pratique o "check-in corporal" de 60 segundos três vezes ao dia para checar mandíbula travada, respiração curta ou ombros tensos.',
        'Ao sentir incômodo, pergunte a si mesmo: "qual é o nome exato do que estou sentindo agora?" (raiva, medo, decepção, cansaço).'
      ],
      perguntaReflexao: 'Quais sinais físicos o seu corpo costuma emitir momentos antes de você perder a paciência ou se fechar em uma conversa?'
    },
    'Baixo': {
      oQueSugere: 'O resultado sugere que você reconhece suas emoções quando elas já estão em intensidade elevada, mas nem sempre compreende a tempo o que as disparou. Pode haver hesitação em reconhecer limitações pessoais ou tendência a agir no "piloto automático" durante rotinas exaustivas.',
      oQuePreservar: [
        'A clareza prática em situações calmas e rotineiras.',
        'O reconhecimento honesto de que nem sempre é fácil monitorar os sentimentos.'
      ],
      oQueDesenvolver: [
        'Percepção precoce de oscilações de humor antes do estresse atingir o ápice.',
        'Mapeamento dos padrões recorrentes que drenam sua energia ou paciência.',
        'Alinhamento lúcido entre autoexpectativas e as demandas reais da rotina.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Identificar quando a irritação com pequenos detalhes em casa é, na verdade, reflexo de cansaço acumulado.',
        profissional: 'Reconhecer em quais etapas de projetos você se sente mais inseguro ou sobrecarregado para ajustar o planejamento com antecedência.'
      },
      recomendacoes: [
        'Crie lembretes visuais ou alarmes suaves para fazer pausas conscientes no meio da jornada de trabalho.',
        'Liste suas três maiores forças e três limitações que mais costumam gerar atrito nas suas entregas.',
        'Observe em quais momentos do dia você costuma estar mais vulnerável à impaciência.'
      ],
      perguntaReflexao: 'De que maneira as suas emoções não verbalizadas têm influenciado silenciosamente suas decisões cotidianas?'
    },
    'Em desenvolvimento': {
      oQueSugere: 'O resultado indica uma autopercepção em amadurecimento consistente. Você já identifica com clareza a maioria dos seus estados emocionais e reconhece boa parte dos seus gatilhos, embora em situações de sobrecarga extrema ainda possa ser surpreendido por reações impulsivas.',
      oQuePreservar: [
        'A capacidade já conquistada de reconhecer forças e vulnerabilidades pessoais.',
        'A postura reflexiva após momentos desafiadores.'
      ],
      oQueDesenvolver: [
        'Refinamento do vocabulário emocional para além do binômio "bem/mal".',
        'Detecção das microexpressões e sensações sutis que precedem o desgaste emocional.',
        'Capacidade de alinhar expectativas internas com a realidade prática sem autocrítica excessiva.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Nomear com precisão o que está sentindo para parceiros ou amigos antes que o mal-estar se transforme em afastamento.',
        profissional: 'Expressar claramente aos colegas quais condições de trabalho potencializam sua produtividade e quais geram ruído desnecessário.'
      },
      recomendacoes: [
        'Aprofunde a análise de causa-efeito: quando algo incomodar, pergunte o "porquê" até chegar à crença ou valor subjacente.',
        'Peça feedback confidencial a uma pessoa de confiança sobre como você costuma transparecer suas emoções sob pressão.',
        'Estabeleça rituais de descompressão entre compromissos para não carregar a tensão de um contexto para o outro.'
      ],
      perguntaReflexao: 'Qual é o gatilho emocional mais previsível na sua rotina que você ainda não aprendeu a desarmar antes de explodir?'
    },
    'Alto': {
      oQueSugere: 'O resultado sugere um elevado nível de autopercepção. Você identifica com rapidez e precisão suas emoções, compreende os motivos subjacentes às suas reações e tem uma leitura madura de suas forças e limitações, utilizando essa clareza como bússola para agir com ponderação.',
      oQuePreservar: [
        'A lucidez na autoavaliação e a sintonia fina com seus estados internos.',
        'A capacidade de discernir quando o julgamento está sendo enviesado por uma emoção passageira.'
      ],
      oQueDesenvolver: [
        'Cuidado para que a autoanálise contínua não se transforme em hiper-racionalização ou paralisia.',
        'Compartilhar insights sobre autoconsciência de forma acolhedora com equipes e familiares.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Prever quando necessita de recolhimento para recarregar as energias sem gerar sensação de rejeição nas pessoas próximas.',
        profissional: 'Assumir tarefas desafiadoras com consciência exata de quais competências próprias acionar e onde pedir apoio especializado.'
      },
      recomendacoes: [
        'Utilize sua autoconsciência para modelar posturas de transparência em ambientes de equipe.',
        'Pratique a autoaceitação generosa diante dos momentos em que, mesmo ciente da emoção, não agir com perfeição.',
        'Documente aprendizados sobre suas fases de maior criatividade e rendimento ao longo dos meses.'
      ],
      perguntaReflexao: 'Como transformar a sua clareza interior em um recurso ainda mais ativo para inspirar e orientar quem está ao seu redor?'
    },
    'Muito alto': {
      oQueSugere: 'O resultado evidencia uma competência muito sólida de autoconsciência percebida. Você possui clareza lúcida e em tempo real sobre seus sentimentos, motivos e padrões de comportamento. Sua autoimagem é calibrada e você reconhece com serenidade seus pontos fortes e limitações.',
      oQuePreservar: [
        'A soberania sobre seu diálogo interno e a capacidade de nomear estados com precisão cirúrgica.',
        'A vigilância humilde, evitando o excesso de confiança ou a presunção de total imunidade ao estresse.'
      ],
      oQueDesenvolver: [
        'Flexibilidade diante de situações ambíguas em que as próprias emoções se contradizem.',
        'Mentoria e suporte para ajudar outras pessoas a desenvolverem sua própria bússola interior.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Atuar como esteio sereno na família ou ciclo social, oferecendo clareza sem impor sua percepção aos outros.',
        profissional: 'Liderar negociações complexas com autodomínio exemplar, servindo de termômetro e âncora emocional para o grupo.'
      },
      recomendacoes: [
        'Canalize essa acuidade para orientar colaboradores e pares no desenvolvimento de autopercepção.',
        'Monitore se a consciência constante não está gerando autocobrança desmedida por manter-se sempre equilibrado.',
        'Mantenha contato regular com novos contextos desafiadores para testar sua autoconsciência em cenários imprevistos.'
      ],
      perguntaReflexao: 'De que maneira você pode colocar sua bússola emocional a serviço do crescimento e da segurança psicológica dos ambientes que você integra?'
    }
  },

  // ==========================================
  // DIMENSÃO 2: GESTÃO DAS EMOÇÕES (Farol na Tempestade)
  // ==========================================
  gestao: {
    'Muito baixo': {
      oQueSugere: 'O resultado sugere dificuldade recorrente em regular impulsos e preservar a compostura diante de pressões ou frustrações. Situações adversas tendem a gerar reações desproporcionais, arrependimento posterior e sensação de sequestro emocional prolongado.',
      oQuePreservar: [
        'A energia autêntica e a paixão colocada nas situações vividas.',
        'O desejo genuíno de encontrar caminhos mais equilibrados para lidar com momentos de tensão.'
      ],
      oQueDesenvolver: [
        'Técnicas de pausa e respiração tática para interromper o impulso imediato de resposta.',
        'Tolerância ao desconforto e à frustração sem recorrer a ataques verbais ou recolhimento abrupto.',
        'Reenquadramento cognitivo para não tratar contratempos pontuais como catástrofes irremediáveis.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Ao sentir raiva em casa, afastar-se fisicamente por 10 minutos comunicando: "estou irritado agora, vou dar uma volta e conversamos com calma".',
        profissional: 'Diante de uma crítica dura ou cobrança injusta, esperar no mínimo 1 hora antes de redigir qualquer resposta escrita.'
      },
      recomendacoes: [
        'Implemente a regra de ouro dos 10 segundos: conte mentalmente respirando pelo diafragma antes de emitir qualquer resposta tensa.',
        'Pratique atividade física regular como válvula essencial de descompressão hormonal do estresse acumulado.',
        'Identifique o primeiro sinal físico da raiva (calor no peito, punhos cerrados) e utilize-o como comando mental para desacelerar.'
      ],
      perguntaReflexao: 'Qual preço você tem pago em seus relacionamentos pessoais e profissionais quando permite que a impulsividade assuma o controle?'
    },
    'Baixo': {
      oQueSugere: 'O resultado sugere que, embora você consiga manter a calma em cenários familiares, sua estabilidade emocional oscila sensivelmente sob pressão prolongada ou quando contrariado. Pode levar tempo considerável para recuperar o equilíbrio após um desentendimento.',
      oQuePreservar: [
        'O esforço consciente para não descarregar frustrações em quem não tem relação com o problema.',
        'A capacidade de reconhecer excessos após o momento de exaltação ter passado.'
      ],
      oQueDesenvolver: [
        'Velocidade de recuperação emocional (resiliência ativa pós-crise).',
        'Capacidade de separar fatos objetivos de interpretações dramáticas geradas pela raiva.',
        'Flexibilidade para buscar planos alternativos quando as coisas não saem como planejado.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Evitar discutir assuntos financeiros ou de convivência no final de dias exaustivos.',
        profissional: 'Quando um projeto sofrer cancelamento ou mudança brusca, focar as próximas ações imediatas em vez de ruminar o ocorrido.'
      },
      recomendacoes: [
        'Desenvolva um ritual de transição pós-estresse (caminhada curta, lavar o rosto com água fria, escutar música relaxante).',
        'Adote o exercício mental de se perguntar: "isso terá a mesma gravidade daqui a um ano?".',
        'Treine a postergação intencional de decisões cruciais para períodos em que o humor esteja neutro e descansado.'
      ],
      perguntaReflexao: 'O que você costuma fazer que ajuda a prolongar seu estado de irritação em vez de acelerar o seu restabelecimento?'
    },
    'Em desenvolvimento': {
      oQueSugere: 'O resultado aponta para um equilíbrio emocional em fase madura de consolidação. Na maioria das circunstâncias normais de pressão você consegue conter impulsos e agir com civilidade, mas situações muito inesperadas ou de provocação pessoal ainda testam seus limites.',
      oQuePreservar: [
        'O autocontrole já demonstrado em reuniões e conversas de trabalho rotineiras.',
        'A habilidade de reorientar a atenção para a resolução do problema após o primeiro impacto.'
      ],
      oQueDesenvolver: [
        'Blindagem contra contágio emocional em ambientes com clima pesado ou negativista.',
        'Regulação emocional interna profunda, sem apenas reprimir a raiva para fora (evitando somatização).',
        'Capacidade de adaptar o tom de voz e o ritmo corporal no auge de divergências de opinião.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Manter a serenidade durante birras de filhos ou cobranças de familiares com base na escuta paciente.',
        profissional: 'Mediar discussões entre colegas de equipe sem tomar partidos emocionais nem demonstrar irritação visível.'
      },
      recomendacoes: [
        'Pratique a técnica da "terceira pessoa": descreva a situação estressante mentalmente como se você fosse um observador neutro.',
        'Identifique válvulas de escape saudáveis para processar sentimentos represados ao longo da semana.',
        'Substitua a repressão pela modulação: expresse o descontentamento de forma firme, porém serena e respeitosa.'
      ],
      perguntaReflexao: 'Qual ambiente ou tipo de comportamento alheio ainda tem o poder de derrubar a sua calma com maior facilidade?'
    },
    'Alto': {
      oQueSugere: 'O resultado reflete sólida competência de gestão emocional. Você preserva a clareza de raciocínio sob pressão, administra frustrações com maturidade e tem facilidade para retomar o centro após atritos, agindo como elemento apaziguador e lúcido no ambiente.',
      oQuePreservar: [
        'A presença serena diante de crises e a capacidade de acalmar pessoas ao seu redor.',
        'A disciplina em adiar respostas quando os ânimos estão exaltados.'
      ],
      oQueDesenvolver: [
        'Atenção para que a compostura aparente não impeça a expressão de sentimentos autênticos e limites necessários.',
        'Compreensão com pessoas que possuem menor capacidade autorregulatória, evitando julgamentos severos.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Ser um suporte seguro e equilibrado para a família em momentos de luto, perda ou incerteza financeira.',
        profissional: 'Conduzir crises operacionais e prazos apertados transmitindo confiança e clareza de prioridades aos liderados.'
      },
      recomendacoes: [
        'Valide suas emoções em espaços seguros para não acumular uma carga invisível de autocontrole.',
        'Ajude sua equipe a estruturar protocolos de gestão de estresse em períodos de alta demanda.',
        'Use sua estabilidade como catalisador de inovação e solução colaborativa de conflitos.'
      ],
      perguntaReflexao: 'Sua serenidade sob pressão nasce de um equilíbrio interior genuíno ou de um esforço excessivo para não decepcionar os outros?'
    },
    'Muito alto': {
      oQueSugere: 'O resultado indica um autocontrole e equilíbrio emocional percebidos em grau excepcional. Você lida com volatilidade e contratempos com serenidade admirável, reorienta planos rapidamente sem perder a compostura e recupera seu centramento com extraordinária velocidade.',
      oQuePreservar: [
        'O domínio exemplar sobre as próprias reações mesmo sob provocações diretas.',
        'A clareza estratégica preservada nos momentos mais agudos de incerteza.'
      ],
      oQueDesenvolver: [
        'Evitar parecer indiferente, distante ou frio perante o sofrimento e a ansiedade dos outros.',
        'Permitir-se expressar vulnerabilidade e pedir apoio quando o peso também estiver excessivo para você.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Gerenciar conflitos familiares profundos com sabedoria, promovendo o perdão e o diálogo pacífico.',
        profissional: 'Comandar posições de alta responsabilidade executiva ou gestão de incidentes críticos com tranquilidade inabalável.'
      },
      recomendacoes: [
        'Demonstre calor humano e acolhimento explícito, para que a sua firmeza não soe como frieza emocional.',
        'Compartilhe deliberadamente suas práticas de regulação emocional com novos profissionais e líderes em formação.',
        'Esteja atento para não assumir a carga emocional alheia apenas porque você é capaz de suportá-la.'
      ],
      perguntaReflexao: 'De que maneira você pode equilibrar sua serenidade inabalável com a expressão autêntica de afeto e proximidade humana?'
    }
  },

  // ==========================================
  // DIMENSÃO 3: AUTOMOTIVAÇÃO (Jornada ao Horizonte)
  // ==========================================
  automotivacao: {
    'Muito baixo': {
      oQueSugere: 'O resultado sugere dependência pronunciada de incentivos externos, cobranças ou prazos emergenciais para agir. Há tendência a paralisar diante de obstáculos, adiar tarefas complexas por falta de disposição imediata e desanimar rapidamente perante erros.',
      oQuePreservar: [
        'A capacidade de reconhecer quando a energia está baixa sem tentar forçar artificialmente.',
        'O respeito aos próprios limites de estafa e descanso.'
      ],
      oQueDesenvolver: [
        'Autodisciplina baseada em micro-hábitos e não na dependência de "inspiração" passageira.',
        'Capacidade de quebrar metas grandes em etapas menores e imediatamente executáveis.',
        'Construção de senso de propósito interno independente de elogios ou supervisão externa.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Iniciar uma rotina de autocuidado comprometendo-se com apenas 10 minutos diários em vez de metas inatingíveis.',
        profissional: 'Adotar a técnica Pomodoro (25 minutos de foco total sem celular) para avançar nas tarefas que geram resistência.'
      },
      recomendacoes: [
        'Associe cada tarefa difícil a um ganho futuro concreto que faça sentido pessoal para você.',
        'Elimine as três principais fontes de distração no seu espaço de trabalho durante a primeira hora da manhã.',
        'Comemore pequenas vitórias diárias para estimular a dopamina ligada ao progresso contínuo.'
      ],
      perguntaReflexao: 'O que você deixaria de adiar hoje se tivesse a certeza de que a disciplina supera qualquer falta passageira de vontade?'
    },
    'Baixo': {
      oQueSugere: 'O resultado indica que sua motivação oscila substancialmente em função do humor do dia ou do retorno imediato que recebe. Quando encontra barreiras iniciais, a tendência à procrastinação ou desânimo pode comprometer o fechamento de metas importantes.',
      oQuePreservar: [
        'O entusiasmo genuíno que surge quando um projeto desperta seu interesse pessoal.',
        'A busca por significado no que se propõe a realizar.'
      ],
      oQueDesenvolver: [
        'Tolerância ao esforço monótono que sustenta o sucesso no longo prazo.',
        'Visão de longo alcance para aceitar adiar confortos instantâneos por conquistas consistentes.',
        'Resiliência para tratar erros como feedback técnico e não como atestado de incompetência.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Manter a constância em planos de médio prazo (estudos, finanças) mesmo quando o progresso não for visível a cada semana.',
        profissional: 'Entregar entregáveis com qualidade até o fim, resistindo à tentação de afrouxar o ritmo na reta final do projeto.'
      },
      recomendacoes: [
        'Defina a "prioridade inegociável do dia" na véspera e execute-a antes de abrir redes sociais ou caixas de entrada.',
        'Crie um painel visual simples com seus objetivos centrais para o trimestre.',
        'Procure um parceiro de prestação de contas (accountability buddy) para compartilhar compromissos semanais.'
      ],
      perguntaReflexao: 'Quais desculpas você tem contado a si mesmo para justificar abandonar objetivos relevantes no primeiro sinal de dificuldade?'
    },
    'Em desenvolvimento': {
      oQueSugere: 'O resultado indica uma automotivação consistente na maioria das situações cotidianas. Você tem iniciativa própria, cumpre prazos e consegue focar no trabalho mesmo sem cobrança externa constante, embora contratempos severos ou projetos muito longos ainda demandem esforço extra para sustentar o ânimo.',
      oQuePreservar: [
        'A capacidade de persistir em objetivos mesmo após semanas desgastantes.',
        'A atitude de buscar aprendizado com os percalços ao invés de buscar culpados.'
      ],
      oQueDesenvolver: [
        'Capacidade de manter a clareza de visão mesmo em períodos de seca de resultados.',
        'Estabelecimento de metas pessoais autodesafiadoras que tirem você da zona de conforto seguro.',
        'Proteção contra esgotamento, dosando a energia para uma maratona e não para um sprint.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Retomar com determinação projetos autorais ou hábitos saudáveis após uma semana de imprevistos.',
        profissional: 'Liderar a execução de entregas mesmo quando a equipe ou o cliente demorarem a responder, mantendo o ritmo.'
      },
      recomendacoes: [
        'Revise trimestralmente seu alinhamento entre as tarefas do cotidiano e seus objetivos de carreira de 3 anos.',
        'Treine o reenquadramento: em vez de pensar "preciso fazer isso", formule "escolho fazer isso porque valorizo o resultado".',
        'Incorpore desafios voluntários incrementais que ampliem sua autoconfiança realizadora.'
      ],
      perguntaReflexao: 'Qual objetivo relevante para sua vida está adormecido simplesmente porque exige um esforço contínuo sem recompensa imediata?'
    },
    'Alto': {
      oQueSugere: 'O resultado reflete alta automotivação percebida. Você é proativo, tem foco afiado em resultados, persiste com determinação perante reveses e mantém uma postura otimista orientada para soluções, impulsionando a si mesmo e contagiando o ambiente ao redor.',
      oQuePreservar: [
        'A iniciativa autônoma e a persistência obstinada na busca de soluções.',
        'A disciplina com que lida com o adiamento de gratificações em prol de objetivos estratégicos.'
      ],
      oQueDesenvolver: [
        'Cuidado com a impaciência em relação a pessoas que possuem ritmo de execução mais compassado.',
        'Atenção para não ignorar sinais de cansaço corporal sob pretexto de foco inabalável.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Conquistar metas de desenvolvimento físico, financeiro ou acadêmico com autonomia admirável.',
        profissional: 'Assumir projetos ambíguos do zero e transformá-los em entregas concretas sem precisar de supervisão.'
      },
      recomendacoes: [
        'Pratique o repouso ativo planejado, tratando a recuperação como parte essencial da alta performance sustentável.',
        'Adapte sua linguagem para engajar colegas sem fazê-los sentir cobrança sufocante.',
        'Ajude a criar ambientes que favoreçam a autonomia e a motivação intrínseca das outras pessoas.'
      ],
      perguntaReflexao: 'A sua dedicação apaixonada às metas está deixando espaço suficiente para celebrar o presente e cultivar suas relações?'
    },
    'Muito alto': {
      oQueSugere: 'O resultado evidencia uma força motriz interna extraordinária. Sua capacidade de iniciativa, foco inabalável e resiliência diante de adversidades é um diferencial marcante. Você encontra significado e aprendizado contínuo até nos piores cenários, renovando constantemente suas metas.',
      oQuePreservar: [
        'A inesgotável energia propositiva e a crença fundada no potencial de superação.',
        'A integridade ética ao perseguir metas mesmo em conjunturas desfavoráveis.'
      ],
      oQueDesenvolver: [
        'Flexibilidade para saber quando recalibrar ou descontinuar uma meta que perdeu o sentido real.',
        'Empatia com as vulnerabilidades alheias, sem impor aos outros sua própria régua de exigência.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Inspirar familiares e amigos por meio do exemplo vivido de superação e perseverança generosa.',
        profissional: 'Empreender iniciativas pioneiras, transformar times desmotivados e liderar jornadas de virada estratégica.'
      },
      recomendacoes: [
        'Estabeleça auditorias periódicas de propósito para garantir que sua energia não esteja sendo gasta em causas estéreis.',
        'Treine o desapego saudável da necessidade de estar sempre no ápice da produtividade.',
        'Transmita metodologias de foco e resiliência para novas gerações de talentos.'
      ],
      perguntaReflexao: 'Como utilizar sua excepcional energia realizadora não apenas para bater metas, mas para construir legados humanos duradouros?'
    }
  },

  // ==========================================
  // DIMENSÃO 4: EMPATIA (Ponte entre Perspectivas)
  // ==========================================
  empatia: {
    'Muito baixo': {
      oQueSugere: 'O resultado sugere tendência a interpretar o mundo quase que exclusivamente a partir das próprias necessidades e referenciais lógicos. Há dificuldade em captar sinais não verbais de desconforto nos outros e em compreender pontos de vista divergentes dos seus.',
      oQuePreservar: [
        'A objetividade e a objetiva capacidade analítica na análise de problemas.',
        'A franqueza e a clareza quanto aos seus próprios posicionamentos.'
      ],
      oQueDesenvolver: [
        'Escuta atenta e silenciosa antes de tirar conclusões precipitadas sobre o outro.',
        'Sensibilidade para ler microexpressões, linguagem corporal e variações no tom de voz.',
        'Reconhecimento de que lógicas e dores alheias são legítimas, mesmo quando você não concorda com elas.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Quando alguém desabafar com você, segurar o impulso de dar conselhos imediatos e apenas acolher: "entendo que isso está difícil para você".',
        profissional: 'Antes de apresentar uma proposta ou cobrar um colega, refletir: "quais são as pressões que essa pessoa está enfrentando hoje?".'
      },
      recomendacoes: [
        'Pratique a pergunta empática: "como você está se sentindo em relação a isso?" e ouça sem contestar.',
        'Ao divergir de alguém, tente resumir a tese da pessoa com honestidade antes de contra-argumentar.',
        'Observe a reação das pessoas ao redor quando você expressa opiniões incisivas.'
      ],
      perguntaReflexao: 'Quantas oportunidades de conexão e cooperação você pode ter perdido por julgar antes de procurar verdadeiramente compreender?'
    },
    'Baixo': {
      oQueSugere: 'O resultado sugere que você demonstra sensibilidade pontual com pessoas muito próximas ou em situações de sofrimento explícito, mas no ritmo dinâmico do cotidiano tende a ignorar as necessidades e estados emocionais de colegas e pares.',
      oQuePreservar: [
        'A lealdade e consideração pelas pessoas do seu círculo mais íntimo.',
        'A honestidade ao não simular interesse forçado ou superficial.'
      ],
      oQueDesenvolver: [
        'Curiosidade genuína pelas motivações e sentimentos de pessoas que pensam diferente de você.',
        'Percepção do impacto emocional que suas palavras ou atitudes causam no ambiente ao redor.',
        'Disposição para oferecer apoio proativo antes que a pessoa precise pedir explicitamente.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Notar o cansaço ou silêncio diferente de familiares e abrir espaço amoroso para conversa sem cobrança.',
        profissional: 'Validar o esforço de membros da equipe em vez de apontar exclusivamente erros técnicos de execução.'
      },
      recomendacoes: [
        'Durante conversas importantes, dedique 70% do tempo para ouvir e apenas 30% para falar.',
        'Observe três pessoas durante o dia e tente inferir o estado de espírito delas a partir da postura corporal.',
        'Antes de enviar feedbacks críticos, revise o tom para assegurar firmeza sem agressividade desnecessária.'
      ],
      perguntaReflexao: 'O que o impede de se colocar genuinamente no lugar de pessoas cujas escolhas e atitudes você desaprova?'
    },
    'Em desenvolvimento': {
      oQueSugere: 'O resultado aponta para uma capacidade empática sólida e em evolução. Você se preocupa com os sentimentos alheios, busca escutar antes de julgar e compreende a legitimidade de diferentes perspectivas, embora sob pressa ou pressão possa recorrer a soluções puramente pragmáticas.',
      oQuePreservar: [
        'A postura acolhedora e o respeito demonstrado em diálogos construtivos.',
        'A habilidade de reconhecer quando feriu involuntariamente alguém e desculpar-se com sinceridade.'
      ],
      oQueDesenvolver: [
        'Empatia perspectiva profunda: compreender não só o que o outro sente, mas como a história dele molda a visão de mundo.',
        'Sintonia com dinâmicas grupais não faladas (clima da sala, tensões veladas).',
        'Equilíbrio entre acolhimento empático e preservação dos seus próprios limites emocionais.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Ajudar amigos a clarear os próprios sentimentos atuando como um ouvinte atento e sem julgamentos.',
        profissional: 'Antecipar possíveis resistências a mudanças organizacionais entendendo as inseguranças legítimas dos colaboradores.'
      },
      recomendacoes: [
        'Pratique a paráfrase empática: "se entendi direito, o que mais preocupa você nessa situação é X, correto?".',
        'Exercite o olhar compassivo com quem erra na rotina diária.',
        'Proteja-se da "fadiga por compaixão", mantendo fronteiras claras entre apoiar o outro e carregar a dor do outro.'
      ],
      perguntaReflexao: 'Em quais momentos a sua pressa por resolver problemas práticos atropela a necessidade do outro de ser apenas ouvido?'
    },
    'Alto': {
      oQueSugere: 'O resultado reflete alta competência empática percebida. Você sintoniza com facilidade os estados emocionais dos outros, capta nuances não ditas, acolhe perspectivas divergentes com naturalidade e é frequentemente buscado por pessoas que desejam ser compreendidas e respeitadas.',
      oQuePreservar: [
        'A sensibilidade humana refinada e a capacidade de fazer os outros se sentirem valorizados.',
        'O respeito autêntico pelas diferenças de perfil, estilo e visão de vida.'
      ],
      oQueDesenvolver: [
        'Cuidado com a sobrecarga emocional decorrente de absorver as dores e ansiedades do entorno.',
        'Capacidade de tomar decisões difíceis (como demissões ou limites) sem paralisar pela dor que elas causam.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Construir pontes afetivas profundas e reconciliar desavenças familiares com afeto e imparcialidade.',
        profissional: 'Criar ambientes de alta segurança psicológica onde as pessoas ousam inovar e expressar dúvidas sem medo.'
      },
      recomendacoes: [
        'Desenvolva rituais de limpeza mental após conversas de alto desgaste emocional.',
        'Lembre-se de que empatia não significa concordância cega nem condescendência com desempenhos ruins.',
        'Use sua leitura dos outros para inspirar acordos onde todas as partes sintam suas necessidades atendidas.'
      ],
      perguntaReflexao: 'Você tem oferecido a si mesmo o mesmo grau de compaixão, cuidado e acolhimento que dispensa com tanta generosidade aos outros?'
    },
    'Muito alto': {
      oQueSugere: 'O resultado indica uma sensibilidade empática extraordinária. Você possui um radar apurado para estados emocionais alheios, compreende profundamente as motivações complexas dos comportamentos humanos e atua como catalisador de acolhimento e compreensão mútua onde quer que esteja.',
      oQuePreservar: [
        'A capacidade ímpar de criar confiança e intimidade psicológica em poucos minutos de diálogo.',
        'A visão compassiva e humanizadora dos processos organizacionais e sociais.'
      ],
      oQueDesenvolver: [
        'Estabelecimento firme de fronteiras para não transformar sua empatia em autossacrifício sistemático.',
        'Distinção lúcida entre ajudar alguém a crescer e assumir a responsabilidade pelas consequências das escolhas do outro.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Fortalecer relacionamentos para a vida inteira baseados em intimidade emocional autêntica e respeito mútuo.',
        profissional: 'Atuar como mediador em disputas corporativas de alta complexidade e desenhar soluções centradas em pessoas.'
      },
      recomendacoes: [
        'Reserve períodos regulares de solitude para recarregar suas baterias emocionais.',
        'Treine a "empatia compassiva e assertiva": manter o coração aberto e a espinha ereta.',
        'Ensine líderes a praticarem a escuta ativa como ferramenta de governança e cultura.'
      ],
      perguntaReflexao: 'Como preservar a pureza da sua ponte de empatia sem permitir que ela seja usada como caminho para a invasão dos seus próprios limites?'
    }
  },

  // ==========================================
  // DIMENSÃO 5: HABILIDADES SOCIAIS (Rede de Conexões)
  // ==========================================
  habilidades_sociais: {
    'Muito baixo': {
      oQueSugere: 'O resultado sugere barreiras importantes na comunicação interpessoal, na gestão de divergências e na construção de redes de cooperação. Há tendência ao isolamento, atritos frequentes ou dificuldade para mobilizar outras pessoas em torno de metas comuns.',
      oQuePreservar: [
        'A independência de pensamento e a autonomia técnica em tarefas individuais.',
        'A aversão à bajulação e à artificialidade nas relações.'
      ],
      oQueDesenvolver: [
        'Comunicação clara, respeitosa e adaptada ao receptor, evitando aspereza involuntária.',
        'Postura de escuta aberta, contendo o impulso de interromper ou contrapor imediatamente.',
        'Capacidade de acolher e fornecer feedbacks de maneira construtiva, sem destruir a relação.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Em conversas de família, esperar o outro terminar o raciocínio completo antes de responder.',
        profissional: 'Em reuniões, substituir frases como "você está errado" por "tenho uma perspectiva diferente que gostaria de compartilhar".'
      },
      recomendacoes: [
        'Treine técnicas básicas de Comunicação Não Violenta (fatos, sentimentos, necessidades e pedidos claros).',
        'Busque cooperar ativamente em pelo menos uma atividade coletiva por semana sem tentar liderá-la.',
        'Ao receber um feedback negativo, agradeça a sinceridade antes de defender seu ponto.'
      ],
      perguntaReflexao: 'O que suas interações com as pessoas poderiam ganhar se você dedicasse tanta energia a construir pontes quanto dedica a defender suas razões?'
    },
    'Baixo': {
      oQueSugere: 'O resultado sugere que suas relações funcionam bem em ambientes controlados e com pessoas de temperamento similar, mas enfrentam atrito ao lidar com perfis diversos ou negociar soluções em situações de tensão. A resolução de desentendimentos pode ser evitada ou gerar desgastes duradouros.',
      oQuePreservar: [
        'A capacidade de sustentar relações sólidas com grupos de confiança comprovada.',
        'A dedicação a entregas de qualidade que falam por si.'
      ],
      oQueDesenvolver: [
        'Flexibilidade estilística para conversar com perfis de personalidades variadas.',
        'Habilidade de abordar conversas difíceis sem adiamento indefinido.',
        'Participação ativa na criação de ambientes de confiança nos times dos quais participa.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Propor acordos claros de convivência para evitar atritos repetitivos com amigos ou parceiros.',
        profissional: 'Fazer alinhamentos periódicos de expectativas com clientes e líderes para evitar surpresas desagradáveis.'
      },
      recomendacoes: [
        'Aprenda a reconhecer os 4 estilos sociais básicos (analítico, condutor, expressivo e amável) e ajuste seu discurso.',
        'Quando surgir um mal-entendido, priorize uma conversa ao vivo ou por vídeo em vez de mensagens de texto truncadas.',
        'Incentive elogios explícitos ao trabalho bem feito de colegas de equipe.'
      ],
      perguntaReflexao: 'Quais conversas difíceis você vem evitando e qual é o custo dessa omissão para os seus relacionamentos e projetos?'
    },
    'Em desenvolvimento': {
      oQueSugere: 'O resultado reflete competências sociais consolidadas para a rotina diária. Você se expressa de maneira adequada, consegue cooperar com times multifuncionais e busca o diálogo para solucionar atritos, embora a mobilização de pessoas em contextos desafiadores ou a condução de feedbacks complexos ainda exija esforço considerável.',
      oQuePreservar: [
        'A civilidade, o bom relacionamento geral e a busca sincera por soluções compartilhadas.',
        'A habilidade de integrar equipes com colaboração e boa vontade.'
      ],
      oQueDesenvolver: [
        'Poder de influência e persuasão baseado em valores e visão compartilhada, não apenas autoridade.',
        'Mediação construtiva de conflitos entre terceiros.',
        'Refinamento do feedback corretivo, transformando momentos difíceis em impulsos de crescimento mútuo.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Atuar como facilitador pacífico em desavenças de grupos de amigos ou familiares.',
        profissional: 'Articular alinhamentos entre setores com interesses concorrentes, construindo saídas ganha-ganha.'
      },
      recomendacoes: [
        'Utilize a técnica do feedback estruturado (Situação, Comportamento, Impacto e Próximos Passos).',
        'Treine a escuta ativa repetindo com suas palavras o cerne da fala do outro antes de contrapor.',
        'Amplie ativamente sua rede de contatos profissionais com postura de generosidade e curiosidade genuína.'
      ],
      perguntaReflexao: 'Como elevar a sua comunicação do nível da mera cordialidade para o patamar da verdadeira influência e inspiração?'
    },
    'Alto': {
      oQueSugere: 'O resultado reflete alta proficiência social percebida. Você se comunica com clareza e empatia, transita com naturalidade entre diferentes círculos sociais, administra conflitos com maturidade construtiva e contribui ativamente para atmosferas de confiança e cooperação produtiva.',
      oQuePreservar: [
        'A capacidade de mobilizar pessoas com entusiasmo e respeito genuíno.',
        'A destreza na condução de conversas delicadas sem romper laços de afeto e respeito.'
      ],
      oQueDesenvolver: [
        'Atenção para que a facilidade social não mascare a necessidade de aprofundamento ou posicionamentos firmes impopulares.',
        'Desenvolvimento de liderança servidora em níveis mais amplos e estratégicos.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Ser uma referência acolhedora e agregadora nos círculos de amigos e familiares.',
        profissional: 'Liderar times multidisciplinares integrando culturas diversas e mantendo elevado engajamento e sinergia.'
      },
      recomendacoes: [
        'Mantenha reuniões de alinhamento com foco em segurança psicológica e estímulo a vozes dissidentes.',
        'Pratique o networking bidirecional contínuo, gerando valor para pessoas sem esperar retribuição imediata.',
        'Sirva de mentor para profissionais técnicos que desejam desenvolver traquejo interpessoal e negociação.'
      ],
      perguntaReflexao: 'Como você pode utilizar sua facilidade de articulação para dar voz e espaço a quem tem maior dificuldade de se fazer ouvir?'
    },
    'Muito alto': {
      oQueSugere: 'O resultado evidencia habilidades sociais de liderança e relacionamento em grau notável. Você é hábil em construir laços sólidos com os mais variados perfis, domina a arte da comunicação persuasiva e respeitosa, transforma conflitos em alavancas de aprendizado e mobiliza coletivos com carisma e integridade.',
      oQuePreservar: [
        'O magnetismo ético e a capacidade de conectar pessoas em torno de propósitos nobres.',
        'A transparência constante, garantindo que o carisma seja sempre sustentado por consistência real de caráter.'
      ],
      oQueDesenvolver: [
        'Cuidado para não centralizar excessivamente as decisões ou tornar o grupo dependente da sua presença mediadora.',
        'Cultivo de espaço para momentos de recolhimento, evitando a exaustão pelo excesso de demandas sociais.'
      ],
      aplicacoesPraticas: {
        pessoal: 'Construir uma rede de amizades ricas e leais que oferecem suporte mútuo ao longo de toda a vida.',
        profissional: 'Conduzir grandes transformações culturais, alianças estratégicas e liderança de movimentos com alto impacto.'
      },
      recomendacoes: [
        'Empodere lideranças emergentes para que a rede social e a cooperação sobrevivam à sua presença direta.',
        'Utilize seu talento de oratória e diálogo para dissolver polarizações destrutivas.',
        'Assegure momentos protegidos de silêncio para manter a clareza dos seus próprios pensamentos.'
      ],
      perguntaReflexao: 'Qual é o impacto transformador mais profundo que a sua rede de conexões pode gerar para o mundo hoje?'
    }
  }
};
