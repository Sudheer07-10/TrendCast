// Translation system for TrendCast
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi' | 'ja';

export interface Translations {
  // App Navigation
  home: string;
  history: string;
  about: string;
  settings: string;
  logout: string;
  selectLanguage: string;
  
  // Login
  welcome: string;
  login: string;
  username: string;
  password: string;
  signIn: string;
  
  // Market Selection
  selectMarket: string;
  globalMarkets: string;
  performance: string;
  markets: string;
  
  // Stock List
  stocksIn: string;
  search: string;
  filterBy: string;
  all: string;
  buy: string;
  sell: string;
  hold: string;
  
  // Stock Detail
  prediction: string;
  confidence: string;
  confidenceLevel: string;
  highConfidence: string;
  mediumConfidence: string;
  lowConfidence: string;
  veryReliable: string;
  moderatelyReliable: string;
  lowerReliability: string;
  algorithmScore: string;
  marketSentiment: string;
  bullish: string;
  bearish: string;
  neutral: string;
  why: string;
  stockAlert: string;
  getNotifications: string;
  receiveAlerts: string;
  configureAlert: string;
  refresh: string;
  lastUpdated: string;
  justNow: string;
  updating: string;
  
  // Alert Configuration
  setAlert: string;
  horizon: string;
  hourly: string;
  daily: string;
  confidenceThreshold: string;
  enableAlert: string;
  alertSet: string;
  
  // History
  predictionHistory: string;
  last30Predictions: string;
  accurate: string;
  correct: string;
  incorrect: string;
  total: string;
  dateTime: string;
  stock: string;
  outcome: string;
  hitMiss: string;
  
  // About
  aboutTrendcast: string;
  mission: string;
  missionText: string;
  disclaimer: string;
  disclaimerText: string;
  
  // General
  back: string;
  save: string;
  cancel: string;
  loading: string;
  error: string;
  success: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // App Navigation
    home: 'Home',
    history: 'History',
    about: 'About',
    settings: 'Settings',
    logout: 'Sign Out',
    selectLanguage: 'Select Language',
    
    // Login
    welcome: 'Welcome to TrendCast',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    signIn: 'Sign In',
    
    // Market Selection
    selectMarket: 'Select Market',
    globalMarkets: 'Global Markets',
    performance: 'Performance',
    markets: 'markets',
    
    // Stock List
    stocksIn: 'Stocks in',
    search: 'Search stocks...',
    filterBy: 'Filter by',
    all: 'All',
    buy: 'BUY',
    sell: 'SELL',
    hold: 'HOLD',
    
    // Stock Detail
    prediction: 'Prediction',
    confidence: 'Confidence',
    confidenceLevel: 'Confidence Level',
    highConfidence: 'High',
    mediumConfidence: 'Medium',
    lowConfidence: 'Low',
    veryReliable: 'Very reliable prediction',
    moderatelyReliable: 'Moderately reliable prediction',
    lowerReliability: 'Lower reliability - proceed with caution',
    algorithmScore: 'Algorithm Score',
    marketSentiment: 'Market Sentiment',
    bullish: 'Bullish',
    bearish: 'Bearish',
    neutral: 'Neutral',
    why: 'Why?',
    stockAlert: 'Stock Alert',
    getNotifications: 'Get notifications for',
    receiveAlerts: 'Receive alerts when significant changes occur',
    configureAlert: 'Configure Alert Settings',
    refresh: 'Refresh',
    lastUpdated: 'Last Updated',
    justNow: 'Just now',
    updating: 'Updating...',
    
    // Alert Configuration
    setAlert: 'Set Alert',
    horizon: 'Horizon',
    hourly: 'Hourly',
    daily: 'Daily',
    confidenceThreshold: 'Confidence Threshold',
    enableAlert: 'Enable Alert',
    alertSet: 'Alert set successfully!',
    
    // History
    predictionHistory: 'Prediction History',
    last30Predictions: 'Last 30 predictions',
    accurate: 'accurate',
    correct: 'Correct',
    incorrect: 'Incorrect',
    total: 'Total',
    dateTime: 'Date/Time',
    stock: 'Stock',
    outcome: 'Actual Outcome',
    hitMiss: 'Hit/Miss',
    
    // About
    aboutTrendcast: 'About TrendCast',
    mission: 'Our Mission',
    missionText: 'Making stock predictions simple using quantum-powered signals.',
    disclaimer: 'Important Disclaimer',
    disclaimerText: 'This is a hackathon prototype. Not financial advice.',
    
