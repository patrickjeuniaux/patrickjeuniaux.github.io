export type Locale = 'fra' | 'nld' | 'eng' | 'deu' | 'ita' | 'spa' | 'por' | 'zho' | 'rus' | 'jpn' | 'hin' | 'ara';

import { locales as configuredLocales, defaultLocale as configuredDefault, fallbackLocales as configuredFallbacks } from './config.mjs';
export const locales = configuredLocales as Locale[];
export const defaultLocale = configuredDefault as Locale;
export const fallbackLocales = configuredFallbacks as Locale[];

export const localeLabels: Record<Locale, string> = {
  fra: 'FRA', nld: 'NLD', eng: 'ENG', deu: 'DEU', ita: 'ITA',
  spa: 'SPA', por: 'POR', zho: 'ZHO', rus: 'RUS', jpn: 'JPN',
  hin: 'HIN', ara: 'ARA',
};

export type UIStrings = {
  siteDescription: string;
  tagline: string;
  heroImageDescription: string;
  nav: { about: string; projects: string; work: string; notes: string; contact: string; collaborations: string; };
  languageSwitcher: string;
  primaryNavLabel: string;
  languageNavLabel: string;
  footerTitle: string;
  footerText: string;
  footerBuild: string;
  projectStatusFallback: string; projectFilters: { period: string; budget: string; domain: string; allDomains: string; status: string; role: string; startYear: string; allStatus: string; allRoles: string; allYears: string; funder: string; allFunders: string; totalEntries: string; reset: string; };
  publicationFilters: {
    type: string; year: string; language: string; selectedOnly: string;
    allTypes: string; allYears: string; allLanguages: string;
    selectedBadge: string; abstractSummary: string; externalLink: string; noOnlineLink: string;
    unspecifiedLanguage: string; unspecifiedShort: string; totalEntries: string; selectedEntries: string;
  };
  notes: {
    noPosts: string;
  };
  lastUpdated: string;
  originalPublication: string;
  autoTranslated: string;
};

