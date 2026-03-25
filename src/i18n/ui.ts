export type Locale = 'fra' | 'nld' | 'eng' | 'deu' | 'ita' | 'spa' | 'por' | 'zho' | 'rus' | 'jpn' | 'hin' | 'ara';

export const locales: Locale[] = ['fra', 'nld', 'eng', 'deu', 'ita', 'spa', 'por', 'zho', 'rus', 'jpn', 'hin', 'ara'];
export const defaultLocale: Locale = 'fra';
export const fallbackLocales: Locale[] = ['eng', 'fra'];

export const localeLabels: Record<Locale, string> = {
  fra: 'FRA', nld: 'NLD', eng: 'ENG', deu: 'DEU', ita: 'ITA',
  spa: 'SPA', por: 'POR', zho: 'ZHO', rus: 'RUS', jpn: 'JPN',
  hin: 'HIN', ara: 'ARA',
};

export type UIStrings = {
  siteDescription: string;
  tagline: string;
  nav: { about: string; projects: string; work: string; notes: string; contact: string; collaborations: string; };
  languageSwitcher: string;
  primaryNavLabel: string;
  languageNavLabel: string;
  footerTitle: string;
  footerText: string;
  footerBuild: string;
  projectStatusFallback: string; projectFilters: { domain: string; allDomains: string; status: string; role: string; startYear: string; allStatus: string; allRoles: string; allYears: string; funder: string; allFunders: string; totalEntries: string; reset: string; };
  publicationFilters: {
    type: string; year: string; language: string; selectedOnly: string;
    allTypes: string; allYears: string; allLanguages: string;
    selectedBadge: string; abstractSummary: string; externalLink: string; noOnlineLink: string;
    unspecifiedLanguage: string; unspecifiedShort: string; totalEntries: string; selectedEntries: string;
  };
  notes: {
    noPosts: string; translationPolicyTitle: string; translationPolicyText: string; translationPolicyDetailText: string;
  };
  lastUpdated: string;
  originalPublication: string;
  autoTranslated: string;
};

