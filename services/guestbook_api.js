const PG = require('./db')

async function getGuestbookContent(startId) {
    try {
        const list = await PG.sql`
            SELECT
                guest
            FROM
                guestbook
            ORDER BY
                add_time DESC
            OFFSET ${startId} ROWS
            FETCH FIRST 40 ROWS ONLY
        `;
        return list;
    } catch (error) {
        console.log(error);
    }
}

async function addGuestbook(comment) {
    try {
        const newComment = await PG.sql`
            INSERT INTO
                guestbook (guest, add_time)
            VALUES
                (${comment}, CURRENT_TIMESTAMP)
        `;
        return newComment;
    }
    catch (error) {
        console.log(error);
    }
}

async function getTotalGuests() {
    try {
        const totalGuests = await PG.sql`
            SELECT
                COUNT(id)
            FROM
                guestbook
        `;
        return totalGuests;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGuestbookContent,
    addGuestbook,
    getTotalGuests
}