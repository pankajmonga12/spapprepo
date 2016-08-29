cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
        "id": "onesignal-cordova-plugin.OneSignal",
        "pluginId": "onesignal-cordova-plugin",
        "clobbers": [
            "OneSignal"
        ]
    },
    {
        "file": "plugins/org.loicknuchel.cordova.deviceaccounts/www/DeviceAccounts.js",
        "id": "org.loicknuchel.cordova.deviceaccounts.DeviceAccounts",
        "pluginId": "org.loicknuchel.cordova.deviceaccounts",
        "clobbers": [
            "plugins.DeviceAccounts"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "onesignal-cordova-plugin": "1.12.4",
    "org.loicknuchel.cordova.deviceaccounts": "0.0.1"
}
// BOTTOM OF METADATA
});