export const ui: Record<Locale, UIStrings> = {
  fra: {
    siteDescription: 'Site personnel de Patrick Jeuniaux : recherche, graphes de connaissance, gouvernance des données, intelligence artificielle et justice pénale.',
    tagline: 'spécialiste en sciences cognitives · chercheur · directeur des données',
    nav: { about: 'À propos', projects: 'Projets', work: 'Travaux', notes: 'Notes', contact: 'Contact', collaborations: 'Collaborations' },
    languageSwitcher: 'Langues', primaryNavLabel: 'Navigation principale', languageNavLabel: 'Sélecteur de langue', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Un espace consacré à la recherche, aux infrastructures de connaissance, à la gouvernance des données et à la réflexion analytique.', footerBuild: 'Construit avec Python, Astro, BibTeX, PCloud, GitHub, ChatGPT, et Antigravity.', projectStatusFallback: 'Projet', projectFilters: { domain: 'Domaine', allDomains: 'Tous les domaines', status: 'Statut', role: 'Rôle', startYear: 'Année de début', allStatus: 'Tous les statuts', allRoles: 'Tous les rôles', allYears: 'Toutes les années', funder: 'Bailleur', allFunders: 'Tous les bailleurs', totalEntries: 'Entrées retenues', reset: 'Rétablir les filtres' }, publicationFilters: { type: 'Type', year: 'Année', language: 'Langue', selectedOnly: 'Sélection seulement', allTypes: 'Tous les types', allYears: 'Toutes les années', allLanguages: 'Toutes les langues', selectedBadge: 'Sélection', abstractSummary: 'Résumé', externalLink: 'Lien externe', noOnlineLink: 'Aucun lien en ligne pour le moment.', unspecifiedLanguage: 'Langue non précisée', unspecifiedShort: 'Non spéc.', totalEntries: 'Entrées retenues', selectedEntries: 'Entrées sélectionnées' }, notes: { noPosts: 'Aucune note pour le moment. Ajoutez des fichiers Markdown ou MDX dans src/content/blog/.', translationPolicyTitle: 'Politique de traduction', translationPolicyText: 'Chaque note peut exister en plusieurs langues à condition de partager la même clé de traduction (translationKey). Les listes et pages détaillées servent d’abord la langue demandée, puis l’anglais, puis le français.', translationPolicyDetailText: 'Pour une même note, gardez la même clé de traduction et le même permalien (slug).' },
    lastUpdated: 'Dernière mise à jour',
    originalPublication: 'Date de publication originale',
    autoTranslated: ''
  },
  nld: {
    siteDescription: 'Persoonlijke website van Patrick Jeuniaux: onderzoek, kennisgrafen, datagovernance, artificiële intelligentie en strafrecht.',
    tagline: 'cognitief psycholoog · onderzoeker · data director',
    nav: { about: 'Over', projects: 'Projecten', work: 'Werk', notes: 'Notities', contact: 'Contact', collaborations: 'Samenwerkingen' },
    languageSwitcher: 'Talen', primaryNavLabel: 'Hoofdnavigatie', languageNavLabel: 'Taalkiezer', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Een stabiele intellectuele ruimte gewijd aan onderzoek, kennisinfrastructuren, datagovernance en analytische reflectie.', footerBuild: 'Gebouwd met Astro. Bibliografische referenties komen uit BibTeX en PDF’s kunnen vanuit PCloud worden gelinkt.', projectStatusFallback: 'Project', projectFilters: { domain: 'Domein', allDomains: 'Alle domeinen', status: 'Status', role: 'Rol', startYear: 'Startjaar', allStatus: 'Alle statussen', allRoles: 'Alle rollen', allYears: 'Alle jaren', funder: 'Financier', allFunders: 'Alle financiers', totalEntries: 'Behouden entries', reset: 'Filters resetten' }, publicationFilters: { type: 'Type', year: 'Jaar', language: 'Taal', selectedOnly: 'Alleen geselecteerd', allTypes: 'Alle types', allYears: 'Alle jaren', allLanguages: 'Alle talen', selectedBadge: 'Geselecteerd', abstractSummary: 'Samenvatting', externalLink: 'Externe link', noOnlineLink: 'Momenteel geen online link.', unspecifiedLanguage: 'Niet-gespecificeerde taal', unspecifiedShort: 'Onbekend', totalEntries: 'Behouden entries', selectedEntries: 'Geselecteerde entries' }, notes: { noPosts: 'Nog geen notities. Voeg Markdown- of MDX-bestanden toe aan src/content/blog/.', translationPolicyTitle: 'Vertaalbeleid', translationPolicyText: 'Elke notitie kan in verschillende talen bestaan zolang dezelfde vertaalsleutel (translationKey) wordt gedeeld. Lijsten en detailpagina’s tonen eerst de gevraagde taal, daarna Engels en vervolgens Frans.', translationPolicyDetailText: 'Gebruik voor eenzelfde notitie dezelfde vertaalsleutel en dezelfde slug.' },
    lastUpdated: 'Laatst bijgewerkt',
    originalPublication: 'Oorspronkelijke publicatiedatum',
    autoTranslated: 'Deze pagina is automatisch vertaald uit het Frans.'
  },
  eng: {
    siteDescription: 'Personal website of Patrick Jeuniaux: research, knowledge graphs, data governance, artificial intelligence, and criminal justice.',
    tagline: 'cognitive scientist · researcher · chief data officer',
    nav: { about: 'About', projects: 'Projects', work: 'Work', notes: 'Notes', contact: 'Contact', collaborations: 'Collaborations' },
    languageSwitcher: 'Languages', primaryNavLabel: 'Primary navigation', languageNavLabel: 'Language switcher', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'A stable intellectual space devoted to research, knowledge infrastructures, data governance, and analytical reflection.', footerBuild: 'Built with Astro. Bibliographic references come from BibTeX and PDFs can be linked from PCloud.', projectStatusFallback: 'Project', projectFilters: { domain: 'Domain', allDomains: 'All domains', status: 'Status', role: 'Role', startYear: 'Start year', allStatus: 'All statuses', allRoles: 'All roles', allYears: 'All years', funder: 'Funder', allFunders: 'All funders', totalEntries: 'Total entries', reset: 'Reset filters' }, publicationFilters: { type: 'Type', year: 'Year', language: 'Language', selectedOnly: 'Selected only', allTypes: 'All types', allYears: 'All years', allLanguages: 'All languages', selectedBadge: 'Selected', abstractSummary: 'Abstract', externalLink: 'External link', noOnlineLink: 'No online link for the moment.', unspecifiedLanguage: 'Unspecified language', unspecifiedShort: 'Unspec.', totalEntries: 'Retained entries', selectedEntries: 'Selected entries' }, notes: { noPosts: 'No notes yet. Add Markdown or MDX files to src/content/blog/.', translationPolicyTitle: 'Translation policy', translationPolicyText: 'Each note can exist in several languages as long as it shares the same translationKey. Lists and detail pages serve the requested language first, then English, then French.', translationPolicyDetailText: 'For a given note, keep the same translationKey and the same slug.' },
    lastUpdated: 'Last updated',
    originalPublication: 'Original publication date',
    autoTranslated: 'This page was automatically translated from French.'
  },
  deu: {
    siteDescription: 'Persönliche Website von Patrick Jeuniaux: Forschung, Wissensgraphen, Data Governance, Künstliche Intelligenz und Strafjustiz.',
    tagline: 'Spezialist für Kognitionswissenschaft · Forscher · Datendirektor',
    nav: { about: 'Über', projects: 'Projekte', work: 'Arbeiten', notes: 'Notizen', contact: 'Kontakt', collaborations: 'Zusammenarbeit' },
    languageSwitcher: 'Sprachen', primaryNavLabel: 'Hauptnavigation', languageNavLabel: 'Sprachwahl', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Eine stabile intellektuelle Plattform für Forschung, Wissensinfrastrukturen, Data Governance und analytische Reflexion.', footerBuild: 'Erstellt mit Astro. Bibliografische Daten stammen aus BibTeX; PDFs können über PCloud verlinkt werden.', projectStatusFallback: 'Projekt', projectFilters: { domain: 'Bereich', allDomains: 'Alle Bereiche', status: 'Status', role: 'Rolle', startYear: 'Startjahr', allStatus: 'Alle Status', allRoles: 'Alle Rollen', allYears: 'Alle Jahre', funder: 'Förderer', allFunders: 'Alle Förderer', totalEntries: 'Übernommene Einträge', reset: 'Filter zurücksetzen' }, publicationFilters: { type: 'Typ', year: 'Jahr', language: 'Sprache', selectedOnly: 'Nur Ausgewählte', allTypes: 'Alle Typen', allYears: 'Alle Jahre', allLanguages: 'Alle Sprachen', selectedBadge: 'Ausgewählt', abstractSummary: 'Zusammenfassung', externalLink: 'Externer Link', noOnlineLink: 'Derzeit kein Online-Link.', unspecifiedLanguage: 'Sprache nicht angegeben', unspecifiedShort: 'Unbek.', totalEntries: 'Übernommene Einträge', selectedEntries: 'Ausgewählte Einträge' }, notes: { noPosts: 'Noch keine Notizen. Fügen Sie Markdown- oder MDX-Dateien in src/content/blog/ hinzu.', translationPolicyTitle: 'Übersetzungspolitik', translationPolicyText: 'Jede Notiz kann in mehreren Sprachen existieren, wenn sie denselben translationKey teilt. Listen und Detailseiten zeigen zuerst die gewünschte Sprache, dann Englisch, dann Französisch.', translationPolicyDetailText: 'Verwenden Sie für dieselbe Notiz denselben translationKey und denselben Slug.' },
    lastUpdated: 'Zuletzt aktualisiert',
    originalPublication: 'Ursprüngliches Veröffentlichungsdatum',
    autoTranslated: 'Diese Seite wurde automatisch aus dem Französischen übersetzt.'
  },
  ita: {
    siteDescription: 'Sito personale di Patrick Jeuniaux: ricerca, grafi della conoscenza, governance dei dati, intelligenza artificiale e giustizia penale.',
    tagline: 'Specialista in scienze cognitive · ricercatore · direttore dei dati',
    nav: { about: 'Profilo', projects: 'Progetti', work: 'Lavori', notes: 'Note', contact: 'Contatto', collaborations: 'Collaborazioni' },
    languageSwitcher: 'Lingue', primaryNavLabel: 'Navigazione principale', languageNavLabel: 'Selettore di lingua', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Uno spazio intellettuale stabile dedicato alla ricerca, alle infrastrutture della conoscenza, alla governance dei dati e alla riflessione analitica.', footerBuild: 'Costruito con Astro. I riferimenti bibliografici provengono da BibTeX e i PDF possono essere collegati da PCloud.', projectStatusFallback: 'Progetto', projectFilters: { domain: 'Settore', allDomains: 'Tutti i settori', status: 'Stato', role: 'Ruolo', startYear: 'Anno di inizio', allStatus: 'Tutti gli stati', allRoles: 'Tutti i ruoli', allYears: 'Tutti gli anni', funder: 'Finanziatore', allFunders: 'Tutti i finanziatori', totalEntries: 'Voci mantenute', reset: 'Reimposta filtri' }, publicationFilters: { type: 'Tipo', year: 'Anno', language: 'Lingua', selectedOnly: 'Solo selezionati', allTypes: 'Tutti i tipi', allYears: 'Tutti gli anni', allLanguages: 'Tutte le lingue', selectedBadge: 'Selezionato', abstractSummary: 'Riassunto', externalLink: 'Link esterno', noOnlineLink: 'Nessun link online per il momento.', unspecifiedLanguage: 'Lingua non specificata', unspecifiedShort: 'Non spec.', totalEntries: 'Voci mantenute', selectedEntries: 'Voci selezionate' }, notes: { noPosts: 'Nessuna nota per il momento. Aggiungi file Markdown o MDX in src/content/blog/.', translationPolicyTitle: 'Politica di traduzione', translationPolicyText: 'Ogni nota può esistere in più lingue purché condivida la stessa translationKey. Gli elenchi e le pagine di dettaglio mostrano prima la lingua richiesta, poi l’inglese, poi il francese.', translationPolicyDetailText: 'Per una stessa nota, mantieni la stessa translationKey e lo stesso slug.' },
    lastUpdated: 'Ultimo aggiornamento',
    originalPublication: 'Data di pubblicazione originale',
    autoTranslated: 'Questa pagina è stata tradotta automaticamente dal francese.'
  },
  spa: {
    siteDescription: 'Sitio personal de Patrick Jeuniaux: investigación, grafos de conocimiento, gobernanza de datos, inteligencia artificial y justicia penal.',
    tagline: 'Especialista en ciencias cognitivas · investigador · director de datos',
    nav: { about: 'Perfil', projects: 'Proyectos', work: 'Trabajos', notes: 'Notas', contact: 'Contacto', collaborations: 'Colaboraciones' },
    languageSwitcher: 'Idiomas', primaryNavLabel: 'Navegación principal', languageNavLabel: 'Selector de idioma', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Un espacio intelectual estable dedicado a la investigación, las infraestructuras de conocimiento, la gobernanza de datos y la reflexión analítica.', footerBuild: 'Construido con Astro. Las referencias bibliográficas provienen de BibTeX e los PDF pueden enlazarse desde PCloud.', projectStatusFallback: 'Proyecto', projectFilters: { domain: 'Ámbito', allDomains: 'Todos los ámbitos', status: 'Estado', role: 'Rol', startYear: 'Año de inicio', allStatus: 'Todos los estados', allRoles: 'Todos los roles', allYears: 'Todos los años', funder: 'Financiador', allFunders: 'Todos los financiadores', totalEntries: 'Entradas retenidas', reset: 'Restablecer filtros' }, publicationFilters: { type: 'Tipo', year: 'Año', language: 'Idioma', selectedOnly: 'Solo seleccionadas', allTypes: 'Todos los tipos', allYears: 'Todos los años', allLanguages: 'Todos los idiomas', selectedBadge: 'Seleccionada', abstractSummary: 'Resumen', externalLink: 'Enlace externo', noOnlineLink: 'Sin enlace en línea por el momento.', unspecifiedLanguage: 'Idioma no especificado', unspecifiedShort: 'No espec.', totalEntries: 'Entradas retenidas', selectedEntries: 'Entradas seleccionadas' }, notes: { noPosts: 'Todavía no hay notas. Añada archivos Markdown o MDX en src/content/blog/.', translationPolicyTitle: 'Política de traducción', translationPolicyText: 'Cada nota puede existir en varios idiomas siempre que comparta la misma translationKey. Las listas y páginas detalladas sirven primero el idioma solicitado, luego inglés y después francés.', translationPolicyDetailText: 'Para una misma nota, mantenga la misma translationKey y el mismo slug.' },
    lastUpdated: 'Última actualización',
    originalPublication: 'Fecha de publicación original',
    autoTranslated: 'Esta página ha sido traducida automáticamente del francés.'
  },
  por: {
    siteDescription: 'Site pessoal de Patrick Jeuniaux: pesquisa, grafos de conhecimento, governança de dados, inteligência artificial e justiça criminal.',
    tagline: 'Especialista em ciências cognitivas · pesquisador · diretor de dados',
    nav: { about: 'Perfil', projects: 'Projetos', work: 'Trabalhos', notes: 'Notas', contact: 'Contacto', collaborations: 'Colaborações' },
    languageSwitcher: 'Línguas', primaryNavLabel: 'Navegação principal', languageNavLabel: 'Seletor de idioma', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Um espaço intelectual estável dedicado à pesquisa, às infraestruturas de conhecimento, à governança de dados e à reflexão analítica.', footerBuild: 'Construído com Astro. As referências bibliográficas vêm do BibTeX e os PDF podem ser ligados a partir do PCloud.', projectStatusFallback: 'Projeto', projectFilters: { domain: 'Área', allDomains: 'Todas as áreas', status: 'Estado', role: 'Papel', startYear: 'Ano de início', allStatus: 'Todos os estados', allRoles: 'Todos os papéis', allYears: 'Todos os anos', funder: 'Financiador', allFunders: 'Todos os financiadores', totalEntries: 'Entradas retidas', reset: 'Repor filtros' }, publicationFilters: { type: 'Tipo', year: 'Ano', language: 'Língua', selectedOnly: 'Apenas selecionadas', allTypes: 'Todos os tipos', allYears: 'Todos os anos', allLanguages: 'Todas as línguas', selectedBadge: 'Selecionada', abstractSummary: 'Resumo', externalLink: 'Ligação externa', noOnlineLink: 'Ainda sem ligação em linha.', unspecifiedLanguage: 'Língua não especificada', unspecifiedShort: 'Não espec.', totalEntries: 'Entradas retidas', selectedEntries: 'Entradas selecionadas' }, notes: { noPosts: 'Ainda não há notas. Adicione ficheiros Markdown ou MDX em src/content/blog/.', translationPolicyTitle: 'Política de tradução', translationPolicyText: 'Cada nota pode existir em várias línguas desde que partilhe a mesma translationKey. As listas e páginas detalhadas mostram primeiro a língua pedida, depois inglês e por fim francês.', translationPolicyDetailText: 'Para a mesma nota, mantenha a mesma translationKey e o mesmo slug.' },
    lastUpdated: 'Última atualização',
    originalPublication: 'Data de publicação original',
    autoTranslated: 'Esta página foi traduzida automaticamente do francês.'
  },
  zho: {
    siteDescription: 'Patrick Jeuniaux 的个人网站：研究、知识图谱、数据治理、人工智能与刑事司法。',
    tagline: '认知科学专家 · 研究员 · 数据总监',
    nav: { about: '简介', projects: '项目', work: '工作', notes: '笔记', contact: '联系', collaborations: '合作' },
    languageSwitcher: '语言', primaryNavLabel: '主导航', languageNavLabel: '语言切换', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: '一个稳定的思想空间，致力于研究、知识基础设施、数据治理和分析性反思。', footerBuild: '本站使用 Astro 构建。书目参考来自 BibTeX，PDF 可通过 PCloud 链接。', projectStatusFallback: '项目', projectFilters: { domain: '领域', allDomains: '所有领域', status: '状态', role: '角色', startYear: '起始年份', allStatus: '所有状态', allRoles: '所有角色', allYears: '所有年份', funder: '资助方', allFunders: '所有资助方', totalEntries: '保留条目', reset: '重置筛选' }, publicationFilters: { type: '类型', year: '年份', language: '语言', selectedOnly: '仅看精选', allTypes: '所有类型', allYears: '所有年份', allLanguages: '所有语言', selectedBadge: '精选', abstractSummary: '摘要', externalLink: '外部链接', noOnlineLink: '目前没有在线链接。', unspecifiedLanguage: '未说明语言', unspecifiedShort: '未知', totalEntries: '保留条目', selectedEntries: '精选条目' }, notes: { noPosts: '目前还没有笔记。请在 src/content/blog/ 中添加 Markdown 或 MDX 文件。', translationPolicyTitle: '翻译政策', translationPolicyText: '只要共享同一个 translationKey，一篇笔记就可以有多个语言版本。列表和详情页会先显示请求的语言，然后回退到英语，再回退到法语。', translationPolicyDetailText: '同一篇笔记请保持相同的 translationKey 和 slug。' },
    lastUpdated: '最近更新',
    originalPublication: '原始发布日期',
    autoTranslated: '本页由法语自动翻译而成。'
  },
  rus: {
    siteDescription: 'Личный сайт Patrick Jeuniaux: исследования, графы знаний, управление данными, искусственный интеллект и уголовное правосудие.',
    tagline: 'Специалист по когнитивным наукам · исследователь · директор по данным',
    nav: { about: 'Профиль', projects: 'Проекты', work: 'Работы', notes: 'Заметки', contact: 'Контакт', collaborations: 'Сотрудничество' },
    languageSwitcher: 'Языки', primaryNavLabel: 'Основная навигация', languageNavLabel: 'Выбор языка', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'Устойчивое интеллектуальное пространство для исследований, инфраструктур знания, управления данными и аналитического размышления.', footerBuild: 'Сайт создан на Astro. Библиографические данные берутся из BibTeX, PDF можно связывать через PCloud.', projectStatusFallback: 'Проект', projectFilters: { domain: 'Область', allDomains: 'Все области', status: 'Статус', role: 'Роль', startYear: 'Год начала', allStatus: 'Все статусы', allRoles: 'Все роли', allYears: 'Все годы', funder: 'Финансирующий орган', allFunders: 'Все финансирующие органы', totalEntries: 'Отобранные записи', reset: 'Сбросить фильтры' }, publicationFilters: { type: 'Тип', year: 'Год', language: 'Язык', selectedOnly: 'Только избранное', allTypes: 'Все типы', allYears: 'Все годы', allLanguages: 'Все языки', selectedBadge: 'Избранное', abstractSummary: 'Аннотация', externalLink: 'Внешняя ссылка', noOnlineLink: 'Онлайн-ссылка пока отсутствует.', unspecifiedLanguage: 'Язык не указан', unspecifiedShort: 'Неизв.', totalEntries: 'Отобранные записи', selectedEntries: 'Избранные записи' }, notes: { noPosts: 'Заметок пока нет. Добавьте файлы Markdown или MDX в src/content/blog/.', translationPolicyTitle: 'Политика перевода', translationPolicyText: 'Каждая заметка может существовать на нескольких языках, если она использует один и тот же translationKey. Списки и детальные страницы сначала показывают запрошенный язык, затем английский, затем французский.', translationPolicyDetailText: 'Для одной и той же заметки сохраняйте одинаковые translationKey и slug.' },
    lastUpdated: 'Последнее обновление',
    originalPublication: 'Дата оригинальной публикации',
    autoTranslated: 'Эта страница была автоматически переведена с французского.'
  },
  jpn: {
    siteDescription: 'Patrick Jeuniaux の個人サイト：研究、知識グラフ、データガバナンス、人工知能、刑事司法。',
    tagline: '認知科学スペシャリスト · 研究員 · データディレクター',
    nav: { about: 'プロフィール', projects: 'プロジェクト', work: '業績', notes: 'ノート', contact: '連絡先', collaborations: '連携' },
    languageSwitcher: '言語', primaryNavLabel: '主要ナビゲーション', languageNavLabel: '言語切替', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: '研究、知識基盤、データガバナンス、分析的省察のための安定した知的空間。', footerBuild: 'このサイトは Astro で構築されています。文献情報は BibTeX から取得され、PDF は PCloud からリンクできます。', projectStatusFallback: 'プロジェクト', projectFilters: { domain: '分野', allDomains: 'すべての分野', status: 'ステータス', role: '役割', startYear: '開始年', allStatus: 'すべてのステータス', allRoles: 'すべての役割', allYears: 'すべての年', funder: '資金提供者', allFunders: 'すべての資金提供者', totalEntries: '保持された項目', reset: 'フィルターをリセット' }, publicationFilters: { type: '種別', year: '年', language: '言語', selectedOnly: '選択のみ', allTypes: 'すべての種別', allYears: 'すべての年', allLanguages: 'すべての言語', selectedBadge: '選択', abstractSummary: '要約', externalLink: '外部リンク', noOnlineLink: '現在オンラインリンクはありません。', unspecifiedLanguage: '言語未指定', unspecifiedShort: '不明', totalEntries: '保持された項目', selectedEntries: '選択済み項目' }, notes: { noPosts: 'まだノートはありません。src/content/blog/ に Markdown または MDX ファイルを追加してください。', translationPolicyTitle: '翻訳方針', translationPolicyText: '同じ translationKey を共有していれば、一つのノートを複数言語で持つことができます。一覧と詳細ページは、まず要求された言語を表示し、次に英語、最後にフランス語へフォールバックします。', translationPolicyDetailText: '同じノートには同じ translationKey と slug を使ってください。' },
    lastUpdated: '最終更新日',
    originalPublication: '初回公開日',
    autoTranslated: 'このページはフランス語から自動翻訳されました。'
  },
  hin: {
    siteDescription: 'Patrick Jeuniaux की व्यक्तिगत वेबसाइट: शोध, ज्ञान ग्राफ, डेटा शासन, कृत्रिम बुद्धिमत्ता और आपराधिक न्याय।',
    tagline: 'संज्ञानात्मक विज्ञान विशेषज्ञ · शोधकर्ता · डेटा निदेशक',
    nav: { about: 'परिचय', projects: 'परियोजनाएँ', work: 'कार्य', notes: 'टिप्पणियाँ', contact: 'संपर्क', collaborations: 'सहयोग' },
    languageSwitcher: 'भाषाएँ', primaryNavLabel: 'मुख्य नेविगेशन', languageNavLabel: 'भाषा चयन', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'अनुसंधान, ज्ञान अवसंरचना, डेटा शासन और विश्लेषणात्मक चिंतन को समर्पित एक स्थिर बौद्धिक स्थान।', footerBuild: 'यह साइट Astro से बनाई गई है। ग्रंथसूची संदर्भ BibTeX से आते हैं और PDF को PCloud से जोड़ा जा सकता है।', projectStatusFallback: 'परियोजना', projectFilters: { domain: 'क्षेत्र', allDomains: 'सभी क्षेत्र', status: 'स्थिति', role: 'भूमिका', startYear: 'आरंभ वर्ष', allStatus: 'सभी स्थितियाँ', allRoles: 'सभी भूमिकाएँ', allYears: 'सभी वर्ष', funder: 'वित्तपोषक', allFunders: 'सभी वित्तपोषक', totalEntries: 'रखी गई प्रविष्टियाँ', reset: 'फ़िल्टर रीसेट करें' }, publicationFilters: { type: 'प्रकार', year: 'वर्ष', language: 'भाषा', selectedOnly: 'केवल चयनित', allTypes: 'सभी प्रकार', allYears: 'सभी वर्ष', allLanguages: 'सभी भाषाएँ', selectedBadge: 'चयनित', abstractSummary: 'सार', externalLink: 'बाहरी लिंक', noOnlineLink: 'फिलहाल कोई ऑनलाइन लिंक नहीं।', unspecifiedLanguage: 'अनिर्दिष्ट भाषा', unspecifiedShort: 'अज्ञात', totalEntries: 'रखी गई प्रविष्टियाँ', selectedEntries: 'चयनित प्रविष्टियाँ' }, notes: { noPosts: 'अभी कोई टिप्पणियाँ नहीं हैं। src/content/blog/ में Markdown या MDX फ़ाइलें जोड़ें।', translationPolicyTitle: 'अनुवाद नीति', translationPolicyText: 'हर टिप्पणी कई भाषाओं में मौजूद हो सकती है यदि वह एक ही translationKey साझा करे। सूचियाँ और विवरण पृष्ठ पहले माँगी गई भाषा दिखाते हैं, फिर अंग्रेज़ी, फिर फ़्रेंच।', translationPolicyDetailText: 'एक ही टिप्पणी के लिए वही translationKey और वही slug रखें।' },
    lastUpdated: 'अंतिम अद्यतन',
    originalPublication: 'मूल प्रकाशन तिथि',
    autoTranslated: 'यह पृष्ठ स्वचालित रूप से फ़्रेंच से अनुवादित किया गया था।'
  },
  ara: {
    siteDescription: 'الموقع الشخصي لـ Patrick Jeuniaux: البحث، الرسوم البيانية المعرفية، حوكمة البيانات، الذكاء الاصطناعي والعدالة الجنائية.',
    tagline: 'أخصائي في العلوم المعرفية · باحث · مدير البيانات',
    nav: { about: 'حول', projects: 'المشاريع', work: 'أعمال', notes: 'ملاحظات', contact: 'اتصال', collaborations: 'تعاون' },
    languageSwitcher: 'اللغات', primaryNavLabel: 'التنقل الرئيسي', languageNavLabel: 'مبدّل اللغة', footerTitle: 'Patrick P. J. M. H. Jeuniaux', footerText: 'فضاء فكري ثابت مخصص للبحث وبنى المعرفة وحوكمة البيانات والتأمل التحليلي.', footerBuild: 'بُني الموقع باستخدام Astro. تأتي المراجع الببليوغرافية من BibTeX ويمكن ربط ملفات PDF عبر PCloud.', projectStatusFallback: 'مشروع', projectFilters: { domain: 'المجال', allDomains: 'كل المجالات', status: 'الحالة', role: 'الدور', startYear: 'سنة البداية', allStatus: 'كل الحالات', allRoles: 'كل الأدوار', allYears: 'كل السنوات', funder: 'الجهة الممولة', allFunders: 'كل الجهات الممولة', totalEntries: 'المدخلات المعتمدة', reset: 'إعادة تعيين الفلاتر' }, publicationFilters: { type: 'النوع', year: 'السنة', language: 'اللغة', selectedOnly: 'المختار فقط', allTypes: 'كل الأنواع', allYears: 'كل السنوات', allLanguages: 'كل اللغات', selectedBadge: 'مختار', abstractSummary: 'ملخص', externalLink: 'رابط خارجي', noOnlineLink: 'لا يوجد رابط على الإنترنت حالياً.', unspecifiedLanguage: 'لغة غير محددة', unspecifiedShort: 'غير محدد', totalEntries: 'المدخلات المعتمدة', selectedEntries: 'المدخلات المختارة' }, notes: { noPosts: 'لا توجد ملاحظات حالياً. أضف ملفات Markdown أو MDX إلى src/content/blog/.', translationPolicyTitle: 'سياسة الترجمة', translationPolicyText: 'يمكن أن توجد كل ملاحظة بعدة لغات إذا كانت تشترك في translationKey نفسه. تعرض القوائم وصفحات التفاصيل اللغة المطلوبة أولاً، ثم الإنجليزية، ثم الفرنسية.', translationPolicyDetailText: 'للملاحظة نفسها، حافظ على translationKey نفسه وعلى slug نفسه.' },
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
