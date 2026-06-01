<div class="program-confirm-modal" data-program-confirm-modal hidden>
    <div class="program-confirm-modal__backdrop" data-program-confirm-close></div>
    <section
        class="program-confirm-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="program-confirm-title"
        tabindex="-1"
    >
        <button class="program-confirm-modal__close" type="button" data-program-confirm-close aria-label="신청확인 닫기">×</button>
        <div class="program-confirm-modal__header">
            <p>신청확인</p>
            <h2 id="program-confirm-title">프로그램 신청 정보를 입력해주세요.</h2>
            <span data-program-confirm-name>선택한 프로그램</span>
        </div>
        <form class="program-confirm-modal__form" action="<?= BASE_URL ?>/actions/application_confirm.php" method="post">
            <input type="hidden" name="program_id" value="" data-program-confirm-id>
            <label>
                <span>신청자명 <strong>*</strong></span>
                <input type="text" name="applicant_name" autocomplete="name" required>
            </label>
            <label>
                <span>비밀번호 <strong>*</strong></span>
                <input type="password" name="password" minlength="4" required>
            </label>
            <label>
                <span>휴대전화 <strong>*</strong></span>
                <input type="tel" name="phone" inputmode="numeric" placeholder="숫자만 입력" required>
            </label>
            <p class="program-confirm-modal__help">등록한 정보 확인이 어려우면 센터로 문의해주세요.</p>
            <div class="program-confirm-modal__actions">
                <button class="program-confirm-modal__submit" type="submit">확인</button>
                <button class="program-confirm-modal__cancel" type="button" data-program-confirm-close>닫기</button>
            </div>
        </form>
    </section>
</div>
