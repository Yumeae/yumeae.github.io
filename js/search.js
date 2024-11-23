document.getElementById("searchButton").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (!searchInput){
        alert("请输入搜索内容！");
        return;
    }  // 如果输入为空，则提示用户输入内容

    clearHighlights(); // 清除之前的高亮

    // 遍历页面内容并高亮匹配的文本
    const allTextNodes = getAllTextNodes(document.body); // 获取所有文本节点
    let matchFound = false;

    allTextNodes.forEach(node => {
        const regex = new RegExp(`(${searchInput})`, "gi");
        const matches = node.textContent.match(regex);
        if (matches) {
            matchFound = true;
            const parent = node.parentNode;
            const newContent = node.textContent.replace(regex, `<span class="highlight">$1</span>`);
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = newContent;

            // 将高亮内容替换回原 DOM
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, node);
            }
            parent.removeChild(node); // 移除原节点
        }
    });

    if (matchFound) {
        scrollToHighlight(); // 滚动到第一个高亮的位置
    } else {
        alert("未找到匹配内容！");
    }
});

// 滚动到第一个高亮的位置
function scrollToHighlight() {
    const firstHighlight = document.querySelector(".highlight");
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// 清除所有高亮
function clearHighlights() {
    const highlights = document.querySelectorAll(".highlight");
    highlights.forEach(span => {
        span.replaceWith(span.textContent); // 替换为纯文本
    });
}

// 获取所有文本节点
function getAllTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }
    return textNodes;
}