<?php
$data = json_decode(file_get_contents("php://input"), true);
if (isset($data['link']) && !empty($data['link'])) {
    $link = $data['link'];
    $file = 'proxies.txt';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, trim($link));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 50);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $content = curl_exec($ch);
    if ($content === false) {
        curl_close($ch);
        echo json_encode([
            'success' => false,
            'link_status' => 'failed',
            'message' => 'Error fetching the link content',
            'error' => curl_error($ch)
        ]);
        exit;
    }
    curl_close($ch);
    $content = trim($content);
    $lines = explode("\n", $content);
    $proxyPattern = '/^([a-zA-Z0-9.-]+):([0-9]{1,5})$/';
    $savedProxies = [];

    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line)) continue;
        $line = preg_replace('/https?:\/\//i', '', $line);
        if (!preg_match($proxyPattern, $line)) {
            continue;
        }
        $savedProxies[] = $line;
    }
    $savedProxies = array_unique($savedProxies);
    if (file_exists($file)) {
        $existingProxies = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $combinedProxies = array_unique(array_merge($existingProxies, $savedProxies));
    } else {
        $combinedProxies = $savedProxies;
    }

    if ($fileHandle = fopen($file, 'w')) {
        flock($fileHandle, LOCK_EX);
        foreach ($combinedProxies as $proxy) {
            fwrite($fileHandle, $proxy . "\n");
        }
        flock($fileHandle, LOCK_UN);
        fclose($fileHandle);
        echo json_encode([
            'success' => true,
            'link_status' => 'success',
            'message' => 'Valid proxies have been saved'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'link_status' => 'failed',
            'message' => 'Error opening the proxy file'
        ]);
    }

} else {
    echo json_encode([
        'success' => false,
        'link_status' => 'failed',
        'message' => 'No link has been sent'
    ]);
}