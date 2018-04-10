# tanbo-bezier

tanbo-bezier 可以成生任意多次贝塞尔曲线

## 安装
```bash
npm install tanbo-bezier --save
```
## 代码示例
```typescript
import { Bezier, BezierPoint } from 'tanbo-bezier';

const bezier = new Bezier([.48, .08, .21, .8]); // 可以传任意多个任意大小的数字

const div = document.getElementById('box');

// 一般场景下能过 `onUpdatePoint` 方法获取结果
bezier.onUpdatePoint((point: BezierPoint) => {
    console.log(point.y); // y 轴进度，一般动画使用这个值
    console.log(point.x); // x 轴进度，不常用
    
    div.style.left = point.y * 400 + 'px';
});

// 不常用，通过回调函数，可以获取贝塞尔曲线的控制坐标
bezier.onUpdateLine((startPoint: BezierPoint, endPoint: BezierPoint) => {
    console.log(startPoint, endPoint);
});

let i = 0;

const fn = function() {
    if (i < 100) {
        i++;
        bezier.update(i / 100);
        requestAnimationFrame(fn);
    }
};

requestAnimationFrame(fn);
```



