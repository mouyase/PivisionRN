// @sherlock-js-i18n
export default {
    // 通用
    common: {
      ok: '确定',
      cancel: '取消',
      back: '返回',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      loading: '加载中...',
      retry: '重试',
      confirm: '确认',
      next: '下一步',
      done: '完成',
    },
  
    // 验证
    validation: {
      required: '必填项',
      email: '请输入有效的邮箱地址',
      password: '密码长度必须在6-20个字符之间',
      phone: '请输入有效的手机号码',
      code: '请输入验证码',
    },
  
    // 错误
    error: {
      network: '网络错误',
      unknown: '未知错误',
      timeout: '请求超时',
      server: '服务器错误',
      unauthorized: '未授权访问',
      forbidden: '禁止访问',
      notFound: '资源不存在',
    },
  
    // 提示
    toast: {
      success: '操作成功',
      failed: '操作失败',
      loading: '加载中...',
      saving: '保存中...',
      updating: '更新中...',
      deleting: '删除中...',
    },
  
    // 页面
    page: {
      home: '首页',
      profile: '个人中心',
      settings: '设置',
      notification: '消息通知',
      about: '关于我们',
      help: '帮助中心',
    },
  
    // 设置
    settings: {
      language: '语言',
      theme: '主题',
      notification: '通知设置',
      privacy: '隐私设置',
      account: '账号设置',
      about: '关于',
    },
  
    // 认证
    auth: {
      login: '登录',
      register: '注册',
      logout: '退出登录',
      forgotPassword: '忘记密码',
      resetPassword: '重置密码',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      phoneNumber: '手机号码',
      verificationCode: '验证码',
    },
  } as const; 
  