    // General
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  
  es: {
    // App Navigation
    home: 'Inicio',
    history: 'Historial',
    about: 'Acerca de',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    selectLanguage: 'Seleccionar Idioma',
    
    // Login
    welcome: 'Bienvenido a TrendCast',
    login: 'Iniciar Sesión',
    username: 'Usuario',
    password: 'Contraseña',
    signIn: 'Entrar',
    
    // Market Selection
    selectMarket: 'Seleccionar Mercado',
    globalMarkets: 'Mercados Globales',
    performance: 'Rendimiento',
    markets: 'mercados',
    
    // Stock List
    stocksIn: 'Acciones en',
    search: 'Buscar acciones...',
    filterBy: 'Filtrar por',
    all: 'Todos',
    buy: 'COMPRAR',
    sell: 'VENDER',
    hold: 'MANTENER',
    
    // Stock Detail
    prediction: 'Predicción',
    confidence: 'Confianza',
    confidenceLevel: 'Nivel de Confianza',
    highConfidence: 'Alto',
    mediumConfidence: 'Medio',
    lowConfidence: 'Bajo',
    veryReliable: 'Predicción muy confiable',
    moderatelyReliable: 'Predicción moderadamente confiable',
    lowerReliability: 'Menor confiabilidad - proceder con precaución',
    algorithmScore: 'Puntuación del Algoritmo',
    marketSentiment: 'Sentimiento del Mercado',
    bullish: 'Alcista',
    bearish: 'Bajista',
    neutral: 'Neutral',
    why: '¿Por qué?',
    stockAlert: 'Alerta de Acción',
    getNotifications: 'Recibir notificaciones para',
    receiveAlerts: 'Recibir alertas cuando ocurran cambios significativos',
    configureAlert: 'Configurar Alertas',
    refresh: 'Actualizar',
    lastUpdated: 'Última Actualización',
    justNow: 'Ahora mismo',
    updating: 'Actualizando...',
    
    // Alert Configuration
    setAlert: 'Configurar Alerta',
    horizon: 'Horizonte',
    hourly: 'Por Hora',
    daily: 'Diario',
    confidenceThreshold: 'Umbral de Confianza',
    enableAlert: 'Habilitar Alerta',
    alertSet: '¡Alerta configurada exitosamente!',
    
    // History
    predictionHistory: 'Historial de Predicciones',
    last30Predictions: 'Últimas 30 predicciones',
    accurate: 'precisas',
    correct: 'Correctas',
    incorrect: 'Incorrectas',
    total: 'Total',
    dateTime: 'Fecha/Hora',
    stock: 'Acción',
    outcome: 'Resultado Real',
    hitMiss: 'Acierto/Fallo',
    
    // About
    aboutTrendcast: 'Acerca de TrendCast',
    mission: 'Nuestra Misión',
    missionText: 'Simplificar las predicciones bursátiles usando señales cuánticas.',
    disclaimer: 'Descargo de Responsabilidad',
    disclaimerText: 'Este es un prototipo de hackathon. No es asesoramiento financiero.',
    
    // General
    back: 'Volver',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito'
  },
  
  fr: {
    // App Navigation
    home: 'Accueil',
    history: 'Historique',
    about: 'À propos',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    selectLanguage: 'Sélectionner la Langue',
    
    // Login
    welcome: 'Bienvenue sur TrendCast',
    login: 'Connexion',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    
    // Market Selection
    selectMarket: 'Sélectionner le Marché',
    globalMarkets: 'Marchés Mondiaux',
    performance: 'Performance',
    markets: 'marchés',
    
    // Stock List
    stocksIn: 'Actions en',
    search: 'Rechercher des actions...',
    filterBy: 'Filtrer par',
    all: 'Tous',
    buy: 'ACHETER',
    sell: 'VENDRE',
    hold: 'CONSERVER',
    
    // Stock Detail
    prediction: 'Prédiction',
    confidence: 'Confiance',
    confidenceLevel: 'Niveau de Confiance',
    highConfidence: 'Élevé',
    mediumConfidence: 'Moyen',
    lowConfidence: 'Faible',
    veryReliable: 'Prédiction très fiable',
    moderatelyReliable: 'Prédiction modérément fiable',
    lowerReliability: 'Fiabilité plus faible - procéder avec prudence',
    algorithmScore: 'Score de l\'Algorithme',
    marketSentiment: 'Sentiment du Marché',
    bullish: 'Haussier',
    bearish: 'Baissier',
    neutral: 'Neutre',
    why: 'Pourquoi ?',
    stockAlert: 'Alerte d\'Action',
    getNotifications: 'Recevoir des notifications pour',
    receiveAlerts: 'Recevoir des alertes lors de changements significatifs',
    configureAlert: 'Configurer les Alertes',
    refresh: 'Actualiser',
    lastUpdated: 'Dernière Mise à Jour',
    justNow: 'À l\'instant',
    updating: 'Mise à jour...',
    
    // Alert Configuration
    setAlert: 'Définir une Alerte',
    horizon: 'Horizon',
    hourly: 'Horaire',
    daily: 'Quotidien',
    confidenceThreshold: 'Seuil de Confiance',
    enableAlert: 'Activer l\'Alerte',
    alertSet: 'Alerte définie avec succès !',
    
    // History
    predictionHistory: 'Historique des Prédictions',
    last30Predictions: '30 dernières prédictions',
    accurate: 'précises',
    correct: 'Correctes',
    incorrect: 'Incorrectes',
    total: 'Total',
    dateTime: 'Date/Heure',
    stock: 'Action',
    outcome: 'Résultat Réel',
    hitMiss: 'Réussite/Échec',
    
    // About
    aboutTrendcast: 'À propos de TrendCast',
    mission: 'Notre Mission',
    missionText: 'Simplifier les prédictions boursières avec des signaux quantiques.',
    disclaimer: 'Avertissement Important',
    disclaimerText: 'Ceci est un prototype de hackathon. Pas de conseil financier.',
    
    // General
    back: 'Retour',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès'
  },
  
