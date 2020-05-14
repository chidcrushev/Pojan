// Handle post page pagination
class Pagination{

    // Pagination constructor
constructor(totalCount,currentPage,pageUri,perPage=2){
    this.perPage = perPage;
    this.totalCount =parseInt(totalCount);
    this.currentPage = parseInt(currentPage);
    this.previousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
    this.pageCount = Math.ceil(this.totalCount / this.perPage);
    this.pageUri = pageUri;
    this.offset  = this.currentPage > 1 ? this.previousPage * this.perPage : 0;
    this.sidePages = 4;
    this.pages = false;
}


// Pagination links
links(){
    this.pages='<ul class="pagination">';

    if(this.currentPage === 1){
        this.pages+='<li class="waves-effect disabled"><a class="page-link" href="#"><i class="material-icons">chevron_left</i></a></li>';
    }

    if(this.previousPage > 0)

        this.pages+='<li class="waves-effect"><a class="page-link" href="'+this.pageUri + this.previousPage+'"><i class="material-icons">chevron_left</i></a></li>';

        /*Add back links*/
        if(this.currentPage > 1){
            for (var x = this.currentPage - this.sidePages; x < this.currentPage; x++) {
                if(x > 0)
                    this.pages+='<li class="page-item"><a href="'+this.pageUri+x+'">'+x+'</a></li>';
            }
        }

        /*Show current page*/
        this.pages+='<li class="pink darken-3 active"><a href="'+this.pageUri+this.currentPage+'">'+this.currentPage+'</a></li>';

        /*Add more links*/
        for(x = this.nextPage; x <= this.pageCount; x++){

            this.pages+='<li class="waves-effect"><a href="'+this.pageUri+x+'">'+x+' </a></li>';

            if(x >= this.currentPage + this.sidePages)
                break;
        }

        /*Display next buttton navigation*/
        if(this.currentPage + 1 <= this.pageCount)
            this.pages+='<li class="waves-effect"><a href="'+this.pageUri+this.nextPage+'"><i class="material-icons">chevron_right</i></a></li>';

        if(this.currentPage === this.pageCount){
            this.pages+='<li class="waves-effect"><a href="#"><i class="material-icons">chevron_right</i></a></li>';
        }
        this.pages+='</ul>';

    return this.pages;
}
}
module.exports = Pagination;