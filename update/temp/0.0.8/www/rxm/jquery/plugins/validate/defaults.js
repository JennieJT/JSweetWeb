
/*
 * base.js
 * 基本设置
 */
define([""], function () {

	/*
     * 全局表单验证
     */
    $.validator.setDefaults({
        errorElement : 'span',
        errorClass : 'rxm-warn-block',
        highlight : function(target) {
            var fg =  $(target).closest('.rxm-form-group');
            //直接是输入框时，修改输入框的边框样式，比如table中的输入框验证
            fg.length ? fg.addClass('has-error') : $(target).addClass('cs-error-border');
            $(target).parents('.rxm-form-group').addClass('rxm-validate');
            var vType = $(target).attr('type')
            if(!!vType){
                if(vType == 'checkbox' || vType == 'radio'){//多选输入框
                    var $error = $(target).siblings('.rxm-warn-block')
                    $error.css('clear','left')
                    $error.css('left','15px')
                    $(target).parents(':eq(1)').append($error)
                }
            }
        },
        success : function(message) {
            var fg =  message.closest('.rxm-form-group');
            fg.length ? fg.removeClass('has-error') : message.prev().removeClass('cs-error-border');
            message.parents('.rxm-form-group').removeClass('rxm-validate');
            // $('.rxm-warn-block').parents('.rxm-form-group').removeClass('rxm-validate');
            // $('.rxm-warn-block').parents('.rxm-form-group').removeClass('has-error');
            message.remove();
            
        }
    });

});