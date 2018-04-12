export interface BezierPoint {
    x: number;
    y: number;
}

export interface BaseBezier {
    /**
     * 获取某一进度下，贝塞尔曲线的位置
     * @param {number} step 当前进度
     * @returns {number} 当前进度下的结果
     */

    update(step: number): number;

    /**
     * 注册贝塞尔曲线更新坐标信息时的回调
     * @param {(point: BezierPoint) => any} fn 回调函数，参数为贝塞尔曲线当前坐标
     */
    onUpdatePoint(fn: (point: BezierPoint) => any): void;

    /**
     * 注册贝塞尔曲线更新切线信息时的回调
     * @param {(startPoint: BezierPoint, endPoint: BezierPoint) => any} fn 回调函数，参数为起始点，结束点
     */
    onUpdateLine(fn: (startPoint: BezierPoint, endPoint: BezierPoint) => any): void;
}