  de: {
    // App Navigation
    home: 'Startseite',
    history: 'Verlauf',
    about: 'Über uns',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    selectLanguage: 'Sprache Auswählen',
    
    // Login
    welcome: 'Willkommen bei TrendCast',
    login: 'Anmelden',
    username: 'Benutzername',
    password: 'Passwort',
    signIn: 'Einloggen',
    
    // Market Selection
    selectMarket: 'Markt auswählen',
    globalMarkets: 'Globale Märkte',
    performance: 'Leistung',
    markets: 'Märkte',
    
    // Stock List
    stocksIn: 'Aktien in',
    search: 'Aktien suchen...',
    filterBy: 'Filtern nach',
    all: 'Alle',
    buy: 'KAUFEN',
    sell: 'VERKAUFEN',
    hold: 'HALTEN',
    
    // Stock Detail
    prediction: 'Vorhersage',
    confidence: 'Vertrauen',
    confidenceLevel: 'Vertrauensniveau',
    highConfidence: 'Hoch',
    mediumConfidence: 'Mittel',
    lowConfidence: 'Niedrig',
    veryReliable: 'Sehr zuverlässige Vorhersage',
    moderatelyReliable: 'Mäßig zuverlässige Vorhersage',
    lowerReliability: 'Geringere Zuverlässigkeit - mit Vorsicht vorgehen',
    algorithmScore: 'Algorithmus-Score',
    marketSentiment: 'Marktstimmung',
    bullish: 'Bullisch',
    bearish: 'Bärisch',
    neutral: 'Neutral',
    why: 'Warum?',
    stockAlert: 'Aktienalarm',
    getNotifications: 'Benachrichtigungen erhalten für',
    receiveAlerts: 'Benachrichtigungen bei bedeutenden Änderungen erhalten',
    configureAlert: 'Alarm konfigurieren',
    refresh: 'Aktualisieren',
    lastUpdated: 'Zuletzt aktualisiert',
    justNow: 'Gerade eben',
    updating: 'Wird aktualisiert...',
    
    // Alert Configuration
    setAlert: 'Alarm einstellen',
    horizon: 'Zeitraum',
    hourly: 'Stündlich',
    daily: 'Täglich',
    confidenceThreshold: 'Vertrauensschwelle',
    enableAlert: 'Alarm aktivieren',
    alertSet: 'Alarm erfolgreich eingestellt!',
    
    // History
    predictionHistory: 'Vorhersageverlauf',
    last30Predictions: 'Letzte 30 Vorhersagen',
    accurate: 'genau',
    correct: 'Richtig',
    incorrect: 'Falsch',
    total: 'Gesamt',
    dateTime: 'Datum/Zeit',
    stock: 'Aktie',
    outcome: 'Tatsächliches Ergebnis',
    hitMiss: 'Treffer/Fehlschlag',
    
    // About
    aboutTrendcast: 'Über TrendCast',
    mission: 'Unsere Mission',
    missionText: 'Aktienvorhersagen mit quantenbasierten Signalen vereinfachen.',
    disclaimer: 'Wichtiger Haftungsausschluss',
    disclaimerText: 'Dies ist ein Hackathon-Prototyp. Keine Finanzberatung.',
    
    // General
    back: 'Zurück',
    save: 'Speichern',
    cancel: 'Abbrechen',
    loading: 'Wird geladen...',
    error: 'Fehler',
    success: 'Erfolg'
  },
  
