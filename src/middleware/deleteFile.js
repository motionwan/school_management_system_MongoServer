const fs = require('fs');
const path = require('path');

const deleteOldFiles = () => {
  const twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2));
  fs.readdir('public/uploads', (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join('public/uploads', file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.mtime < twoMonthsAgo) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    });
  });
};

// Run this script every 2 months using a task scheduler like cron
deleteOldFiles();
