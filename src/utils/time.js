export function getTimeGap(createdAt) {
    var now = new Date();
    var createdAtDate = new Date(createdAt);
    var timeDiff = now.getTime() - createdAtDate.getTime();
    var seconds = Math.floor(timeDiff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (seconds < 5) {
        return 'just now';
    } else if (seconds < 60) {
        return seconds + ' seconds ago';
    } else if (minutes < 60) {
        return minutes + ' minutes ago';
    } else if (hours < 24) {
        return hours + ' hours ago';
    } else {
        return days + ' days ago';
    }
}
