import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/js/all';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch'

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

    var citiesByCountry = {
        su: ['جده', 'المدينه'],
        eg: ['القاهرة' , 'الاسكندرية'],
        pl: ['القدس','حيفا'],
        it: ['ميلان','روما']
    };
    // عندما تغير البلد
    $('#form-checkout select[name="country"]').change(function() {
        var country = $(this).val();

        var cities = citiesByCountry[country];

        $('#form-checkout select[name="city"]').empty();

        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        cities.forEach(function(city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment-method"]').change(function(){
        // اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'om-delivary') {
            // اذا كانت عند الاستلام فعطل حقول بطاقة الائتمان
            $('#cerdit-card-info input').prop('disabled', true);
        }
        else {
            // والا فعلها
            $('#credit-card-info input').prop('disabled', false);
        }

        // بدل معلومات بطاقة الائتمان بين الظهور والاخفاء
        $('#credit-card-info').toggle();
    });

    // مكونات البحث حسب السعر
    $('#price-range').slider({
        range: true,
        min: 0,
        max: 500,
        step: 1,
        values: [150, 360],
        slide: function(event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });
});