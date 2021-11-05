"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Trakt = require('trakt.tv');
class Fetcher {
    constructor() {
        let options = {
            client_id: process.env.CLIENT_ID,
            client_secret: null,
            redirect_uri: null,
            api_url: null,
            useragent: null,
            pagination: true
        };
        this.trakt = new Trakt(options);
    }
    async fetchPage(username, page = 1) {
        const response = this.trakt.users.history({
            username: username,
            page: page,
            limit: '1000',
        });
        return response;
    }
    async fetchHistory() {
        let username = 'kasper-zutterman';
        let res = await this.fetchPage(username);
        let history = res.data;
        while (res.pagination.page < res.pagination['page-count']) {
            res = await this.fetchPage(username, parseInt(res.pagination.page) + 1);
            // let data: Array<object> = res.data;
            // history = history.concat(data);
            history = history.concat(res.data);
            // console.log(res.pagination.page, res.pagination['page-count']);
        }
        history.reverse();
        console.log(history.length);
        console.log(history.slice(0, 10));
        // let size = res.pagination['item-count'];
        // console.log(size);
        // console.log(res.data.slice(0, 10).reverse());
    }
}
exports.default = Fetcher;
