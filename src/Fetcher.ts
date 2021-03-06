const Trakt = require('trakt.tv');

export default class Fetcher {
    
    private readonly trakt;

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

    public async fetchPage(options: Options, page = 1): Promise<any> {
        const response = this.trakt.users.history({
            username: process.env.TRAKT_USERNAME,
            page: page,
            type: options.type,
            limit: '1000',
        })
        return response;
    }

    public async fetchHistory(options: Options): Promise<Array<object>> {
        let res = await this.fetchPage(options);
        let history: Array<object> = res.data;
        
        while (res.pagination.page < res.pagination['page-count']) {
            res = await this.fetchPage(options,parseInt(res.pagination.page) + 1);
            history = history.concat(res.data);
            // console.log(res.pagination.page, res.pagination['page-count']);
        }

        history.reverse()

        console.log(history.length);
        console.log(history.slice(0, 10));

        return history;
    }
}

export interface Options {
    type: string | null;
    output: string | null;
}