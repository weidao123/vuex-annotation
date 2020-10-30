/**
 * 储存所有模块的容器
 */
class Container {

  private container: {[key: string]: any} = {};

  public add(name: string, target: any) {
    if (!this.container[name]) {
      this.container[name] = typeof target === 'function' ? new target() : target;
    }
  }

  public getByName(name: string) {
    return this.container[name];
  }

  public getByType(type: any) {
    const keys = Object.keys(this.container);
    for (const key of keys) {
      if (this.container[key] instanceof type) {
        return this.container[key];
      }
    }
    throw new Error(type.name + '未注册');
  }
}

export default new Container();
