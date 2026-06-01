document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.program-apply-form');
    if (!form) return;

    const agreeAll = form.querySelector('input[name="agree_all"]');
    const requiredAgreements = form.querySelectorAll('input[name="agree_privacy"], input[name="agree_third_party"]');
    const submitButtons = form.querySelectorAll('button[type="submit"]');
    let isDirty = false;
    let isSubmitting = false;
    let didShowAgreementAlert = false;

    function showAgreementAlert() {
        if (didShowAgreementAlert) return;

        didShowAgreementAlert = true;
        alert('개인정보 수집 및 이용 동의에 체크해야 신청할 수 있습니다.');

        window.requestAnimationFrame(() => {
            agreeAll?.focus();
            agreeAll?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        window.setTimeout(() => {
            didShowAgreementAlert = false;
        }, 300);
    }

    function hasUncheckedAgreement() {
        return Array.from(requiredAgreements).some((checkbox) => !checkbox.checked);
    }

    form.addEventListener('input', () => {
        isDirty = true;
    });

    form.addEventListener('change', () => {
        isDirty = true;
    });

    submitButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            if (!hasUncheckedAgreement()) return;

            event.preventDefault();
            showAgreementAlert();
        });
    });

    form.addEventListener('submit', (event) => {
        if (hasUncheckedAgreement()) {
            event.preventDefault();
            showAgreementAlert();
            return;
        }

        isSubmitting = true;
    });

    window.addEventListener('beforeunload', (event) => {
        if (!isDirty || isSubmitting) return;

        event.preventDefault();
        event.returnValue = '';
    });

    agreeAll?.addEventListener('change', () => {
        requiredAgreements.forEach((checkbox) => {
            checkbox.checked = agreeAll.checked;
        });
    });

    requiredAgreements.forEach((checkbox) => {
        checkbox.addEventListener('invalid', (event) => {
            event.preventDefault();
            showAgreementAlert();
        });

        checkbox.addEventListener('change', () => {
            if (!agreeAll) return;
            agreeAll.checked = Array.from(requiredAgreements).every((item) => item.checked);
        });
    });
});
