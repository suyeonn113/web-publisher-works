<?php

function move_with_alert(string $message, ?string $url = null): never
{
    $messageJson = json_encode(
        $message,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
    );
    $urlJson = $url === null
        ? null
        : json_encode(
            $url,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
        );

    echo '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>Fragfarm</title></head><body>';
    echo '<script>';
    echo 'alert(' . $messageJson . ');';
    echo $urlJson === null ? 'history.back();' : 'location.href=' . $urlJson . ';';
    echo '</script>';
    echo '</body></html>';
    exit;
}
