const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const PUBLIC_PATH = process.env.PUBLIC_PATH;

    const appSettings = `
     window.appSettings = {
         PUBLIC_PATH: '${PUBLIC_PATH}',
     };`
        .trim()
        .replace(/ /g, '');

    try {
        return appSettings;
    } catch (e) {
        console.error(e);
    }
};

module.exports = envSettings;
