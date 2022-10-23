const SearchKeyword = require('./ConcreteStrategy/SearchKeyWord');
const SearchPriceDescending = require('./ConcreteStrategy/SearchPriceDescending');
const SearchPriceAscending = require('./ConcreteStrategy/SearchPriceAscending');
const SearchBestSeller = require('./ConcreteStrategy/SearchBestSeller');

class SearchService {
    constructor(dataInput) {
        switch (dataInput.methodType) {
            case 'descending':
                this.strategy = new SearchPriceDescending(
                    dataInput.idCollection,
                    dataInput.pageNow
                );
                break;
            case 'ascending':
                this.strategy = new SearchPriceAscending(dataInput.idCollection, dataInput.pageNow);
                break;
            case 'all':
                this.strategy = new SearchKeyword(dataInput.keyWord, dataInput.pageNow);
                break;
            case 'bestseller':
                this.strategy = new SearchBestSeller(dataInput.idCollection, dataInput.pageNow);
                break;
            default:
                this.strategy = new SearchKeyword(dataInput.keyWord, dataInput.pageNow);
                break;
        }
    }

    async execute() {
        return await this.strategy.search();
    }
}
module.exports = SearchService;
