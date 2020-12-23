$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 裁剪区域的纵横比
        // aspectRatio: 5/6,
        // aspectRatio: 1,
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    var layer = layui.layer

    // 给上传按钮绑定点击事件
    $('#upload').on('click', function () {
        $('#file').click()
    })
    //    给文件上传文本框绑定change事件 实现裁剪区域的图片替换
    $('#file').on('change', function (e) {
        console.log(e);
        // 事件对象r里面有一个target属性 里面有个files对象 这个对象里面存的是你选择的图片
        if (e.target.files.length === 0) {
            return layer.msg('请选择照片')
        }
        // 更换裁剪图片
        //   1. 拿到用户 选择的图片
        var file = e.target.files[0]
        // 2.根据用户选择到的拖转换为对应的URL地址
        var newImgURL = URL.createObjectURL(file)
        // 3.先 销毁 旧的裁剪区域，
        // 再 重新设置图片路径 ，之后再 创建新的裁剪区域 ：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    // 给确定按钮绑定点击事件
     $('#btnconf').on('click',function(){

        // 将裁剪的图片转换为base64格式的字符串 因为服务器接收的图片格式是字符串 不是图片
        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status !==0) {
                    layer.msg(res.message)
                }
                layer.msg(res.message)
                // 调用父页面的函数渲染 头像
                window.parent.getUserInfo()
            }
        })
     })
})