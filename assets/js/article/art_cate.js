$(function(){
    getArticleList()
    // 获取文章列表
    function getArticleList() {
        $.ajax({
            type: 'GET',
            url: 'http://39.107.142.197:3007/my/article/cates',
            success: function(res){
                console.log(res);
               var temphtml = template('tel-table',res)
               $('tbody').html(temphtml)
            }
        })
    }
})