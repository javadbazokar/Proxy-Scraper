<?php
$file = '../proxies.txt';
if (is_readable($file)) {
    $fileHandle = fopen($file, 'r');
    if ($fileHandle) {
        if (flock($fileHandle, LOCK_SH | LOCK_NB)) {
            $lines = count(file($file));
            echo $lines;
            flock($fileHandle, LOCK_UN);
        } else {
            echo "Updating...";
        }
        fclose($fileHandle);
    } else {
        echo "Updating...";
    }
} else {
    echo "Updating...";
}
?>
