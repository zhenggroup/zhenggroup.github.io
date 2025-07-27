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
// - content: The full description. You can use HTML tags like <p>, <a>, <strong>.
//
// --- IMAGE CONTROLS (OPTIONAL) ---
// - imageSrc: Path to image (e.g., "../img/my-image.jpg"). Use null for no image.
// - imageAlt: Alt text for the image (important for accessibility).
// - imageFloat: 'left', 'right', or null. If null, image is centered.
// - imageWidth: A CSS width string (e.g., '40%', '250px'). Use null for default.
// - imageCaption: A string for an image caption. Use null for no caption.

const newsData = [
  {
    id: "paper-published-jpcc-2025",
    date: "2025-07-20",
    title: "Sijie and Ting Zhang's paper on RuO2-catalyzed ammonia electrooxidation is published",
    content: `<p>Sijie and Ting Zhang's paper on RuO2-catalyzed ammonia electrooxidation is published in <a href="https://doi.org/10.1021/acs.jpcc.5c02770" target="_blank" rel="noopener noreferrer">The Journal of Physical Chemistry C</a>, featured as front cover.</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "online-lecture-feb-2025",
    date: "2025-02-10",
    title: "Prof. Zheng delivered an online lecture on Operando Methods",
    content: `<p>Prof. Zheng delivered an online lecture on “Operando methods for Electrocatalyst Degradation Analysis” (Chinese): <a href="https://www.bilibili.com/video/BV1bzN4efEDM/" target="_blank" rel="noopener noreferrer">View Lecture</a></p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "poster-award-sijie-2024",
    date: "2024-10-25",
    title: "Sijie Chen wins 2nd place in MATEC poster competition",
    content: "<p>Ms. Sijie Chen’s poster on ammonia electrooxidation is recognized as the 2nd place in the ‘best poster’ award in the MATEC poster competition.</p>",
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
    content: `<p>“Bismuth doping unlocks stability of copper oxides in anodic reaction: A case analysis of glucose electrooxidation” is published on <a href="https://doi.org/10.1016/j.electacta.2024.145178" target="_blank" rel="noopener noreferrer">Electrochimica Acta</a>.</p>`,
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
    content: `<p>“Applicability of Graphite as Anodic Counter Electrode for Electrocatalyst Evaluation” is published on <a href="https://doi.org/10.1021/acsenergylett.4c01869" target="_blank" rel="noopener noreferrer">ACS Energy Letters</a>.</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "paper-published-jcat-2024",
    date: "2024-08-18",
    title: "Paper on ammonia electrooxidation on NiOOH published in Journal of Catalysis",
    content: `<p>"Correlative in situ analysis of the role of oxygen on ammonia electrooxidation selectivity on NiOOH surfaces” is published on <a href="https://doi.org/10.1016/j.jcat.2024.115720" target="_blank" rel="noopener noreferrer">Journal of Catalysis</a>.</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "ecs-webinar-python-2024",
    date: "2024-08-01",
    title: "Dr. Zheng delivered an ECS Webinar on Python for Electrochemistry",
    content: `<p>Dr. Weiran Zheng delivered an ECS Webinar on the topic of “Introducing Python for Electrochemistry Research”. <a href="https://physicsworld.com/a/introducing-python-for-electrochemistry-research/" target="_blank" rel="noopener noreferrer">Watch Webinar</a></p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "talk-at-ciac-cas-2024",
    date: "2024-05-24",
    title: "Weiran Zheng delivered a talk at CIAC, CAS",
    content: `<p>Invited by Prof. Wenhui He, Prof. Weiran Zheng delivered an invited lecture on “In-situ Analysis of Electrocatalyst Deactivation” at the Changchun Institute of Applied Chemistry (CIAC), Chinese Academy Of Sciences.</p><p>应中国科学院长春应用化学研究所何文辉研究员邀请，郑蔚然副教授作关于“电催化剂失活过程的原位研究策略”的报告。</p>`,
    imageSrc: "../img/791fda8a572e0f4286e082e46dc912bf.JPG",
    imageAlt: "Weiran Zheng giving a presentation at a lectern.",
    imageFloat: 'right', // DEMO: Image will float to the right
    imageWidth: '30%',   // DEMO: Image will take up 45% of the container width
    imageCaption: "Prof. Zheng presenting at CIAC."
  },
  {
    id: "paper-published-apl-energy-2024",
    date: "2024-03-18",
    title: "Lijie Du’s paper is published on APL Energy",
    content: `<p>Link to the paper: <a href="https://pubs.aip.org/aip/ape/article/2/2/021501/3284761" target="_blank" rel="noopener noreferrer">Catalyst deactivation during water electrolysis: Understanding and mitigation</a>.</p><p>The paper explores the structural factors contributing to catalyst deactivation, elucidating the underlying mechanisms with detailed case studies of hydrogen and oxygen evolution reactions. The review concludes by emphasizing the necessity for universal test protocols for deactivation and integrating evidence from diverse in situ measurements.</p>`,
    imageSrc: null,
    imageAlt: null,
    imageFloat: null,
    imageWidth: null,
    imageCaption: null
  },
  {
    id: "talk-at-244th-ecs-meeting-2023",
    date: "2023-10-11",
    title: "Weiran Zheng delivered a talk at 244th ECS Meeting",
    content: `<p>At the 244th Electrochemical Society (ECS) Meeting, Prof. Weiran Zheng delivered an oral presentation on “How to perform iR compensation in electrocatalytic study”.</p><p>在第244次美国电化学学会（ECS）年会上，郑蔚然副教授就“电催化研究中的iR校正原理与规范”作口头报告。</p>`,
    imageSrc: "../img/530b6f0ea5ae43d916f7de211361d9a5.JPG",
    imageAlt: "Weiran Zheng standing in front of an ECS poster.",
    imageFloat: 'left', // DEMO: Image will float to the left
    imageWidth: '280px', // DEMO: Image will have a fixed width
    imageCaption: "Presenting at the 244th ECS Meeting in Gothenburg."
  }
];