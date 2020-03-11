export const goIndex = (args) => {
  const json = {
    method: 'reqNative',
    action: 'open_user_profile',
    modul: 'account',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goLive = (args) => {
  const json = {
    method: 'reqNative',
    action: 'open_live',
    modul: 'live',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goHome = (args) => {
  const json = {
    method: 'reqNative',
    action: 'toLive',
    modul: 'jump',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goNoble = (args) => {
  const json = {
    method: 'reqNative',
    modul: 'open_noble',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goCharge = (args) => {
  const json = {
    method: 'reqNative',
    action: 'charge',
    modul: 'charge',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goWithdraw = (args) => {
  const json = {
    method: 'reqNative',
    action: 'toWithdraw',
    modul: 'jump',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const toUrl = (url) => {
  const json = {
    method: 'reqNative',
    action: 'activity',
    modul: 'open_web',
    args: {
      url
    }
  }
  const jsonString = JSON.stringify(json)
  prompt('__native_call=>' + jsonString)
}
export const toSafari = (url) => {
  const json = {
    method: 'reqNative',
    modul: 'safari',
    args: {
      'url': url
    }
  }
  const jsonString = JSON.stringify(json)
  prompt('__native_call=>' + jsonString)
}
export function closeView() {
  const json = {
    method: 'reqNative',
    modul: 'close',
    action: ''
  }
  const jsonString = JSON.stringify(json)
  prompt('__native_call=>' + jsonString)
}
export const shareTo = (action, args) => {
  const json = {
    method: 'reqNative',
    action,
    modul: 'share',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goMain = (args) => {
  const json = {
    method: 'reqNative',
    action: 'toMain',
    modul: 'jump',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goLogin = (args) => {
  const json = {
    method: 'reqNative',
    action: 'login',
    modul: 'account',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goTask = () => {
  const json = {
    method: 'reqNative',
    action: 'open_task',
    modul: 'task',
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
