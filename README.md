# tanbo-bezier

tanbo-bezier 可以成生任意多次贝塞尔曲线

## 安装
```bash
npm install tanbo-bezier --save
```
## 代码示例

#### 普通贝塞尔曲线
```typescript
import { Bezier, BezierPoint } from 'tanbo-bezier';

// 可以传偶数个数字，且不少于4个
const bezier = new Bezier([.48, .08, .21, .8, .3, 1]); 

const div = document.getElementById('box');

// 一般场景下能过 `onUpdatePoint` 方法获取结果
bezier.onUpdatePoint((point: BezierPoint) => {
    console.log(point.y);
    console.log(point.x);
});

// 不常用，通过回调函数，可以获取贝塞尔曲线的控制坐标
bezier.onUpdateLine((startPoint: BezierPoint, endPoint: BezierPoint) => {
    console.log(startPoint, endPoint);
});

let i = 0;

const fn = function() {
    if (i < 100) {
        i++;
        // result 为当前 bezier 坐标点的 y 轴位置
        const result: number = bezier.update(i / 100);
        console.log(result);
        
        requestAnimationFrame(fn);
    }
};

requestAnimationFrame(fn);
```

#### CSS贝塞尔曲线

`CubicBezier` 默认为 0,0 点到 1,1 点。

```typescript
import { CubicBezier, BezierPoint } from 'tanbo-bezier';

const bezier = new CubicBezier(.48, .08, .21, .8); 

const div = document.getElementById('box');

// 一般场景下通过 `onUpdatePoint` 方法获取结果
bezier.onUpdatePoint((point: BezierPoint) => {
    console.log(point.y);
    console.log(point.x);
});

// 不常用，通过回调函数，可以获取贝塞尔曲线的控制坐标
bezier.onUpdateLine((startPoint: BezierPoint, endPoint: BezierPoint) => {
    console.log(startPoint, endPoint);
});

let i = 0;

const fn = function() {
    if (i < 100) {
        i++;
        // t 为当前时间系数
        const t = 1 / 100;
        // result 为当前 bezier 坐标点的 y 轴位置
        const result: number = bezier.update(t);
        div.style.transform = `translateX(${result * 400}px)`;
      
        requestAnimationFrame(fn);
    }
};

requestAnimationFrame(fn);
```



