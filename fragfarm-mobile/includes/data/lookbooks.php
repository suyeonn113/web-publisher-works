<?php

$createLookbookImages = static function (string $directory, array $variants): array {
    return array_map(
        static fn (string $variant, int $index): array => [
            'image' => sprintf('/assets/images/lookbook/%s/%02d.jpg', $directory, $index + 1),
            'variant' => $variant,
        ],
        $variants,
        array_keys($variants)
    );
};

$lookbooks = [
    '26ss-2' => [
        'season' => '26SS 2nd',
        'collection' => '"花"',
        'items' => $createLookbookImages('26ss-2', [
            'tall', 'portrait', 'square', 'wide', 'portrait', 'tall',
            'wide', 'square', 'portrait', 'portrait', 'tall', 'square',
            'wide', 'portrait', 'square', 'tall', 'portrait', 'wide',
            'square', 'portrait', 'tall', 'portrait', 'wide', 'square',
            'portrait', 'tall', 'square', 'wide', 'portrait', 'portrait',
            'tall', 'square', 'wide', 'portrait', 'square', 'tall', 'portrait',
        ]),
    ],
    '26ss-1' => [
        'season' => '26SS 1st',
        'collection' => '『Nature Layer』',
        'items' => [
            ['image' => '/assets/images/lookbook/26ss-1/01.jpg', 'variant' => 'tall'],
            ['image' => '/assets/images/lookbook/26ss-1/02.jpg', 'variant' => 'portrait'],
            ['image' => '/assets/images/lookbook/26ss-1/03.jpg', 'variant' => 'wide'],
            ['text' => "26SS 1ST\nNATURE LAYER"],
            ['image' => '/assets/images/lookbook/26ss-1/04.jpg', 'variant' => 'square'],
            ['image' => '/assets/images/lookbook/26ss-1/05.jpg', 'variant' => 'tall'],
            ['image' => '/assets/images/lookbook/26ss-1/06.jpg', 'variant' => 'portrait'],
            ['image' => '/assets/images/lookbook/26ss-1/07.jpg', 'variant' => 'square'],
            ['image' => '/assets/images/lookbook/26ss-1/08.jpg', 'variant' => 'wide'],
            ['image' => '/assets/images/lookbook/26ss-1/09.jpg', 'variant' => 'portrait'],
            ['image' => '/assets/images/lookbook/26ss-1/10.jpg', 'variant' => 'square'],
            ['image' => '/assets/images/lookbook/26ss-1/11.jpg', 'variant' => 'tall'],
            ['image' => '/assets/images/lookbook/26ss-1/12.jpg', 'variant' => 'portrait'],
            ['image' => '/assets/images/lookbook/26ss-1/13.jpg', 'variant' => 'square'],
            ['text' => "NATURE\nIN LAYERS"],
            ['image' => '/assets/images/lookbook/26ss-1/14.jpg', 'variant' => 'wide'],
            ['text' => 'FRAGFARMHOUSE'],
            ['image' => '/assets/images/lookbook/26ss-1/15.jpg', 'variant' => 'portrait'],
            ['image' => '/assets/images/lookbook/26ss-1/16.jpg', 'variant' => 'square'],
            ['text' => "26SS\nFIRST COLLECTION"],
            ['image' => '/assets/images/lookbook/26ss-1/17.jpg', 'variant' => 'tall'],
        ],
    ],
    '25fw' => [
        'season' => '25FW',
        'collection' => '『Blooming in Motion』',
        'items' => $createLookbookImages('25fw', [
            'wide', 'tall', 'portrait', 'square', 'portrait', 'wide',
            'tall', 'square', 'wide', 'portrait', 'tall',
        ]),
    ],
];

$latestLookbookKey = array_key_first($lookbooks);
