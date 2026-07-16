<?php

return [
    [
        'review_key' => 'sample-1',
        'name' => '김**',
        'date' => '2025.06.12 21:07',
        'score' => 5,
        'summary' => '좋아요 예뻐요',
        'content' => '사이즈 고민 좀 하다가 구매했는데 생각보다 훨씬 편하게 맞아요. 프린팅이 흐려지지 않고 포인트로 예뻐게 보여서 자주 입을 것 같아요.',
        'images' => [
            BASE_URL . '/assets/images/review/review-1.jpeg',
            BASE_URL . '/assets/images/review/review-2.jpeg',
        ],
        'comments' => [
            ['author' => '프래그팜', 'body' => '예쁜 착샷 후기 감사합니다. 앞으로도 오래 입기 좋은 상품 보여드릴게요!', 'own' => false],
            ['author' => '윤**', 'body' => '사진 분위기 너무 예뻐요! 촬영 장소가 어디인지 궁금해요.', 'own' => false],
            ['author' => '박**', 'body' => '혹시 인스타 아이디 알 수 있을까요? 다른 코디도 보고 싶어요.', 'own' => false],
        ],
    ],
    [
        'review_key' => 'sample-2',
        'name' => '하**',
        'date' => '2025.06.12 14:58',
        'score' => 4,
        'summary' => '옷 예뻐요',
        'content' => '화이트 컬러라 여기저기 매치하기 좋고 그래픽이 과하지 않아서 마음에 들어요. 얇은 이너랑 같이 입어도 예쁩니다.',
        'images' => [
            BASE_URL . '/assets/images/review/review-3.jpeg',
        ],
        'comments' => [
            ['author' => '서**', 'body' => '사진 색감이 너무 좋아요. 혹시 어떤 카메라로 찍으셨나요?', 'own' => false],
            ['author' => '이**', 'body' => '같이 매치한 가방 정보도 궁금해요!', 'own' => false],
        ],
    ],
    [
        'review_key' => 'sample-3',
        'name' => '진**',
        'date' => '2025.03.23 01:23',
        'score' => 5,
        'summary' => '너무너무 예뻐요',
        'content' => '가격대가 있지만 만족도가 높아요. 사이즈는 살짝 여유 있고 목선이 답답하지 않아서 자주 손이 갑니다.',
        'images' => [
            BASE_URL . '/assets/images/review/review-4.jpeg',
            BASE_URL . '/assets/images/review/review-5.jpg',
        ],
        'comments' => [
            ['author' => '정**', 'body' => '헤어랑 코디 분위기가 정말 잘 어울려요. 인스타 하시면 구경 가고 싶어요!', 'own' => false],
        ],
    ],
];
