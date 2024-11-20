// 等待页面加载完成
window.addEventListener('load', function () {
  // 获取音频元素
  const audio = document.getElementById('background-music');

  // 恢复缓存状态
  const savedState = JSON.parse(localStorage.getItem('audioState'));
  if (savedState) {
    // 恢复音频当前时间和是否播放
    audio.currentTime = savedState.currentTime || 0;
    if (savedState.isPlaying) {
      audio.play().catch(error => {
        console.log('自动播放被阻止：', error);
      });
    }
  }

  // 尝试播放音频
  audio.play().catch(error => {
    console.log('自动播放被阻止：', error);

    // 如果被阻止，监听用户的第一次交互再播放
    const playOnUserInteraction = () => {
      audio.play().then(() => {
        console.log('音频开始播放');
        document.removeEventListener('click', playOnUserInteraction);
        document.removeEventListener('keydown', playOnUserInteraction);
      }).catch(err => {
        console.error('音频播放失败：', err);
      });
    };

    // 绑定事件，等待用户交互
    document.addEventListener('click', playOnUserInteraction);
    document.addEventListener('keydown', playOnUserInteraction);
  });

  // 在页面关闭或刷新时保存当前状态
  window.addEventListener('beforeunload', () => {
    const audioState = {
      currentTime: audio.currentTime, // 当前播放时间
      isPlaying: !audio.paused        // 是否正在播放
    };
    localStorage.setItem('audioState', JSON.stringify(audioState));
  });
});
