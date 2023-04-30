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
            FETCH FIRST 20 ROWS ONLY
        `;
        return list;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGuestbookContent
}