export const ui: Record<Locale, UIStrings> = {
  fra: {
    heroImageDescription: "ubi bene, ibi patria. Une cime d’arbre reflétée dans l’eau, avec des feuilles et de la lumière.",
    siteDescription: 'Recherche en sciences cognitives, données de justice, graphes de connaissances et gouvernance des données.',
    tagline: 'données · intelligence artificielle · transformation',
    nav: { about: 'Profil', projects: 'Projets', work: 'Communications', notes: 'Notes', contact: 'Contact', collaborations: 'Collaborations' },
    languageSwitcher: 'Langues', primaryNavLabel: 'Navigation principale', languageNavLabel: 'Sélecteur de langue', footerTitle: 'Patrick Jeuniaux', footerText: '', footerBuild: '', projectStatusFallback: 'Projet', projectFilters: { period: "Période", budget: "Budget", domain: 'Domaine', allDomains: 'Tous les domaines', status: 'Statut', role: 'Rôle', startYear: 'Année de début', allStatus: 'Tous les statuts', allRoles: 'Tous les rôles', allYears: 'Toutes les années', funder: 'Financeur', allFunders: 'Tous les financeurs', totalEntries: 'Projets affichés', reset: 'Réinitialiser' }, publicationFilters: { type: 'Type', year: 'Année', language: 'Langue', selectedOnly: 'Sélection seulement', allTypes: 'Tous les types', allYears: 'Toutes les années', allLanguages: 'Toutes les langues', selectedBadge: 'Sélection', abstractSummary: 'Résumé', externalLink: 'Lien externe', noOnlineLink: 'Aucun lien en ligne disponible.', unspecifiedLanguage: 'Langue non précisée', unspecifiedShort: 'Non préc.', totalEntries: 'Références', selectedEntries: 'Références sélectionnées' }, notes: { noPosts: 'Aucune actualité ni note pour le moment.' },
    lastUpdated: 'Dernière mise à jour',
    originalPublication: 'Date de publication originale',
    autoTranslated: ''
  },
  nld: {
    heroImageDescription: "ubi bene, ibi patria. Een boomkruin weerspiegeld in het water, met bladeren en licht.",
    siteDescription: "Onderzoek in cognitieve wetenschappen, justitiegegevens, kennisgrafen en gegevensgovernance.",
    tagline: "gegevens · artificiële intelligentie · transformatie",
    nav: { about: "Profiel", projects: "Projecten", work: "Wetenschappelijke bijdragen", notes: "Notities", contact: "Contact", collaborations: "Samenwerkingen" },
    languageSwitcher: 'Talen', primaryNavLabel: 'Hoofdnavigatie', languageNavLabel: 'Taalkiezer', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Project', projectFilters: { period: "Periode", budget: "Budget", domain: 'Domein', allDomains: 'Alle domeinen', status: 'Status', role: 'Rol', startYear: 'Startjaar', allStatus: 'Alle statussen', allRoles: 'Alle rollen', allYears: 'Alle jaren', funder: "Financier", allFunders: "Alle financiers", totalEntries: "Getoonde projecten", reset: "Opnieuw instellen" }, publicationFilters: { type: 'Type', year: 'Jaar', language: 'Taal', selectedOnly: 'Alleen geselecteerd', allTypes: 'Alle types', allYears: 'Alle jaren', allLanguages: 'Alle talen', selectedBadge: 'Geselecteerd', abstractSummary: 'Samenvatting', externalLink: 'Externe link', noOnlineLink: "Geen online link beschikbaar.", unspecifiedLanguage: 'Niet-gespecificeerde taal', unspecifiedShort: "Niet vermeld", totalEntries: "Referenties", selectedEntries: "Geselecteerde referenties" }, notes: { noPosts: "Nog geen notities." },
    lastUpdated: 'Laatst bijgewerkt',
    originalPublication: 'Oorspronkelijke publicatiedatum',
    autoTranslated: 'Deze pagina is automatisch vertaald uit het Frans.'
  },
  eng: {
    heroImageDescription: "ubi bene, ibi patria. A tree canopy reflected in water, with leaves and light.",
    siteDescription: "Research in cognitive science, justice data, knowledge graphs and data governance.",
    tagline: "data · artificial intelligence · transformation",
    nav: { about: "Profile", projects: "Projects", work: "Communications", notes: "Notes", contact: "Contact", collaborations: "Collaborations" },
    languageSwitcher: 'Languages', primaryNavLabel: 'Primary navigation', languageNavLabel: 'Language switcher', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Project', projectFilters: { period: "Period", budget: "Budget", domain: 'Domain', allDomains: 'All domains', status: 'Status', role: 'Role', startYear: 'Start year', allStatus: 'All statuses', allRoles: 'All roles', allYears: 'All years', funder: "Funder", allFunders: "All funders", totalEntries: "Projects shown", reset: "Reset" }, publicationFilters: { type: 'Type', year: 'Year', language: 'Language', selectedOnly: 'Selected only', allTypes: 'All types', allYears: 'All years', allLanguages: 'All languages', selectedBadge: 'Selected', abstractSummary: 'Abstract', externalLink: 'External link', noOnlineLink: "No online link available.", unspecifiedLanguage: 'Unspecified language', unspecifiedShort: "Unspecified", totalEntries: "References", selectedEntries: "Selected references" }, notes: { noPosts: "No notes yet." },
    lastUpdated: 'Last updated',
    originalPublication: 'Original publication date',
    autoTranslated: 'This page was automatically translated from French.'
  },
  deu: {
    heroImageDescription: "ubi bene, ibi patria. Eine Baumkrone spiegelt sich im Wasser, mit Blättern und Licht.",
    siteDescription: "Kognitionswissenschaftliche Forschung, Justizdaten, Wissensgraphen und Daten-Governance.",
    tagline: "Daten · künstliche Intelligenz · Transformation",
    nav: { about: "Profil", projects: "Projekte", work: "Wissenschaftliche Beiträge", notes: "Notizen", contact: "Kontakt", collaborations: "Kooperationen" },
    languageSwitcher: 'Sprachen', primaryNavLabel: 'Hauptnavigation', languageNavLabel: 'Sprachwahl', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Projekt', projectFilters: { period: "Zeitraum", budget: "Budget", domain: 'Bereich', allDomains: 'Alle Bereiche', status: 'Status', role: 'Rolle', startYear: 'Startjahr', allStatus: 'Alle Status', allRoles: 'Alle Rollen', allYears: 'Alle Jahre', funder: "Förderer", allFunders: "Alle Förderer", totalEntries: "Angezeigte Projekte", reset: "Zurücksetzen" }, publicationFilters: { type: 'Typ', year: 'Jahr', language: 'Sprache', selectedOnly: 'Nur Ausgewählte', allTypes: 'Alle Typen', allYears: 'Alle Jahre', allLanguages: 'Alle Sprachen', selectedBadge: 'Ausgewählt', abstractSummary: 'Zusammenfassung', externalLink: 'Externer Link', noOnlineLink: "Kein Online-Link verfügbar.", unspecifiedLanguage: 'Sprache nicht angegeben', unspecifiedShort: "Nicht angegeben", totalEntries: "Referenzen", selectedEntries: "Ausgewählte Referenzen" }, notes: { noPosts: "Noch keine Notizen." },
    lastUpdated: 'Zuletzt aktualisiert',
    originalPublication: 'Ursprüngliches Veröffentlichungsdatum',
    autoTranslated: 'Diese Seite wurde automatisch aus dem Französischen übersetzt.'
  },
  ita: {
    heroImageDescription: "ubi bene, ibi patria. La chioma di un albero riflessa nell’acqua, con foglie e luce.",
    siteDescription: "Ricerca in scienze cognitive, dati della giustizia, grafi di conoscenza e governance dei dati.",
    tagline: "dati · intelligenza artificiale · trasformazione",
    nav: { about: "Profilo", projects: "Progetti", work: "Comunicazioni", notes: "Note", contact: "Contatti", collaborations: "Collaborazioni" },
    languageSwitcher: 'Lingue', primaryNavLabel: 'Navigazione principale', languageNavLabel: 'Selettore di lingua', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Progetto', projectFilters: { period: "Periodo", budget: "Budget", domain: 'Settore', allDomains: 'Tutti i settori', status: 'Stato', role: 'Ruolo', startYear: 'Anno di inizio', allStatus: 'Tutti gli stati', allRoles: 'Tutti i ruoli', allYears: 'Tutti gli anni', funder: "Finanziatore", allFunders: "Tutti i finanziatori", totalEntries: "Progetti visualizzati", reset: "Reimposta" }, publicationFilters: { type: 'Tipo', year: 'Anno', language: 'Lingua', selectedOnly: 'Solo selezionati', allTypes: 'Tutti i tipi', allYears: 'Tutti gli anni', allLanguages: 'Tutte le lingue', selectedBadge: 'Selezionato', abstractSummary: 'Riassunto', externalLink: 'Link esterno', noOnlineLink: "Nessun link online disponibile.", unspecifiedLanguage: 'Lingua non specificata', unspecifiedShort: "Non specificato", totalEntries: "Referenze", selectedEntries: "Referenze selezionate" }, notes: { noPosts: "Nessuna nota per il momento." },
    lastUpdated: 'Ultimo aggiornamento',
    originalPublication: 'Data di pubblicazione originale',
    autoTranslated: 'Questa pagina è stata tradotta automaticamente dal francese.'
  },
  spa: {
    heroImageDescription: "ubi bene, ibi patria. La copa de un árbol reflejada en el agua, con hojas y luz.",
    siteDescription: "Investigación en ciencias cognitivas, datos de la justicia, grafos de conocimiento y gobernanza de datos.",
    tagline: "datos · inteligencia artificial · transformación",
    nav: { about: "Perfil", projects: "Proyectos", work: "Comunicaciones", notes: "Notas", contact: "Contacto", collaborations: "Colaboraciones" },
    languageSwitcher: 'Idiomas', primaryNavLabel: 'Navegación principal', languageNavLabel: 'Selector de idioma', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Proyecto', projectFilters: { period: "Periodo", budget: "Presupuesto", domain: 'Ámbito', allDomains: 'Todos los ámbitos', status: 'Estado', role: 'Rol', startYear: 'Año de inicio', allStatus: 'Todos los estados', allRoles: 'Todos los roles', allYears: 'Todos los años', funder: "Financiador", allFunders: "Todos los financiadores", totalEntries: "Proyectos mostrados", reset: "Restablecer" }, publicationFilters: { type: 'Tipo', year: 'Año', language: 'Idioma', selectedOnly: 'Solo seleccionadas', allTypes: 'Todos los tipos', allYears: 'Todos los años', allLanguages: 'Todos los idiomas', selectedBadge: 'Seleccionada', abstractSummary: 'Resumen', externalLink: 'Enlace externo', noOnlineLink: "No hay enlace en línea disponible.", unspecifiedLanguage: 'Idioma no especificado', unspecifiedShort: "Sin especificar", totalEntries: "Referencias", selectedEntries: "Referencias seleccionadas" }, notes: { noPosts: "Todavía no hay notas." },
    lastUpdated: 'Última actualización',
    originalPublication: 'Fecha de publicación original',
    autoTranslated: 'Esta página ha sido traducida automáticamente del francés.'
  },
  por: {
    heroImageDescription: "ubi bene, ibi patria. A copa de uma árvore refletida na água, com folhas e luz.",
    siteDescription: "Investigação em ciências cognitivas, dados da justiça, grafos de conhecimento e governação dos dados.",
    tagline: "dados · inteligência artificial · transformação",
    nav: { about: "Perfil", projects: "Projetos", work: "Comunicações", notes: "Notas", contact: "Contacto", collaborations: "Colaborações" },
    languageSwitcher: 'Línguas', primaryNavLabel: 'Navegação principal', languageNavLabel: 'Seletor de idioma', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Projeto', projectFilters: { period: "Período", budget: "Orçamento", domain: 'Área', allDomains: 'Todas as áreas', status: 'Estado', role: 'Papel', startYear: 'Ano de início', allStatus: 'Todos os estados', allRoles: 'Todos os papéis', allYears: 'Todos os anos', funder: "Financiador", allFunders: "Todos os financiadores", totalEntries: "Projetos apresentados", reset: "Repor" }, publicationFilters: { type: 'Tipo', year: 'Ano', language: 'Língua', selectedOnly: 'Apenas selecionadas', allTypes: 'Todos os tipos', allYears: 'Todos os anos', allLanguages: 'Todas as línguas', selectedBadge: 'Selecionada', abstractSummary: 'Resumo', externalLink: 'Ligação externa', noOnlineLink: "Nenhuma ligação em linha disponível.", unspecifiedLanguage: 'Língua não especificada', unspecifiedShort: "Não especificado", totalEntries: "Referências", selectedEntries: "Referências selecionadas" }, notes: { noPosts: "Ainda não há notas." },
    lastUpdated: 'Última atualização',
    originalPublication: 'Data de publicação original',
    autoTranslated: 'Esta página foi traduzida automaticamente do francês.'
  },
  zho: {
    heroImageDescription: "ubi bene, ibi patria. 树冠倒映在水中，树叶与光影相映。",
    siteDescription: "认知科学、司法数据、知识图谱与数据治理研究。",
    tagline: "数据 · 人工智能 · 转型",
    nav: { about: "简介", projects: "项目", work: "学术交流", notes: "笔记", contact: "联系", collaborations: "合作" },
    languageSwitcher: '语言', primaryNavLabel: '主导航', languageNavLabel: '语言切换', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: '项目', projectFilters: { period: "期间", budget: "预算", domain: '领域', allDomains: '所有领域', status: '状态', role: '角色', startYear: '起始年份', allStatus: '所有状态', allRoles: '所有角色', allYears: '所有年份', funder: "资助方", allFunders: "所有资助方", totalEntries: "显示的项目", reset: "重置" }, publicationFilters: { type: '类型', year: '年份', language: '语言', selectedOnly: '仅看精选', allTypes: '所有类型', allYears: '所有年份', allLanguages: '所有语言', selectedBadge: '精选', abstractSummary: '摘要', externalLink: '外部链接', noOnlineLink: "无可用的在线链接。", unspecifiedLanguage: '未说明语言', unspecifiedShort: "未注明", totalEntries: "参考条目", selectedEntries: "精选参考条目" }, notes: { noPosts: "暂无笔记。" },
    lastUpdated: '最近更新',
    originalPublication: '原始发布日期',
    autoTranslated: '本页由法语自动翻译而成。'
  },
  rus: {
    heroImageDescription: "ubi bene, ibi patria. Крона дерева отражается в воде, с листьями и светом.",
    siteDescription: "Когнитивные исследования, данные правосудия, графы знаний и управление данными.",
    tagline: "данные · искусственный интеллект · трансформация",
    nav: { about: "Профиль", projects: "Проекты", work: "Научные сообщения", notes: "Заметки", contact: "Контакт", collaborations: "Сотрудничество" },
    languageSwitcher: 'Языки', primaryNavLabel: 'Основная навигация', languageNavLabel: 'Выбор языка', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'Проект', projectFilters: { period: "Период", budget: "Бюджет", domain: 'Область', allDomains: 'Все области', status: 'Статус', role: 'Роль', startYear: 'Год начала', allStatus: 'Все статусы', allRoles: 'Все роли', allYears: 'Все годы', funder: "Финансирующая организация", allFunders: "Все финансирующие организации", totalEntries: "Показанные проекты", reset: "Сбросить" }, publicationFilters: { type: 'Тип', year: 'Год', language: 'Язык', selectedOnly: 'Только избранное', allTypes: 'Все типы', allYears: 'Все годы', allLanguages: 'Все языки', selectedBadge: 'Избранное', abstractSummary: 'Аннотация', externalLink: 'Внешняя ссылка', noOnlineLink: "Онлайн-ссылка недоступна.", unspecifiedLanguage: 'Язык не указан', unspecifiedShort: "Не указано", totalEntries: "Источники", selectedEntries: "Избранные источники" }, notes: { noPosts: "Заметок пока нет." },
    lastUpdated: 'Последнее обновление',
    originalPublication: 'Дата оригинальной публикации',
    autoTranslated: 'Эта страница была автоматически переведена с французского.'
  },
  jpn: {
    heroImageDescription: "ubi bene, ibi patria. 水面に映る木の枝葉と光。",
    siteDescription: "認知科学、司法データ、知識グラフ、データガバナンスの研究。",
    tagline: "データ · 人工知能 · 変革",
    nav: { about: "プロフィール", projects: "プロジェクト", work: "研究発信", notes: "ノート", contact: "連絡先", collaborations: "協力" },
    languageSwitcher: '言語', primaryNavLabel: '主要ナビゲーション', languageNavLabel: '言語切替', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'プロジェクト', projectFilters: { period: "期間", budget: "予算", domain: '分野', allDomains: 'すべての分野', status: 'ステータス', role: '役割', startYear: '開始年', allStatus: 'すべてのステータス', allRoles: 'すべての役割', allYears: 'すべての年', funder: "助成機関", allFunders: "すべての助成機関", totalEntries: "表示中のプロジェクト", reset: "リセット" }, publicationFilters: { type: '種別', year: '年', language: '言語', selectedOnly: '選択のみ', allTypes: 'すべての種別', allYears: 'すべての年', allLanguages: 'すべての言語', selectedBadge: '選択', abstractSummary: '要約', externalLink: '外部リンク', noOnlineLink: "オンラインリンクはありません。", unspecifiedLanguage: '言語未指定', unspecifiedShort: "未記載", totalEntries: "参考文献", selectedEntries: "選択された参考文献" }, notes: { noPosts: "ノートはまだありません。" },
    lastUpdated: '最終更新日',
    originalPublication: '初回公開日',
    autoTranslated: 'このページはフランス語から自動翻訳されました。'
  },
  hin: {
    heroImageDescription: "ubi bene, ibi patria. पानी में प्रतिबिंबित पेड़ की छतरी, पत्तियों और प्रकाश के साथ।",
    siteDescription: "संज्ञानात्मक विज्ञान, न्याय संबंधी डेटा, ज्ञान ग्राफ और डेटा शासन में शोध।",
    tagline: "डेटा · कृत्रिम बुद्धिमत्ता · रूपांतरण",
    nav: { about: "परिचय", projects: "परियोजनाएँ", work: "वैज्ञानिक संप्रेषण", notes: "नोट्स", contact: "संपर्क", collaborations: "सहयोग" },
    languageSwitcher: 'भाषाएँ', primaryNavLabel: 'मुख्य नेविगेशन', languageNavLabel: 'भाषा चयन', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'परियोजना', projectFilters: { period: "अवधि", budget: "बजट", domain: 'क्षेत्र', allDomains: 'सभी क्षेत्र', status: 'स्थिति', role: 'भूमिका', startYear: 'आरंभ वर्ष', allStatus: 'सभी स्थितियाँ', allRoles: 'सभी भूमिकाएँ', allYears: 'सभी वर्ष', funder: "वित्तपोषक", allFunders: "सभी वित्तपोषक", totalEntries: "दिखाई गई परियोजनाएँ", reset: "रीसेट" }, publicationFilters: { type: 'प्रकार', year: 'वर्ष', language: 'भाषा', selectedOnly: 'केवल चयनित', allTypes: 'सभी प्रकार', allYears: 'सभी वर्ष', allLanguages: 'सभी भाषाएँ', selectedBadge: 'चयनित', abstractSummary: 'सार', externalLink: 'बाहरी लिंक', noOnlineLink: "कोई ऑनलाइन लिंक उपलब्ध नहीं है।", unspecifiedLanguage: 'अनिर्दिष्ट भाषा', unspecifiedShort: "अनिर्दिष्ट", totalEntries: "संदर्भ", selectedEntries: "चयनित संदर्भ" }, notes: { noPosts: "अभी कोई नोट्स नहीं हैं।" },
    lastUpdated: 'अंतिम अद्यतन',
    originalPublication: 'मूल प्रकाशन तिथि',
    autoTranslated: 'यह पृष्ठ स्वचालित रूप से फ़्रेंच से अनुवादित किया गया था।'
  },
  ara: {
    heroImageDescription: "ubi bene, ibi patria. تاج شجرة منعكس في الماء، مع أوراق وضوء.",
    siteDescription: "أبحاث العلوم المعرفية وبيانات العدالة والرسوم البيانية المعرفية وحوكمة البيانات.",
    tagline: "البيانات · الذكاء الاصطناعي · التحول",
    nav: { about: "الملف المهني", projects: "المشاريع", work: "المساهمات العلمية", notes: "ملاحظات", contact: "التواصل", collaborations: "التعاون" },
    languageSwitcher: 'اللغات', primaryNavLabel: 'التنقل الرئيسي', languageNavLabel: 'مبدّل اللغة', footerTitle: "Patrick Jeuniaux", footerText: "", footerBuild: "", projectStatusFallback: 'مشروع', projectFilters: { period: "الفترة", budget: "الميزانية", domain: 'المجال', allDomains: 'كل المجالات', status: 'الحالة', role: 'الدور', startYear: 'سنة البداية', allStatus: 'كل الحالات', allRoles: 'كل الأدوار', allYears: 'كل السنوات', funder: "جهة التمويل", allFunders: "جميع جهات التمويل", totalEntries: "المشاريع المعروضة", reset: "إعادة ضبط" }, publicationFilters: { type: 'النوع', year: 'السنة', language: 'اللغة', selectedOnly: 'المختار فقط', allTypes: 'كل الأنواع', allYears: 'كل السنوات', allLanguages: 'كل اللغات', selectedBadge: 'مختار', abstractSummary: 'ملخص', externalLink: 'رابط خارجي', noOnlineLink: "لا يتوفر رابط على الإنترنت.", unspecifiedLanguage: 'لغة غير محددة', unspecifiedShort: "غير محدد", totalEntries: "المراجع", selectedEntries: "المراجع المختارة" }, notes: { noPosts: "لا توجد ملاحظات بعد." },
    lastUpdated: 'آخر تحديث',
    originalPublication: 'تاريخ النشر الأصلي',
    autoTranslated: 'تمت ترجمة هذه الصفحة آلياً من اللغة الفرنسية.'
  }
};

