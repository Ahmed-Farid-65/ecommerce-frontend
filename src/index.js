import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/js/all';

$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $( ".add-to-cart-btn" ).click(function() {
        alert( "اضيف المنتج الى عبرة الشراء" );
    });

    $("#copyright").text(" جميع الحقوق محفوظة للمتجر " + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    // عند تغيير العنصر المطلوب
    $('[data-product-quantity]').change(function(){
        // اجلب الكمية المحدده
        var newQuantity= $(this).val();
        // ابحث السطر اللذي يحتوي معلومات المنتج
        var parent = $(this).parents('[data-product-info]');
        // اجلب سعر القطعة الواحده من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');
        // السعر الاجمالي للمنتج هو سعر القطعة مضروب بعددها
        var totalPriceForProduct = newQuantity * pricePerUnit;
        // السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر 
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        // حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();
    });

    // زر الحذف
    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        // اعد تحيدث السعر الاجمالي لكل المنتجات 
        calculateTotalPrice();
    })
    // لحساب السعر الاجمالي
    function calculateTotalPrice() {
        // انشئ متغير جديد لحفظ السعر الاجمالي
        var totalPriceForAllProducts = 0;
        // لكل سطر معلومات المنتج في الصفحه
        $('[data-product-info]').each(function() {
            // اجلب سعر القطعة الواحده من معلومات المنتج
             var pricePerUnit = $(this).attr('data-product-price');
            // اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            // اضف السعر الاجالي لهذا لكل المنتجات واحفظ القيمه في المتغير
            totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
        });

        // حدث السعر الاجالي لكل المنتجات في الصفحه
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '');
    }
});