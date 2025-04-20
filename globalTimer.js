const globalStartTime = performance.now();

function getGlobalElapsedTime() {
    return (performance.now() - globalStartTime) / 1000.0;
}

export { getGlobalElapsedTime };