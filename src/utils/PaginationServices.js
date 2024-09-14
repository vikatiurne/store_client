export default class PaginationServices {
    static getPagesList(pagesCount,page){
        const pages = [];
        let renderPages = [];
        for (let i = 0; i < pagesCount; i++) {
          pages.push(i + 1);
        }
        if (pagesCount > 5) {
          const activeIndex = pages.indexOf(page);
          let startIndex, endIndex;
          startIndex = activeIndex - 2;
          if (startIndex < 0) startIndex = 0;
          endIndex = activeIndex + 2;
          if (endIndex < 5) endIndex = 4;
          if (endIndex > pages.length) startIndex = pages.length - 4;
          renderPages = pages.slice(startIndex, endIndex);
        } else {
          renderPages = pages;
        }
        return renderPages
    }
}