export function t(locale: string | undefined): UIStrings {
  const normalized = (locale || defaultLocale).toLowerCase() as Locale;
  return ui[normalized] ?? ui[defaultLocale];
}

export function normalizeLocale(locale: string | undefined): Locale {
  const normalized = (locale || defaultLocale).toLowerCase() as Locale;
  return locales.includes(normalized) ? normalized : defaultLocale;
}

export function localizePath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/+$/, '/');
  if (locale === defaultLocale) return cleanPath;
  return `/${locale}${cleanPath === '/' ? '/' : cleanPath}`.replace(/\/+/g, '/');
}

export function stripLocaleFromPath(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return '/';
  if (locales.includes(parts[0] as Locale)) {
    const rest = `/${parts.slice(1).join('/')}`;
    return rest === '/' ? '/' : `${rest}/`.replace(/\/+$/, '/').replace(/\/+/g, '/');
  }
  return pathname;
}

export function localizedCurrentPath(currentPath: string, locale: Locale) {
  return localizePath(locale, stripLocaleFromPath(currentPath));
}

export function localeDateFormat(locale: Locale) {
  const map: Record<Locale, string> = {
    fra: 'fr-BE', nld: 'nl-BE', eng: 'en-GB', deu: 'de-DE', ita: 'it-IT', spa: 'es-ES', por: 'pt-PT', zho: 'zh-CN', rus: 'ru-RU', jpn: 'ja-JP', hin: 'hi-IN', ara: 'ar-SA'
  };
  return map[locale] ?? 'en-GB';
}
