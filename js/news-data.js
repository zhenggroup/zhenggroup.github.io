// js/news-data.js

// --- INSTRUCTIONS ---
// This is the only file you need to edit to update your website's news.
// To add a new news item, copy an existing block (from { to }),
// paste it at the TOP of the list, and edit the content.
//
// --- DATA FIELDS ---
// - id: A unique identifier for URL anchors (e.g., "paper-published-july-2025"). Must be unique.
// - date: The display date in "YYYY-MM-DD" format.
// - title: The news headline. This will be truncated on the homepage.
// - titleZh: Optional Chinese headline shown on the news page.
// - content: The full description. You can now use Markdown format (e.g., **bold**, *italic*, [link](url)) as well as HTML tags.
//
// --- IMAGE CONTROLS (OPTIONAL) ---
// - imageSrc: Path to image (e.g., "../img/my-image.jpg"). Use null for no image.
// - imageAlt: Alt text for the image (important for accessibility).
// - imageFloat: 'left', 'right', or null. If null, image is centered.
// - imageWidth: A CSS width string (e.g., '40%', '250px'). Use null for default.
// - imageCaption: A string for an image caption. Use null for no caption.

const newsData = [
  {
    id: "nsfc-general-program-2026",
    date: "2026-08-29",
    title: "Prof. Zheng was awarded the NSFC General Program (2027–2030)",
    titleZh: "郑蔚然副教授获国家自然科学基金面上项目资助（2027–2030）",
    content: `<p>Prof. Zheng has been awarded a General Program grant from the National Natural Science Foundation of China (NSFC). The project period is 2027–2030.</p>
<p lang="zh-CN">郑蔚然副教授获国家自然科学基金面上项目资助，项目执行期为2027–2030年。</p>`,
    imageAlt: " ",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "paper-published-ctr-2026",
    date: "2026-08-29",
    title: "Prof. Zheng's Perspective on charge-transfer resistance and intrinsic activity is published on ACS Electrochemistry",
    titleZh: "郑蔚然副教授关于电荷转移电阻与本征活性的Perspective发表于ACS Electrochemistry",
    content: `<p>Prof. Zheng's Perspective, "<a href="https://doi.org/10.1021/acselectrochem.6c00329" target="_blank" rel="noopener noreferrer">Does Low Charge-Transfer Resistance Justify High Intrinsic Activity of Electrocatalysts?</a>", is published in <a href="https://doi.org/10.1021/acselectrochem.6c00329" target="_blank" rel="noopener noreferrer">ACS Electrochemistry</a>.</p>
<p>The article examines whether a low charge-transfer resistance can be taken as evidence of high intrinsic electrocatalyst activity, and discusses the pitfalls of using impedance-derived metrics for activity benchmarking.</p>
<p lang="zh-CN">郑蔚然副教授的Perspective论文“<a href="https://doi.org/10.1021/acselectrochem.6c00329" target="_blank" rel="noopener noreferrer">Does Low Charge-Transfer Resistance Justify High Intrinsic Activity of Electrocatalysts?</a>”发表于<a href="https://doi.org/10.1021/acselectrochem.6c00329" target="_blank" rel="noopener noreferrer">ACS Electrochemistry</a>。</p>
<p lang="zh-CN">文章讨论低电荷转移电阻能否作为电催化剂本征活性高的判据，并分析用阻抗衍生指标评价活性时的常见误区。</p>`,
    imageSrc: "../img/charge-transfer-resistance-activity-toc.png",
    imageAlt: "TOC graphic of local charge-transfer resistances on an electrocatalyst surface",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "ecs-2026",
    date: "2026-05-24",
    title: "Prof. Zheng delivers talks at the Oregon Center for Electrochemistry and the 249th ECS Meeting",
    titleZh: "郑蔚然副教授在俄勒冈电化学中心和第249届ECS年会作报告",
    content: `<p>Prof. Zheng recently delivered talks at the Oregon Center for Electrochemistry on "in situ method for electrode deactivation analysis" and the 249th ECS Meeting on "time-resolved electrochemical impedance analysis for electrocatalyst degradation study".</p>
<p lang="zh-CN">郑蔚然副教授近日在俄勒冈电化学中心作题为“电极失活分析的原位方法”的报告，并在第249届ECS年会上作题为“用于电催化剂降解研究的时间分辨电化学阻抗分析”的报告。</p>`,
    imageSrc: "../img/ecs249.jpg",
    imageAlt: "Prof. Zheng at the 249th ECS Meeting",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "yinshi-2026",
    date: "2026-04-22",
    title: "Yingshi Su's papers published on Electrochimica Acta and Journal of Physical Chemistry C",
    titleZh: "苏颖诗的论文发表于Electrochimica Acta和The Journal of Physical Chemistry C",
    content: `<p>Yingshi Su's papers, "<a href="https://doi.org/10.1016/j.electacta.2026.148501" target="_blank" rel="noopener noreferrer">Time-Resolved Analysis of the FTO Surface Dynamics in Aqueous Solution</a>" and "<a href="https://doi.org/10.1021/acs.jpcc.6c00506" target="_blank" rel="noopener noreferrer">Spectroelectrochemical Evolution of Fluorine-Doped Tin Oxide in Aqueous Electrolyte</a>", are published in <a href="https://doi.org/10.1016/j.electacta.2026.148501" target="_blank" rel="noopener noreferrer">Electrochimica Acta</a> and <a href="https://doi.org/10.1021/acs.jpcc.6c00506" target="_blank" rel="noopener noreferrer">The Journal of Physical Chemistry C</a>.</p>
<p>The studies track how fluorine-doped tin oxide (FTO) electrodes evolve chemically, optically, and electrically in aqueous electrolytes, mapping surface dynamics that matter for choosing transparent substrates in in situ spectroelectrochemistry.</p>
<p lang="zh-CN">苏颖诗的论文“<a href="https://doi.org/10.1016/j.electacta.2026.148501" target="_blank" rel="noopener noreferrer">Time-Resolved Analysis of the FTO Surface Dynamics in Aqueous Solution</a>”和“<a href="https://doi.org/10.1021/acs.jpcc.6c00506" target="_blank" rel="noopener noreferrer">Spectroelectrochemical Evolution of Fluorine-Doped Tin Oxide in Aqueous Electrolyte</a>”分别发表于<a href="https://doi.org/10.1016/j.electacta.2026.148501" target="_blank" rel="noopener noreferrer">Electrochimica Acta</a>和<a href="https://doi.org/10.1021/acs.jpcc.6c00506" target="_blank" rel="noopener noreferrer">The Journal of Physical Chemistry C</a>。</p>
<p lang="zh-CN">这两项工作追踪氟掺杂氧化锡（FTO）电极在水溶液中的化学、光学和电学演化，为原位光谱电化学选择透明基底提供依据。</p>`,
    imageAlt: " ",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "zheng-2026",
    date: "2026-03-20",
    title: "Prof. Zheng's tutorial paper on in situ electrochemistry is published on ACS Electrochemistry",
    titleZh: "郑蔚然副教授关于原位电化学的教程论文发表于ACS Electrochemistry",
    content: `<p>Prof. Zheng's tutorial/viewpoint paper, "<a href="https://doi.org/10.1021/acselectrochem.6c00058" target="_blank" rel="noopener noreferrer">Seeing Isn't Always Believing: Experimental and Interpretive Traps of In Situ/Operando Electrocatalysis</a>", is published in <a href="https://doi.org/10.1021/acselectrochem.6c00058" target="_blank" rel="noopener noreferrer">ACS Electrochemistry</a>.</p>
<p>The paper argues that in situ and operando measurements can perturb the interface or over-weight spectator signals, and outlines experimental and interpretive traps that can yield internally consistent but misleading mechanistic claims.</p>
<p lang="zh-CN">郑蔚然副教授的教程/观点论文“<a href="https://doi.org/10.1021/acselectrochem.6c00058" target="_blank" rel="noopener noreferrer">Seeing Isn't Always Believing: Experimental and Interpretive Traps of In Situ/Operando Electrocatalysis</a>”发表于<a href="https://doi.org/10.1021/acselectrochem.6c00058" target="_blank" rel="noopener noreferrer">ACS Electrochemistry</a>。</p>
<p lang="zh-CN">文章指出原位/operando测量可能扰动界面或过度解读旁观物种信号，并梳理可能导致“数据自洽但机理误判”的实验与解释陷阱。</p>`,
    imageAlt: " ",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "award-sijie-2026",
    date: "2026-03-17",
    title: "Sijie Chen is awarded the Excellent Graduate Student of Academic year 2024-2025",
    titleZh: "陈思捷获2024–2025学年优秀研究生称号",
    content: `<p>Sijie Chen has been awarded the Excellent Graduate Student of Academic year 2024-2025. Congratulations!</p>
<p lang="zh-CN">陈思捷获2024–2025学年优秀研究生称号。祝贺！</p>`,
    imageAlt: " ",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "paper-published-cm",
    date: "2025-12-03",
    title: "Sijie Chen's paper on instability of FTO is published on Chemistry of Materials (featured on the cover)",
    titleZh: "陈思捷关于柔性ITO不稳定性的论文发表于Chemistry of Materials（封面文章）",
    content: `<p>Sijie Chen's paper, "<a href="https://doi.org/10.1021/acs.chemmater.5c01720" target="_blank" rel="noopener noreferrer">Electrochemical Instability of Flexible Indium Tin Oxide Film: A Time-Resolved Operando Study</a>", is published in <a href="https://doi.org/10.1021/acs.chemmater.5c01720" target="_blank" rel="noopener noreferrer">Chemistry of Materials</a> and featured on the cover.</p>
<p>Flexible ITO-PET electrodes lose electrical conductivity and optical transparency under electrochemical operation. The study uses ex situ and operando measurements to follow how the ITO coating degrades in aqueous electrolytes.</p>
<p lang="zh-CN">陈思捷的论文“<a href="https://doi.org/10.1021/acs.chemmater.5c01720" target="_blank" rel="noopener noreferrer">Electrochemical Instability of Flexible Indium Tin Oxide Film: A Time-Resolved Operando Study</a>”发表于<a href="https://doi.org/10.1021/acs.chemmater.5c01720" target="_blank" rel="noopener noreferrer">Chemistry of Materials</a>，并被选为封面文章。</p>
<p lang="zh-CN">柔性ITO-PET电极在电化学条件下会失去导电性和光学透过率。该工作结合非原位与operando测量，追踪ITO涂层在水溶液中的降解过程。</p>`,
    imageSrc: "../img/10.jpg",
    imageAlt: "Chemistry of Materials cover",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: "Chemistry of Materials (Vol 38/Issue 4 2026)"
  },
  {
    id: "zhengtalk",
    date: "2025-11-25",
    title: "Prof. Zheng delivers an invited talk at the ICAE 2025 (Jeju, Korea)",
    titleZh: "郑蔚然副教授在ICAE 2025（韩国济州）作邀请报告",
    content: `<p>Prof. Zheng presented an invited talk on the 8th International Conference on Advanced Electromaterials (ICAE 2025) on the topic of "Catalyst Deactivation Analysis by In Situ Electrochemistry". The conference is organized by the Korean Institute of Electrical and Electronic Material Engineers.</p>
<p lang="zh-CN">郑蔚然副教授在韩国济州举行的第8届先进电子材料国际会议（ICAE 2025）上作邀请报告，题目为“Catalyst Deactivation Analysis by In Situ Electrochemistry”。会议由韩国电气电子材料工程师学会主办。</p>`,
    imageSrc: "../img/icae2025.jpg",
    imageAlt: " ",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: " "
  },
  {
    id: "paper-published-jacsau",
    date: "2025-11-17",
    title: "Our paper on time-resolved EIS is published on JACS Au (featured on cover)",
    titleZh: "时间分辨EIS方法论文发表于JACS Au（封面文章）",
    content: `<p>Prof. Zheng and Sijie Chen's paper, "<a href="https://doi.org/10.1021/jacsau.5c01196" target="_blank" rel="noopener noreferrer">Decoding Electrocatalyst Degradation Using Time-Resolved Electrochemical Impedance Analysis</a>", is published in <a href="https://doi.org/10.1021/jacsau.5c01196" target="_blank" rel="noopener noreferrer">JACS Au</a>, featured on the cover and in the special collection <a href="https://pubs.acs.org/page/jaaucr/vc/jacs-au-ecab-selects" target="_blank" rel="noopener noreferrer">JACS Au ECAB Selects</a>.</p>
<p>The work introduces a time-resolved electrochemical impedance analysis (tr-EIA) protocol that tracks current or overpotential, double-layer capacitance, charge-transfer resistance, and related parameters in a single experiment, distinguishing structural from kinetic degradation of commercial RuO<sub>2</sub> and Pt/C catalysts.</p>
<p lang="zh-CN">郑蔚然副教授与陈思捷的论文“<a href="https://doi.org/10.1021/jacsau.5c01196" target="_blank" rel="noopener noreferrer">Decoding Electrocatalyst Degradation Using Time-Resolved Electrochemical Impedance Analysis</a>”发表于<a href="https://doi.org/10.1021/jacsau.5c01196" target="_blank" rel="noopener noreferrer">JACS Au</a>，入选封面文章，并被收入特刊合集<a href="https://pubs.acs.org/page/jaaucr/vc/jacs-au-ecab-selects" target="_blank" rel="noopener noreferrer">JACS Au ECAB Selects</a>。</p>
<p lang="zh-CN">该工作提出时间分辨电化学阻抗分析（tr-EIA）方法，可在一次实验中追踪电流或过电位、双电层电容、电荷转移电阻等参数，从而区分商业RuO<sub>2</sub>和Pt/C催化剂的结构性与动力学降解。</p>`,
    imageSrc: "../img/9.jpg",
    imageAlt: "JACSAu cover",
    imageFloat: 'right',
    imageWidth: '30%',
    imageCaption: "JACS Au cover (Vol 5/Issue 12 2025)"
  },
  {
    id: "paper-published-jpcc-2025",
    date: "2025-07-20",
    title: "Sijie Chen and Ting Zhang's paper on RuO<sub>2</sub>-catalyzed ammonia electrooxidation is published (featured on the cover of JPCC)",
    titleZh: "陈思捷与张婷关于RuO<sub>2</sub>催化氨电氧化的论文发表于JPCC（封面文章）",
    content: `<p>Sijie Chen and Ting Zhang's paper, "<a href="https://doi.org/10.1021/acs.jpcc.5c02770" target="_blank" rel="noopener noreferrer">Selective Ammonia Electrooxidation on RuO<sub>2</sub>: Competitive and Synergistic Interplay between Ammonia and Hydroxide</a>", is published in <a href="https://doi.org/10.1021/acs.jpcc.5c02770" target="_blank" rel="noopener noreferrer">The Journal of Physical Chemistry C</a>, featured on the front cover and in the special issue “Jacek Lipkowski Festschrift”.</p>
<p>Alkaline ammonia electrooxidation on RuO<sub>2</sub> is examined with DEMS and UV–vis spectroelectrochemistry. NO and NO<sub>3</sub><sup>−</sup> dominate at high OH<sup>−</sup> concentration and potential, while NH<sub>3</sub> competes with the oxygen evolution reaction for surface sites.</p>
<p lang="zh-CN">陈思捷与张婷的论文“<a href="https://doi.org/10.1021/acs.jpcc.5c02770" target="_blank" rel="noopener noreferrer">Selective Ammonia Electrooxidation on RuO<sub>2</sub>: Competitive and Synergistic Interplay between Ammonia and Hydroxide</a>”发表于<a href="https://doi.org/10.1021/acs.jpcc.5c02770" target="_blank" rel="noopener noreferrer">The Journal of Physical Chemistry C</a>，入选封面文章，并被收入“Jacek Lipkowski Festschrift”专刊。</p>
<p lang="zh-CN">结合DEMS和紫外–可见光谱电化学，研究碱性条件下RuO<sub>2</sub>上的氨电氧化。高OH<sup>−</sup>浓度和高电位时主要以NO和NO<sub>3</sub><sup>−</sup>为主，NH<sub>3</sub>会与析氧反应竞争表面位点。</p>`,
    imageSrc: "../img/7.jpg",
    imageAlt: "JPCC cover",
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: "JPCC cover (Vol 129/Issue 27 2025)"
  },
  {
    id: "python-may-2025",
    date: "2025-05-18",
    title: "Prof. Zheng delivered a short course at the 247th ECS Meeting in Montreal, Canada",
    titleZh: "郑蔚然副教授在第247届ECS年会（蒙特利尔）开设短课程",
    content: `<p>Prof. Zheng delivered an ECS short course on "Introducing Python for Electrochemistry Research" at the 247th ECS Meeting in Montreal, Canada.</p>
<p>This course is designed for electrochemists at all levels who are interested in incorporating Python into their research workflows. Specifically, this course is intended for: Electrochemists with little to no experience with Python but are eager to learn its applications in research; Researchers who spend significant time with repetitive tasks like data processing, plotting, and format adjustments; Researchers who want to reduce reliance on commercial software and transition to a versatile, open source platform.</p>
<p lang="zh-CN">郑蔚然副教授在加拿大蒙特利尔举行的第247届ECS年会上开设短课程“Introducing Python for Electrochemistry Research”。</p>
<p lang="zh-CN">课程面向希望将Python用于电化学研究的各层次研究者，包括几乎没有Python经验、希望减少重复数据处理并逐步摆脱商业软件的科研人员。</p>`,
    imageSrc: "../img/25ecs.jpeg",
    imageAlt: null,
    imageFloat: 'right',
    imageWidth: '30%',
    imageCaption: "Short Course on Python in Electrochemistry"
  },
  {
    id: "online-lecture-feb-2025",
    date: "2025-02-10",
    title: "Prof. Zheng delivered an online lecture on Operando Methods",
    titleZh: "郑蔚然副教授作Operando方法在线讲座",
    content: `<p>Prof. Zheng delivered an online lecture on “Operando methods for Electrocatalyst Degradation Analysis” (Chinese): <a class="brand-icon-link" href="https://www.bilibili.com/video/BV1bzN4efEDM/" target="_blank" rel="noopener noreferrer"><span class="simple-icon simple-icon-bilibili" aria-hidden="true"></span>View Lecture</a></p>
<p lang="zh-CN">郑蔚然副教授作中文在线讲座“电催化剂降解分析的Operando方法”：<a class="brand-icon-link" href="https://www.bilibili.com/video/BV1bzN4efEDM/" target="_blank" rel="noopener noreferrer"><span class="simple-icon simple-icon-bilibili" aria-hidden="true"></span>观看讲座</a></p>`,
    imageSrc: "../img/keyanyun.jpg",
    imageAlt: null,
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: "Webinar at 科研云"
  },
  {
    id: "poster-award-sijie-2024",
    date: "2024-10-25",
    title: "Sijie Chen wins 2nd place in MATEC poster competition",
    titleZh: "陈思捷在MATEC海报竞赛中获二等奖",
    content: `<p>Ms. Sijie Chen’s poster on ammonia electrooxidation is recognized as the 2nd place in the ‘best poster’ award in the MATEC poster competition.</p>
<p lang="zh-CN">陈思捷关于氨电氧化的海报在MATEC海报竞赛中获最佳海报二等奖。</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "paper-published-electrochimica-acta-2024",
    date: "2024-10-15",
    title: "Paper on Bismuth doping in copper oxides published in Electrochimica Acta",
    titleZh: "钟嘉敬关于铋掺杂铜氧化物的论文发表于Electrochimica Acta",
    content: `<p>Jiajing Zhong's paper, "<a href="https://doi.org/10.1016/j.electacta.2024.145178" target="_blank" rel="noopener noreferrer">Bismuth Doping Unlocks Stability of Copper Oxides in Anodic Reaction: A Case Analysis of Glucose Electrooxidation</a>", is published in <a href="https://doi.org/10.1016/j.electacta.2024.145178" target="_blank" rel="noopener noreferrer">Electrochimica Acta</a>.</p>
<p>The study shows that bismuth doping stabilizes copper oxide anodes during glucose electrooxidation, helping the catalyst resist reconstruction and activity loss under anodic conditions.</p>
<p lang="zh-CN">钟嘉敬的论文“<a href="https://doi.org/10.1016/j.electacta.2024.145178" target="_blank" rel="noopener noreferrer">Bismuth Doping Unlocks Stability of Copper Oxides in Anodic Reaction: A Case Analysis of Glucose Electrooxidation</a>”发表于<a href="https://doi.org/10.1016/j.electacta.2024.145178" target="_blank" rel="noopener noreferrer">Electrochimica Acta</a>。</p>
<p lang="zh-CN">研究表明铋掺杂可稳定铜氧化物阳极在葡萄糖电氧化中的结构，减轻阳极条件下的重构与活性衰减。</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "paper-published-acs-energy-lett-2024",
    date: "2024-09-05",
    title: "Paper on graphite counter electrodes published in ACS Energy Letters",
    titleZh: "郑蔚然副教授与杜礼杰关于石墨对电极适用性的论文发表于ACS Energy Letters",
    content: `<p>Prof. Zheng and Lijie Du's paper, "<a href="https://doi.org/10.1021/acsenergylett.4c01869" target="_blank" rel="noopener noreferrer">Applicability of Graphite as Anodic Counter Electrode for Electrocatalyst Evaluation</a>", is published in <a href="https://doi.org/10.1021/acsenergylett.4c01869" target="_blank" rel="noopener noreferrer">ACS Energy Letters</a>.</p>
<p>Graphite is a convenient anodic counter electrode, but it can corrode and release CO/CO<sub>2</sub> that interfere with the working electrode. The paper recommends separators, careful CV settings, and polishing to reduce contamination, especially in hydrogen evolution studies.</p>
<p lang="zh-CN">郑蔚然副教授与杜礼杰的论文“<a href="https://doi.org/10.1021/acsenergylett.4c01869" target="_blank" rel="noopener noreferrer">Applicability of Graphite as Anodic Counter Electrode for Electrocatalyst Evaluation</a>”发表于<a href="https://doi.org/10.1021/acsenergylett.4c01869" target="_blank" rel="noopener noreferrer">ACS Energy Letters</a>。</p>
<p lang="zh-CN">石墨作为阳极对电极使用方便，但可能腐蚀并释放CO/CO<sub>2</sub>而干扰工作电极。文章建议使用隔膜、谨慎设置CV参数并打磨电极，以降低污染，尤其是在析氢研究中。</p>`,
    imageSrc: "../img/24acse.jpeg",
    imageAlt: null,
    imageFloat: 'left',
    imageWidth: '30%',
    imageCaption: 'Potential/current relationship in a three-electrode cell',
  },
  {
    id: "paper-published-jcat-2024",
    date: "2024-08-18",
    title: "Paper on ammonia electrooxidation on NiOOH published in Journal of Catalysis",
    titleZh: "陈晶与陈思捷关于NiOOH上氨电氧化的论文发表于Journal of Catalysis",
    content: `<p>Jing Chen and Sijie Chen's paper, "<a href="https://doi.org/10.1016/j.jcat.2024.115720" target="_blank" rel="noopener noreferrer">Correlative In Situ Analysis of the Role of Oxygen on Ammonia Electrooxidation Selectivity on NiOOH Surfaces</a>", is published in <a href="https://doi.org/10.1016/j.jcat.2024.115720" target="_blank" rel="noopener noreferrer">Journal of Catalysis</a>.</p>
<p>Using correlative in situ measurements, the work shows how oxygen-containing species on NiOOH surfaces steer product selectivity during ammonia electrooxidation.</p>
<p lang="zh-CN">陈晶与陈思捷的论文“<a href="https://doi.org/10.1016/j.jcat.2024.115720" target="_blank" rel="noopener noreferrer">Correlative In Situ Analysis of the Role of Oxygen on Ammonia Electrooxidation Selectivity on NiOOH Surfaces</a>”发表于<a href="https://doi.org/10.1016/j.jcat.2024.115720" target="_blank" rel="noopener noreferrer">Journal of Catalysis</a>。</p>
<p lang="zh-CN">通过关联原位测量，该工作表明NiOOH表面含氧物种如何影响氨电氧化的产物选择性。</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "ecs-webinar-python-2024",
    date: "2024-08-01",
    title: "Dr. Zheng delivered an ECS Webinar on Python for Electrochemistry with >4k audience",
    titleZh: "郑蔚然副教授作ECS Python电化学网络讲座，观众逾4000人",
    content: `<p>Dr. Weiran Zheng delivered an ECS Webinar on the topic of “Introducing Python for Electrochemistry Research”. <a href="https://physicsworld.com/a/introducing-python-for-electrochemistry-research/" target="_blank" rel="noopener noreferrer">Watch Webinar</a></p>
<p lang="zh-CN">郑蔚然副教授作ECS网络讲座“Introducing Python for Electrochemistry Research”，观众超过4000人。<a href="https://physicsworld.com/a/introducing-python-for-electrochemistry-research/" target="_blank" rel="noopener noreferrer">观看讲座</a></p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "talk-at-ciac-cas-2024",
    date: "2024-05-24",
    title: "Weiran Zheng delivered a talk at CIAC, Chinese Academy of Sciences",
    titleZh: "郑蔚然副教授在中国科学院长春应用化学研究所作报告",
    content: `<p>Invited by Prof. Wenhui He, Prof. Weiran Zheng delivered an invited lecture on “In-situ Analysis of Electrocatalyst Deactivation” at the Changchun Institute of Applied Chemistry (CIAC), Chinese Academy of Sciences.</p>
<p lang="zh-CN">应中国科学院长春应用化学研究所何文辉研究员邀请，郑蔚然副教授作关于“电催化剂失活过程的原位研究策略”的报告。</p>`,
    imageSrc: "../img/791fda8a572e0f4286e082e46dc912bf.JPG",
    imageAlt: "Weiran Zheng giving a presentation at a lectern.",
    imageFloat: 'right',
    imageWidth: '30%',
    imageCaption: "Prof. Zheng presenting at CIAC."
  },
  {
    id: "paper-published-apl-energy-2024",
    date: "2024-03-18",
    title: "Lijie Du’s paper is published on APL Energy",
    titleZh: "杜礼杰的综述发表于APL Energy",
    content: `<p>Lijie Du's review, "<a href="https://doi.org/10.1063/5.0191316" target="_blank" rel="noopener noreferrer">Catalyst Deactivation during Water Electrolysis: Understanding and Mitigation</a>", is published in <a href="https://doi.org/10.1063/5.0191316" target="_blank" rel="noopener noreferrer">APL Energy</a>.</p>
<p>The review discusses structural factors behind catalyst deactivation in water electrolysis, with case studies of hydrogen and oxygen evolution, and calls for more consistent test protocols and in situ evidence.</p>
<p lang="zh-CN">杜礼杰的综述“<a href="https://doi.org/10.1063/5.0191316" target="_blank" rel="noopener noreferrer">Catalyst Deactivation during Water Electrolysis: Understanding and Mitigation</a>”发表于<a href="https://doi.org/10.1063/5.0191316" target="_blank" rel="noopener noreferrer">APL Energy</a>。</p>
<p lang="zh-CN">综述讨论电解水中催化剂失活的结构因素，结合析氢和析氧案例，并呼吁更统一的测试规范与原位证据。</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "talk-at-244th-ecs-meeting-2023",
    date: "2023-10-11",
    title: "Weiran Zheng delivered a talk at the 244th ECS Meeting, Gothenburg, Sweden",
    titleZh: "郑蔚然副教授在第244届ECS年会（哥德堡）作报告",
    content: `<p>At the 244th Electrochemical Society (ECS) Meeting, Prof. Weiran Zheng delivered an oral presentation on “How to perform iR compensation in electrocatalytic study”.</p>
<p lang="zh-CN">在第244次美国电化学学会（ECS）年会上，郑蔚然副教授就“电催化研究中的iR校正原理与规范”作口头报告。</p>`,
    imageSrc: "../img/530b6f0ea5ae43d916f7de211361d9a5.JPG",
    imageAlt: "Weiran Zheng standing in front of an ECS poster.",
    imageFloat: 'left',
    imageWidth: '280px',
    imageCaption: "Presenting at the 244th ECS Meeting in Gothenburg."
  }
];
