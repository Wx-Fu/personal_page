document.addEventListener('DOMContentLoaded', function() {

    // 获取所有带 lightbox-trigger 类的链接
    const imageLinks = document.querySelectorAll('.lightbox-trigger');
    let lightbox, lightboxImg, closeBtn;

    // 创建并添加 Lightbox 的 DOM 元素到页面
    function createLightbox() {
        // 创建背景遮罩
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.classList.add('lightbox');

        // 创建图片容器
        lightboxImg = document.createElement('img');
        lightboxImg.classList.add('lightbox-content');
        
        // 创建关闭按钮
        closeBtn = document.createElement('span');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';

        // 组装 Lightbox
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        // 添加关闭事件
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            // 如果点击的是背景（而不是图片），则关闭
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 打开 Lightbox 的函数
    function openLightbox(e) {
        e.preventDefault(); // 阻止链接的默认跳转行为
        if (!lightbox) {
            createLightbox(); // 如果是第一次点击，则创建DOM
        }
        const imageUrl = this.getAttribute('href');
        lightboxImg.setAttribute('src', imageUrl);
        lightbox.style.display = 'flex'; // 使用 flex 来居中图片
    }

    // 关闭 Lightbox 的函数
    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    // 为每个图片链接绑定点击事件
    imageLinks.forEach(link => {
        link.addEventListener('click', openLightbox);
    });

    // 按下 Escape 键关闭 Lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});