  zh: {
    // App Navigation
    home: '首页',
    history: '历史',
    about: '关于',
    settings: '设置',
    logout: '退出登录',
    selectLanguage: '选择语言',
    
    // Login
    welcome: '欢迎使用 TrendCast',
    login: '登录',
    username: '用户名',
    password: '密码',
    signIn: '登录',
    
    // Market Selection
    selectMarket: '选择市场',
    globalMarkets: '全球市场',
    performance: '表现',
    markets: '市场',
    
    // Stock List
    stocksIn: '股票在',
    search: '搜索股票...',
    filterBy: '筛选',
    all: '全部',
    buy: '买入',
    sell: '卖出',
    hold: '持有',
    
    // Stock Detail
    prediction: '预测',
    confidence: '置信度',
    confidenceLevel: '置信度水平',
    highConfidence: '高',
    mediumConfidence: '中',
    lowConfidence: '低',
    veryReliable: '非常可靠的预测',
    moderatelyReliable: '中等可靠的预测',
    lowerReliability: '可靠性较低 - 请谨慎操作',
    algorithmScore: '算法评分',
    marketSentiment: '市场情绪',
    bullish: '看涨',
    bearish: '看跌',
    neutral: '中性',
    why: '为什么？',
    stockAlert: '股票提醒',
    getNotifications: '获取通知',
    receiveAlerts: '在发生重大变化时接收提醒',
    configureAlert: '配置提醒设置',
    refresh: '刷新',
    lastUpdated: '最后更新',
    justNow: '刚刚',
    updating: '更新中...',
    
    // Alert Configuration
    setAlert: '设置提醒',
    horizon: '时间范围',
    hourly: '每小时',
    daily: '每日',
    confidenceThreshold: '置信度阈值',
    enableAlert: '启用提醒',
    alertSet: '提醒设置成功！',
    
    // History
    predictionHistory: '预测历史',
    last30Predictions: '最近30次预测',
    accurate: '准确',
    correct: '正确',
    incorrect: '错误',
    total: '总计',
    dateTime: '日期/时间',
    stock: '股票',
    outcome: '实际结果',
    hitMiss: '命中/失误',
    
    // About
    aboutTrendcast: '关于 TrendCast',
    mission: '我们的使命',
    missionText: '使用量子动力信号简化股票预测。',
    disclaimer: '重要免责声明',
    disclaimerText: '这是一个黑客马拉松原型。不是财务建议。',
    
    // General
    back: '返回',
    save: '保存',
    cancel: '取消',
    loading: '加载中...',
    error: '错误',
    success: '成功'
  },
  
