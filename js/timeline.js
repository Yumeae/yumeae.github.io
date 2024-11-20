// 获取所有列表项并为它们添加点击事件监听器
document.querySelectorAll('ul li').forEach(function (li) {
    li.addEventListener('click', function () {
        // 获取目标元素的ID
        var targetId = this.getAttribute('target');
        // 获取目标元素
        var targetElement = document.getElementById(targetId);
        // 计算滚动位置（考虑导航栏高度）
        var scrollPosition = targetElement.offsetTop - 160;
        // 使用window.scrollTo平滑滚动到计算后的位置
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    });
});