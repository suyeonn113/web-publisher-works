<?php

function e($value): string
{
    if (is_array($value)) {
        $value = implode(', ', array_map('strval', $value));
    }

    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}
