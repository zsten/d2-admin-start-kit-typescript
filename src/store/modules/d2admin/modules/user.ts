import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'


export interface IUserState {
  info: any
}
@Module({ namespaced: true })
export default class user extends VuexModule implements IUserState {
  //用户信息
  info = {};

  @Mutation
  public SET_INFO(info: any) {
    this.info = info;
  }

  /**
   * @description 设置用户数据
   * @param {*} info info
   */
  @Action
  public async set(info: any) {
    return new Promise(async resolve => {
      // store 赋值
      this.context.commit('SET_INFO', info)
      // 持久化
      await this.context.dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      }, { root: true })
      // end
      resolve()
    })
  }
  /**
   * @description 从数据库取用户数据
   */
  @Action
  public load(context) {
    console.log(this)
    return new Promise(async resolve => {
      // store 赋值
      const info = await this.context.dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      }, { root: true })
      this.context.commit('SET_INFO', info)
      console.log(this)

      // end
      resolve()
    })
  }
}


