let processRunning = false;
let processInterval;

document.getElementById('startButton').addEventListener('click', function () {
    let statusDiv = document.getElementById('status');
    let loadingDiv = document.getElementById('loading');
    let successCountDiv = document.getElementById('successCount');
    let failCountDiv = document.getElementById('failCount');
    let stopButton = document.getElementById('stopButton');
    let totalLinksDiv = document.getElementById('totalLinks');
    let downloadLinkDiv = document.getElementById('downloadLink');
    loadingDiv.style.display = 'block';
    statusDiv.innerHTML = '';
    successCountDiv.textContent = '0';
    failCountDiv.textContent = '0';
    stopButton.style.display = 'inline-block';
    document.getElementById('startButton').style.display = 'none';
    downloadLinkDiv.innerHTML = '';
    processRunning = true;
    let successCount = 0;
    let failCount = 0;

    fetch('assets/links.json?' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            let links = data.links || [];
            totalLinksDiv.textContent = links.length;

            function sendLink(index) {
                if (!processRunning) {
                    handleProcessEnd();
                    return;
                }

                if (index >= links.length) {
                    handleProcessEnd();
                    showToast('Process completed successfully ✅');
                    return;
                }

                let link = links[index].trim();
                fetch('save_link.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ link: link })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.link_status === 'success') {
                            successCount++;
                            successCountDiv.textContent = successCount;
                        } else {
                            failCount++;
                            failCountDiv.textContent = failCount;
                        }
                        sendLink(index + 1);
                    })
                    .catch(error => {
                        failCount++;
                        failCountDiv.textContent = failCount;
                        sendLink(index + 1);
                    });
            }
            sendLink(0);
        })
        .catch(error => {
            loadingDiv.style.display = 'none';
            statusDiv.innerHTML = 'Error loading JSON file.';
            console.error(error);
        });

    processInterval = setInterval(() => {
        if (processRunning) {
            fetch('assets/proxy_count.php')
                .then(response => response.text())
                .then(count => {
                    document.getElementById('uniqueCount').textContent = count;
                })
                .catch(error => console.error('Error fetching proxy count:', error));
        }
    }, 2000);
});

document.getElementById('stopButton').addEventListener('click', function () {
    handleProcessEnd();
    showToast('Process Stop successfully ✅');
});

function handleProcessEnd() {
    processRunning = false;
    clearInterval(processInterval);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('startButton').style.display = 'inline-block';
    document.getElementById('stopButton').style.display = 'none';

    const downloadLinkDiv = document.getElementById('downloadLink');
    downloadLinkDiv.innerHTML = '';
    const link = document.createElement('a');
    link.href = 'proxies.txt';
    link.download = 'proxies.txt';
    link.textContent = 'Download Proxies';
    link.className = 'btn btn-success mt-3 w-100';
    downloadLinkDiv.appendChild(link);
}

function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('toastMessage'));
    document.getElementById('toastMessage').querySelector('.toast-body').textContent = message;
    toast.show();
}
