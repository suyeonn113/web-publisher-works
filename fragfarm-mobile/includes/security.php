<?php

function csrf_token(string $scope): string
{
    if (empty($_SESSION['csrf_tokens'][$scope])) {
        $_SESSION['csrf_tokens'][$scope] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_tokens'][$scope];
}

function csrf_input(string $scope): string
{
    return '<input type="hidden" name="csrf_token" value="'
        . htmlspecialchars(csrf_token($scope), ENT_QUOTES, 'UTF-8')
        . '">';
}

function csrf_verify(string $scope, $submittedToken): bool
{
    $storedToken = $_SESSION['csrf_tokens'][$scope] ?? '';

    return is_string($submittedToken)
        && $storedToken !== ''
        && hash_equals($storedToken, $submittedToken);
}

function csrf_forget(string $scope): void
{
    unset($_SESSION['csrf_tokens'][$scope]);
}
