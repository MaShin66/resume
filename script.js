// 나이, 경력, 재직 기간 자동 계산
function calculateAge(birthYear) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear - birthYear;
}

function calculateDuration(startDate, endDate = null) {
    // startDate 형식: 'YYYY.MM'
    const [startYear, startMonth] = startDate.split('.').map(num => parseInt(num));

    // endDate가 null이면 현재 날짜 사용
    const today = new Date();
    const endYear = endDate ? endDate.getFullYear() : today.getFullYear();
    const endMonth = endDate ? endDate.getMonth() + 1 : today.getMonth() + 1; // getMonth()는 0부터 시작

    let years = endYear - startYear;
    let months = endMonth - startMonth;

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
}

function updateDynamicContent() {
    // 나이 계산 (1992년생)
    const birthYear = 1992;
    const age = calculateAge(birthYear);
    document.getElementById('age').textContent = `1992년생 (만 ${age}세)`;

    // 총 경력 계산
    const jobs = [
        { start: '2019.08', end: '2020.07' },  // 백지장
        { start: '2021.04', end: '2022.05' },  // 스탯앤코
        { start: '2022.05', end: '2023.06' },  // 브리치
        { start: '2023.06', end: null }         // 메타몬스터 (현재)
    ];

    let totalMonths = 0;
    jobs.forEach(job => {
        let endDate = null;
        if (job.end) {
            // 'YYYY.MM' 형식을 'YYYY-MM-01' 형식으로 변환
            const dateParts = job.end.split('.');
            endDate = new Date(`${dateParts[0]}-${dateParts[1]}-01`);
        }
        const duration = calculateDuration(job.start, endDate);
        totalMonths += (duration.years * 12) + duration.months;
    });

    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    document.getElementById('career').textContent = `${totalYears}년 ${remainingMonths}개월 경력 • 풀스택 개발`;

    // 현재 회사 재직 기간 계산
    const currentJobStart = '2023.06';
    const currentDuration = calculateDuration(currentJobStart);
    const currentJobElement = document.getElementById('current-job-duration');
    if (currentJobElement) {
        currentJobElement.textContent = `${currentJobStart} ~ 현재 (${currentDuration.years}년 ${currentDuration.months}개월)`;
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', updateDynamicContent);

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

    // 스킬 태그 호버 효과
    document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    tag.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});
});

    // 프로젝트 카드 클릭 효과
    document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 링크 클릭 시 카드 애니메이션 중단
        if (e.target.closest('.website-link')) {
            return;
        }

        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateX(3px)';
        }, 150);
    });
});

// 웹사이트 링크 호버 효과
document.querySelectorAll('.website-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
