// js/publications-data.js

const allPublications = [
    // 2025
/*    {
        number: 47, year: 2025, type: "Article",
        authors: "K. Wang, Z. Zhu, Y. Liu, <u>W. Zheng</u>, Z. Yuan, Z. Lin, R. Semiat, L. Shao, X. He*",
        title: "Adsorption-enhanced carbon membranes derived from copolyimide for ultrafast sub-angstrom discriminating CO2 separation",
        journal: "Science Advances, 2025",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC for Adsorption-enhanced carbon membranes"
        // Add DOI, PDF, comments, featuredIn, dimensionsDoi if available
    }, */
    {
        number: 46, year: 2025, type: "Article",
        authors: "<b><u>S. Chen</u></b>,^ <b><u>T. Zhang</u></b>,^ L. Zheng, J. Gao, X. Huang, J. Gu, C. Vogt,&nbsp;<b><u>W. Zheng</u></b>*",
        title: "Selective Ammonia Electrooxidation on RuO2: Competitive and Synergistic Interplay between Ammonia and Hydroxide",
        journal: "The Journal of Physical Chemistry C, 2025, accepted",
        doi: "10.1021/acs.jpcc.5c02770",
        imageUrl: "../img/Screenshot%202025-04-30%20at%208.27.41%E2%80%AFPM.png", imageAlt: "TOC for Selective Ammonia Electrooxidation",
        dimensionsDoi: "10.1021/acs.jpcc.5c02770"
    }, 
    {
        number: 45, year: 2025, type: "Invited Review",
        authors: "<b><u>W. Zheng</u></b>*",
        title: "Spatiotemporal visualisation of electrocatalyst/electrolyte interfaces with electrochemical atomic force microscopy: Applications and notes",
        journal: "Journal of Microscopy, 2025, online",
        doi: "10.1111/jmi.13401",
        imageUrl: "../img/jmi13401-fig-0006-m.png", imageAlt: "TOC for Spatiotemporal visualisation",
        dimensionsDoi: "10.1111/jmi.13401"
    },
    {
        number: 44, year: 2025, type: "Article",
        authors: "J. Ge,^&nbsp;<b><u>J. Zhong</u></b>,^&nbsp;<b><u>S. Chen</u></b>, <b><u>Z. Wu</u></b>, Y. Li,* W. He,* <b><u>W. Zheng</u></b>*",
        title: "Upcycling Industrial Resin to Transition Metal-Modulated N-Doped Carbon Electrocatalysts for Durable Oxygen Evolution Reaction",
        journal: "ACS Applied Engineering Materials, 2025, 3, 3, 718–727",
        doi: "10.1021/acsaenm.5c00053",
        imageUrl: "../img/em5c00053_0009.webp", imageAlt: "TOC for Upcycling Industrial Resin",
        dimensionsDoi: "10.1021/acsaenm.5c00053"
    },
    {
        number: 43, year: 2025, type: "Article",
        authors: "X. Wang, Y. Wu, Y. Zhou, <u>W. Zheng</u>, K. Zhang, X. Ma, T. Bai, D. Li,* L. Ci,* C. P. Grey, J. Lu*",
        title: "Interface Engineering with an Organic Aluminum Additive for High-Rate Sodium Metal Batteries",
        journal: "Advanced Functional Materials, 2025,&nbsp;2414041",
        doi: "10.1002/adfm.202414041",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/adfm.202414041"
    },

    // 2024
    {
        number: 42, year: 2024, type: "Article",
        authors: "<b><u>J. Zhong</u></b>, J. Ge, <b><u>Z. Wu</u></b>, Q. Zhang, E. Stavrou, <b><u>W. Zheng</u></b>*",
        title: "Bismuth Doping Unlocks Stability of Copper Oxides in Anodic Reaction: A Case Analysis of Glucose Electrooxidation",
        journal: "Electrochimica Acta, 2024, 145178", // Original HTML had 497, 145178 - using 145178 as it's likely the article ID
        doi: "10.1016/j.electacta.2024.145178",
        imageUrl: "../img/1-s2.0-S0013468624014130-ga1_lrg.jpg", imageAlt: "TOC for Bismuth Doping Unlocks Stability",
        dimensionsDoi: "10.1016/j.electacta.2024.145178"
    },
    {
        number: 41, year: 2024, type: "Article",
        authors: "<b><u>J. Chen</u></b>,^&nbsp;<b><u>S. Chen</u></b>,^ J. Gao, X. Huang, E. Stavrou, C. Vogt,* <b><u>W. Zheng</u></b>*",
        title: "Correlative In Situ Analysis of the Role of Oxygen on Ammonia Electrooxidation Selectivity on NiOOH Surfaces",
        journal: "Journal of Catalysis, 2024, 438, 115720",
        doi: "10.1016/j.jcat.2024.115720",
        imageUrl: "../img/1-s2.0-S0021951724004330-ga1.jpg", imageAlt: "TOC for Correlative In Situ Analysis",
        dimensionsDoi: "10.1016/j.jcat.2024.115720"
    },
    {
        number: 40, year: 2024, type: "Article",
        authors: "<b><u>W. Zheng</u></b>,* <b><u>L. Du</u></b>",
        title: "Applicability of Graphite as Anodic Counter Electrode for Electrocatalyst Evaluation",
        journal: "ACS Energy Letters, 2024, 9, 9, 4581–4586",
        doi: "10.1021/acsenergylett.4c01869",
        imageUrl: "../img/nz4c01869_0001.webp", imageAlt: "TOC for Applicability of Graphite",
        featuredIn: [
            { text: "公众号-石墨烯联盟", url: "https://mp.weixin.qq.com/s/yvKoNQBNPbZk8L0SnHi65Q" },
            { text: "公众号-材料科学站", url: "https://mp.weixin.qq.com/s/onEUkss8BOr19H7YqcXD_Q" },
            { text: "公众号-研之成理", url: "https://mp.weixin.qq.com/s/VGohhpgdAdUQsYIvOmkqGQ" }
        ],
        dimensionsDoi: "10.1021/acsenergylett.4c01869"
    },
    {
        number: 39, year: 2024, type: "Review",
        authors: "<b><u>L. Du</u></b>, <b><u>W. Zheng</u></b>*",
        title: "Catalyst Deactivation during Water Electrolysis: Understanding and Mitigation",
        journal: "APL Energy, 2024, 2(2), 021501",
        doi: "10.1063/5.0191316",
        imageUrl: "../img/021501_1_5.0191316.figures.online.highlight_f1.jpeg", imageAlt: "TOC for Catalyst Deactivation during Water Electrolysis",
        featuredIn: [ { text: "AIPP学术", url: "https://mp.weixin.qq.com/s/uwNUzI2d7ysKg8QyzqLCUg" } ],
        dimensionsDoi: "10.1063/5.0191316"
    },
    {
        number: 38, year: 2024, type: "Review",
        authors: "Y. Li,* T. Xin, Z. Cao, <u>W. Zheng</u>, P He,* L. Y. S. Lee*",
        title: "Optimized Transition Metal Phosphides for Direct Seawater Electrolysis: Current Trends",
        journal: "ChemSusChem, 2024, e202301926",
        doi: "10.1002/cssc.202301926",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        comments: ["Editors' choice: spotlights"],
        dimensionsDoi: "10.1002/cssc.202301926"
    },
    {
        number: 37, year: 2024, type: "Review",
        authors: "X. Wang, J. Lu,* Y. Wu, <u>W. Zheng</u>, H. Zhang, T. Bai, H. Liu, D. Li,* L. Ci*",
        title: "Building Stable Anodes for High-Rate Na-Metal Batteries",
        journal: "Advanced Materials, 2024, 36(16), 2311256",
        doi: "10.1002/adma.202311256",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        comments: ["Featured on the cover"],
        dimensionsDoi: "10.1002/adma.202311256"
    },

    // 2023
    {
        number: 36, year: 2023, type: "Article",
        authors: "<b><u>W. Zheng</u></b>*",
        title: "Python for Electrochemistry: A Free and All-In-One Toolset",
        journal: "ECS Advances, 2023, 2(4), 040502",
        doi: "10.1149/2754-2734/acff0b",
        pdfLink: "../downloads/Zheng_2023_ECS_Adv._2_040502.pdf",
        imageUrl: "../img/ecsaacff0b-ga.jpg", imageAlt: "TOC for Python for Electrochemistry",
        comments: ["Most read article on ECS Advances"],
        featuredIn: [ { text: "ECS Webinar: Introducing Python for Electrochemistry Research", url: "https://physicsworld.com/a/introducing-python-for-electrochemistry-research/" } ],
        dimensionsDoi: "10.1149/2754-2734/acff0b"
    },
    {
        number: 35, year: 2023, type: "Article",
        authors: "<b><u>W. Zheng</u></b>*",
        title: "iR Compensation for Electrocatalysis Studies: Considerations and Recommendations",
        journal: "ACS Energy Letters, 2023, 8, 1952-1958",
        doi: "10.1021/acsenergylett.3c00366",
        pdfLink: "../downloads/zheng-2023-ir-compensation-for-electrocatalysis-studies-considerations-and-recommendations.pdf",
        imageUrl: "../img/images_large_nz3c00366_0001.jpeg", imageAlt: "TOC for iR Compensation",
        comments: ["Highly cited paper, top 1% Materials Science (Clarivate, 2023, 2024)", "Most read paper of the year on ACS Energy Letters"],
        featuredIn: [ { text: "bilibili-如何正确的处理IR补偿?", url: "https://www.bilibili.com/video/BV1Ze411z7Bw/?spm_id_from=333.337.search-card.all.click&vd_source=fc9ab070c3e43559b55603564026a5de" } ],
        dimensionsDoi: "10.1021/acsenergylett.3c00366"
    },
    {
        number: 34, year: 2023, type: "Article",
        authors: "<b><u>W. Zheng</u></b>*",
        title: "Beginner's Guide to Raman Spectroelectrochemistry for Electrocatalysis Study",
        journal: "Chemistry Methods, 2023, 3(2), e202200042",
        doi: "10.1002/cmtd.202200042",
        pdfLink: "../downloads/Chemistry%20Methods%20-%202022%20-%20Zheng%20-%20Beginner%20s%20Guide%20to%20Raman%20Spectroelectrochemistry%20for%20Electrocatalysis%20Study.pdf",
        imageUrl: "../img/cmtd202200042-toc-0001-m.jpg", imageAlt: "TOC for Beginner's Guide to Raman Spectroelectrochemistry",
        featuredIn: [ { text: "Materials Views:为新手准备的电化学原位拉曼光谱实验指南", url: "https://mvc.wiley.cn/research-news/231127-6/" } ],
        dimensionsDoi: "10.1002/cmtd.202200042"
    },
    {
        number: 33, year: 2023, type: "Review",
        authors: "<b><u>W. Zheng</u></b>*",
        title: "Single-Atom Materials as Electrochemical Sensors: Sensitivity, Selectivity, and Stability",
        journal: "Analysis & Sensing, 2023, e202200070", // Original had 3(1) - e202200070 is likely the article ID
        doi: "10.1002/anse.202200070",
        imageUrl: "../img/anse202200070-toc-0001-m.png", imageAlt: "TOC for Single-Atom Materials as Electrochemical Sensors",
        comments: ["Featured on the cover"],
        dimensionsDoi: "10.1002/anse.202200070"
    },

    // 2022
    {
        number: 32, year: 2022, type: "Article",
        authors: "<u>W. Zheng</u>,* L.Y.S. Lee*",
        title: "Observing Electrocatalytic Processes via In Situ Electrochemical Scanning Tunneling Microscopy: Latest Advances",
        journal: "Chemistry - An Asian Journal, 2022, e202200384",
        doi: "10.1002/asia.202200384",
        imageUrl: "../img/asia202200384-toc-0001-m.jpg", imageAlt: "TOC for Observing Electrocatalytic Processes via In Situ EC-STM",
        comments: ["Featured on the cover"],
        dimensionsDoi: "10.1002/asia.202200384"
    },
    {
        number: 31, year: 2022, type: "Review",
        authors: "<u>W. Zheng</u>,* L.Y.S. Lee*",
        title: "Beyond Sonication: Advanced Exfoliation Methods for Scalable Production of 2D Materials",
        journal: "Matter, 2022, 5, 515-545",
        doi: "10.1016/j.matt.2021.12.010",
        imageUrl: "../img/fx1_lrg.jpg", imageAlt: "TOC for Beyond Sonication",
        dimensionsDoi: "10.1016/j.matt.2021.12.010"
    },
    {
        number: 30, year: 2022, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, L.Y.S. Lee*",
        title: "Bismuth and Metal-Doped Bismuth Nanoparticles Produced by Laser Ablation for Electrochemical Glucose Sensing",
        journal: "Sensors and Actuators B: Chemical, 2022, 357, 131334",
        doi: "10.1016/j.snb.2021.131334",
        imageUrl: "../img/1-s2.0-S092540052101902X-ga1.jpg", imageAlt: "TOC for Bismuth and Metal-Doped Bismuth Nanoparticles",
        dimensionsDoi: "10.1016/j.snb.2021.131334"
    },
    {
        number: 29, year: 2022, type: "Book Chapter",
        authors: "Y. Li, <u>W. Zheng</u>, L.Y.S. Lee",
        title: "Chapter 5: Functionalized Covalent Organic Frameworks for Improved Energy Application",
        journal: "in Covalent Organic Frameworks: Chemistry, Properties, and Energy Applications for Sustainable Future, CRC Press, 2022",
        doi: "10.1201/9781003206507-5",
        imageUrl: "../img/9781032073514.webp", imageAlt: "Book Cover: Covalent Organic Frameworks"
    },
    {
        number: 28, year: 2022, type: "Book Chapter",
        authors: "<u>W. Zheng</u>, Y. Li, L.Y.S. Lee",
        title: "Chapter 1: Earth-Abundant Metal-Based Nanomaterials for Electrochemical Water Splitting",
        journal: "in Functional Nanomaterials: Synthesis, Properties and Applications, Wiley-VCH, 2022",
        doi: "10.1002/9783527828562.ch1",
        imageUrl: "../img/9783527828562.webp", imageAlt: "Book Cover: Functional Nanomaterials"
    },

    // 2021
    {
        number: 27, year: 2021, type: "Article",
        authors: "<u>W. Zheng</u>, L.Y.S. Lee,* K. Y. Wong*",
        title: "Improving the Performance Stability of Direct Seawater Electrolysis: From Catalyst Design to Electrode Engineering",
        journal: "Nanoscale, 2021, 13, 15177–15187",
        doi: "10.1039/D1NR03294A",
        imageUrl: "../img/Get.jpeg", imageAlt: "TOC for Improving the Performance Stability of Direct Seawater Electrolysis",
        dimensionsDoi: "10.1039/D1NR03294A"
    },
    {
        number: 26, year: 2021, type: "Article",
        authors: "<u>W. Zheng</u>, L.Y.S. Lee*",
        title: "Metal-Organic Frameworks for Electrocatalysis: Catalyst or Precatalyst?",
        journal: "ACS Energy Letters, 2021, 6, 2838–2843",
        doi: "10.1021/acsenergylett.1c01350",
        imageUrl: "../img/images_medium_nz1c01350_0001.gif", imageAlt: "TOC for Metal-Organic Frameworks for Electrocatalysis",
        comments: ["Highly cited paper, top 1% Materials Science (Clarivate, 2022, 2023, 2024)"],
        dimensionsDoi: "10.1021/acsenergylett.1c01350"
    },
    {
        number: 25, year: 2021, type: "Article",
        authors: "J. Yan, X. Zhang, <u>W. Zheng</u>, L.Y.S. Lee*",
        title: "Interface Engineering of 2D-C3N4/NiFe-LDH Heterostructure for Highly Efficient Photocatalytic Hydrogen Evolution",
        journal: "ACS Applied Materials & Interfaces, 2021, 21, 24723", // Original HTML had 13, 24723 - assuming 13 is vol
        doi: "10.1021/acsami.1c03240",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1021/acsami.1c03240"
    },
    {
        number: 24, year: 2021, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, C.-S. Tsang, P.-K. So, L.Y.S. Lee*",
        title: "Stabilizer-Free Bismuth Nanoparticle for Selective Polyol Electrooxidation",
        journal: "iScience, 2021, 24, 102342",
        doi: "10.1016/j.isci.2021.102342",
        imageUrl: "../img/1-s2.0-S2589004221003102-fx1.jpg", imageAlt: "TOC for Stabilizer-Free Bismuth Nanoparticle",
        dimensionsDoi: "10.1016/j.isci.2021.102342"
    },
    {
        number: 23, year: 2021, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, M. Liu, L.Y.S. Lee*",
        title: "Few-Layer Tellurium: Cathodic Exfoliation and Doping for Collaborative Hydrogen Evolution",
        journal: "Small, 2021, 17, 2007768",
        doi: "10.1002/smll.202007768",
        imageUrl: "../img/smll202007768-gra-0001-m.jpg", imageAlt: "TOC for Few-Layer Tellurium",
        comments: ["Featured on the cover"],
        dimensionsDoi: "10.1002/smll.202007768"
    },
    {
        number: 22, year: 2021, type: "Article",
        authors: "J. Choi, D. Kim, <u>W. Zheng</u>, B. Yan, Y. Li, L.Y.S. Lee,* Y. Piao*",
        title: "Interface Engineered NiFe2O4-x/NiMoO4 Nanowire Arrays for Electrochemical Oxygen Evolution",
        journal: "Applied Catalysis B: Environmental, 2021, 286, 119857",
        doi: "10.1016/j.apcatb.2020.119857",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        comments: ["Highly cited paper, top 1% Chemistry (Clarivate, 2022, 2023, 2024)"],
        dimensionsDoi: "10.1016/j.apcatb.2020.119857"
    },
    {
        number: 21, year: 2021, type: "Article",
        authors: "L. Hu, Y. Li, X. Peng, <u>W. Zheng</u>, L.Y.S. Lee,* P.K. Chu,* K.-Y. Wong*",
        title: "TiO2 Film Supported by Vertically Aligned Gold Nanorod Superlattice Array for Enhanced Photocatalytic Hydrogen Evolution",
        journal: "Chemical Engineering Journal, 2021, 417, 127900",
        doi: "10.1016/j.cej.2020.127900",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.cej.2020.127900"
    },

    // 2020
    {
        number: 20, year: 2020, type: "Article",
        authors: "<u>W. Zheng</u>, M. Liu, L.Y.S. Lee*",
        title: "Best Practices in Using Foam-Type Electrodes for Electrocatalytic Performance Benchmark",
        journal: "ACS Energy Letters, 2020, 5, 3260", // Original HTML had 3260-3264
        doi: "10.1021/acsenergylett.0c01958",
        imageUrl: "../img/nz0c01958_0001.webp", imageAlt: "TOC for Best Practices in Using Foam-Type Electrodes",
        dimensionsDoi: "10.1021/acsenergylett.0c01958"
    },
    {
        number: 19, year: 2020, type: "Article",
        authors: "L. Hu, Y. Li, <u>W. Zheng</u>, Y.-K. Peng, S.C.E. Tsang,* L.Y.S. Lee,* K.-Y. Wong*",
        title: "Blue Order/Disorder Janus-Type TiO2 Nanoparticles for Enhanced Photocatalytic Hydrogen Generation",
        journal: "Journal of Materials Chemistry A, 2020, 8, 22828",
        doi: "10.1039/D0TA06281B",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1039/D0TA06281B"
    },
    {
        number: 18, year: 2020, type: "Article",
        authors: "<u>W. Zheng</u>, J. Lee, Z. Gao, Y. Li, S. Lin, S. P. Lau, L.Y.S. Lee*",
        title: "Laser-assisted Ultrafast Exfoliation of Black Phosphorus in Liquid with Tunable Thickness for Li-ion Batteries",
        journal: "Advanced Energy Materials, 2020, 10, 1903490",
        doi: "10.1002/aenm.201903490",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder", // Original had cover image, but not specified here
        comments: ["Featured on the cover"],
        dimensionsDoi: "10.1002/aenm.201903490"
    },
    {
        number: 17, year: 2020, type: "Article",
        authors: "X. Zhang, K.-A Min, <u>W. Zheng</u>, J. Hwang, B. Han,* L.Y.S. Lee*",
        title: "Copper Phosphosulfides as a Highly Active and Stable Photocatalyst for Hydrogen Evolution Reaction",
        journal: "Applied Catalysis B: Environmental, 2020, 273, 118927",
        doi: "10.1016/j.apcatb.2020.118927",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.apcatb.2020.118927"
    },
    {
        number: 16, year: 2020, type: "Article",
        authors: "<u>W. Zheng</u>, M. Liu, L.Y.S. Lee*",
        title: "Electrochemical Instability of Metal-Organic Frameworks: In Situ Spectroelectrochemical Investigation of the Real Active Sites",
        journal: "ACS Catalysis, 2020, 20, 81–92", // Original HTML had 10, 81-92
        doi: "10.1021/acscatal.9b03790",
        imageUrl: "../img/cs9b03790_0007.webp", imageAlt: "TOC for Electrochemical Instability of Metal-Organic Frameworks",
        comments: ["Highly cited paper, top 1% Chemistry (Clarivate, 2021, 2022, 2023, 2024)"],
        dimensionsDoi: "10.1021/acscatal.9b03790"
    },

    // Before 2020 (year field will be used to group into 'before2020')
    {
        number: 15, year: 2019, type: "Article",
        authors: "<u>W. Zheng</u>, C.-S. Tsang, M. Liu, L.Y. So, L.-C. Leung, L.Y.S. Lee*",
        title: "Highly Efficient Stepwise Electrochemical Degradation of Antibiotics in Water by In Situ Formed Cu(OH)2 Nanorods",
        journal: "Applied Catalysis B: Environmental, 2019, 256, 117824",
        doi: "10.1016/j.apcatb.2019.117824",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.apcatb.2019.117824"
    },
    {
        number: 14, year: 2019, type: "Article",
        authors: "Z. Gao, M. Liu, <u>W. Zheng</u>, X. Zhang, L.Y.S. Lee*",
        title: "Surface Engineering of MoS2 via Laser-induced Exfoliation in Protic Solvents",
        journal: "Small, 2019, 15, 1903791",
        doi: "10.1002/smll.201903791",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/smll.201903791"
    },
    {
        number: 13, year: 2019, type: "Article",
        authors: "Z. Gao, <u>W. Zheng</u>, L.Y.S. Lee*",
        title: "Highly Enhanced Pseudocapacitive Performance of Vanadium-doped MXenes in Neutral Electrolytes",
        journal: "Small, 2019, 15, 1902649",
        doi: "10.1002/smll.201902649",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/smll.201902649"
    },
    {
        number: 12, year: 2019, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, L.Y.S. Lee*",
        title: "Insights into the Transition Metal Ion-mediated Electrooxidation of Glucose in Alkaline Electrolyte",
        journal: "Electrochimica Acta, 2019, 308, 9–19",
        doi: "10.1016/j.electacta.2019.04.007",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.electacta.2019.04.007"
    },
    {
        number: 11, year: 2019, type: "Article",
        authors: "<u>W. Zheng</u>, C.-S. Tsang, L.Y.S. Lee,* K.-Y. Wong*",
        title: "Two-Dimensional Metal-Organic Framework and Covalent-Organic Framework: Synthesis and their Energy-Related Applications",
        journal: "Materials Today Chemistry, 2019, 12, 34—60",
        doi: "10.1016/j.mtchem.2018.12.002",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.mtchem.2018.12.002"
    },
    {
        number: 10, year: 2019, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, L. Hu, L.Y.S. Lee*",
        title: "Use of Carbon Supports with Copper Ion as a Highly Sensitive Non-Enzymatic Glucose Sensor",
        journal: "Sensors and Actuators B: Chemical, 2019, 282, 187–196",
        doi: "10.1016/j.snb.2018.10.164",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.snb.2018.10.164"
    },
    {
        number: 9, year: 2018, type: "Article",
        authors: "M. Liu, <u>W. Zheng</u>, S. Ran, S.T. Boles, L.Y.S. Lee*",
        title: "Overall Water Splitting Electrocatalysts based on 2D CoNi Metal-Organic Frameworks and Its Derivative",
        journal: "Advanced Materials Interfaces, 2018, 5, 1800849",
        doi: "10.1002/admi.201800849",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        comments: ["Featured on the cover"],
        dimensionsDoi: "10.1002/admi.201800849"
    },
    {
        number: 8, year: 2018, type: "Article",
        authors: "Y. Li, L. Hu, <u>W. Zheng</u>, X. Peng, M. Liu, P. K. Chu,* L. Y. S. Lee*",
        title: "Ni/Co-Based Nanosheet Arrays for Efficient Oxygen Evolution Reaction",
        journal: "Nano Energy, 2018, 52, 360—368",
        doi: "10.1016/j.nanoen.2018.08.010",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.nanoen.2018.08.010"
    },
    {
        number: 7, year: 2018, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, M. Liu, C.-S. Tsang, L.Y.S. Lee,* K.-Y. Wong*",
        title: "Cu2+-doped Carbon Nitride/MWCNT as an Electrochemical Glucose Sensor",
        journal: "Electroanalysis, 2018, 30, 1446—1454",
        doi: "10.1002/elan.201800076",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/elan.201800076"
    },
    {
        number: 6, year: 2017, type: "Article",
        authors: "<u>W. Zheng</u>, Y. Li, C.-S. Tsang, L. Hu, M. Liu, B. Huang, L.Y.S. Lee,* K.-Y. Wong*",
        title: "CuII-mediated Ultra-efficient Electrooxidation of Glucose",
        journal: "ChemElectroChem, 2017, 4, 2788—2792",
        doi: "10.1002/celc.201700712",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/celc.201700712"
    },
    {
        number: 5, year: 2017, type: "Article",
        authors: "<u>W. Zheng</u>, H.W. Man, L. Ye,* S.C.E. Tsang*",
        title: "Electroreduction of Carbon Dioxide to Formic Acid and Methanol over a Palladium/Polyaniline Catalyst in Acidic Solution: A Study of the Palladium Size Effect",
        journal: "Energy Technology, 2017, 5, 937—944",
        doi: "10.1002/ente.201600659",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/ente.201600659"
    },
    {
        number: 4, year: 2017, type: "Article",
        authors: "A. Kolpin, G. Jones, S. Jones, <u>W. Zheng</u>, J. Cookson, A. PE York, P. J Collier, S.C.E. Tsang*",
        title: "Quantitative Differences in Sulfur Poisoning Phenomena over Ruthenium and Palladium: An Attempt to Deconvolute Geometric and Electronic Poisoning Effects Using Model Catalysts",
        journal: "ACS Catalysis, 2017, 7, 592—605",
        doi: "10.1021/acscatal.6b02765",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1021/acscatal.6b02765"
    },
    {
        number: 3, year: 2016, type: "Article",
        authors: "<u>W. Zheng</u>, S. Nayak, W. Yuan, Z. Zeng, X. Hong, K.A. Vincent, S.C.E. Tsang*",
        title: "A Tunable Metal-polyaniline Interface for Efficient Carbon Dioxide Electro-Reduction to Formic Acid and Methanol in Aqueous Solution",
        journal: "Chemical Communications, 2016, 52, 13901—13904",
        doi: "10.1039/C6CC07212G",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1039/C6CC07212G"
    },
    {
        number: 2, year: 2016, type: "Article",
        authors: "<u>W. Zheng</u>, L. Hu, L.Y.S. Lee, K.-Y. Wong*",
        title: "Copper Nanoparticles/Polyaniline/Graphene Composite as a Highly Sensitive Electrochemical Glucose Sensor",
        journal: "Journal of Electroanalytical Chemistry, 2016, 781, 155—160",
        doi: "10.1016/j.jelechem.2016.08.004",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1016/j.jelechem.2016.08.004"
    },
    {
        number: 1, year: 2015, type: "Article",
        authors: "<u>W. Zheng</u>, J. Qu, X. Hong, K. Tedsree, S.C.E. Tsang*",
        title: "Probing the Size and Shape Effects of Cubic- and Spherical-Shaped Palladium Nanoparticles in the Electrooxidation of Formic Acid",
        journal: "ChemCatChem, 2015, 7, 3826—3831",
        doi: "10.1002/cctc.201500774",
        imageUrl: "../img/placeholder-image.png", imageAlt: "TOC Placeholder",
        dimensionsDoi: "10.1002/cctc.201500774"
    }
];