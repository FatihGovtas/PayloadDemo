import { observable, action, makeObservable, autorun, reaction } from "mobx";

class SecondStore {

    @observable data = [];
    @observable value = [];

    constructor() {
        makeObservable(this);
        autorun(() => {
        })
        reaction(() => this.data, data => {
            //this.setProps();
        })
    }

    @action setData(data) {
        this.data = data;
    }
    @action setValue(value) {
        this.value = value;
    }

}
export default new SecondStore();