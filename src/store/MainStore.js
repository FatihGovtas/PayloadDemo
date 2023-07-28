import { observable, action, makeObservable, autorun, reaction } from "mobx";

class MainStore {
    @observable sortedField = null;
    @observable sortAscending = true;
    @observable page = 0;
    @observable searchQuery = '';
    @observable data = [];
    @observable selectedItems = [];
    @observable selectAll = false;
    @observable isRefresh = false;

    constructor() {
        makeObservable(this);
        autorun(() => {
            //state değiştiğinde çalışır
        })
        reaction(() => this.data, data => {
            //data değiştiğinde çalışır
            //this.setProps();
        })
    }


    @action setData(data) {
        this.data = data;
    }
    @action setSortedField(sortedField) {
        this.sortedField = sortedField;
    }
    @action setSortAscending(sortAscending) {
        this.sortAscending = sortAscending;
    }
    @action setPage(page) {
        this.page = page;
    }
    @action setSearchQuery(searchQuery) {
        this.searchQuery = searchQuery;
    }
    @action setSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
    }
    @action setSelectAll(selectAll) {
        this.selectAll = selectAll;
    }
    @action setIsRefresh(isRefresh) {
        this.isRefresh = isRefresh;
    }


    @action setProps() {
        this.sortedField = null;
        this.sortAscending = true;
        this.page = 0;
        this.searchQuery = '';
        this.selectedItems = [];
        this.selectAll = false;
        this.isRefresh = false;
    }

}
export default new MainStore();