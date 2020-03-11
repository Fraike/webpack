/**
 *  判断是否是数字
 * @param {Number} data
 */
export const checkNum = data => {
    const reg = /^\d{1,}$/g
    if (reg.test(data)) return true
}

/**
 *  判断是否是字母
 * @param {Number} data
 */
export const checkLetter = data => {
    const reg = /^[a-zA-Z]+$/g
    if (reg.test(data)) return true
}

/**
*  判断是否全部是小写字母
* @param {Number} data
*/
export const checkLowercaseLetter = data => {
    const reg = /^[a-z]+$/g
    if (reg.test(data)) return true
}

/**
*  判断是否是大写字母
* @param {Number} data
*/
export const checkCapitalLetter = data => {
    const reg = /^[A-Z]+$/g
    if (reg.test(data)) return true
}

/**
* 判断是否是字母或数字
* @param {Number || String} data  字符或数字
*/
export const checkNumOrLetter = data => {
    const reg = /^[0-9a-zA-Z]*$/g
    if (reg.test(data)) return true
}

/**
* 判断是否是中文
* @param {String} data  中文
*/
export const checkChinese = data => {
    const reg = /^[\u4E00-\u9FA5]+$/g
    if (reg.test(data)) return true
}

export const checkChineseNumberLettter = data => {
    const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g
    if (reg.test(data)) return true
}

/**
* 判断是否是邮箱地址
* @param {String} data
*/
export const checkEmail = data => {
    const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
    if (reg.test(data)) return true
}

/**
* 判断是否是手机号，只要是13,14,15,16,17,18,19开头即可
* @param {String} data
*/
export const checkTelphone = data => {
    const reg = /^((\+|00)86)?1[3-9]\d{9}$/g
    if (reg.test(data)) return true
}

/**
* 判断是否是正确的网址
* @param {String} url 网址
*/
export const checkUrl = url => {
    const a = document.createElement('a')
    a.href = url
    return [
        /^(http|https):$/.test(a.protocol),
        a.host,
        a.pathname !== url,
        a.pathname !== `/${url}`
    ].find(x => !x) === undefined
}

/**
* 判断是浏览器内核
*/
export const checkBrowser = () => {
    const u = navigator.userAgent;
    const obj = {
        trident: u.indexOf("Trident") > -1, //IE内核
        presto: u.indexOf("Presto") > -1, //opera内核
        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    }
    return Object.keys(obj)[Object.values(obj).indexOf(true)]
};

/**
* 判断是终端类型,值有ios,android
*/
export const checkIosAndroid = () => {
    const u = navigator.userAgent;
    const obj = {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
    }
    return Object.keys(obj)[Object.values(obj).indexOf(true)]
};

/**
* 判断是否是微信,qq 或 uc
*/
export const checkWeixinQqUc = () => {

    const u = navigator.userAgent;
    const obj = {
        weixin: u.indexOf("MicroMessenger") > -1, //是否微信
        qq: u.match(/QQ/i) == "qq" && !u.indexOf('MQQBrowser') > -1, //是否QQ
        uc: u.indexOf('UCBrowser') > -1
    }
    return Object.keys(obj)[Object.values(obj).indexOf(true)]
};

/**
* 检查是否是 IphoneX
*/
export const checkIsIphoneX = () => {
    const u = navigator.userAgent;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS && screen.height >= 812) {
        return true;
    }
};