  hi: {
    // App Navigation
    home: 'होम',
    history: 'इतिहास',
    about: 'हमारे बारे में',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    selectLanguage: 'भाषा चुनें',
    
    // Login
    welcome: 'TrendCast में आपका स्वागत है',
    login: 'लॉगिन',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    
    // Market Selection
    selectMarket: 'बाजार चुनें',
    globalMarkets: 'वैश्विक बाजार',
    performance: 'प्रदर्शन',
    markets: 'बाजार',
    
    // Stock List
    stocksIn: 'स्टॉक्स',
    search: 'स्टॉक खोजें...',
    filterBy: 'फ़िल्टर करें',
    all: 'सभी',
    buy: 'खरीदें',
    sell: 'बेचें',
    hold: 'होल्ड',
    
    // Stock Detail
    prediction: 'भविष्यवाणी',
    confidence: 'विश्वास',
    confidenceLevel: 'विश्वास स्तर',
    highConfidence: 'उच्च',
    mediumConfidence: 'मध्यम',
    lowConfidence: 'कम',
    veryReliable: 'बहुत विश्वसनीय भविष्यवाणी',
    moderatelyReliable: 'मध्यम विश्वसनीय भविष्यवाणी',
    lowerReliability: 'कम विश्वसनीयता - सावधानी से आगे बढ़ें',
    algorithmScore: 'एल्गोरिदम स्कोर',
    marketSentiment: 'बाजार की भावना',
    bullish: 'तेजी',
    bearish: 'मंदी',
    neutral: 'तटस्थ',
    why: 'क्यों?',
    stockAlert: 'स्टॉक अलर्ट',
    getNotifications: 'नोटिफिकेशन प्राप्त करें',
    receiveAlerts: 'महत्वपूर्ण बदलावों पर अलर्ट प्राप्त करें',
    configureAlert: 'अलर्ट सेटिंग्स',
    refresh: 'रिफ्रेश',
    lastUpdated: 'अंतिम अपडेट',
    justNow: 'अभी-अभी',
    updating: 'अपडेट हो रहा है...',
    
    // Alert Configuration
    setAlert: 'अलर्ट सेट करें',
    horizon: 'समय सीमा',
    hourly: 'प्रति घंटा',
    daily: 'दैनिक',
    confidenceThreshold: 'विश्वास सीमा',
    enableAlert: 'अलर्ट सक्षम करें',
    alertSet: 'अलर्ट सफलतापूर्वक सेट!',
    
    // History
    predictionHistory: 'भविष्यवाणी इतिहास',
    last30Predictions: 'पिछली 30 भविष्यवाणियां',
    accurate: 'सटीक',
    correct: 'सही',
    incorrect: 'गलत',
    total: 'कुल',
    dateTime: 'दिनांक/समय',
    stock: 'स्टॉक',
    outcome: 'वास्तविक परिणाम',
    hitMiss: 'हिट/मिस',
    
    // About
    aboutTrendcast: 'TrendCast के बारे में',
    mission: 'हमारा मिशन',
    missionText: 'क्वांटम-संचालित सिग्नल्स का उपयोग करके स्टॉक भविष्यवाणियों को सरल बनाना।',
    disclaimer: 'महत्वपूर्ण अस्वीकरण',
    disclaimerText: 'यह एक हैकथॉन प्रोटोटाइप है। वित्तीय सलाह नहीं।',
    
    // General
    back: 'वापस',
    save: 'सेव',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता'
  },
  
  ja: {
    // App Navigation
    home: 'ホーム',
    history: '履歴',
    about: 'について',
    settings: '設定',
    logout: 'ログアウト',
    selectLanguage: '言語を選択',
    
    // Login
    welcome: 'TrendCastへようこそ',
    login: 'ログイン',
    username: 'ユーザー名',
    password: 'パスワード',
    signIn: 'サインイン',
    
    // Market Selection
    selectMarket: '市場を選択',
    globalMarkets: 'グローバル市場',
    performance: 'パフォーマンス',
    markets: '市場',
    
    // Stock List
    stocksIn: '株式',
    search: '株式を検索...',
    filterBy: 'フィルター',
    all: 'すべて',
    buy: '買い',
    sell: '売り',
    hold: 'ホールド',
    
    // Stock Detail
    prediction: '予測',
    confidence: '信頼度',
    confidenceLevel: '信頼度レベル',
    highConfidence: '高',
    mediumConfidence: '中',
    lowConfidence: '低',
    veryReliable: '非常に信頼できる予測',
    moderatelyReliable: '中程度に信頼できる予測',
    lowerReliability: '信頼性が低い - 注意して進める',
    algorithmScore: 'アルゴリズムスコア',
    marketSentiment: '市場センチメント',
    bullish: '強気',
    bearish: '弱気',
    neutral: 'ニュートラル',
    why: 'なぜ？',
    stockAlert: '株式アラート',
    getNotifications: '通知を受け取る',
    receiveAlerts: '重要な変更があった時にアラートを受信',
    configureAlert: 'アラート設定',
    refresh: '更新',
    lastUpdated: '最終更新',
    justNow: 'たった今',
    updating: '更新中...',
    
    // Alert Configuration
    setAlert: 'アラート設定',
    horizon: '期間',
    hourly: '時間毎',
    daily: '日次',
    confidenceThreshold: '信頼度閾値',
    enableAlert: 'アラートを有効にする',
    alertSet: 'アラートが正常に設定されました！',
    
    // History
    predictionHistory: '予測履歴',
    last30Predictions: '過去30件の予測',
    accurate: '正確',
    correct: '正解',
    incorrect: '不正解',
    total: '合計',
    dateTime: '日時',
    stock: '株式',
    outcome: '実際の結果',
    hitMiss: 'ヒット/ミス',
    
    // About
    aboutTrendcast: 'TrendCastについて',
    mission: '私たちのミッション',
    missionText: '量子パワード信号を使用して株価予測を簡単にします。',
    disclaimer: '重要な免責事項',
    disclaimerText: 'これはハッカソンのプロトタイプです。金融アドバイスではありません。',
    
    // General
    back: '戻る',
    save: '保存',
    cancel: 'キャンセル',
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功'
  }
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};