(function () {
    const section = document.querySelector('[data-new-arrivals]');
    const sentinel = document.querySelector('[data-new-reveal-sentinel]');
    const products = Array.from(document.querySelectorAll('[data-new-product]'));
    const deferredProducts = products.filter((product) => product.hasAttribute('data-new-product-deferred'));
    const viewMore = document.querySelector('[data-new-view-more]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rowObserver = null;
    let sentinelObserver = null;

    if (!section || !products.length) {
        return;
    }

    const rows = products.reduce((groups, product) => {
        const row = product.dataset.newProductRow;
        if (!groups.has(row)) groups.set(row, []);
        groups.get(row).push(product);
        return groups;
    }, new Map());

    const revealAll = () => {
        if (rowObserver) rowObserver.disconnect();
        if (sentinelObserver) sentinelObserver.disconnect();

        section.classList.remove('is-scroll-reveal-ready');
        products.forEach((product) => {
            product.hidden = false;
            product.classList.add('is-revealed');
        });

        if (viewMore) viewMore.hidden = false;
        if (sentinel) sentinel.remove();
    };

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        revealAll();
        return;
    }

    section.classList.add('is-scroll-reveal-ready');

    const revealRow = (rowProducts) => {
        rowProducts.forEach((product) => product.classList.add('is-revealed'));
    };

    rowObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const rowProducts = rows.get(entry.target.dataset.newProductRow) || [];
            revealRow(rowProducts);
            rowObserver.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -10%',
        threshold: 0.08,
    });

    const observeVisibleRows = () => {
        rows.forEach((rowProducts) => {
            const rowLeader = rowProducts[0];
            if (!rowLeader.hidden && !rowLeader.classList.contains('is-revealed')) {
                rowObserver.observe(rowLeader);
            }
        });
    };

    observeVisibleRows();

    if (sentinel && deferredProducts.length) {
        sentinelObserver = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;

            sentinelObserver.disconnect();
            deferredProducts.forEach((product) => {
                product.hidden = false;
            });
            observeVisibleRows();

            if (viewMore) viewMore.hidden = false;
            sentinel.remove();
        }, {
            rootMargin: '0px 0px 10%',
        });

        sentinelObserver.observe(sentinel);
    } else if (viewMore) {
        viewMore.hidden = false;
    }

    const handleReducedMotion = (event) => {
        if (event.matches) revealAll();
    };

    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', handleReducedMotion, { once: true });
    } else if (typeof reducedMotion.addListener === 'function') {
        reducedMotion.addListener(handleReducedMotion);
    }
}());
