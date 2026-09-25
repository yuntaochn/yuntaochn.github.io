const root=document.documentElement;
const savedTheme=localStorage.getItem("theme");if(savedTheme)root.dataset.theme=savedTheme;
document.getElementById("theme-toggle").addEventListener("click",()=>{const t=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=t;localStorage.setItem("theme",t)});
const zh={
"nav.about":"简介","nav.research":"研究","nav.publications":"论文","nav.experience":"经历","nav.contact":"联系",
"profile.position":"船舶与海洋工程博士研究生","profile.university":"哈尔滨工程大学","profile.interests":"无人水面艇 · 多智能体系统 · 编队与围捕控制 · 强化学习",
"about.title":"个人简介","about.p1":"我目前是哈尔滨工程大学博士研究生，研究方向主要围绕无人水面艇（USV）协同自主控制，重点关注编队控制与动态目标围捕。我希望结合基于模型的控制方法、多智能体强化学习与海洋机器人仿真，研究能够适应真实船舶动力学与执行器约束的多艇协同控制方法。","about.p2":"攻读博士学位前，我曾在埃夫特智能装备从事研发工作，主要涉及机器人软件、ROS 与设备驱动开发。本科毕业于南京大学自动化专业。",
"research.title":"研究方向","research.r1t":"无人艇协同控制","research.r1p":"面向欠驱动无人水面艇的编队形成、保持与协同控制。","research.r2t":"动态目标围捕","research.r2p":"研究多无人艇对运动目标的追踪、包围以及持续围捕控制。","research.r3t":"多智能体强化学习","research.r3p":"面向协同决策与控制的多智能体强化学习，关注方法的可解释性与可复现性。","research.r4t":"海洋机器人仿真","research.r4p":"从轻量二维环境到 ROS 2、VRX 与 WAM-V 的算法开发和工程验证。",
"news.title":"近期动态","news.date1":"2026年9月","news.n1":"提交论文《Order-preserving formation acquisition for dynamic target encirclement by underactuated USVs》。","news.n2":"研究工作进一步拓展至持续动态目标围捕与多无人艇协同追逃。",
"pub.title":"代表性论文","pub.note":"此处仅展示部分成果，后续将根据经过核实的文献信息完善完整论文列表。",
"projects.title":"研究工作","projects.p1t":"动态目标围捕","projects.p1p":"面向运动目标的多无人艇协同围捕与持续保持方法，重点考虑欠驱动船舶动力学约束以及围捕形成后的持续任务执行。","projects.p2t":"多无人艇编队控制","projects.p2p":"在轻量、可复现的多智能体仿真环境中研究学习增强的编队控制方法，包括教师引导与残差学习等思路。","projects.p3t":"VRX / WAM-V 仿真验证","projects.p3p":"基于 ROS 2、VRX 与 WAM-V 平台开展多无人艇协同控制算法的工程化仿真验证。","experience.title":"教育与工作经历","experience.date1":"2022年至今","experience.org1":"哈尔滨工程大学","experience.desc1":"博士研究生 · 船舶与海洋工程","experience.org2":"埃夫特智能装备股份有限公司","experience.desc2":"研发工程师 · 机器人软件、ROS 与设备驱动开发","experience.org3":"南京大学","experience.desc3":"本科 · 自动化","footer.text":"个人学术主页 · 最近更新于 2026 年","contact.title":"联系方式","contact.text":"科研交流可通过以下邮箱与我联系："
};
const en={};document.querySelectorAll("[data-i18n]").forEach(el=>en[el.dataset.i18n]=el.innerHTML);
function setLang(lang){document.documentElement.lang=lang==="zh"?"zh-CN":"en";document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;el.innerHTML=lang==="zh"?(zh[k]||en[k]):en[k]});document.getElementById("lang-toggle").textContent=lang==="zh"?"EN":"中文";localStorage.setItem("language",lang)}
let lang=localStorage.getItem("language")||"en";setLang(lang);
document.getElementById("lang-toggle").addEventListener("click",()=>{lang=lang==="zh"?"en":"zh";setLang(lang)});
document.getElementById("year").textContent=new Date().getFullYear();