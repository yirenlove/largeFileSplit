## demo
[演示网站：](https://yirenlove.github.io/largeFileSplit/)https://yirenlove.github.io/largeFileSplit/



基于CPU内核数量创建相等的web worker线程，主线程几乎感觉不到卡顿（可以凭视觉感受到，小球的运动几乎没有什么影响，不使用web worker时，文件的MD5运算发生在主线程，可以看到小球有明显的卡顿。），大文件的分割几乎快了近4倍
