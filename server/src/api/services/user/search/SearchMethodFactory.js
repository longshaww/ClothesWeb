const SearchKeyWord = require('./ConcreteStrategy/SearchKeyWord');
const SearchPriceAscending = require('./ConcreteStrategy/SearchPriceAscending');
const SearchPriceDescending = require('./ConcreteStrategy/SearchPriceDescending');
class SearchMethodFactory {
    create(dataInput) {
        switch (dataInput.methodType) {
            case 'Descending':
                this.strategy = new SearchPriceDescending(
                    dataInput.idCollection,
                    dataInput.pageNow
                );
                break;
            case 'Ascending':
                this.strategy = new SearchPriceAscending(dataInput.idCollection, dataInput.pageNow);
                break;
            case 'all':
                this.strategy = new SearchKeyWord(dataInput.keyWord, dataInput.pageNow);
                break;
            default:
                this.strategy = new SearchKeyWord(dataInput.keyWord, dataInput.pageNow);
        }
    }
}
module.exports = SearchMethodFactory;
