document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.copyright-year').forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });
});
