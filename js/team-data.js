// js/team-data.js

// --- INSTRUCTIONS ---
// This file is the single source of truth for your team page.
// To add a new member, copy an existing entry and add it to the correct array.
// To remove a member, simply delete their entry from the array.

// --- DATA FIELDS ---
// - name: Member's full name, including Chinese name if applicable.
// - role: Their position and tenure. Use <br> for line breaks.
// - photoSrc: The RELATIVE path to their photo from the `team` folder (e.g., "../img/photo.jpg").
// - orcid: (Optional) The full URL to their ORCID profile. Use null if they don't have one.
// - googleScholar: (Optional) The full URL to their Google Scholar profile. Use null if none.
// - email: (Optional) The member's email address.

// --- PRINCIPAL INVESTIGATOR ---
const piData = {
    name: "Weiran Zheng (郑蔚然)",
    title: "Associate Professor",
    photoSrc: "../img/d622efbb-fdda-451f-91d8-0e27b900b66f.jpg", // CORRECTED PATH
    email: "weiran.zheng@gtiit.edu.cn",
    orcid: "https://orcid.org/0000-0002-9915-6982",
    googleScholar: "https://scholar.google.com.hk/citations?user=hEpBUuYAAAAJ&hl=en",
    bio: `
        <h6>Employment</h6>
        <p>
        2022 — present <strong>Associate Professor</strong> Department of Chemistry, Guangdong Technion-Israel Institute of Technology<br>
        2017 — 2022 <strong>Research Fellow</strong> Hong Kong Polytechnic University<br>
        2015 — 2017 <strong>Postdoc Fellow</strong> Hong Kong Polytechnic University
        </p>
        <h6>Education</h6>
        <p>
        2009 — 2015 <strong>Ph.D. (Physical Chemistry)</strong> Wuhan University / University of Oxford (CSC joint PhD program)<br>
        2005 — 2009 <strong>B.S. (Chemistry)</strong> Wuhan University
        </p>
        <h6>Service</h6>
        <p>
        2024 — present <strong>Early Career Editorial Board Member</strong> of <strong>Journal of Electrochemistry (《电化学(中英文)》)</strong> (official journal of the Chinese Electrochemistry Society)<br>
        </p>
    `
};

// --- CURRENT MEMBERS ---
const currentMembers = [
    {
        name: "Jiajing Zhong (钟嘉敬)",
        role: "PhD student (Technion-GT)<br>2023 -",
        photoSrc: "../img/WechatIMG171.jpeg", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Sijie Chen (陈思捷)",
        role: "MSc student (Technion-GT)<br>2024 -",
        photoSrc: "../img/a25005dc4df4171109afb4a3efd090cf.JPG", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Ting Zhang (张婷)",
        role: "MSc student (SUSTech-GT)<br>2023 -",
        photoSrc: "../img/bc9f0bb4fe1cbc20f290c46000d6c702.JPG", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Zhaohan Wu (武昭翰)",
        role: "Undergraduate (21MSE)<br>2023 -",
        photoSrc: "../img/f2e7908ba3ded17dd17c033581a79250.webp", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Weike Liu (刘卫轲)",
        role: "Undergraduate (22Chem)<br>2024 -",
        photoSrc: "../img/7fc5c8360d2a86757e73696a7d7ca0f7.JPG", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Zhengyang Deng (邓征阳)",
        role: "Undergraduate (22Chem)<br>2024 -",
        photoSrc: "../img/Zhengyang Deng.jpg", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Guanxi Wu (吴冠希)",
        role: "Undergraduate (22Chem)<br>2024 -",
        photoSrc: "../img/4339e05276f975da75344856d6a2ea0e 2.JPG", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    }
];

// --- PREVIOUS MEMBERS ---
const previousMembers = [
    {
        name: "Jing Chen (陈晶)",
        role: "Research Associate<br>2022 - 2024",
        photoSrc: "../img/WechatIMG109.jpeg", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    },
    {
        name: "Lijie Du (杜礼杰)",
        role: "Research Associate<br>2023 - 2024",
        photoSrc: "../img/42f44f20efb0f6596b699aaabd2cceb3.webp", // CORRECTED PATH
        orcid: null,
        googleScholar: null
    }
];