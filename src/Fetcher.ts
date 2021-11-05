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

    public async fetchPage(username: string, page = 1): Promise<any> {
        const response = this.trakt.users.history({
            username: username,
            page: page,
            limit: '1000',
        })
        return response;
    }

    public async fetchHistory() {
        let username: string = 'kasper-zutterman'
        let res = await this.fetchPage(username);
        let history: Array<object> = res.data;
        
        while (res.pagination.page < res.pagination['page-count']) {
            res = await this.fetchPage(username, parseInt(res.pagination.page) + 1);
            // let data: Array<object> = res.data;
            // history = history.concat(data);
            history = history.concat(res.data);
            // console.log(res.pagination.page, res.pagination['page-count']);
        }

        history.reverse()

        console.log(history.length);
        console.log(history.slice(0, 10));
        // let size = res.pagination['item-count'];
        // console.log(size);
        // console.log(res.data.slice(0, 10).reverse());
    }
}