#!/usr/bin/env bash
set -euo pipefail
BASE="$(cd "$(dirname "$0")/.." && pwd)"
LATEX="$BASE/latex"
mkdir -p "$LATEX/chapters"
cat > "$LATEX/main.tex" <<'TEX'
\\documentclass[12pt,a4paper]{ctexrep}
\\usepackage{geometry}
\\geometry{left=2.8cm,right=2.8cm,top=2.5cm,bottom=2.5cm}
\\usepackage{setspace}
\\onehalfspacing
\\usepackage{hyperref}
\\title{数据驱动的专病风险预警与智慧医患交互平台}
\\author{谢荣攀}
\\date{\\today}
\\begin{document}
\\maketitle
\\tableofcontents
\\chapter{绪论}
\\input{chapters/ch1}
\\chapter{需求分析与总体设计}
\\input{chapters/ch2}
\\chapter{关键技术与实现}
\\input{chapters/ch3}
\\chapter{实验与结果分析}
\\input{chapters/ch4}
\\chapter{总结与展望}
\\input{chapters/ch5}
\\end{document}
TEX
cat > "$LATEX/chapters/ch1.tex" <<'TEX'
本研究面向临床专病管理中的数据碎片化、录入低效与医患沟通成本高的问题，提出数据驱动的专病风险预警与智慧医患交互平台。研究目标是将OCR、检索增强生成与风险预测模型进行工程化整合，形成可落地的智慧医疗原型系统。
TEX
cat > "$LATEX/chapters/ch2.tex" <<'TEX'
系统采用前后端分离与微服务架构，角色分为医生、患者与管理员。核心模块包括病历数据管理、可配置模板管理、智能问答、风险预测、Prompt版本管理与可视化分析。
TEX
cat > "$LATEX/chapters/ch3.tex" <<'TEX'
关键技术包括：OCR结构化抽取、RAG检索增强问答、机器学习风险预测、Prompt版本化管理。通过统一接口层进行服务编排，保障模型能力可替换与可审计。
TEX
cat > "$LATEX/chapters/ch4.tex" <<'TEX'
实验从功能完整性、响应时延、问答准确性与风险预测效果四个维度评估。后续将补充真实脱敏数据集上的定量结果，包括准确率、召回率、F1与AUC。
TEX
cat > "$LATEX/chapters/ch5.tex" <<'TEX'
本文完成了从数据采集、智能问答到风险预警的系统闭环设计。后续工作将重点放在多中心数据验证、隐私合规增强与临床场景持续优化。
TEX
echo "draft done: $LATEX/main.tex"
