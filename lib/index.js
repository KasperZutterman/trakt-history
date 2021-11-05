"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fetcher_1 = __importDefault(require("./Fetcher"));
require('dotenv').config();
const run = async () => {
    const fetcher = new Fetcher_1.default();
    let options = {
        // type: 'movies',
        type: 'shows',
        // type: 'episode',
        // type: null,
        output: null,
    };
    let history = await fetcher.fetchHistory(options);
};
run().catch(error => {
    console.error(`run failed! ${error.message}`);
});
