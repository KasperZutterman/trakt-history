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
    async fetchPage(options, page = 1) {
        const response = this.trakt.users.history({
            username: process.env.TRAKT_USERNAME,
            page: page,
            type: options.type,
            limit: '1000',
        });
        return response;
    }
    async fetchHistory(options) {
        let res = await this.fetchPage(options);
        let history = res.data;
        while (res.pagination.page < res.pagination['page-count']) {
            res = await this.fetchPage(options, parseInt(res.pagination.page) + 1);
            history = history.concat(res.data);
            // console.log(res.pagination.page, res.pagination['page-count']);
        }
        history.reverse();
        console.log(history.length);
        console.log(history.slice(0, 10));
        return history;
    }
}
exports.default = Fetcher;
