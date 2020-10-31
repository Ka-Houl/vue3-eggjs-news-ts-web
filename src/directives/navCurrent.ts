// binding接口
interface IBinding {
  value: IConfig,
  oldValue: IConfig | undefined,
  [key: string]: any
}

// binding.value的接口
interface IConfig {
  activeClass: string,
  className: string,
  curIdx: number
}

export default {
  // 挂载后
  mounted(el: HTMLElement, { value }: IBinding) {
    const { activeClass, className, curIdx } = value;
    const oNavItems: HTMLCollection = el.getElementsByClassName(className);
    
    // 给当前index的元素增加active样式
    oNavItems[curIdx].className += ` ${activeClass}`;
  }, 
  // 更新后
  updated(el: HTMLElement, { value, oldValue }: IBinding) {
    // oldValue就是更新前的配置
    const { activeClass, className, curIdx } = value;
    const oNavItems: HTMLCollection = el.getElementsByClassName(className);
    // 找到上一次的index         oldValue有可能是undefined, 所以取curIdx就有可能报错
    // 通过！跟ts编译器说我这里的oldValue肯定有值
    const oldCurIdx: number = oldValue!.curIdx;
   
    oNavItems[oldCurIdx].className = `${className}`;
    oNavItems[curIdx].className += ` ${activeClass}`;
  }
}